"use client";

import Image from "next/image";
import { type CSSProperties } from "react";
import { SITE_MEDIA } from "@/lib/site-media";

const storeApps = [
  {
    name: "Volume",
    storeUrl:
      "https://play.google.com/store/apps/details?id=com.cornellappdev.android.volume&pli=1",
    iconSrc: SITE_MEDIA.appDev.volumeAppIcon,
    storeLabel: "Google Play",
  },
  {
    name: "CourseGrab",
    storeUrl: "https://apps.apple.com/us/app/coursegrab/id1510823691",
    iconSrc: SITE_MEDIA.appDev.coursegrabAppIcon,
    storeLabel: "App Store",
  },
] as const;

type HomeSlot =
  | { kind: "store"; index: 0 | 1 }
  | {
      kind: "web";
      href: string;
      label: string;
      ariaLabel: string;
    }
  | { kind: "journal"; href: string; label: string };

function buildHomeSlots(opts?: {
  dpdCourse?: { url: string; label: string; ariaLabel: string };
  journal?: { url: string; label: string };
}): HomeSlot[] {
  const slots: HomeSlot[] = [
    { kind: "store", index: 0 },
    { kind: "store", index: 1 },
  ];
  if (opts?.dpdCourse?.url) {
    slots.push({
      kind: "web",
      href: opts.dpdCourse.url,
      label: opts.dpdCourse.label.trim() || "DPD",
      ariaLabel: opts.dpdCourse.ariaLabel,
    });
  }
  if (opts?.journal?.url) {
    slots.push({
      kind: "journal",
      href: opts.journal.url,
      label: opts.journal.label.trim() || "Journal",
    });
  }
  return slots;
}

/** Row-major 4×4: `null` = empty, number = index into slot list from `buildHomeSlots` */
function homeScreenLayout(slotCount: number): (number | null)[] {
  const row0 =
    slotCount >= 4
      ? ([0, 1, 2, 3] as const)
      : slotCount === 3
        ? ([null, 0, 1, 2] as const)
        : ([null, 0, 1, null] as const);
  return [
    ...row0,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ];
}

function JournalAppIcon() {
  return (
    <span
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] shadow-md"
      style={{
        background:
          "linear-gradient(145deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 42%), linear-gradient(160deg, #5c2d6e 0%, #3d1f4d 55%, #2a1538 100%)",
        boxShadow:
          "0 4px 12px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.2)",
      }}
      aria-hidden
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        className="text-white/95"
      >
        <path
          d="M7 4.5h7a3 3 0 0 1 3 3v13a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-12a2 2 0 0 1 2-2Z"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinejoin="round"
        />
        <path
          d="M14 4.5v15h3a1 1 0 0 0 1-1v-11a3 3 0 0 0-3-3h-1Z"
          fill="currentColor"
          opacity={0.12}
        />
        <path
          d="M9 9.5h5M9 12.5h5M9 15.5h3.5"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity={0.9}
        />
      </svg>
    </span>
  );
}

