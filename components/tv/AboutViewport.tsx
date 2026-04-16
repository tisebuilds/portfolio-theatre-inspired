"use client";

import type { CSSProperties } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AboutHeading } from "@/components/AboutHeading";
import { ExternalLinkIcon } from "@/components/case-study-icons";
import aboutData from "@/data/about.json";
import type { AboutData } from "@/app/types";

const about = aboutData as AboutData;
const letterboxdHref = about.pins.find((p) => p.label === "Film")?.href;

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
                  aria-label="Letterboxd profile (opens in new tab)"
                >
                  films
                  <ExternalLinkIcon className="relative -top-px ml-0.5 shrink-0 text-neutral-400 transition-colors group-hover:text-neutral-200" />
                </a>
              ) : (
                "films"
              )}
              .
            </p>
          </section>

          <section aria-labelledby="awards-heading" className="space-y-4">
            <h2
              id="awards-heading"
              className="about-text-body max-w-[60ch]"
            >
              I&apos;ve been recognized for my ability to cultivate community and
              culture.
            </h2>
            <div className="relative py-6">
              {[
                {
                  name: "WICC",
                  rotate: -8,
                  delay: "0s",
                  className: "top-0 left-[4%] sm:left-[8%]",
                  image: "/stickers/wicc.png",
                  imageClassName: "h-[48px] w-[78px] object-contain",
                },
                {
                  name: "URMC",
                  rotate: 5,
                  delay: "0.7s",
                  className: "top-[12%] right-[2%] sm:right-[6%]",
                  image: "/stickers/urmc.png",
                  imageClassName: "h-[46px] w-[82px] object-contain",
                },
                {
                  name: "Intro to DPD",
                  rotate: -3,
                  delay: "1.4s",
                  className: "bottom-[30%] left-[1%] sm:left-[5%]",
                  image: "/stickers/intro-to-dpd.png",
                  imageClassName: "h-[36px] w-[110px] object-contain",
                },
                {
                  name: "CUXD",
                  rotate: 6,
                  delay: "0.35s",
                  className: "bottom-[8%] right-[4%] sm:right-[10%]",
                  image: "/stickers/cuxd.png",
                  imageClassName: "h-[36px] w-[61px] object-contain",
                },
                {
                  name: "ColorStack",
                  rotate: -4,
                  delay: "1.05s",
                  className: "bottom-0 left-[15%] sm:left-[20%]",
                  image: "/stickers/colorstack.png",
                  imageClassName: "h-[37px] w-[107px] object-contain",
                },
              ].map((org) => (
                <span
                  key={org.name}
                  className={`sticker absolute z-10 cursor-default select-none rounded-sm p-0 bg-transparent shadow-none ${org.className}`}
                  style={{
                    "--sticker-r": `${org.rotate}deg`,
                    animationDelay: org.delay,
                  } as CSSProperties}
                >
                  <Image
                    src={org.image}
                    alt={org.name}
                    width={110}
                    height={48}
                    className={org.imageClassName}
                  />
                </span>
              ))}

              <ul className="m-0 flex w-full min-w-0 list-none flex-nowrap justify-start gap-2 p-0 sm:gap-4 md:gap-6">
                {about.awards.map((award, i) => (
                  <li
                    key={i}
                    className="flex min-w-0 flex-1 flex-col items-start"
                  >
                    {award.image ? (
                      <Image
                        src={award.image}
                        alt={award.name}
                        width={176}
                        height={400}
                        sizes="(max-width: 640px) 22vw, (max-width: 1024px) 18vw, 200px"
                        className="h-auto w-full max-w-full object-contain"
                      />
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

            {[
              {
                label: "K-pop",
                style: { top: "8%", right: "12%", width: 72, height: 72 },
                rotate: -10,
                delay: "0s",
                shape: "rounded-2xl",
                image: "/stickers/wonder-girls.png",
                imageClassName:
                  "h-[108%] w-[108%] object-contain drop-shadow-[0_0_10px_rgba(244,114,182,0.25)]",
              },
              {
                label: "Disney",
                style: { top: "22%", right: "9%", width: 64, height: 64 },
                rotate: 5,
                delay: "0.35s",
                shape: "rounded-full",
                image: "/stickers/disney.png",
                imageClassName:
                  "h-[108%] w-[108%] object-contain drop-shadow-[0_0_10px_rgba(56,189,248,0.25)]",
              },
              {
                label: "K-pop",
                style: { top: "38%", right: "16%", width: 52, height: 52 },
                rotate: 8,
                delay: "0.7s",
                shape: "rounded-full",
                image: "/stickers/new-vegas.png",
                imageClassName:
                  "h-[108%] w-[108%] object-contain drop-shadow-[0_0_10px_rgba(244,114,182,0.2)]",
              },
              {
                label: "Disney",
                style: { top: "52%", right: "10%", width: 48, height: 48 },
                rotate: -6,
                delay: "1.05s",
                shape: "rounded-xl",
                image: "/stickers/monsters-hat.png",
                imageClassName:
                  "h-[108%] w-[108%] object-contain drop-shadow-[0_0_10px_rgba(56,189,248,0.22)]",
              },
              {
                label: "Film",
                style: { top: "64%", right: "18%", width: 76, height: 76 },
                rotate: 4,
                delay: "0.2s",
                shape: "rounded-full",
                image: "/stickers/keep-moving-forward.png",
                imageClassName:
                  "h-[112%] w-[112%] object-contain drop-shadow-[0_0_12px_rgba(251,191,36,0.22)]",
              },
              {
                label: "Comics",
                style: { top: "14%", right: "18%", width: 56, height: 56 },
                rotate: -8,
                delay: "0.5s",
                shape: "rounded-2xl",
                image: "/stickers/comics-character.png",
                imageClassName:
                  "h-[114%] w-[114%] object-contain drop-shadow-[0_0_10px_rgba(167,243,208,0.25)]",
              },
              {
                label: "Comics",
                style: { top: "76%", right: "11%", width: 68, height: 68 },
                rotate: 12,
                delay: "1.2s",
                shape: "rounded-full",
                image: "/stickers/webtoon.png",
                imageClassName:
                  "h-[108%] w-[108%] object-contain drop-shadow-[0_0_10px_rgba(16,185,129,0.25)]",
              },
              {
                label: "Film",
                style: { bottom: "6%", right: "14%", width: 60, height: 60 },
                rotate: -10,
                delay: "0.85s",
                shape: "rounded-2xl",
                image: "/stickers/flo-logo.png",
                imageClassName: "h-[108%] w-[108%] object-contain",
              },
            ].map((s, i) => (
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
            <div className="space-y-6">
              <p className="about-text-body max-w-[60ch] text-neutral-200">
                My internships and early career taught me that execution is
                everything. Process has value, but no one cares for process if
                the outcome is disappointing.
              </p>
              <p className="about-text-body max-w-[60ch] text-neutral-200">
                My portfolio reflects that belief. Instead of traditional case
                studies, it focuses on outcomes. I use my slide deck to tell the
                story behind the work: the constraints, decisions, tradeoffs,
                and context that shaped each project.
              </p>
              <p className="about-text-body max-w-[60ch] text-neutral-200">
                I am not the right hire if you are looking for someone who
                treats process as the product. My strength is driving clarity and
                alignment for ideas (often with prototypes).
              </p>
              <p className="about-text-body max-w-[60ch] text-neutral-200">
                I bias toward action. Sometimes I move before every requirement
                is perfectly defined, but when I believe something should exist,
                I build it. Storytelling and prototypes are the tools I trust
                most for solving problems.
              </p>
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
                return `/mentors/${slug}.png`;
              };

              // Edit these arrays to control desktop arrangement order per row.
              const mentorRows = [
                [
                  "Femi",
                  "Miah",
                  "Cindy",
                  "Ry",
                  "Esuvat",
                  "Dr. Roberts",
                  "Natalie",
                  "Eileen",
                  "Yanlam",
                ],
                [
                  "Zain",
                  "Catherine",
                  "Chris",
                  "Samantha",
                  "Jason",
                  "Logan",
                  "Sam",
                  "Tolu",
                  "Olivia",
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

              const buildLayouts = (count: number, row: 1 | 2) => {
                if (count === 0) return [];

                const minLeft = 2;
                const maxLeft = 86;
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

              /** Fixed “design” width for the collage; scaled down on narrow viewports via container + transform. */
              const MENTOR_COLLAGE_W = 860;
              const MENTOR_ROW_H = 240;
              const MENTOR_ROW_GAP = 20;
              const MENTOR_COLLAGE_H = MENTOR_ROW_H * 2 + MENTOR_ROW_GAP;
              const POLAROID_W = 150;

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
                              width={340}
                              height={400}
                              sizes="(max-width: 480px) 25vw, 150px"
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

