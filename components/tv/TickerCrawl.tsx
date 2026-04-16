"use client";

import { TICKER_DEFAULT_TEXT } from "@/lib/channels";

type TickerCrawlProps = {
  text?: string;
  reducedMotion?: boolean;
};

/** One half of the marquee; duplicated so translateX(-50%) loops seamlessly (see globals.css). */
function TickerHalf({
  segment,
  idPrefix,
}: {
  segment: string;
  idPrefix: string;
}) {
  const span = (suffix: string, className = "") => (
    <span
      key={`${idPrefix}-${suffix}`}
      className={`inline-block pr-16 ${className}`}
    >
      {segment}
    </span>
  );

  return (
    <>
      {span("a")}
      {span("b")}
      {span("c", "hidden md:inline-block")}
      {span("d", "hidden lg:inline-block")}
      {span("e", "hidden lg:inline-block")}
      {span("f", "hidden xl:inline-block")}
      {span("g", "hidden xl:inline-block")}
      {span("h", "hidden xl:inline-block")}
      {span("i", "hidden 2xl:inline-block")}
      {span("j", "hidden 2xl:inline-block")}
    </>
  );
}

export function TickerCrawl({
  text = TICKER_DEFAULT_TEXT,
  reducedMotion,
}: TickerCrawlProps) {
  const segment = `${text}   ·   `;

  return (
    <div
      className="shrink-0 border-b border-white/[0.06]"
      style={{ background: "#0a0a0a" }}
    >
      <div
        className="overflow-hidden py-2"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
        }}
      >
        {reducedMotion ? (
          <div className="whitespace-nowrap text-center font-mono text-[10px] uppercase tracking-[0.2em] text-tv-muted opacity-70">
            {text}
          </div>
        ) : (
          <div className="tv-ticker-track font-mono text-[10px] uppercase tracking-[0.2em] text-tv-muted opacity-70">
            <TickerHalf segment={segment} idPrefix="h1" />
            <TickerHalf segment={segment} idPrefix="h2" />
          </div>
        )}
      </div>
    </div>
  );
}
