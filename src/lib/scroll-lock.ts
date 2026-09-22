/**
 * Page scroll lock that actually works with Lenis.
 *
 * Lenis drives its own virtual scroll, so `body { overflow: hidden }` alone
 * does NOT stop the page moving behind an open overlay — Lenis has to be told
 * to stop. SmoothScroll registers its instance here; overlays call
 * lockPageScroll()/unlockPageScroll() without needing a reference to it.
 */

interface LenisLike {
  stop: () => void;
  start: () => void;
}

let lenis: LenisLike | null = null;

export function registerLenis(instance: LenisLike | null) {
  lenis = instance;
}

export function lockPageScroll() {
  // Stops the smooth-scroll loop (desktop wheel/keyboard).
  lenis?.stop();
  // Both elements: `overflow: hidden` on <body> alone does not stop the
  // document itself from scrolling, so the root has to be locked too.
  // (`scrollbar-gutter: stable` in globals.css keeps the layout from shifting
  // when the scrollbar goes away.)
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";
}

export function unlockPageScroll() {
  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
  lenis?.start();
}
