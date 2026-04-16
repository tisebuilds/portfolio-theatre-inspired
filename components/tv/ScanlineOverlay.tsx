"use client";

type ScanlineOverlayProps = {
  /** 0–1 opacity multiplier for the scanline layer */
  opacity: number;
  className?: string;
};

export function ScanlineOverlay({ opacity, className }: ScanlineOverlayProps) {
  return (
    <div
      className={className}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 45,
        pointerEvents: "none",
        opacity,
        background: `repeating-linear-gradient(
          0deg,
          transparent 0px,
          transparent 2px,
          rgba(0,0,0,0.35) 2px,
          rgba(0,0,0,0.35) 3px
        )`,
        mixBlendMode: "multiply",
      }}
    />
  );
}
