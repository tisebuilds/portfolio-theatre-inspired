"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { AboutHeading } from "@/components/AboutHeading";
import aboutData from "@/data/about.json";
import type { AboutData } from "@/app/types";

const about = aboutData as AboutData;

export function AboutViewport() {
  return (
    <div className="h-full min-h-0 flex-1 overflow-y-auto bg-black">
      <div className="mx-auto w-full max-w-5xl px-5 py-10">
        <div className="flex flex-col gap-16">
          <div className="flex flex-col items-center gap-6">
            <AboutHeading />
            <p className="mx-auto max-w-[60ch] text-center text-base leading-relaxed text-neutral-300 md:text-lg">
              I move ideas from draft to production, using lessons from great
              films. How? No set process because I find storytelling &amp;
              prototypes are the best tools to solve problems.
            </p>
          </div>

          <section aria-labelledby="awards-heading">
            <h2
              id="awards-heading"
              className="mb-6 text-center text-sm font-medium text-white"
            >
              I&apos;ve been recognized for my ability to cultivate community and
              culture
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

              <ul className="m-0 flex list-none flex-wrap justify-center gap-4 p-0 sm:gap-6">
                {about.awards.map((award, i) => (
                  <li key={i} className="flex w-36 flex-col items-center sm:w-44">
                    {award.image ? (
                      <Image
                        src={award.image}
                        alt={award.name}
                        width={176}
                        height={400}
                        className="h-auto w-full object-contain"
                      />
                    ) : (
                      <div className="flex aspect-[7/16] w-full items-center justify-center border border-neutral-800 bg-neutral-900">
                        <span className="px-3 text-center text-xs text-neutral-500">
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
            className="relative overflow-hidden rounded-2xl bg-[#0c0c0c] px-6 py-12 md:px-16 md:py-16"
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
                style: { top: "12%", left: "3%", width: 72, height: 72 },
                rotate: -10,
                delay: "0s",
                shape: "rounded-2xl",
                image: "/stickers/wonder-girls.png",
                imageClassName:
                  "h-[108%] w-[108%] object-contain drop-shadow-[0_0_10px_rgba(244,114,182,0.25)]",
              },
              {
                label: "Disney",
                style: { top: "35%", left: "15%", width: 64, height: 64 },
                rotate: 5,
                delay: "0.35s",
                shape: "rounded-full",
                image: "/stickers/disney.png",
                imageClassName:
                  "h-[108%] w-[108%] object-contain drop-shadow-[0_0_10px_rgba(56,189,248,0.25)]",
              },
              {
                label: "K-pop",
                style: { bottom: "20%", left: "12%", width: 52, height: 52 },
                rotate: 8,
                delay: "0.7s",
                shape: "rounded-full",
                image: "/stickers/new-vegas.png",
                imageClassName:
                  "h-[108%] w-[108%] object-contain drop-shadow-[0_0_10px_rgba(244,114,182,0.2)]",
              },
              {
                label: "Disney",
                style: { bottom: "5%", left: "18%", width: 48, height: 48 },
                rotate: -6,
                delay: "1.05s",
                shape: "rounded-xl",
                image: "/stickers/monsters-hat.png",
                imageClassName:
                  "h-[108%] w-[108%] object-contain drop-shadow-[0_0_10px_rgba(56,189,248,0.22)]",
              },
              {
                label: "Film",
                style: { top: "15%", right: "4%", width: 76, height: 76 },
                rotate: 4,
                delay: "0.2s",
                shape: "rounded-full",
                image: "/stickers/keep-moving-forward.png",
                imageClassName:
                  "h-[112%] w-[112%] object-contain drop-shadow-[0_0_12px_rgba(251,191,36,0.22)]",
              },
              {
                label: "Comics",
                style: { top: "8%", right: "15%", width: 56, height: 56 },
                rotate: -8,
                delay: "0.5s",
                shape: "rounded-2xl",
                image: "/stickers/comics-character.png",
                imageClassName:
                  "h-[114%] w-[114%] object-contain drop-shadow-[0_0_10px_rgba(167,243,208,0.25)]",
              },
              {
                label: "Comics",
                style: { bottom: "15%", right: "12%", width: 68, height: 68 },
                rotate: 12,
                delay: "1.2s",
                shape: "rounded-full",
                image: "/stickers/webtoon.png",
                imageClassName:
                  "h-[108%] w-[108%] object-contain drop-shadow-[0_0_10px_rgba(16,185,129,0.25)]",
              },
              {
                label: "Film",
                style: { bottom: "5%", right: "4%", width: 60, height: 60 },
                rotate: -10,
                delay: "0.85s",
                shape: "rounded-2xl",
                image: "/stickers/flo-logo.png",
                imageClassName: "h-[108%] w-[108%] object-contain",
              },
            ].map((s, i) => (
              <div
                key={i}
                className={`sticker absolute hidden items-center justify-center border-0 bg-transparent text-transparent lg:flex ${s.shape}`}
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

            <div className="relative z-10 mx-auto max-w-lg">
              <h2
                id="pins-heading"
                className="mb-6 text-2xl font-bold text-neutral-100 md:text-3xl"
              >
                I&apos;m obsessed with stories big and small, in all forms
              </h2>

              <ul className="m-0 flex list-none flex-col gap-3 p-0">
                {about.pins.map((pin, i) => {
                  const label = (
                    <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-neutral-400">
                      {pin.label}
                    </span>
                  );
                  return (
                    <li key={i} className="list-none">
                      {pin.href ? (
                        <a
                          href={pin.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-2"
                          aria-label={`${pin.label} (opens in new tab)`}
                        >
                          {label}
                          <span className="text-xs text-neutral-600 transition-colors group-hover:text-neutral-300">
                            ↗
                          </span>
                        </a>
                      ) : (
                        label
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>

          <section aria-labelledby="process-heading">
            <h2
              id="process-heading"
              className="mb-6 text-center text-2xl font-bold text-neutral-100 md:text-3xl"
            >
              <a
                href="https://www.youtube.com/watch?v=4u94juYwLLM"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-neutral-400"
              >
                Execution &gt;&gt;&gt; process
              </a>
            </h2>
            <div className="flex flex-col items-center gap-6">
              <p className="max-w-[60ch] text-left text-sm leading-relaxed text-neutral-200">
                My internship and early career taught me execution is everything.
                No one cares for process when the outcome is a dissapointing
                solution. Hence, my portfolio has no case studies: only outcomes.
                I share the story (which adds context to decisions and
                constraints) with my slide deck. Don&apos;t hire me if you&apos;re
                looking to hire for process. My goal with every project is to
                create an artifact (usually prototype) and test with users or
                drive alignment within my team. Hence, I bias towards action
                (sometimes jumping the gun without thinking through all the
                requirements) and if I think something should exist, I will
                build it.
              </p>
            </div>
          </section>

          <section aria-labelledby="credits-heading" className="flex flex-col items-center">
            <h2
              id="credits-heading"
              className="mb-2 text-center text-2xl font-bold text-neutral-100 md:text-3xl"
            >
              Mentors
            </h2>
            <p className="mb-6 text-center text-sm font-medium text-neutral-300">
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

              const renderRow = (
                mentors: typeof about.mentors,
                row: 1 | 2,
                rowIndex: number,
              ) => {
                const layouts = buildLayouts(mentors.length, row);
                return (
                  <ul
                    key={`mentor-row-${rowIndex}`}
                    className="m-0 flex list-none flex-wrap justify-center gap-4 p-0 lg:relative lg:h-[240px] lg:w-full"
                  >
                    {mentors.map((mentor, i) => {
                      const layout = layouts[i];
                      const computedImage = mentorImageFromName(mentor.name);
                      const src = mentor.image ?? computedImage;
                      const hasImage = Boolean(mentor.image);
                      return (
                        <li
                          key={mentor.name}
                          className="mentor-polaroid w-[136px] sm:w-[146px] lg:absolute lg:w-[150px] xl:w-[160px]"
                          style={
                            layout
                              ? ({
                                  "--polaroid-r": `${layout.rotate}deg`,
                                  "--polaroid-left": layout.left,
                                  "--polaroid-top": layout.top,
                                  "--polaroid-z": String(layout.z),
                                } as unknown as CSSProperties)
                              : undefined
                          }
                        >
                          {hasImage ? (
                            <Image
                              src={src}
                              alt={`${mentor.name}${mentor.role ? `, ${mentor.role}` : ""}`}
                              width={340}
                              height={400}
                              className="h-auto w-full"
                            />
                          ) : (
                            <div className="flex aspect-[4/5] w-full items-center justify-center rounded bg-neutral-800">
                              <span className="text-lg font-semibold text-neutral-600">
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
                <div className="flex w-full flex-col items-center gap-2 lg:gap-0">
                  {rows.map((row, i) => renderRow(row, i === 0 ? 1 : 2, i))}
                </div>
              );
            })()}
          </section>
        </div>
      </div>
    </div>
  );
}

