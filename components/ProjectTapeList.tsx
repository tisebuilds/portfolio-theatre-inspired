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
      <h2 className="mb-3 text-xs font-black uppercase tracking-wider text-fuchsia-400">
        Tune In Now
      </h2>
      <div className="flex flex-col gap-1">
        {projects.map((project, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={project.slug}
              onClick={() => onSelect(idx)}
              className={`group flex items-center gap-2 rounded border-l-[3px] px-2.5 py-1.5 text-left transition-all duration-200 ${
                isActive
                  ? "border-l-fuchsia-400 bg-fuchsia-600/90 text-white shadow-lg shadow-fuchsia-900/30"
                  : "border-l-transparent bg-neutral-800/50 text-neutral-300 hover:bg-neutral-700/70 hover:text-neutral-100"
              }`}
            >
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded text-[10px] font-black ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-neutral-700/60 text-neutral-500 group-hover:text-neutral-300"
                }`}
              >
                {idx}
              </span>
              <span className="flex-1 truncate text-xs font-semibold">
                {project.title}
              </span>
              <span
                className={`text-[10px] font-mono tabular-nums ${
                  isActive ? "text-fuchsia-200" : "text-neutral-500"
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
