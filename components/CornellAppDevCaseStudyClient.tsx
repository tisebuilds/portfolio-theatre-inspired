"use client";

import Image from "next/image";
import { type CSSProperties } from "react";
import { CaseStudyPageShell } from "@/components/CaseStudyPageShell";
import { ExternalLinkIcon, MetaDot } from "@/components/case-study-icons";

const apps = [
  {
    name: "Volume",
    storeUrl:
      "https://play.google.com/store/apps/details?id=com.cornellappdev.android.volume&pli=1",
    iconSrc: "/images/app-icon-volume.png",
    storeLabel: "Google Play",
  },
  {
    name: "CourseGrab",
    storeUrl: "https://apps.apple.com/us/app/coursegrab/id1510823691",
    iconSrc: "/images/app-icon-coursegrab.png",
    storeLabel: "App Store",
  },
] as const;

/** Row-major 4×4 home screen: `null` = empty, number = index into `apps` */
const HOME_SCREEN_LAYOUT: (number | null)[] = [
  null, 0, 1, null,
  null, null, null, null,
  null, null, null, null,
  null, null, null, null,
];

/** Outer chassis: matte pink glass + soft top-left light (reference: iPhone 16 pink — avoid stacked “specular” bands) */
const phoneChassisStyle: CSSProperties = {
  borderRadius: 48,
  background: [
    // Single diffuse highlight + faint falloff (reads as frosted glass, not neon gradients)
    "linear-gradient(125deg, rgba(255,255,255,0.11) 0%, rgba(255,255,255,0) 38%, rgba(0,0,0,0.04) 100%)",
    // Saturated base, two close hue steps only
    "linear-gradient(155deg, #f4b8da 0%, #e879ad 52%, #d46296 100%)",
  ].join(", "),
  boxShadow: `
    inset 0 1px 0 rgba(255,255,255,0.22),
    inset 0 -8px 28px rgba(90, 28, 58, 0.07),
    0 0 0 1px rgba(180, 60, 105, 0.28),
    0 20px 44px rgba(0,0,0,0.38)
  `,
};

