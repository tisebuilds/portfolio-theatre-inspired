import { Suspense } from "react";
import { TvBootFallback } from "@/components/tv/TvBootFallback";
import { TvShell } from "@/components/tv/TvShell";
import projectsData from "@/data/projects.json";
import type { Project } from "./types";

const projects = projectsData as Project[];

export default function HomePage() {
  return (
    <Suspense fallback={<TvBootFallback />}>
      <TvShell projects={projects} />
    </Suspense>
  );
}
