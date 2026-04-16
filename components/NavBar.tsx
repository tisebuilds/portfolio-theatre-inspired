"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useEffect, useState } from "react";
import workData from "@/data/work.json";
import type { WorkExperience } from "@/app/types";
import {
  SITE_EMAIL as EMAIL,
  SITE_LINKEDIN as LINKEDIN_URL,
  SITE_RESUME as RESUME_URL,
  SITE_TWITTER as TWITTER_URL,
} from "@/lib/site";

const experiences = workData as WorkExperience[];

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.084 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
    </svg>
  );
}

function ResumeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM8 13h8v1.5H8V13zm0 3.5h8V18H8v-1.5z" />
    </svg>
  );
}

function EmailIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v.217l-10 6.364L2 6.217V6zm0 2.383 9.515 6.056a1 1 0 0 0 .97 0L22 8.383V18a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.383z" />
    </svg>
  );
}

const navLink =
  "text-[13px] sm:text-[15px] text-neutral-500 hover:text-white transition-colors duration-200 truncate";
const navLinkActive =
  "text-[13px] sm:text-[15px] text-white transition-colors duration-200 truncate";
const iconBtn =
  "text-neutral-500 hover:text-white transition-colors duration-200 p-1 sm:p-1.5 rounded-full hover:bg-neutral-800/40";

function useClickOutside(
  ref: React.RefObject<HTMLElement | null>,
  open: boolean,
  onClose: () => void,
) {
  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, open, onClose]);
}

function DropdownChevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M7 10l5 5 5-5z" />
    </svg>
  );
}

