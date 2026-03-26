"use client";

import { useState } from "react";
import type { ShippedCaseStudyTab } from "@/app/types";

const lockIcon = (
  <svg className="w-4 h-4 shrink-0 text-emerald-500/90" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
  </svg>
);

type Props = {
  tabs: ShippedCaseStudyTab[];
  title: string;
};

export function TabbedPrototypeSection({ tabs, title }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = tabs[activeIndex];
  if (!active) return null;

  return (
    <figure
      className="w-full max-w-4xl mx-auto flex flex-col gap-4"
      aria-label={`${title} – prototype and problem`}
    >
      <div className="w-full rounded-t-lg overflow-hidden border border-neutral-600 bg-[#202124] shadow-2xl shadow-black/50">
        {/* Chrome tab bar – tabs live inside the window */}
        <div className="flex items-end h-9 min-h-[36px] px-2 pt-1.5 gap-0.5 bg-[#323232] border-b border-neutral-600">
          {tabs.map((tab, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-t-md border border-transparent border-b-0 text-[13px] min-w-0 max-w-[240px] transition-colors ${
                i === activeIndex
                  ? "bg-[#202124] text-neutral-300"
                  : "bg-[#323232] text-neutral-500 hover:text-neutral-400"
              }`}
              aria-selected={i === activeIndex}
            >
              {lockIcon}
              <span className="truncate">{tab.tabTitle ?? `Problem ${i + 1}`}</span>
            </button>
          ))}
        </div>
        {/* Chrome toolbar: back, forward, reload, omnibox */}
        <div className="flex items-center gap-2 min-h-[44px] px-3 py-2.5 bg-[#202124] border-b border-neutral-700">
          <button type="button" className="p-1.5 rounded-md text-neutral-400 hover:text-neutral-200 hover:bg-neutral-700/80" aria-label="Back">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" /></svg>
          </button>
          <button type="button" className="p-1.5 rounded-md text-neutral-600 cursor-default" aria-label="Forward" disabled>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" /></svg>
          </button>
          <button type="button" className="p-1.5 rounded-md text-neutral-400 hover:text-neutral-200 hover:bg-neutral-700/80" aria-label="Reload">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" /></svg>
          </button>
          <div className="flex-1 flex items-center gap-2 min-w-0 ml-2 h-8 px-4 rounded-full bg-neutral-800/90 border border-neutral-600 text-neutral-300">
            {lockIcon}
            <span className="truncate text-[13px] font-normal">{active.urlBarText ?? "app.ramp.com/treasury"}</span>
          </div>
          <div className="w-8 shrink-0" />
        </div>
        {/* Browser content area */}
        <div className="overflow-hidden bg-neutral-950">
          <img
            src={active.prototypeUrl}
            alt={`${title} – ${active.tabTitle ?? `Problem ${activeIndex + 1}`}`}
            className="w-full h-auto object-contain object-top block"
          />
        </div>
      </div>
      <figcaption className="flex flex-col gap-1.5">
        <p className="text-neutral-500 text-sm leading-relaxed text-center">{active.problem}</p>
      </figcaption>
    </figure>
  );
}
