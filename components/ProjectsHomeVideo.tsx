"use client";

import { useState, useCallback } from "react";
import { ProjectPreview } from "./ProjectPreview";
import { ProjectTapeList } from "./ProjectTapeList";
import type { Project } from "@/app/types";

type ProjectsHomeVideoProps = {
  projects: Project[];
};

export function ProjectsHomeVideo({ projects }: ProjectsHomeVideoProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = projects[activeIndex] ?? null;

  const handleChannelUp = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  }, [projects.length]);

  const handleChannelDown = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  }, [projects.length]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-5 items-start">
      <div className="flex flex-col items-center w-full lg:w-[78%]">
        <ProjectPreview
          project={activeProject}
          channelNumber={activeIndex}
          onChannelUp={handleChannelUp}
          onChannelDown={handleChannelDown}
        />
      </div>

      <div className="w-full lg:w-[20%]">
        <ProjectTapeList
          projects={projects}
          activeIndex={activeIndex}
          onSelect={setActiveIndex}
        />
      </div>
    </div>
  );
}
