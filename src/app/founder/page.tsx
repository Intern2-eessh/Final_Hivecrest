import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import { SITE_NAME, ROUTES, START_PROJECT_HREF } from "@/lib/site";

const DESCRIPTION =
  "Pooveandhan Elangovan, founder and CEO of Hivecrest Technologies, on building software that doesn't just run, but understands, responds, and supports.";

export const metadata: Metadata = {
  title: `Founder's Desk | ${SITE_NAME}`,
  description: DESCRIPTION,
  alternates: { canonical: ROUTES.founder },
  openGraph: {
    type: "profile",
    url: ROUTES.founder,
    title: `Founder's Desk | ${SITE_NAME}`,
    description: DESCRIPTION,
    siteName: SITE_NAME,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title: `Founder's Desk | ${SITE_NAME}`, description: DESCRIPTION },
};

// Quoted verbatim from the company profile (page 4). The closing line is the
// attributed pull-quote below, so it is not repeated in the body.
const BIO = [
  "We didn't start Hivecrest Technologies just to build software. We started it because we saw a gap between what technology can do and what it should do for businesses. When I looked at repetitive processes that drained time and slowed growth, or customer conversations and signals that went unnoticed, I saw an opportunity. An opportunity to build software that doesn't just run, but understands, responds, and supports.",
  "At Hivecrest Technologies, we are not just creating products. We are building solutions that carry purpose. Solutions that reduce friction, increase efficiency, and bring clarity to everyday work.",
];

export default function FounderPage() {
  return (
    <PageShell
      eyebrow="Founder's Desk"
      title="The standard we build to"
      lead="Pooveandhan Elangovan · Chief Executive Officer"
    >
      {/* Archetype F — CHAPTER. The `Ink` material appears exactly once per
          page (Rule 06.3); on the home page it is the Founder's Desk section,
          and here it is the founder's own page. */}
      <section className="relative w-full m-ink rhythm-3">
        <div className="grid-page gap-y-12">
          <div className="seat-anchor">
            <div className="flex items-center gap-3 mb-6">
              <span aria-hidden className="h-px w-6 bg-ink-6" />
              <span className="t-meta text-ink-4">In his words</span>
            </div>

            <div className="flex flex-col gap-5">
              {BIO.map((para, i) => (
                <p key={i} className="t-body text-ink-3 measure-body">
                  {para}
                </p>
              ))}
            </div>

            {/* Rule 03.6 — italic only at body-s, for a single attributed line.
                Rule 02.7 — the closing question is the resolution moment. */}
            <div className="relative pl-5 border-l-2 border-ink-6 mt-10 max-w-[46ch]">
              <p className="t-body-s italic text-ink-3">
                This is more than a company for me. It&apos;s a commitment to{" "}
                <span className="text-honey-5 not-italic font-semibold">
                  engineering with conscience.
                </span>
              </p>
            </div>
          </div>

          {/* `seat-counter`, not `md:col-start-9 md:col-span-4` — the seat is
              unlayered and carries the placement at both breakpoints. The
              utility pair left this with no `grid-column` at all below 900px,
              so the portrait sat in a single 51-83px track and overhung it. */}
          <div className="seat-counter">
            {/* Rule 05.3 — a human portrait is one of three shapes allowed to
                stay a circle. */}
            <div className="rounded-full p-1.5 bg-ink-7 w-fit">
              <div className="rounded-full p-1.5 bg-paper">
                <div
                  className="relative rounded-full overflow-hidden aspect-square"
                  style={{ width: "clamp(150px, 38vw, 288px)" }}
                >
                  {/* See the note in FoundersDesk.tsx: `founder.webp` has a
                      circular mask burned into it that does not line up with
                      this container, so a ring of black rendered over the
                      portrait. This asset is cropped square to just inside
                      that baked circle. */}
                  <Image
                    src="/assets/founder-portrait.webp"
                    alt="Pooveandhan Elangovan, Founder and CEO"
                    fill
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Archetype G — CLOSE. On `anchor` so the last screen keeps the page's
          single left edge. `pt-20 md:pt-24` — see the service pages. */}
      <section className="relative w-full bg-ivory-4 rhythm-4 pt-20 md:pt-24">
        <div className="grid-page">
          <div className="seat-anchor">
            <h2 className="t-h2 text-ink-2 measure-statement mb-8">
              Bring us the process nobody wants to own.
            </h2>
            {/* `items-start` — auto-width buttons on a phone, matching the
                hero and the service pages rather than stretching full-bleed. */}
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link href={START_PROJECT_HREF} className="btn btn-primary state cut-2">
                Start a project
              </Link>
              <Link href={ROUTES.about} className="btn btn-secondary state cut-2">
                How we work
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
