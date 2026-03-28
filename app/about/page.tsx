import type { Metadata } from "next";
import Image from "next/image";
import { AboutHeading } from "@/components/AboutHeading";
import aboutData from "@/data/about.json";
import type { AboutData } from "@/app/types";


const about = aboutData as AboutData;

export const metadata: Metadata = {
  title: "About",
  description: "About — product design portfolio",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col gap-16">
          <AboutHeading />

          <section aria-labelledby="awards-heading">
            <h2
              id="awards-heading"
              className="text-sm font-medium text-white mb-6 text-center"
            >
              I&apos;ve been recognized for my ability to cultivate community and culture
            </h2>
            <div className="relative py-6">
              {[
                { name: "WICC", rotate: -8, delay: "0s", className: "top-0 left-[4%] sm:left-[8%]" },
                { name: "URMC", rotate: 5, delay: "0.7s", className: "top-[12%] right-[2%] sm:right-[6%]" },
                { name: "Intro to DPD", rotate: -3, delay: "1.4s", className: "bottom-[30%] left-[1%] sm:left-[5%]" },
                { name: "CUXD", rotate: 6, delay: "0.35s", className: "bottom-[8%] right-[4%] sm:right-[10%]" },
                { name: "ColorStack", rotate: -4, delay: "1.05s", className: "bottom-0 left-[15%] sm:left-[20%]" },
              ].map((org) => (
                <span
                  key={org.name}
                  className={`sticker absolute z-10 px-3 py-1.5 bg-white text-neutral-900 text-[11px] font-bold uppercase tracking-wider rounded-sm shadow-[0_2px_8px_rgba(0,0,0,0.25)] cursor-default select-none ${org.className}`}
                  style={{
                    "--sticker-r": `${org.rotate}deg`,
                    animationDelay: org.delay,
                  } as React.CSSProperties}
                >
                  {org.name}
                </span>
              ))}
              <ul className="list-none p-0 m-0 flex flex-wrap justify-center gap-4 sm:gap-6">
                {about.awards.map((award, i) => (
                  <li key={i} className="flex flex-col items-center w-36 sm:w-44">
                    {award.image ? (
                      <Image
                        src={award.image}
                        alt={award.name}
                        width={176}
                        height={400}
                        className="w-full h-auto object-contain"
                      />
                    ) : (
                      <div className="w-full aspect-[7/16] bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                        <span className="text-neutral-500 text-xs text-center px-3">
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
              className="absolute inset-0 w-full h-full pointer-events-none"
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
              { label: "K-pop", style: { top: "12%", left: "3%", width: 72, height: 72 }, rotate: -10, delay: "0s", shape: "rounded-2xl", colors: "border-pink-400/20 bg-pink-400/10 text-pink-300/30" },
              { label: "Disney", style: { top: "35%", left: "15%", width: 64, height: 64 }, rotate: 5, delay: "0.35s", shape: "rounded-full", colors: "border-sky-400/20 bg-sky-400/10 text-sky-300/30" },
              { label: "K-pop", style: { bottom: "20%", left: "12%", width: 52, height: 52 }, rotate: 8, delay: "0.7s", shape: "rounded-full", colors: "border-pink-400/10 bg-pink-400/5 text-pink-300/20" },
              { label: "Disney", style: { bottom: "5%", left: "18%", width: 48, height: 48 }, rotate: -6, delay: "1.05s", shape: "rounded-xl", colors: "border-sky-400/10 bg-sky-400/5 text-sky-300/20" },
              { label: "Film", style: { top: "15%", right: "4%", width: 76, height: 76 }, rotate: 4, delay: "0.2s", shape: "rounded-full", colors: "border-amber-400/20 bg-amber-400/10 text-amber-300/30" },
              { label: "Comics", style: { top: "8%", right: "15%", width: 56, height: 56 }, rotate: -8, delay: "0.5s", shape: "rounded-2xl", colors: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300/30" },
              { label: "Comics", style: { bottom: "15%", right: "12%", width: 68, height: 68 }, rotate: 12, delay: "1.2s", shape: "rounded-full", colors: "border-emerald-400/10 bg-emerald-400/5 text-emerald-300/20" },
              { label: "Film", style: { bottom: "5%", right: "4%", width: 60, height: 60 }, rotate: -10, delay: "0.85s", shape: "rounded-2xl", colors: "border-amber-400/10 bg-amber-400/5 text-amber-300/20" },
            ].map((s, i) => (
              <div
                key={i}
                className={`sticker absolute ${s.shape} border-2 border-dashed ${s.colors} hidden lg:flex items-center justify-center`}
                style={{
                  ...s.style,
                  "--sticker-r": `${s.rotate}deg`,
                  animationDelay: s.delay,
                } as unknown as React.CSSProperties}
                aria-hidden="true"
              >
                <span className="text-[7px] font-medium uppercase tracking-wider select-none">
                  {s.label}
                </span>
              </div>
            ))}

            <div className="relative z-10 max-w-lg mx-auto">
              <h2
                id="pins-heading"
                className="font-bold text-2xl md:text-3xl text-neutral-100 mb-6"
              >
                I&apos;m obsessed with stories big and small, in all forms
              </h2>

              <ul className="list-none p-0 m-0 flex flex-col gap-3">
                {about.pins.map((pin, i) => {
                  const label = (
                    <span className="text-xs font-bold uppercase tracking-[0.25em] text-neutral-400 font-mono">
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
                          className="inline-flex items-center gap-2 group"
                          aria-label={`${pin.label} (opens in new tab)`}
                        >
                          {label}
                          <span className="text-neutral-600 text-xs group-hover:text-neutral-300 transition-colors">
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
              className="font-bold text-2xl md:text-3xl text-neutral-100 mb-6 text-center"
            >
              <a
                href="https://www.youtube.com/watch?v=4u94juYwLLM"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-neutral-400 transition-colors"
              >
                I don&apos;t have a process
              </a>
            </h2>
            <div className="flex flex-col items-center gap-6">

              <p className="text-neutral-200 text-sm leading-relaxed max-w-[60ch] text-left">
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
              className="font-bold text-2xl md:text-3xl text-neutral-100 mb-2 text-center"
            >
              Mentors
            </h2>
            <p className="text-sm font-medium text-neutral-300 mb-6 text-center">
              Mentorship is a unique form of friendship, so thank you for helping me grow
            </p>
            <ul className="list-none p-0 m-0 flex flex-wrap justify-center gap-5">
              {about.mentors.map((mentor, i) => (
                <li
                  key={i}
                  className="inline-flex flex-col items-center p-3 pb-4 gap-3 w-[160px] rounded-md border border-neutral-700 bg-neutral-900 shadow-[0_2px_8px_0_rgba(0,0,0,0.25)]"
                >
                  <div className="w-full aspect-square rounded-sm overflow-hidden flex items-center justify-center bg-neutral-800">
                    {mentor.image ? (
                      <Image
                        src={mentor.image}
                        alt=""
                        width={128}
                        height={128}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <span className="text-neutral-600 text-lg font-semibold">
                        {mentor.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col items-center text-center font-mono">
                    <p className="text-neutral-200 text-[10px] leading-snug">
                      {mentor.name}
                    </p>
                    {mentor.role && (
                      <p className="text-neutral-500 text-[10px] leading-snug">
                        {mentor.role}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}
