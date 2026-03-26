"use client";

import { useState, useCallback, useEffect } from "react";

type Props = {
  projectTitle: string;
  /** When provided, the drawer is externally controlled (no built-in trigger). */
  isOpen?: boolean;
  onClose?: () => void;
};

const MOCK_ENTRY = {
  notes: [
    {
      tag: "CTA",
      takeaway: "Keep one primary action",
      body: "One primary CTA above the fold. We resisted adding secondary actions because data showed drop-off when we had two buttons.",
      outcome: "Fewer abandonments above the fold",
    },
    {
      tag: "UX flow",
      takeaway: "Wizard → single page",
      body: "We moved the Treasury flow from a stepped wizard to a single scrollable page with clear sections. Users were abandoning at step 2.",
      outcome: "Completion much higher after the change",
    },
    {
      tag: "Product",
      takeaway: "Reserve as default",
      body: "CLIP volume reduction was a product goal. We made the reserve path first-class — inline education, recommended path as default — so teams wouldn’t default to CLIP.",
      outcome: "Reserve path competes with CLIP",
    },
    {
      tag: "Visual",
      takeaway: "Metrics = decision support",
      body: "Impact cards use large, scannable numbers so stakeholders see $ and % in under 2 seconds. No decorative charts — only what drives the next decision.",
      outcome: "Faster scan, decision-ready",
    },
    {
      tag: "Accessibility",
      takeaway: "Focus order = visual order",
      body: "We locked contrast on all new surfaces and kept focus order aligned with visual hierarchy. No custom focus traps; the DOM order does the work.",
      outcome: "Predictable, accessible navigation",
    },
  ],
  tradeoff: {
    label: "What we deferred",
    body: "We had to ship in Q1. So we cut scope to core flow + impact visibility and deferred advanced reporting. That trade-off is documented in the backlog.",
  },
};

export function DesignDecisionsDrawer({ projectTitle, isOpen, onClose }: Props) {
  const [internalOpen, setInternalOpen] = useState(false);

  const controlled = isOpen !== undefined;
  const open = controlled ? isOpen : internalOpen;

  const close = useCallback(() => {
    if (onClose) onClose();
    else setInternalOpen(false);
  }, [onClose]);

  const openDrawer = useCallback(() => setInternalOpen(true), []);

  useEffect(() => {
    if (!open) return;
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onEscape);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  return (
    <>
      {!controlled && (
        <button
          type="button"
          onClick={openDrawer}
          className="mt-6 inline-flex items-center gap-2 self-start text-left text-sm text-neutral-400 hover:text-neutral-200 underline-offset-2 hover:underline transition-colors"
          aria-label="Read key design decisions"
        >
          <svg
            className="w-4 h-4 shrink-0 text-neutral-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          Read key design decisions
        </button>
      )}

      {/* Backdrop */}
      <div
        role="presentation"
        aria-hidden
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={close}
      />

      {/* Drawer panel */}
      <aside
        role="dialog"
        aria-label="Design rationale and key decisions"
        aria-modal="true"
        className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-lg flex flex-col bg-neutral-900 border-l border-neutral-700 shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between shrink-0 px-6 py-4 border-b border-neutral-700">
          <h2 className="text-sm font-medium uppercase tracking-wider text-neutral-400">
            Decision log
          </h2>
          <button
            type="button"
            onClick={close}
            className="p-2 rounded-lg text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800 transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="px-6 py-8 max-w-lg">
            {/* Decisions: takeaway first, then body + outcome */}
            <div className="flex flex-col gap-8 font-[Georgia,serif]">
              {MOCK_ENTRY.notes.map((note, i) => (
                <article key={i} className="flex flex-col gap-2 border-b border-neutral-800 pb-8 last:border-0 last:pb-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-sans font-medium uppercase tracking-wider text-neutral-500 px-2 py-0.5 rounded bg-neutral-800">
                      {note.tag}
                    </span>
                    <h3 className="text-neutral-200 font-sans font-semibold text-sm tracking-wide">
                      → {note.takeaway}
                    </h3>
                  </div>
                  <p className="text-neutral-300 text-[15px] leading-relaxed">
                    {note.body}
                  </p>
                  <p className="text-xs text-neutral-500 italic">
                    So that: {note.outcome}
                  </p>
                </article>
              ))}
            </div>

            {/* Trade-off callout */}
            <div className="mt-10 p-4 rounded-lg bg-amber-950/40 border border-amber-800/50">
              <p className="text-xs font-medium uppercase tracking-wider text-amber-600/90 mb-2">
                {MOCK_ENTRY.tradeoff.label}
              </p>
              <p className="text-sm text-amber-100/90 leading-relaxed">
                {MOCK_ENTRY.tradeoff.body}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
