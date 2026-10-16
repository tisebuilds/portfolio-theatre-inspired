import Image from "next/image";
import { SITE_MEDIA } from "@/lib/site-media";

const metaRowImage = "h-5 w-5 shrink-0 object-contain";
const metaRowMonoSvg = "h-5 w-5 shrink-0 text-white/55";

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
