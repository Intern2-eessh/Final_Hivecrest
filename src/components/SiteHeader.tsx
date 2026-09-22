"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import EmployeeLogin from "@/components/EmployeeLogin";
import { NAV_ITEMS, MAILTO, START_PROJECT_HREF } from "@/lib/site";

/**
 * The one header, shared by every route.
 *
 * It used to live inside `PremiumHero`, which meant it only existed on the
 * home page — fine while the site was a single scrolling page, and immediately
 * wrong once real routes exist.
 *
 * The scroll-spy only runs on `/`. On a service or legal page there are no
 * anchor sections to track, so it stays idle and the marker stays hidden
 * rather than lighting an item that has nothing to do with the current page.
 */
export default function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [trackedId, setTrackedId] = useState<string>("");

  /**
   * Which nav item is lit.
   *
   * On the home page the scrollspy decides, section by section. Off it, the
   * route decides — a service page belongs to Solutions, `/founder` belongs to
   * Founder's Desk, and so on.
   *
   * The marker used to go blank on every route that was not `/`, on the
   * reasoning that there were no anchor sections to track. But a visitor who
   * clicks "Explore AI Tele-Calling" has not left the Solutions part of the
   * site — they have gone deeper into it, and the header answering "you are
   * nowhere" is what made those pages feel disconnected from the rest. The
   * marker now stays on SOLUTION for the whole time they are inside a service
   * page and only moves when they come back out.
   */
  const routeSectionId = pathname.startsWith("/services")
    ? "solution"
    : pathname.startsWith("/about")
      ? "about"
      : pathname.startsWith("/founder")
        ? "founders"
        : pathname.startsWith("/contact")
          ? "contact"
          : "";

  // Derived, not stored, so a route change never has to write state.
  const activeId = isHome ? trackedId : routeSectionId;
  const [pill, setPill] = useState({ left: 0, width: 0, opacity: 0 });
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    const fn = () => setIsSticky(window.scrollY >= 24);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // The active section is the LAST one whose top has crossed a line 45% down
  // the viewport. Measuring on each frame — rather than reacting to
  // intersection events — stays correct in both directions and when adjacent
  // sections overlap.
  useEffect(() => {
    if (!isHome) return;

    const sections = NAV_ITEMS
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (!sections.length) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.45;
      let current = "";

      for (const el of sections) {
        if (el.getBoundingClientRect().top <= line) current = el.id;
      }

      // Past the end of the last section, keep the last one lit rather than none
      const last = sections[sections.length - 1];
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
        current = last.id;
      }

      setTrackedId(current);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [isHome]);

  // Measure the active link and move the marker behind it.
  useEffect(() => {
    const move = () => {
      const el = activeId ? linkRefs.current[activeId] : null;
      if (!el) {
        setPill((p) => ({ ...p, opacity: 0 }));
        return;
      }
      setPill({ left: el.offsetLeft, width: el.offsetWidth, opacity: 1 });
    };
    move();
    window.addEventListener("resize", move);
    return () => window.removeEventListener("resize", move);
  }, [activeId, isSticky]);

  return (
    <>
      <header
        className={cn(
          /* Ground: `chrome`, the footer's value, filled across the whole bar
             from the wordmark to the last nav item — and filled at the top of
             the page too, where the bar used to be transparent and took
             whatever was behind it. The two pieces of chrome that bracket
             every page now sit on one surface instead of the header borrowing
             the hero's ground and the footer owning its own.

             Rule 06.5 — opaque. A translucent bar forced a full-width backdrop
             composite on every scroll frame, which is exactly the cost the
             bible refuses to pay on low-cost Android hardware.

             Scroll no longer changes the ground, only the hairline: the bar is
             already its own surface, so the edge is the only thing left to
             state once content starts passing underneath it. */
          "fixed top-0 left-0 right-0 z-[100] h-20 bg-chrome transition-all duration-300",
          isSticky ? "border-b border-ink-7" : "border-b border-transparent"
        )}
      >
        {/* The bar itself stays full-bleed — the ground and the hairline run to
            the window edge — while the row inside it takes the same measure and
            margin as `.grid-page`. The row used to carry a hand-written
            `px-6 md:px-12`, which agreed with `--grid-margin` at some widths
            and not others, and past 1688px drifted away from page content
            without limit because `.grid-page` caps and centres and a
            full-bleed row does not. */}
        <div className="measure-page flex h-full items-center justify-between gap-4">
        {/* The lockup scales rather than shrinking. `min-w-max` was the first
            attempt and overflowed a 320px viewport; `min-w-0` + `truncate`
            replaced it and overcorrected — a flex item with `min-w-0` may
            shrink below its own content, so from 1200px up, where the nav and
            the CTA appear and compete for the row, the wordmark lost the
            contest and `truncate` clipped it to "HIVEC…". Full screen was the
            worst case, not the best one.

            Neither clamp nor ellipsis now: no `min-w-0`, so the automatic
            minimum size is min-content and the wordmark cannot be compressed
            below itself, and no `truncate`, so there is nothing to clip with.
            The type ramp does the responsive work on its own — at the 1rem
            floor the whole lockup is ~156px, which still clears 320px with the
            hamburger beside it. */}
        {/* `min-h-11` — the lockup is the home link and its content box was
            25-38px tall depending on the type clamp, short of the 44px floor. */}
        <Link href="/" className="flex-1 flex items-center gap-2 sm:gap-3 min-h-11 state">
          <Image
            src="/assets/Hivecrest_Logo.png"
            alt=""
            width={96}
            height={96}
            className="w-9 sm:w-12 h-auto object-contain shrink-0"
            priority
          />
          {/* Ceiling lowered 1.75rem → 1.25rem. At 28px with 0.18em tracking
              the wordmark alone was ~212px and was the single biggest reason
              the row could not fit; 20px still reads as the primary lockup
              next to a 12px nav. */}
          <span className="font-display font-bold text-ink-2 whitespace-nowrap
                           text-[clamp(1rem,3.2vw,1.25rem)]
                           tracking-[0.12em] sm:tracking-[0.18em]">
            HIVECREST
          </span>
        </Link>

        {/* `min-[1100px]` rather than `lg`, and the hamburger below moves with
            it. At 1024 this nav had 19px of slack in the row — measured, not
            estimated — which is a hair from overflowing before anything is
            added to it, and the staff entrance to its right needs 44. Held at
            `lg`, the band from 1024 to 1099 showed the desktop nav (so no
            hamburger, so no mobile menu) and had no room for the padlock
            either, leaving an iPad in landscape — exactly 1024 — with no way
            into the EMS at all. Below 1100 the hamburger now answers, and the
            menu behind it carries the spelled-out entrance. */}
        <nav className="relative hidden min-[1100px]:flex space-x-1 t-meta shrink-0 justify-center">
          {/* Active Navigation Underline (Sliding) */}
          <span
            aria-hidden="true"
            className="absolute bottom-2 h-[2px] bg-honey-5 pointer-events-none"
            style={{
              left: pill.left,
              width: pill.width,
              opacity: pill.opacity,
              transition:
                "left 0.55s cubic-bezier(.22,1,.36,1), width 0.55s cubic-bezier(.22,1,.36,1), opacity 0.35s ease",
            }}
          />

          {NAV_ITEMS.map((item) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.label}
                href={item.href}
                ref={(el) => { linkRefs.current[item.id] = el; }}
                aria-current={isActive ? "true" : undefined}
                /* px-4 → px-3. Six items, so this is 48px back into a row
                   that did not have it to spare.
                   Hover fills with honey-1 — the same wash the active marker
                   uses, in the same cut-1 shape, so pointing at an item
                   previews what selecting it looks like. It cannot be confused
                   with the active item, which also carries honey-5 text; hover
                   goes to ink-2. `ink-4 -> ink-2` alone was a change between
                   two greys that most people never saw. */
                className={cn(
                  "tap state relative z-10 px-3 whitespace-nowrap cut-1",
                  isActive
                    ? "text-honey-5"
                    : "text-ink-4 hover:text-ink-2"
                )}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* CTA held at `xl` (1440px). Below that the lockup, the six-item nav
            and this button do not fit on one row — that shortfall is what was
            being paid for by clipping the wordmark, and simply un-clipping the
            wordmark would have moved the overflow onto the button instead.
            `CONTACT` is already in the nav, so nothing is unreachable.

            The wrapper is `hidden xl:flex`, not `flex-1 hidden md:flex`. As a
            `md:flex` it was a visible, empty `flex: 1 1 0%` column from 900px
            to 1439px whose only child was `hidden` — 540px of viewport range
            where it rendered nothing but still took a share of
            `justify-between` and a `gap-4` on each side. That was the space the
            nav needed to come down to `lg`. */}
        {/* The staff entrance, in the top right where company sites put one.

            It is a padlock alone, not a labelled link, and that is a
            measurement rather than a preference. Free space in this row, read
            off rendered screenshots: 19px at 1024, 156px at 1200, 315px at
            1366, and 53px at 1440 — the last one drops because "Start a
            Project" reappears at `xl` and takes ~240px. "EMPLOYEE LOGIN" set
            at t-meta is ~145px and fits none of the tight widths; tried, it
            clipped to "EMPLOYEE LOGI" and pushed the CTA off the edge. The
            words are still there — they appear under the padlock on hover and
            on focus.

            32px visual box, not the 44px `.tap` floor: 44 + a 12px gap is
            56px against 53px available at 1440. The `after:-inset-1.5` grows
            the hit area back to 44 x 44 without spending 44px of the row, so
            the touch target the bible asks for survives at a width where the
            visible square could not. */}
        <div className="hidden min-[1100px]:flex flex-1 justify-end items-center gap-3">
          {/* Animated cloud Employee Login button — cloud icon slides right on
              hover, label fades. Variant `cloud` keeps all dialog logic inside
              EmployeeLogin while the button renders with Tailwind inline JSX. */}
          <EmployeeLogin variant="cloud" />

          <Link
            href={START_PROJECT_HREF}
            className="hidden xl:inline-flex btn btn-primary state cut-2 t-meta px-5"
          >
            Start a Project
          </Link>
        </div>

        <button
          className="tap justify-center min-[1100px]:hidden text-ink-2 ml-4 flex-shrink-0"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        </div>
      </header>

      <div
        className={cn(
          /* `overflow-y-auto` with `my-auto` on the block below, not
             `justify-center`. Nine items now stand in this menu and a phone in
             landscape is ~375px tall, which the list already exceeded before
             the staff entrance was added to the end of it. Centring with
             `justify-center` cannot be scrolled out of — the overflow goes off
             both ends and the top one is unreachable, because scrolling stops
             at the container's start edge and centred content begins before
             it. Auto margins centre while there is room and collapse to zero
             when there is not, so the list scrolls from the top instead. */
          /* `chrome` to match the bar above it. The header is opaque and sits
             at z-100 over this at z-90, so a different ground here drew a
             visible seam straight across the screen at the 80px header line —
             the open menu has to be the same surface the bar is. */
          "fixed inset-0 bg-chrome z-[90] flex flex-col items-center overflow-y-auto py-24 transition-all duration-500 min-[1100px]:hidden",
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}
        // Keeps the hidden menu out of the tab order and the a11y tree entirely,
        // rather than leaving focusable links behind an invisible layer.
        inert={!isMobileMenuOpen}
      >
        <div className="my-auto flex flex-col space-y-6 text-center">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "tap t-h4 state justify-center",
                activeId === item.id ? "text-honey-5" : "text-ink-3 hover:text-honey-5"
              )}
            >
              {item.label}
            </a>
          ))}
          {/* The desktop CTA is `hidden xl:flex`, so on every phone and every
              laptop under 1440px the only route out of this menu was a
              `mailto:`. "Start a project" is the actual conversion path and it
              was reachable from four other pages but not from the one menu a
              phone visitor sees. Email stays underneath it as the fallback. */}
          <Link
            href={START_PROJECT_HREF}
            onClick={() => setIsMobileMenuOpen(false)}
            className="tap t-h4 state justify-center text-honey-5"
          >
            START A PROJECT
          </Link>
          <a
            href={MAILTO}
            onClick={() => setIsMobileMenuOpen(false)}
            className="tap t-h4 state justify-center text-ink-3 hover:text-honey-5"
          >
            EMAIL US
          </a>

          {/* Below the hairline, because it is not for visitors. Same rule the
              footer bottom bar follows: set apart and quieter than everything
              above it, but present, because a phone is where an employee is
              most likely to be reaching for it. The menu closes itself first —
              `onOpen` runs before the dialog mounts, so the scroll lock is
              taken against the settled page rather than against this overlay. */}
          <div className="pt-8 mt-2 border-t border-ink-7 flex justify-center">
            <EmployeeLogin
              className="tap state gap-2 t-body-s text-ink-4 hover:text-honey-5 justify-center"
              iconClassName="w-4 h-4"
              onOpen={() => setIsMobileMenuOpen(false)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
