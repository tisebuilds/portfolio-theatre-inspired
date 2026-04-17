"use client";

import type { CSSProperties } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AboutHeading } from "@/components/AboutHeading";
import { ExternalLinkIcon } from "@/components/case-study-icons";
import aboutData from "@/data/about.json";
import aboutPageAssets from "@/data/about-page-assets.json";
import { ABOUT_PHILOSOPHY_NAV } from "@/data/about-philosophy-nav";
import type { AboutData } from "@/app/types";
import { PhilosophyNavCard } from "@/components/tv/PhilosophyNavCard";
import { PUBLIC_MENTOR_IMAGE_BASE } from "@/lib/public-media";

const about = aboutData as AboutData;
const { favoriteFilms, awardRecognitionStickers, interestPinStickers } =
  aboutPageAssets;
const letterboxdHref = "https://letterboxd.com/teeshay24/diary/";

export function AboutViewport() {
  const mentorCollageViewportRef = useRef<HTMLDivElement | null>(null);
  const [mentorScale, setMentorScale] = useState(1);
  const [activePin, setActivePin] = useState<string>("");

  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [cursorSparkles, setCursorSparkles] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      size: number;
      driftX: number;
      driftY: number;
    }>
  >([]);
  const nextCursorSparkleId = useRef(0);
  const lastCursorSparkleSpawn = useRef(0);

  useEffect(() => {
    const el = mentorCollageViewportRef.current;
    if (!el) return;

    const DESIGN_W = 860;

    const update = () => {
      const width = el.getBoundingClientRect().width;
      if (!Number.isFinite(width) || width <= 0) return;
      const next = Math.min(1, width / DESIGN_W);
      setMentorScale((prev) => (Math.abs(prev - next) < 0.001 ? prev : next));
    };

    update();

    const ro = new ResizeObserver(() => update());
    ro.observe(el);
    window.addEventListener("resize", update, { passive: true });

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === "touch") return;

    setCursorPos({ x: e.clientX, y: e.clientY });

    const now = Date.now();
    if (now - lastCursorSparkleSpawn.current < 35) return;
    lastCursorSparkleSpawn.current = now;

    const id = nextCursorSparkleId.current++;
    const x = e.clientX + (Math.random() - 0.5) * 18;
    const y = e.clientY + (Math.random() - 0.5) * 18;
    const size = Math.random() * 7 + 6;
    const driftX = (Math.random() - 0.5) * 18;
    const driftY = -(Math.random() * 14 + 4);

    setCursorSparkles((prev) => [
      ...prev.slice(-28),
      { id, x, y, size, driftX, driftY },
    ]);

    window.setTimeout(() => {
      setCursorSparkles((prev) => prev.filter((s) => s.id !== id));
    }, 650);
  }, []);

  return (
    <div
      className="h-full min-h-0 flex-1 overflow-x-hidden overflow-y-auto bg-black"
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setCursorPos(null)}
    >
      <div className="pointer-events-none fixed inset-0 z-[60]" aria-hidden="true">
        {cursorPos ? (
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="cursor-sparkle absolute text-white/90"
            style={
              {
                left: cursorPos.x,
                top: cursorPos.y,
              } as CSSProperties
            }
          >
            <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" />
          </svg>
        ) : null}

        {cursorSparkles.map((s) => (
          <svg
            key={s.id}
            viewBox="0 0 24 24"
            fill="currentColor"
            className="marquee-sparkle absolute pointer-events-none text-white/80"
            style={
              {
                left: s.x,
                top: s.y,
                width: s.size,
                height: s.size,
                "--sparkle-dx": `${s.driftX}px`,
                "--sparkle-dy": `${s.driftY}px`,
              } as CSSProperties
            }
          >
            <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" />
          </svg>
        ))}
      </div>
      <div className="mx-auto w-full max-w-5xl px-7 py-10 text-left sm:px-9 md:px-12">
        <div className="flex flex-col gap-10">
          <section className="flex flex-col items-start gap-6">
            <AboutHeading />
            <p className="about-text-body max-w-[60ch]">
              I move ideas from draft to production, using lessons from great{" "}
              {letterboxdHref ? (
                <a
                  href={letterboxdHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-baseline gap-1 text-neutral-200 underline decoration-neutral-500 underline-offset-[0.2em] transition-colors hover:text-white hover:decoration-neutral-400"
                  aria-label="Letterboxd diary (opens in new tab)"
                >
                  films
                  <ExternalLinkIcon className="relative -top-px ml-0.5 shrink-0 text-neutral-400 transition-colors group-hover:text-neutral-200" />
                </a>
              ) : (
                "films"
              )}
              .
            </p>
            <div className="w-full max-w-[60ch] space-y-3">
              <ul className="m-0 grid list-none grid-cols-2 gap-4 p-0 sm:grid-cols-4">
                {favoriteFilms.map((film) => (
                  <li key={film.title} className="min-w-0">
                    <figure className="group relative overflow-hidden rounded-none border border-neutral-700/60 bg-neutral-950 shadow-[0_18px_50px_-28px_rgba(0,0,0,0.9)] transition-[border-color] duration-200 hover:border-tv-pink/60">
                      <div className="relative aspect-[2/3] w-full">
                        <Image
                          src={film.posterSrc}
                          alt={`${film.title} poster`}
                          fill
                          className="object-cover opacity-100"
                          sizes="(max-width: 640px) 44vw, 140px"
                        />
                        <div
                          className="pointer-events-none absolute inset-0 overflow-hidden"
                          aria-hidden={true}
                        >
                          <div className="absolute -left-1/2 top-0 h-full w-[70%] bg-gradient-to-r from-transparent via-white/45 to-transparent mix-blend-screen opacity-0 motion-reduce:hidden group-hover:animate-poster-gleam" />
                        </div>
                      </div>
                    </figure>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section aria-labelledby="awards-heading" className="space-y-4">
            <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h2
                id="awards-heading"
                className="about-text-body max-w-[60ch] sm:flex-1"
              >
                I&apos;ve been recognized for my ability to cultivate community and
                culture.
              </h2>

              <div className="flex flex-wrap items-center gap-0.5 sm:shrink-0 sm:justify-end">
                {awardRecognitionStickers.map((org) => (
                  <a
                    key={org.name}
                    href={org.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${org.name} in a new tab`}
                    className="sticker-hover-bob inline-flex h-9 items-center justify-center rounded-sm bg-transparent px-1.5 drop-shadow-[0_16px_22px_rgba(0,0,0,0.45)] transition-[filter] hover:drop-shadow-[0_18px_26px_rgba(0,0,0,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tv-pink/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    style={
                      {
                        "--sticker-r": `${org.rotate}deg`,
                      } as CSSProperties
                    }
                  >
                    <Image
                      src={org.image}
                      alt={org.name}
                      width={110}
                      height={48}
                      className="h-[18px] w-[40px] object-contain"
                    />
                  </a>
                ))}
              </div>
            </div>

            <div className="py-6">
              <ul className="m-0 flex w-full min-w-0 list-none flex-nowrap justify-start gap-2 p-0 sm:gap-4 md:gap-6">
                {about.awards.map((award, i) => (
                  <li
                    key={i}
                    className="flex min-w-0 flex-1 flex-col items-start"
                  >
                    {award.image ? (
                      award.href ? (
                        <a
                          href={award.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full max-w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tv-pink/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                          aria-label={`Open ${award.name} article in a new tab`}
                        >
                          <Image
                            src={award.image}
                            alt={award.name}
                            width={176}
                            height={400}
                            sizes="(max-width: 640px) 22vw, (max-width: 1024px) 18vw, 200px"
                            className="h-auto w-full max-w-full object-contain"
                          />
                        </a>
                      ) : (
                        <Image
                          src={award.image}
                          alt={award.name}
                          width={176}
                          height={400}
                          sizes="(max-width: 640px) 22vw, (max-width: 1024px) 18vw, 200px"
                          className="h-auto w-full max-w-full object-contain"
                        />
                      )
                    ) : (
                      <div className="flex aspect-[7/16] w-full max-w-full min-w-0 items-start justify-start border border-neutral-800 bg-neutral-900 p-2 sm:p-3">
                        <span className="about-text-body px-3 text-neutral-500">
                          {award.name}
                        </span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </section>


          <section aria-labelledby="process-heading" className="space-y-4">
            <h2
              id="process-heading"
              className="about-text-display"
            >
              <a
                href="https://www.youtube.com/watch?v=4u94juYwLLM"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-neutral-400"
              >
                Execution &gt; Process
              </a>
            </h2>
            <div className="grid gap-6 md:grid-cols-12 md:gap-10">
              <div className="space-y-4 md:col-span-5">
                <p className="about-text-body max-w-[60ch] text-neutral-200">
                  My internships and early career taught me that execution is
                  everything. Process has value, but no one cares for process if
                  the outcome is disappointing.
                </p>
                <p className="about-text-body max-w-[60ch] text-neutral-200">
                  My portfolio reflects that belief. Instead of traditional case
                  studies, it focuses on outcomes. I use my slide deck to tell
                  the story behind the work: the constraints, decisions,
                  tradeoffs, and context that shaped each project.
                </p>
              </div>

              <div className="md:col-span-7">
                <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2">
                  {ABOUT_PHILOSOPHY_NAV.map((item, i) => (
                    <li
                      key={
                        "backLinks" in item
                          ? item.philosophyTitle
                          : `${item.episodeLabel}-${i}`
                      }
                      className="min-w-0"
                    >
                      <PhilosophyNavCard item={item} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section
            aria-labelledby="pins-heading"
            className="relative space-y-4 overflow-hidden rounded-2xl bg-[#0c0c0c] px-0 py-12 md:py-16"
          >
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              <defs>
                <filter id="grain-pins">
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.65"
                    numOctaves="3"
                    stitchTiles="stitch"
                  />
                  <feColorMatrix type="saturate" values="0" />
                </filter>
              </defs>
              <rect
                width="100%"
                height="100%"
                filter="url(#grain-pins)"
                opacity="0.06"
              />
            </svg>

            {interestPinStickers.map((s, i) => (
              <div
                key={i}
                className={`sticker pointer-events-none absolute flex items-center justify-center border-0 bg-transparent text-transparent transition-opacity duration-200 ease-out ${s.shape} ${
                  activePin && s.label !== activePin ? "opacity-50" : "opacity-100"
                }`}
                style={{
                  ...s.style,
                  "--sticker-r": `${s.rotate}deg`,
                  animationDelay: s.delay,
                } as unknown as CSSProperties}
                aria-hidden="true"
              >
                <Image
                  src={s.image}
                  alt=""
                  aria-hidden="true"
                  fill
                  className={s.imageClassName ?? "object-contain"}
                  sizes="72px"
                />
              </div>
            ))}

            <div className="relative z-10 w-full max-w-lg pl-0 pr-28 text-left sm:pr-32 md:pr-40">
              <h2
                id="pins-heading"
                className="about-text-display"
              >
                I&apos;m obsessed with stories big and small, in all forms
              </h2>

              <ul className="m-0 flex list-none flex-wrap items-center gap-2 p-0 pb-3 pt-3">
                {about.pins.map((pin, i) => {
                  const selected = Boolean(activePin) && pin.label === activePin;
                  const showAll = !activePin;
                  return (
                    <li key={i} className="list-none">
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setActivePin(pin.label)}
                          className={`group inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 ${
                            selected || showAll
                              ? "border-white/25 bg-white/10 text-white"
                              : "border-white/10 bg-white/[0.03] text-neutral-200 hover:border-tv-pink/60 hover:bg-white/[0.06]"
                          }`}
                          aria-pressed={selected}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              selected ? "bg-tv-pink" : "bg-tv-pink/70"
                            }`}
                            aria-hidden="true"
                          />
                          <span>{pin.label}</span>
                        </button>

                        {pin.href && pin.label !== "Film" ? (
                          <a
                            href={pin.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center justify-center rounded-full border px-2 py-1.5 font-mono text-[10px] uppercase tracking-wider leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 ${
                              selected || showAll
                                ? "border-white/25 bg-white/10 text-white/80 hover:text-white"
                                : "border-white/10 bg-white/[0.03] text-tv-muted hover:border-tv-pink/60 hover:bg-white/[0.06] hover:text-neutral-200"
                            }`}
                            aria-label={`${pin.label} link (opens in new tab)`}
                          >
                            <span className="leading-none">↗</span>
                          </a>
                        ) : null}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>


          <section
            aria-labelledby="credits-heading"
            className="flex flex-col items-start space-y-4"
          >
            <h2
              id="credits-heading"
              className="about-text-display"
            >
              Mentors
            </h2>
            <p className="about-text-body">
              Mentorship is a unique form of friendship, so thank you for helping
              me grow
            </p>
            {(() => {
              const mentorByName = new Map(
                about.mentors.map((mentor) => [mentor.name, mentor]),
              );
              const mentorImageFromName = (name: string) => {
                const slug = name
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/^-+|-+$/g, "");
                return `${PUBLIC_MENTOR_IMAGE_BASE}/${slug}.png`;
              };

              // Edit these arrays to control desktop arrangement order per row.
              const mentorRows = [
                [
                  "Femi",
                  "Cindy",
                  "Tolu",
                  "Esuvat",
                  "Miah",
                  "Natalie",
                  "Yanlam",
                  "Samantha",
                  "Chris",
                ],
                [
                  "Sam",
                  "Olivia",
                  "Zain",
                  "Jason",
                  "Catherine",
                  "Eileen",
                  "Logan",
                  "George",
                  "Ry",
                  "Dr. Roberts",
                ],
              ];

              const rows = mentorRows
                .map((row) =>
                  row
                    .map((name) => mentorByName.get(name))
                    .filter(
                      (mentor): mentor is NonNullable<typeof mentor> =>
                        Boolean(mentor),
                    ),
                )
                .filter((row) => row.length > 0);

              /** Fixed “design” width for the collage; scaled down on narrow viewports via container + transform. */
              const MENTOR_COLLAGE_W = 860;
              const MENTOR_ROW_H = 240;
              const MENTOR_ROW_GAP = 20;
              const MENTOR_COLLAGE_H = MENTOR_ROW_H * 2 + MENTOR_ROW_GAP;
              const POLAROID_W = 108;

              const buildLayouts = (count: number, row: 1 | 2) => {
                if (count === 0) return [];

                const minLeft = 2;
                /** Keep the right edge of the polaroid (fixed px width) inside the row width. */
                const maxLeft =
                  ((MENTOR_COLLAGE_W - POLAROID_W) / MENTOR_COLLAGE_W) * 100;
                const step = count === 1 ? 0 : (maxLeft - minLeft) / (count - 1);
                const rotatePattern =
                  row === 1
                    ? [-6, 5, -3, 2, 4, -2, 5, -4, 3, -5]
                    : [4, -5, 3, -3, 5, -4, 2, -2, 4, -3];
                const topPattern =
                  row === 1
                    ? ["18%", "4%", "16%", "2%", "18%", "5%", "14%", "3%", "17%", "6%"]
                    : ["16%", "5%", "19%", "3%", "15%", "6%", "18%", "4%", "16%", "5%"];

                return Array.from({ length: count }, (_, i) => ({
                  rotate: rotatePattern[i % rotatePattern.length],
                  left: `${minLeft + i * step}%`,
                  top: topPattern[i % topPattern.length],
                  z: i === Math.floor(count / 2) ? 6 : 4,
                }));
              };

              const renderRow = (
                mentors: typeof about.mentors,
                row: 1 | 2,
                rowIndex: number,
              ) => {
                const layouts = buildLayouts(mentors.length, row);
                return (
                  <ul
                    key={`mentor-row-${rowIndex}`}
                    className="m-0 list-none p-0 relative shrink-0"
                    style={{ width: MENTOR_COLLAGE_W, height: MENTOR_ROW_H }}
                  >
                    {mentors.map((mentor, i) => {
                      const layout = layouts[i];
                      const computedImage = mentorImageFromName(mentor.name);
                      const src = mentor.image ?? computedImage;
                      const hasImage = Boolean(mentor.image);
                      return (
                        <li
                          key={mentor.name}
                          className="mentor-polaroid absolute"
                          style={
                            {
                              width: POLAROID_W,
                              ...(layout
                                ? {
                                    "--polaroid-r": `${layout.rotate}deg`,
                                    "--polaroid-left": layout.left,
                                    "--polaroid-top": layout.top,
                                    "--polaroid-z": String(layout.z),
                                  }
                                : {}),
                            } as CSSProperties
                          }
                        >
                          {hasImage ? (
                            <Image
                              src={src}
                              alt={`${mentor.name}${mentor.role ? `, ${mentor.role}` : ""}`}
                              width={245}
                              height={288}
                              sizes="(max-width: 480px) 18vw, 108px"
                              className="h-auto w-full"
                            />
                          ) : (
                            <div className="flex aspect-[4/5] w-full items-start justify-start rounded bg-neutral-800 p-3">
                              <span className="about-text-body text-neutral-600">
                                {mentor.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </span>
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                );
              };

              return (
                <div className="@container relative mx-auto w-full max-w-[860px]">
                  <div
                    ref={mentorCollageViewportRef}
                    className="relative w-full"
                    style={{
                      aspectRatio: `${MENTOR_COLLAGE_W} / ${MENTOR_COLLAGE_H}`,
                    }}
                  >
                    <div
                      className="absolute left-0 top-0"
                      style={{
                        width: MENTOR_COLLAGE_W * mentorScale,
                        height: MENTOR_COLLAGE_H * mentorScale,
                      }}
                    >
                      <div
                        className="absolute left-0 top-0 flex flex-col gap-5"
                        style={{
                          width: MENTOR_COLLAGE_W,
                          height: MENTOR_COLLAGE_H,
                          transform: `scale(${mentorScale})`,
                          transformOrigin: "left top",
                        }}
                      >
                        {rows.map((row, i) =>
                          renderRow(row, i === 0 ? 1 : 2, i),
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </section>
        </div>
      </div>
    </div>
  );
}

