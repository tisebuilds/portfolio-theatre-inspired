"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import type {
  RampEpisode,
  RampEpisodeLearning,
  RampScreenCell,
} from "@/data/case-studies/ramp-types";
import styles from "./ramp-cinema.module.css";
import { EpisodeTitleRailContext } from "@/components/tv/EpisodeTitleRailContext";

type RampCinemaCaseStudyProps = {
  episodes: RampEpisode[];
  /** When false, hides the bottom player and episode controls (single-episode internship pages). */
  showPlayer?: boolean;
  /**
   * `tvShell`: ArrowLeft/Right = episode; [ ] = chapter; ArrowUp/Down unused (portfolio shell handles channels).
   * Default matches standalone `/work/...` pages.
   */
  keyboardMode?: "cinemaLegacy" | "tvShell";
  /** `embedded` keeps layout within parent (for TvShell player). */
  layoutMode?: "fullscreen" | "embedded";
};

const CHAPTER_SEGMENTS = [
  "OVERVIEW",
  "OUTCOME",
  "STUFF I WORKED ON",
  "CREDITS",
] as const;

/** One-pager PDFs are not ready yet; flip to true when they ship. */
const SHOW_ONE_PAGER_DOWNLOAD = false;

function clampEp(n: number, max: number) {
  return Math.min(Math.max(n, 0), max);
}

/** Rect overlap inside the scroller — more reliable than IO alone when layout is still settling. */
function heroTitleOverlapsScroller(
  root: HTMLElement,
  target: HTMLElement,
): boolean {
  const rootRect = root.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  if (rootRect.height < 2) return true;
  if (targetRect.height < 1) return true;
  return (
    targetRect.bottom > rootRect.top &&
    targetRect.top < rootRect.bottom &&
    targetRect.right > rootRect.left &&
    targetRect.left < rootRect.right
  );
}

function hasOutcome(ep: RampEpisode): boolean {
  if (ep.outcomeRich != null) return true;
  const o = ep.outcome;
  if (!o) return false;
  return Boolean(
    (o.problem && o.problem.trim()) || (o.outcome && o.outcome.trim()),
  );
}

function hasStuff(ep: RampEpisode): boolean {
  if (ep.hideStuffChapter) return false;
  if (ep.stuffRich != null) return true;
  const nBullets = ep.stuffBullets?.length ?? 0;
  const nCells = ep.screenGrid?.cells?.length ?? 0;
  return nBullets > 0 || nCells > 0;
}

function hasLearnings(ep: RampEpisode): boolean {
  if (ep.hideLearnings) return false;
  if (ep.embedLearningsInStuffChapter) return false;
  if (ep.learningsRich != null) return true;
  return (ep.learnings?.length ?? 0) > 0;
}

function chapterSegmentsForEpisode(ep: RampEpisode): readonly string[] {
  if (ep.hideStuffChapter && hasLearnings(ep)) {
    return ["OVERVIEW", "OUTCOME", "THINGS I LEARNED", "CREDITS"];
  }
  return CHAPTER_SEGMENTS;
}

function hasEmbeddedStuffLearnings(ep: RampEpisode): boolean {
  if (ep.hideLearnings) return false;
  if (!ep.embedLearningsInStuffChapter) return false;
  if (ep.learningsRich != null) return true;
  return (ep.learnings?.length ?? 0) > 0;
}

function LearningTitleBody({ item }: { item: RampEpisodeLearning }) {
  return (
    <dl className={styles.chLessonDl}>
      <dt className={styles.chLessonTitle}>{item.title}</dt>
      <dd className={styles.chLessonDescription}>{item.description}</dd>
    </dl>
  );
}

