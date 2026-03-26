"use client";

import { useRef, useState, useCallback } from "react";
import { Marquee } from "./Marquee";
import { LogoMenu } from "./LogoMenu";
import { PosterGrid, type PosterGridScrollApi } from "./PosterGrid";
import type { WorkExperience } from "@/app/types";

type HomePageContentProps = {
  experiences: WorkExperience[];
};

export function HomePageContent({ experiences }: HomePageContentProps) {
  const scrollApiRef = useRef<PosterGridScrollApi | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  const handleReady = useCallback((api: PosterGridScrollApi) => {
    scrollApiRef.current = api;
  }, []);

  const handleMenuHover = useCallback(
    (i: number) => {
      setHighlightedIndex(i);
      scrollApiRef.current?.scrollToIndex(i);
    },
    [],
  );

  const handlePosterHover = useCallback((i: number) => {
    setHighlightedIndex(i);
  }, []);

  const clearHighlight = useCallback(() => {
    setHighlightedIndex(null);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container max-w-6xl mx-auto px-6 pt-8 pb-16">
        <div className="flex flex-col gap-6">
          <Marquee />
          <PosterGrid
            experiences={experiences}
            onReady={handleReady}
            onHoverIndex={handlePosterHover}
            onHoverLeave={clearHighlight}
          />
          <LogoMenu
            experiences={experiences}
            highlightedIndex={highlightedIndex}
            onHoverIndex={handleMenuHover}
            onHoverLeave={clearHighlight}
          />
        </div>
      </main>
    </div>
  );
}
