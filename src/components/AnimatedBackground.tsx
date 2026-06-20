"use client";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Blob 1 */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-[var(--color-primary)]/5 rounded-full mix-blend-screen filter blur-[80px] animate-blob" />

      {/* Blob 2 */}
      <div className="absolute top-1/2 -right-20 w-72 h-72 bg-[var(--color-secondary)]/5 rounded-full mix-blend-screen filter blur-[80px] animate-blob animation-delay-2000" />

      {/* Blob 3 */}
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-[var(--color-tertiary)]/5 rounded-full mix-blend-screen filter blur-[80px] animate-blob animation-delay-4000" />
    </div>
  );
}
