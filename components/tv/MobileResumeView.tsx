"use client";

import Image from "next/image";
import Link from "next/link";
import { FileText, Mail } from "lucide-react";
import { useState } from "react";
import type { Project } from "@/app/types";
import type { ChannelNumber, TvChannel } from "@/lib/channels";
import { CHANNELS, projectForChannel } from "@/lib/channels";
import {
  SITE_EMAIL as EMAIL,
  SITE_LINKEDIN as LINKEDIN_URL,
  SITE_PROFILE_PHOTO,
  SITE_RESUME as RESUME_URL,
  SITE_TWITTER as TWITTER_URL,
} from "@/lib/site";

/** Matches `SidebarIcons` (desktop TV shell). */
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

/** Matches `SidebarIcons` (X logo). */
function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2H21.552L14.328 10.27L22.824 22H16.172L10.96 15.374L5.136 22H1.824L9.552 13.18L1.404 2H8.224L12.944 8.05L18.244 2ZM17.088 20H18.92L7.2 3.906H5.236L17.088 20Z" />
    </svg>
  );
}

function TagPill({ children }: { children: string }) {
  return (
    <span className="inline-flex max-w-full items-center rounded border border-white/[0.14] bg-transparent px-2 py-1 font-sans text-[11px] leading-none text-[#b4b4b4]">
      <span className="truncate">{children}</span>
    </span>
  );
}

function isAbsoluteHttpUrl(href: string) {
  return /^https?:\/\//i.test(href);
}

const WORK_SLUGS_TV_HINT = new Set([
  "ramp-spend",
  "ramp-treasury",
  "figma",
  "meta",
  "disney",
]);

function rowShowsLargeScreenTvHint(ch: TvChannel): boolean {
  if (ch.workSlug && WORK_SLUGS_TV_HINT.has(ch.workSlug)) return true;
  return ch.projectSlug === "dinner-party-seating-chart";
}

const TV_EXPERIENCE_HINT = "Open website on larger screen to view case studies.";

/** Grey marks live under `public/logo/grey` (symlink → `public/logos/grey`). */
const MOBILE_RESUME_GREY_LOGO_BASE = "/logo/grey";

function mobileResumeGreyLogoSrc(workSlug?: string): string | undefined {
  switch (workSlug) {
    case "ramp-spend":
    case "ramp-treasury":
      return `${MOBILE_RESUME_GREY_LOGO_BASE}/Ramp.png`;
    case "figma":
      return `${MOBILE_RESUME_GREY_LOGO_BASE}/Figma.png`;
    case "meta":
      return `${MOBILE_RESUME_GREY_LOGO_BASE}/Meta.png`;
    case "disney":
      return `${MOBILE_RESUME_GREY_LOGO_BASE}/Disney.png`;
    default:
      return undefined;
  }
}

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function ViewProjectLink({ href }: { href: string }) {
  const cls =
    "group inline-flex items-center gap-1.5 text-[14px] leading-snug text-[#a8a8a8] transition-colors hover:text-white";
  const label = (
    <>
      View project
      <ExternalLinkIcon className="shrink-0 text-white/45 transition-colors group-hover:text-white/80" />
    </>
  );
  if (isAbsoluteHttpUrl(href)) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {label}
    </Link>
  );
}

function MobileResumeRow({
  title,
  yearRange,
  role,
  tags,
  logoSrc,
  viewProjectHref,
  tvHintInteractive = false,
  tvHintOpen = false,
  tvHintRegionId,
  onTvHintActivate,
}: {
  title: string;
  yearRange: string;
  role: string;
  tags: string[];
  /** `/logo/grey/*.png` work mark above title (rounded tile). */
  logoSrc?: string;
  /** When set, replaces the role line with a “View project” link (mobile side projects). */
  viewProjectHref?: string;
  /** Row press toggles the large-screen TV experience hint (Ramp work + Dinner Party only). */
  tvHintInteractive?: boolean;
  tvHintOpen?: boolean;
  tvHintRegionId?: string;
  onTvHintActivate?: () => void;
}) {
  const showSubtitleLine = Boolean(viewProjectHref || role.trim());
  const body = (
    <>
      {logoSrc ? (
        <div className="mb-2 flex" aria-hidden>
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[6px] bg-[#1c1c1c]">
            <Image src={logoSrc} alt="" width={14} height={14} className="h-3.5 w-3.5 object-contain" />
          </div>
        </div>
      ) : null}
      <div className="flex items-start justify-between gap-3">
        <h3 className="min-w-0 text-[17px] font-semibold leading-snug tracking-tight text-white">{title}</h3>
        <span className="shrink-0 pt-0.5 font-mono text-[11px] tabular-nums text-[#9a9a9a]">{yearRange}</span>
      </div>
      {showSubtitleLine ? (
        <p className={`mt-1.5 text-[14px] leading-snug ${viewProjectHref ? "" : "text-[#a8a8a8]"}`}>
          {viewProjectHref ? <ViewProjectLink href={viewProjectHref} /> : role}
        </p>
      ) : null}
      {tags.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((t) => (
            <TagPill key={t}>{t}</TagPill>
          ))}
        </div>
      ) : null}
    </>
  );

  return (
    <li className="-mx-5 border-b border-[#1c1c1c] px-5 py-6 first:pt-0 sm:-mx-6 sm:px-6">
      {tvHintInteractive ? (
        <button
          type="button"
          onClick={onTvHintActivate}
          className="w-full cursor-pointer text-left outline-none ring-offset-2 ring-offset-[#0a0a0a] focus-visible:ring-2 focus-visible:ring-white/30"
          aria-expanded={tvHintOpen}
          aria-controls={tvHintOpen && tvHintRegionId ? tvHintRegionId : undefined}
        >
          {body}
        </button>
      ) : (
        body
      )}
      {tvHintOpen && tvHintRegionId ? (
        <div
          id={tvHintRegionId}
          className="mt-4 rounded-none bg-[#141414] px-3 py-3"
          role="region"
          aria-live="polite"
        >
          <p className="text-center text-[11px] italic leading-relaxed text-[#8a8a8a]">{TV_EXPERIENCE_HINT}</p>
        </div>
      ) : null}
    </li>
  );
}

