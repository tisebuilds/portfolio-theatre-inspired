"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import type {
  RampCredit,
  RampEpisode,
  RampEpisodeLearning,
  RampMetric,
  RampScreenCell,
  RampScreenGrid,
} from "@/data/case-studies/ramp-types";
import { ExternalLinkIcon } from "@/components/case-study-icons";
import styles from "./ramp-cinema.module.css";
import { EpisodeTitleRailContext } from "@/components/tv/EpisodeTitleRailContext";
import { tvLiveSearchParams } from "@/lib/tv-live-search-params";

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
  /**
   * TV shell `?ch=` digit (1–9). When set with `layoutMode="embedded"`, URL writes also set `ch`/`view=episode`
   * so episode clamp / in-player navigation cannot leave a stale channel in the query (see TvShell sync).
   */
  embeddedChannelNumber?: number;
};

const CHAPTER_SEGMENTS = [
  "OVERVIEW",
  "OUTCOME",
  "STUFF I WORKED ON",
  "THANK YOU",
] as const;

/** One-pager PDFs are not ready yet; flip to true when they ship. */
const SHOW_ONE_PAGER_DOWNLOAD = false;

function clampEp(n: number, max: number) {
  return Math.min(Math.max(n, 0), max);
}

/**
 * During a channel change the previous case study stays mounted for one frame
 * after `ep` already points at the next channel. It must not clamp that index
 * or write `ch` back (Treasury has fewer episodes than Spend, so Akuma's `ep=2`
 * was rewritten to Treasury's last case).
 */
function embeddedUrlMatchesChannel(
  q: URLSearchParams,
  layoutMode: "fullscreen" | "embedded",
  embeddedChannelNumber: number | undefined,
) {
  if (layoutMode !== "embedded" || embeddedChannelNumber == null) return true;
  const urlCh = Number.parseInt(q.get("ch") ?? "", 10);
  return urlCh === embeddedChannelNumber;
}

/** New episode should open at its title, including reused scrollers and parent shells. */
function resetCaseStudyScroll(scroller: HTMLElement | null) {
  if (!scroller) return;
  scroller.scrollTop = 0;
  let node = scroller.parentElement;
  while (node) {
    if (node.scrollTop > 0) node.scrollTop = 0;
    node = node.parentElement;
  }
  const root = document.scrollingElement;
  if (root && root.scrollTop > 0) root.scrollTop = 0;
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
    return ["OVERVIEW", "OUTCOME", "THINGS I LEARNED", "THANK YOU"];
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
    <>
      <p className={styles.lessonLead}>{item.title}</p>
      <p className={styles.lessonBody}>{item.description}</p>
    </>
  );
}

function EpisodeLearningsSection({ episode }: { episode: RampEpisode }) {
  const learningsHeading =
    episode.learningsChapterHeading ?? "THINGS I LEARNED";
  const items = episode.learnings ?? [];
  const layoutClass =
    items.length === 4 ? styles.lessonCardsQuad : styles.lessonCardsStack;
  return (
    <>
      <SectionHeader>{learningsHeading}</SectionHeader>
      {episode.learningsRich ? (
        <div className={styles.stuffRich}>{episode.learningsRich}</div>
      ) : (
        <div className={`${styles.lessonCards} ${layoutClass}`}>
          {items.map((b, i) => (
            <article key={i} className={styles.lessonCard}>
              {typeof b === "string" ? (
                <p className={styles.lessonBody}>{b}</p>
              ) : (
                <LearningTitleBody item={b} />
              )}
            </article>
          ))}
        </div>
      )}
    </>
  );
}

function SectionHeader({ children }: { children: ReactNode }) {
  return (
    <div className={styles.chHeader}>
      <div className={styles.chLine} />
      <span className={styles.chName}>{children}</span>
      <div className={styles.chLine} />
    </div>
  );
}

function splitMetricValue(raw: string): {
  prefix: string;
  digits: string;
  suffix: string;
} {
  let value = raw.trim();
  let prefix = "";
  if (value.startsWith("$")) {
    prefix = "$";
    value = value.slice(1);
  }
  const match = value.match(/(\s+days|[KM%×])$/);
  let suffix = "";
  if (match && match.index !== undefined) {
    suffix = match[1];
    value = value.slice(0, match.index);
  }
  return { prefix, digits: value, suffix };
}

