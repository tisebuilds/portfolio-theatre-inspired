"use client";

import { useCallback, useEffect, useRef } from "react";

function drawFrame(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  imageData: ImageData,
  data: Uint8ClampedArray,
) {
  const len = w * h * 4;
  for (let i = 0; i < len; i += 4) {
    const g = (Math.random() * 255) | 0;
    data[i] = g;
    data[i + 1] = g;
    data[i + 2] = g;
    data[i + 3] = 255;
  }
  ctx.putImageData(imageData, 0, 0);
  ctx.save();
  for (let y = 0; y < h; y += 3) {
    ctx.fillStyle = "rgba(0,0,0,0.15)";
    ctx.fillRect(0, y, w, 1);
  }
  ctx.restore();
}

type StaticNoiseCanvasProps = {
  /** When true, runs requestAnimationFrame until unmounted or active becomes false */
  active: boolean;
  className?: string;
};

export function StaticNoiseCanvas({ active, className }: StaticNoiseCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const imageDataRef = useRef<ImageData | null>(null);

  const loop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !active) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    if (w === 0 || h === 0) {
      rafRef.current = requestAnimationFrame(loop);
      return;
    }
    let imageData = imageDataRef.current;
    if (!imageData || imageData.width !== w || imageData.height !== h) {
      imageData = ctx.createImageData(w, h);
      imageDataRef.current = imageData;
    }
    drawFrame(ctx, w, h, imageData, imageData.data);
    rafRef.current = requestAnimationFrame(loop);
  }, [active]);

  useEffect(() => {
    if (!active) {
      cancelAnimationFrame(rafRef.current);
      return;
    }
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, loop]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
      const parent = canvas.parentElement;
      const rect = parent?.getBoundingClientRect();
      const w = rect?.width ?? window.innerWidth;
      const h = rect?.height ?? window.innerHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    requestAnimationFrame(resize);
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
  }, []);

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
      }}
    />
  );
}
