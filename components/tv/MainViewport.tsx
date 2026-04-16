"use client";

import { Suspense, useEffect, useState } from "react";
import { RampCinemaCaseStudy } from "@/components/ramp/RampCinemaCaseStudy";
import type { Project } from "@/app/types";
import { CHANNELS, projectForChannel } from "@/lib/channels";
import { EpisodeRail } from "./EpisodeRail";
import { EpisodeTitleRailProvider } from "./EpisodeTitleRailContext";
import { rampSpendEpisodes } from "@/data/case-studies/ramp-spend";
import { rampTreasuryEpisodes } from "@/data/case-studies/ramp-treasury";
import type { RampEpisode } from "@/data/case-studies/ramp-types";
import { LearningsFromStandard } from "@/components/LearningsFromStandard";
import { standardCreditsColumnsToRampCredits } from "@/lib/case-study-credits";
import { figmaCaseStudyContent } from "@/data/case-studies/figma";
import { metaCaseStudyContent } from "@/data/case-studies/meta";
import { disneyCaseStudyContent } from "@/data/case-studies/disney";
import { useSearchParams } from "next/navigation";
import { RampChannelLanding } from "./RampChannelLanding";
import { AboutViewport } from "./AboutViewport";
import { ResumeViewport } from "./ResumeViewport";
import { DinnerPartyGalleryCaseStudy } from "./DinnerPartyGalleryCaseStudy";
import { DinnerPartyVideoLanding } from "./DinnerPartyVideoLanding";

function episodeFromStandard(content: {
  title: string;
  dateRange: string;
  meta: RampEpisode["metaRowRich"];
  hero: { src: string; alt: string; caption: string };
  overview: RampEpisode["outcomeRich"];
  learnings: Parameters<typeof LearningsFromStandard>[0]["items"];
  learningsLayout?: Parameters<typeof LearningsFromStandard>[0]["learningsLayout"];
  learningsBodyCopyTitleSeparator?: string;
  creditsIntro: string;
  creditsColumns: Parameters<typeof standardCreditsColumnsToRampCredits>[0];
}): RampEpisode {
  return {
    title: content.title,
    pillSub: "",
    status: "past",
    yearLabel: content.dateRange,
    metaRowRich: content.meta,
    logline: content.hero.caption,
    hero: { aspect: "web", src: content.hero.src, alt: content.hero.alt },
    outcomeRich: content.overview,
    learningsRich: (
      <LearningsFromStandard
        items={content.learnings}
        learningsLayout={content.learningsLayout}
        presentation="bodyCopy"
        bodyCopyTitleSeparator={content.learningsBodyCopyTitleSeparator}
      />
    ),
    creditsIntro: content.creditsIntro,
    credits: standardCreditsColumnsToRampCredits(content.creditsColumns),
  };
}

function DemoChannel({ project }: { project: Project }) {
  const [embedLoaded, setEmbedLoaded] = useState(false);
  const [embedFailed, setEmbedFailed] = useState(false);
  const [embedTimedOut, setEmbedTimedOut] = useState(false);

  const tvEmbedUrl = project.tvEmbedUrl ?? null;
  const externalFooterLabel =
    tvEmbedUrl != null
      ? "Open in a new tab"
      : (project.externalLinkLabel ?? "Open in a new tab");
  useEffect(() => {
    setEmbedLoaded(false);
    setEmbedFailed(false);
    setEmbedTimedOut(false);
  }, [tvEmbedUrl]);

  useEffect(() => {
    if (!tvEmbedUrl) return;
    if (embedLoaded || embedFailed) return;

    const timer = window.setTimeout(() => {
      setEmbedTimedOut(true);
    }, 8000);
    return () => window.clearTimeout(timer);
  }, [tvEmbedUrl, embedLoaded, embedFailed]);

  const youtubeEmbedUrl = (() => {
    if (!project.video) return null;
    const m = project.video.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&?/]+)/,
    );
    return m ? `https://www.youtube.com/embed/${m[1]}` : null;
  })();
  const directVideoUrl =
    project.video && !youtubeEmbedUrl ? project.video : null;

  const fallbackMedia = youtubeEmbedUrl ? (
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
  );

  return (
    <div className="relative flex h-full min-h-0 flex-1 flex-col bg-black">
      <div className="min-h-0 flex-1 overflow-hidden">
        {tvEmbedUrl ? (
          embedFailed || embedTimedOut ? (
            fallbackMedia
          ) : (
            <iframe
              title={project.title}
              src={tvEmbedUrl}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              referrerPolicy="no-referrer"
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
              className="h-full w-full"
              onLoad={() => {
                setEmbedLoaded(true);
                setEmbedTimedOut(false);
              }}
              onError={() => setEmbedFailed(true)}
            />
          )
        ) : (
          fallbackMedia
        )}
      </div>
      {project.externalUrl ? (
        <div className="shrink-0 border-t border-white/10 p-3">
          <a
            href={project.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-[10px] tracking-wider text-tv-pink hover:underline"
          >
            {externalFooterLabel}
            <span aria-hidden>↗</span>
          </a>
        </div>
      ) : null}
      <span
        className={
          project.slug === "ipod-concert-diary"
            ? "absolute right-3 top-3 rounded bg-black/85 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-white"
            : "absolute right-3 top-3 rounded bg-black/60 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-tv-muted"
        }
      >
        Applet
      </span>
    </div>
  );
}

