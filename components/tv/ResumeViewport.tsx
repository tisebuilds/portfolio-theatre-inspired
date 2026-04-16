"use client";

import { SITE_RESUME } from "@/lib/site";

/** Chrome (and Chromium) built-in PDF UI: hide thumbnail / outline pane by default. */
const RESUME_PDF_EMBED_SRC = `${SITE_RESUME}#navpanes=0`;

export function ResumeViewport() {
  return (
    <div className="relative flex h-full min-h-0 flex-1 flex-col bg-black">
      <div className="min-h-0 flex-1 overflow-hidden">
        <iframe
          title="Resume"
          src={RESUME_PDF_EMBED_SRC}
          className="h-full w-full border-0 bg-neutral-950"
        />
      </div>
      <div className="shrink-0 border-t border-white/10 p-3">
        <a
          href={SITE_RESUME}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-[10px] tracking-wider text-tv-pink hover:underline"
        >
          Open PDF in a new tab
          <span aria-hidden>↗</span>
        </a>
      </div>
      <span className="absolute right-3 top-3 rounded bg-black/60 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-tv-muted">
        PDF
      </span>
    </div>
  );
}
