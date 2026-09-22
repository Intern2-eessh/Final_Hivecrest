"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import { START_PROJECT_HREF } from "@/lib/site";
import { deepLinkHash } from "@/lib/navigation";
import {
  DURATION,
  EASE,
  drawFrom,
  drawTo,
  prefersReducedMotion,
  settleFrom,
  settleTo,
} from "@/lib/motion";

export default function PremiumHero() {
  const heroRef = useRef<HTMLDivElement>(null);

  // The page opens at the top so the hero wordmark — a once-per-session event —
  // is not skipped by a restored scroll position. An incoming hash is the one
  // exception: `/#solution` and friends are real deep links from the nav and
  // footer of every other route, and SmoothScroll is what honours them. This
  // used to scroll to 0 unconditionally and race that.
  //
  // `deepLinkHash()` rather than `location.hash` directly, and it is the same
  // call SmoothScroll makes. This effect runs first — children commit before
  // parents — so if the two read the hash differently, this one would bail out
  // of scrolling to the top on a reload while the parent scrolled there anyway.
  // One source of truth for the question keeps them from splitting.
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.history.scrollRestoration = "manual";
    if (deepLinkHash()) return;
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  /**
   * Scroll behaviour: TRIGGERED, on load rather than on scroll.
   *
   * Register: noise — choreography budget 6 (Rule 07.5), the most generous in
   * the system, because this is where the page is loudest before it settles.
   *
   * The wordmark convergence is the sequence Rule 07.0 derives `--ease-settle`
   * from in the first place: letters arriving with mass and coming to rest
   * without overshoot. It is kept, retimed onto `--d-monument`, and Rule 03.3
   * limits it to once per session — it is the one thing on the site allowed to
   * take 2.4 seconds.
   *
   * The surrounding content no longer fades-and-rises (Rule 07.3); it settles.
   */
  useEffect(() => {
    if (prefersReducedMotion()) {
      // Rule 07.7 — the settled end state, immediately. Not a faster version.
      // `rotateX`/`z` are reset alongside `y` even though this branch never
      // applies them: the settled frame is stated in full here, so the wordmark
      // cannot be left tilted by a stylesheet change or a half-run timeline.
      gsap.set(".hero-brand-wrap", { opacity: 1, scale: 1 });
      gsap.set(".brand-letter", { y: 0, opacity: 1, rotateX: 0, z: 0 });
      gsap.set(".hero-rule", { scaleX: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(".hero-rise", settleFrom, { ...settleTo, stagger: 0.09, delay: 0.1 });

      // Ahead of everything else, and finished before the wordmark begins.
      gsap.fromTo(".hero-rule", drawFrom, {
        ...drawTo,
        duration: DURATION.settle,
        delay: 0.15,
      });

      const tl = gsap.timeline({ delay: 0.6 });

      // Letters converge alternately from above and below, then the whole word
      // settles from zoomed-in to rest. Opacity and travel are paired here
      // only because the letters are assembling *into* existence as a single
      // monument event — the once-per-session exception, not the house style.
      //
      // `rotateX` and `z` give that convergence depth against the perspective
      // set by `.hero-stage`. Each letter starts tipped and set back, and rights
      // itself as it arrives — the alternation matches the y travel, so a letter
      // falling from above tips forward and one rising from below tips back.
      // Both are compositor transforms, so the depth is free per frame.
      //
      // Law 3 — mass, not magic: every value moves toward rest and stops there.
      // `EASE.settle` has no overshoot, so nothing springs past zero.
      tl.set(".hero-brand-wrap", { opacity: 1 })
        .from(".brand-letter", {
          y: (i: number) => (i % 2 === 0 ? -140 : 140),
          rotateX: (i: number) => (i % 2 === 0 ? 46 : -46),
          z: -260,
          opacity: 0,
          duration: DURATION.monument * 0.625,
          stagger: 0.11,
          ease: EASE.settle,
        })
        .from(
          ".hero-brand-wrap",
          { scale: 1.18, duration: DURATION.monument * 0.875, ease: EASE.settle },
          0
        );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ── HERO SECTION ── */}
      {/* Archetype A — MONUMENT (§13.2). The one section in the site that is
          allowed to centre, spending 1 of the 2 centering tokens (04.3).
          Ground `ivory-2`: the page warms from here down and never cools. */}
      <div ref={heroRef} className="relative w-full overflow-hidden flex flex-col bg-ivory-2">

        {/* Rule 05.9 — the hexagonal grid is a structure, never a texture. The
            5%-opacity halo that used to sit here was wallpaper; the comb now
            survives only as the layout offset (§04), the bullet (05.8) and the
            pointer-revealed understructure (§08), which runs behind this
            section from the layout. */}

        {/* MAIN CONTENT */}
        {/* `measure-page` rather than `px-6 md:px-12`: the same measure and
            margin as `.grid-page`, so the hero stops centring in the full
            viewport while every section below it centres in a 1688px box. */}
        <div className="measure-page relative z-10 flex flex-col items-center pt-36 md:pt-44 pb-8 md:pb-10">

          {/* Rule 03.8 — labels are not chips: a hairline and bare text.
              Rule 02.7 — an eyebrow is not on the honey list, so it is ink. */}
          <div className="hero-rise flex items-center gap-3 mb-8">
            {/* The rule draws itself before the wordmark lands — the first
                thing the page does, and the smallest. `drawFrom`/`drawTo` is
                `scaleX` on a transform origin at the left edge, so it
                composites; it was written for exactly this and had only one
                consumer until now. */}
            <span aria-hidden className="hero-rule h-px w-6 bg-ink-6" />
            <span className="t-meta text-ink-4">
              Next-Gen Software Services
            </span>
          </div>

          {/* The wordmark, set in Space Grotesk rather than the drawn
              letterforms — the geometric SVG construction read as too rigid
              next to the rest of the page.

              `honey-4` rather than the brighter `honey-3`: at 3.59:1 it is the
              lightest gold that clears large-text AA on ivory, and a wordmark
              at this size is exactly what §02 means by "text ≥24px".

              Letters converge alternately from above and below, the whole word
              settles from zoomed-in to rest, then stays fixed for the session. */}
          <div
            className="hero-brand-wrap relative mb-7 w-full will-change-transform"
            style={{ opacity: 0 }}
          >
            {/* `hero-stage` carries the perspective. It has to sit here rather
                than on the wrapper above: `perspective` applies to an element's
                DIRECT children, and the letters are children of this h1. */}
            <h1
              aria-label="HIVECREST"
              className="hero-stage font-display font-bold text-center select-none text-honey-4 m-0 flex justify-center overflow-hidden py-3
                         leading-[0.95] tracking-[0.06em]
                         text-[clamp(2.25rem,11vw,8rem)]"
            >
              {"HIVECREST".split("").map((ch, i) => (
                <span key={i} aria-hidden="true" className="brand-letter inline-block">
                  {ch}
                </span>
              ))}
            </h1>
          </div>

          {/* Rule 02.7 — "backbone" is the single most important word on this
              screen, which is the first thing on the honey list. It is flat
              colour, not the gradient underline Rule 02.13 forbids. */}
          <h2 className="hero-rise t-h3 text-ink-2 text-center max-w-4xl">
            The digital <span className="text-honey-5">backbone</span> your
            business grows on.
          </h2>

          {/* Rule 03.5 — h3 to body-l is three ramp steps, so the two sizes
              read as different roles rather than as a slightly smaller heading. */}
          <p className="hero-rise t-body-l text-ink-3 measure-lead text-center mt-6">
            AI-powered CRM and Video Analytics platforms built around the way your team actually works.
          </p>

          {/* CTAs */}
          <div className="hero-rise flex flex-col sm:flex-row items-center gap-4 mt-10">
            <a
              href="#solution"
              className="btn btn-primary state cut-2"
            >
              Explore Solutions
              {/* Rule 08.6 — no `group-hover:translate-x-1`. Hover changes
                  value, not position; moving the arrow moves the target. */}
              <ArrowRight className="w-4 h-4" />
            </a>
            {/* This pointed at `mailto:` — the most prominent conversion button
                on the site dropped the visitor into whatever mail client the
                machine has configured, or nothing at all on a device with none.
                It also skipped the contact form, which is the one place the
                enquiry arrives with the service, company and message already
                structured. Every other "Start a project" on the site (about,
                founder, service pages, header) already goes to /contact; this
                was the odd one out. The mail route is still offered there, as
                a fallback rather than as the primary path. */}
            <Link
              href={START_PROJECT_HREF}
              className="btn btn-secondary state cut-2"
            >
              Start a Project
            </Link>
          </div>

          {/* Trust line — the three notables from the company profile, in its
              own wording: "Recognised by StartupTN", "DPIIT Certified
              Startup", "Incubated at iTNT". */}
          <p className="hero-rise mt-8 t-caption text-ink-4 text-center">
            Recognised by StartupTN · DPIIT Certified Startup · Incubated at iTNT
          </p>
        </div>
      </div>
    </>
  );
}