const screenWallpaperStyle: CSSProperties = {
  backgroundColor: "#6d0d40",
  backgroundImage: "url(/images/iphone-16-pink-wallpaper.png)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

const PHONE_MOCKUP_SCALE = 1.52;
const PHONE_BASE_W = 260;
const PHONE_BASE_H = 530;

const phoneBackSrc = "/images/iphone-16-plus-pink-back.png";

const sideButtonMetal: CSSProperties = {
  background: `linear-gradient(
    90deg,
    rgba(0,0,0,0.12) 0%,
    rgba(255,255,255,0.35) 22%,
    rgba(255,200,230,0.25) 45%,
    rgba(180,60,110,0.2) 100%
  )`,
  boxShadow: `
    inset 0 1px 0 rgba(255,255,255,0.55),
    inset 0 -1px 2px rgba(80,20,50,0.35),
    0 0 1px rgba(0,0,0,0.15)
  `,
};

function PhoneHardwareChrome() {
  return (
    <>
      {/* Antenna bands (slightly darker injection lines on frame) */}
      <div
        className="pointer-events-none absolute left-0 top-[22%] h-[2px] w-[4px] rounded-full"
        style={{ background: "rgba(120,35,75,0.55)", boxShadow: "0 0 0 1px rgba(255,180,210,0.15)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-0 top-[78%] h-[2px] w-[4px] rounded-full"
        style={{ background: "rgba(120,35,75,0.5)", boxShadow: "0 0 0 1px rgba(255,180,210,0.12)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-0 top-[30%] h-[2px] w-[4px] rounded-full"
        style={{ background: "rgba(120,35,75,0.5)" }}
        aria-hidden
      />
      {/* Left: Action button (short pill) */}
      <div
        className="absolute left-[-3px] top-[92px] w-[3px] h-[22px]"
        style={{ ...sideButtonMetal, borderRadius: "2px 0 0 2px" }}
        aria-hidden
      />
      {/* Left: Volume up / down (two pills) */}
      <div
        className="absolute left-[-3px] top-[126px] w-[3px] h-[24px]"
        style={{ ...sideButtonMetal, borderRadius: "2px 0 0 2px" }}
        aria-hidden
      />
      <div
        className="absolute left-[-3px] top-[156px] w-[3px] h-[24px]"
        style={{ ...sideButtonMetal, borderRadius: "2px 0 0 2px" }}
        aria-hidden
      />
      {/* Right: Side / power button */}
      <div
        className="absolute right-[-3px] top-[118px] w-[3px] h-[72px]"
        style={{ ...sideButtonMetal, borderRadius: "0 2px 2px 0" }}
        aria-hidden
      />
    </>
  );
}

function PhoneFront() {
  return (
    <div
      className="absolute inset-0 h-full w-full overflow-hidden"
      style={{
        ...phoneChassisStyle,
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
    >
      <PhoneHardwareChrome />
      {/* Thin black bezel + inset glossy screen (reference: uniform bezel, squircle inner) */}
      <div
        className="absolute overflow-hidden"
        style={{
          top: 7,
          left: 7,
          right: 7,
          bottom: 7,
          borderRadius: 41,
          background: "#0a0a0a",
          padding: 3,
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06), inset 0 2px 8px rgba(0,0,0,0.65)",
        }}
      >
        <div
          className="relative h-full w-full overflow-hidden"
          style={{
            borderRadius: 38,
            ...screenWallpaperStyle,
            boxShadow: "inset 0 1px 2px rgba(0,0,0,0.35)",
          }}
        >
          <div
            className="absolute left-1/2 z-10 h-[27px] w-[78px] -translate-x-1/2 rounded-full bg-black"
            style={{ top: 11 }}
            aria-hidden
          />
          <div className="flex items-center justify-between px-[18px] pt-[14px]">
            <span className="inline-block translate-x-[40%] text-[9.375px] font-semibold text-white">9:41</span>
            <div
              className="inline-flex -translate-x-[40%] items-center gap-[3.75px] text-white"
              aria-hidden
            >
              <svg width="10.625" height="7.5" viewBox="0 0 17 12" fill="currentColor">
                <path d="M1 8.5h2v2H1v-2zm3.5-2h2v4h-2v-4zm3.5-2h2v6h-2V4.5zm3.5-2h2v8h-2v-8zm3.5-1h2v9h-2v-9z" />
              </svg>
              <svg width="15.625" height="7.5" viewBox="0 0 25 12" fill="none">
                <rect
                  x="1"
                  y="2"
                  width="20"
                  height="8"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  opacity={0.9}
                />
                <path
                  d="M22 4v4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  opacity={0.9}
                />
                <rect x="3" y="4" width="14" height="4" rx="0.5" fill="currentColor" />
              </svg>
            </div>
          </div>
          <div className="grid grid-cols-4 justify-items-center gap-x-3 gap-y-2.5 px-5 pt-8">
            {HOME_SCREEN_LAYOUT.map((appIndex, i) => {
              const app = appIndex !== null ? apps[appIndex] : undefined;
              if (app) {
                return (
                  <a
                    key={app.name}
                    href={app.storeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex min-w-0 w-full touch-manipulation flex-col items-center gap-1.5 rounded-xl text-center outline-none transition-[transform,opacity] duration-200 ease-out focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent active:opacity-90"
                  >
                    <span className="relative block shrink-0 transition-[transform,filter,box-shadow] duration-200 ease-out will-change-transform group-hover:scale-[1.12] group-hover:shadow-lg group-hover:brightness-110 group-active:scale-95 group-active:brightness-95">
                      <Image
                        src={app.iconSrc}
                        alt={`${app.name} — opens in ${app.storeLabel}`}
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-[11px] shadow-md"
                        sizes="40px"
                      />
                    </span>
                    <span className="line-clamp-2 min-h-[20px] w-full px-0 text-[6px] font-medium leading-[1.1] tracking-tight text-white/90 transition-colors duration-200 group-hover:text-white">
                      {app.name}
                    </span>
                  </a>
                );
              }
              return (
                <div
                  key={`slot-${i}`}
                  className="flex flex-col items-center gap-1.5 text-center"
                  aria-hidden
                >
                  <div className="h-10 w-10" />
                  <span className="min-h-[20px]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function PhoneBack() {
  return (
    <div
      className="absolute inset-0 h-full w-full overflow-hidden"
      style={{
        borderRadius: 48,
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transform: "rotateY(180deg)",
        boxShadow: "0 20px 44px rgba(0,0,0,0.38)",
      }}
    >
      <Image
        src={phoneBackSrc}
        alt=""
        fill
        className="object-cover object-center"
        sizes={`${Math.round(PHONE_BASE_W * PHONE_MOCKUP_SCALE)}px`}
        draggable={false}
      />
    </div>
  );
}

function PhoneMockup() {
  const outerW = PHONE_BASE_W * PHONE_MOCKUP_SCALE;
  const outerH = PHONE_BASE_H * PHONE_MOCKUP_SCALE;

  return (
    <div
      className="mx-auto flex items-center justify-center"
      style={{
        perspective: "1400px",
        width: outerW,
        height: outerH,
      }}
    >
      <div
        className="relative origin-center"
        style={{
          width: PHONE_BASE_W,
          height: PHONE_BASE_H,
          transformStyle: "preserve-3d",
          transform: `scale(${PHONE_MOCKUP_SCALE}) rotateY(0deg)`,
        }}
      >
        <PhoneFront />
        <PhoneBack />
      </div>
    </div>
  );
}

export function CornellAppDevCaseStudyClient() {
  return (
    <CaseStudyPageShell
      title="Cornell AppDev"
      dateRange="2020 — 2022"
      glowBackground="radial-gradient(ellipse 70% 58% at 50% 38%, rgba(244, 184, 218, 0.14), transparent 70%)"
      meta={
        <>
          <span>Designer</span>
          <MetaDot />
          <span>iOS, Android & Web</span>
          <MetaDot />
          <span className="inline-flex items-center gap-1.5">
            <Image
              src="/images/figma-app-icon.png"
              alt="Figma"
              width={20}
              height={20}
              className="h-5 w-5 shrink-0 object-contain"
              sizes="20px"
            />
            <Image
              src="/images/notion-app-icon.png"
              alt="Notion"
              width={16}
              height={16}
              className="h-4 w-4 shrink-0 object-contain"
              sizes="16px"
            />
          </span>
          <MetaDot />
          <a
            href="https://www.cornellappdev.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-white/45 transition-colors hover:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            cornellappdev.com
            <ExternalLinkIcon className="opacity-70" />
          </a>
        </>
      }
    >
      <PhoneMockup />
    </CaseStudyPageShell>
  );
}
