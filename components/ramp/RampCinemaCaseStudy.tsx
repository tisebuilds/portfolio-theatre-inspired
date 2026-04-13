"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import type { RampEpisode, RampScreenCell } from "@/data/case-studies/ramp-types";
import styles from "./ramp-cinema.module.css";

type RampCinemaCaseStudyProps = {
  episodes: RampEpisode[];
  /** When false, hides the bottom player and episode controls (single-episode internship pages). */
  showPlayer?: boolean;
};

const CHAPTER_SEGMENTS = [
  { num: "01", name: "OUTCOME" },
  { num: "02", name: "STUFF I WORKED ON" },
  { num: "03", name: "THINGS I LEARNED" },
] as const;

function clampEp(n: number, max: number) {
  return Math.min(Math.max(n, 0), max);
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
  if (ep.stuffRich != null) return true;
  const nBullets = ep.stuffBullets?.length ?? 0;
  const nCells = ep.screenGrid?.cells?.length ?? 0;
  return nBullets > 0 || nCells > 0;
}

function hasLearnings(ep: RampEpisode): boolean {
  if (ep.learningsRich != null) return true;
  return (ep.learnings?.length ?? 0) > 0;
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

function HeroImage({
  aspect,
  src,
  alt,
}: {
  aspect: "web" | "mobile";
  src?: string;
  alt?: string;
}) {
  const [failed, setFailed] = useState(false);
  const showImg = Boolean(src) && !failed;

  return (
    <div
      className={`${styles.heroMock} ${aspect === "web" ? styles.heroMockWeb : styles.heroMockMobile}`}
    >
      {showImg ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt ?? ""} onError={() => setFailed(true)} />
      ) : (
        <HeroPlaceholder mobile={aspect === "mobile"} />
      )}
    </div>
  );
}

function ScreenCell({ cell }: { cell: RampScreenCell }) {
  const [failed, setFailed] = useState(false);
  const showImg = Boolean(cell.src) && !failed;
  const aspectClass =
    cell.aspect === "r16-9"
      ? styles["r16-9"]
      : cell.aspect === "r4-3"
        ? styles["r4-3"]
        : cell.aspect === "r9-16"
          ? styles["r9-16"]
          : cell.aspect === "wide"
            ? styles.wide
            : styles.wide3;

  return (
    <div className={`${styles.mc} ${aspectClass}`}>
      {showImg ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={cell.src}
          alt={cell.alt ?? ""}
          onError={() => setFailed(true)}
        />
      ) : (
        cell.placeholderLabel ?? "Screen"
      )}
    </div>
  );
}

