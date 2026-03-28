import type { ReactNode } from "react";

type CrtTelevisionProps = {
  children: ReactNode;
  isOn?: boolean;
  channelNumber?: number;
  onChannelUp?: () => void;
  onChannelDown?: () => void;
};

export function CrtTelevision({
  children,
  isOn = true,
  channelNumber,
  onChannelUp,
  onChannelDown,
}: CrtTelevisionProps) {
  const hasChannelControls =
    channelNumber !== undefined && onChannelUp && onChannelDown;

  return (
    <div className="relative mx-auto w-full max-w-3xl">
      <div className="relative rounded sm:rounded-lg border border-neutral-700 bg-neutral-800 p-1.5 sm:p-3 sm:pb-2.5">
        <div className="relative aspect-video overflow-hidden rounded-sm sm:rounded bg-black">
          {children}
        </div>

        {/* Controls row */}
        <div className="mt-2 sm:mt-3 flex items-center justify-center pb-0 sm:pb-1">
          {hasChannelControls ? (
            <div className="flex flex-col items-center gap-0.5 sm:gap-1.5">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={onChannelDown}
                  className="flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded bg-neutral-300 text-neutral-600 transition-colors hover:bg-neutral-200 active:scale-95"
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
                <span className="flex h-6 sm:h-8 min-w-[1.75rem] sm:min-w-[2.5rem] items-center justify-center rounded bg-accent px-2 sm:px-3 text-xs sm:text-sm font-black tabular-nums text-white">
                  {channelNumber}
                </span>
                <button
                  onClick={onChannelUp}
                  className="flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded bg-neutral-300 text-neutral-600 transition-colors hover:bg-neutral-200 active:scale-95"
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
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-400">
                Projects TV
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-0.5 sm:gap-1.5">
              <div className="flex gap-1.5 sm:gap-2">
                <div className="h-3 w-3 sm:h-4 sm:w-4 rounded bg-neutral-500" />
                <div className="h-3 w-3 sm:h-4 sm:w-4 rounded bg-neutral-500" />
                <div className="h-3 w-3 sm:h-4 sm:w-4 rounded bg-neutral-500" />
              </div>
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.25em] text-neutral-400">
                Projects TV
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
