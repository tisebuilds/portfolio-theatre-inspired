"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Project } from "@/app/types";
import {
  CHANNELS,
  SIGNAL_LOST_PARAM,
  type ChannelNumber,
  channelByNumber,
  parseChannelFromSearchParams,
} from "@/lib/channels";
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
  useEffect(() => {
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
    const p = parseChannelFromSearchParams(searchParams);
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
    const parsed = parseChannelFromSearchParams(searchParams);
    if (parsed.mode !== "channel") return;
    const chNum = parsed.channel;
    /** Work channels with a single episode: default to episode view (same as Ramp 1–2). */
    const singleEpisodeChannels: ChannelNumber[] = [1, 2, 3, 4, 5];
    if (!singleEpisodeChannels.includes(chNum)) return;

    const view = searchParams.get("view") ?? "";
    if (view !== "") return;

    const next = new URLSearchParams(searchParams.toString());
    next.set("ch", String(chNum));
    next.set("view", "episode");
    if (!next.has("ep")) next.set("ep", "0");
    router.replace(`/?${next.toString()}`, { scroll: false });
  }, [isTransitioning, router, searchParams]);

  const pushUrl = useCallback(
    (next: { signalLost: boolean; channel?: ChannelNumber }) => {
      const p = new URLSearchParams(searchParams.toString());
      if (next.signalLost) {
        p.delete("ch");
        p.set(SIGNAL_LOST_PARAM, "lost");
        p.delete("view");
        p.delete("ep");
      } else if (next.channel !== undefined) {
        p.delete(SIGNAL_LOST_PARAM);
        p.set("ch", String(next.channel));
        const chNum = next.channel;
        if (chNum >= 1 && chNum <= 5) {
          p.set("view", "episode");
          if (!p.has("ep")) p.set("ep", "0");
        } else {
          p.delete("view");
          p.delete("ep");
        }
      }
      router.replace(`/?${p.toString()}`, { scroll: false });
    },
    [router, searchParams],
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
      opts?: { fromSignalLost?: boolean; forceUrlSync?: boolean },
    ) => {
      if (!isMd) {
        setSignalLost(false);
        setChannelIndex(to);
        setDisplayIndex(to);
        setPhase("idle");
        pushUrl({ signalLost: false, channel: (to + 1) as ChannelNumber });
        return;
      }
      /** Leaving `?view=about` or `?view=resume` while staying on the same channel index (e.g. default CH 01). */
      if (opts?.forceUrlSync && from === to && !signalLost) {
        clearTimers();
        setPhase("idle");
        setScanOpacity(SCANLINE_REST);
        setSignalLost(false);
        setChannelIndex(to);
        setDisplayIndex(to);
        showChannelOsd((to + 1) as ChannelNumber);
        pushUrl({ signalLost: false, channel: (to + 1) as ChannelNumber });
        return;
      }
      if (!opts?.fromSignalLost && !signalLost && from === to) return;

      clearTimers();
      playChannelFlipSound({ reducedMotion, muted: !isMd });

      if (reducedMotion) {
        setSignalLost(false);
        setChannelIndex(to);
        setDisplayIndex(to);
        setPhase("idle");
        showChannelOsd((to + 1) as ChannelNumber);
        pushUrl({ signalLost: false, channel: (to + 1) as ChannelNumber });
        return;
      }

      setPhase("dissolve");
      setScanOpacity(SCANLINE_PEAK);

      const t1 = window.setTimeout(() => setPhase("static"), DISSOLVE_MS);
      const t2 = window.setTimeout(() => {
        setDisplayIndex(to);
        setSignalLost(false);
        setPhase("fade");
        showChannelOsd((to + 1) as ChannelNumber);
        // Keep `view`/`ep` in sync with the displayed channel during fade-in.
        // Otherwise `MainViewport` can briefly render the new channel using the old URL view state.
        pushUrl({ signalLost: false, channel: (to + 1) as ChannelNumber });
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
      showChannelOsd,
      signalLost,
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

  const selectChannel = useCallback(
    (ch: ChannelNumber) => {
      primeAudioContext();
      const to = channelIndexFromDigit(ch);
      if (signalLost) {
        setOsd(null);
        runTransition(channelIndex, to, { fromSignalLost: true });
        return;
      }
      const view = searchParams.get("view") ?? "";
      const overlayOpen = view === "about" || view === "resume";
      if (to === channelIndex && !overlayOpen) return;
      runTransition(channelIndex, to, {
        forceUrlSync: overlayOpen && to === channelIndex,
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
    const to = wrapChannelIndex(channelIndex - 1);
    runTransition(channelIndex, to);
  }, [channelIndex, runTransition, signalLost]);

  const onNext = useCallback(() => {
    primeAudioContext();
    if (signalLost) {
      runTransition(channelIndex, wrapChannelIndex(channelIndex + 1), {
        fromSignalLost: true,
      });
      return;
    }
    const to = wrapChannelIndex(channelIndex + 1);
    runTransition(channelIndex, to);
  }, [channelIndex, runTransition, signalLost]);

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

  const viewParam = searchParams.get("view") ?? "";
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
      style={{
        pointerEvents: isMd && isTransitioning ? "none" : undefined,
      }}
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
                activeIndex={channelIndex}
                signalLost={signalLost}
                aboutActive={aboutActive}
                resumeActive={resumeActive}
                transitioning={isTransitioning}
                onSelectChannel={selectChannel}
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
                />
              </div>
            </div>
          </aside>

          <div
            id="main"
            className="relative flex min-h-0 min-w-0 flex-1 flex-col bg-black"
          >
            <div className="relative flex min-h-0 flex-1">
              <div
                className="relative min-h-0 flex-1"
                style={{
                  opacity: signalLost ? 0 : mainOpacity,
                  transition: signalLost ? undefined : mainTransition,
                }}
              >
                <MainViewport
                  channelIndex={displayIndex}
                  signalLost={false}
                  projects={projects}
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