function MetricValue({ value }: { value: string }) {
  const parts = splitMetricValue(value);
  return (
    <div className={styles.metricVal}>
      {parts.prefix ? (
        <span className={styles.metricPrefix}>{parts.prefix}</span>
      ) : null}
      {parts.digits}
      {parts.suffix ? (
        <span
          className={`${styles.metricSuffix}${
            parts.suffix.trim() === "days" ? ` ${styles.metricSuffixWord}` : ""
          }`}
        >
          {parts.suffix}
        </span>
      ) : null}
    </div>
  );
}

function MetricLabel({ label }: { label: string }) {
  return <div className={styles.metricLbl}>{label}</div>;
}

function MetricsRow({ metrics }: { metrics: RampMetric[] }) {
  return (
    <div className={styles.metrics}>
      {metrics.map((m) => (
        <div key={m.label} className={styles.metric}>
          <MetricValue value={m.value} />
          <MetricLabel label={m.label} />
          {m.valuePill ? (
            <span className={styles.metricValPill}>{m.valuePill}</span>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function groupCreditsByRole(credits: RampCredit[]) {
  const order: string[] = [];
  const grouped = new Map<string, RampCredit[]>();
  for (const credit of credits) {
    const role = credit.role?.trim() ?? "";
    const existing = grouped.get(role);
    if (existing) {
      existing.push(credit);
    } else {
      grouped.set(role, [credit]);
      order.push(role);
    }
  }
  return order.map((role) => ({
    role,
    people: grouped.get(role) ?? [],
  }));
}

function CreditName({ credit }: { credit: RampCredit }) {
  if (credit.linkedInUrl) {
    return (
      <a
        className={styles.creditVal}
        href={credit.linkedInUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${credit.role ? `${credit.role}: ` : ""}${credit.name} (opens in new tab)`}
      >
        <span>{credit.name}</span>
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
    );
  }
  return <span className={styles.creditVal}>{credit.name}</span>;
}

function CreditsRoll({ credits }: { credits: RampCredit[] }) {
  const groups = groupCreditsByRole(credits);
  return (
    <div className={styles.creditsRoll}>
      {groups.map((group) => (
        <div key={group.role || "credit-role"} className={styles.creditsRollPair}>
          <span className={styles.creditRole}>{group.role}</span>
          <div className={styles.creditNames}>
            {group.people.map((credit, index) => (
              <CreditName
                key={`${credit.name}-${index}`}
                credit={credit}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
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

function EpisodeHero({
  episode,
  titleObserveId,
  shouldLoad = true,
}: {
  episode: RampEpisode;
  titleObserveId?: string;
  shouldLoad?: boolean;
}) {
  const year = (episode.titleTimingBadge ?? episode.yearLabel).trim();
  const title = <h1 className={styles.title}>{episode.title}</h1>;
  return (
    <div className={styles.hero}>
      <div className={styles.heroCard}>
        {year ? <p className={styles.heroYear}>{year}</p> : null}
        {titleObserveId ? (
          <div id={titleObserveId} className={styles.heroTitleObserve}>
            {title}
          </div>
        ) : (
          title
        )}
        {episode.logline ? (
          <p className={styles.logline}>{episode.logline}</p>
        ) : null}
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
                  {episode.externalLabel}
                  <ExternalLinkIcon className={styles.metaLinkIcon} />
                </a>
              </span>
            </>
          )}
        </div>
        {episode.journalUrl ||
        (SHOW_ONE_PAGER_DOWNLOAD && episode.onePagerHref) ? (
          <div className={styles.heroActions}>
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
        ) : null}
      </div>
      {!episode.hideHeroFrame ? (
        <HeroImage
          aspect={episode.hero.aspect}
          src={episode.hero.src}
          alt={episode.hero.alt}
          media={episode.hero.media}
          videoVariants={episode.hero.videoVariants}
          enlarged={episode.hero.enlarged}
          shouldLoad={shouldLoad}
        />
      ) : null}
    </div>
  );
}

type HeroAspect = "web" | "mobile" | "cinema";

function heroFrameClass(aspect: HeroAspect) {
  if (aspect === "cinema") return styles.heroMockCinema;
  return aspect === "web" ? styles.heroMockWeb : styles.heroMockMobile;
}

function HeroImage({
  aspect,
  src,
  alt,
  media = "image",
  shouldLoad = true,
  videoVariants,
  enlarged = false,
}: {
  aspect: HeroAspect;
  src?: string;
  alt?: string;
  media?: "image" | "video";
  /** When false, media is not requested (e.g. inactive episode in multi-player). */
  shouldLoad?: boolean;
  videoVariants?: { label: string; src: string }[];
  /** Hero frame is 20% larger than the text column. */
  enlarged?: boolean;
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
  const useCinemaFrame = aspect === "cinema";
  const frameClass = useCinemaFrame
    ? styles.heroMockCinema
    : showMedia && isVideo
      ? styles.heroMockVideoHug
      : heroFrameClass(aspect);
  const rootClass = `${styles.heroMock} ${frameClass}${
    enlarged ? ` ${styles.heroMockEnlarged}` : ""
  }${
    hasVideoVariants && showMedia && isVideo
      ? ` ${styles.heroMockVideoVariants}`
      : ""
  }`;

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
  autoPlay = false,
}: {
  cell: RampScreenCell;
  /** When false, cell media is not requested (inactive episode in multi-player). */
  shouldLoad?: boolean;
  /** Play a video cell once it mounts (rail selection). Initial stage load stays paused. */
  autoPlay?: boolean;
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

  const labelBase =
    cell.step && cell.caption
      ? `${cell.step} ${cell.caption}`
      : (cell.placeholderLabel ?? "Screen");
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
            autoPlay={autoPlay}
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

type StageClip = {
  src: string;
  alt?: string;
  label?: string;
  /** Chip title. When set, replaces the duration. */
  name?: string;
};

function formatClock(seconds: number): string {
  const total = Math.max(0, Math.floor(seconds));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function VideoStage({
  cells,
  shouldLoad = true,
}: {
  cells: RampScreenCell[];
  shouldLoad?: boolean;
}) {
  const clips = useMemo<StageClip[]>(
    () =>
      cells
        .filter((cell) => cell.media === "video" && Boolean(cell.src?.trim()))
        .map((cell) => ({
          src: cell.src!.trim(),
          alt: cell.alt,
          label: cell.placeholderLabel,
          name: cell.caption?.trim() || undefined,
        })),
    [cells],
  );
  const [active, setActive] = useState(0);
  const [failed, setFailed] = useState(false);
  const [durations, setDurations] = useState<(number | null)[]>([]);
  const stageRef = useRef<HTMLVideoElement>(null);
  const chipRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const pendingPlay = useRef(false);
  const clipKey = clips.map((clip) => clip.src).join("|");
  const safeIndex =
    clips.length === 0 ? 0 : Math.min(active, clips.length - 1);
  const current = clips[safeIndex];
  const src = shouldLoad && current ? current.src : "";

  useEffect(() => {
    setActive(0);
    setFailed(false);
    pendingPlay.current = false;
  }, [clipKey]);

  useEffect(() => {
    if (!shouldLoad || clips.length === 0) return;
    let cancelled = false;
    const nodes = clips.map((clip) => {
      const video = document.createElement("video");
      video.preload = "metadata";
      video.src = clip.src;
      return video;
    });
    setDurations(clips.map(() => null));
    nodes.forEach((video, index) => {
      const onMeta = () => {
        if (cancelled || !Number.isFinite(video.duration)) return;
        setDurations((prev) => {
          const next = prev.slice();
          next[index] = video.duration;
          return next;
        });
      };
      video.addEventListener("loadedmetadata", onMeta);
    });
    return () => {
      cancelled = true;
      nodes.forEach((video) => {
        video.removeAttribute("src");
        video.load();
      });
    };
  }, [shouldLoad, clipKey, clips]);

  useEffect(() => {
    if (shouldLoad) return;
    stageRef.current?.pause();
  }, [shouldLoad]);

  useEffect(() => {
    const video = stageRef.current;
    if (!video || !src || !pendingPlay.current) return;
    pendingPlay.current = false;
    const play = () => {
      void video.play().catch(() => {});
    };
    if (video.readyState >= 2) play();
    else video.addEventListener("canplay", play, { once: true });
  }, [src]);

  const select = useCallback(
    (index: number, play: boolean) => {
      setFailed(false);
      if (index === safeIndex) {
        const video = stageRef.current;
        if (!video) return;
        if (video.paused) void video.play().catch(() => {});
        else video.pause();
        return;
      }
      pendingPlay.current = play;
      setActive(index);
    },
    [safeIndex],
  );

  const onRailKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (clips.length === 0) return;
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const dir = event.key === "ArrowRight" ? 1 : -1;
    const next = (safeIndex + dir + clips.length) % clips.length;
    select(next, true);
    chipRefs.current[next]?.focus();
  };

  return (
    <div className={styles.videoStage}>
      <div className={styles.videoStageFrame}>
        {src && !failed ? (
          // eslint-disable-next-line jsx-a11y/media-has-caption -- portfolio screen captures, no separate captions file
          <video
            ref={stageRef}
            key={src}
            src={src}
            controls
            playsInline
            preload="auto"
            aria-label={current?.alt ?? current?.label ?? "Screen recording"}
            onError={() => setFailed(true)}
          />
        ) : (
          <span className={styles.videoStageFallback}>
            {current?.label ?? "Screen"}
          </span>
        )}
      </div>
      {clips.length > 0 ? (
        <div
          className={styles.videoStageRail}
          role="tablist"
          aria-label="Recordings"
          onKeyDown={onRailKeyDown}
        >
          {clips.map((clip, index) => {
            const selected = index === safeIndex;
            const duration = durations[index];
            const time =
              duration != null ? formatClock(duration) : "–:––";
            const chipText = clip.name ?? time;
            return (
              <button
                key={clip.src}
                ref={(node) => {
                  chipRefs.current[index] = node;
                }}
                type="button"
                role="tab"
                aria-selected={selected}
                tabIndex={selected ? 0 : -1}
                aria-label={
                  clip.name ??
                  `${clip.alt ?? clip.label ?? `Recording ${index + 1}`}, ${time}`
                }
                className={`${styles.videoStageChip}${
                  selected ? ` ${styles.videoStageChipActive}` : ""
                }`}
                onClick={() => select(index, true)}
              >
                {chipText}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

function SideStage({
  cells,
  shouldLoad = true,
}: {
  cells: RampScreenCell[];
  shouldLoad?: boolean;
}) {
  const panelId = useId();
  const [active, setActive] = useState(0);
  const [playOnSelect, setPlayOnSelect] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const cellKey = cells
    .map((cell) => `${cell.src ?? ""}:${cell.srcAfter ?? ""}`)
    .join("|");
  const safeIndex =
    cells.length === 0 ? 0 : Math.min(active, cells.length - 1);
  const current = cells[safeIndex];

  useEffect(() => {
    setActive(0);
    setPlayOnSelect(false);
  }, [cellKey]);

  const select = useCallback(
    (index: number) => {
      if (index === safeIndex) {
        const video = frameRef.current?.querySelector("video");
        if (!video) return;
        if (video.paused) void video.play().catch(() => {});
        else video.pause();
        return;
      }
      setPlayOnSelect(true);
      setActive(index);
    },
    [safeIndex],
  );

  const onRailKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (cells.length === 0) return;
    const key = event.key;
    if (
      key !== "ArrowDown" &&
      key !== "ArrowUp" &&
      key !== "ArrowRight" &&
      key !== "ArrowLeft"
    ) {
      return;
    }
    event.preventDefault();
    const dir = key === "ArrowDown" || key === "ArrowRight" ? 1 : -1;
    const next = (safeIndex + dir + cells.length) % cells.length;
    select(next);
    chipRefs.current[next]?.focus();
  };

  if (!current) return null;

  const labeled = cells.some((cell) => Boolean(cell.caption?.trim()));

  return (
    <div
      className={`${styles.sideStage}${labeled ? ` ${styles.sideStageLabeled}` : ""}`}
    >
      <div
        ref={frameRef}
        className={styles.sideStageFrame}
        role="tabpanel"
        id={`${panelId}-panel`}
        aria-labelledby={`${panelId}-tab-${safeIndex}`}
      >
        <ScreenCell
          key={`${safeIndex}-${current.src ?? ""}-${current.srcAfter ?? ""}`}
          cell={current}
          shouldLoad={shouldLoad}
          autoPlay={playOnSelect && current.media === "video"}
        />
      </div>
      <div
        className={styles.sideStageRail}
        role="tablist"
        aria-orientation="vertical"
        aria-label="Screens"
        onKeyDown={onRailKeyDown}
      >
        {cells.map((cell, index) => {
          const selected = index === safeIndex;
          const num = String(index + 1).padStart(2, "0");
          const label = cell.caption?.trim();
          const name = cell.alt ?? cell.placeholderLabel ?? `Screen ${num}`;
          return (
            <button
              key={`${cell.src ?? "cell"}-${index}`}
              ref={(node) => {
                chipRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`${panelId}-tab-${index}`}
              aria-controls={`${panelId}-panel`}
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              aria-label={label ?? `${num}. ${name}`}
              className={`${styles.sideStageChip}${
                label ? ` ${styles.sideStageChipLabel}` : ""
              }${selected ? ` ${styles.sideStageChipActive}` : ""}`}
              onClick={() => select(index)}
            >
              {label ?? num}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function gridLayoutClass(layout: RampScreenGrid["layout"]) {
  if (layout === "mg3") return styles.mg3;
  if (layout === "stack") return styles.mgStack;
  if (layout === "mg4") return styles.mg4;
  return styles.mg2;
}

function groupCellsByPhase(cells: RampScreenCell[]) {
  const groups: {
    phase: string;
    cells: { cell: RampScreenCell; index: number }[];
  }[] = [];
  cells.forEach((cell, index) => {
    const phase = cell.phase ?? "";
    const last = groups[groups.length - 1];
    if (last && last.phase === phase) {
      last.cells.push({ cell, index });
    } else {
      groups.push({ phase, cells: [{ cell, index }] });
    }
  });
  return groups;
}

function phaseSpanClass(span: RampScreenCell["span"]) {
  if (span === 2) return styles.phaseSpan2;
  if (span === 6) return styles.phaseSpan6;
  if (span === 3) return styles.phaseSpan3;
  return "";
}

function PhasesScreenGrid({
  cells,
  shouldLoad,
  keyPrefix,
}: {
  cells: RampScreenCell[];
  shouldLoad: boolean;
  keyPrefix: string;
}) {
  const groups = groupCellsByPhase(cells);
  return (
    <div className={styles.phases}>
      {groups.map((group, gi) => (
        <div key={`${keyPrefix}phase-${gi}`} className={styles.phaseGroup}>
          <div className={styles.phaseGrid}>
            {group.cells.map(({ cell, index }) => (
              <div
                key={`${keyPrefix}c${index}`}
                className={`${styles.phaseItem} ${phaseSpanClass(cell.span)}`.trim()}
              >
                <ScreenCell cell={cell} shouldLoad={shouldLoad} />
                {cell.step || cell.caption ? (
                  <p className={styles.phaseTileLabel}>
                    {cell.step ? (
                      <span className={styles.phaseStep}>{cell.step}</span>
                    ) : null}
                    {cell.caption ? (
                      <span className={styles.phaseCaption}>{cell.caption}</span>
                    ) : null}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ScreenGridView({
  grid,
  shouldLoad = true,
  keyPrefix = "",
}: {
  grid: RampScreenGrid;
  shouldLoad?: boolean;
  keyPrefix?: string;
}) {
  if (grid.layout === "stage") {
    return <VideoStage cells={grid.cells} shouldLoad={shouldLoad} />;
  }
  if (grid.layout === "sideStage") {
    return <SideStage cells={grid.cells} shouldLoad={shouldLoad} />;
  }
  if (grid.layout === "phases") {
    return (
      <PhasesScreenGrid
        cells={grid.cells}
        shouldLoad={shouldLoad}
        keyPrefix={keyPrefix}
      />
    );
  }
  return (
    <div className={`${styles.mg} ${gridLayoutClass(grid.layout)}`}>
      {grid.cells.map((cell, i) => (
        <ScreenCell
          key={`${keyPrefix}${i}`}
          cell={cell}
          shouldLoad={shouldLoad}
        />
      ))}
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
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (layoutMode === "embedded") return;
    document.body.classList.add("ramp-cinema");
    return () => document.body.classList.remove("ramp-cinema");
  }, [layoutMode]);

  useEffect(() => {
    const reset = () => resetCaseStudyScroll(scrollerRef.current);
    reset();
    const raf = requestAnimationFrame(reset);
    return () => cancelAnimationFrame(raf);
  }, [episode.title]);

  return (
    <div
      className={`${styles.root} ${styles.rootNoPlayer} ${
        layoutMode === "embedded" ? styles.rootEmbedded : ""
      }`}
    >
      <div className={styles.scroller} ref={scrollerRef} id="scroller">
        <div className={styles.contentWrap}>
          <div className={`${styles.panel} ${styles.panelActive}`}>
            <span className={styles.chAnchor} id="p0-ch0" />
            <EpisodeHero episode={episode} />
            <div className={styles.textColumn}>
            {hasOutcome(episode) ? (
              <>
                <span className={styles.chAnchor} id="p0-ch1" />
                <div className={styles.chapter}>
                  <SectionHeader>OUTCOME</SectionHeader>
                  <div
                    className={`${styles.chBody} ${styles.chBodyPrimary} ${styles.chBodyOutcome}`}
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
                    <MetricsRow metrics={episode.metrics} />
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
                    <SectionHeader>STUFF I WORKED ON</SectionHeader>
                  )}
                  {episode.stuffRich ? (
                    <div className={styles.stuffRich}>{episode.stuffRich}</div>
                  ) : (
                    <>
                      {episode.screenGrid &&
                      episode.screenGrid.cells.length > 0 ? (
                        <ScreenGridView grid={episode.screenGrid} />
                      ) : null}
                      {(episode.stuffBullets ?? []).length > 0 ? (
                        <ul
                          className={`${styles.chBody} ${styles.chBodyPrimary} ${styles.chBullets} ${styles.chBulletsStuff}`}
                        >
                          {(episode.stuffBullets ?? []).map((b, i) => (
                            <li key={i}>{b}</li>
                          ))}
                        </ul>
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
                <SectionHeader>Thank you</SectionHeader>
                {episode.creditsIntro ? (
                  <div
                    className={`${styles.chBody} ${styles.creditsIntro}`}
                  >
                    {episode.creditsIntro}
                  </div>
                ) : null}
                <CreditsRoll credits={episode.credits ?? []} />
              </div>
              </>
            ) : null}
            </div>
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
  embeddedChannelNumber,
}: {
  episodes: RampEpisode[];
  keyboardMode?: "cinemaLegacy" | "tvShell";
  showPlayer?: boolean;
  layoutMode?: "fullscreen" | "embedded";
  embeddedChannelNumber?: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const liveQuery = tvLiveSearchParams(searchParams);
  const showKbdHintUi =
    liveQuery.get("kbd") === "1" ||
    process.env.NEXT_PUBLIC_SHOW_RAMP_KBD_HINT === "1";
  const scrollerRef = useRef<HTMLDivElement>(null);
  const chBarRef = useRef<HTMLDivElement>(null);
  const pillMenuRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const kbdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const maxEp = Math.max(0, episodes.length - 1);
  const epQuery = liveQuery.get("ep");
  const parsedEp = epQuery !== null ? parseInt(epQuery, 10) : 0;
  const rawEp = Number.isFinite(parsedEp) ? parsedEp : 0;
  const activeEp = clampEp(rawEp, maxEp);
  const activeEpisodeKey = `${episodes.map((episode) => episode.title).join("\0")}\0${activeEp}`;

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
      const q = tvLiveSearchParams(searchParams);
      if (!embeddedUrlMatchesChannel(q, layoutMode, embeddedChannelNumber)) {
        return;
      }
      q.set("ep", String(next));
      if (layoutMode === "embedded" && embeddedChannelNumber != null) {
        q.set("ch", String(embeddedChannelNumber));
        q.set("view", "episode");
      }
      const href =
        layoutMode === "embedded"
          ? `/?${q.toString()}`
          : `${pathname}?${q.toString()}`;
      router.replace(href, { scroll: false });
    },
    [embeddedChannelNumber, layoutMode, maxEp, pathname, router, searchParams],
  );

  useEffect(() => {
    if (layoutMode === "embedded") return;
    document.body.classList.add("ramp-cinema");
    return () => document.body.classList.remove("ramp-cinema");
  }, [layoutMode]);

  useEffect(() => {
    if (rawEp !== activeEp) {
      const q = tvLiveSearchParams(searchParams);
      if (!embeddedUrlMatchesChannel(q, layoutMode, embeddedChannelNumber)) {
        return;
      }
      q.set("ep", String(activeEp));
      if (layoutMode === "embedded" && embeddedChannelNumber != null) {
        q.set("ch", String(embeddedChannelNumber));
        q.set("view", "episode");
      }
      const href =
        layoutMode === "embedded"
          ? `/?${q.toString()}`
          : `${pathname}?${q.toString()}`;
      router.replace(href, { scroll: false });
    }
  }, [
    activeEp,
    embeddedChannelNumber,
    layoutMode,
    pathname,
    rawEp,
    router,
    searchParams,
  ]);

  const stopPlay = useCallback(() => {
    setPlaying(false);
    setPlayIconPause(false);
    if (tickerRef.current) {
      clearInterval(tickerRef.current);
      tickerRef.current = null;
    }
  }, []);

  useEffect(() => {
    const reset = () => resetCaseStudyScroll(scrollerRef.current);
    reset();
    const raf = requestAnimationFrame(reset);
    setCurCh(0);
    setFillPct([0, 0, 0, 0]);
    stopPlay();
    return () => cancelAnimationFrame(raf);
  }, [activeEpisodeKey, stopPlay]);

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
            const creditsList = episode.credits ?? [];
            return (
              <div
                key={episode.title}
                className={`${styles.panel} ${p === activeEp ? styles.panelActive : ""}`}
                id={`panel-${p}`}
                aria-hidden={p !== activeEp}
              >
                <span className={styles.chAnchor} id={`p${p}-ch0`} />
                <EpisodeHero
                  episode={episode}
                  titleObserveId={`ramp-hero-title-${p}`}
                  shouldLoad={p === activeEp}
                />
                <div className={styles.textColumn}>
                <span className={styles.chAnchor} id={`p${p}-ch1`} />
                <div className={styles.chapter}>
                  <SectionHeader>OUTCOME</SectionHeader>
                  <div
                    className={`${styles.chBody} ${styles.chBodyPrimary} ${styles.chBodyOutcome}`}
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
                    <MetricsRow metrics={episode.metrics} />
                  ) : null}
                </div>

                {hasStuff(episode) ? (
                  <>
                    <span className={styles.chAnchor} id={`p${p}-ch2`} />
                    <div
                      className={`${styles.chapter}${episode.stuffChapterTightTop ? ` ${styles.chapterStuffTightTop}` : ""}`}
                    >
                      <SectionHeader>STUFF I WORKED ON</SectionHeader>
                      {episode.stuffRich ? (
                        <div className={styles.stuffRich}>{episode.stuffRich}</div>
                      ) : (
                        <>
                          {episode.screenGrid &&
                          episode.screenGrid.cells.length > 0 ? (
                            <ScreenGridView
                              grid={episode.screenGrid}
                              shouldLoad={p === activeEp}
                              keyPrefix={`p${p}-c`}
                            />
                          ) : null}
                          {(episode.stuffBullets ?? []).length > 0 ? (
                            <ul
                              className={`${styles.chBody} ${styles.chBodyPrimary} ${styles.chBullets} ${styles.chBulletsStuff}`}
                            >
                              {(episode.stuffBullets ?? []).map((b, i) => (
                                <li key={i}>{b}</li>
                              ))}
                            </ul>
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
                  <SectionHeader>Thank you</SectionHeader>
                  {episode.creditsIntro ? (
                    <div
                      className={`${styles.chBody} ${styles.creditsIntro}`}
                    >
                      {episode.creditsIntro}
                    </div>
                  ) : null}
                  <CreditsRoll credits={creditsList} />
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
  embeddedChannelNumber,
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
      embeddedChannelNumber={embeddedChannelNumber}
    />
  );
}
