"use client";

import { useCallback, useLayoutEffect, useRef } from "react";

/** Canvas pixels per CSS pixel — 1 keeps grain fine like analog static. */
const GRAIN = 1;
/** Soft vertical interference bands (scan instability). */
const BAND_FREQ = 0.045;
const BAND_DEPTH = 0.22;
/** How far R/G/B can drift from the shared luminance (chromatic flecks). */
const CHROMA = 28;

function paintNoise(canvas: HTMLCanvasElement, bandPhase: number) {
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

  for (let y = 0; y < h; y++) {
    // Broad horizontal luminosity waves + a touch of row jitter.
    const band =
      1 -
      BAND_DEPTH *
        (0.55 +
          0.45 * Math.sin(y * BAND_FREQ + bandPhase) +
          0.15 * Math.sin(y * BAND_FREQ * 2.7 + bandPhase * 1.3));
    const rowJitter = 0.92 + Math.random() * 0.16;
    const rowMul = band * rowJitter;
    const rowOffset = y * w * 4;

    for (let x = 0; x < w; x++) {
      const i = rowOffset + x * 4;
      // Charcoal-biased luminance (not full 0–255 snow).
      const base = (28 + Math.random() * 150) * rowMul;
      const r = Math.min(255, Math.max(0, base + (Math.random() - 0.5) * CHROMA));
      const g = Math.min(255, Math.max(0, base + (Math.random() - 0.5) * CHROMA));
      const b = Math.min(255, Math.max(0, base + (Math.random() - 0.5) * CHROMA));
      data[i] = r | 0;
      data[i + 1] = g | 0;
      data[i + 2] = b | 0;
      data[i + 3] = 255;
    }
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
  const bandPhaseRef = useRef(0);

  const loop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !active) return;
    bandPhaseRef.current += 0.55;
    paintNoise(canvas, bandPhaseRef.current);
    rafRef.current = requestAnimationFrame(loop);
  }, [active]);

  useLayoutEffect(() => {
    if (!active) {
      cancelAnimationFrame(rafRef.current);
      return;
    }
    const canvas = canvasRef.current;
    if (canvas) paintNoise(canvas, bandPhaseRef.current);
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, loop]);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !active) return;
    const resize = () => paintNoise(canvas, bandPhaseRef.current);
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
