"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/ui/SectionHeading";
import { VisionIcon, MissionIcon } from "@/components/ui/HexIcons";
import {
  prefersReducedMotion,
  revealFrom,
  revealTo,
  triggerOnce,
  wipeFrom,
  wipeTo,
} from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

// ── Single card ───────────────────────────────────────────────────────────────
interface CardProps {
  title: string;
  /** One paragraph, or several — the Mission statement runs to two. */
  text: string | string[];
  imagePath: string;
  icon: React.ReactNode;
  tag: string;
  cardRef: React.RefObject<HTMLDivElement | null>;
}

function Card({ title, text, imagePath, icon, tag, cardRef }: CardProps) {
  return (
    <div
      ref={cardRef}
      /* `card-edge`, not the shared `card-mark`: this section gets its own
         hover identity. A honey rule wipes across the top of the card and the
         icon tile inverts to ink. The Achievements strip below uses a
         different treatment again — same system, different voice. */
      /* Added hover animation (lift and shadow) as requested, overriding strict motion rules for this component. */
      className="m-line card-edge group relative w-full h-full cut-3 overflow-hidden flex flex-col transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(0,0,0,0.12)]"
    >
      {/* 16:7 rather than 16:9 — the taller strip was making each card far
          bigger than the amount of copy in it justified. */}
      <div className="relative w-full aspect-[16/7] overflow-hidden flex-shrink-0">
        <Image
          src={imagePath}
          alt={title}
          fill
          /* No `sizes` — `images.unoptimized` in next.config.ts strips both
             `srcSet` and `sizes`, so it never reached the DOM. */
          /* Note: The user explicitly requested an animated card, so image scale on hover is added here. */
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          {/* Rule 06.5 — surfaces are opaque. `bg-white/90 backdrop-blur-sm`
              composited a translucent strip every frame for a label. */}
          <span className="tag cut-1">
            {tag}
          </span>
        </div>
      </div>

      <div className="px-6 md:px-7 py-6 md:py-7 flex flex-col gap-4 flex-grow">
        {/* The tile used to sit in a flex row beside the title. That pushed the
            title 52px to the right of the card's padding while the paragraph
            below stayed flush with it — two left edges inside a three-element
            stack, which is what read as the text being out of line. Stacking
            the tile gives icon, title and body one shared edge.

            Indenting the paragraph to meet the title was the other way to
            resolve it and is not available: 40px tile + 12px gap = 52px, and
            Rule 04.5 puts 52 off the spacing scale. */}
        {/* Rule 02.7 — an icon tile is not on the honey list. Demoted to ink. */}
        <div className="card-edge-tile w-10 h-10 cut-1 bg-ink-8 flex items-center justify-center text-ink-3 shrink-0">
          {icon}
        </div>

        <h3 className="t-h4 text-ink-2">
          {title}
        </h3>

        {(Array.isArray(text) ? text : [text]).map((para) => (
          <p key={para} className="t-body-s text-ink-3 measure-body">
            {para}
          </p>
        ))}
      </div>
    </div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
export default function VisionMission() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const card1Ref   = useRef<HTMLDivElement>(null);
  const card2Ref   = useRef<HTMLDivElement>(null);

  /**
   * Scroll behaviour: TRIGGERED. About above is scrubbed and Achievements
   * below is scrubbed, so Rule 07.4 holds on both sides.
   *
   * Register: working — choreography budget 4 (Rule 07.5). Three elements move,
   * inside budget.
   *
   * The heading reveals downward; the two cards uncover from opposite outer
   * edges towards each other. Nothing fades, because Rule 07.3 bans pairing
   * opacity with translate.
   */
  useEffect(() => {
    if (prefersReducedMotion()) return;   // Rule 07.7 — render the settled frame

    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current, revealFrom, {
        ...revealTo,
        scrollTrigger: { trigger: sectionRef.current, ...triggerOnce },
      });

      // The two cards uncover from opposite sides towards the centre — the
      // pair archetype's own signature, distinct from the downward reveal the
      // heading uses and from the scrubbed wipe in About above.
      [card1Ref, card2Ref].forEach((ref, i) => {
        gsap.fromTo(ref.current, wipeFrom(i === 0 ? "left" : "right"), {
          ...wipeTo,
          delay: i * 0.1,
          scrollTrigger: { trigger: sectionRef.current, ...triggerOnce },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="vision"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-ivory-3 rhythm-2"
    >
      <div className="grid-page">

        {/* Seat changed from `offset` to `full`.
            Archetype C (§13.2) specifies an `offset` opener over full-width
            content, and that is what was here — but `seat-offset` starts at
            column 6 while the card pair below starts at column 1, so the
            heading hung five columns to the right of everything it introduces.
            Below md it was worse rather than better: `seat-offset` maps to
            cols 3–8 of 8, a 25% indent above two cards that run edge to edge.

            The cards' own comment already records fixing half of this — they
            were pulled out of a centred flex row because "the heading [was]
            hanging off to one side and nothing lin[ed] up". This is the other
            half. Rule 04.1 still holds: About above is `anchor` and
            Achievements below is `anchor`, so anchor → full → anchor shares no
            seat between consecutive sections, and Rule 04.2 names
            `anchor` → `full` as a passing pair. */}
        <div ref={headingRef} className="seat-full">
          <SectionHeading
            eyebrow="Vision & Mission"
            title={
              <>
                {/* `&apos;`, not `&rsquo;`. This was the only curly apostrophe
                    on the site; the other 25 are straight, so one heading was
                    set in different punctuation from every other contraction. */}
                Where we&apos;re headed,
                {/* The break is what the line wants at tablet and up. Below sm
                    the h2 floor is 40px in a ~330px column, so the first half
                    wraps on its own anyway and forcing a second break on top
                    of that produced four ragged lines out of a two-line
                    heading. */}
                <br className="hidden sm:inline" />{" "}
                and how we get there
              </>
            }
            subtitle="What we are working towards, and how we intend to get there."
          />
        </div>

        {/* ── Cards ──
            A two-column grid rather than a centred flex row. The old layout
            gave each card `max-w-[460px]` inside a `justify-center` row, so on
            a wide viewport the pair floated in the middle with the heading
            hanging off to one side and nothing lining up. The grid makes both
            cards equal, full-bleed to the seat, and flush with the section. */}
        <div className="seat-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch mt-10">
          {/* Both statements are quoted from the company brochure (page 3). */}
          <Card
            cardRef={card1Ref}
            title="Vision"
            text="To become a trusted technology partner delivering intelligent and efficient solutions that create lasting value for organizations."
            imagePath="/assets/vision_professional.jpg"
            tag="Direction"
            icon={<VisionIcon />}
          />
          <Card
            cardRef={card2Ref}
            title="Mission"
            text="To engineer practical Intelligent Systems, automation, and enterprise solutions that reduce operational effort, improve efficiency, and enable organizations to perform better."
            imagePath="/assets/mission_professional.jpg"
            tag="Purpose"
            icon={<MissionIcon />}
          />
        </div>
      </div>
    </section>
  );
}
