"use client";

import Link from "next/link";
import { FileText, Mail, User } from "lucide-react";
import {
  SITE_EMAIL as EMAIL,
  SITE_LINKEDIN as LINKEDIN_URL,
  SITE_TWITTER as TWITTER_URL,
} from "@/lib/site";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2H21.552L14.328 10.27L22.824 22H16.172L10.96 15.374L5.136 22H1.824L9.552 13.18L1.404 2H8.224L12.944 8.05L18.244 2ZM17.088 20H18.92L7.2 3.906H5.236L17.088 20Z" />
    </svg>
  );
}

export function SidebarIcons({
  aboutActive,
  resumeActive,
  onPrimeAudio,
}: {
  aboutActive: boolean;
  resumeActive: boolean;
  onPrimeAudio: () => void;
}) {
  const baseIconClass =
    "inline-flex h-8 w-8 items-center justify-center rounded-lg text-tv-muted transition-colors hover:bg-white/10 hover:text-white active:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30";
  const aboutIconClass = aboutActive
    ? "inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-tv-pink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
    : baseIconClass;
  const resumeIconClass = resumeActive
    ? "inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-tv-pink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
    : baseIconClass;

  return (
    <div className="flex justify-center gap-3 px-1 pt-1">
      <Link
        href="/?view=about"
        className={aboutIconClass}
        aria-label="About"
        onPointerDown={onPrimeAudio}
      >
        <User className="h-[18px] w-[18px]" aria-hidden />
      </Link>
      <a href={LINKEDIN_URL} className={baseIconClass} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" onPointerDown={onPrimeAudio}>
        <LinkedInIcon className="h-4 w-4" />
      </a>
      <a href={TWITTER_URL} className={baseIconClass} aria-label="X" target="_blank" rel="noopener noreferrer" onPointerDown={onPrimeAudio}>
        <XIcon className="h-4 w-4" />
      </a>
      <Link
        href="/?view=resume"
        className={resumeIconClass}
        aria-label="Resume"
        aria-current={resumeActive ? "page" : undefined}
        onPointerDown={onPrimeAudio}
      >
        <FileText className="h-[18px] w-[18px]" aria-hidden />
      </Link>
      <a
        href={`mailto:${EMAIL}?subject=${encodeURIComponent("Hi, coming from your portfolio.")}`}
        className={baseIconClass}
        aria-label="Email"
        onPointerDown={onPrimeAudio}
      >
        <Mail className="h-[18px] w-[18px]" aria-hidden />
      </a>
    </div>
  );
}

