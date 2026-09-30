"use client";

import { useCallback, useLayoutEffect, useRef } from "react";

const GRAIN = 3;

function paintNoise(canvas: HTMLCanvasElement) {
  const parent = canvas.parentElement;
  const rect = parent?.getBoundingClientRect();
  const cssW = rect?.width ?? window.innerWidth;
  const cssH = rect?.height ?? window.innerHeight;
  const w = Math.max(1, Math.floor(cssW / GRAIN));
  const h = Math.max(1, Math.floor(cssH / GRAIN));
  if (canvas.width !== w) canvas.width = w;
  if (canvas.height !== h) canvas.height = h;

  const ctx = canvas.getContext("2d", { alpha: false }) ?? canvas.getContext("2d");
  if (!ctx) return;
  const imageData = ctx.createImageData(w, h);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const g = (Math.random() * 255) | 0;
    data[i] = g;
    data[i + 1] = g;
    data[i + 2] = g;
    data[i + 3] = 255;
  }
  ctx.putImageData(imageData, 0, 0);
}

type StaticNoiseCanvasProps = {
  /** When true, runs requestAnimationFrame until unmounted or active becomes false */
  active: boolean;
  className?: string;
};

export function StaticNoiseCanvas({ active, className }: StaticNoiseCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  const loop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !active) return;
    paintNoise(canvas);
    rafRef.current = requestAnimationFrame(loop);
  }, [active]);

  useLayoutEffect(() => {
    if (!active) {
      cancelAnimationFrame(rafRef.current);
      return;
    }
    const canvas = canvasRef.current;
    if (canvas) paintNoise(canvas);
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, loop]);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !active) return;
    const resize = () => paintNoise(canvas);
    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => resize())
        : null;
    if (ro && canvas.parentElement) ro.observe(canvas.parentElement);
    window.addEventListener("resize", resize);
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        imageRendering: "pixelated",
      }}
    />
  );
}