function RampCinemaCaseStudySingle({ episodes }: { episodes: RampEpisode[] }) {
  const episode = episodes[0];
  let chNum = 1;
  const nextNum = () => String(chNum++).padStart(2, "0");

  useEffect(() => {
    document.body.classList.add("ramp-cinema");
    return () => document.body.classList.remove("ramp-cinema");
  }, []);

  const layout = episode.screenGrid?.layout ?? "mg2";
  const epGrid =
    layout === "mg2"
      ? styles.mg2
      : layout === "mg3"
        ? styles.mg3
        : styles.mg4;

  return (
    <div className={`${styles.root} ${styles.rootNoPlayer}`}>
      <div className={styles.scroller} id="scroller">
        <div className={styles.contentWrap}>
          <div className={`${styles.panel} ${styles.panelActive}`}>
            <div className={styles.hero}>
              <div className={styles.titleRow}>
                <HeroTitleCluster
                  title={episode.title}
                  yearLabel={episode.yearLabel}
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
                {episode.onePagerHref ? (
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
                />
              ) : null}
            </div>

            {hasOutcome(episode) ? (
              <>
                <span className={styles.chAnchor} id="p0-ch0" />
                <div className={styles.chapter}>
                  <div className={styles.chHeader}>
                    <span className={styles.chNum}>{nextNum()}</span>
                    <span className={styles.chName}>OUTCOME</span>
                    <div className={styles.chLine} />
                  </div>
                  <div className={styles.chBody}>
                    {episode.outcomeRich ?? (
                      <>
                        <p>{episode.outcome!.problem}</p>
                        <p>{episode.outcome!.outcome}</p>
                      </>
                    )}
                  </div>
                  {episode.metrics && episode.metrics.length > 0 ? (
                    <div className={styles.metrics}>
                      {episode.metrics.map((m) => (
                        <div key={m.label} className={styles.metric}>
                          <div className={styles.metricVal}>{m.value}</div>
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
                <span className={styles.chAnchor} id="p0-ch1" />
                <div
                  className={`${styles.chapter}${episode.stuffChapterTightTop ? ` ${styles.chapterStuffTightTop}` : ""}`}
                >
                  {(() => {
                    const stuffNum = nextNum();
                    return episode.hideStuffChapterHeader ? null : (
                      <div className={styles.chHeader}>
                        <span className={styles.chNum}>{stuffNum}</span>
                        <span className={styles.chName}>STUFF I WORKED ON</span>
                        <div className={styles.chLine} />
                      </div>
                    );
                  })()}
                  {episode.stuffRich ? (
                    <div className={styles.stuffRich}>{episode.stuffRich}</div>
                  ) : (
                    <>
                      <ul className={styles.chBullets}>
                        {(episode.stuffBullets ?? []).map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                      <div className={`${styles.mg} ${epGrid}`}>
                        {(episode.screenGrid?.cells ?? []).map((cell, i) => (
                          <ScreenCell key={i} cell={cell} />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : null}

            {hasLearnings(episode) ? (
              <>
                <span className={styles.chAnchor} id="p0-ch2" />
                <div className={styles.chapter}>
                  <div className={styles.chHeader}>
                    <span className={styles.chNum}>{nextNum()}</span>
                    <span className={styles.chName}>THINGS I LEARNED</span>
                    <div className={styles.chLine} />
                  </div>
                  {episode.learningsRich ? (
                    <div className={styles.stuffRich}>{episode.learningsRich}</div>
                  ) : (
                    <ul
                      className={`${styles.chBullets} ${styles.chBulletsLessons}`}
                    >
                      {(episode.learnings ?? []).map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </>
            ) : null}

            {hasCredits(episode) ? (
              <div className={styles.credits}>
                <div className={styles.chHeader}>
                  <span className={styles.chNum}>{nextNum()}</span>
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
                    <div key={`${c.role}-${c.name}-${i}`}>
                      {c.role?.trim() ? (
                        <div className={styles.creditRole}>{c.role}</div>
                      ) : null}
                      <div className={styles.creditVal}>
                        {c.linkedInUrl ? (
                          <a
                            href={c.linkedInUrl}
                            target="_blank"
                            rel="noopener noreferrer"
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
                          <span>{c.name}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function RampCinemaCaseStudyMulti({ episodes }: { episodes: RampEpisode[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const chBarRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const kbdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const maxEp = Math.max(0, episodes.length - 1);
  const epQuery = searchParams.get("ep");
  const parsedEp = epQuery !== null ? parseInt(epQuery, 10) : 0;
  const rawEp = Number.isFinite(parsedEp) ? parsedEp : 0;
  const activeEp = clampEp(rawEp, maxEp);

  const [curCh, setCurCh] = useState(0);
  const [fillPct, setFillPct] = useState<[number, number, number]>([0, 0, 0]);
  const [playing, setPlaying] = useState(false);
  const [playIconPause, setPlayIconPause] = useState(false);
  const [tt, setTt] = useState<{ x: number; y: number; text: string } | null>(
    null,
  );
  const [kbdShow, setKbdShow] = useState(false);

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
    document.body.classList.add("ramp-cinema");
    return () => document.body.classList.remove("ramp-cinema");
  }, []);

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
    setFillPct([0, 0, 0]);
    stopPlay();
  }, [activeEp, stopPlay]);

  useEffect(() => {
    return () => stopPlay();
  }, [stopPlay]);

  const onScroll = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const p = activeEp;
    const anchors = [0, 1, 2].map((ch) =>
      document.getElementById(`p${p}-ch${ch}`),
    );

    const scrollTop = scroller.scrollTop;
    const scrollH = scroller.scrollHeight - scroller.clientHeight;
    const scRect = scroller.getBoundingClientRect();

    const bounds = anchors.map((a) =>
      a ? a.getBoundingClientRect().top + scrollTop - scRect.top : 0,
    );

    const ch1start = bounds[1];
    const ch2start = bounds[2];
    const end = scrollH;

    let nextCh = 0;
    let pct0 = 0;
    let pct1 = 0;
    let pct2 = 0;

    if (scrollTop < ch1start) {
      nextCh = 0;
      pct0 = ch1start > 0 ? Math.min(scrollTop / ch1start, 1) : 0;
    } else if (scrollTop < ch2start) {
      nextCh = 1;
      pct0 = 1;
      pct1 = Math.min(
        (scrollTop - ch1start) / Math.max(ch2start - ch1start, 1),
        1,
      );
    } else {
      nextCh = 2;
      pct0 = 1;
      pct1 = 1;
      pct2 = Math.min((scrollTop - ch2start) / Math.max(end - ch2start, 1), 1);
    }

    setFillPct([pct0, pct1, pct2]);
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
    if (curCh < 2) jumpChapter(curCh + 1);
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
    setKbdShow(true);
    if (kbdTimerRef.current) clearTimeout(kbdTimerRef.current);
    kbdTimerRef.current = setTimeout(() => setKbdShow(false), 2000);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      setKbdShow(true);
      kbdTimerRef.current = setTimeout(() => setKbdShow(false), 3000);
    }, 800);
    return () => {
      clearTimeout(t);
      if (kbdTimerRef.current) clearTimeout(kbdTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
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
        default:
          break;
      }
    };
    window.addEventListener("keydown", onKey, { passive: false });
    return () => window.removeEventListener("keydown", onKey);
  }, [
    flashHint,
    jumpChapter,
    nextChapter,
    nextEp,
    prevChapter,
    prevEp,
    togglePlay,
  ]);

  const ep = episodes[activeEp];

  const showSegTip = (e: React.MouseEvent, label: string) => {
    const barEl = chBarRef.current;
    if (!barEl) return;
    const rect = barEl.getBoundingClientRect();
    setTt({
      x: e.clientX - 30,
      y: rect.top - 32,
      text: label,
    });
  };

  return (
    <div className={styles.root}>
      <div
        className={`${styles.tt} ${tt ? styles.ttShow : ""}`}
        style={
          tt
            ? { left: tt.x, top: tt.y }
            : { left: -9999, top: -9999, opacity: 0 }
        }
      >
        {tt?.text}
      </div>

      <div
        className={`${styles.kbdHint} ${kbdShow ? styles.kbdHintShow : ""}`}
        id="kbdHint"
      >
        <span className={styles.kbd}>Space</span> play &nbsp;·&nbsp;
        <span className={styles.kbd}>1</span>
        <span className={styles.kbd}>2</span>
        <span className={styles.kbd}>3</span> chapters &nbsp;·&nbsp;
        <span className={styles.kbd}>↑</span>
        <span className={styles.kbd}>↓</span> episodes
      </div>

      <div className={styles.scroller} ref={scrollerRef} id="scroller">
        <div className={styles.contentWrap}>
          {episodes.map((episode, p) => {
            const layout = episode.screenGrid?.layout ?? "mg2";
            const epGrid =
              layout === "mg2"
                ? styles.mg2
                : layout === "mg3"
                  ? styles.mg3
                  : styles.mg4;
            const creditsList = episode.credits ?? [];
            return (
              <div
                key={episode.title}
                className={`${styles.panel} ${p === activeEp ? styles.panelActive : ""}`}
                id={`panel-${p}`}
                aria-hidden={p !== activeEp}
              >
                <div className={styles.hero}>
                  <div className={styles.titleRow}>
                    <HeroTitleCluster
                      title={episode.title}
                      yearLabel={episode.yearLabel}
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
                    {episode.onePagerHref ? (
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
                    />
                  ) : null}
                </div>

                <span className={styles.chAnchor} id={`p${p}-ch0`} />
                <div className={styles.chapter}>
                  <div className={styles.chHeader}>
                    <span className={styles.chNum}>01</span>
                    <span className={styles.chName}>OUTCOME</span>
                    <div className={styles.chLine} />
                  </div>
                  <div className={styles.chBody}>
                    {episode.outcomeRich ?? (
                      <>
                        <p>{episode.outcome!.problem}</p>
                        <p>{episode.outcome!.outcome}</p>
                      </>
                    )}
                  </div>
                  {episode.metrics && episode.metrics.length > 0 ? (
                    <div className={styles.metrics}>
                      {episode.metrics.map((m) => (
                        <div key={m.label} className={styles.metric}>
                          <div className={styles.metricVal}>{m.value}</div>
                          <div className={styles.metricLbl}>{m.label}</div>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>

                <span className={styles.chAnchor} id={`p${p}-ch1`} />
                <div
                  className={`${styles.chapter}${episode.stuffChapterTightTop ? ` ${styles.chapterStuffTightTop}` : ""}`}
                >
                  <div className={styles.chHeader}>
                    <span className={styles.chNum}>02</span>
                    <span className={styles.chName}>STUFF I WORKED ON</span>
                    <div className={styles.chLine} />
                  </div>
                  {episode.stuffRich ? (
                    <div className={styles.stuffRich}>{episode.stuffRich}</div>
                  ) : (
                    <>
                      <ul className={styles.chBullets}>
                        {(episode.stuffBullets ?? []).map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                      <div className={`${styles.mg} ${epGrid}`}>
                        {(episode.screenGrid?.cells ?? []).map((cell, i) => (
                          <ScreenCell key={i} cell={cell} />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                <span className={styles.chAnchor} id={`p${p}-ch2`} />
                <div className={styles.chapter}>
                  <div className={styles.chHeader}>
                    <span className={styles.chNum}>03</span>
                    <span className={styles.chName}>THINGS I LEARNED</span>
                    <div className={styles.chLine} />
                  </div>
                  {episode.learningsRich ? (
                    <div className={styles.stuffRich}>
                      {episode.learningsRich}
                    </div>
                  ) : (
                    <ul
                      className={`${styles.chBullets} ${styles.chBulletsLessons}`}
                    >
                      {(episode.learnings ?? []).map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className={styles.credits}>
                  <div className={styles.chHeader}>
                    <span className={styles.chNum}>04</span>
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
                      <div key={`${p}-${c.role}-${c.name}-${i}`}>
                        {c.role?.trim() ? (
                          <div className={styles.creditRole}>{c.role}</div>
                        ) : null}
                        <div className={styles.creditVal}>
                          {c.linkedInUrl ? (
                            <a
                              href={c.linkedInUrl}
                              target="_blank"
                              rel="noopener noreferrer"
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
                            <span>{c.name}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.playerPill} id="playerPill">
        <div ref={chBarRef} className={styles.chBar} id="chBar">
          {CHAPTER_SEGMENTS.map((seg, i) => (
            <button
              key={seg.num}
              type="button"
              className={`${styles.chSeg} ${i === curCh ? styles.chSegActive : ""}`}
              onClick={() => jumpChapter(i)}
              onMouseEnter={(e) =>
                showSegTip(e, `${seg.num} · ${seg.name}`)
              }
              onMouseLeave={() => setTt(null)}
            >
              <span className={styles.chSegNum}>{seg.num}</span>
              <span className={styles.chSegName}>{seg.name}</span>
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

          <div className={styles.utilBtns}>
            <button
              type="button"
              className={styles.tBtn}
              title="Restart"
              onClick={restartEp}
            >
              <svg
                viewBox="0 0 13 13"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden
              >
                <path d="M2 6.5A4.5 4.5 0 1 1 4 10.4" />
                <path d="M2 3.5v3h3" />
              </svg>
            </button>
            <button
              type="button"
              className={styles.tBtn}
              title="Fullscreen"
              onClick={toggleFullscreen}
            >
              <svg
                viewBox="0 0 13 13"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden
              >
                <path d="M1 1h4M1 1v4M12 1h-4M12 1v4M1 12h4M1 12v-4M12 12h-4M12 12v-4" />
              </svg>
            </button>
          </div>

          <div className={styles.vSep} aria-hidden />

          <div className={styles.nowInfo}>
            <div className={styles.nowTitle}>{ep.title}</div>
            <div className={styles.nowSub}>{ep.pillSub}</div>
          </div>

          <div className={styles.vSep} aria-hidden />

          <div className={styles.epSwitcher}>
            <div className={styles.epThumb}>
              <span className={styles.epThumbPh}>RAMP</span>
            </div>
            <div className={styles.epInfo}>
              {ep.status === "now" ? (
                <div className={styles.epLive}>
                  <div className={styles.epLiveDot} aria-hidden />
                  NOW PLAYING
                </div>
              ) : (
                <div className={styles.epPast}>{ep.yearLabel}</div>
              )}
              <div className={styles.epNum}>
                EP {String(activeEp + 1).padStart(2, "0")} /{" "}
                {String(episodes.length).padStart(2, "0")}
              </div>
            </div>
            <div className={styles.epNav}>
              <button
                type="button"
                className={styles.epNavBtn}
                title="Previous episode (↑)"
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
                  <path d="M1.5 6L4.5 3l3 3" />
                </svg>
              </button>
              <button
                type="button"
                className={styles.epNavBtn}
                title="Next episode (↓)"
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
                  <path d="M1.5 3L4.5 6l3-3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function RampCinemaCaseStudy({
  episodes,
  showPlayer = true,
}: RampCinemaCaseStudyProps) {
  if (episodes.length === 1 && showPlayer === false) {
    return <RampCinemaCaseStudySingle episodes={episodes} />;
  }
  return <RampCinemaCaseStudyMulti episodes={episodes} />;
}
