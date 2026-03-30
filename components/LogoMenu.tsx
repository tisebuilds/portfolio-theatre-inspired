"use client";

import Image from "next/image";
import Link from "next/link";
import type { WorkExperience } from "@/app/types";

type LogoMenuProps = {
  experiences: WorkExperience[];
  highlightedIndex: number | null;
  onHoverIndex: (index: number) => void;
  onHoverLeave: () => void;
};

export function LogoMenu({ experiences, highlightedIndex, onHoverIndex, onHoverLeave }: LogoMenuProps) {
  return (
    <nav className="w-full max-w-[648px] md:max-w-[768px] mx-auto z-10" aria-label="Work experience">
      <ul className="flex flex-col">
        {experiences.map((exp, i) => {
          const isHighlighted = highlightedIndex === i;
          return (
            <li key={exp.slug}>
              <Link
                href={`/work/${exp.slug}/case-study-coming-soon`}
                onMouseEnter={() => onHoverIndex(i)}
                onMouseLeave={onHoverLeave}
                className={`group grid grid-cols-[1fr_auto] gap-x-8 items-center px-4 py-2.5 rounded-lg transition-colors hover:bg-neutral-800/60 ${isHighlighted ? "bg-neutral-800/60" : ""}`}
                aria-label={`Go to ${exp.title} experience`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className={`relative shrink-0 flex items-center justify-center h-8 w-8 rounded transition-colors ${isHighlighted ? "bg-transparent" : "bg-neutral-800/60 group-hover:bg-transparent"}`}>
                    {exp.logo && (
                      <Image
                        src={exp.logo}
                        alt={`${exp.title} logo`}
                        fill
                        className="object-contain p-1.5 brightness-0 invert opacity-60"
                      />
                    )}
                  </span>
                  <span className={`text-sm font-medium truncate transition-colors ${isHighlighted ? "text-white" : "text-neutral-200 group-hover:text-white"}`}>
                    {exp.title}
                  </span>
                </div>
                <span className="text-xs text-neutral-500 tabular-nums whitespace-nowrap">
                  {exp.dateRange}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
