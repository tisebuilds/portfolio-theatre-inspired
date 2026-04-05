"use client";

import type { Project } from "@/app/types";

type ProjectTapeListProps = {
  projects: Project[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

export function ProjectTapeList({
  projects,
  activeIndex,
  onSelect,
}: ProjectTapeListProps) {
  return (
    <section>
      <h2 className="mb-3 text-xs font-black uppercase tracking-wider text-accent">
        Tune In Now
      </h2>
      <div className="flex flex-col gap-1.5">
        {projects.map((project, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={project.slug}
              onClick={() => onSelect(idx)}
              className={`group flex items-center gap-3 rounded border-l-2 px-3 py-2 text-left transition-all duration-200 ${
                isActive
                  ? "border-l-accent bg-accent/90 text-white"
                  : "border-l-transparent bg-neutral-800/50 text-neutral-300 hover:bg-neutral-700/70 hover:text-neutral-100"
              }`}
            >
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded text-[11px] font-black ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-neutral-700/60 text-neutral-400 group-hover:text-neutral-300"
                }`}
              >
                {idx}
              </span>
              <span className="flex-1 truncate text-[13px] font-semibold">
                {project.title}
              </span>
              <span
                className={`text-[11px] font-mono tabular-nums ${
                  isActive ? "text-white/90" : "text-neutral-400"
                }`}
              >
                {project.dateRange ?? "—"}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
