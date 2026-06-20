"use client";

import { useEffect, useState, useRef } from "react";

interface AnimatedCounterProps {
  end: string;
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({
  end,
  duration = 2000,
  className = "",
}: AnimatedCounterProps) {
  const [display, setDisplay] = useState("0");
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Check if value is purely numeric
          const numericMatch = end.match(/^(\d+)(\+?)$/);
          if (numericMatch) {
            const target = parseInt(numericMatch[1]);
            const suffix = numericMatch[2] || "";
            const startTime = performance.now();

            const animate = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // Ease out cubic
              const eased = 1 - Math.pow(1 - progress, 3);
              const current = Math.round(target * eased);
              setDisplay(current + suffix);

              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };

            requestAnimationFrame(animate);
          } else {
            // Non-numeric — just display as-is
            setDisplay(end);
          }
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
