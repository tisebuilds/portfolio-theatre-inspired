"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useEffect, useState } from "react";
import workData from "@/data/work.json";
import type { WorkExperience } from "@/app/types";

const experiences = workData as WorkExperience[];

const LINKEDIN_URL = "https://linkedin.com/in/yourprofile";
const RESUME_URL = "/resume.pdf";
const EMAIL = "hello@example.com";

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

function ResumeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function EmailIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

const navLink =
  "text-[15px] text-neutral-500 hover:text-white transition-colors duration-200";
const navLinkActive =
  "text-[15px] text-white transition-colors duration-200";
const iconBtn =
  "text-neutral-500 hover:text-white transition-colors duration-200 p-1.5 rounded-full hover:bg-neutral-800/40";

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
  { key: "projects", label: "Projects", href: "/projects" },
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
      <div className="w-full px-8 h-[52px] flex items-center">
        {/* Left Navigation */}
        <div className="flex-1 flex items-center gap-7">
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
        <Link href="/" className="flex-shrink-0 group">
          <div className="w-10 h-10 rounded-full border border-neutral-700 group-hover:border-neutral-500 flex items-center justify-center transition-colors duration-200">
            <span className="font-serif italic text-[15px] text-neutral-300 group-hover:text-white transition-colors duration-200 select-none">
              Tise
            </span>
          </div>
        </Link>

        {/* Right Actions */}
        <div className="flex-1 flex items-center justify-end gap-7">
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
              href={RESUME_URL}
              className={iconBtn}
              aria-label="Resume"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ResumeIcon />
            </Link>
            <Link
              href={`mailto:${EMAIL}`}
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
