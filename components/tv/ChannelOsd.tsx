"use client";

import { ACCENT_WORK } from "@/lib/channels";

type ChannelOsdProps = {
  lines: string[];
  /** work / side = pink accent, signal = muted (NO SIGNAL) */
  variant: "work" | "side" | "signal";
  visible: boolean;
  /** When true, do not auto-hide (NO SIGNAL) */
  persistent?: boolean;
};

export function ChannelOsd({
  lines,
  variant,
  visible,
  persistent = false,
}: ChannelOsdProps) {
  const color =
    variant === "work" || variant === "side" ? ACCENT_WORK : "#888888";
  if (!visible || lines.length === 0) return null;

  return (
    <div
      className="pointer-events-none absolute left-4 top-4 z-[60] max-w-[min(90vw,28rem)] font-mono text-[11px] sm:text-xs"
      style={{ color }}
    >
      {lines.map((line, i) => (
        <div key={i} className="font-mono uppercase tracking-[0.12em]">
          {line}
        </div>
      ))}
    </div>
  );
}
