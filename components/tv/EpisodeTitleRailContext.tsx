"use client";

import {
  createContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type EpisodeTitleRailContextValue = {
  heroTitleInView: boolean;
  setHeroTitleInView: (v: boolean) => void;
};

export const EpisodeTitleRailContext =
  createContext<EpisodeTitleRailContextValue | null>(null);

export function EpisodeTitleRailProvider({ children }: { children: ReactNode }) {
  const [heroTitleInView, setHeroTitleInView] = useState(true);
  const value = useMemo(
    () => ({ heroTitleInView, setHeroTitleInView }),
    [heroTitleInView],
  );
  return (
    <EpisodeTitleRailContext.Provider value={value}>
      {children}
    </EpisodeTitleRailContext.Provider>
  );
}
