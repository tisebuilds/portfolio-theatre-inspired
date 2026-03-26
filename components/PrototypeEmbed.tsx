type PrototypeEmbedProps = {
  url: string;
  type?: "figma" | "image" | "embed" | "browser";
  title: string;
  tabTitle?: string;
  urlBarText?: string;
};

/** Chrome-style browser frame: tabs, toolbar with omnibox, then content */
function BrowserFrame({
  src,
  alt,
  urlBarText = "app.ramp.com/treasury",
  tabTitle = "Problem 1",
}: {
  src: string;
  alt: string;
  urlBarText?: string;
  tabTitle?: string;
}) {
  return (
    <div className="w-full max-w-4xl mx-auto rounded-t-lg overflow-hidden border border-neutral-600 bg-[#202124] shadow-2xl shadow-black/50">
      {/* Chrome tab bar */}
      <div className="flex items-end h-9 min-h-[36px] px-2 pt-1.5 gap-0.5 bg-[#323232] border-b border-neutral-600">
        {/* Active tab */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-t-md bg-[#202124] border border-b-0 border-neutral-600 text-neutral-300 min-w-0 max-w-[240px]">
          <svg className="w-4 h-4 shrink-0 text-emerald-500/90" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
          <span className="truncate text-[13px]">{tabTitle}</span>
        </div>
      </div>
      {/* Chrome toolbar: back, forward, reload, omnibox */}
      <div className="flex items-center gap-2 h-9 min-h-[36px] px-3 py-1.5 bg-[#202124] border-b border-neutral-700">
        <button type="button" className="p-1.5 rounded-md text-neutral-400 hover:text-neutral-200 hover:bg-neutral-700/80" aria-label="Back">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" /></svg>
        </button>
        <button type="button" className="p-1.5 rounded-md text-neutral-600 cursor-default" aria-label="Forward" disabled>
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" /></svg>
        </button>
        <button type="button" className="p-1.5 rounded-md text-neutral-400 hover:text-neutral-200 hover:bg-neutral-700/80" aria-label="Reload">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" /></svg>
        </button>
        {/* Omnibox */}
        <div className="flex-1 flex items-center gap-2 min-w-0 ml-2 h-8 px-4 rounded-full bg-neutral-800/90 border border-neutral-600 text-neutral-300">
          <svg className="w-4 h-4 shrink-0 text-emerald-500/90" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
          <span className="truncate text-[13px] font-normal">{urlBarText}</span>
        </div>
        <div className="w-8 shrink-0" />
      </div>
      {/* Browser content area */}
      <div className="overflow-hidden bg-neutral-950">
        <img
          src={src}
          alt={alt}
          className="w-full h-auto object-contain object-top block"
        />
      </div>
    </div>
  );
}

export function PrototypeEmbed({ url, type = "embed", title, tabTitle, urlBarText }: PrototypeEmbedProps) {
  if (type === "browser") {
    return (
      <figure className="w-full overflow-hidden" aria-label={title}>
        <BrowserFrame
          src={url}
          alt={title}
          tabTitle={tabTitle ?? title}
          urlBarText={urlBarText ?? "app.ramp.com/treasury"}
        />
      </figure>
    );
  }

  if (type === "image") {
    return (
      <figure className="w-full overflow-hidden border border-neutral-800 bg-neutral-950">
        <img
          src={url}
          alt={title}
          className="w-full h-auto object-contain max-h-[85vh]"
        />
      </figure>
    );
  }

  if (type === "figma") {
    return (
      <figure className="w-full overflow-hidden border border-neutral-800 bg-neutral-950 rounded-none">
        <div className="relative w-full aspect-[16/10] min-h-[480px]">
          <iframe
            src={url}
            title={title}
            className="absolute inset-0 w-full h-full border-0"
            allowFullScreen
          />
        </div>
      </figure>
    );
  }

  return (
    <figure className="w-full overflow-hidden border border-neutral-800 bg-neutral-950 rounded-none">
      <div className="relative w-full aspect-video min-h-[400px]">
        <iframe
          src={url}
          title={title}
          className="absolute inset-0 w-full h-full border-0"
          allowFullScreen
        />
      </div>
    </figure>
  );
}