function DpdCourseAppIcon() {
  return (
    <span
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] shadow-md"
      style={{
        background:
          "linear-gradient(145deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 40%), linear-gradient(155deg, #0d9488 0%, #0f766e 48%, #115e59 100%)",
        boxShadow:
          "0 4px 12px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.22)",
      }}
      aria-hidden
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        className="text-white/95"
      >
        <rect
          x="4.5"
          y="5.5"
          width="15"
          height="11"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.35"
        />
        <path
          d="M7 12.5h5M7 15h3.5"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity={0.85}
        />
        <path
          d="m15.2 7.8 3.5 3.5a.9.9 0 0 1 0 1.27l-5.1 5.1H10v-3.6l5.1-5.1a.9.9 0 0 1 1.27 0Z"
          stroke="currentColor"
          strokeWidth="1.15"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/** Outer chassis: matte pink glass + soft top-left light (reference: iPhone 16 pink — avoid stacked “specular” bands) */
const phoneChassisStyle: CSSProperties = {
  borderRadius: 48,
  background: [
    "linear-gradient(125deg, rgba(255,255,255,0.11) 0%, rgba(255,255,255,0) 38%, rgba(0,0,0,0.04) 100%)",
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
  backgroundImage: `url(${SITE_MEDIA.appDev.iphonePinkWallpaper})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

const PHONE_MOCKUP_SCALE = 1.52;
const PHONE_BASE_W = 260;
const PHONE_BASE_H = 530;

const phoneBackSrc = SITE_MEDIA.appDev.iphonePlusPinkBack;

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
      <div
        className="absolute left-[-3px] top-[92px] w-[3px] h-[22px]"
        style={{ ...sideButtonMetal, borderRadius: "2px 0 0 2px" }}
        aria-hidden
      />
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
      <div
        className="absolute right-[-3px] top-[118px] w-[3px] h-[72px]"
        style={{ ...sideButtonMetal, borderRadius: "0 2px 2px 0" }}
        aria-hidden
      />
    </>
  );
}

function PhoneFront({ slots }: { slots: HomeSlot[] }) {
  const layout = homeScreenLayout(slots.length);
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
            {layout.map((slotIndex, i) => {
              const slot =
                slotIndex !== null ? slots[slotIndex] : undefined;
              if (slot?.kind === "store") {
                const app = storeApps[slot.index];
                return (
                  <a
                    key={`${app.name}-${i}`}
                    href={app.storeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex min-w-0 w-full touch-manipulation flex-col items-center gap-0.5 rounded-xl text-center outline-none transition-[transform,opacity] duration-200 ease-out focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent active:opacity-90"
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
                    <span className="line-clamp-2 min-h-[14px] w-full px-0 text-[6px] font-medium leading-[1.05] tracking-tight text-white/90 transition-colors duration-200 group-hover:text-white">
                      {app.name}
                    </span>
                  </a>
                );
              }
              if (slot?.kind === "web") {
                return (
                  <a
                    key={`web-${i}`}
                    href={slot.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex min-w-0 w-full touch-manipulation flex-col items-center gap-0.5 rounded-xl text-center outline-none transition-[transform,opacity] duration-200 ease-out focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent active:opacity-90"
                    aria-label={`${slot.ariaLabel} (opens in new tab)`}
                  >
                    <span className="relative block shrink-0 transition-[transform,filter,box-shadow] duration-200 ease-out will-change-transform group-hover:scale-[1.12] group-hover:shadow-lg group-hover:brightness-110 group-active:scale-95 group-active:brightness-95">
                      <DpdCourseAppIcon />
                    </span>
                    <span className="line-clamp-2 min-h-[14px] w-full px-0 text-[6px] font-medium leading-[1.05] tracking-tight text-white/90 transition-colors duration-200 group-hover:text-white">
                      {slot.label}
                    </span>
                  </a>
                );
              }
              if (slot?.kind === "journal") {
                return (
                  <a
                    key={`journal-${i}`}
                    href={slot.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex min-w-0 w-full touch-manipulation flex-col items-center gap-0.5 rounded-xl text-center outline-none transition-[transform,opacity] duration-200 ease-out focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent active:opacity-90"
                    aria-label={`${slot.label} — opens case journal in new tab`}
                  >
                    <span className="relative block shrink-0 transition-[transform,filter,box-shadow] duration-200 ease-out will-change-transform group-hover:scale-[1.12] group-hover:shadow-lg group-hover:brightness-110 group-active:scale-95 group-active:brightness-95">
                      <JournalAppIcon />
                    </span>
                    <span className="line-clamp-2 min-h-[14px] w-full px-0 text-[6px] font-medium leading-[1.05] tracking-tight text-white/90 transition-colors duration-200 group-hover:text-white">
                      {slot.label}
                    </span>
                  </a>
                );
              }
              return (
                <div
                  key={`slot-${i}`}
                  className="flex flex-col items-center gap-0.5 text-center"
                  aria-hidden
                >
                  <div className="h-10 w-10" />
                  <span className="min-h-[14px]" />
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

export type AppDevPhoneMockupProps = {
  /** Case-study journal (Flipsnack etc.); shown as a home-screen app icon. */
  journalUrl?: string;
  journalLabel?: string;
  /** Intro to Digital Product Design course page on cornellappdev.com */
  dpdCourseUrl?: string;
  dpdCourseLabel?: string;
};

export function AppDevPhoneMockup({
  journalUrl,
  journalLabel = "Journal",
  dpdCourseUrl,
  dpdCourseLabel = "DPD",
}: AppDevPhoneMockupProps) {
  const slots = buildHomeSlots({
    dpdCourse: dpdCourseUrl
      ? {
          url: dpdCourseUrl,
          label: dpdCourseLabel,
          ariaLabel:
            "Intro to Digital Product Design — Cornell AppDev course page",
        }
      : undefined,
    journal: journalUrl
      ? { url: journalUrl, label: journalLabel }
      : undefined,
  });
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
        <PhoneFront slots={slots} />
        <PhoneBack />
      </div>
    </div>
  );
}
