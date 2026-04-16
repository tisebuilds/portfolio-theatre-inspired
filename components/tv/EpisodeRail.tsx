"use client";

import { useContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { RampEpisode } from "@/data/case-studies/ramp-types";
import { EpisodeTitleRailContext } from "./EpisodeTitleRailContext";

type EpisodeRailProps = {
  episodes: RampEpisode[];
  channelParam: number;
};

export function EpisodeRail({ episodes, channelParam }: EpisodeRailProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const titleRail = useContext(EpisodeTitleRailContext);
  const heroTitleInView = titleRail?.heroTitleInView ?? true;
  const visible = episodes.filter((e) => !e.hidden);
  const epRaw = searchParams.get("ep");
  const parsed = epRaw !== null ? Number.parseInt(epRaw, 10) : 0;
  const active = Number.isFinite(parsed)
    ? Math.min(Math.max(parsed, 0), Math.max(0, visible.length - 1))
    : 0;

  const setEp = (idx: number) => {
    const q = new URLSearchParams(searchParams.toString());
    q.set("ch", String(channelParam));
    q.set("ep", String(idx));
    router.replace(`/?${q.toString()}`, { scroll: false });
  };

  if (visible.length <= 1) return null;

  return (
    <div className="flex h-[calc(theme(spacing.4)+2.5rem+theme(spacing.4)+1px)] shrink-0 flex-wrap items-center gap-1.5 border-b border-white/[0.06] px-3">
      {visible.map((ep, i) => {
        const on = i === active;
        const showTitleInPill = on && !heroTitleInView;
        return (
          <button
            key={ep.title}
            type="button"
            onClick={() => setEp(i)}
            aria-label={
              on
                ? `${ep.title}, case ${i + 1} of ${visible.length}`
                : `Case ${i + 1}, ${ep.title}`
            }
            className={`flex max-w-full min-w-0 cursor-pointer items-center rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider leading-none transition-colors ${
              on && !showTitleInPill ? "justify-center" : ""
            } ${
              on
                ? "border-white/25 bg-white/10 text-white"
                : "border-transparent text-tv-muted hover:border-tv-pink"
            }`}
          >
            <span className="flex shrink-0 items-center justify-center normal-case tabular-nums tracking-normal">
              Case {i + 1}
            </span>
            {on ? (
              <span
                className={`min-w-0 overflow-hidden border-l transition-[max-width,opacity,transform,border-color,margin,padding-left] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                  showTitleInPill
                    ? "ml-1.5 max-w-[min(18rem,calc(100vw-14rem))] border-white/20 pl-1.5 opacity-100 translate-x-0"
                    : "m-0 max-w-0 border-0 p-0 opacity-0 translate-x-0 pointer-events-none"
                }`}
                aria-hidden={!showTitleInPill}
              >
                <span className="block truncate font-mono text-[10px] font-medium normal-case leading-none tracking-normal">
                  {ep.title}
                </span>
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
