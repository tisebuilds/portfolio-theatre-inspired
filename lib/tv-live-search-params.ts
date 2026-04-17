/**
 * Next `useSearchParams()` can be empty or stale on the first client pass after a
 * direct load (e.g. `/?ch=2&view=episode&ep=0`). Prefer the real location bar when
 * building `router.replace` query strings so `ch` / `view` are not dropped.
 */
export function tvLiveSearchParams(routerSearchParams: {
  toString(): string;
}): URLSearchParams {
  if (typeof window !== "undefined") {
    return new URLSearchParams(window.location.search);
  }
  return new URLSearchParams(routerSearchParams.toString());
}
