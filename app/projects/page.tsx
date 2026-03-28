import { ProjectsHomeVideo } from "@/components/ProjectsHomeVideo";
import { ProjectsHeading } from "@/components/ProjectsHeading";
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
          <ProjectsHeading />

          <ProjectsHomeVideo projects={projects} />
        </div>
      </main>
    </div>
  );
}
