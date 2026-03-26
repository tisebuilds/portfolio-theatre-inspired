"use client";

import { useRef, useEffect, useCallback } from "react";
import { PosterCard } from "./PosterCard";
import type { WorkExperience } from "@/app/types";

const GAP_PX = 24;
const COPIES = 3;

export type PosterGridScrollApi = {
  scrollToIndex: (index: number) => void;
};

type PosterGridProps = {
  experiences: WorkExperience[];
  onReady?: (api: PosterGridScrollApi) => void;
  onHoverIndex?: (index: number) => void;
  onHoverLeave?: () => void;
};

export function PosterGrid({ experiences, onReady, onHoverIndex, onHoverLeave }: PosterGridProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const cycleWidthRef = useRef<number>(0);

  const scrollToIndex = useCallback((index: number) => {
    const el = scrollRef.current;
    if (!el || index < 0 || index >= experiences.length) return;
    const list = el.querySelector("ul");
    const firstLi = list?.querySelector("li");
    const cardWidth = firstLi?.getBoundingClientRect().width ?? 216;
    const cycleWidth = cycleWidthRef.current;
    const containerWidth = el.clientWidth;
    const targetScroll =
      cycleWidth -
      containerWidth / 2 +
      cardWidth / 2 +
      index * (cardWidth + GAP_PX);
    el.scrollTo({ left: targetScroll, behavior: "smooth" });
  }, [experiences.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || experiences.length === 0) return;

    const run = () => {
      const list = el.querySelector("ul");
      const firstLi = list?.querySelector("li");
      const cardWidth = firstLi?.getBoundingClientRect().width ?? 216;
      const cycleWidth = experiences.length * (cardWidth + GAP_PX);
      cycleWidthRef.current = cycleWidth;

      const containerWidth = el.clientWidth;
      const scrollToCenterFirst = cycleWidth - containerWidth / 2 + cardWidth / 2;
      el.scrollLeft = scrollToCenterFirst;
      onReady?.({ scrollToIndex });
    };

    const id = requestAnimationFrame(run);
    return () => cancelAnimationFrame(id);
  }, [experiences.length, scrollToIndex, onReady]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const cycleWidth = cycleWidthRef.current;
    if (cycleWidth <= 0) return;

    const handleScroll = () => {
      const { scrollLeft } = el;
      if (scrollLeft < cycleWidth * 0.5) {
        el.scrollLeft = scrollLeft + cycleWidth;
      } else if (scrollLeft > cycleWidth * 2.5) {
        el.scrollLeft = scrollLeft - cycleWidth;
      }
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [experiences.length]);

  const repeated = Array.from({ length: COPIES }, () => experiences).flat();

  return (
    <div
      ref={scrollRef}
      className="w-full overflow-x-auto overflow-y-hidden pb-2 -mx-6 px-6 md:-mx-8 md:px-8 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-6 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]"
    >
      <ul className="group/grid flex flex-row gap-6 list-none p-0 m-0 w-max">
        {repeated.map((exp, i) => {
          const copyIndex = Math.floor(i / experiences.length);
          const realIndex = i % experiences.length;
          return (
            <li
              key={`${exp.slug}-${copyIndex}-${i}`}
              className="shrink-0 w-[200px] md:w-[240px] transition-[opacity,transform] duration-300 ease-spring group-hover/grid:opacity-35 hover:!opacity-100 hover:scale-[1.03]"
              onMouseEnter={() => onHoverIndex?.(realIndex)}
              onMouseLeave={() => onHoverLeave?.()}
            >
              <PosterCard experience={exp} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
