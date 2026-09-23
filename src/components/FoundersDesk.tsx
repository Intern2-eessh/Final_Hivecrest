"use client";

import React, { useRef } from "react";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";

// ── Founder's message ───────────────────────────────────────────────────────
// The message is quoted verbatim from the company profile (page 4). Its
// closing line — "engineering with conscience" — is the attributed pull-quote
// beside the portrait below, so it is not repeated here.
const BIO_PARAGRAPHS = [
  "We didn't start Hivecrest Technologies just to build software. We started it because we saw a gap between what technology can do and what it should do for businesses. When I looked at repetitive processes that drained time and slowed growth, or customer conversations and signals that went unnoticed, I saw an opportunity. An opportunity to build software that doesn't just run, but understands, responds, and supports.",
  "At Hivecrest Technologies, we are not just creating products. We are building solutions that carry purpose. Solutions that reduce friction, increase efficiency, and bring clarity to everyday work.",
];

/**
 * Scroll behaviour: STATIC.
 *
 * This is the one `Ink` chapter in the site (Rule 06.3) — the break between
 * the working half of the page and its settled end. Rule 07.4 requires it to
 * differ from Solutions above and Contact below, both of which are triggered.
 *
 * A dark full-bleed band arriving under its own animation would announce
 * itself twice. It holds instead, and the material does the work.
 */
export default function FoundersDesk() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headingRef  = useRef<HTMLDivElement>(null);
  const cardRef     = useRef<HTMLDivElement>(null);

  return (
    <section
      id="founders"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-ivory-2 rhythm-3"
    >
      <div className="grid-page">

        <div ref={headingRef} className="seat-full mb-10">
          <SectionHeading
            eyebrow="Founder's Desk"
            title="The standard we build to"
          />
        </div>

        {/* Ambient background orbs for Liquid Glass refraction - Softened contrast */}
        <div className="absolute top-0 right-0 w-[45rem] h-[45rem] bg-honey-4/30 rounded-full mix-blend-multiply filter blur-[100px] pointer-events-none translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[35rem] h-[35rem] bg-slate-4/20 rounded-full mix-blend-multiply filter blur-[90px] pointer-events-none -translate-x-1/4 translate-y-1/4" />
        <div className="absolute top-1/2 left-1/2 w-[30rem] h-[30rem] bg-ink-4/10 rounded-full mix-blend-multiply filter blur-[110px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />

        {/* ── ONE CARD: portrait and message share a single frame ──────── */}
        <div
          ref={cardRef}
          className="seat-full bg-white/40 backdrop-blur-3xl rounded-[3.5rem] p-8 md:p-12 lg:p-16 relative shadow-[0_20px_50px_rgba(0,0,0,0.04),inset_0_0_45px_rgba(255,255,255,0.4)] border border-white/40"
        >
          {/* Glossy liquid top highlight - Dialed back by 20% */}
          <div className="absolute inset-0 rounded-[3.5rem] border-t-[2px] border-l-[1px] border-white/50 pointer-events-none" />

          {/* The honey corner wash is gone — Rule 02.13 forbids gradients and
              glow washes outright, and it spent honey on decoration. */}

          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14 relative z-10">

            {/* Rule 05.3 — a human portrait is one of the three shapes allowed
                to stay a circle. The gradient ring around it was not. */}
            <div className="w-full lg:w-[36%] shrink-0 flex flex-col items-center gap-7">
              {/* Liquid Glass image frame - Dialed back */}
              <div className="rounded-full p-4 bg-white/40 backdrop-blur-2xl shadow-[0_15px_35px_rgba(0,0,0,0.04),inset_0_0_25px_rgba(255,255,255,0.4)] border border-white/40 relative z-10">
                <div className="absolute inset-0 rounded-full border-t-[1.5px] border-l-[1px] border-white/60 pointer-events-none" />
                <div className="rounded-full p-2 bg-white/50 shadow-[inset_0_8px_15px_rgba(255,255,255,0.4)] border border-white/30">
                  {/* Sized from the viewport rather than fixed at 256/320px, so
                      the portrait shrinks smoothly on small screens instead of
                      forcing its container wider than the phone. */}
                  <div
                    className="relative rounded-full overflow-hidden aspect-square shadow-[4px_4px_10px_rgba(0,0,0,0.1)]"
                    style={{ width: "clamp(160px, 42vw, 320px)" }}
                  >
                    {/* `founder-portrait.webp`, not `founder.webp`.

                        The original ships with a circular mask already burned
                        into the pixels: an 880px circle of photo centred in a
                        1080x995 canvas, everything outside it opaque black.
                        Dropped into this CSS circle it did not line up —
                        `object-cover` sizes a non-square source to the 995px
                        height, which puts the CSS circle at radius ~497
                        against the baked circle's 440, so a 57px ring of that
                        burned-in black rendered over the portrait.

                        The replacement is cropped square to just inside the
                        baked circle (radius 434 of 440, concentric), so the
                        circle this container draws can only ever sample photo.
                        `object-center`, because a square source in a square
                        box has nothing to align — `object-top` was there to
                        chase the old misalignment and only hid part of it. */}
                    <Image
                      src="/assets/founder-portrait.webp"
                      alt="Pooveandhan Elangovan, Founder and CEO"
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                </div>
              </div>

              {/* The one question we work by — right under the founder */}
              {/* Rule 03.6 — italic is permitted only at caption and body-s,
                  for a single attributed line. This is that line.
                  Rule 02.7 — the closing question is the narrative resolution
                  moment, so it earns its honey. */}
              <div className="relative pl-5 border-l-2 border-ink-6 max-w-[320px] text-left">
                <p className="t-body-s italic text-ink-3">
                  This is more than a company for me. It&apos;s a commitment to{" "}
                  <span className="text-honey-5 not-italic font-semibold">engineering with conscience.</span>
                </p>
              </div>
            </div>

            {/* ── Message column ───────────────────────────────────────── */}
            <div className="flex-1 min-w-0 text-center lg:text-left">

              {/* Rule 03.8 — the role is a label, so it is a hairline and text. */}
              <div className="flex items-center gap-3 mb-4 justify-center lg:justify-start">
                <span aria-hidden className="h-px w-6 bg-ink-6" />
                <span className="t-meta text-ink-4">Founder &amp; CEO</span>
              </div>

              <h3 className="t-h3 text-ink-2 mb-1">
                Pooveandhan Elangovan
              </h3>
              <p className="t-meta text-ink-4 mb-8">
                Chief Executive Officer · Hivecrest Technologies
              </p>

              {/* Biography */}
              <div className="mb-0 flex flex-col gap-4 max-w-[64ch] mx-auto lg:mx-0">
                {BIO_PARAGRAPHS.map((para, i) => (
                  <p key={i} className="t-body text-ink-3 measure-body">
                    {para}
                  </p>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
