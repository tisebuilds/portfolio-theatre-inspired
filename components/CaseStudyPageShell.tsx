import type { ReactNode } from "react";
import { JournalIcon } from "@/components/case-study-icons";

type CaseStudyPageShellProps = {
  title: string;
  dateRange: string;
  journalUrl?: string;
  meta: ReactNode;
  /** CSS `background` for the radial glow behind the showcase. Omit to disable. */
  glowBackground?: string;
  children: ReactNode;
};

export function CaseStudyPageShell({
  title,
  dateRange,
  journalUrl,
  meta,
  glowBackground,
  children,
}: CaseStudyPageShellProps) {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col bg-black font-sans text-white">
      <main className="mx-auto w-full max-w-4xl flex-1 px-6 pb-16 pt-6 sm:px-8">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <h1 className="text-2xl md:text-3xl font-bold tracking-normal text-neutral-200">
            {title}
          </h1>
          <span className="inline-flex h-5 shrink-0 items-center rounded-sm bg-white/[0.06] px-2.5 text-xs font-medium tabular-nums tracking-tight text-white/55">
            {dateRange}
          </span>
          {journalUrl ? (
            <a
              href={journalUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Journal entry (opens in new tab)"
              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-sm bg-white/[0.06] text-white/55 transition-colors hover:text-white/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <JournalIcon />
            </a>
          ) : null}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-white/45">
          {meta}
        </div>

        <section
          className="relative mt-8 flex min-h-[min(52vh,480px)] justify-center pt-3 pb-8 sm:mt-10 sm:pt-4 sm:pb-12"
          aria-label="Product showcase"
        >
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
          <div className="relative z-[1] flex items-center justify-center">{children}</div>
        </section>
      </main>
    </div>
  );
}
