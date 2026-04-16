"use client";

import Link from "next/link";
import type { Project } from "@/app/types";

type VhsCassetteProps = {
  project: Project;
  isActive: boolean;
  onHover: (slug: string) => void;
  onLeave: () => void;
  themeIndex: number;
};

const TAPE_THEMES = [
  {
    bg: "bg-stone-100",
    border: "border-stone-300",
    title: "text-stone-800",
    sub: "text-stone-500",
    accent: "bg-stone-300",
    stickerBg: "bg-pink-100",
    stickerText: "text-stone-800",
    brand: "STROVA",
    brandSub: "VIDEOCASSETTE",
    detail: "Fine Grain",
  },
  {
    bg: "bg-red-600",
    border: "border-red-700",
    title: "text-white",
    sub: "text-red-200",
    accent: "bg-red-800",
    stickerBg: "bg-white",
    stickerText: "text-red-700",
    brand: "DIRC",
    brandSub: "EXTRA QUALITY",
    detail: "8 HRS",
  },
  {
    bg: "bg-blue-950",
    border: "border-blue-800",
    title: "text-blue-100",
    sub: "text-blue-400",
    accent: "bg-blue-800",
    stickerBg: "bg-white",
    stickerText: "text-blue-900",
    brand: "LUX",
    brandSub: "T-120",
    detail: "Brilliant Color",
  },
  {
    bg: "bg-emerald-800",
    border: "border-emerald-700",
    title: "text-emerald-100",
    sub: "text-emerald-300",
    accent: "bg-emerald-950",
    stickerBg: "bg-yellow-100",
    stickerText: "text-emerald-900",
    brand: "VERA",
    brandSub: "PREMIUM",
    detail: "Hi-Fi Stereo",
  },
  {
    bg: "bg-violet-900",
    border: "border-violet-700",
    title: "text-violet-100",
    sub: "text-violet-300",
    accent: "bg-violet-950",
    stickerBg: "bg-white",
    stickerText: "text-violet-900",
    brand: "PRISM",
    brandSub: "T-160",
    detail: "Studio Grade",
  },
  {
    bg: "bg-fuchsia-800",
    border: "border-fuchsia-600",
    title: "text-fuchsia-100",
    sub: "text-fuchsia-300",
    accent: "bg-fuchsia-950",
    stickerBg: "bg-white",
    stickerText: "text-fuchsia-800",
    brand: "AURO",
    brandSub: "HIGH GRADE",
    detail: "Vivid Color",
  },
  {
    bg: "bg-neutral-900",
    border: "border-neutral-700",
    title: "text-neutral-100",
    sub: "text-neutral-400",
    accent: "bg-neutral-800",
    stickerBg: "bg-accent",
    stickerText: "text-white",
    brand: "NOTE",
    brandSub: "FROM THE DIRECTOR",
    detail: "Personal Cut",
  },
];

export function VhsCassette({
  project,
  isActive,
  onHover,
  onLeave,
  themeIndex,
}: VhsCassetteProps) {
  const theme = TAPE_THEMES[themeIndex % TAPE_THEMES.length];

  return (
    <Link
      href={`/projects/${project.slug}`}
      onMouseEnter={() => onHover(project.slug)}
      onMouseLeave={onLeave}
      className={`group relative block w-40 shrink-0 transition-all duration-300 ease-spring ${
        isActive ? "-translate-y-2 scale-105" : "hover:-translate-y-1"
      }`}
    >
      {/* Active glow */}
      {isActive && (
        <div className="pointer-events-none absolute -inset-1.5 rounded-xl bg-white/5 blur-md" />
      )}

      <div
        className={`relative overflow-hidden rounded-lg border ${theme.bg} ${theme.border} p-3 shadow-lg transition-shadow ${
          isActive ? "shadow-xl" : "group-hover:shadow-xl"
        }`}
        style={{ aspectRatio: "3 / 4" }}
      >
        {/* Brand name */}
        <div className="mb-0.5">
          <span
            className={`text-base font-black uppercase leading-none tracking-tight ${theme.title}`}
          >
            {theme.brand}
          </span>
        </div>
        <div className={`text-[8px] font-semibold uppercase tracking-wider ${theme.sub}`}>
          {theme.brandSub}
        </div>

        {/* Tape window */}
        <div className={`mx-auto mt-3 flex h-8 items-center justify-center rounded ${theme.accent}`}>
          <div className="flex gap-2">
            <div className="h-4 w-4 rounded-full border border-black/20 bg-black/30" />
            <div className="h-4 w-4 rounded-full border border-black/20 bg-black/30" />
          </div>
        </div>

        {/* Year sticker */}
        <div className="mt-3 flex justify-center">
          <span
            className={`inline-block -rotate-1 rounded px-2.5 py-1 text-lg font-black tabular-nums ${theme.stickerBg} ${theme.stickerText}`}
          >
            {project.dateRange ?? "—"}
          </span>
        </div>

        {/* Detail text */}
        <div className={`mt-2 text-center text-[8px] font-medium uppercase tracking-wider ${theme.sub}`}>
          {theme.detail}
        </div>

        {/* Project title */}
        <div className={`mt-auto pt-1.5 text-center text-[9px] font-bold uppercase tracking-widest ${theme.title}`}>
          {project.title}
        </div>

        {/* VHS badge */}
        <div className="absolute bottom-2.5 right-2.5">
          <span
            className={`inline-flex items-center rounded-sm border px-1 py-0.5 text-[6px] font-bold uppercase tracking-wider ${theme.border} ${theme.title}`}
          >
            VHS
          </span>
        </div>
      </div>
    </Link>
  );
}
