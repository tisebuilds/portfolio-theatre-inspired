"use client";

type RemotePillProps = {
  channelDisplay: string;
  accentClass: string;
  onUp: () => void;
  onDown: () => void;
  disabled?: boolean;
};

export function RemotePill({
  channelDisplay,
  accentClass,
  onUp,
  onDown,
  disabled,
}: RemotePillProps) {
  return (
    <div
      className="mt-auto flex w-full shrink-0 items-center justify-center gap-1 px-1 py-2"
      style={{
        background: "#161616",
        borderRadius: 28,
        boxShadow: "inset 0 1px 3px rgba(0,0,0,0.6)",
      }}
    >
      <button
        type="button"
        aria-label="Previous channel"
        disabled={disabled}
        onClick={onUp}
        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-neutral-300 transition-transform active:translate-y-px disabled:cursor-not-allowed disabled:opacity-40"
        style={{
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.07), inset 0 -1px 0 rgba(0,0,0,0.5)",
        }}
      >
        <svg className="h-2.5 w-2.5" viewBox="0 0 10 6" fill="currentColor" aria-hidden>
          <path d="M5 6L0 0h10z" />
        </svg>
      </button>
      <span
        className={`min-w-[5.5rem] flex-1 select-none text-center font-mono text-[11px] font-semibold tabular-nums tracking-wider sm:text-xs ${accentClass}`}
      >
        {channelDisplay}
      </span>
      <button
        type="button"
        aria-label="Next channel"
        disabled={disabled}
        onClick={onDown}
        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-neutral-300 transition-transform active:translate-y-px disabled:cursor-not-allowed disabled:opacity-40"
        style={{
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.07), inset 0 -1px 0 rgba(0,0,0,0.5)",
        }}
      >
        <svg className="h-2.5 w-2.5" viewBox="0 0 10 6" fill="currentColor" aria-hidden>
          <path d="M5 0l5 6H0z" />
        </svg>
      </button>
    </div>
  );
}