const caseStudyFallback = (
  <div
    className="flex h-full min-h-[200px] items-center justify-center bg-black font-mono text-xs uppercase text-tv-muted"
    aria-hidden
  >
    Loading…
  </div>
);

type MainViewportProps = {
  channelIndex: number;
  signalLost: boolean;
  projects: Project[];
};

export function MainViewport({
  channelIndex,
  signalLost,
  projects,
}: MainViewportProps) {
  const searchParams = useSearchParams();
  if (signalLost) {
    return (
      <div className="h-full min-h-0 flex-1 bg-black" aria-hidden>
        {/* Static canvas drawn at TvShell level */}
      </div>
    );
  }

  const ch = CHANNELS[channelIndex];
  if (!ch) return null;

  const view = searchParams.get("view") ?? "";

  const inner = (() => {
    if (view === "resume") {
      return <ResumeViewport />;
    }
    if (view === "about") {
      return <AboutViewport />;
    }
    if (ch.kind === "side-project") {
      const proj = projectForChannel(ch, projects);
      if (!proj) return null;
      if (ch.projectSlug === "dinner-party-seating-chart") {
        if (view === "gallery") {
          return <DinnerPartyGalleryCaseStudy channelNumber={ch.channel} />;
        }
        return (
          <DinnerPartyVideoLanding
            project={proj}
            channelNumber={ch.channel}
          />
        );
      }
      return <DemoChannel project={proj} />;
    }
    switch (ch.workSlug) {
      case "ramp-spend":
        if (view !== "episode") {
          return (
            <RampChannelLanding
              channelNumber={1}
              channelLabel="Spend Management"
              roleLine="Full-time"
              yearRange="2023–2025"
              episodes={rampSpendEpisodes}
            />
          );
        }
        return (
          <Suspense fallback={caseStudyFallback}>
            <RampCinemaCaseStudy
              episodes={rampSpendEpisodes}
              keyboardMode="tvShell"
              showPlayer={false}
              layoutMode="embedded"
            />
          </Suspense>
        );
      case "ramp-treasury":
        if (view !== "episode") {
          return (
            <RampChannelLanding
              channelNumber={2}
              channelLabel="Treasury"
              roleLine="Full-time"
              yearRange="2025–2026"
              episodes={rampTreasuryEpisodes}
            />
          );
        }
        return (
          <Suspense fallback={caseStudyFallback}>
            <RampCinemaCaseStudy
              episodes={rampTreasuryEpisodes}
              keyboardMode="tvShell"
              showPlayer={false}
              layoutMode="embedded"
            />
          </Suspense>
        );
      case "figma":
        if (view !== "episode") {
          return (
            <RampChannelLanding
              channelNumber={ch.channel}
              channelLabel="Figma"
              roleLine="Internship"
              yearRange={figmaCaseStudyContent.dateRange}
              episodes={[episodeFromStandard(figmaCaseStudyContent)]}
            />
          );
        }
        return (
          <Suspense fallback={caseStudyFallback}>
            <RampCinemaCaseStudy
              episodes={[episodeFromStandard(figmaCaseStudyContent)]}
              keyboardMode="tvShell"
              showPlayer={false}
              layoutMode="embedded"
            />
          </Suspense>
        );
      case "meta":
        if (view !== "episode") {
          return (
            <RampChannelLanding
              channelNumber={ch.channel}
              channelLabel="Meta"
              roleLine="Internship"
              yearRange={metaCaseStudyContent.dateRange}
              episodes={[episodeFromStandard(metaCaseStudyContent)]}
            />
          );
        }
        return (
          <Suspense fallback={caseStudyFallback}>
            <RampCinemaCaseStudy
              episodes={[episodeFromStandard(metaCaseStudyContent)]}
              keyboardMode="tvShell"
              showPlayer={false}
              layoutMode="embedded"
            />
          </Suspense>
        );
      case "disney":
        if (view !== "episode") {
          return (
            <RampChannelLanding
              channelNumber={ch.channel}
              channelLabel="Disney"
              roleLine="Internship"
              yearRange={disneyCaseStudyContent.dateRange}
              episodes={[episodeFromStandard(disneyCaseStudyContent)]}
            />
          );
        }
        return (
          <Suspense fallback={caseStudyFallback}>
            <RampCinemaCaseStudy
              episodes={[episodeFromStandard(disneyCaseStudyContent)]}
              keyboardMode="tvShell"
              showPlayer={false}
              layoutMode="embedded"
            />
          </Suspense>
        );
      default:
        return null;
    }
  })();

  const showEpisodeRail =
    ch.workSlug === "ramp-spend" || ch.workSlug === "ramp-treasury";
  const episodes =
    ch.workSlug === "ramp-spend" ? rampSpendEpisodes : rampTreasuryEpisodes;

  return (
    <EpisodeTitleRailProvider>
      <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden">
        {showEpisodeRail && view === "episode" ? (
          <EpisodeRail
            episodes={episodes}
            channelParam={ch.channel}
          />
        ) : null}
        <div className="relative min-h-0 flex-1 overflow-hidden">{inner}</div>
      </div>
    </EpisodeTitleRailProvider>
  );
}
