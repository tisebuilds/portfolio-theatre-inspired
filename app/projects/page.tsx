import { ProjectsHomeVideo } from "@/components/ProjectsHomeVideo";
import projectsData from "@/data/projects.json";
import type { Project } from "@/app/types";

const projects = projectsData as Project[];

export const metadata = {
  title: "Projects",
  description: "Case study projects from college",
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col gap-12">
          <h1 className="text-2xl md:text-3xl font-bold tracking-wider text-neutral-200 text-center w-full">
            {["Tise", "uses", "storytelling", "&", "prototypes", "to", "solve", "problems"].map((word, i) => (
              <span key={i} className="word-glow cursor-default">
                {word}{" "}
              </span>
            ))}
          </h1>

          <ProjectsHomeVideo projects={projects} />
        </div>
      </main>
    </div>
  );
}
