"use client";

import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { DesignDecisionsDrawer } from "@/components/DesignDecisionsDrawer";
import type { WorkExperience, ShippedCaseStudy } from "@/app/types";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const GOLD = "#c8a84b";
const SCREEN = "#f5f1e8";
const BG = "#0a0a0a";
const TEXT_BODY = "#1a1a1a";
const TEXT_SEC = "#3a3a3a";
const TEXT_TER = "#888";

const CREDIT_ROLE = "#b0a880";
const INFO_BG = "#333";

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

const AUTHOR_EMAIL = "tise@example.com";

const ROLE_MAP: Record<string, string> = {
  "ramp-treasury": "Product Designer",
  "ramp-spend": "Product Designer",
  figma: "Design Intern",
  meta: "Product Design Intern",
  disney: "Undergraduate UI/UX Design Intern, Streaming fleet",
  colorstack: "Contract Graphic Designer",
  appdev: "Product Designer",
};

const LOCATION_MAP: Record<string, string> = {
  "ramp-treasury": "New York, NY",
  "ramp-spend": "New York, NY",
  figma: "San Francisco, CA",
  meta: "Menlo Park, CA",
  disney: "Burbank, CA",
  colorstack: "Remote",
  appdev: "Ithaca, NY",
};

/* ------------------------------------------------------------------ */
/*  Download helper                                                    */
/* ------------------------------------------------------------------ */

