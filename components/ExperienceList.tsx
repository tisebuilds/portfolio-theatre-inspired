import Link from "next/link";
import type { WorkExperience } from "@/app/types";

type ExperienceListProps = {
  experiences: WorkExperience[];
};

export function ExperienceList({ experiences }: ExperienceListProps) {
  return (
    <ul className="flex flex-col border border-neutral-700 list-none p-0 m-0 divide-y divide-neutral-700">
      {experiences.map((exp) => (
        <li key={exp.slug} className="rounded-none">
          <Link
            href={`/work/${exp.slug}`}
            className="flex flex-row justify-between items-baseline gap-6 py-5 px-6 text-left border-0 rounded-none transition-colors hover:bg-neutral-900/80 focus:outline-none focus:bg-neutral-900/80 focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-inset"
          >
            <span className="text-neutral-200 font-medium">{exp.title}</span>
            <span className="text-neutral-500 text-sm tabular-nums shrink-0">
              {exp.dateRange}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
