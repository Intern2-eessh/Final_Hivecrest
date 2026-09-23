"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Info, Target, Award, Briefcase } from "lucide-react";
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
  const linkRefs = useRef<Record<string, HTMLElement | null>>({});

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
        <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 xl:px-12 flex h-full items-center justify-between gap-4">
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
        <Link href="/" className="flex items-center gap-3 sm:gap-4 min-h-11 state mr-auto">
          <Image
            src="/assets/Hivecrest_Logo.png"
            alt="Hivecrest Logo"
            width={128}
            height={128}
            className="w-12 sm:w-16 h-auto object-contain shrink-0"
            priority
          />
          <div className="flex flex-col justify-center">
            <span className="font-display font-bold text-honey-5 whitespace-nowrap
                             text-[clamp(1rem,2.8vw,1.25rem)]
                             tracking-[0.12em] sm:tracking-[0.15em] leading-tight">
              HIVECREST TECHNOLOGY
            </span>
            <blockquote className="text-[0.65rem] sm:text-xs font-semibold text-ink-4 tracking-[0.2em] uppercase mt-0.5 border-l-2 border-honey-5/30 pl-2">
              PRIVATE LIMITED
            </blockquote>
          </div>
        </Link>

        <nav className="relative hidden min-[1100px]:flex space-x-2 xl:space-x-6 t-meta shrink-0 items-center h-full">
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
            const isActive = activeId === item.id || item.children?.some((c) => activeId === c.id);

            const assignRef = (el: HTMLElement | null) => {
              if (item.id && el) {
                linkRefs.current[item.id] = el;
                item.children?.forEach((c) => {
                  linkRefs.current[c.id] = el;
                });
              }
            };

            if (item.children) {
              return (
                <div key={item.label} className="group relative z-10 flex items-center h-full">
                  <span
                    ref={assignRef}
                    className={cn(
                      "tap state px-3 py-2 whitespace-nowrap cut-1 cursor-default flex items-center gap-1",
                      isActive ? "text-honey-5" : "text-ink-4 hover:text-ink-2"
                    )}
                  >
                    {item.label}
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:rotate-180"><path d="m6 9 6 6 6-6"/></svg>
                  </span>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-56 opacity-0 invisible translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out">
                    <div className="bg-honey-1 border border-honey-2 rounded-xl shadow-[0_10px_35px_rgba(212,163,42,0.15)] overflow-hidden flex flex-col p-2">
                      {item.children.map((child) => {
                        const isChildActive = activeId === child.id;
                        const Icon = child.id === "about" ? Info : child.id === "vision" ? Target : child.id === "achievements" ? Award : Briefcase;
                        return (
                          <a
                            key={child.label}
                            href={child.href}
                            className={cn(
                              "px-4 py-2.5 text-sm font-medium rounded-lg transition-colors flex items-center gap-3",
                              isChildActive
                                ? "text-honey-6 bg-honey-2/50"
                                : "text-ink-3 hover:text-honey-6 hover:bg-honey-2/50"
                            )}
                          >
                            <Icon className="w-4 h-4" />
                            {child.label}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <a
                key={item.label}
                href={item.href!}
                ref={assignRef}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "tap state relative z-10 px-3 py-2 whitespace-nowrap cut-1 flex items-center h-full",
                  isActive ? "text-honey-5" : "text-ink-4 hover:text-ink-2"
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
        <div className="hidden min-[1100px]:flex justify-end items-center gap-3 ml-6 xl:ml-10">
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
          {NAV_ITEMS.map((item) => {
            if (item.children) {
              return (
                <div key={item.label} className="flex flex-col space-y-4">
                  <span className="t-h4 text-ink-4 uppercase tracking-widest">{item.label}</span>
                  {item.children.map((child) => {
                    const Icon = child.id === "about" ? Info : child.id === "vision" ? Target : child.id === "achievements" ? Award : Briefcase;
                    return (
                      <a
                        key={child.label}
                        href={child.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "tap t-h4 state justify-center flex items-center gap-3",
                          activeId === child.id ? "text-honey-5" : "text-ink-3 hover:text-honey-5"
                        )}
                      >
                        <Icon className="w-6 h-6 shrink-0" />
                        {child.label}
                      </a>
                    );
                  })}
                </div>
              );
            }
            return (
              <a
                key={item.label}
                href={item.href!}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "tap t-h4 state justify-center",
                  activeId === item.id ? "text-honey-5" : "text-ink-3 hover:text-honey-5"
                )}
              >
                {item.label}
              </a>
            );
          })}
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
