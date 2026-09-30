"use client";

import { useLayoutEffect, useState } from "react";

export function useMinMd() {
  const [md, setMd] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(min-width: 768px)").matches;
  });
  useLayoutEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const fn = () => setMd(mq.matches);
    fn();
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return md;
}