function DropdownMenu({
  items,
  activeKey,
  onSelect,
}: {
  items: { key: string; label: string; href: string }[];
  activeKey: string;
  onSelect: () => void;
}) {
  return (
    <ul className="absolute left-0 top-full mt-2 min-w-[180px] py-1.5 bg-neutral-900 border border-neutral-800/60 rounded-lg shadow-xl shadow-black/40 z-50">
      {items.map((item) => (
        <li key={item.key}>
          <Link
            href={item.href}
            className={`block px-4 py-2 text-[14px] transition-colors ${
              item.key === activeKey
                ? "text-white bg-neutral-800/50"
                : "text-neutral-400 hover:text-white hover:bg-neutral-800/30"
            }`}
            onClick={onSelect}
            aria-current={item.key === activeKey ? "page" : undefined}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

const sections = [
  { key: "work", label: "Experiences", href: "/" },
  { key: "projects", label: "Projects", href: "/?ch=6" },
  { key: "about", label: "About", href: "/about" },
] as const;

function SectionDropdown({
  activeSection,
}: {
  activeSection: "work" | "projects" | "about";
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, open, () => setOpen(false));

  const active = sections.find((s) => s.key === activeSection)!;

  return (
    <div className="relative whitespace-nowrap" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`${navLink} inline-flex items-center gap-1.5`}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {active.label}
        <DropdownChevron open={open} />
      </button>
      {open && (
        <DropdownMenu
          items={sections.map((s) => ({
            key: s.key,
            label: s.label,
            href: s.href,
          }))}
          activeKey={activeSection}
          onSelect={() => setOpen(false)}
        />
      )}
    </div>
  );
}

function SubpageDropdown({
  currentTitle,
  currentSlug,
  items,
}: {
  currentTitle: string;
  currentSlug: string;
  items: { slug: string; title: string; href: string }[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, open, () => setOpen(false));

  if (!currentTitle) return null;

  return (
    <div className="relative whitespace-nowrap" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`${navLinkActive} inline-flex items-center gap-1.5`}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {currentTitle}
        <DropdownChevron open={open} />
      </button>
      {open && (
        <DropdownMenu
          items={items.map((i) => ({
            key: i.slug,
            label: i.title,
            href: i.href,
          }))}
          activeKey={currentSlug}
          onSelect={() => setOpen(false)}
        />
      )}
    </div>
  );
}

const burstParticles = [
  { x: -14, y: -16, delay: 0 },
  { x: 16, y: -12, delay: 30 },
  { x: 18, y: 6, delay: 50 },
  { x: 10, y: 16, delay: 20 },
  { x: -12, y: 14, delay: 60 },
  { x: -18, y: -2, delay: 40 },
];

function StarBrand() {
  const [burstKey, setBurstKey] = useState(0);

  return (
    <Link
      href="/"
      className="flex-shrink-0 group relative mx-3 sm:mx-0"
      aria-label="Home"
      onClick={() => setBurstKey((k) => k + 1)}
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5 text-neutral-500 group-hover:text-white transition-all duration-300 group-hover:rotate-90 group-hover:scale-125"
      >
        <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" />
      </svg>
      {burstKey > 0 && (
        <span
          key={burstKey}
          className="absolute inset-0 pointer-events-none overflow-visible"
        >
          {burstParticles.map((p, i) => (
            <svg
              key={i}
              viewBox="0 0 24 24"
              fill="currentColor"
              className="star-particle absolute left-1/2 top-1/2 w-2 h-2 text-white"
              style={
                {
                  "--burst-x": `${p.x}px`,
                  "--burst-y": `${p.y}px`,
                  "--burst-delay": `${p.delay}ms`,
                } as React.CSSProperties
              }
            >
              <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" />
            </svg>
          ))}
        </span>
      )}
    </Link>
  );
}

export function NavBar() {
  const pathname = usePathname();

  const isMainPage =
    pathname === "/" || pathname === "/projects" || pathname === "/about";
  const isSubpage = !isMainPage;

  const activeSection =
    pathname === "/" || pathname.startsWith("/work/")
      ? "work"
      : pathname.startsWith("/projects")
        ? "projects"
        : "about";

  let currentTitle = "";
  let currentSlug = "";
  let sectionItems: { slug: string; title: string; href: string }[] = [];

  if (pathname.startsWith("/work/")) {
    const shippedMatch = pathname.match(/^\/work\/([^/]+)\/shipped\//);
    currentSlug = shippedMatch
      ? shippedMatch[1]
      : pathname.split("/")[2] || "";
    const work = experiences.find((e) => e.slug === currentSlug);
    currentTitle = work?.title || currentSlug;
    sectionItems = experiences.map((e) => ({
      slug: e.slug,
      title: e.title,
      href: `/work/${e.slug}`,
    }));
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#171717]/95 backdrop-blur-xl border-b border-neutral-800/30">
      <div className="w-full px-4 sm:px-8 h-[48px] sm:h-[52px] flex items-center">
        {/* Left Navigation */}
        <div className="flex-1 min-w-0 flex items-center gap-3 sm:gap-7">
          {isSubpage ? (
            <>
              <SectionDropdown activeSection={activeSection} />
              <SubpageDropdown
                currentTitle={currentTitle}
                currentSlug={currentSlug}
                items={sectionItems}
              />
            </>
          ) : (
            <>
              <Link
                href="/"
                className={
                  activeSection === "work" ? navLinkActive : navLink
                }
                aria-current={activeSection === "work" ? "page" : undefined}
              >
                Experiences
              </Link>
              <Link
                href="/projects"
                className={
                  activeSection === "projects" ? navLinkActive : navLink
                }
                aria-current={
                  activeSection === "projects" ? "page" : undefined
                }
              >
                Projects
              </Link>
            </>
          )}
        </div>

        {/* Center Brand */}
        <StarBrand />

        {/* Right Actions */}
        <div className="flex-1 min-w-0 flex items-center justify-end gap-3 sm:gap-7">
          <Link
            href="/about"
            className={activeSection === "about" ? navLinkActive : navLink}
            aria-current={activeSection === "about" ? "page" : undefined}
          >
            About
          </Link>
          <div className="flex items-center gap-1">
            <Link
              href={LINKEDIN_URL}
              className={iconBtn}
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon />
            </Link>
            <Link
              href={TWITTER_URL}
              className={iconBtn}
              aria-label="Twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TwitterIcon />
            </Link>
            <Link
              href={RESUME_URL}
              className={iconBtn}
              aria-label="Resume"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ResumeIcon />
            </Link>
            <Link
              href={`mailto:${EMAIL}?subject=${encodeURIComponent("Hi, coming from your portfolio.")}&body=${encodeURIComponent("Let Tise know why you're connecting (opportunity, coffee chat, etc.)")}`}
              className={iconBtn}
              aria-label="Email"
            >
              <EmailIcon />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
