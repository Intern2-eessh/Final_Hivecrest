"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/ui/SectionHeading";
import { prefersReducedMotion, scrubbed, drawFrom, drawTo } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/* The three credentials from the company profile (page 4), in its order:
   Recognised by StartupTN, DPIIT Certified Startup, Incubated at iTNT.
   `logoW`/`logoH` carry each source's real aspect — StartupTN's lockup is
   wide (738x180), so a shared square declaration would reserve the wrong
   box and reflow on load. */
const achievements = [
  {
    index: "01",
    title: "Recognised by StartupTN",
    desc: "Recognised by the Government of Tamil Nadu's startup mission, which backs emerging companies across the state.",
    logo: "/startuptn-logo.png",
    logoW: 246,
    logoH: 60,
    meta: "Government of Tamil Nadu",
  },
  {
    index: "02",
    title: "DPIIT Certified Startup",
    desc: "Officially recognised by the Government of India, unlocking exclusive regulatory benefits, tax exemptions, and growth opportunities.",
    logo: "/assets/DPIIT.png",
    logoW: 112,
    logoH: 112,
    meta: "Government of India",
  },
  {
    index: "03",
    title: "Incubated at iTNT",
    desc: "Incubated at Tamil Nadu Technology Hub (iTNT), backed by a strong innovation ecosystem to support our growth.",
    logo: "/assets/itnt.png",
    logoW: 112,
    logoH: 112,
    meta: "Tamil Nadu Technology Hub",
  },
];

/**
 * Scroll behaviour: SCRUBBED.
 *
 * Vision above and Solutions below are both triggered, so Rule 07.4 needs a
 * third behaviour here. The credentials themselves never animate in — they are
 * facts and must be readable the moment the section is on screen — so what the
 * scrollbar drives is the framing rule extending across the band. The content
 * is static; only the structure is drawn.
 */
export default function OurAchievements() {
  const sectionRef = useRef<HTMLElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;   // Rule 07.7 — render the settled frame

    const ctx = gsap.context(() => {
      gsap.fromTo(ruleRef.current, drawFrom, {
        ...drawTo,
        ease: "none",   // scrubbed sequences use --ease-drive
        scrollTrigger: scrubbed({ trigger: sectionRef.current }),
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    // Rule 02.3 — `--paper` is a material, not a background: no full-width band
    // is pure white. This band is the `Inset` ground instead, which is what a
    // recessed strip of supporting detail is for.
    <section
      id="achievements"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-ink-8 rhythm-2"
    >
      {/* The top rule is the drawn one — it extends across the full band as the
          section is scrolled through. The bottom stays a plain hairline so the
          band still reads as closed before the animation runs. */}
      <div ref={ruleRef} className="absolute top-0 inset-x-0 h-0.5 bg-ink-2 origin-left" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-ink-7" />

      <div className="grid-page">

        <SectionHeading
          /* `md:col-span-6` used to sit here and never applied — the seat is
             unlayered, Tailwind's utilities are layered, so the seat always
             won. It also misstated the result: `seat-anchor` is `1 / 8`, i.e.
             seven columns, not six. */
          className="seat-anchor"
          eyebrow="Notables"
          title="Recognition that backs the work"
          subtitle="Credentials that matter to the businesses that trust us with their systems."
        />

        {/* Filled what was empty space to the right of the opener. Placed by
            `seat-counter` (cols 8-12, the same span the old
            `md:col-start-8 md:col-span-5` asked for) rather than by column
            utilities, which carry no placement below 900px — harmless only
            while `hidden` is also there, and a sliver the moment it is not. */}
        <p className="hidden md:block seat-counter t-body-s text-ink-4 measure-body self-end">
          Approvals are not outcomes, and we do not present them as such. They
          are here because procurement teams ask for them, and because they are
          the only claims on this page that a third party has already checked.
        </p>

        {/* Three credentials: two-up at md, three-up from lg so the row stays
            one line on desktop and the cards keep a readable width on tablet. */}
        <div className="seat-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12">
          {achievements.map((item) => (
            <div
              key={item.index}
              /* `card-rule`, not the Vision cards' `card-edge`: a 2px structural
                 edge draws down the left and the numeral promotes to ink. No
                 ground change — a credential is a fact, not an invitation, and
                 it should not behave like something you can click. */
              className="m-line card-rule relative cut-3 p-8 md:p-10 flex flex-col items-start h-full"
            >
              {/* Rule 02.7 / D-008 — index numbers mark position, not
                  importance, so they are ink. Rule 03.2 — numerals are set in
                  the display face with tabular figures. */}
              <span className="index-numeral absolute top-6 right-6 t-h4">
                {item.index}
              </span>

              {/* Declared at each source's own aspect (see `logoW`/`logoH`
                  above) so the reserved box matches what decodes — a square
                  declaration under StartupTN's wide lockup reflowed on load. */}
              <div className="h-24 md:h-28 mb-8 flex items-center">
                <Image
                  src={item.logo}
                  alt={item.title}
                  width={item.logoW}
                  height={item.logoH}
                  className="max-h-full max-w-full w-auto object-contain"
                />
              </div>

              <span className="t-meta text-ink-4 mb-3">{item.meta}</span>
              <h3 className="t-h4 text-ink-2 mb-3">{item.title}</h3>
              <p className="t-body-s text-ink-3 measure-body">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
