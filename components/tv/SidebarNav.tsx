"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, PanelLeftClose } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  ACCENT_WORK,
  CHANNELS,
  homeHrefForChannel,
  portfolioCaseHref,
  type ChannelNumber,
  TV_MUTED,
  TV_TEXT,
} from "@/lib/channels";
import { SITE_PROFILE_PHOTO } from "@/lib/site";
import { rampSpendEpisodes } from "@/data/case-studies/ramp-spend";
import { rampTreasuryEpisodes } from "@/data/case-studies/ramp-treasury";
import { tvLiveSearchParams } from "@/lib/tv-live-search-params";

type SidebarNavProps = {
  activeIndex: number;
  signalLost: boolean;
  /** When true, no channel row is highlighted (About / Resume use the footer icons instead). */
  aboutActive: boolean;
  resumeActive: boolean;
  /** Runs TV transition (static / dissolve); default click is intercepted so links still work for open-in-new-tab. */
  onSelectChannel: (ch: ChannelNumber) => void;
  /** Jump to a multi-case study episode (Ramp Spend / Treasury) without the old pill rail. */
  onNavigateToCaseStudyEpisode: (ch: ChannelNumber, episodeIndex: number) => void;
  onPrimeAudio: () => void;
  onHideSidebar: () => void;
  onPrevChannel: () => void;
  onNextChannel: () => void;
  channelChangeDisabled?: boolean;
};

function episodesForChannel(c: (typeof CHANNELS)[number]) {
  if (c.workSlug === "ramp-spend") {
    return rampSpendEpisodes.filter((episode) => !episode.hidden);
  }
  if (c.workSlug === "ramp-treasury") {
    return rampTreasuryEpisodes.filter((episode) => !episode.hidden);
  }
  return [];
}

function DownTriangle() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" aria-hidden>
      <path d="M5.5 8.6 1.2 3.2h8.6z" fill="currentColor" />
    </svg>
  );
}

function UpTriangle() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" aria-hidden>
      <path d="M5.5 2.4 9.8 7.8H1.2z" fill="currentColor" />
    </svg>
  );
}

const SIDE_PIN_LOGOS: Record<string, { src: string; fit: string }> = {
  "letterboxd-website-wall": { src: "/media/logos/letterboxd.png", fit: "letterboxd" },
  "ipod-concert-diary": { src: "/media/logos/ipod.png", fit: "ipod" },
  "dinner-party-seating-chart": { src: "/media/logos/dinner-party-mark.png", fit: "dinner" },
  "colorstack-events": { src: "/media/logos/colorstack-icon.png", fit: "colorstack" },
};

const WORK_LOGOS: Record<string, string> = {
  "ramp-spend": "/media/logos/white/Ramp.png",
  "ramp-treasury": "/media/logos/white/Ramp.png",
  figma: "/media/logos/white/Figma.png",
  meta: "/media/logos/white/Meta.png",
  disney: "/media/logos/white/Disney.png",
};

function episodeViewForChannel(
  live: URLSearchParams,
  channel: ChannelNumber,
): string {
  const raw = live.get("view") ?? "";
  if (raw === "" && (channel === 1 || channel === 2)) return "episode";
  return raw;
}

