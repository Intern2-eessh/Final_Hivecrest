"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Rebuilt from `travel_vlog_video.mp4` (kept in `media-source/`), which had
 * three problems beyond its 12.08MB weight:
 *
 *   1. At 1920x1080 and only 4.7 Mbps, twenty seconds of moving gold particles
 *      smeared — the logo text read as blurred.
 *   2. Its service labels were AI-garbled. "Business Websites" rendered as
 *      "Busiaess Websunns" and another read "Dowating". Baked into the frames,
 *      so unfixable in place.
 *   3. A stock watermark — a clipboard-and-house icon, nothing to do with this
 *      company — sat in the bottom-right of every frame.
 *
 * This cut keeps the parts of that render worth keeping and replaces the rest:
 * the text-free opening (0-2.2s) is ping-ponged forward and back into a bed
 * that loops without a seam, the four real services are set over it in the
 * site's own wording and order, and it resolves on the closing logo (16-19.5s),
 * which was always spelled correctly.
 *
 * Geometry is chosen so nothing is ever resampled: a centred 1440x900 crop is
 * exactly 16:10, matches this frame's aspect, is a true 2x for the ~620 CSS px
 * it renders at, and its right edge stops at x=1680 — just short of the
 * watermark, which is why it is cropped out rather than blurred over. `delogo`
 * was tried first and left a smear worse than the icon.
 *
 * 3.44MB, from 12.08MB.
 */
const VIDEO_SRC = "/assets/about.mp4";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll behaviour: SCRUBBED.
 *
 * Rule 07.4 — adjacent sections may not share a scroll behaviour. The hero
 * above is triggered and Vision below is triggered, so this one is driven
 * directly by the scrollbar instead: the media frame uncovers from the left as
 * the section rises, at whatever pace the visitor moves.
 *
 * That is the whole reason for having three behaviours rather than one nice
 * one. A page where every section fades up the same way reads as a template no
 * matter how good the individual animation is.
 */
export default function AboutUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Smooth arrival transition when scrolled into view
      gsap.fromTo(
        mediaRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%", // Triggers when the top of the section reaches 75% down the viewport
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full bg-ivory-2 rhythm-1 text-ink-2"
    >
      <div className="grid-page items-stretch gap-y-10">

        {/* Copy takes the anchor seat, cols 1–7. The `md:col-span-6` that used
            to sit alongside it never applied — `.seat-anchor` is unlayered and
            Tailwind's utilities are in `@layer utilities`, so the seat won and
            the utility was decoration. The media opposite it now states its own
            seat instead of trying to out-specify this one. */}
        <div className="seat-anchor">
          <div className="flex items-center gap-3 mb-6">
            <span aria-hidden className="h-px w-6 bg-ink-6" />
            <span className="t-meta text-ink-4">Who We Are</span>
          </div>
          <h2 className="t-h2 text-ink-2 mb-8">
            About Us
          </h2>
          {/* Rule 02.4 — text colour is a token, never an opacity. */}
          {/* Copy is the About Us block from the company brochure (page 2),
              word for word: the working method as the lead line, its
              supporting statement, then the company description. */}
          <div className="flex flex-col space-y-6 text-ink-3">
            <p className="t-body-l font-semibold text-ink-2">
              Observe. Engineer. Improve. Deliver.
            </p>
            <p className="t-body measure-body">
              Turning challenges into efficient, reliable solutions.
            </p>
            <p className="t-body measure-body">
              Hivecrest Technologies Private Limited is a technology company focused on Intelligent Systems, Automation, Enterprise Solutions, and Digital Intelligence.
            </p>
            <p className="t-body measure-body">
              We combine technology with a deep understanding of operational challenges to create solutions that improve efficiency, visibility, productivity, and decision-making.
            </p>
          </div>

        </div>

        {/* Media runs from column 8 to the page edge — the counterweight to a
            left-seated copy block, and wide enough that the video reads as a
            deliberate frame rather than a thumbnail parked in the corner.

            `seat-counter` carries the placement at BOTH breakpoints, which is
            the actual fix. The element used to declare `md:col-start-8
            md:col-span-5` and nothing else, so below 900px it had no
            `grid-column` at all and the grid auto-placed it into a *single*
            track — one column of eight on a tablet, one of four on a phone.
            That is why the video kept getting smaller as the window narrowed: it was
            not scaling with the viewport, it was being parked in a 1/8-width
            cell. It now spans the full width below md, which is the correct
            shape for a 16:10 frame on a narrow screen.

            The `maxWidth: clamp(240px, 62vw, 620px)` that used to wrap it is
            gone too. It was a workaround for the same bug and introduced one
            of its own: past ~1700px the column is wider than 620px, so the
            video stopped at the cap, sat left inside its column and left a
            ragged gap where every other block on the page lines up with the
            right margin. The grid column is the constraint now, so the frame is
            flush with the page edge at every width. */}
        {/* The `.elevate` wrapper is gone. It applied two chained
            `drop-shadow()` filters, and a CSS filter over a playing video is
            re-evaluated for every decoded frame — a full-resolution alpha
            rasterise plus a 28px blur, thirty times a second, for a shadow.
            The frame is a `Paper` surface with a cut corner, which is enough
            to separate it from the ground on its own. */}
        <div ref={mediaRef} className="seat-counter flex items-center justify-center">
          <div className="w-full h-full min-h-[350px] relative mix-blend-multiply flex-1">
            <Image
              src="/assets/hivecrestloogo.png"
              alt="Hivecrest Logo"
              fill
              className="object-contain contrast-125 brightness-110 scale-[1.35]"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
