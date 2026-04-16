"use client";

import type { Project } from "@/app/types";
import { useRouter, useSearchParams } from "next/navigation";

type DinnerPartyVideoLandingProps = {
  project: Project;
  channelNumber: number;
};

export function DinnerPartyVideoLanding({
  project,
  channelNumber,
}: DinnerPartyVideoLandingProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const youtubeEmbedUrl = (() => {
    if (!project.video) return null;
    const m = project.video.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&?/]+)/,
    );
    return m ? `https://www.youtube.com/embed/${m[1]}` : null;
  })();
  const directVideoUrl =
    project.video && !youtubeEmbedUrl ? project.video : null;

  const openGallery = () => {
    const next = new URLSearchParams(searchParams.toString());
    next.set("ch", String(channelNumber));
    next.set("view", "gallery");
    next.delete("ep");
    router.replace(`/?${next.toString()}`, { scroll: false });
  };

  return (
    <div className="relative flex h-full min-h-0 flex-1 flex-col bg-black">
      <div className="min-h-0 flex-1 overflow-hidden">
        {youtubeEmbedUrl ? (
          <iframe
            title={project.title}
            src={youtubeEmbedUrl}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        ) : directVideoUrl ? (
          <video
            src={directVideoUrl}
            className="h-full w-full object-cover object-top"
            autoPlay
            muted={!project.videoSound}
            loop
            playsInline
            controls
          />
        ) : project.poster || project.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.poster ?? project.image ?? ""}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center p-8 text-center text-tv-muted">
            <p className="font-mono text-xs uppercase tracking-widest">
              {project.title}
            </p>
          </div>
        )}
      </div>
      <div className="shrink-0 border-t border-white/10 p-3">
        <button
          type="button"
          onClick={openGallery}
          className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-tv-pink hover:underline"
        >
          Learn more
        </button>
      </div>
      <span className="absolute right-3 top-3 rounded bg-black/60 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-tv-muted">
        Demo
      </span>
    </div>
  );
}
