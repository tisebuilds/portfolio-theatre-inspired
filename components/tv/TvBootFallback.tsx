/** Shown in the initial HTML while the TV shell hydrates, so the first visit is static instead of a blank screen. */
export function TvBootFallback() {
  return (
    <div className="fixed inset-0 bg-tv-bg" aria-hidden>
      <div className="hidden h-full md:flex">
        <div className="w-[290px] shrink-0" />
        <div className="relative m-2 min-w-0 flex-1 overflow-hidden rounded-[12px] border border-white/[0.06] bg-[#141414]">
          <div className="tv-boot-static absolute inset-0" />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `repeating-linear-gradient(
                0deg,
                transparent 0px,
                transparent 2px,
                rgba(0,0,0,0.28) 2px,
                rgba(0,0,0,0.28) 3px
              )`,
              mixBlendMode: "multiply",
            }}
          />
        </div>
      </div>
    </div>
  );
}
