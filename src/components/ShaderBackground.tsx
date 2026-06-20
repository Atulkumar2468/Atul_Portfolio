"use client";

import { useEffect, useRef } from "react";

const VERTEX_SHADER = `
attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

const FRAGMENT_SHADER = `
precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
varying vec2 v_texCoord;

void main() {
    vec2 uv = v_texCoord;
    vec3 color1 = vec3(0.02, 0.02, 0.05);
    vec3 color2 = vec3(0.23, 0.51, 0.96);
    vec3 color3 = vec3(0.55, 0.36, 0.96);
    
    float noise = sin(uv.x * 3.0 + u_time * 0.2) * cos(uv.y * 2.0 - u_time * 0.3);
    float glow = 0.05 / length(uv - 0.5 + 0.2 * vec2(sin(u_time * 0.5), cos(u_time * 0.7)));
    
    vec3 finalColor = mix(color1, color2, clamp(noise + glow, 0.0, 1.0));
    finalColor = mix(finalColor, color3, clamp(sin(u_time * 0.3) * 0.5 + 0.5, 0.0, 0.2) * uv.y);
    
    gl_FragColor = vec4(finalColor * 0.6, 1.0);
}`;

export default function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const syncSize = () => {
      const w = canvas.clientWidth || 1280;
      const h = canvas.clientHeight || 720;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(syncSize);
      resizeObserver.observe(canvas);
    }
    syncSize();

    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) return;

    const glCtx = gl as WebGLRenderingContext;

    function createShader(type: number, src: string) {
      const s = glCtx.createShader(type);
      if (!s) return null;
      glCtx.shaderSource(s, src);
      glCtx.compileShader(s);
      return s;
    }

    const prog = glCtx.createProgram();
    if (!prog) return;

    const vs = createShader(glCtx.VERTEX_SHADER, VERTEX_SHADER);
    const fs = createShader(glCtx.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    glCtx.attachShader(prog, vs);
    glCtx.attachShader(prog, fs);
    glCtx.linkProgram(prog);
    glCtx.useProgram(prog);

    const buf = glCtx.createBuffer();
    glCtx.bindBuffer(glCtx.ARRAY_BUFFER, buf);
    glCtx.bufferData(
      glCtx.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      glCtx.STATIC_DRAW
    );

    const pos = glCtx.getAttribLocation(prog, "a_position");
    glCtx.enableVertexAttribArray(pos);
    glCtx.vertexAttribPointer(pos, 2, glCtx.FLOAT, false, 0, 0);

    const uTime = glCtx.getUniformLocation(prog, "u_time");
    const uRes = glCtx.getUniformLocation(prog, "u_resolution");
    const uMouse = glCtx.getUniformLocation(prog, "u_mouse");

    const mouse = { x: canvas.width / 2, y: canvas.height / 2 };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        const nx = (event.clientX - rect.left) / rect.width;
        const ny = 1.0 - (event.clientY - rect.top) / rect.height;
        mouse.x = nx * canvas.width;
        mouse.y = ny * canvas.height;
      }
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    function render(t: number) {
      if (typeof ResizeObserver === "undefined") syncSize();
      glCtx.viewport(0, 0, canvas!.width, canvas!.height);
      if (uTime) glCtx.uniform1f(uTime, t * 0.001);
      if (uRes) glCtx.uniform2f(uRes, canvas!.width, canvas!.height);
      if (uMouse) glCtx.uniform2f(uMouse, mouse.x, mouse.y);
      glCtx.drawArrays(glCtx.TRIANGLE_STRIP, 0, 4);
      animRef.current = requestAnimationFrame(render);
    }

    animRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver?.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-40"
      style={{ display: "block" }}
    />
  );
}
