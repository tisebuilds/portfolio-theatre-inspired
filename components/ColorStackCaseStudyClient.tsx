"use client";

import Image from "next/image";
import { CaseStudyPageShell } from "@/components/CaseStudyPageShell";
import { ExternalLinkIcon, MetaDot } from "@/components/case-study-icons";

const journalUrl =
  "https://www.flipsnack.com/FFC8EDCC5A8/single-page-books/full-view.html?p=12";

function SlackMessageShowcase() {
  return (
    <figure
      className="mx-auto flex w-full max-w-[min(100%,520px)] flex-col items-center gap-6 sm:gap-8"
      aria-label="Slack message from Jehron Petty, June 12, 2020, asking for graphic design help for ColorStack."
    >
      <div className="w-full px-2 sm:px-4">
        <div
          className="mx-auto w-full max-w-[440px] overflow-hidden rounded-lg border border-white/[0.1] bg-[#1a1d21] text-left shadow-[0_4px_24px_rgba(0,0,0,0.45)] ring-1 ring-black/40"
          style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
        >
          <div className="flex items-center border-b border-white/[0.08] bg-[#16181d] px-3 py-2.5 sm:px-3.5">
            <span className="flex min-w-0 items-baseline gap-0 text-[15px] font-bold leading-none tracking-[-0.02em] text-white">
              <span className="shrink-0 text-white/90" aria-hidden>
                #
              </span>
              <span className="min-w-0 truncate">the-colorstack-family</span>
            </span>
          </div>
          <div className="px-3 py-3 sm:px-4 sm:py-3.5">
            <a
              href={journalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="-mx-1 flex gap-3 rounded px-1 py-1 text-inherit no-underline outline-none transition-colors sm:gap-3.5 sm:py-1.5 hover:bg-white/[0.04] focus-visible:ring-2 focus-visible:ring-white/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1d21]"
              aria-label="Open journal entry about this Slack message (opens in new tab)"
            >
              <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded sm:h-10 sm:w-10">
                <Image
                  src="/images/jehron-petty-headshot.png"
                  alt=""
                  fill
                  sizes="40px"
                  className="object-cover object-top"
                  priority
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0">
                  <span className="text-[15px] font-bold tracking-tight text-[#f8f8f8]">
                    Jehron Petty
                  </span>
                  <time
                    className="text-[12px] font-normal tabular-nums text-[#9b9b9b]"
                    dateTime="2020-06-12T17:35:00"
                  >
                    Jun 12th, 2020 at 5:35 PM
                  </time>
                </div>
                <p className="mt-0.5 text-[15px] font-normal leading-[1.466] tracking-tight text-[#dcdcdc]">
                  Anybody have experience/interest in graphic design and wanna help
                  ColorStack this summer on that front?
                </p>
                <p className="mt-2">
                  <span
                    className="inline-flex items-center gap-1 rounded border border-white/[0.14] bg-[#222529] px-1.5 py-0.5"
                    role="img"
                    aria-label="4 reactions"
                  >
                    <svg
                      className="h-[14px] w-[14px] shrink-0 text-[#f43f5e]"
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path
                        fill="currentColor"
                        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                      />
                    </svg>
                    <span className="text-[13px] font-medium tabular-nums leading-none text-[#c7c7c7]">
                      4
                    </span>
                  </span>
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
      <figcaption className="max-w-lg px-2 text-center text-base font-medium leading-snug tracking-tight text-white/70 sm:text-lg">
        <span className="block">My first paid gig came from a Slack message.</span>
        <span className="mt-1.5 block text-center">
          <a
            href={journalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex max-w-full items-baseline gap-1.5 text-inherit no-underline transition-colors hover:text-white/85 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            aria-label="Read the story (opens journal in new tab)"
          >
            <span className="transition-colors">Read the story</span>
            <ExternalLinkIcon
              className="size-[0.85em] shrink-0 translate-y-[0.06em] opacity-50 sm:size-[0.9em]"
              aria-hidden
            />
          </a>
        </span>
      </figcaption>
    </figure>
  );
}

export function ColorStackCaseStudyClient() {
  return (
    <CaseStudyPageShell
      title="ColorStack"
      dateRange="2020 — 2021"
      meta={
        <>
          <span>Contract Graphic Designer</span>
          <MetaDot />
          <span>Social Media</span>
          <MetaDot />
          <span className="inline-flex items-center gap-1.5">
            <Image
              src="/images/figma-app-icon.png"
              alt="Figma"
              width={20}
              height={20}
              className="h-5 w-5 shrink-0 object-contain"
              sizes="20px"
            />
          </span>
          <MetaDot />
          <a
            href="https://www.colorstack.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-white/45 transition-colors hover:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            colorstack.org
            <ExternalLinkIcon className="opacity-70" />
          </a>
        </>
      }
    >
      <SlackMessageShowcase />
    </CaseStudyPageShell>
  );
}
