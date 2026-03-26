"use client";

import Link from "next/link";
import type { Project } from "@/app/types";

type ProjectTapeListProps = {
  projects: Project[];
  activeSlug: string | null;
  onHover: (slug: string | null) => void;
};

function DocIcon() {
  return (
    <svg
      width="20"
      height="24"
      viewBox="0 0 20 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 text-neutral-500"
      aria-hidden
    >
      <path
        d="M2 2h12l4 4v16H2V2z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path d="M14 2v4h4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function ProjectTapeList({
  projects,
  activeSlug,
  onHover,
}: ProjectTapeListProps) {
  const needsOrphanGuard = projects.length % 2 === 1;

  return (
    <ul className="flex flex-row flex-wrap justify-center gap-3 list-none p-0 m-0">
      {projects.map((project) => {
        const isActive = activeSlug === project.slug;
        return (
          <li key={project.slug}>
            <Link
              href={`/projects/${project.slug}`}
              onMouseEnter={() => onHover(project.slug)}
              onMouseLeave={() => onHover(null)}
              className={`flex flex-row items-center gap-3 px-4 py-3 border rounded-none transition-colors focus:outline-none ${
                isActive
                  ? "border-neutral-400 bg-neutral-900 text-neutral-200"
                  : "border-neutral-600 bg-neutral-950 text-neutral-400 hover:border-neutral-500 hover:text-neutral-300"
              }`}
            >
              <DocIcon />
              <span className="text-sm font-medium uppercase tracking-wider">
                {project.title}
              </span>
            </Link>
          </li>
        );
      })}
      {needsOrphanGuard && projects[0] && (
        <li
          className="invisible pointer-events-none shrink-0"
          aria-hidden
        >
          <span className="flex flex-row items-center gap-3 px-4 py-3 border border-neutral-600 rounded-none">
            <DocIcon />
            <span className="text-sm font-medium uppercase tracking-wider">
              {projects[0].title}
            </span>
          </span>
        </li>
      )}
    </ul>
  );
}
