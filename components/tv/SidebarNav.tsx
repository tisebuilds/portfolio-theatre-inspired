"use client";

import Image from "next/image";
import Link from "next/link";
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
}: SidebarNavProps) {
  const searchParams = useSearchParams();

  const work = CHANNELS.filter((c) => c.group === "work");
  const side = CHANNELS.filter((c) => c.group === "side");

  const iconFor = (c: (typeof CHANNELS)[0]) => {
    // Intentionally simple, consistent icons sized via `.nav-icon`.
    if (c.group === "work") {
      if (c.workSlug?.startsWith("ramp")) {
        return (
          <Image
            src="/media/logos/white/Ramp.png"
            alt=""
            width={20}
            height={20}
            sizes="20px"
            className="nav-logo"
          />
        );
      }
      if (c.workSlug === "figma") {
        return (
          <Image
            src="/media/logos/white/Figma.png"
            alt=""
            width={20}
            height={20}
            sizes="20px"
            className="nav-logo"
          />
        );
      }
      if (c.workSlug === "meta") {
        return (
          <Image
            src="/media/logos/white/Meta.png"
            alt=""
            width={20}
            height={20}
            sizes="20px"
            className="nav-logo"
          />
        );
      }
      if (c.workSlug === "disney") {
        return (
          <Image
            src="/media/logos/white/Disney.png"
            alt=""
            width={20}
            height={20}
            sizes="20px"
            className="nav-logo"
          />
        );
      }
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
          <path d="M9 6V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1" />
          <path d="M4 8h16v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8Z" />
          <path d="M4 12h16" />
        </svg>
      );
    }
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
        <path d="M12 3l2.6 5.9 6.4.6-4.8 4.1 1.5 6.2L12 16.9 6.3 19.8l1.5-6.2L3 9.5l6.4-.6L12 3Z" />
      </svg>
    );
  };

  const channelBlock = (c: (typeof CHANNELS)[0]) => {
    const channelNum = c.channel as ChannelNumber;
    const channelOn =
      !signalLost &&
      !aboutActive &&
      !resumeActive &&
      activeIndex === c.channel - 1;
    const href = homeHrefForChannel(channelNum);

    const episodes =
      c.workSlug === "ramp-spend"
        ? rampSpendEpisodes.filter((e) => !e.hidden)
        : c.workSlug === "ramp-treasury"
          ? rampTreasuryEpisodes.filter((e) => !e.hidden)
          : [];

    if (episodes.length <= 1) {
      const mainRowSingle = (
        <Link
          href={href}
          scroll={false}
          prefetch
          onPointerDown={onPrimeAudio}
          onClick={(e) => {
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
            e.preventDefault();
            onSelectChannel(channelNum);
          }}
          className={`nav-item ${channelOn ? "active" : ""}`}
        >
          <span className="nav-ch" aria-hidden>
            {String(c.channel).padStart(2, "0")}
          </span>
          <span className="nav-icon">{iconFor(c)}</span>
          <span className="nav-name">{c.navLabel}</span>
        </Link>
      );
      return <div key={c.channel}>{mainRowSingle}</div>;
    }

    const live = tvLiveSearchParams(searchParams);
    const view = episodeViewForChannel(live, channelNum);
    const epRaw = live.get("ep");
    const epParsed = epRaw !== null ? Number.parseInt(epRaw, 10) : 0;
    const urlCh = live.get("ch");
    const urlChannelMatches =
      urlCh !== null && Number.parseInt(urlCh, 10) === c.channel;

    const anyCaseActive =
      channelOn &&
      urlChannelMatches &&
      view === "episode" &&
      Number.isFinite(epParsed) &&
      epParsed >= 0 &&
      epParsed < episodes.length;

    const demoteParent = channelOn && anyCaseActive;

    const mainRow = (
      <Link
        href={href}
        scroll={false}
        prefetch
        onPointerDown={onPrimeAudio}
        onClick={(e) => {
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
          e.preventDefault();
          onSelectChannel(channelNum);
        }}
        className={`nav-item nav-chapter-main ${channelOn ? "active" : ""} ${demoteParent ? "nav-chapter-demotion" : ""}`}
      >
        <span className="nav-ch" aria-hidden>
          {String(c.channel).padStart(2, "0")}
        </span>
        <span className="nav-icon">{iconFor(c)}</span>
        <span className="nav-name">{c.navLabel}</span>
      </Link>
    );

    return (
      <div key={c.channel} className="nav-channel-block">
        {mainRow}
        <div
          className={`nav-case-list-shell${channelOn ? " nav-case-list-shell--open" : ""}`}
          inert={channelOn ? undefined : true}
        >
          <div className="nav-case-list-shell-inner">
            <div className="nav-case-list" id={`nav-cases-${c.channel}`}>
              {episodes.map((ep, i) => {
                const caseHref = portfolioCaseHref(channelNum, i);
                const caseActive =
                  urlChannelMatches &&
                  view === "episode" &&
                  Number.isFinite(epParsed) &&
                  epParsed === i;
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
                    className={`nav-item nav-case ${caseActive ? "active" : ""}`}
                    aria-current={caseActive ? "true" : undefined}
                  >
                    <span className="nav-case-label">Episode {i + 1}</span>
                    <span className="nav-case-title">{ep.title}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="tv-sidebar-nav flex h-full min-h-0 flex-col border-r border-white/[0.06] bg-black/40 pb-3 pt-4"
      style={{
        ["--text" as string]: TV_TEXT,
        ["--muted" as string]: TV_MUTED,
        ["--muted-light" as string]: "rgba(240,240,240,0.72)",
        ["--accent" as string]: ACCENT_WORK,
      }}
    >
      <div className="mb-4 flex h-10 items-center gap-2.5 overflow-hidden px-5">
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-white/10 ring-1 ring-white/10">
          <Image
            src={SITE_PROFILE_PHOTO}
            alt="Tise Alatise"
            width={40}
            height={40}
            sizes="40px"
            className="h-full w-full object-cover"
            priority
          />
        </div>
        <div className="min-w-0 leading-tight">
          <div className="truncate text-sm font-medium text-white">Tise Alatise</div>
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-tv-muted">
            Product Designer
          </div>
        </div>
      </div>

      <div className="mb-4 h-px bg-white/[0.06]" aria-hidden />

      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="nav-section-label">Work experience</div>
        <nav className="mb-4">{work.map(channelBlock)}</nav>
        <div className="nav-section-label spaced">Side Projects</div>
        <nav>{side.map(channelBlock)}</nav>
      </div>
    </div>
  );
}
