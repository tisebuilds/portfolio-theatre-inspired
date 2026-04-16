"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { RampEpisode } from "@/data/case-studies/ramp-types";
import { ACCENT_WORK } from "@/lib/channels";

type RampChannelLandingProps = {
  channelNumber: number;
  channelLabel: string;
  roleLine: string;
  yearRange: string;
  episodes: RampEpisode[];
};

export function RampChannelLanding({
  channelNumber,
  channelLabel,
  roleLine,
  yearRange,
  episodes,
}: RampChannelLandingProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const visible = episodes.filter((e) => !e.hidden);

  const openEpisode = (idx: number) => {
    const q = new URLSearchParams(searchParams.toString());
    q.set("ch", String(channelNumber));
    q.set("view", "episode");
    q.set("ep", String(idx));
    router.replace(`/?${q.toString()}`, { scroll: false });
  };

  return (
    <div className="h-full min-h-0 flex-1 overflow-y-auto bg-black px-6 py-10">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-tv-muted">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: ACCENT_WORK }}
              aria-hidden
            />
            <span>Work experience</span>
            <span aria-hidden>·</span>
            <span>CH {String(channelNumber).padStart(2, "0")}</span>
          </div>
          <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-tv-muted">
            Ramp
          </div>
          <h1 className="mt-2 text-5xl font-semibold tracking-tight text-white">
            {channelLabel}
          </h1>
          <p className="mt-2 text-sm text-tv-muted">
            {roleLine} · {yearRange}
          </p>
        </div>

        <div className="divide-y divide-white/[0.06] rounded-lg border border-white/[0.06] bg-white/[0.02]">
          {visible.map((ep, i) => (
            <button
              key={ep.title}
              type="button"
              onClick={() => openEpisode(i)}
              className="group flex w-full items-center gap-4 px-4 py-4 text-left hover:bg-white/[0.03]"
            >
              <div className="flex h-14 w-20 shrink-0 items-center justify-center rounded-md border border-white/[0.08] bg-black/40 px-1 text-center font-mono text-[10px] font-medium normal-case leading-tight tracking-wide text-tv-muted">
                Case {i + 1}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium text-white">
                  {ep.title}
                </div>
                {ep.pillSub ? (
                  <div className="mt-0.5 truncate text-xs text-tv-muted">
                    {ep.pillSub}
                  </div>
                ) : null}
                {ep.logline ? (
                  <div className="mt-1 truncate text-xs text-tv-muted/80">
                    {ep.logline}
                  </div>
                ) : null}
              </div>
              <div className="shrink-0 text-tv-muted transition-colors group-hover:text-white">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 10 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden
                >
                  <path d="M3 1.5l4 3.5L3 8.5" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

