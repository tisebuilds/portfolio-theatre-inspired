"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ACCENT_WORK,
  CHANNELS,
  homeHrefForChannel,
  type ChannelNumber,
  TV_MUTED,
  TV_TEXT,
} from "@/lib/channels";
import { SITE_PROFILE_PHOTO } from "@/lib/site";

type SidebarNavProps = {
  activeIndex: number;
  signalLost: boolean;
  /** When true, no channel row is highlighted (About / Resume use the footer icons instead). */
  aboutActive: boolean;
  resumeActive: boolean;
  /** Runs TV transition (static / dissolve); default click is intercepted so links still work for open-in-new-tab. */
  onSelectChannel: (ch: ChannelNumber) => void;
  onPrimeAudio: () => void;
};

export function SidebarNav({
  activeIndex,
  signalLost,
  aboutActive,
  resumeActive,
  onSelectChannel,
  onPrimeAudio,
}: SidebarNavProps) {
  const work = CHANNELS.filter((c) => c.group === "work");
  const side = CHANNELS.filter((c) => c.group === "side");

  const iconFor = (c: (typeof CHANNELS)[0]) => {
    // Intentionally simple, consistent icons sized via `.nav-icon`.
    if (c.group === "work") {
      if (c.workSlug?.startsWith("ramp")) {
        return (
          <Image
            src="/logos/white/Ramp.png"
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
            src="/logos/white/Figma.png"
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
            src="/logos/white/Meta.png"
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
            src="/logos/white/Disney.png"
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

  const row = (c: (typeof CHANNELS)[0]) => {
    const on =
      !signalLost &&
      !aboutActive &&
      !resumeActive &&
      activeIndex === c.channel - 1;
    const href = homeHrefForChannel(c.channel as ChannelNumber);
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
          onSelectChannel(c.channel as ChannelNumber);
        }}
        className={`nav-item ${on ? "active" : ""}`}
      >
        <span className="nav-ch" aria-hidden>
          {String(c.channel).padStart(2, "0")}
        </span>
        <span className="nav-icon">{iconFor(c)}</span>
        <span className="nav-name">
          {c.navLabel}
        </span>
      </Link>
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
        <div className="nav-section-label">
          Work experience
        </div>
        <nav className="mb-4">{work.map(row)}</nav>
        <div className="nav-section-label spaced">
          Side Projects
        </div>
        <nav>{side.map(row)}</nav>
      </div>
    </div>
  );
}
