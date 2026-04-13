"use client";

import Image from "next/image";
import { useState } from "react";
import { CaseStudyPageShell } from "@/components/CaseStudyPageShell";
import { ExternalLinkIcon, MetaDot } from "@/components/case-study-icons";

const journalUrl =
  "https://www.flipsnack.com/FFC8EDCC5A8/single-page-books/full-view.html?p=12";

type ColorstackInstagramPost = {
  href: string;
  /** Square preview in /public — avoids broken Instagram thumbnails when logged out */
  previewSrc?: string;
  previewAlt?: string;
  /** When false, no caption overlay on the preview (previewAlt still used for aria-label) */
  showPreviewCaption?: boolean;
};

const colorstackInstagramPosts: ColorstackInstagramPost[] = [
  {
    href: "https://www.instagram.com/p/CPEkBGXLmG7/",
    previewSrc: "/images/colorstack-instagram/cpekbgxlmg7.png",
    previewAlt:
      'Member spotlight: Meet Nnamdi — “ColorStack is where I found my tribe”',
    showPreviewCaption: false,
  },
  {
    href: "https://www.instagram.com/p/COd8HRooOLX/",
    previewSrc: "/images/colorstack-instagram/cod8hrooolx.png",
    previewAlt:
      'Member spotlight: Meet Yesenia — “I have found my direction with ColorStack”',
    showPreviewCaption: false,
  },
  {
    href: "https://www.instagram.com/p/CMlI1K_q6Dz/",
    previewSrc: "/images/colorstack-instagram/cmli1kq6dz.png",
    previewAlt:
      "ColorStack Fireside Chat with Kaya Thomas — March 19, 5 PM EST on Zoom",
    showPreviewCaption: false,
  },
  {
    href: "https://www.instagram.com/p/CMZved3rXfR/",
    previewSrc: "/images/colorstack-instagram/cmzved3rxfR.png",
    previewAlt:
      "Kickback event graphic with date March 20, 3 PM EST, on Remo",
    showPreviewCaption: false,
  },
  {
    href: "https://www.instagram.com/p/CMXSAkxLQ35/",
    previewSrc: "/images/colorstack-instagram/cmxsakxlq35.png",
    previewAlt:
      "Introduction to MongoDB with Joe Karlsson — March 18, 6 PM EST on Zoom",
    showPreviewCaption: false,
  },
  {
    href: "https://www.instagram.com/p/CMVvW0WLNGK/",
    previewSrc: "/images/colorstack-instagram/cmvvw0wlngk.png",
    previewAlt:
      "Introduction to cloud with Datadog — March 17, 6 PM EST on Zoom",
    showPreviewCaption: false,
  },
  {
    href: "https://www.instagram.com/p/CKxGOGXl4zu/",
    previewSrc: "/images/colorstack-instagram/ckxgogxl4zu.png",
    previewAlt:
      "History in the Making with Sherrell Dorsey — Feb. 4, 6 PM EST on Zoom",
    showPreviewCaption: false,
  },
  {
    href: "https://www.instagram.com/p/COLZ7zrldE6/?img_index=2",
    previewSrc: "/images/colorstack-instagram/colz7zrlde6.png",
    previewAlt:
      "Conversation with Ali Partovi, CEO of Neo — April 30, 2 PM EST on Zoom",
    showPreviewCaption: false,
  },
];

function instagramShortcode(href: string): string {
  const m = href.match(/instagram\.com\/p\/([^/?]+)/);
  return m?.[1] ?? "post";
}

function previewDisplayTitle(previewAlt: string | undefined, code: string): string {
  if (!previewAlt) return code;
  const head = previewAlt.split(" — ")[0]?.trim();
  return head || code;
}

