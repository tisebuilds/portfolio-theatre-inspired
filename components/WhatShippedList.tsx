import Link from "next/link";
import type { WhatShippedItem } from "@/app/types";

type WhatShippedListProps = {
  items: WhatShippedItem[];
  workSlug?: string;
};

function formatQuarter(raw: string): string {
  const match = raw.match(/^(\d{4})Q(\d)$/);
  if (!match) return raw;
  return `Q${match[2]} '${match[1].slice(2)}`;
}

export function WhatShippedList({ items, workSlug }: WhatShippedListProps) {
  return (
    <section aria-labelledby="what-shipped-heading">
      <h2
        id="what-shipped-heading"
        className="text-sm font-medium uppercase tracking-wider text-neutral-500 mb-3"
      >
        Shipped
      </h2>

      <div className="rounded-xl bg-neutral-900/60 border border-neutral-800 overflow-hidden divide-y divide-neutral-800/60">
        {items.map((item, i) => {
          const isObj = typeof item === "object" && "slug" in item;
          const label = typeof item === "string" ? item : item.label;
          const slug = isObj ? item.slug : null;
          const quarter = isObj && item.quarter ? item.quarter : null;
          const thumbnail = isObj && item.thumbnail ? item.thumbnail : null;
          const isLink = isObj && workSlug;

          const inner = (
            <div className="flex items-center gap-4 px-3 py-3 transition-colors group-hover:bg-neutral-800/50">
              <div className="w-[120px] h-[68px] rounded-md bg-neutral-800 overflow-hidden shrink-0">
                {thumbnail ? (
                  <img
                    src={thumbnail}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-neutral-600 text-xs">
                    {i + 1}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-1.5 min-w-0">
                <span className="text-sm font-medium text-neutral-200 leading-snug">
                  {label}
                </span>
                {quarter && (
                  <span className="text-xs font-semibold tabular-nums bg-blue-600/90 text-white px-2 py-0.5 rounded w-fit">
                    {formatQuarter(quarter)}
                  </span>
                )}
              </div>
            </div>
          );

          return isLink && slug ? (
            <Link
              key={i}
              href={`/work/${workSlug}/case-study-coming-soon`}
              className="block group no-underline"
            >
              {inner}
            </Link>
          ) : (
            <div key={i} className="group">
              {inner}
            </div>
          );
        })}
      </div>
    </section>
  );
}
