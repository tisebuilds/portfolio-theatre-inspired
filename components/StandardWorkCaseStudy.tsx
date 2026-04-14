"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { CaseStudyPageShell } from "@/components/CaseStudyPageShell";
import { caseStudySpacing } from "@/components/case-study-spacing";
import { caseStudyType } from "@/components/case-study-typography";
import { ExternalLinkIcon } from "@/components/case-study-icons";

export type StandardWorkCaseStudyCredit = {
  name: string;
  role?: string;
  href?: string;
};

export type StandardWorkCaseStudyLearning = {
  title: string;
  content: ReactNode;
};

export type StandardWorkCaseStudyProps = {
  /** Prefix for stable section ids, e.g. `disney` → `disney-overview-heading`. */
  idPrefix: string;
  title: string;
  dateRange: string;
  meta: ReactNode;
  hero: {
    src: string;
    alt: string;
    caption: string;
    sizes?: string;
    priority?: boolean;
  };
  overview: ReactNode;
  /** `split` = title and body on one row; `stacked` = title above body (single column). */
  learningsLayout?: "split" | "stacked";
  learnings: StandardWorkCaseStudyLearning[];
  creditsIntro: string;
  creditsColumns: StandardWorkCaseStudyCredit[][];
};

function SectionLabel({ children }: { children: string }) {
  return (
    <div className={caseStudySpacing.sectionLabelClass}>
      <p className={`shrink-0 ${caseStudyType.sectionLabel}`}>{children}</p>
      <div
        className="h-px min-w-0 flex-1 bg-white/[0.08]"
        aria-hidden
      />
    </div>
  );
}

function CreditNameLine({ name, href }: { name: string; href?: string }) {
  const baseClass = `inline-flex items-baseline gap-1.5 font-normal transition-colors ${caseStudyType.body}`;

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`group ${baseClass} no-underline underline-offset-[0.35em] decoration-neutral-400 hover:underline hover:decoration-white focus-visible:outline-none focus-visible:underline focus-visible:decoration-white focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black`}
      >
        {name}
        <ExternalLinkIcon
          className="shrink-0 translate-y-px text-neutral-400 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
          aria-hidden
        />
      </a>
    );
  }

  return (
    <span className={`${baseClass} no-underline`}>
      {name}
    </span>
  );
}

const headerClassNames = {
  h1: caseStudyType.headline,
  metaRow:
    "mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 " + caseStudyType.muted,
  dateRange:
    "inline-flex h-5 items-center rounded-sm bg-white/[0.06] px-2.5 tabular-nums tracking-tight " +
    caseStudyType.muted,
} as const;

const secondaryLinkClass =
  "text-neutral-400 underline decoration-neutral-400 underline-offset-[0.2em] transition-colors hover:text-white hover:decoration-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black";

export function StandardWorkCaseStudy({
  idPrefix,
  title,
  dateRange,
  meta,
  hero,
  overview,
  learningsLayout = "split",
  learnings,
  creditsIntro,
  creditsColumns,
}: StandardWorkCaseStudyProps) {
  const overviewId = `${idPrefix}-overview-heading`;
  const learningsId = `${idPrefix}-learnings-heading`;
  const creditsId = `${idPrefix}-credits-heading`;

  return (
    <CaseStudyPageShell
      title={title}
      dateRange={dateRange}
      headerClassNames={headerClassNames}
      meta={meta}
    >
      <div
        className={`flex w-full max-w-4xl flex-col items-stretch sm:px-0 ${caseStudySpacing.sectionStack}`}
      >
        <div className="flex w-full justify-center">
          <figure className="relative m-0 mx-auto w-full max-w-3xl">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-white/[0.08] bg-black">
              <Image
                src={hero.src}
                alt={hero.alt}
                fill
                className="object-cover object-center"
                sizes={hero.sizes ?? "(max-width: 768px) 100vw, 768px"}
                priority={hero.priority ?? false}
              />
            </div>
            <figcaption
              className={`mt-3 max-w-2xl px-1 text-center sm:mx-auto ${caseStudyType.bodySecondary}`}
            >
              {hero.caption}
            </figcaption>
          </figure>
        </div>

        <section aria-labelledby={overviewId}>
          <SectionLabel>Overview</SectionLabel>
          <h3 id={overviewId} className="sr-only">
            Overview
          </h3>
          <div className={`${caseStudySpacing.labelToContent} max-w-3xl ${caseStudyType.body}`}>
            {overview}
          </div>
        </section>

        <section aria-labelledby={learningsId}>
          <SectionLabel>Learnings</SectionLabel>
          <h3 id={learningsId} className="sr-only">
            Learnings
          </h3>
          <dl
            className={`${caseStudySpacing.labelToContent} ${caseStudySpacing.learningsList} m-0 p-0`}
          >
            {learnings.map((item, index) => (
              <div
                key={`${idPrefix}-learning-${index}`}
                className={
                  learningsLayout === "stacked"
                    ? "flex flex-col gap-2 sm:gap-2.5"
                    : "flex items-baseline gap-x-2 sm:gap-x-3"
                }
              >
                <dt
                  className={`m-0 ${caseStudyType.learningTitle}${
                    learningsLayout === "split" ? " shrink-0" : ""
                  }`}
                >
                  {item.title}
                </dt>
                <dd
                  className={`m-0 ${caseStudyType.learningBody}${
                    learningsLayout === "split" ? " min-w-0 flex-1" : ""
                  }`}
                >
                  {item.content}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby={creditsId}>
          <SectionLabel>Credits</SectionLabel>
          <h3 id={creditsId} className="sr-only">
            Credits
          </h3>
          <div className={caseStudySpacing.labelToContent}>
            {creditsIntro.trim() ? (
              <p
                className={`mb-7 max-w-3xl sm:mb-8 ${caseStudyType.bodySecondary}`}
              >
                {creditsIntro}
              </p>
            ) : null}
            <div className={caseStudySpacing.creditsColumnsGrid}>
              {creditsColumns.map((col, i) => (
                <ul
                  key={i}
                  className="m-0 flex min-w-0 list-none flex-col gap-4 p-0"
                >
                  {col.map((entry) => (
                    <li
                      key={entry.name}
                      className="flex flex-wrap items-baseline gap-x-2 gap-y-0"
                    >
                      {entry.role?.trim() ? (
                        <>
                          <span className={caseStudyType.mutedLabel}>
                            {entry.role}
                          </span>
                          <span className="text-neutral-500" aria-hidden>
                            —
                          </span>
                        </>
                      ) : null}
                      <CreditNameLine name={entry.name} href={entry.href} />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </section>
      </div>
    </CaseStudyPageShell>
  );
}

export { secondaryLinkClass };
