"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Project } from "@/app/types";
import {
  CHANNELS,
  SIGNAL_LOST_PARAM,
  type ChannelNumber,
  channelByNumber,
  homeSearchParamsForChannel,
  parseChannelFromSearchParams,
} from "@/lib/channels";
import {
  syncTvHistoryBeforeRouter,
  tvLiveSearchParams,
} from "@/lib/tv-live-search-params";
import { playChannelFlipSound, primeAudioContext } from "@/lib/playChannelFlipSound";
import { ChannelOsd } from "./ChannelOsd";
import { MainViewport } from "./MainViewport";
import { MobileResumeView } from "./MobileResumeView";
import { RemotePill } from "./RemotePill";
import { ScanlineOverlay } from "./ScanlineOverlay";
import { SidebarIcons } from "./SidebarIcons";
import { SidebarNav } from "./SidebarNav";
import { StaticNoiseCanvas } from "./StaticNoiseCanvas";
import { TickerCrawl } from "./TickerCrawl";
import {
  DISSOLVE_MS,
  FADE_IN_MS,
  OSD_VISIBLE_MS,
  SCANLINE_PEAK,
  SCANLINE_REST,
  STATIC_HOLD_MS,
  TOTAL_TRANSITION_MS,
} from "./tv-timing";
import { channelIndexFromDigit, useTvKeyboard, wrapChannelIndex } from "./useTvKeyboard";

type Phase = "idle" | "dissolve" | "static" | "fade";

function useMinMd() {
  const [md, setMd] = useState(false);
  useLayoutEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const fn = () => setMd(mq.matches);
    fn();
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return md;
}

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

type TvShellProps = {
  projects: Project[];
};