type MobileResumeViewProps = {
  projects: Project[];
};

export function MobileResumeView({ projects }: MobileResumeViewProps) {
  const [activeTvHintChannel, setActiveTvHintChannel] = useState<ChannelNumber | null>(null);
  const workChannels = CHANNELS.filter((c) => c.group === "work");
  const treasury = workChannels.find((c) => c.workSlug === "ramp-treasury");
  const work =
    treasury !== undefined
      ? [treasury, ...workChannels.filter((c) => c.workSlug !== "ramp-treasury")]
      : workChannels;
  const side = CHANNELS.filter((c) => c.group === "side");

  /** Same control chrome as desktop `SidebarIcons` (About/User intentionally omitted on mobile). */
  const baseIconClass =
    "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-tv-muted transition-colors hover:bg-white/10 hover:text-white active:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30";

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-[#0a0a0a] pt-10 text-tv-text">
      <div className="flex flex-1 flex-col px-5 sm:px-6">
      <header className="mb-6">
        <div className="relative mb-4 h-11 w-11 shrink-0 overflow-hidden rounded-full bg-[#141414] ring-1 ring-white/10">
          <Image
            src={SITE_PROFILE_PHOTO}
            alt="Tise Alatise"
            width={44}
            height={44}
            sizes="44px"
            className="h-full w-full object-cover"
            priority
          />
        </div>
        <h1 className="text-[26px] font-semibold tracking-tight text-white">Tise Alatise</h1>
        <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-[#7a7a7a]">Product Designer</p>
      </header>

      <div className="-mx-5 mb-6 h-px bg-[#1f1f1f] sm:-mx-6" aria-hidden />

      <section className="mb-6">
        <h2 className="mb-0 font-mono text-[10px] uppercase tracking-[0.32em] text-[#7a7a7a]">Work Experiences</h2>
        <ul className="mt-4">
          {work.map((c) => {
            const mr = c.mobileResume;
            const title = mr?.title ?? c.navLabel;
            const yearRange = mr?.yearRange ?? c.yearRange;
            const role = mr?.roleLine ?? c.role;
            const tags = mr?.tags ?? [];
            const hint = rowShowsLargeScreenTvHint(c);
            return (
              <MobileResumeRow
                key={c.channel}
                title={title}
                yearRange={yearRange}
                role={role}
                tags={tags}
                logoSrc={mobileResumeGreyLogoSrc(c.workSlug)}
                tvHintInteractive={hint}
                tvHintOpen={hint && activeTvHintChannel === c.channel}
                tvHintRegionId={hint ? `mobile-tv-hint-${c.channel}` : undefined}
                onTvHintActivate={
                  hint
                    ? () =>
                        setActiveTvHintChannel((prev) => (prev === c.channel ? null : c.channel))
                    : undefined
                }
              />
            );
          })}
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="mb-0 font-mono text-[10px] uppercase tracking-[0.32em] text-[#7a7a7a]">Side projects</h2>
        <ul className="mt-4">
          {side.map((c) => {
            const project = projectForChannel(c, projects);
            const slug = c.projectSlug?.trim();
            const ext = project?.externalUrl?.trim();
            const hideViewProject = slug === "dinner-party-seating-chart";
            const viewProjectHref =
              slug && !hideViewProject ? ext || `/projects/${slug}` : undefined;
            const hint = rowShowsLargeScreenTvHint(c);
            return (
              <MobileResumeRow
                key={c.channel}
                title={c.navLabel}
                yearRange={c.yearRange}
                role={c.role}
                tags={[]}
                viewProjectHref={viewProjectHref}
                tvHintInteractive={hint}
                tvHintOpen={hint && activeTvHintChannel === c.channel}
                tvHintRegionId={hint ? `mobile-tv-hint-${c.channel}` : undefined}
                onTvHintActivate={
                  hint
                    ? () =>
                        setActiveTvHintChannel((prev) => (prev === c.channel ? null : c.channel))
                    : undefined
                }
              />
            );
          })}
        </ul>
      </section>

      <div className="mt-auto mb-6 flex flex-wrap justify-center gap-x-5 gap-y-3 px-1 pb-2 pt-2 sm:gap-x-6">
        <a href={LINKEDIN_URL} className={baseIconClass} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
          <LinkedInIcon className="h-5 w-5" />
        </a>
        <a href={TWITTER_URL} className={baseIconClass} aria-label="X" target="_blank" rel="noopener noreferrer">
          <XIcon className="h-5 w-5" />
        </a>
        <a href={RESUME_URL} className={baseIconClass} aria-label="Resume" target="_blank" rel="noopener noreferrer">
          <FileText className="h-5 w-5" aria-hidden />
        </a>
        <a
          href={`mailto:${EMAIL}?subject=${encodeURIComponent("Hi, coming from your portfolio.")}`}
          className={baseIconClass}
          aria-label="Email"
        >
          <Mail className="h-5 w-5" aria-hidden />
        </a>
      </div>
      </div>
    </div>
  );
}
