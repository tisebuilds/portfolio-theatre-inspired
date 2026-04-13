import type { ReactNode } from "react";
import { JournalIcon } from "@/components/case-study-icons";

type CaseStudyPageShellProps = {
  title: string;
  dateRange: string;
  journalUrl?: string;
  meta: ReactNode;
  /** CSS `background` for the radial glow behind the showcase. Omit to disable. */
  glowBackground?: string;
  /**
   * `flush` drops the tall min-height and top-aligns content so the page bg does not
   * read as a large empty band around short showcases.
   */
  showcaseLayout?: "default" | "flush";
  children: ReactNode;
};

export function CaseStudyPageShell({
  title,
  dateRange,
  journalUrl,
  meta,
  glowBackground,
  showcaseLayout = "default",
  children,
}: CaseStudyPageShellProps) {
  const sectionClass =
    showcaseLayout === "flush"
      ? "relative mt-6 flex justify-center pt-0 pb-10 sm:mt-8 sm:pt-0 sm:pb-14"
      : "relative mt-8 flex min-h-[min(52vh,480px)] justify-center pt-3 pb-8 sm:mt-10 sm:pt-4 sm:pb-12";

  const showcaseInnerClass =
    showcaseLayout === "flush"
      ? "relative z-[1] flex w-full justify-center items-start"
      : "relative z-[1] flex items-center justify-center";

  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col bg-black font-sans text-white">
      <main className="mx-auto w-full max-w-4xl flex-1 px-6 pb-20 pt-7 sm:px-8 sm:pb-24 sm:pt-8">
        <h1 className="text-2xl font-bold tracking-normal text-neutral-200 md:text-3xl">
          {title}{" "}
          <span className="inline-flex shrink-0 items-center gap-x-3 align-middle whitespace-nowrap">
            <span className="inline-flex h-5 items-center rounded-sm bg-white/[0.06] px-2.5 text-xs font-medium tabular-nums tracking-tight text-white/55">
              {dateRange}
            </span>
            {journalUrl ? (
              <a
                href={journalUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Journal entry (opens in new tab)"
                className="inline-flex h-5 w-5 items-center justify-center rounded-sm bg-white/[0.06] text-white/55 transition-colors hover:text-white/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                <JournalIcon />
              </a>
            ) : null}
          </span>
        </h1>

        <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-white/45">
          {meta}
        </div>

        <section className={sectionClass} aria-label="Product showcase">
          {glowBackground ? (
            <div
              className="pointer-events-none absolute inset-0 flex justify-center pt-[min(4vh,1.5rem)]"
              aria-hidden
            >
              <div
                className="h-[min(60vh,500px)] w-[min(92vw,520px)]"
                style={{ background: glowBackground }}
              />
            </div>
          ) : null}
          <div className={showcaseInnerClass}>{children}</div>
        </section>
      </main>
    </div>
  );
}
