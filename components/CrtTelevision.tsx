import type { ReactNode } from "react";

type CrtTelevisionProps = {
  children: ReactNode;
  isOn?: boolean;
  channelNumber?: number;
  onChannelUp?: () => void;
  onChannelDown?: () => void;
  externalUrl?: string;
  externalLinkLabel?: string;
};

export function CrtTelevision({
  children,
  isOn = true,
  channelNumber,
  onChannelUp,
  onChannelDown,
  externalUrl,
  externalLinkLabel,
}: CrtTelevisionProps) {
  const hasChannelControls =
    channelNumber !== undefined && onChannelUp && onChannelDown;

  return (
    <div className="relative mx-auto w-full max-w-3xl">
      {/* Outer shell */}
      <div className="relative rounded-lg sm:rounded-2xl bg-neutral-700 p-1.5 pb-1.5 sm:p-5 sm:pb-3">
        {/* Screen bezel */}
        <div className="rounded sm:rounded-lg bg-neutral-500/50 p-1 sm:p-2.5">
          {/* Screen */}
          <div className="relative aspect-video overflow-hidden rounded-md bg-black">
            {children}
          </div>
        </div>

        {/* Controls row */}
        <div className="relative mt-1 sm:mt-3 flex items-center justify-center pb-0 sm:pb-1">
          {hasChannelControls ? (
            <div className="flex flex-col items-center gap-0.5 sm:gap-1.5">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={onChannelDown}
                  className="flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-sm bg-neutral-300 text-neutral-600 transition-colors hover:bg-neutral-200 active:scale-95"
                  aria-label="Previous channel"
                >
                  <svg
                    className="h-2 w-2 sm:h-2.5 sm:w-2.5"
                    viewBox="0 0 10 6"
                    fill="currentColor"
                  >
                    <path d="M5 6L0 0h10z" />
                  </svg>
                </button>
                <span className="flex h-6 sm:h-8 min-w-[1.75rem] sm:min-w-[2.5rem] items-center justify-center rounded-sm bg-fuchsia-400 px-2 sm:px-3 text-xs sm:text-sm font-black tabular-nums text-white">
                  {channelNumber}
                </span>
                <button
                  onClick={onChannelUp}
                  className="flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-sm bg-neutral-300 text-neutral-600 transition-colors hover:bg-neutral-200 active:scale-95"
                  aria-label="Next channel"
                >
                  <svg
                    className="h-2 w-2 sm:h-2.5 sm:w-2.5"
                    viewBox="0 0 10 6"
                    fill="currentColor"
                  >
                    <path d="M5 0l5 6H0z" />
                  </svg>
                </button>
              </div>
              <span className="text-[7px] sm:text-[8px] font-bold uppercase tracking-[0.25em] text-neutral-400">
                Projects TV
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-0.5 sm:gap-1.5">
              <div className="flex gap-1.5 sm:gap-2">
                <div className="h-3 w-3 sm:h-4 sm:w-4 rounded-sm bg-neutral-500" />
                <div className="h-3 w-3 sm:h-4 sm:w-4 rounded-sm bg-neutral-500" />
                <div className="h-3 w-3 sm:h-4 sm:w-4 rounded-sm bg-neutral-500" />
              </div>
              <span className="text-[7px] sm:text-[8px] font-bold uppercase tracking-[0.25em] text-neutral-400">
                Projects TV
              </span>
            </div>
          )}

          {externalUrl && (
            <a
              href={externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute right-0 top-0.5 flex items-center gap-0.5 sm:gap-1 rounded-sm bg-neutral-600/80 px-1.5 py-0.5 sm:px-2 sm:py-1 text-[7px] sm:text-[9px] font-bold uppercase tracking-wider text-neutral-400 transition-colors hover:bg-neutral-500 hover:text-white"
            >
              <span>{externalLinkLabel || "Visit"}</span>
              <svg
                className="h-1.5 w-1.5 sm:h-2.5 sm:w-2.5"
                viewBox="0 0 10 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 1h6v6" />
                <path d="M9 1L1 9" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
