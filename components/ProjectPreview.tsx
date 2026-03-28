"use client";

import { useEffect, useRef, useState } from "react";
import { CrtTelevision } from "./CrtTelevision";
import type { Project } from "@/app/types";

type ProjectPreviewProps = {
  project: Project | null;
  channelNumber?: number;
  onChannelUp?: () => void;
  onChannelDown?: () => void;
};

export function ProjectPreview({
  project,
  channelNumber,
  onChannelUp,
  onChannelDown,
}: ProjectPreviewProps) {
  const isOn = project !== null;
  const [showStatic, setShowStatic] = useState(false);
  const prevSlug = useRef<string | null>(null);

  useEffect(() => {
    const slug = project?.slug ?? null;
    if (slug !== prevSlug.current && slug !== null) {
      setShowStatic(true);
      const timer = setTimeout(() => setShowStatic(false), 180);
      prevSlug.current = slug;
      return () => clearTimeout(timer);
    }
    prevSlug.current = slug;
  }, [project?.slug]);

  const youtubeEmbedUrl = (() => {
    if (!project?.video) return null;
    const m = project.video.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&?/]+)/,
    );
    return m ? `https://www.youtube.com/embed/${m[1]}` : null;
  })();

  const screenContent = project ? (
    <>
      {youtubeEmbedUrl ? (
        <iframe
          src={youtubeEmbedUrl}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      ) : project.poster || project.image ? (
        <img
          src={project.poster ?? project.image ?? ""}
          alt=""
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center p-12 text-center">
          <span className="text-lg font-medium uppercase tracking-wider text-neutral-200 md:text-xl">
            {project.title}
          </span>
          {project.tagline && (
            <span className="mt-2 max-w-md text-sm text-neutral-500">
              {project.tagline}
            </span>
          )}
          {project.dateRange && (
            <span className="mt-2 text-xs text-neutral-600">
              {project.dateRange}
            </span>
          )}
        </div>
      )}
    </>
  ) : (
    <div className="flex h-full w-full items-center justify-center text-sm uppercase tracking-wider text-neutral-600">
      Select a channel to preview
    </div>
  );

  const inner = (
    <div className="relative h-full w-full bg-neutral-950">
      {screenContent}
      {showStatic && (
        <div className="crt-static pointer-events-none absolute inset-0 z-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJuIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC43IiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI24pIiBvcGFjaXR5PSIwLjQiLz48L3N2Zz4=')] opacity-70" />
      )}
      {project?.externalUrl && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/70 to-transparent px-3 pb-2.5 pt-8 sm:px-4 sm:pb-3 sm:pt-10">
          <div className="flex justify-end">
            <a
              href={project.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto flex shrink-0 items-center gap-1 sm:gap-1.5 rounded bg-white/10 px-2 py-1 sm:px-2.5 sm:py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-neutral-200 backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white"
            >
              <span>{project.externalLinkLabel || "Visit"}</span>
              <svg
                className="h-2.5 w-2.5"
                viewBox="0 0 10 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 1h6v6" />
                <path d="M9 1L1 9" />
              </svg>
            </a>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <CrtTelevision
      isOn={isOn}
      channelNumber={channelNumber}
      onChannelUp={onChannelUp}
      onChannelDown={onChannelDown}
    >
      {inner}
    </CrtTelevision>
  );
}
