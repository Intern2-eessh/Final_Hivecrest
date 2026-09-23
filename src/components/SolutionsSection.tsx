"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { SERVICES, servicePath } from "@/lib/services";
import {
  prefersReducedMotion,
  revealFrom,
  revealTo,
  settleFrom,
  settleTo,
  triggerOnce,
  wipeFrom,
  wipeTo,
} from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);


export default function SolutionsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * Scroll behaviour: TRIGGERED. Achievements above is scrubbed and Founder's
   * Desk below is static, so Rule 07.4 holds on both sides.
   *
   * Register: resolving — choreography budget 2 (Rule 07.5). Each row triggers
   * on its own, so only that row's media and copy are ever in motion: exactly
   * two elements.
   */
  useEffect(() => {
    if (prefersReducedMotion()) return;   // Rule 07.7 — render the settled frame

    const ctx = gsap.context(() => {
      gsap.fromTo(".solutions-head", revealFrom, {
        ...revealTo,
        scrollTrigger: { trigger: containerRef.current, ...triggerOnce },
      });

      // Each row uncovers from the outer edge its media sits on, so the motion
      // follows the zig-zag instead of cutting across it. Rows alternate
      // direction down the section, which is this archetype's signature and
      // distinct from every other section on the page.
      const rows = gsap.utils.toArray<HTMLElement>(".project-row", containerRef.current);
      rows.forEach((row, i) => {
        const fromSide = i % 2 === 0 ? "left" : "right";
        /**
         * The wipe uncovers the image; the turn gives it a thickness while it
         * arrives. `rotateY` swings from the same edge the wipe starts at, so
         * the row reads as one gesture rather than two — the media is being
         * opened toward the reader, not sliding past them.
         *
         * `Shift` (Rule 07.2) — something already present changing position.
         * Not `enter`: the wipe is what makes it visible, and it was always
         * there. Twelve degrees and 60px of depth, which is enough to be felt
         * at a glance and not enough to distort the photograph.
         *
         * Still exactly two elements per row (this and `.project-copy`), so the
         * resolving register's budget of 2 holds. Both are transforms, so the
         * whole row costs the compositor and nothing else.
         */
        gsap.fromTo(
          row.querySelector(".project-image-wrapper"),
          { ...wipeFrom(fromSide), rotateY: i % 2 === 0 ? -12 : 12, z: -60 },
          {
            ...wipeTo,
            rotateY: 0,
            z: 0,
            scrollTrigger: { trigger: row, ...triggerOnce },
          }
        );
        gsap.fromTo(row.querySelector(".project-copy"), settleFrom, {
          ...settleTo,
          delay: 0.12,
          scrollTrigger: { trigger: row, ...triggerOnce },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="solution"
      className="relative w-full overflow-hidden bg-ivory-3 rhythm-3"
    >
      {/* ── Section header ─────────────────────────────────────────────────
          The opener used to sit on `seat-inset` (columns 3–9) above rows on
          `seat-full` (columns 1–12). At 1440px that is a 336px column of dead
          grid to the right of the heading — nothing is placed in 10, 11 or 12
          — and a header whose right edge stops 336px short of the rows it
          introduces while its left edge starts 224px inside them. Neither edge
          agreed with anything below it, which is the empty band on the right of
          this section.

          The index keeps columns 1–2 and the heading now runs from column 3 to
          the page edge, so the header closes flush with the rows. There is no
          seat for 3 → -1, and adding one would be a new grid primitive for a
          single use, so the span is stated as utilities. `col-span-full` is the
          base because without a seat class there is no `grid-column` at all
          below `md`, and the heading would be auto-placed into one track.

          `items-start` rather than `items-end`: bottom-aligning a two-line
          index against an eyebrow + two-line h2 + subtitle left a tall void
          above "04". Aligned to the top it sits level with the eyebrow. */}
      <div className="solutions-head grid-page mb-10 md:mb-14 items-start">
        <div className="hidden md:block seat-index">
          <span className="index-numeral t-h2 block leading-none">04</span>
          <span className="t-meta text-ink-4 block mt-2">Services</span>
        </div>

        <SectionHeading
          className="col-span-full md:col-start-3 md:col-end-13"
          eyebrow="What We Build"
          title={<>Services and platforms,<br />one engineering standard</>}
          subtitle="Each one is built to be handed over, run by your own team, and supported by ours."
        />
      </div>

      {/* ── Projects ───────────────────────────────────────────────────────
          On the page grid rather than its own centred container, so the rows
          line up with the opener above instead of sitting on a second,
          slightly different measure. */}
      <div className="grid-page">
      <div className="seat-full flex flex-col gap-12 md:gap-24 pb-16">
        {SERVICES.map((project, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={project.id}
              className="project-row group flex flex-col md:flex-row items-center gap-8 md:gap-16 p-8 md:p-12 lg:p-16 rounded-[2.5rem] bg-ivory-3 shadow-[12px_12px_32px_#cfcbbb,-12px_-12px_32px_#ffffff]"
              data-reversed={(!isEven).toString()}
            >
              {/* Image column.

                  No border and no inset ground — the outlined box around each
                  image read as a placeholder rather than a frame. The image is
                  now the surface: full column width, cut corner, nothing drawn
                  around it. `object-cover` at 16:10 fills that shape without
                  the letterboxing `object-contain` produced. */}
              {/* `depth-stage` carries the perspective for the turn below.
                  It sits on this column rather than on the wrapper itself —
                  `perspective` applies to an element's direct children. */}
              <div
                className={`depth-stage w-full md:w-1/2 ${isEven ? "md:order-1" : "md:order-2"}`}
              >
                <div className="project-image-wrapper relative w-full aspect-[16/10] rounded-[2rem] p-3 md:p-4 bg-ivory-3 shadow-[8px_8px_20px_#cfcbbb,-8px_-8px_20px_#ffffff]">
                  <div className="relative w-full h-full rounded-[1.25rem] overflow-hidden">
                    <Image
                      src={project.image}
                      alt={`${project.title} by Hivecrest`}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                </div>
              </div>

              {/* Copy column */}
              <div
                className={`project-copy w-full md:w-1/2 flex flex-col justify-center space-y-5 ${
                  isEven ? "md:order-2" : "md:order-1"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="index-numeral t-h4 shrink-0 px-4 py-2 rounded-xl bg-ivory-3 shadow-[inset_4px_4px_8px_#cfcbbb,inset_-4px_-4px_8px_#ffffff] text-honey-5 font-bold">
                    {project.id}
                  </span>
                  <h3 className="t-h3 text-honey-3" style={{ textShadow: "1.5px 1.5px 2px #ffffff, -1.5px -1.5px 2px rgba(0,0,0,0.15)" }}>
                    {project.title}
                  </h3>
                </div>

                <p className="t-body-l text-ink-3 measure-lead">
                  {project.tagline}
                </p>

                <div className="flex flex-wrap gap-3 pt-2">
                  {project.chips.map((chip) => (
                    <span
                      key={chip}
                      className="px-4 py-2 rounded-full text-xs font-semibold text-ink-3 bg-ivory-3 shadow-[4px_4px_10px_#cfcbbb,-4px_-4px_10px_#ffffff]"
                    >
                      {chip}
                    </span>
                  ))}
                </div>

                <p className="t-body-s italic text-ink-4 measure-lead border-l-2 border-ink-6 pl-4">
                  {project.outcome}
                </p>

                <Link
                  href={servicePath(project.slug)}
                  className="tap state group/btn flex items-center justify-between gap-4 t-body-s font-semibold text-ink-2 mt-4 px-8 py-4 rounded-full bg-ivory-3 shadow-[6px_6px_16px_#cfcbbb,-6px_-6px_16px_#ffffff] hover:shadow-[4px_4px_8px_#cfcbbb,-4px_-4px_8px_#ffffff] active:shadow-[inset_4px_4px_8px_#cfcbbb,inset_-4px_-4px_8px_#ffffff] transition-all duration-300 w-fit"
                >
                  <span>Explore {project.title}</span>
                  <span className="p-2 rounded-full bg-ivory-3 shadow-[inset_3px_3px_6px_#cfcbbb,inset_-3px_-3px_6px_#ffffff] text-honey-5 group-hover/btn:text-honey-4 transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      </div>

    </section>
  );
}
