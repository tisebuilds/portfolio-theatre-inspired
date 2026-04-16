import { Suspense } from "react";
import { TvShell } from "@/components/tv/TvShell";
import projectsData from "@/data/projects.json";
import type { Project } from "./types";

const projects = projectsData as Project[];

export default function HomePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-tv-bg" aria-hidden />}>
      <TvShell projects={projects} />
    </Suspense>
  );
}