function triggerDownload(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function buildDownloadContent(
  scene: number,
  exp: WorkExperience,
  caseStudy: ShippedCaseStudy | undefined,
  learningsIdx: number,
  creditsIdx: number,
): { filename: string; content: string } {
  const role = ROLE_MAP[exp.slug] ?? "";
  const location = LOCATION_MAP[exp.slug] ?? "";

  if (scene === 0) {
    return {
      filename: `${exp.slug}-overview.txt`,
      content: [
        exp.title,
        [role, location].filter(Boolean).join(" · "),
        exp.dateRange ?? "",
        "",
        exp.description ?? "",
      ].join("\n"),
    };
  }

  if (caseStudy) {
    const lines = [
      caseStudy.title,
      caseStudy.shippedQuarter ?? "",
      "",
      caseStudy.projectDescription ?? "",
    ];
    if (caseStudy.impact?.length) {
      lines.push("", "Impact:");
      caseStudy.impact.forEach((c) =>
        lines.push(`  ${c.title}: ${c.metric}`),
      );
    }
    return { filename: `${caseStudy.slug}.txt`, content: lines.join("\n") };
  }

  if (scene === learningsIdx) {
    return {
      filename: `${exp.slug}-learnings.txt`,
      content: [
        "Learnings",
        "",
        ...(exp.lessons ?? []).map((l, i) => `${ROMAN[i] ?? i + 1}. ${l}`),
      ].join("\n"),
    };
  }

  if (scene === creditsIdx) {
    return {
      filename: `${exp.slug}-credits.txt`,
      content: [
        "Credits",
        "",
        ...(exp.cast ?? []).map(
          (m) => `${m.name}${m.role ? ` — ${m.role}` : ""}`,
        ),
      ].join("\n"),
    };
  }

  return { filename: "info.txt", content: "" };
}

/* ------------------------------------------------------------------ */
/*  Prototype Scene  (image only — metadata lives in InfoBar)          */
/* ------------------------------------------------------------------ */

function PrototypeScene({
  caseStudy,
}: {
  caseStudy: ShippedCaseStudy | undefined;
}) {
  if (!caseStudy) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-sm" style={{ color: TEXT_TER }}>
          No details available
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-full p-8">
      <img
        src={caseStudy.prototypeUrl}
        alt={caseStudy.title}
        className="max-w-full max-h-full object-contain rounded-lg shadow-sm"
        style={{ border: "1px solid #dcd7cc" }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Overview Scene                                                     */
/* ------------------------------------------------------------------ */

function OverviewScene({ exp }: { exp: WorkExperience }) {
  const role = ROLE_MAP[exp.slug];
  const location = LOCATION_MAP[exp.slug];

  return (
    <div className="flex flex-col items-center text-center px-10 py-14 gap-5">
      <h2
        className="text-2xl sm:text-3xl font-serif leading-tight max-w-md"
        style={{ color: TEXT_BODY }}
      >
        {exp.title}
      </h2>

      {(role || location) && (
        <p
          className="text-[11px] uppercase tracking-[0.15em]"
          style={{ color: TEXT_TER }}
        >
          {[role, location].filter(Boolean).join(" · ")}
        </p>
      )}

      {exp.dateRange && (
        <span
          className="px-2.5 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-[0.15em]"
          style={{ color: TEXT_SEC, background: "#e8e3d8" }}
        >
          {exp.dateRange}
        </span>
      )}

      {exp.description && (
        <p
          className="text-[14px] leading-relaxed max-w-sm"
          style={{ color: TEXT_SEC }}
        >
          {exp.description}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Learnings Scene                                                    */
/* ------------------------------------------------------------------ */

function LearningsScene({ exp }: { exp: WorkExperience }) {
  const lessons = exp.lessons ?? [];

  if (lessons.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-sm" style={{ color: TEXT_TER }}>
          No learnings recorded
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center text-center px-10 py-14 gap-8">
      <h2
        className="text-lg font-serif tracking-wide"
        style={{ color: TEXT_BODY }}
      >
        Learnings
      </h2>

      <div className="flex flex-col gap-5 max-w-sm">
        {lessons.map((lesson, i) => (
          <div key={i} className="flex items-start gap-3 text-left">
            <span
              className="text-[11px] font-serif shrink-0 mt-[2px]"
              style={{ color: GOLD }}
            >
              {ROMAN[i] ?? i + 1}
            </span>
            <p
              className="text-[14px] leading-[1.85]"
              style={{ color: TEXT_SEC }}
            >
              {lesson}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Credits Scene                                                      */
/* ------------------------------------------------------------------ */

function CreditsScene({ exp }: { exp: WorkExperience }) {
  const cast = exp.cast ?? [];

  if (cast.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-sm" style={{ color: TEXT_TER }}>
          No credits listed
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center text-center px-10 py-14 gap-8">
      <h2
        className="text-lg font-serif tracking-wide"
        style={{ color: TEXT_BODY }}
      >
        Credits
      </h2>

      <div className="flex flex-col gap-3 max-w-md">
        {cast.map((member, i) => (
          <div
            key={i}
            className="flex flex-wrap justify-center items-baseline gap-x-2 gap-y-0.5 text-center"
          >
            {member.role ? (
              <>
                <span
                  className="text-[10px] uppercase tracking-[0.15em]"
                  style={{ color: CREDIT_ROLE }}
                >
                  {member.role}
                </span>
                <span style={{ color: TEXT_TER }} aria-hidden>
                  —
                </span>
              </>
            ) : null}
            <span
              className="text-[13px] font-serif"
              style={{ color: TEXT_BODY }}
            >
              {member.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Info Bar  (contextual metadata for the active scene)               */
/* ------------------------------------------------------------------ */

function InfoBar({
  scene,
  exp,
  caseStudy,
  learningsIdx,
  creditsIdx,
}: {
  scene: number;
  exp: WorkExperience;
  caseStudy: ShippedCaseStudy | undefined;
  learningsIdx: number;
  creditsIdx: number;
}) {
  const role = ROLE_MAP[exp.slug];
  const location = LOCATION_MAP[exp.slug];

  let content: React.ReactNode = null;

  if (scene === 0) {
    content = (
      <>
        <p className="text-[13px] text-neutral-200">
          <span className="font-semibold">{exp.dateRange}</span>
          <span className="opacity-40 mx-1.5">&middot;</span>
          <span>{exp.title}</span>
        </p>
        {(role || location) && (
          <p className="text-[12px] text-neutral-400">
            {[role, location].filter(Boolean).join(" · ")}
          </p>
        )}
        {exp.description && (
          <p className="text-[12px] text-neutral-400">{exp.description}</p>
        )}
      </>
    );
  } else if (scene > 0 && scene < learningsIdx) {
    if (caseStudy) {
      content = (
        <>
          <p className="text-[13px] text-neutral-200">
            {caseStudy.shippedQuarter && (
              <>
                <span className="font-semibold">
                  {caseStudy.shippedQuarter}
                </span>
                <span className="opacity-40 mx-1.5">&middot;</span>
              </>
            )}
            <span className="font-semibold">{caseStudy.title}</span>
          </p>
          {caseStudy.projectDescription && (
            <p className="text-[12px] text-neutral-400 leading-relaxed">
              {caseStudy.projectDescription}
            </p>
          )}
          {caseStudy.impact &&
            caseStudy.impact.length > 0 &&
            caseStudy.impact.map((card, i) => (
              <p key={i} className="text-[12px] text-neutral-400">
                {card.title}: {card.metric}
              </p>
            ))}
        </>
      );
    } else {
      content = (
        <p className="text-[13px] text-neutral-400">No details available</p>
      );
    }
  } else if (scene === learningsIdx) {
    const lessons = exp.lessons ?? [];
    content = (
      <>
        <p className="text-[13px] text-neutral-200 font-semibold">
          Learnings from {exp.title}
        </p>
        {lessons.map((lesson, i) => (
          <p key={i} className="text-[14px] leading-[1.85] text-neutral-400">
            {ROMAN[i] ?? i + 1}. {lesson}
          </p>
        ))}
      </>
    );
  } else if (scene === creditsIdx) {
    const cast = exp.cast ?? [];
    content = (
      <>
        <p className="text-[13px] text-neutral-200 font-semibold">Credits</p>
        <p className="text-[12px] text-neutral-400 leading-relaxed">
          {cast.map((m, i) => (
            <span key={i}>
              {i > 0 ? (
                <span className="text-neutral-600" aria-hidden>
                  {" "}
                  ·{" "}
                </span>
              ) : null}
              {m.role ? (
                <>
                  <span className="text-neutral-500">{m.role}</span>
                  <span className="text-neutral-600" aria-hidden>
                    {" "}
                    —{" "}
                  </span>
                </>
              ) : null}
              {m.name}
            </span>
          ))}
        </p>
      </>
    );
  }

  if (!content) return null;

  return (
    <div className="w-full max-w-5xl mx-auto px-6 pb-6">
      <div
        className="rounded-lg px-5 py-4 flex flex-col gap-1"
        style={{ background: INFO_BG }}
      >
        {content}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Scene Rail  (progress bar + transport + action buttons)            */
/* ------------------------------------------------------------------ */

function SceneRail({
  labels,
  active,
  playing,
  onChange,
  onBack,
  onForward,
  onTogglePlay,
  showDecisionLog,
  onDecisionLog,
  onDownload,
}: {
  labels: string[];
  active: number;
  playing: boolean;
  onChange: (i: number) => void;
  onBack: () => void;
  onForward: () => void;
  onTogglePlay: () => void;
  showDecisionLog: boolean;
  onDecisionLog: () => void;
  onDownload: () => void;
}) {
  const [hovered, setHovered] = useState<number | null>(null);

  const actionBtnClass =
    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium tracking-wide transition-colors hover:bg-neutral-700";

  return (
    <div className="w-full max-w-5xl mx-auto px-6 pt-5 pb-3">
      {/* Segmented bar */}
      <div className="flex items-end gap-[3px] w-full">
        {labels.map((label, i) => {
          const isActive = active === i;
          const isPast = i < active;
          const isHov = hovered === i;

          let bg = "#2a2a2a";
          if (isActive) bg = GOLD;
          else if (isPast) bg = "rgba(200, 168, 75, 0.35)";

          return (
            <button
              key={label}
              onClick={() => onChange(i)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="relative flex-1 group"
              aria-label={label}
            >
              {/* Tooltip */}
              <span
                className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2.5 py-1 rounded text-[11px] font-medium whitespace-nowrap pointer-events-none transition-opacity duration-150 z-10"
                style={{
                  background: "#222",
                  color: "#ccc",
                  opacity: isHov ? 1 : 0,
                }}
              >
                {label}
              </span>

              {/* Bar segment */}
              <span
                className="block w-full rounded-[2px] transition-all duration-150"
                style={{
                  height: isHov ? 8 : 4,
                  background: isHov
                    ? isActive
                      ? GOLD
                      : isPast
                        ? "rgba(200, 168, 75, 0.55)"
                        : "#444"
                    : bg,
                }}
              />
            </button>
          );
        })}
      </div>

      {/* Controls + actions row */}
      <div className="mt-2.5 flex items-center justify-between">
        {/* Left: transport controls + chapter label */}
        <div className="flex items-center gap-4 min-w-0">
          <div className="flex items-center gap-1 shrink-0 rounded-full" style={{ background: "#333" }}>
            {/* Back */}
            <button
              onClick={onBack}
              disabled={active === 0}
              className="p-1.5 rounded-full transition-colors duration-150 disabled:opacity-20"
              style={{ color: "#888" }}
              aria-label="Previous chapter"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
              </svg>
            </button>

            {/* Play / Pause */}
            <button
              onClick={onTogglePlay}
              className="p-1.5 rounded-full transition-colors duration-150 hover:opacity-80"
              style={{ color: playing ? GOLD : "#888" }}
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M6 19h4V5H6zm8-14v14h4V5z" />
                </svg>
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {/* Forward */}
            <button
              onClick={onForward}
              disabled={active === labels.length - 1}
              className="p-1.5 rounded-full transition-colors duration-150 disabled:opacity-20"
              style={{ color: "#888" }}
              aria-label="Next chapter"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M6 18l8.5-6L6 6zm10-12v12h2V6z" />
              </svg>
            </button>
          </div>

          {/* Active chapter label */}
          <p
            className="text-[11px] tracking-[0.12em] uppercase font-medium truncate"
            style={{ color: "#666" }}
          >
            {labels[active]}
          </p>
        </div>

        {/* Right: action buttons */}
        <div className="flex items-center gap-2 shrink-0">
          {showDecisionLog && (
            <button
              onClick={onDecisionLog}
              className={actionBtnClass}
              style={{ background: "#333", color: "#ccc" }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Decision log
            </button>
          )}

          <button
            onClick={onDownload}
            className={actionBtnClass}
            style={{ background: "#333", color: "#ccc" }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
            Download
          </button>

          <a
            href={`mailto:${AUTHOR_EMAIL}`}
            className={`${actionBtnClass} no-underline`}
            style={{ background: "#333", color: "#ccc" }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            Email Author
          </a>
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Main Theater Page                                                  */
/* ================================================================== */

export function TheaterExperiencePage({
  initialSlug,
  experiences,
  caseStudies,
}: {
  initialSlug: string;
  experiences: WorkExperience[];
  caseStudies: ShippedCaseStudy[];
}) {
  const [slug, setSlug] = useState(initialSlug);
  const [scene, setScene] = useState(0);
  const [visible, setVisible] = useState(true);
  const [flash, setFlash] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const autoplayRef = useRef<ReturnType<typeof setInterval>>(undefined);

  const exp = experiences.find((e) => e.slug === slug)!;

  const shippedItems = useMemo(() => {
    return (exp.whatShipped ?? []).map((raw) => {
      if (typeof raw === "string") return { slug: "", label: raw };
      return { slug: raw.slug, label: raw.label };
    });
  }, [exp]);

  const sceneLabels = useMemo(
    () => [
      "OVERVIEW",
      ...shippedItems.map((item) => item.label),
      "LEARNINGS",
      "CREDITS",
    ],
    [shippedItems],
  );

  const shippedOffset = scene - 1;
  const isShippedScene =
    shippedOffset >= 0 && shippedOffset < shippedItems.length;
  const learningsIdx = 1 + shippedItems.length;
  const creditsIdx = 2 + shippedItems.length;

  const activeCaseStudy = useMemo(() => {
    if (!isShippedScene) return undefined;
    const item = shippedItems[shippedOffset];
    if (!item?.slug) return undefined;
    return caseStudies.find(
      (c) => c.workSlug === slug && c.slug === item.slug,
    );
  }, [shippedItems, shippedOffset, isShippedScene, caseStudies, slug]);

  const showDecisionLog = isShippedScene && !!activeCaseStudy?.impact?.length;

  useEffect(() => {
    setSlug(initialSlug);
    setScene(0);
  }, [initialSlug]);

  useEffect(() => {
    const nav = document.querySelector(
      ".nav-pill-wrapper",
    ) as HTMLElement | null;
    if (nav) {
      nav.style.opacity = "0";
      nav.style.pointerEvents = "none";
    }
    return () => {
      if (nav) {
        nav.style.opacity = "";
        nav.style.pointerEvents = "";
      }
    };
  }, []);

  const switchScene = useCallback(
    (target: number) => {
      if (target === scene) return;
      setVisible(false);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setScene(target);
        setVisible(true);
      }, 150);
    },
    [scene],
  );

  const totalScenes = sceneLabels.length;

  const goBack = useCallback(() => {
    if (scene > 0) switchScene(scene - 1);
  }, [scene, switchScene]);

  const goForward = useCallback(() => {
    if (scene < totalScenes - 1) switchScene(scene + 1);
  }, [scene, totalScenes, switchScene]);

  const togglePlay = useCallback(() => {
    setPlaying((p) => !p);
  }, []);

  useEffect(() => {
    if (!playing) {
      clearInterval(autoplayRef.current);
      return;
    }

    autoplayRef.current = setInterval(() => {
      setScene((prev) => {
        const next = prev + 1;
        if (next >= totalScenes) {
          setPlaying(false);
          return prev;
        }
        setVisible(false);
        setTimeout(() => setVisible(true), 150);
        return next;
      });
    }, 10_000);

    return () => clearInterval(autoplayRef.current);
  }, [playing, totalScenes]);

  useEffect(() => {
    if (!playing) return;
    setPlaying(false);
  }, [slug]);

  const switchExperience = useCallback(
    (newSlug: string) => {
      if (newSlug === slug) return;
      setFlash(true);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setSlug(newSlug);
        setScene(0);
        setVisible(true);
        window.history.replaceState(null, "", `/work/${newSlug}/theater`);
      }, 150);
      setTimeout(() => setFlash(false), 350);
    },
    [slug],
  );

  const handleDownload = useCallback(() => {
    const { filename, content } = buildDownloadContent(
      scene,
      exp,
      activeCaseStudy,
      learningsIdx,
      creditsIdx,
    );
    triggerDownload(filename, content);
  }, [scene, exp, activeCaseStudy, learningsIdx, creditsIdx]);

  return (
    <div
      className="min-h-screen -mt-20 pt-20 flex flex-col"
      style={{ background: BG }}
    >
      {/* ---- Screen ---- */}
      <div className="relative mx-auto w-full max-w-5xl px-6 mt-6">
        {/* Projector flash overlay */}
        <div
          className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-150"
          style={{ background: SCREEN, opacity: flash ? 1 : 0 }}
        />

        {/* Screen surface */}
        <div
          className="relative overflow-hidden aspect-[16/9]"
          style={{ background: SCREEN }}
        >
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              opacity: visible ? 1 : 0,
              transition: "opacity 150ms ease",
            }}
          >
            <div className="w-full h-full overflow-y-auto">
              {scene === 0 && <OverviewScene exp={exp} />}
              {isShippedScene && (
                <PrototypeScene caseStudy={activeCaseStudy} />
              )}
              {scene === learningsIdx && <LearningsScene exp={exp} />}
              {scene === creditsIdx && <CreditsScene exp={exp} />}
            </div>
          </div>
        </div>
      </div>

      {/* ---- Scene Rail + Action Buttons ---- */}
      <SceneRail
        labels={sceneLabels}
        active={scene}
        playing={playing}
        onChange={switchScene}
        onBack={goBack}
        onForward={goForward}
        onTogglePlay={togglePlay}
        showDecisionLog={showDecisionLog}
        onDecisionLog={() => setDrawerOpen(true)}
        onDownload={handleDownload}
      />

      {/* ---- Info Bar ---- */}
      <InfoBar
        scene={scene}
        exp={exp}
        caseStudy={activeCaseStudy}
        learningsIdx={learningsIdx}
        creditsIdx={creditsIdx}
      />

      {/* ---- Design Decisions Drawer (externally controlled) ---- */}
      <DesignDecisionsDrawer
        projectTitle={activeCaseStudy?.title ?? exp.title}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
}
