import type { Project } from "@/app/types";

type ProjectPreviewProps = {
  project: Project | null;
};

export function ProjectPreview({ project }: ProjectPreviewProps) {
  const content = project ? (
    <>
      {project.poster || project.image ? (
        <img
          src={project.poster ?? project.image ?? ""}
          alt=""
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-12 text-center border border-neutral-700 bg-neutral-950 rounded-none">
          <span className="text-neutral-200 font-medium uppercase tracking-wider text-lg md:text-xl">
            {project.title}
          </span>
          {project.tagline && (
            <span className="text-neutral-500 text-sm mt-2 max-w-md">
              {project.tagline}
            </span>
          )}
          {project.dateRange && (
            <span className="text-neutral-600 text-xs mt-2">{project.dateRange}</span>
          )}
        </div>
      )}
    </>
  ) : (
    <div className="w-full h-full flex items-center justify-center border-0 border-neutral-700 bg-neutral-950 rounded-none text-neutral-500 text-sm uppercase tracking-wider">
      Hover a project to preview
    </div>
  );

  return (
    <div
      className="w-full aspect-video border border-neutral-600 bg-black rounded-none overflow-hidden"
      aria-label="Project preview"
    >
      {content}
    </div>
  );
}
