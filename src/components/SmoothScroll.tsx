"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerLenis } from "@/lib/scroll-lock";
import { deepLinkHash } from "@/lib/navigation";

gsap.registerPlugin(ScrollTrigger);

/**
 * `SiteHeader` is `fixed … h-20`. Scrolling a section to y = its own top puts
 * that first 80px underneath the bar, so every programmatic jump stops short
 * by the height of the header.
 */
const HEADER_OFFSET = -80;

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // An incoming hash is a deep link that has to work: the nav and footer on
    // every other route point at `/#about`, `/#solution` and so on. This used
    // to strip the hash and force the page to the top, which silently broke
    // every one of those links the moment real routes existed.
    //
    // `deepLinkHash()` returns "" on a reload, which is the one case where the
    // hash is not a destination. The click handler at the foot of this effect
    // writes the hash on every section click, so it outlives the visit: click
    // "Solution", press refresh, and the page reopened at Solutions and skipped
    // the wordmark. A reload asks for the page, not for the scroll position
    // that happened to be recorded in the address bar.
    const hash = deepLinkHash();
    const deepLinkTarget = hash ? document.querySelector(hash) : null;

    if (!deepLinkTarget) {
      // No deep link: open at the top, so the hero wordmark — a once-per-session
      // event — is never skipped by a restored scroll position.
      window.scrollTo(0, 0);

      // Drop the stale hash so the address bar agrees with what is on screen,
      // and so a second refresh behaves like the first. `replaceState` again,
      // not `pushState` — this is a correction, not a navigation.
      if (window.location.hash) {
        window.history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search
        );
      }
    }

    // The option names here were the pre-1.0 ones — `direction`,
    // `gestureDirection`, `mouseMultiplier`, `smoothTouch`. The installed
    // runtime (1.0.42) destructures `orientation`, `gestureOrientation`,
    // `wheelMultiplier` and `syncTouch` and silently drops anything else, so
    // four of the eight settings below were doing nothing at all. They are
    // written under the names this version actually reads, which also means
    // the type cast that was hiding the mismatch is no longer needed.
    const lenis = new Lenis({
      duration: 1.2,
      lerp: 0.08,
      smoothWheel: true,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      wheelMultiplier: 1,
      syncTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Overlays need to pause Lenis to stop the page scrolling behind them
    registerLenis(lenis);

    // Lenis and ScrollTrigger were not connected to each other at all, and each
    // ran its own rAF loop. Every section on this page is drawn by a GSAP
    // `fromTo` whose "from" state hides it — a clip wipe or a 24px settle — so
    // a ScrollTrigger that does not know the page has moved leaves its section
    // pinned in that hidden state. Landing on `/#solution` rendered a blank
    // page for exactly this reason: the markup was all there, every
    // `.project-image-wrapper` just still had `clip-path: inset(0 0 0 100%)`.
    //
    // The standard integration: Lenis reports scroll to ScrollTrigger, and GSAP
    // drives Lenis so the two share one clock and one frame order.
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // The deep-link jump happens after the wiring above, then triggers are
    // recomputed against the new scroll position. Without the refresh, every
    // trigger the jump skipped past keeps its start point from scroll 0 and
    // never fires — `once: true` means it never gets a second chance.
    if (deepLinkTarget) {
      requestAnimationFrame(() => {
        lenis.scrollTo(deepLinkTarget as HTMLElement, {
          offset: HEADER_OFFSET,
          immediate: true,
        });
        // A second frame so layout and Lenis have both settled before
        // ScrollTrigger re-measures.
        requestAnimationFrame(() => ScrollTrigger.refresh());
      });
    }

    // Both libraries measure the document once at construction and then only
    // on their own schedule — Lenis behind a 250ms-debounced ResizeObserver,
    // ScrollTrigger on `load`. Anything that changes the page height between
    // those two points (a late webfont, a dev-mode recompile) leaves Lenis
    // with a stale `limit`, and `scrollTo` silently clamps every target to it,
    // which lands the visitor short of the section they asked for. Re-measure
    // both once the page has actually finished loading.
    const onLoad = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };
    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad, { once: true });
    }

    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor || !anchor.hash || anchor.origin !== window.location.origin) return;

      // Only take over links that point at THIS page. Now that real routes
      // exist, the nav links are `/#about` — clicking one from a service page
      // is a page navigation, and preventing it used to leave the visitor
      // stranded while Lenis scrolled to an element that was not there.
      if (anchor.pathname !== window.location.pathname) return;

      const targetEl = document.querySelector(anchor.hash);
      if (!targetEl) return;

      e.preventDefault();

      // Measure immediately before the jump. Lenis clamps every target to the
      // `limit` it last recorded, so a stale measurement is the difference
      // between landing on the section and stopping somewhere above it.
      lenis.resize();

      // Rule 08.10 — scroll is smoothed, never hijacked. 2.5s was long enough
      // that the page felt unresponsive; --d-long is the section-scale band.
      lenis.scrollTo(targetEl as HTMLElement, {
        offset: HEADER_OFFSET,
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      // The hash is worth having in the address bar — it makes the position
      // shareable and survives a reload — but `pushState` would put a stop on
      // the back button for what is a scroll, not a navigation.
      window.history.replaceState(null, "", anchor.hash);
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
      window.removeEventListener("load", onLoad);
      gsap.ticker.remove(tick);
      // `lagSmoothing` is global state, so put GSAP's default back rather than
      // leaving it disabled for whatever route mounts next.
      gsap.ticker.lagSmoothing(500, 33);
      registerLenis(null);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