export function SidebarNav({
  activeIndex,
  signalLost,
  aboutActive,
  resumeActive,
  onSelectChannel,
  onNavigateToCaseStudyEpisode,
  onPrimeAudio,
  onHideSidebar,
  onPrevChannel,
  onNextChannel,
  channelChangeDisabled,
}: SidebarNavProps) {
  const searchParams = useSearchParams();
  const [flickerKey, setFlickerKey] = useState(0);
  const [flickerOn, setFlickerOn] = useState(false);
  const [openFolders, setOpenFolders] = useState<Partial<Record<ChannelNumber, boolean>>>({
    1: true,
    2: true,
  });
  const skipFlicker = useRef(true);

  useEffect(() => {
    if (skipFlicker.current) {
      skipFlicker.current = false;
      return;
    }
    setFlickerKey((key) => key + 1);
    setFlickerOn(true);
    const timer = window.setTimeout(() => setFlickerOn(false), 320);
    return () => window.clearTimeout(timer);
  }, [activeIndex]);

  const work = CHANNELS.filter((c) => c.group === "work");
  const side = CHANNELS.filter((c) => c.group === "side");

  const channelOnFor = (channel: number) =>
    !signalLost && !aboutActive && !resumeActive && activeIndex === channel - 1;

  const channelBlock = (c: (typeof CHANNELS)[0]) => {
    const channelNum = c.channel as ChannelNumber;
    const channelOn = channelOnFor(c.channel);
    const href = homeHrefForChannel(channelNum);
    const episodes = episodesForChannel(c);
    const logoSrc = c.workSlug ? WORK_LOGOS[c.workSlug] : undefined;

    if (episodes.length <= 1) {
      return (
        <Link
          key={c.channel}
          href={href}
          scroll={false}
          prefetch
          onPointerDown={onPrimeAudio}
          onClick={(e) => {
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
            e.preventDefault();
            onSelectChannel(channelNum);
          }}
          className={`nav-tab${channelOn ? " active" : ""}`}
          aria-current={channelOn ? "page" : undefined}
        >
          <span className="nav-tab-icon">
            {logoSrc ? (
              <span
                className="nav-tab-logo"
                style={{
                  WebkitMaskImage: `url(${logoSrc})`,
                  maskImage: `url(${logoSrc})`,
                }}
              />
            ) : null}
          </span>
          <span className="nav-tab-name">{c.navLabel}</span>
        </Link>
      );
    }

    const live = tvLiveSearchParams(searchParams);
    const view = episodeViewForChannel(live, channelNum);
    const epRaw = live.get("ep");
    const epParsed = epRaw !== null ? Number.parseInt(epRaw, 10) : 0;
    const urlCh = live.get("ch");
    const urlChannelMatches =
      urlCh !== null && Number.parseInt(urlCh, 10) === c.channel;
    const open = openFolders[channelNum] !== false;
    const activeEpisodeIndex =
      channelOn &&
      urlChannelMatches &&
      view === "episode" &&
      Number.isFinite(epParsed) &&
      epParsed >= 0 &&
      epParsed < episodes.length
        ? epParsed
        : -1;
    const folderActive = channelOn && (!open || activeEpisodeIndex < 0);

    return (
      <div key={c.channel} className="nav-folder">
        <button
          type="button"
          className={`nav-tab${folderActive ? " active" : ""}`}
          aria-expanded={open}
          aria-current={folderActive ? "page" : undefined}
          onClick={() => {
            setOpenFolders((current) => ({
              ...current,
              [channelNum]: current[channelNum] === false,
            }));
          }}
        >
          <span className="nav-tab-icon">
            {logoSrc ? (
              <span
                className="nav-tab-logo"
                style={{
                  WebkitMaskImage: `url(${logoSrc})`,
                  maskImage: `url(${logoSrc})`,
                }}
              />
            ) : null}
          </span>
          <span className="nav-tab-name">{c.navLabel}</span>
          <ChevronDown
            className={`nav-tab-chevron${open ? "" : " is-closed"}`}
            aria-hidden
          />
        </button>
        {open ? (
          <div className="nav-folder-episodes">
            {episodes.map((ep, i) => {
              const caseHref = portfolioCaseHref(channelNum, i);
              const caseActive = activeEpisodeIndex === i;
              return (
                <Link
                  key={`${c.channel}-case-${i}`}
                  href={caseHref}
                  scroll={false}
                  prefetch
                  onPointerDown={onPrimeAudio}
                  onClick={(e) => {
                    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                    e.preventDefault();
                    onNavigateToCaseStudyEpisode(channelNum, i);
                  }}
                  className={`nav-tab nav-tab-episode${caseActive ? " active" : ""}`}
                  aria-current={caseActive ? "page" : undefined}
                >
                  <span className="nav-tab-icon nav-tab-ep" aria-hidden>
                    E{i + 1}
                  </span>
                  <span className="nav-tab-name">{ep.title}</span>
                </Link>
              );
            })}
          </div>
        ) : null}
      </div>
    );
  };

  const channelLabel = `CH ${String(activeIndex + 1).padStart(2, "0")}`;

  return (
    <div
      className="tv-sidebar-nav flex h-full min-h-0 flex-col bg-transparent pb-3"
      style={{
        ["--text" as string]: TV_TEXT,
        ["--muted" as string]: TV_MUTED,
        ["--muted-light" as string]: "rgba(240,240,240,0.72)",
        ["--accent" as string]: ACCENT_WORK,
      }}
    >
      <div className="shell-sidebar-head">
        <div className="shell-sidebar-top">
          <div className="shell-sidebar-id">
            <div className="shell-sidebar-avatar">
              <Image
                src={SITE_PROFILE_PHOTO}
                alt=""
                width={28}
                height={28}
                sizes="28px"
                className="h-full w-full object-cover"
                priority
              />
            </div>
            <div className="shell-sidebar-id-text">
              <div className="shell-sidebar-name">Tise Alatise</div>
              <div className="shell-sidebar-role">Product designer</div>
            </div>
          </div>
          <button
            type="button"
            className="shell-sidebar-toggle"
            aria-label="Hide sidebar"
            onClick={onHideSidebar}
          >
            <PanelLeftClose className="h-4 w-4" aria-hidden />
          </button>
        </div>

        <div className="shell-tune" role="group" aria-label="Channel switcher">
          <button
            type="button"
            className="shell-tune-step"
            aria-label="Previous channel"
            disabled={channelChangeDisabled}
            onClick={onPrevChannel}
          >
            <DownTriangle />
          </button>
          <div
            key={flickerKey}
            className={`shell-tune-screen${flickerOn ? " is-flicker" : ""}`}
          >
            {channelLabel}
          </div>
          <button
            type="button"
            className="shell-tune-step"
            aria-label="Next channel"
            disabled={channelChangeDisabled}
            onClick={onNextChannel}
          >
            <UpTriangle />
          </button>
        </div>

        <nav className="nav-pins" aria-label="Side projects">
          {side.map((c) => {
            const channelNum = c.channel as ChannelNumber;
            const channelOn = channelOnFor(c.channel);
            const href = homeHrefForChannel(channelNum);
            const logo = c.projectSlug ? SIDE_PIN_LOGOS[c.projectSlug] : undefined;
            return (
              <Link
                key={c.channel}
                href={href}
                scroll={false}
                prefetch
                onPointerDown={onPrimeAudio}
                onClick={(e) => {
                  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                  e.preventDefault();
                  onSelectChannel(channelNum);
                }}
                className={`nav-pin${channelOn ? " active" : ""}`}
                aria-label={c.navLabel}
                aria-current={channelOn ? "page" : undefined}
              >
                {logo ? (
                  <Image
                    src={logo.src}
                    alt=""
                    width={160}
                    height={120}
                    sizes="48px"
                    className={`nav-pin-logo is-${logo.fit}`}
                  />
                ) : null}
                <span className="nav-pin-tip" aria-hidden>
                  {c.navLabel}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      <nav className="nav-work" aria-label="Work experience">
        {work.map(channelBlock)}
      </nav>
    </div>
  );
}