export function TvShell({ projects }: TvShellProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  /** Bumps a no-op render so children re-read `tvLiveSearchParams` when the URL changed without a reliable `useSearchParams` tick. */
  const [, syncShellToQuery] = useReducer((x: number) => x + 1, 0);
  const isMd = useMinMd();
  const reducedMotion = useReducedMotion();

  const timersRef = useRef<number[]>([]);
  const bootedThisMountRef = useRef(false);
  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => clearTimeout(id));
    timersRef.current = [];
  }, []);

  const [channelIndex, setChannelIndex] = useState(() => {
    const p = parseChannelFromSearchParams(
      new URLSearchParams(searchParams.toString()),
    );
    if (p.mode === "signalLost") return 0;
    return p.channel - 1;
  });
  const [signalLost, setSignalLost] = useState(() => {
    const p = parseChannelFromSearchParams(
      new URLSearchParams(searchParams.toString()),
    );
    return p.mode === "signalLost";
  });
  const [phase, setPhase] = useState<Phase>("idle");
  const [displayIndex, setDisplayIndex] = useState(channelIndex);

  const [osd, setOsd] = useState<{
    lines: string[];
    variant: "work" | "side" | "signal";
    persistent?: boolean;
  } | null>(() => {
    const p = parseChannelFromSearchParams(
      new URLSearchParams(searchParams.toString()),
    );
    if (p.mode === "signalLost") {
      return {
        lines: ["NO SIGNAL", "CH --"],
        variant: "signal" as const,
        persistent: true,
      };
    }
    return null;
  });

  const [scanOpacity, setScanOpacity] = useState(SCANLINE_REST);
  const [mainOpacity, setMainOpacity] = useState(1);

  const isTransitioning = phase !== "idle";

  /** Align TV state with the real URL before paint (fixes direct loads / hydration lag). */
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const p = parseChannelFromSearchParams(params);
    if (p.mode === "signalLost") {
      setSignalLost(true);
      setChannelIndex(0);
      setDisplayIndex(0);
      setOsd({
        lines: ["NO SIGNAL", "CH --"],
        variant: "signal",
        persistent: true,
      });
      return;
    }
    setSignalLost(false);
    const idx = p.channel - 1;
    setChannelIndex(idx);
    setDisplayIndex(idx);
    setOsd(null);
  }, []);

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  useEffect(() => {
    if (!isMd) return;
    if (reducedMotion) return;
    if (signalLost) return;
    if (bootedThisMountRef.current) return;

    const BOOT_STATIC_MS = 600;
    const key = "tvBooted";
    let alreadyBooted = false;
    try {
      alreadyBooted = window.sessionStorage.getItem(key) === "1";
    } catch {
      alreadyBooted = false;
    }
    if (alreadyBooted) return;

    bootedThisMountRef.current = true;
    try {
      window.sessionStorage.setItem(key, "1");
    } catch {
      // ignore
    }

    clearTimers();
    setScanOpacity(SCANLINE_PEAK);
    setPhase("static");

    const t1 = window.setTimeout(() => setPhase("fade"), BOOT_STATIC_MS);
    const t2 = window.setTimeout(() => {
      setPhase("idle");
      setScanOpacity(SCANLINE_REST);
    }, BOOT_STATIC_MS + FADE_IN_MS);
    timersRef.current.push(t1, t2);
  }, [clearTimers, isMd, reducedMotion, signalLost]);

  useLayoutEffect(() => {
    if (phase === "dissolve") {
      setMainOpacity(1);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setMainOpacity(0));
      });
    } else if (phase === "static") {
      setMainOpacity(0);
    } else if (phase === "fade") {
      setMainOpacity(0);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setMainOpacity(1));
      });
    } else {
      setMainOpacity(1);
    }
  }, [phase]);

  useEffect(() => {
    if (isTransitioning) return;
    const live = tvLiveSearchParams(searchParams);
    const p = parseChannelFromSearchParams(live);
    if (p.mode === "signalLost") {
      setSignalLost(true);
      setOsd({
        lines: ["NO SIGNAL", "CH --"],
        variant: "signal",
        persistent: true,
      });
      return;
    }
    const idx = p.channel - 1;
    setSignalLost(false);
    setChannelIndex(idx);
    setDisplayIndex(idx);
    setOsd(null);
  }, [searchParams, isTransitioning]);

  useEffect(() => {
    if (isTransitioning) return;
    const live = tvLiveSearchParams(searchParams);
    const parsed = parseChannelFromSearchParams(live);
    if (parsed.mode !== "channel") return;
    const chNum = parsed.channel;
    /** Work channels with a single episode: default to episode view (same as Ramp 1–2). */
    const singleEpisodeChannels: ChannelNumber[] = [1, 2, 3, 4, 5];
    if (!singleEpisodeChannels.includes(chNum)) return;

    const view = live.get("view") ?? "";
    if (view !== "") return;

    const next = new URLSearchParams(live.toString());
    next.set("ch", String(chNum));
    next.set("view", "episode");
    if (!next.has("ep")) next.set("ep", "0");
    router.replace(`/?${next.toString()}`, { scroll: false });
  }, [isTransitioning, router, searchParams]);

  const pushUrl = useCallback(
    (
      next:
        | { signalLost: true }
        | {
            signalLost: false;
            channel: ChannelNumber;
            /** When set (e.g. sidebar episode), overrides default `ep=0` from `homeSearchParamsForChannel`. */
            episodeIndex?: number;
          },
    ) => {
      const p = tvLiveSearchParams(searchParams);
      if (next.signalLost) {
        p.delete("ch");
        p.set(SIGNAL_LOST_PARAM, "lost");
        p.delete("view");
        p.delete("ep");
      } else if (next.channel !== undefined) {
        const chNum = next.channel;
        const q = homeSearchParamsForChannel(chNum);
        if (next.episodeIndex !== undefined) {
          q.set("ep", String(Math.max(0, next.episodeIndex)));
        }
        const kbd = tvLiveSearchParams(searchParams).get("kbd");
        if (kbd) q.set("kbd", kbd);
        const href = `/?${q.toString()}`;
        syncTvHistoryBeforeRouter(href);
        router.replace(href, { scroll: false });
        syncShellToQuery();
        return;
      }
      const href = `/?${p.toString()}`;
      syncTvHistoryBeforeRouter(href);
      router.replace(href, { scroll: false });
      syncShellToQuery();
    },
    [router, searchParams, syncShellToQuery],
  );

  const showChannelOsd = useCallback((chNum: ChannelNumber) => {
    const ch = channelByNumber(chNum);
    if (ch.kind !== "side-project") {
      setOsd(null);
      return;
    }
    setOsd({
      lines: [`CH ${String(chNum).padStart(2, "0")}`, ch.osdShort],
      variant: "side",
    });
  }, []);

  useEffect(() => {
    if (!osd || osd.persistent) return;
    const t = setTimeout(() => setOsd(null), OSD_VISIBLE_MS);
    return () => clearTimeout(t);
  }, [osd]);

  const runTransition = useCallback(
    (
      from: number,
      to: number,
      opts?: {
        fromSignalLost?: boolean;
        forceUrlSync?: boolean;
        /** Sidebar episode row: same or new channel with a specific `ep` (static burst matches channel flips). */
        targetEpisodeIndex?: number;
      },
    ) => {
      const pushChannel = (ch: ChannelNumber) => {
        if (opts?.targetEpisodeIndex !== undefined) {
          pushUrl({
            signalLost: false,
            channel: ch,
            episodeIndex: Math.max(0, opts.targetEpisodeIndex),
          });
        } else {
          pushUrl({ signalLost: false, channel: ch });
        }
      };

      if (!isMd) {
        setSignalLost(false);
        pushChannel((to + 1) as ChannelNumber);
        const defer = window.setTimeout(() => {
          setChannelIndex(to);
          setDisplayIndex(to);
          setPhase("idle");
        }, 0);
        timersRef.current.push(defer);
        return;
      }
      /** Leaving `?view=about` or `?view=resume` while staying on the same channel index (e.g. default CH 01). */
      if (opts?.forceUrlSync && from === to && !signalLost) {
        clearTimers();
        setPhase("idle");
        setScanOpacity(SCANLINE_REST);
        setSignalLost(false);
        pushChannel((to + 1) as ChannelNumber);
        const deferFs = window.setTimeout(() => {
          setChannelIndex(to);
          setDisplayIndex(to);
          showChannelOsd((to + 1) as ChannelNumber);
        }, 0);
        timersRef.current.push(deferFs);
        return;
      }

      const live = tvLiveSearchParams(searchParams);
      const epRaw = live.get("ep");
      const parsedEp =
        epRaw !== null && epRaw !== ""
          ? Number.parseInt(epRaw, 10)
          : 0;
      const currentEp = Number.isFinite(parsedEp) ? Math.max(0, parsedEp) : 0;
      const targetEp =
        opts?.targetEpisodeIndex !== undefined
          ? Math.max(0, opts.targetEpisodeIndex)
          : undefined;
      const episodeChanges =
        targetEp !== undefined && targetEp !== currentEp;

      if (
        !opts?.fromSignalLost &&
        !signalLost &&
        from === to &&
        !opts?.forceUrlSync &&
        !episodeChanges
      ) {
        return;
      }

      clearTimers();
      playChannelFlipSound({ reducedMotion, muted: !isMd });

      if (reducedMotion) {
        setSignalLost(false);
        pushChannel((to + 1) as ChannelNumber);
        const deferRm = window.setTimeout(() => {
          setChannelIndex(to);
          setDisplayIndex(to);
          setPhase("idle");
          showChannelOsd((to + 1) as ChannelNumber);
          syncShellToQuery();
        }, 0);
        timersRef.current.push(deferRm);
        return;
      }

      setPhase("dissolve");
      setScanOpacity(SCANLINE_PEAK);

      const t1 = window.setTimeout(() => setPhase("static"), DISSOLVE_MS);
      const t2 = window.setTimeout(() => {
        pushChannel((to + 1) as ChannelNumber);
        // Macrotask: `router.replace` can leave `window.location` stale for one microtask tick (see MainViewport logs).
        const deferFade = window.setTimeout(() => {
          setDisplayIndex(to);
          setSignalLost(false);
          setPhase("fade");
          showChannelOsd((to + 1) as ChannelNumber);
          syncShellToQuery();
        }, 0);
        timersRef.current.push(deferFade);
      }, DISSOLVE_MS + STATIC_HOLD_MS);
      const t3 = window.setTimeout(() => {
        setPhase("idle");
        setChannelIndex(to);
        setScanOpacity(SCANLINE_REST);
      }, TOTAL_TRANSITION_MS);
      timersRef.current.push(t1, t2, t3);
    },
    [
      clearTimers,
      isMd,
      pushUrl,
      reducedMotion,
      searchParams,
      showChannelOsd,
      signalLost,
      syncShellToQuery,
    ],
  );

  const goSignalLost = useCallback(() => {
    if (!isMd) return;
    clearTimers();
    playChannelFlipSound({ reducedMotion, muted: !isMd });
    setSignalLost(true);
    setPhase("idle");
    setDisplayIndex(channelIndex);
    setOsd({
      lines: ["NO SIGNAL", "CH --"],
      variant: "signal",
      persistent: true,
    });
    pushUrl({ signalLost: true });
  }, [channelIndex, clearTimers, isMd, pushUrl, reducedMotion]);

  const navigateToCaseStudyEpisode = useCallback(
    (channel: ChannelNumber, episodeIndex: number) => {
      if (isTransitioning) return;
      primeAudioContext();
      const live = tvLiveSearchParams(searchParams);
      const parsed = parseChannelFromSearchParams(live);
      if (parsed.mode === "signalLost") return;

      const fromIdx = parsed.channel - 1;
      const toIdx = channel - 1;
      const ep = Math.max(0, episodeIndex);
      const epRaw = live.get("ep");
      const parsedEp =
        epRaw !== null && epRaw !== ""
          ? Number.parseInt(epRaw, 10)
          : 0;
      const currentEp = Number.isFinite(parsedEp) ? Math.max(0, parsedEp) : 0;
      if (fromIdx === toIdx && ep === currentEp) return;

      runTransition(fromIdx, toIdx, { targetEpisodeIndex: ep });
    },
    [isTransitioning, primeAudioContext, runTransition, searchParams],
  );

  const selectChannel = useCallback(
    (ch: ChannelNumber) => {
      primeAudioContext();
      const to = channelIndexFromDigit(ch);
      if (signalLost) {
        setOsd(null);
        runTransition(channelIndex, to, { fromSignalLost: true });
        return;
      }
      const live = tvLiveSearchParams(searchParams);
      const parsed = parseChannelFromSearchParams(live);
      const fromIdx =
        parsed.mode === "channel" ? parsed.channel - 1 : channelIndex;
      const view = live.get("view") ?? "";
      const overlayOpen =
        view === "about" || view === "resume" || view === "gallery";
      /** CH 01–05 must land on `view=episode`; same-channel click was no-op when URL omitted `view`. */
      const needsEpisodeCanonical =
        !overlayOpen &&
        fromIdx >= 0 &&
        fromIdx <= 4 &&
        view !== "episode";
      if (to === fromIdx && !overlayOpen && !needsEpisodeCanonical) return;
      runTransition(fromIdx, to, {
        forceUrlSync:
          (overlayOpen && to === fromIdx) ||
          (needsEpisodeCanonical && to === fromIdx),
      });
    },
    [channelIndex, runTransition, searchParams, signalLost],
  );

  const onPrev = useCallback(() => {
    primeAudioContext();
    if (signalLost) {
      runTransition(channelIndex, wrapChannelIndex(channelIndex - 1), {
        fromSignalLost: true,
      });
      return;
    }
    const live = tvLiveSearchParams(searchParams);
    const parsed = parseChannelFromSearchParams(live);
    const fromIdx =
      parsed.mode === "channel" ? parsed.channel - 1 : channelIndex;
    const to = wrapChannelIndex(fromIdx - 1);
    runTransition(fromIdx, to);
  }, [channelIndex, runTransition, searchParams, signalLost]);

  const onNext = useCallback(() => {
    primeAudioContext();
    if (signalLost) {
      runTransition(channelIndex, wrapChannelIndex(channelIndex + 1), {
        fromSignalLost: true,
      });
      return;
    }
    const live = tvLiveSearchParams(searchParams);
    const parsed = parseChannelFromSearchParams(live);
    const fromIdx =
      parsed.mode === "channel" ? parsed.channel - 1 : channelIndex;
    const to = wrapChannelIndex(fromIdx + 1);
    runTransition(fromIdx, to);
  }, [channelIndex, runTransition, searchParams, signalLost]);

  useTvKeyboard({
    enabled: isMd,
    isTransitioning,
    onPrevChannel: onPrev,
    onNextChannel: onNext,
    onSelectChannel: selectChannel,
    onSignalLost: goSignalLost,
  });

  const staticBurst = phase === "static";
  const staticHold = signalLost || staticBurst;

  const cursorClass = isMd && isTransitioning ? "cursor-none" : "";

  const viewParam = tvLiveSearchParams(searchParams).get("view") ?? "";
  const aboutActive = viewParam === "about";
  const resumeActive = viewParam === "resume";

  const accentClass = signalLost ? "text-tv-muted" : "text-tv-pink";

  const mainTransition =
    phase === "dissolve"
      ? `opacity ${DISSOLVE_MS}ms ease-out`
      : phase === "fade"
        ? `opacity ${FADE_IN_MS}ms ease-in`
        : "none";

  return (
    <div
      className={`fixed inset-0 z-0 flex flex-col bg-tv-bg text-tv-text ${cursorClass}`}
    >
      <TickerCrawl reducedMotion={reducedMotion} />

      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto md:flex-row md:overflow-hidden">
        <div className="md:hidden">
          <MobileResumeView projects={projects} />
        </div>

        <div
          id="app"
          className="relative hidden min-h-0 flex-1 flex-row overflow-hidden md:flex"
        >
          <aside
            id="sidebar"
            className="flex w-[min(100%,280px)] shrink-0 flex-col border-r border-white/[0.06]"
          >
            <div className="min-h-0 flex-1 overflow-hidden">
              <SidebarNav
                activeIndex={displayIndex}
                signalLost={signalLost}
                aboutActive={aboutActive}
                resumeActive={resumeActive}
                onSelectChannel={selectChannel}
                onNavigateToCaseStudyEpisode={navigateToCaseStudyEpisode}
                onPrimeAudio={primeAudioContext}
              />
            </div>
            <div className="shrink-0 pb-2 flex flex-col gap-3">
              <div className="px-6">
                <RemotePill
                  accentClass={accentClass}
                  channelDisplay={
                    signalLost
                      ? "CH -- / 08"
                      : aboutActive
                        ? "About me"
                        : resumeActive
                          ? "Resume"
                          : `CH ${String(channelIndex + 1).padStart(2, "0")} / 08`
                  }
                  onUp={onPrev}
                  onDown={onNext}
                  disabled={isTransitioning}
                />
              </div>
              <div className="px-2">
                <SidebarIcons
                  aboutActive={aboutActive}
                  resumeActive={resumeActive}
                  onPrimeAudio={primeAudioContext}
                  onAfterPortfolioQueryNav={syncShellToQuery}
                />
              </div>
            </div>
          </aside>

          <div
            id="main"
            className="relative flex min-h-0 min-w-0 flex-1 flex-col bg-black"
          >
            <div className="relative flex min-h-0 flex-1">
              <div className="relative min-h-0 flex-1">
                <MainViewport
                  channelIndex={displayIndex}
                  signalLost={signalLost}
                  projects={projects}
                  interactionLocked={isMd && isTransitioning}
                  contentOpacity={mainOpacity}
                  contentTransition={mainTransition}
                  onAfterQueryReplace={syncShellToQuery}
                />
              </div>

              {osd ? (
                <ChannelOsd
                  lines={osd.lines}
                  variant={osd.variant}
                  visible
                  persistent={osd.persistent}
                />
              ) : null}

              {isMd ? (
                <StaticNoiseCanvas
                  active={staticHold && !reducedMotion}
                  className="z-40"
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <ScanlineOverlay opacity={scanOpacity} />
    </div>
  );
}
