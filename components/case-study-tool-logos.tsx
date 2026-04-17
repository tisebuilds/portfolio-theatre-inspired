import Image from "next/image";
import type { SVGProps } from "react";
import { SITE_MEDIA } from "@/lib/site-media";

/** Logos from Simple Icons (CC0) — compact row for case study meta. */
const iconClass = "h-4 w-4 shrink-0 text-white/45";

const metaRowImage = "h-5 w-5 shrink-0 object-contain";
const metaRowMonoSvg = "h-5 w-5 shrink-0 text-white/55";

function ToolSvg({
  children,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={iconClass}
      aria-hidden
      {...props}
    >
      {children}
    </svg>
  );
}

export function WorkplaceToolLogo() {
  return (
    <ToolSvg>
      <path
        fill="currentColor"
        d="M23.268 10.541C23.268 4.715 18.544 0 12.728 0c-1.614 0-3.191.317-4.663.952a11.952 11.952 0 00-3.817 2.574 11.915 11.915 0 00-3.516 8.478 11.924 11.924 0 003.516 8.48 12.05 12.05 0 003.817 2.573c1.472.626 3.05.943 4.671.943 1.56 0 3.05-.3 4.416-.837l-.908-2.292a9.448 9.448 0 01-3.508.67 9.481 9.481 0 01-6.743-2.794A9.481 9.481 0 013.2 12.004c0-2.547.996-4.944 2.794-6.742a9.496 9.496 0 016.743-2.794 8.072 8.072 0 016.734 12.524l-2.098-5.165c-.308-.758-.679-1.895-2.071-1.895-1.393 0-1.763 1.146-2.063 1.895l-1.93 4.769-2.591-6.54H5.993l3.226 7.95c.326.802.688 1.895 2.09 1.895 1.4 0 1.753-1.093 2.08-1.895l1.912-4.724 1.921 4.724c.388.978.802 1.895 2.08 1.895.908 0 1.481-.582 1.798-.96a10.493 10.493 0 002.168-6.4Z"
      />
    </ToolSvg>
  );
}

export function LoomToolLogo() {
  return (
    <ToolSvg>
      <path
        fill="currentColor"
        d="M24 10.665h-7.018l6.078-3.509-1.335-2.312-6.078 3.509 3.508-6.077L16.843.94l-3.508 6.077V0h-2.67v7.018L7.156.94 4.844 2.275l3.509 6.077-6.078-3.508L.94 7.156l6.078 3.509H0v2.67h7.017L.94 16.844l1.335 2.313 6.077-3.508-3.509 6.077 2.312 1.335 3.509-6.078V24h2.67v-7.017l3.508 6.077 2.312-1.335-3.509-6.078 6.078 3.509 1.335-2.313-6.077-3.508h7.017v-2.67H24zm-12 4.966a3.645 3.645 0 1 1 0-7.29 3.645 3.645 0 0 1 0 7.29z"
      />
    </ToolSvg>
  );
}

export function CaseStudyToolLogoStrip() {
  return (
    <span
      className="inline-flex items-center gap-[5px]"
      aria-label="Tools used: Figma, Google Docs, Workplace, and Loom"
    >
      <span className="inline-flex" title="Figma">
        <Image
          src={SITE_MEDIA.toolIcons.figma}
          alt=""
          width={20}
          height={20}
          className={metaRowImage}
          sizes="20px"
        />
      </span>
      <span className="inline-flex" title="Google Docs">
        <Image
          src={SITE_MEDIA.toolIcons.googleDocs}
          alt=""
          width={20}
          height={20}
          className={metaRowImage}
          sizes="20px"
        />
      </span>
      <span className="inline-flex" title="Workplace">
        <WorkplaceToolLogo />
      </span>
      <span className="inline-flex" title="Loom">
        <LoomToolLogo />
      </span>
    </span>
  );
}

/** Dropbox (Simple Icons, CC0) — used for Dropbox Paper in tool rows. */
function DropboxToolLogoMeta() {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={metaRowMonoSvg}
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M6 1.807L0 5.629l6 3.822 6.001-3.822L6 1.807zM18 1.807l-6 3.822 6 3.822 6-3.822-6-3.822zM0 13.274l6 3.822 6.001-3.822L6 9.452l-6 3.822zM18 9.452l-6 3.822 6 3.822 6-3.822-6-3.822zM6 18.371l6.001 3.822 6-3.822-6-3.822L6 18.371z"
      />
    </svg>
  );
}

function LoomToolLogoMeta() {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={metaRowMonoSvg}
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M24 10.665h-7.018l6.078-3.509-1.335-2.312-6.078 3.509 3.508-6.077L16.843.94l-3.508 6.077V0h-2.67v7.018L7.156.94 4.844 2.275l3.509 6.077-6.078-3.508L.94 7.156l6.078 3.509H0v2.67h7.017L.94 16.844l1.335 2.313 6.077-3.508-3.509 6.077 2.312 1.335 3.509-6.078V24h2.67v-7.017l3.508 6.077 2.312-1.335-3.509-6.078 6.078 3.509 1.335-2.313-6.077-3.508h7.017v-2.67H24zm-12 4.966a3.645 3.645 0 1 1 0-7.29 3.645 3.645 0 0 1 0 7.29z"
      />
    </svg>
  );
}

/** Anthropic (Simple Icons, CC0) — Claude / Co-Work in meta rows. */
function AnthropicToolLogoMeta() {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={metaRowMonoSvg}
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z"
      />
    </svg>
  );
}

/** Claude (Anthropic) + Figma — dinner party case study meta. */
export function DinnerPartyCaseStudyToolLogoStrip() {
  return (
    <span
      className="inline-flex items-center gap-[5px] align-middle"
      role="img"
      aria-label="Claude, Figma"
    >
      <span className="inline-flex" title="Claude">
        <AnthropicToolLogoMeta />
      </span>
      <Image
        src={SITE_MEDIA.toolIcons.figma}
        alt=""
        width={20}
        height={20}
        className={metaRowImage}
        sizes="20px"
      />
    </span>
  );
}

/** Matches Disney case study meta: PNG app icons + mono SVGs where needed. */
export function FigmaCaseStudyToolLogoStrip() {
  return (
    <span
      className="inline-flex items-center gap-[5px] align-middle"
      role="img"
      aria-label="Figma, FigJam, Dropbox Paper, Slack, Loom"
    >
      <Image
        src={SITE_MEDIA.toolIcons.figma}
        alt=""
        width={20}
        height={20}
        className={metaRowImage}
        sizes="20px"
      />
      <Image
        src={SITE_MEDIA.toolIcons.figjam}
        alt=""
        width={20}
        height={20}
        className={metaRowImage}
        sizes="20px"
      />
      <span className="inline-flex" title="Dropbox Paper">
        <DropboxToolLogoMeta />
      </span>
      <Image
        src={SITE_MEDIA.toolIcons.slack}
        alt=""
        width={20}
        height={20}
        className={metaRowImage}
        sizes="20px"
      />
      <span className="inline-flex" title="Loom">
        <LoomToolLogoMeta />
      </span>
    </span>
  );
}
