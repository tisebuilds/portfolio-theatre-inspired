"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { ChannelNumber } from "@/lib/channels";
import {
  playChannelFlipSound,
  primeAudioContext,
} from "@/lib/playChannelFlipSound";
import type { AboutPhilosophyNavItem } from "@/data/about-philosophy-nav";
import { isOutcomePickCard } from "@/data/about-philosophy-nav";

function useReducedMotion() {
  const [rm, setRm] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fn = () => setRm(mq.matches);
    fn();
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return rm;
}

type PhilosophyNavCardProps = {
  item: AboutPhilosophyNavItem;
};

export function PhilosophyNavCard({ item }: PhilosophyNavCardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reducedMotion = useReducedMotion();
  const [flipped, setFlipped] = useState(false);

  const pickMode = isOutcomePickCard(item);

  const navigateTo = useCallback(
    (channel: ChannelNumber, episodeIndex: number) => {
      const q = new URLSearchParams(searchParams.toString());
      q.set("ch", String(channel));
      q.set("view", "episode");
      q.set("ep", String(episodeIndex));
      router.replace(`/?${q.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  const handleFlipOpen = useCallback(() => {
    if (flipped) return;
    primeAudioContext();
    playChannelFlipSound({ reducedMotion });
    setFlipped(true);
  }, [flipped, reducedMotion]);

  const handleFlipBack = useCallback(() => {
    setFlipped(false);
  }, []);

  const openCaseStudy = useCallback(
    (channel: ChannelNumber, episodeIndex: number) => {
      primeAudioContext();
      playChannelFlipSound({ reducedMotion });
      navigateTo(channel, episodeIndex);
    },
    [navigateTo, reducedMotion],
  );

  const flipClass = `relative h-full min-h-[10.5rem] [transform-style:preserve-3d] ${
    reducedMotion ? "" : "transition-transform duration-500 ease-out"
  } motion-reduce:transition-none ${
    flipped ? "[transform:rotateY(180deg)]" : ""
  }`;

  const shellClass =
    "group h-full min-h-[11rem] w-full min-w-0 rounded-xl border border-neutral-800 bg-neutral-900/40 text-left transition-[border-color,box-shadow] hover:border-neutral-600";

  const frontAria = pickMode
    ? "Outcome-first — open card to choose a case study"
    : `Open card for case study: ${item.episodeLabel}`;

  const chLabelSingle = !pickMode
    ? `CH ${String(item.channel).padStart(2, "0")}`
    : "";

  return (
    <div
      className={`${shellClass}${flipped ? " cursor-pointer" : ""}`}
      onClick={() => {
        if (flipped) handleFlipBack();
      }}
    >
      <div className="h-full min-h-[10.5rem] [perspective:1200px]">
        <div className={flipClass}>
          <div
            className="absolute inset-0 flex min-h-[10.5rem] flex-col rounded-[11px] border border-transparent bg-neutral-900/40 px-5 py-4 [backface-visibility:hidden]"
            inert={flipped}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleFlipOpen();
              }}
              onPointerDown={() => {
                primeAudioContext();
              }}
              className="flex min-h-0 flex-1 flex-col text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/25"
              aria-expanded={flipped}
              aria-label={frontAria}
            >
              <h3 className="font-mono text-[10px] uppercase tracking-wider text-neutral-200">
                {item.philosophyTitle}
              </h3>
              <p className="mt-2 flex-1 text-left text-sm leading-snug text-neutral-200">
                {item.body}
              </p>
            </button>
          </div>
          <div
            className="absolute inset-0 flex min-h-[10.5rem] flex-col rounded-[11px] border border-neutral-700 bg-neutral-950/90 px-5 py-4 [backface-visibility:hidden] [transform:rotateY(180deg)]"
            inert={!flipped}
          >
            {pickMode ? (
              <>
                <ul className="m-0 flex list-none flex-col gap-2 p-0">
                  {item.backLinks.map((link) => {
                    const chLabel = `CH ${String(link.channel).padStart(2, "0")}`;
                    return (
                      <li key={link.label} className="min-w-0">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            openCaseStudy(link.channel, link.episodeIndex);
                          }}
                          className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 text-left font-mono text-xs normal-case text-neutral-100 transition-colors hover:border-tv-pink/50 hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25"
                        >
                          <span className="block truncate">{link.label}</span>
                          <span className="mt-0.5 block font-mono text-[9px] uppercase tracking-wider text-tv-muted">
                            {chLabel} · Case {link.episodeIndex + 1}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </>
            ) : (
              <>
                <p className="font-mono text-xs normal-case text-neutral-100">
                  {item.episodeLabel}
                </p>
                <p className="mt-0.5 font-mono text-[9px] uppercase tracking-wider text-tv-muted">
                  {chLabelSingle} · Case {item.episodeIndex + 1}
                </p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openCaseStudy(item.channel, item.episodeIndex);
                  }}
                  className="mt-4 w-full rounded-lg border border-tv-pink/40 bg-tv-pink/15 px-3 py-2.5 text-center font-mono text-[10px] uppercase tracking-wider text-neutral-100 transition-colors hover:border-tv-pink/70 hover:bg-tv-pink/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25"
                >
                  Open case study
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
