"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import projectsData from "@/data/projects.json";
import workData from "@/data/work.json";
import type { Project } from "@/app/types";
import type { WorkExperience } from "@/app/types";

const projects = projectsData as Project[];
const experiences = workData as WorkExperience[];

const baseClass =
  "text-sm uppercase tracking-wider text-neutral-400 hover:text-neutral-200 transition-colors";

type Section = "work" | "projects" | "about";

const SECTION_LINKS: { section: Section; href: string; label: string }[] = [
  { section: "work", href: "/", label: "Work Experiences" },
  { section: "projects", href: "/projects", label: "Projects" },
  { section: "about", href: "/about", label: "About" },
];

type SectionBreadcrumbsProps = {
  /** Current section we're in */
  section: Section;
  /** Current item title (e.g. "Project 1", "Ramp Treasury") */
  currentTitle: string;
  /** Optional: current item slug for highlighting in dropdown */
  currentSlug?: string;
};

export function SectionBreadcrumbs({
  section,
  currentTitle,
  currentSlug,
}: SectionBreadcrumbsProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open]);

  const sectionLabel =
    section === "work"
      ? "Work Experiences"
      : section === "projects"
        ? "Projects"
        : "About";

  const isProjects = section === "projects";
  const isWork = section === "work";

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 flex-wrap">
      <div className="relative" ref={ref}>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className={`${baseClass} font-medium inline-flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 focus:ring-offset-black rounded px-1 -mx-1`}
          aria-expanded={open}
          aria-haspopup="true"
          id="breadcrumb-section-menu"
        >
          {sectionLabel}
          <svg
            className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden
          >
            <path d="M7 10l5 5 5-5z" />
          </svg>
        </button>
        {open && (
          <ul
            role="menu"
            aria-labelledby="breadcrumb-section-menu"
            className="absolute left-0 top-full mt-1 min-w-[200px] py-2 bg-neutral-900 border border-neutral-600 rounded shadow-lg z-50"
          >
            {SECTION_LINKS.map(({ href, label }) => (
              <li key={href} role="none">
                <Link
                  href={href}
                  role="menuitem"
                  className={`block px-4 py-2 text-sm uppercase tracking-wider ${baseClass}`}
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
            {isProjects && (
              <>
                <li role="separator" className="border-t border-neutral-700 my-2" />
                <li className="px-3 py-1.5 text-xs uppercase tracking-wider text-neutral-500">
                  Projects
                </li>
                {projects.map((p) => (
                  <li key={p.slug} role="none">
                    <Link
                      href={`/projects/${p.slug}`}
                      role="menuitem"
                      className={`block px-4 py-2 text-sm uppercase tracking-wider ${baseClass} ${currentSlug === p.slug ? "font-semibold text-neutral-200" : ""}`}
                      onClick={() => setOpen(false)}
                      aria-current={currentSlug === p.slug ? "page" : undefined}
                    >
                      {p.title}
                    </Link>
                  </li>
                ))}
              </>
            )}
            {isWork && (
              <>
                <li role="separator" className="border-t border-neutral-700 my-2" />
                <li className="px-3 py-1.5 text-xs uppercase tracking-wider text-neutral-500">
                  Work
                </li>
                {experiences.map((e) => (
                  <li key={e.slug} role="none">
                    <Link
                      href={`/work/${e.slug}/case-study-coming-soon`}
                      role="menuitem"
                      className={`block px-4 py-2 text-sm uppercase tracking-wider ${baseClass} ${currentSlug === e.slug ? "font-semibold text-neutral-200" : ""}`}
                      onClick={() => setOpen(false)}
                      aria-current={currentSlug === e.slug ? "page" : undefined}
                    >
                      {e.title}
                    </Link>
                  </li>
                ))}
              </>
            )}
          </ul>
        )}
      </div>
      <span className="text-neutral-500 text-sm" aria-hidden>
        /
      </span>
      <span className="text-sm uppercase tracking-wider text-neutral-200 font-medium">
        {currentTitle}
      </span>
    </nav>
  );
}
