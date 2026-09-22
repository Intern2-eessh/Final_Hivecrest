/**
 * How the page arrived, which decides whether an incoming hash is a
 * destination or a leftover.
 *
 * `SmoothScroll` writes the hash into the address bar with `replaceState`
 * whenever a section link is clicked, so the position is shareable. The side
 * effect is that the hash outlives the visit: click "Solution", refresh, and
 * the browser is handed `/#solution` and jumps straight there — skipping the
 * hero wordmark, which the same file goes out of its way to protect from a
 * restored scroll position.
 *
 * The distinction that resolves it is what the hash MEANS in each case:
 *
 *   · Arriving from elsewhere — a bookmark, a link on a service page, a shared
 *     URL — the hash is a destination the visitor asked for. Honour it.
 *   · Reloading — the hash is a record of where they happened to have scrolled.
 *     It was written by a scroll, not by a navigation, which is exactly why
 *     `replaceState` was chosen over `pushState`. Reloading asks for the page,
 *     not for that scroll position.
 *
 * `back_forward` is deliberately not treated as a reload: stepping back to an
 * entry that carried a hash should land where it did before.
 */
export function isReload(): boolean {
  if (typeof window === "undefined" || !window.performance) return false;
  const entry = window.performance.getEntriesByType("navigation")[0] as
    | PerformanceNavigationTiming
    | undefined;
  return entry?.type === "reload";
}

/**
 * The hash to act on, or `""` when there is none worth acting on.
 * Both `SmoothScroll` and `PremiumHero` read this so the two cannot disagree
 * about whether the page is opening at the top — they run in the same commit,
 * child first, and a split decision would have one scroll and the other not.
 */
export function deepLinkHash(): string {
  if (typeof window === "undefined") return "";
  if (isReload()) return "";
  return window.location.hash;
}
