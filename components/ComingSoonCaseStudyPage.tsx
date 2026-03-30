type ComingSoonCaseStudyPageProps = {
  journalUrl?: string;
  journalLabel?: string;
};

export function ComingSoonCaseStudyPage({
  journalUrl,
  journalLabel,
}: ComingSoonCaseStudyPageProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-16 flex flex-col gap-14">
        <div className="max-w-4xl mx-auto w-full flex flex-col gap-14">
          <section className="flex flex-col gap-6 max-w-2xl" aria-label="Project">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-wider text-neutral-200">
                Case study
              </h1>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-none text-xs font-medium uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-400/40">
                Coming Soon
              </span>
            </div>
            {journalUrl && (
              <a
                href={journalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center px-3 py-1.5 text-xs font-medium uppercase tracking-wider border border-neutral-600 text-neutral-200 hover:text-white hover:border-neutral-400 transition-colors"
              >
                {journalLabel ?? "Read case study journal"}
              </a>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
