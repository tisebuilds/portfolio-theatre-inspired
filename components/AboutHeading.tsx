"use client";

import { useRef, useCallback, useState } from "react";

type Sparkle = {
  id: number;
  x: number;
  y: number;
  size: number;
  driftX: number;
  driftY: number;
};

export function AboutHeading() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const nextId = useRef(0);
  const lastSpawn = useRef(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLHeadingElement>) => {
      const now = Date.now();
      if (now - lastSpawn.current < 70) return;
      lastSpawn.current = now;

      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left + (Math.random() - 0.5) * 24;
      const y = e.clientY - rect.top + (Math.random() - 0.5) * 24;
      const size = Math.random() * 8 + 5;
      const driftX = (Math.random() - 0.5) * 16;
      const driftY = -(Math.random() * 12 + 4);
      const id = nextId.current++;

      setSparkles((prev) => [...prev.slice(-20), { id, x, y, size, driftX, driftY }]);

      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== id));
      }, 650);
    },
    [],
  );

  return (
    <h2
      className="about-text-display relative flex min-w-0 flex-1 cursor-default flex-wrap items-center gap-x-3 gap-y-2 text-neutral-200"
      onMouseMove={handleMouseMove}
    >
      Hi! I&apos;m Tise
      {sparkles.map((s) => (
        <svg
          key={s.id}
          viewBox="0 0 24 24"
          fill="currentColor"
          className="marquee-sparkle absolute pointer-events-none text-white/80"
          style={
            {
              left: s.x,
              top: s.y,
              width: s.size,
              height: s.size,
              "--sparkle-dx": `${s.driftX}px`,
              "--sparkle-dy": `${s.driftY}px`,
            } as React.CSSProperties
          }
        >
          <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" />
        </svg>
      ))}
    </h2>
  );
}
