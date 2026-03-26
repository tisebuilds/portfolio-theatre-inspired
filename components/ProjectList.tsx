import Link from "next/link";
import type { Project } from "@/app/types";

type ProjectListProps = {
  projects: Project[];
};

export function ProjectList({ projects }: ProjectListProps) {
  return (
    <ul className="flex flex-col list-none p-0 m-0 divide-y divide-neutral-800">
      {projects.map((project) => (
        <li key={project.slug} className="group">
          <Link
            href={`/projects/${project.slug}`}
            className="flex flex-row justify-between items-baseline gap-6 py-4 px-6 text-left border-0 rounded-none transition-colors hover:bg-neutral-900 focus:outline-none focus:bg-neutral-900"
          >
            <span className="flex flex-row items-center gap-3">
              <span
                className="w-1.5 h-1.5 rounded-full bg-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                aria-hidden
              />
              <span className="text-neutral-200 font-medium">{project.title}</span>
            </span>
            {project.dateRange && (
              <span className="text-neutral-500 text-sm tabular-nums shrink-0">
                {project.dateRange}
              </span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}
