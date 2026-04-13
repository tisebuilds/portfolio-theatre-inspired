"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { CaseStudyPageShell } from "@/components/CaseStudyPageShell";
import { ExternalLinkIcon, MetaDot } from "@/components/case-study-icons";
import { CrtTelevision } from "@/components/CrtTelevision";

const journalUrl =
  "https://www.flipsnack.com/FFC8EDCC5A8/disney-internship/full-view.html?p=1";

const shipped = [
  { href: "/work/disney/shipped/browse-carousel", label: "Browse carousel" },
  { href: "/work/disney/shipped/search-filters", label: "Search filters" },
  { href: "/work/disney/shipped/continue-watching", label: "Continue watching" },
] as const;

export function DisneyCaseStudyClient() {
  return (
    <CaseStudyPageShell
      title="Disney"
      dateRange="Summer 2021"
      journalUrl={journalUrl}
      glowBackground="radial-gradient(ellipse 70% 58% at 50% 38%, rgba(56, 189, 248, 0.14), transparent 70%)"
      meta={
        <>
          <span>UX Design Intern</span>
          <MetaDot />
          <span>Streaming & discovery</span>
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
            href="https://www.disneyplus.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-white/45 transition-colors hover:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            disneyplus.com
            <ExternalLinkIcon className="opacity-70" />
          </a>
        </>
      }
    >
      <div className="flex w-full max-w-3xl flex-col items-center gap-5 px-1 sm:px-2">
        <CrtTelevision footerLabel="Disney+">
          <Image
            src="/posters/disney.png"
            alt="Disney streaming and content discovery design preview"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        </CrtTelevision>
        <div className="flex max-w-xl flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs">
          <a
            href={journalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/55 underline-offset-2 transition-colors hover:text-white/80 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Production notes
          </a>
          {shipped.map((item) => (
            <Fragment key={item.href}>
              <MetaDot />
              <Link
                href={item.href}
                className="text-white/55 underline-offset-2 transition-colors hover:text-white/80 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                {item.label}
              </Link>
            </Fragment>
          ))}
        </div>
      </div>
    </CaseStudyPageShell>
  );
}
