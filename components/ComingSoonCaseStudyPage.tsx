type ComingSoonCaseStudyPageProps = {
  title: string;
  dateRange?: string;
  description?: string;
  poster?: string;
  journalUrl?: string;
  journalLabel?: string;
};

export function ComingSoonCaseStudyPage({
  title: _title,
  journalUrl,
  journalLabel,
}: ComingSoonCaseStudyPageProps) {
  const hasJournal = Boolean(journalUrl);

  return (
    <div className="flex flex-col bg-black text-neutral-100">
      <main className="flex-1 relative overflow-hidden -mt-8 sm:-mt-7">
        <div className="cs-slate" aria-label="Coming soon case study">
          <div className="cs-orbit" aria-hidden="true">
            <div className="cs-ring-outer" />
            <div className="cs-ring-inner" />
            <div className="cs-arc" />
            <div className="cs-arc-slow" />
            <div className="cs-dot-center" />
          </div>

          <p className="cs-eyebrow">Case Study</p>
          <h1 className="cs-name">Coming Soon</h1>

          {hasJournal && (
            <a
              className="cs-journal-link"
              href={journalUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="cs-arr" aria-hidden>
                ↗
              </span>
              {journalLabel ?? "Production Notes"}
            </a>
          )}
        </div>
      </main>
    </div>
  );
}