function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function InstagramGridItem({
  href,
  previewSrc,
  previewAlt,
  showPreviewCaption = true,
  cardBase,
}: ColorstackInstagramPost & { cardBase: string }) {
  const [imageFailed, setImageFailed] = useState(false);
  const code = instagramShortcode(href);
  const showPreview = Boolean(previewSrc) && !imageFailed;

  const label = previewAlt
    ? `${previewAlt} — open ColorStack Instagram post ${code} in a new tab`
    : `Open ColorStack Instagram post ${code} in a new tab`;

  return (
    <li className="min-w-0">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className={`${cardBase} ${
          showPreview
            ? "overflow-hidden bg-black p-0 hover:bg-black/90"
            : "bg-gradient-to-br from-white/[0.07] to-white/[0.02] px-2 py-3 hover:bg-white/[0.06] sm:gap-2.5 sm:py-4"
        }`}
      >
        {showPreview ? (
          <>
            <Image
              src={previewSrc!}
              alt=""
              fill
              sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 25vw"
              className="object-cover transition-opacity duration-300 ease-out"
              onError={() => setImageFailed(true)}
            />
            {showPreviewCaption ? (
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-2 pb-2.5 pt-8 sm:pb-3"
                aria-hidden
              >
                <p
                  className="line-clamp-2 origin-bottom text-center text-[11px] font-medium leading-tight tracking-tight text-white/95 transition-transform duration-300 ease-out group-hover:scale-[1.12] sm:text-xs"
                >
                  {previewDisplayTitle(previewAlt, code)}
                </p>
              </div>
            ) : null}
          </>
        ) : null}
        {!showPreview ? (
          <>
            <InstagramGlyph className="size-7 shrink-0 text-white/55 transition-colors group-hover:text-white/80 sm:size-8" />
            <span className="max-w-full origin-center truncate font-mono text-[10px] tabular-nums tracking-tight text-white/35 transition-transform duration-300 ease-out group-hover:scale-[1.12] group-hover:text-white/55 sm:text-[11px]">
              {code}
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-white/45 transition-colors group-hover:text-white/70 sm:text-xs">
              Instagram
              <ExternalLinkIcon className="opacity-60" />
            </span>
          </>
        ) : null}
      </a>
    </li>
  );
}

function InstagramPostsGrid() {
  const cardBase =
    "group relative flex aspect-square w-full max-w-full flex-col items-center justify-center gap-1.5 border border-white/10 text-center no-underline outline-none transition-[border-color,background-color,transform] hover:border-white/22 focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black active:scale-[0.98] rounded-lg sm:gap-2";

  return (
    <div className="w-full max-w-3xl px-2 sm:px-1 md:px-0 lg:max-w-none">
      <h2 className="mb-5 flex items-center justify-start gap-2 text-left text-base font-semibold tracking-tight text-white sm:mb-6 sm:text-lg">
        Selected works
        <InstagramGlyph className="size-[1.15em] shrink-0 text-white" />
      </h2>
      <ul className="m-0 grid list-none grid-cols-2 gap-2.5 p-0 sm:grid-cols-3 sm:gap-3 md:grid-cols-2 md:gap-4 lg:gap-4 xl:gap-5 [&:has(>li>a:hover)>li>a:not(:hover)_img]:opacity-50">
        {colorstackInstagramPosts.map((post) => (
          <InstagramGridItem key={post.href} {...post} cardBase={cardBase} />
        ))}
      </ul>
    </div>
  );
}

function SlackMessageShowcase() {
  return (
    <figure
      className="mx-auto flex w-full max-w-[min(100%,640px)] flex-col items-center gap-6 sm:gap-8"
      aria-label="Slack message from Jehron Petty, June 12, 2020, asking for graphic design help for ColorStack."
    >
      <div className="w-full px-2 sm:px-4">
        <div
          className="mx-auto w-full max-w-[min(100%,580px)] overflow-hidden rounded-lg border border-white/[0.1] bg-[#1a1d21] text-left shadow-[0_4px_24px_rgba(0,0,0,0.45)] ring-1 ring-black/40"
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
      <figcaption className="max-w-lg px-2 text-center text-sm font-normal leading-relaxed tracking-normal text-white/55 sm:text-base">
        My first paid gig came from a Slack message.{" "}
        <a
          href={journalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-baseline gap-1.5 text-inherit no-underline transition-colors hover:text-white/85 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          aria-label="Read the story (opens journal in new tab)"
        >
          <span className="transition-colors">Read the story</span>
          <ExternalLinkIcon
            className="size-[0.85em] shrink-0 translate-y-[0.06em] opacity-50 sm:size-[0.9em]"
            aria-hidden
          />
        </a>
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
            <Image
              src="/images/keynote-app-icon.png"
              alt="Keynote"
              width={16}
              height={16}
              className="h-4 w-4 shrink-0 object-contain"
              sizes="16px"
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
      <div className="flex w-full flex-col items-center gap-6 sm:gap-8">
        <SlackMessageShowcase />
        <InstagramPostsGrid />
      </div>
    </CaseStudyPageShell>
  );
}
