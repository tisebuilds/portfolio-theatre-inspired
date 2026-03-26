import Link from "next/link";
import type { Project } from "@/app/types";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="w-full">
      <Link
        href={`/projects/${project.slug}`}
        className="block border border-neutral-400 bg-neutral-950 p-6 rounded-none min-h-[180px] flex flex-col justify-end transition-all focus:outline-none focus:border-neutral-300 shadow-[0_0_16px_rgba(255,255,255,0.12)] hover:border-neutral-300 hover:shadow-[0_0_24px_rgba(255,255,255,0.2)]"
      >
        <span className="text-neutral-300 text-sm font-medium uppercase tracking-wider">
          {project.title}
        </span>
      </Link>
      {project.dateRange && (
        <span className="text-neutral-500 text-xs mt-1 block">{project.dateRange}</span>
      )}
    </div>
  );
}
