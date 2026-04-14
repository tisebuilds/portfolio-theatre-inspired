"use client";

import { useRef, useCallback, useState } from "react";

const FILMS_URL = "https://tisewatched.vercel.app/";

const line1 = ["Tise", "moves", "ideas", "from", "draft", "to", "production,"];
const line2 = ["using", "lessons", "from", "great"];

type Sparkle = {
  id: number;
  x: number;
  y: number;
  size: number;
  driftX: number;
  driftY: number;
};

export function Marquee() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const nextId = useRef(0);
  const lastSpawn = useRef(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
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
    <div
      className="w-full py-5 px-6 rounded-none text-center relative"
      onMouseMove={handleMouseMove}
    >
      <span className="text-2xl md:text-3xl font-bold tracking-normal text-neutral-200">
        {line1.map((word, i) => (
          <span key={i} className="cursor-default">
            {word}{" "}
          </span>
        ))}
        <br />
        {line2.map((word, i) => (
          <span key={i} className="cursor-default">
            {word}{" "}
          </span>
        ))}
        <a
          href={FILMS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-white transition-colors"
        >
          films
        </a>
      </span>
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
    </div>
  );
}
