"use client";

import { usePathname } from "next/navigation";
import { NavBar } from "@/components/NavBar";

export function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isTvHome = pathname === "/";

  return (
    <>
      {!isTvHome ? <NavBar /> : null}
      <div className={isTvHome ? "min-h-screen" : "min-h-screen pt-[52px]"}>
        {children}
      </div>
    </>
  );
}