function EpisodeLearningsSection({ episode }: { episode: RampEpisode }) {
  const learningsHeading =
    episode.learningsChapterHeading ?? "THINGS I LEARNED";
  return (
    <>
      <div className={styles.chHeader}>
        <span className={styles.chName}>{learningsHeading}</span>
        <div className={styles.chLine} />
      </div>
      {episode.learningsRich ? (
        <div className={styles.stuffRich}>{episode.learningsRich}</div>
      ) : (
        <ul
          className={`${styles.chBullets} ${styles.chBulletsLessons}`}
        >
          {(episode.learnings ?? []).map((b, i) => (
            <li key={i}>
              {typeof b === "string" ? (
                b
              ) : (
                <LearningTitleBody item={b} />
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

function hasCredits(ep: RampEpisode): boolean {
  return (ep.credits?.length ?? 0) > 0;
}

function HeroPlaceholder({ mobile }: { mobile?: boolean }) {
  return (
    <div className={styles.mockPh}>
      {mobile ? (
        <svg
          viewBox="0 0 26 26"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          aria-hidden
        >
          <rect x="8" y="1" width="10" height="24" rx="2.5" />
          <path d="M11 4h4" />
          <circle cx="13" cy="22" r="1" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 26 26"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          aria-hidden
        >
          <rect x="1" y="4" width="24" height="18" rx="2" />
          <path d="M1 9h24" />
          <circle cx="4" cy="6.5" r=".8" />
          <circle cx="6.5" cy="6.5" r=".8" />
          <circle cx="9" cy="6.5" r=".8" />
        </svg>
      )}
      <p>DROP HERO MOCKUP HERE</p>
    </div>
  );
}

function HeroTitleCluster({
  title,
  yearLabel,
}: {
  title: string;
  yearLabel: string;
}) {
  const badge = yearLabel.trim();
  return (
    <div className={styles.titleCluster}>
      <h1 className={styles.title}>{title}</h1>
      {badge ? (
        <span className={styles.titleTimingBadge}>{badge}</span>
      ) : null}
    </div>
  );
}

function heroFrameClass(aspect: "web" | "mobile") {
  return aspect === "web" ? styles.heroMockWeb : styles.heroMockMobile;
}

function HeroImage({
  aspect,
  src,
  alt,
  media = "image",
  shouldLoad = true,
  videoVariants,
}: {
  aspect: "web" | "mobile";
  src?: string;
  alt?: string;
  media?: "image" | "video";
  /** When false, media is not requested (e.g. inactive episode in multi-player). */
  shouldLoad?: boolean;
  videoVariants?: { label: string; src: string }[];
}) {
  const [failed, setFailed] = useState(false);
  const [variantIndex, setVariantIndex] = useState(0);
  const hasVideoVariants = Boolean(
    videoVariants && videoVariants.length >= 2,
  );
  const effectiveMedia: "image" | "video" = hasVideoVariants
    ? "video"
    : media;

  useEffect(() => {
    setVariantIndex(0);
  }, [videoVariants]);

  const variantSrc =
    hasVideoVariants && videoVariants
      ? videoVariants[variantIndex]?.src?.trim()
      : undefined;
  const resolvedSrc = hasVideoVariants
    ? shouldLoad && variantSrc
      ? variantSrc
      : undefined
    : shouldLoad && src?.trim()
      ? src
      : undefined;

  useEffect(() => {
    if (shouldLoad) setFailed(false);
  }, [shouldLoad, src, variantIndex, hasVideoVariants]);

  const showMedia = Boolean(resolvedSrc) && !failed;
  const isVideo = effectiveMedia === "video";
  const frameClass =
    showMedia && isVideo ? styles.heroMockVideoHug : heroFrameClass(aspect);
  const rootClass =
    hasVideoVariants && showMedia && isVideo
      ? `${styles.heroMock} ${styles.heroMockVideoHug} ${styles.heroMockVideoVariants}`
      : `${styles.heroMock} ${frameClass}`;

  return (
    <div className={rootClass}>
      {showMedia ? (
        isVideo && hasVideoVariants && videoVariants ? (
          <div className={styles.heroVideoVariantInner}>
            {/* eslint-disable-next-line jsx-a11y/media-has-caption -- portfolio screen capture, no separate captions file */}
            <video
              key={resolvedSrc}
              src={resolvedSrc}
              controls
              playsInline
              preload="metadata"
              aria-label={
                alt ??
                `${videoVariants[variantIndex]?.label ?? "Variant"} — case study hero video`
              }
              onError={() => setFailed(true)}
            />
            <div
              className={`${styles.mcBaBar} ${styles.heroVariantBar}`}
              role="toolbar"
              aria-label="Hero recording variant"
            >
              {videoVariants.map((v, i) => (
                <button
                  key={v.src}
                  type="button"
                  className={`${styles.mcBaToggleBtn} ${i === variantIndex ? styles.mcBaToggleBtnActive : ""}`}
                  aria-pressed={i === variantIndex}
                  onClick={() => setVariantIndex(i)}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>
        ) : isVideo ? (
          // eslint-disable-next-line jsx-a11y/media-has-caption -- portfolio screen capture, no separate captions file
          <video
            key={resolvedSrc}
            src={resolvedSrc}
            controls
            playsInline
            preload="metadata"
            aria-label={alt ?? "Case study hero video"}
            onError={() => setFailed(true)}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={resolvedSrc}
            src={resolvedSrc}
            alt={alt ?? ""}
            onError={() => setFailed(true)}
          />
        )
      ) : (
        <HeroPlaceholder mobile={aspect === "mobile"} />
      )}
    </div>
  );
}

function ScreenCell({
  cell,
  shouldLoad = true,
}: {
  cell: RampScreenCell;
  /** When false, cell media is not requested (inactive episode in multi-player). */
  shouldLoad?: boolean;
}) {
  const [failedBefore, setFailedBefore] = useState(false);
  const [failedAfter, setFailedAfter] = useState(false);
  const [showAfter, setShowAfter] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const expandRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lightboxTitleId = useId();
  const isVideo = cell.media === "video";
  const srcBefore = cell.src?.trim() ?? "";
  const srcAfter = cell.srcAfter?.trim() ?? "";
  const effectiveSrcBefore = shouldLoad ? srcBefore : "";
  const effectiveSrcAfter = shouldLoad ? srcAfter : "";
  const hasBeforeAfterPair =
    !isVideo && Boolean(srcBefore) && Boolean(srcAfter);

  useEffect(() => {
    if (!shouldLoad) return;
    setFailedBefore(false);
    setFailedAfter(false);
  }, [shouldLoad, srcBefore, srcAfter]);

  useEffect(() => {
    if (!hasBeforeAfterPair) return;
    if (showAfter && failedAfter && !failedBefore) setShowAfter(false);
    if (!showAfter && failedBefore && !failedAfter) setShowAfter(true);
  }, [
    hasBeforeAfterPair,
    showAfter,
    failedBefore,
    failedAfter,
  ]);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    requestAnimationFrame(() => expandRef.current?.focus());
  }, []);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightboxOpen, closeLightbox]);

  useEffect(() => {
    if (lightboxOpen) closeRef.current?.focus();
  }, [lightboxOpen]);

  const aspectClass =
    cell.aspect === "intrinsic"
      ? styles.mcHug
      : cell.aspect === "r1-1"
        ? styles["r1-1"]
        : cell.aspect === "r16-9"
        ? styles["r16-9"]
        : cell.aspect === "r1024-817"
          ? styles["r1024-817"]
          : cell.aspect === "r4-3"
            ? styles["r4-3"]
            : cell.aspect === "r9-16"
              ? styles["r9-16"]
              : cell.aspect === "wide"
                ? styles.wide
                : styles.wide3;

  const labelBase = cell.placeholderLabel ?? "Screen";
  const showBeforeImg =
    hasBeforeAfterPair && Boolean(effectiveSrcBefore) && !failedBefore;
  const showAfterImg =
    hasBeforeAfterPair && Boolean(effectiveSrcAfter) && !failedAfter;
  const anyPairImgOk = showBeforeImg || showAfterImg;
  const showSingleImg =
    !hasBeforeAfterPair && Boolean(effectiveSrcBefore) && !failedBefore;
  const fallbackLabel = cell.placeholderLabel ?? "Screen";
  const pairPlaceholder =
    hasBeforeAfterPair && !anyPairImgOk ? (
      <span className={styles.mcBaPlaceholder}>{labelBase}</span>
    ) : null;

  if (isVideo) {
    const showVideo = Boolean(effectiveSrcBefore) && !failedBefore;
    return (
      <div className={`${styles.mc} ${aspectClass}`}>
        {showVideo ? (
          // eslint-disable-next-line jsx-a11y/media-has-caption -- portfolio screen captures, no separate captions file
          <video
            key={effectiveSrcBefore}
            src={effectiveSrcBefore}
            controls
            playsInline
            preload="metadata"
            aria-label={cell.alt ?? cell.placeholderLabel ?? "Screen recording"}
            onError={() => setFailedBefore(true)}
          />
        ) : (
          fallbackLabel
        )}
      </div>
    );
  }

  return (
    <div
      className={`${styles.mc} ${aspectClass}`}
      {...(hasBeforeAfterPair
        ? {
            role: "group",
            "aria-label": `${labelBase}: before and after comparison`,
          }
        : {})}
    >
      {hasBeforeAfterPair ? (
        <>
          <div className={styles.mcBaStack}>
            {showBeforeImg ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={effectiveSrcBefore}
                alt={cell.alt ?? `${labelBase} — before`}
                className={showAfter ? styles.mcBaHidden : undefined}
                aria-hidden={showAfter}
                onError={() => setFailedBefore(true)}
              />
            ) : null}
            {showAfterImg ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={effectiveSrcAfter}
                alt={cell.altAfter ?? `${labelBase} — after`}
                className={!showAfter ? styles.mcBaHidden : undefined}
                aria-hidden={!showAfter}
                onError={() => setFailedAfter(true)}
              />
            ) : null}
          </div>
          {anyPairImgOk ? (
            <div
              className={styles.mcBaBar}
              role="toolbar"
              aria-label={`${labelBase}: switch before or after, or expand`}
            >
              <button
                type="button"
                className={`${styles.mcBaToggleBtn} ${!showAfter ? styles.mcBaToggleBtnActive : ""}`}
                aria-pressed={!showAfter}
                onClick={() => setShowAfter(false)}
              >
                Before
              </button>
              <button
                type="button"
                className={`${styles.mcBaToggleBtn} ${showAfter ? styles.mcBaToggleBtnActive : ""}`}
                aria-pressed={showAfter}
                onClick={() => setShowAfter(true)}
              >
                After
              </button>
              <span className={styles.mcBaBarDivider} aria-hidden />
              <button
                type="button"
                ref={expandRef}
                className={styles.mcBaExpand}
                aria-label={`Expand ${labelBase} comparison`}
                aria-haspopup="dialog"
                aria-expanded={lightboxOpen}
                onClick={() => setLightboxOpen(true)}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"
                  />
                </svg>
              </button>
            </div>
          ) : null}
          {lightboxOpen
            ? createPortal(
                <div className={styles.mcLightboxRoot}>
                  <button
                    type="button"
                    className={styles.mcLightboxBackdrop}
                    aria-label="Close expanded comparison"
                    onClick={closeLightbox}
                  />
                  <div
                    className={styles.mcLightboxDialog}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby={lightboxTitleId}
                  >
                    <div className={styles.mcLightboxHeader}>
                      <p id={lightboxTitleId} className={styles.mcLightboxTitle}>
                        {labelBase}
                      </p>
                      <button
                        type="button"
                        ref={closeRef}
                        className={styles.mcLightboxClose}
                        aria-label="Close"
                        onClick={closeLightbox}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          aria-hidden
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className={styles.mcLightboxStage}>
                      <div className={styles.mcLightboxStack}>
                        {showBeforeImg ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={effectiveSrcBefore}
                            alt={cell.alt ?? `${labelBase} — before`}
                            className={showAfter ? styles.mcBaHidden : undefined}
                            aria-hidden={showAfter}
                          />
                        ) : null}
                        {showAfterImg ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={effectiveSrcAfter}
                            alt={
                              cell.altAfter ?? `${labelBase} — after`
                            }
                            className={!showAfter ? styles.mcBaHidden : undefined}
                            aria-hidden={!showAfter}
                          />
                        ) : null}
                      </div>
                    </div>
                    <div className={styles.mcLightboxFooter}>
                      <div
                        className={styles.mcBaBar}
                        role="group"
                        aria-label="Compare versions"
                      >
                        <button
                          type="button"
                          className={`${styles.mcBaToggleBtn} ${!showAfter ? styles.mcBaToggleBtnActive : ""}`}
                          aria-pressed={!showAfter}
                          onClick={() => setShowAfter(false)}
                        >
                          Before
                        </button>
                        <button
                          type="button"
                          className={`${styles.mcBaToggleBtn} ${showAfter ? styles.mcBaToggleBtnActive : ""}`}
                          aria-pressed={showAfter}
                          onClick={() => setShowAfter(true)}
                        >
                          After
                        </button>
                      </div>
                    </div>
                  </div>
                </div>,
                document.body,
              )
            : null}
          {pairPlaceholder}
        </>
      ) : showSingleImg ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={effectiveSrcBefore}
          alt={cell.alt ?? ""}
          onError={() => setFailedBefore(true)}
        />
      ) : (
        fallbackLabel
      )}
    </div>
  );
}

function RampCinemaCaseStudySingle({
  episodes,
  layoutMode = "fullscreen",
}: {
  episodes: RampEpisode[];
  layoutMode?: "fullscreen" | "embedded";
}) {
  const episode = episodes[0];

  useEffect(() => {
    if (layoutMode === "embedded") return;
    document.body.classList.add("ramp-cinema");
    return () => document.body.classList.remove("ramp-cinema");
  }, [layoutMode]);

  const layout = episode.screenGrid?.layout ?? "mg2";
  const epGrid =
    layout === "mg2"
      ? styles.mg2
      : layout === "mg3"
        ? styles.mg3
        : layout === "stack"
          ? styles.mgStack
          : styles.mg4;

  return (
    <div
      className={`${styles.root} ${styles.rootNoPlayer} ${
        layoutMode === "embedded" ? styles.rootEmbedded : ""
      }`}
    >
      <div className={styles.scroller} id="scroller">
        <div className={styles.contentWrap}>
          <div className={`${styles.panel} ${styles.panelActive}`}>
            <span className={styles.chAnchor} id="p0-ch0" />
            <div className={styles.hero}>
              <div className={styles.titleRow}>
                    <HeroTitleCluster
                      title={episode.title}
                      yearLabel={
                        episode.titleTimingBadge ?? episode.yearLabel
                      }
                    />
                {episode.journalUrl ? (
                  <a
                    className={styles.journalBtn}
                    href={episode.journalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className={styles.journalBtnArr} aria-hidden>
                      ↗
                    </span>
                    {episode.journalLabel ?? "Production Notes"}
                  </a>
                ) : null}
                {SHOW_ONE_PAGER_DOWNLOAD && episode.onePagerHref ? (
                  <a
                    className={styles.dlBtn}
                    href={episode.onePagerHref}
                    download
                    title="Download one-pager"
                  >
                    <svg
                      viewBox="0 0 14 14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      aria-hidden
                    >
                      <path d="M7 2v7M4 6.5l3 3 3-3" />
                      <path d="M2 11h10" />
                    </svg>
                  </a>
                ) : null}
              </div>
              <div className={styles.metaRow}>
                {episode.metaRowRich ? (
                  <div className={styles.metaRowRich}>{episode.metaRowRich}</div>
                ) : (
                  <>
                    <span className={styles.metaItem}>{episode.employment}</span>
                    <span className={styles.metaItem}>{episode.metaYear}</span>
                    <span className={styles.metaItem}>
                      <span className={styles.metaTools}>{episode.tools}</span>
                    </span>
                    <span className={styles.metaItem}>
                      <a
                        className={styles.metaLink}
                        href={episode.externalHref}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {episode.externalLabel}{" "}
                        <svg
                          viewBox="0 0 10 10"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          aria-hidden
                        >
                          <path d="M2 8L8 2M3 2h5v5" />
                        </svg>
                      </a>
                    </span>
                  </>
                )}
              </div>
              {episode.logline ? (
                <p className={styles.logline}>{episode.logline}</p>
              ) : null}
              {!episode.hideHeroFrame ? (
                <HeroImage
                  aspect={episode.hero.aspect}
                  src={episode.hero.src}
                  alt={episode.hero.alt}
                  media={episode.hero.media}
                  videoVariants={episode.hero.videoVariants}
                />
              ) : null}
            </div>

            {hasOutcome(episode) ? (
              <>
                <span className={styles.chAnchor} id="p0-ch1" />
                <div className={styles.chapter}>
                  <div className={styles.chHeader}>
                    <span className={styles.chName}>OUTCOME</span>
                    <div className={styles.chLine} />
                  </div>
                  <div
                    className={`${styles.chBody} ${styles.chBodyPrimary}`}
                  >
                    {episode.outcomeRich ?? (
                      <>
                        {episode.outcome!.problem.trim() ? (
                          <p>{episode.outcome!.problem}</p>
                        ) : null}
                        <p>{episode.outcome!.outcome}</p>
                      </>
                    )}
                  </div>
                  {episode.metrics && episode.metrics.length > 0 ? (
                    <div
                      className={`${styles.metrics}${episode.metrics.length >= 4 ? ` ${styles.metrics2x2}` : ""}`}
                    >
                      {episode.metrics.map((m) => (
                        <div key={m.label} className={styles.metric}>
                          <div className={styles.metricValRow}>
                            <div className={styles.metricVal}>{m.value}</div>
                            {m.valuePill ? (
                              <span className={styles.metricValPill}>
                                {m.valuePill}
                              </span>
                            ) : null}
                          </div>
                          <div className={styles.metricLbl}>{m.label}</div>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              </>
            ) : null}

            {hasStuff(episode) ? (
              <>
                <span className={styles.chAnchor} id="p0-ch2" />
                <div
                  className={`${styles.chapter}${episode.stuffChapterTightTop ? ` ${styles.chapterStuffTightTop}` : ""}`}
                >
                  {episode.hideStuffChapterHeader ? null : (
                    <div className={styles.chHeader}>
                      <span className={styles.chName}>STUFF I WORKED ON</span>
                      <div className={styles.chLine} />
                    </div>
                  )}
                  {episode.stuffRich ? (
                    <div className={styles.stuffRich}>{episode.stuffRich}</div>
                  ) : (
                    <>
                      <ul
                        className={`${styles.chBullets} ${styles.chBulletsStuff}`}
                      >
                        {(episode.stuffBullets ?? []).map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                      {(episode.screenGrid?.cells?.length ?? 0) > 0 ? (
                        <div className={`${styles.mg} ${epGrid}`}>
                          {(episode.screenGrid?.cells ?? []).map((cell, i) => (
                            <ScreenCell key={i} cell={cell} />
                          ))}
                        </div>
                      ) : null}
                    </>
                  )}
                  {hasEmbeddedStuffLearnings(episode) ? (
                    <div className={styles.stuffEmbeddedLearnings}>
                      <EpisodeLearningsSection episode={episode} />
                    </div>
                  ) : null}
                </div>
              </>
            ) : null}

            {hasLearnings(episode) ? (
              <>
                {!hasStuff(episode) ? (
                  <span className={styles.chAnchor} id="p0-ch2" />
                ) : null}
                <div className={styles.chapter}>
                  <EpisodeLearningsSection episode={episode} />
                </div>
              </>
            ) : !hasStuff(episode) ? (
              <span className={styles.chAnchor} id="p0-ch2" />
            ) : null}

            {hasCredits(episode) ? (
              <>
                <span className={styles.chAnchor} id="p0-ch3" />
              <div className={styles.credits}>
                <div className={styles.chHeader}>
                  <span className={styles.chName}>CREDITS</span>
                  <div className={styles.chLine} />
                </div>
                {episode.creditsIntro ? (
                  <div
                    className={`${styles.chBody} ${styles.creditsIntro}`}
                  >
                    {episode.creditsIntro}
                  </div>
                ) : null}
                <div className={styles.creditsGrid}>
                  {(episode.credits ?? []).map((c, i) => (
                    <div
                      key={`${c.role}-${c.name}-${i}`}
                      className={styles.creditLine}
                    >
                      {c.role?.trim() ? (
                        <span className={styles.creditRole}>{c.role}</span>
                      ) : null}
                      {c.linkedInUrl ? (
                        <a
                          className={styles.creditVal}
                          href={c.linkedInUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${c.role ? `${c.role}: ` : ""}${c.name} (opens in new tab)`}
                        >
                          <span>{c.name}</span>
                          <svg
                            viewBox="0 0 10 10"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            aria-hidden
                          >
                            <path d="M2 8L8 2M3 2h5v5" />
                          </svg>
                        </a>
                      ) : (
                        <span className={styles.creditVal}>{c.name}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function RampCinemaCaseStudyMulti({
  episodes,
  keyboardMode = "cinemaLegacy",
  showPlayer = true,
  layoutMode = "fullscreen",
}: {
  episodes: RampEpisode[];
  keyboardMode?: "cinemaLegacy" | "tvShell";
  showPlayer?: boolean;
  layoutMode?: "fullscreen" | "embedded";
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const showKbdHintUi =
    searchParams.get("kbd") === "1" ||
    process.env.NEXT_PUBLIC_SHOW_RAMP_KBD_HINT === "1";
  const scrollerRef = useRef<HTMLDivElement>(null);
  const chBarRef = useRef<HTMLDivElement>(null);
  const pillMenuRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const kbdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const maxEp = Math.max(0, episodes.length - 1);
  const epQuery = searchParams.get("ep");
  const parsedEp = epQuery !== null ? parseInt(epQuery, 10) : 0;
  const rawEp = Number.isFinite(parsedEp) ? parsedEp : 0;
  const activeEp = clampEp(rawEp, maxEp);

  const [curCh, setCurCh] = useState(0);
  const [fillPct, setFillPct] = useState<[number, number, number, number]>([
    0, 0, 0, 0,
  ]);
  const [playing, setPlaying] = useState(false);
  const [playIconPause, setPlayIconPause] = useState(false);
  const [kbdShow, setKbdShow] = useState(false);
  const [pillMenuOpen, setPillMenuOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  /** While the hero case title is visible in the scroller, hide duplicate title in the pill. */
  const [heroTitleInView, setHeroTitleInView] = useState(true);
  const episodeTitleRail = useContext(EpisodeTitleRailContext);
  const setRailHeroTitleInViewRef = useRef(
    episodeTitleRail?.setHeroTitleInView,
  );
  setRailHeroTitleInViewRef.current = episodeTitleRail?.setHeroTitleInView;

  const setEpInUrl = useCallback(
    (idx: number) => {
      const next = clampEp(idx, maxEp);
      const q = new URLSearchParams(searchParams.toString());
      q.set("ep", String(next));
      router.replace(`${pathname}?${q.toString()}`, { scroll: false });
    },
    [maxEp, pathname, router, searchParams],
  );

  useEffect(() => {
    if (layoutMode === "embedded") return;
    document.body.classList.add("ramp-cinema");
    return () => document.body.classList.remove("ramp-cinema");
  }, [layoutMode]);

  useEffect(() => {
    if (rawEp !== activeEp) {
      const q = new URLSearchParams(searchParams.toString());
      q.set("ep", String(activeEp));
      router.replace(`${pathname}?${q.toString()}`, { scroll: false });
    }
  }, [activeEp, pathname, rawEp, router, searchParams]);

  const stopPlay = useCallback(() => {
    setPlaying(false);
    setPlayIconPause(false);
    if (tickerRef.current) {
      clearInterval(tickerRef.current);
      tickerRef.current = null;
    }
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTop = 0;
    setCurCh(0);
    setFillPct([0, 0, 0, 0]);
    stopPlay();
  }, [activeEp, stopPlay]);

  useEffect(() => {
    const root = scrollerRef.current;
    const targetId = `ramp-hero-title-${activeEp}`;
    const getTarget = () =>
      document.getElementById(targetId) as HTMLElement | null;

    if (!root) return;

    const sync = () => {
      const target = getTarget();
      if (!target) {
        setHeroTitleInView(true);
        setRailHeroTitleInViewRef.current?.(true);
        return;
      }
      const inView = heroTitleOverlapsScroller(root, target);
      setHeroTitleInView(inView);
      setRailHeroTitleInViewRef.current?.(inView);
    };

    root.addEventListener("scroll", sync, { passive: true });
    const ro = new ResizeObserver(sync);
    ro.observe(root);
    const t0 = getTarget();
    if (t0) ro.observe(t0);

    sync();
    const raf = requestAnimationFrame(sync);

    return () => {
      root.removeEventListener("scroll", sync);
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [activeEp]);

  useEffect(() => {
    return () => stopPlay();
  }, [stopPlay]);

  useEffect(() => {
    const onFs = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  useEffect(() => {
    if (!pillMenuOpen) return;
    const onDocDown = (e: MouseEvent) => {
      if (pillMenuRef.current?.contains(e.target as Node)) return;
      setPillMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPillMenuOpen(false);
    };
    document.addEventListener("mousedown", onDocDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [pillMenuOpen]);

  const onScroll = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const p = activeEp;
    const anchors = [0, 1, 2, 3].map((ch) =>
      document.getElementById(`p${p}-ch${ch}`),
    );

    const scrollTop = scroller.scrollTop;
    const scrollH = scroller.scrollHeight - scroller.clientHeight;
    const scRect = scroller.getBoundingClientRect();

    const bounds = anchors.map((a) =>
      a ? a.getBoundingClientRect().top + scrollTop - scRect.top : 0,
    );

    const b0 = bounds[0];
    const b1 = bounds[1];
    const b2 = bounds[2];
    const b3 = bounds[3];
    const end = scrollH;

    let nextCh = 0;
    const pct: [number, number, number, number] = [0, 0, 0, 0];

    if (scrollTop < b1) {
      nextCh = 0;
      pct[0] = Math.min(
        (scrollTop - b0) / Math.max(b1 - b0, 1),
        1,
      );
    } else if (scrollTop < b2) {
      nextCh = 1;
      pct[0] = 1;
      pct[1] = Math.min(
        (scrollTop - b1) / Math.max(b2 - b1, 1),
        1,
      );
    } else if (scrollTop < b3) {
      nextCh = 2;
      pct[0] = 1;
      pct[1] = 1;
      pct[2] = Math.min(
        (scrollTop - b2) / Math.max(b3 - b2, 1),
        1,
      );
    } else {
      nextCh = 3;
      pct[0] = 1;
      pct[1] = 1;
      pct[2] = 1;
      pct[3] = Math.min(
        (scrollTop - b3) / Math.max(end - b3, 1),
        1,
      );
    }

    // If the block after the credits anchor is shorter than the viewport,
    // max scrollTop never reaches b3, so we'd stay on segment 2 while CREDITS
    // is on screen. When pinned to the end, force the credits segment.
    const creditsAnchor = anchors[3];
    if (
      creditsAnchor &&
      end > 0 &&
      scrollTop >= end - 3 &&
      scrollTop < b3
    ) {
      nextCh = 3;
      pct[0] = 1;
      pct[1] = 1;
      pct[2] = 1;
      pct[3] = 1;
    }

    setFillPct(pct);
    setCurCh((prev) => (prev !== nextCh ? nextCh : prev));
  }, [activeEp]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    onScroll();
    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", onScroll);
  }, [onScroll, activeEp]);

  const jumpChapter = useCallback(
    (ch: number) => {
      const anchor = document.getElementById(`p${activeEp}-ch${ch}`);
      const scroller = scrollerRef.current;
      if (!anchor || !scroller) return;
      const top =
        anchor.getBoundingClientRect().top +
        scroller.scrollTop -
        scroller.getBoundingClientRect().top +
        2;
      scroller.scrollTo({ top, behavior: "smooth" });
    },
    [activeEp],
  );

  const prevChapter = useCallback(() => {
    if (curCh > 0) jumpChapter(curCh - 1);
  }, [curCh, jumpChapter]);

  const nextChapter = useCallback(() => {
    if (curCh < 3) jumpChapter(curCh + 1);
    else if (activeEp < maxEp) setEpInUrl(activeEp + 1);
  }, [activeEp, curCh, jumpChapter, maxEp, setEpInUrl]);

  const prevEp = useCallback(() => {
    if (activeEp > 0) setEpInUrl(activeEp - 1);
  }, [activeEp, setEpInUrl]);

  const nextEp = useCallback(() => {
    if (activeEp < maxEp) setEpInUrl(activeEp + 1);
  }, [activeEp, maxEp, setEpInUrl]);

  const restartEp = useCallback(() => {
    scrollerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    stopPlay();
  }, [stopPlay]);

  const togglePlay = useCallback(() => {
    if (playing) {
      stopPlay();
      return;
    }
    setPlaying(true);
    setPlayIconPause(true);
    tickerRef.current = setInterval(() => {
      const scroller = scrollerRef.current;
      if (!scroller) return;
      scroller.scrollTop += 1.4;
      if (scroller.scrollTop >= scroller.scrollHeight - scroller.clientHeight) {
        stopPlay();
      }
    }, 22);
  }, [playing, stopPlay]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      void document.documentElement.requestFullscreen().catch(() => {});
    } else {
      void document.exitFullscreen();
    }
  }, []);

  const flashHint = useCallback(() => {
    if (!showKbdHintUi) return;
    setKbdShow(true);
    if (kbdTimerRef.current) clearTimeout(kbdTimerRef.current);
    kbdTimerRef.current = setTimeout(() => setKbdShow(false), 2000);
  }, [showKbdHintUi]);

  useEffect(() => {
    if (!showKbdHintUi) return;
    const t = setTimeout(() => {
      setKbdShow(true);
      kbdTimerRef.current = setTimeout(() => setKbdShow(false), 3000);
    }, 800);
    return () => {
      clearTimeout(t);
      if (kbdTimerRef.current) clearTimeout(kbdTimerRef.current);
    };
  }, [showKbdHintUi]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }
      if (keyboardMode === "tvShell") {
        switch (e.code) {
          case "Space":
            e.preventDefault();
            togglePlay();
            break;
          case "Digit1":
            jumpChapter(0);
            flashHint();
            break;
          case "Digit2":
            jumpChapter(1);
            flashHint();
            break;
          case "Digit3":
            jumpChapter(2);
            flashHint();
            break;
          case "Digit4":
            jumpChapter(3);
            flashHint();
            break;
          case "ArrowLeft":
            e.preventDefault();
            prevEp();
            flashHint();
            break;
          case "ArrowRight":
            e.preventDefault();
            nextEp();
            flashHint();
            break;
          case "BracketLeft":
            e.preventDefault();
            prevChapter();
            flashHint();
            break;
          case "BracketRight":
            e.preventDefault();
            nextChapter();
            flashHint();
            break;
          case "KeyR":
            e.preventDefault();
            restartEp();
            flashHint();
            break;
          case "KeyF":
            e.preventDefault();
            toggleFullscreen();
            flashHint();
            break;
          default:
            break;
        }
        return;
      }
      switch (e.code) {
        case "Space":
          e.preventDefault();
          togglePlay();
          break;
        case "ArrowUp":
          e.preventDefault();
          prevEp();
          flashHint();
          break;
        case "ArrowDown":
          e.preventDefault();
          nextEp();
          flashHint();
          break;
        case "Digit1":
          jumpChapter(0);
          flashHint();
          break;
        case "Digit2":
          jumpChapter(1);
          flashHint();
          break;
        case "Digit3":
          jumpChapter(2);
          flashHint();
          break;
        case "Digit4":
          jumpChapter(3);
          flashHint();
          break;
        case "ArrowLeft":
          e.preventDefault();
          prevChapter();
          flashHint();
          break;
        case "ArrowRight":
          e.preventDefault();
          nextChapter();
          flashHint();
          break;
        case "KeyR":
          e.preventDefault();
          restartEp();
          flashHint();
          break;
        case "KeyF":
          e.preventDefault();
          toggleFullscreen();
          flashHint();
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", onKey, { passive: false });
    return () => window.removeEventListener("keydown", onKey);
  }, [
    flashHint,
    jumpChapter,
    keyboardMode,
    nextChapter,
    nextEp,
    prevChapter,
    prevEp,
    restartEp,
    toggleFullscreen,
    togglePlay,
  ]);

  const ep = episodes[activeEp];
  const chSegs = chapterSegmentsForEpisode(ep);

  return (
    <div
      className={`${styles.root} ${
        layoutMode === "embedded" ? styles.rootEmbedded : ""
      } ${showPlayer ? "" : styles.rootNoPlayer}`}
    >
      {showKbdHintUi ? (
        <div
          className={`${styles.kbdHint} ${kbdShow ? styles.kbdHintShow : ""}`}
          id="kbdHint"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          <div className={styles.kbdGroup}>
            <kbd className={styles.kbdChip}>Space</kbd>
            <span className={styles.kbdAction}>play</span>
          </div>
          <span className={styles.kbdSep} aria-hidden={true} />
          <div className={styles.kbdGroup}>
            <span
              className={styles.kbdChipCluster}
              aria-label="Keys 1 through 4"
            >
              <kbd className={styles.kbdChip}>1</kbd>
              <kbd className={styles.kbdChip}>2</kbd>
              <kbd className={styles.kbdChip}>3</kbd>
              <kbd className={styles.kbdChip}>4</kbd>
            </span>
            <span className={styles.kbdAction}>sections</span>
          </div>
          {maxEp > 0 ? (
            <>
              <span className={styles.kbdSep} aria-hidden={true} />
              <div className={styles.kbdGroup}>
                <span className={styles.kbdChipCluster}>
                  {keyboardMode === "tvShell" ? (
                    <>
                      <kbd className={styles.kbdChip}>←</kbd>
                      <kbd className={styles.kbdChip}>→</kbd>
                    </>
                  ) : (
                    <>
                      <kbd className={styles.kbdChip}>↑</kbd>
                      <kbd className={styles.kbdChip}>↓</kbd>
                    </>
                  )}
                </span>
                <span className={styles.kbdAction}>episodes</span>
              </div>
              {keyboardMode === "tvShell" ? (
                <>
                  <span className={styles.kbdSep} aria-hidden={true} />
                  <div className={styles.kbdGroup}>
                    <span className={styles.kbdChipCluster}>
                      <kbd className={styles.kbdChip}>[</kbd>
                      <kbd className={styles.kbdChip}>]</kbd>
                    </span>
                    <span className={styles.kbdAction}>sections</span>
                  </div>
                </>
              ) : null}
            </>
          ) : null}
          <span className={styles.kbdSep} aria-hidden={true} />
          <div className={styles.kbdGroup}>
            <kbd className={styles.kbdChip}>R</kbd>
            <span className={styles.kbdAction}>restart</span>
          </div>
          <span className={styles.kbdSep} aria-hidden={true} />
          <div className={styles.kbdGroup}>
            <kbd className={styles.kbdChip}>F</kbd>
            <span className={styles.kbdAction}>fullscreen</span>
          </div>
        </div>
      ) : null}

      <div className={styles.scroller} ref={scrollerRef} id="scroller">
        <div className={styles.contentWrap}>
          {episodes.map((episode, p) => {
            const layout = episode.screenGrid?.layout ?? "mg2";
            const epGrid =
              layout === "mg2"
                ? styles.mg2
                : layout === "mg3"
                  ? styles.mg3
                  : layout === "stack"
                    ? styles.mgStack
                    : styles.mg4;
            const creditsList = episode.credits ?? [];
            return (
              <div
                key={episode.title}
                className={`${styles.panel} ${p === activeEp ? styles.panelActive : ""}`}
                id={`panel-${p}`}
                aria-hidden={p !== activeEp}
              >
                <span className={styles.chAnchor} id={`p${p}-ch0`} />
                <div className={styles.hero}>
                  <div className={styles.titleRow}>
                    <div
                      id={`ramp-hero-title-${p}`}
                      className={styles.heroTitleObserve}
                    >
                      <HeroTitleCluster
                        title={episode.title}
                        yearLabel={
                          episode.titleTimingBadge ?? episode.yearLabel
                        }
                      />
                    </div>
                    {episode.journalUrl ? (
                      <a
                        className={styles.journalBtn}
                        href={episode.journalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className={styles.journalBtnArr} aria-hidden>
                          ↗
                        </span>
                        {episode.journalLabel ?? "Production Notes"}
                      </a>
                    ) : null}
                    {SHOW_ONE_PAGER_DOWNLOAD && episode.onePagerHref ? (
                      <a
                        className={styles.dlBtn}
                        href={episode.onePagerHref}
                        download
                        title="Download one-pager"
                      >
                        <svg
                          viewBox="0 0 14 14"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          aria-hidden
                        >
                          <path d="M7 2v7M4 6.5l3 3 3-3" />
                          <path d="M2 11h10" />
                        </svg>
                      </a>
                    ) : null}
                  </div>
                  <div className={styles.metaRow}>
                    {episode.metaRowRich ? (
                      <div className={styles.metaRowRich}>
                        {episode.metaRowRich}
                      </div>
                    ) : (
                      <>
                        <span className={styles.metaItem}>
                          {episode.employment}
                        </span>
                        <span className={styles.metaItem}>
                          {episode.metaYear}
                        </span>
                        <span className={styles.metaItem}>
                          <span className={styles.metaTools}>
                            {episode.tools}
                          </span>
                        </span>
                        <span className={styles.metaItem}>
                          <a
                            className={styles.metaLink}
                            href={episode.externalHref}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {episode.externalLabel}{" "}
                            <svg
                              viewBox="0 0 10 10"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              aria-hidden
                            >
                              <path d="M2 8L8 2M3 2h5v5" />
                            </svg>
                          </a>
                        </span>
                      </>
                    )}
                  </div>
                  {episode.logline ? (
                    <p className={styles.logline}>{episode.logline}</p>
                  ) : null}
                  {!episode.hideHeroFrame ? (
                    <HeroImage
                      aspect={episode.hero.aspect}
                      src={episode.hero.src}
                      alt={episode.hero.alt}
                      media={episode.hero.media}
                      videoVariants={episode.hero.videoVariants}
                      shouldLoad={p === activeEp}
                    />
                  ) : null}
                </div>

                <span className={styles.chAnchor} id={`p${p}-ch1`} />
                <div className={styles.chapter}>
                  <div className={styles.chHeader}>
                    <span className={styles.chName}>OUTCOME</span>
                    <div className={styles.chLine} />
                  </div>
                  <div
                    className={`${styles.chBody} ${styles.chBodyPrimary}`}
                  >
                    {episode.outcomeRich ?? (
                      <>
                        {episode.outcome!.problem.trim() ? (
                          <p>{episode.outcome!.problem}</p>
                        ) : null}
                        <p>{episode.outcome!.outcome}</p>
                      </>
                    )}
                  </div>
                  {episode.metrics && episode.metrics.length > 0 ? (
                    <div
                      className={`${styles.metrics}${episode.metrics.length >= 4 ? ` ${styles.metrics2x2}` : ""}`}
                    >
                      {episode.metrics.map((m) => (
                        <div key={m.label} className={styles.metric}>
                          <div className={styles.metricValRow}>
                            <div className={styles.metricVal}>{m.value}</div>
                            {m.valuePill ? (
                              <span className={styles.metricValPill}>
                                {m.valuePill}
                              </span>
                            ) : null}
                          </div>
                          <div className={styles.metricLbl}>{m.label}</div>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>

                {hasStuff(episode) ? (
                  <>
                    <span className={styles.chAnchor} id={`p${p}-ch2`} />
                    <div
                      className={`${styles.chapter}${episode.stuffChapterTightTop ? ` ${styles.chapterStuffTightTop}` : ""}`}
                    >
                      <div className={styles.chHeader}>
                        <span className={styles.chName}>STUFF I WORKED ON</span>
                        <div className={styles.chLine} />
                      </div>
                      {episode.stuffRich ? (
                        <div className={styles.stuffRich}>{episode.stuffRich}</div>
                      ) : (
                        <>
                          <ul
                            className={`${styles.chBullets} ${styles.chBulletsStuff}`}
                          >
                            {(episode.stuffBullets ?? []).map((b, i) => (
                              <li key={i}>{b}</li>
                            ))}
                          </ul>
                          {(episode.screenGrid?.cells?.length ?? 0) > 0 ? (
                            <div className={`${styles.mg} ${epGrid}`}>
                              {(episode.screenGrid?.cells ?? []).map((cell, i) => (
                                <ScreenCell
                                  key={`p${p}-c${i}`}
                                  cell={cell}
                                  shouldLoad={p === activeEp}
                                />
                              ))}
                            </div>
                          ) : null}
                        </>
                      )}
                      {hasEmbeddedStuffLearnings(episode) ? (
                        <div className={styles.stuffEmbeddedLearnings}>
                          <EpisodeLearningsSection episode={episode} />
                        </div>
                      ) : null}
                    </div>
                  </>
                ) : null}

                {hasLearnings(episode) ? (
                  <>
                    {!hasStuff(episode) ? (
                      <span className={styles.chAnchor} id={`p${p}-ch2`} />
                    ) : null}
                    <div className={styles.chapter}>
                      <EpisodeLearningsSection episode={episode} />
                    </div>
                  </>
                ) : !hasStuff(episode) ? (
                  <span className={styles.chAnchor} id={`p${p}-ch2`} />
                ) : null}

                <span className={styles.chAnchor} id={`p${p}-ch3`} />
                <div className={styles.credits}>
                  <div className={styles.chHeader}>
                    <span className={styles.chName}>CREDITS</span>
                    <div className={styles.chLine} />
                  </div>
                  {episode.creditsIntro ? (
                    <div
                      className={`${styles.chBody} ${styles.creditsIntro}`}
                    >
                      {episode.creditsIntro}
                    </div>
                  ) : null}
                  <div className={styles.creditsGrid}>
                    {creditsList.map((c, i) => (
                      <div
                        key={`${p}-${c.role}-${c.name}-${i}`}
                        className={styles.creditLine}
                      >
                        {c.role?.trim() ? (
                          <span className={styles.creditRole}>{c.role}</span>
                        ) : null}
                        {c.linkedInUrl ? (
                          <a
                            className={styles.creditVal}
                            href={c.linkedInUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${c.role ? `${c.role}: ` : ""}${c.name} (opens in new tab)`}
                          >
                            <span>{c.name}</span>
                            <svg
                              viewBox="0 0 10 10"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              aria-hidden
                            >
                              <path d="M2 8L8 2M3 2h5v5" />
                            </svg>
                          </a>
                        ) : (
                          <span className={styles.creditVal}>{c.name}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showPlayer ? (
        <div className={styles.playerPill} id="playerPill">
        <div ref={chBarRef} className={styles.chBar} id="chBar">
          {chSegs.map((label, i) => (
            <button
              key={`${label}-${i}`}
              type="button"
              className={`${styles.chSeg} ${i === curCh ? styles.chSegActive : ""}`}
              onClick={() => jumpChapter(i)}
            >
              <span className={styles.chSegName}>{label}</span>
              <div
                className={styles.segFill}
                style={{ width: `${fillPct[i] * 100}%` }}
              />
            </button>
          ))}
        </div>

        <div className={styles.ctrlRow}>
          <div className={styles.transport}>
            <button
              type="button"
              className={styles.tBtn}
              title="Previous chapter"
              onClick={prevChapter}
            >
              <svg viewBox="0 0 13 13" fill="currentColor" aria-hidden>
                <path d="M2 2h1.5v9H2V2zm1.5 4.5L9.5 2v9L3.5 6.5z" />
              </svg>
            </button>
            <button
              type="button"
              className={`${styles.tBtn} ${styles.playBtn}`}
              title="Play (auto-scroll)"
              onClick={togglePlay}
            >
              {playIconPause ? (
                <svg viewBox="0 0 13 13" fill="currentColor" aria-hidden>
                  <rect x="2.5" y="2" width="3" height="9" />
                  <rect x="7.5" y="2" width="3" height="9" />
                </svg>
              ) : (
                <svg viewBox="0 0 13 13" fill="currentColor" aria-hidden>
                  <path d="M3 1.5l8 5-8 5v-10z" />
                </svg>
              )}
            </button>
            <button
              type="button"
              className={styles.tBtn}
              title="Next chapter"
              onClick={nextChapter}
            >
              <svg viewBox="0 0 13 13" fill="currentColor" aria-hidden>
                <path d="M11 2h-1.5v9H11V2zM9.5 6.5L3.5 2v9l6-4.5z" />
              </svg>
            </button>
          </div>

          <div className={styles.pillMoreWrap} ref={pillMenuRef}>
            <button
              type="button"
              className={`${styles.tBtn} ${styles.pillMoreBtn}`}
              title="More (restart, fullscreen)"
              aria-label="More options"
              aria-expanded={pillMenuOpen}
              aria-haspopup="true"
              aria-controls="pill-more-menu"
              onClick={() => setPillMenuOpen((o) => !o)}
            >
              <span className={styles.pillMoreDots} aria-hidden>
                ···
              </span>
            </button>
            {pillMenuOpen ? (
              <div
                className={styles.pillMenu}
                id="pill-more-menu"
                role="menu"
                aria-label="Player options"
              >
                <button
                  type="button"
                  className={styles.pillMenuItem}
                  role="menuitem"
                  onClick={() => {
                    restartEp();
                    setPillMenuOpen(false);
                  }}
                >
                  Restart episode
                </button>
                <button
                  type="button"
                  className={styles.pillMenuItem}
                  role="menuitem"
                  onClick={() => {
                    toggleFullscreen();
                    setPillMenuOpen(false);
                  }}
                >
                  {isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                </button>
              </div>
            ) : null}
          </div>

          <div
            className={`${styles.nowInfoCluster} ${heroTitleInView ? styles.nowInfoClusterHeroTitleInView : ""}`}
          >
            <div className={styles.vSep} aria-hidden />
            <div className={styles.nowInfo}>
              <div className={styles.nowTitle}>{ep.title}</div>
              <div className={styles.nowSub}>{ep.pillSub}</div>
            </div>
          </div>

          {maxEp > 0 ? (
            <div className={styles.epSwitcherCluster}>
              <div className={styles.vSep} aria-hidden />
              <div className={styles.epSwitcher}>
                <button
                  type="button"
                  className={styles.epArrowBtn}
                  title="Previous episode (↑)"
                  aria-label="Previous episode"
                  disabled={activeEp === 0}
                  onClick={prevEp}
                >
                  <svg
                    viewBox="0 0 9 9"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden
                  >
                    <path d="M6 1.5L3 4.5l3 3" />
                  </svg>
                </button>
                <div className={styles.epNum}>
                  Case {activeEp + 1}/{episodes.length}
                </div>
                <button
                  type="button"
                  className={styles.epArrowBtn}
                  title="Next episode (↓)"
                  aria-label="Next episode"
                  disabled={activeEp >= maxEp}
                  onClick={nextEp}
                >
                  <svg
                    viewBox="0 0 9 9"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden
                  >
                    <path d="M3 1.5l3 3-3 3" />
                  </svg>
                </button>
              </div>
            </div>
          ) : null}
        </div>
        </div>
      ) : null}
    </div>
  );
}

export function RampCinemaCaseStudy({
  episodes,
  showPlayer = true,
  keyboardMode = "cinemaLegacy",
  layoutMode = "fullscreen",
}: RampCinemaCaseStudyProps) {
  const visibleEpisodes = episodes.filter((e) => !e.hidden);
  if (visibleEpisodes.length === 1 && showPlayer === false) {
    return (
      <RampCinemaCaseStudySingle
        episodes={visibleEpisodes}
        layoutMode={layoutMode}
      />
    );
  }
  return (
    <RampCinemaCaseStudyMulti
      episodes={visibleEpisodes}
      keyboardMode={keyboardMode}
      showPlayer={showPlayer}
      layoutMode={layoutMode}
    />
  );
}
