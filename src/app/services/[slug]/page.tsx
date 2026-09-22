import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SERVICES, servicePath } from "@/lib/services";
import { SITE_NAME, SITE_URL, MAILTO, START_PROJECT_HREF } from "@/lib/site";
import SiteHeader from "@/components/SiteHeader";

/**
 * One page per service (audit H-06). Four services previously competed for a
 * single URL, one title tag and one meta description, which meant the site
 * could rank for at most one of them.
 *
 * `output: "export"` has no server, so every slug is enumerated at build time.
 */
export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return {};

  const url = servicePath(service.slug);
  const title = `${service.title} | ${SITE_NAME}`;

  return {
    title,
    description: service.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title,
      description: service.metaDescription,
      siteName: SITE_NAME,
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: service.metaDescription,
    },
  };
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const others = SERVICES.filter((s) => s.slug !== slug);

  /* Sequential neighbours in the order the services are listed everywhere else
     on the site: 01 Web Applications, 02 Business Websites, 03 Domain &
     Hosting, 04 AI Video Analytics Platform, 05 AI Tel-Calling.

     No wrap-around. These used to be modulo the list length, so the last entry
     offered the first as "Next" — a next that goes backwards to 01 is not a
     next. 01 has no Previous and the last entry has no Next; the ends of a
     list are allowed to be ends, and "The others" list above already reaches
     every service from anywhere. */
  const index = SERVICES.findIndex((s) => s.slug === slug);
  const prev = index > 0 ? SERVICES[index - 1] : null;
  const next = index < SERVICES.length - 1 ? SERVICES[index + 1] : null;

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen">
        {/* Archetype B — STATEMENT. Seat `anchor`, ground ivory-2, rhythm-1.
            The page opens in the noise register and settles downward, the same
            arc the home page runs (§13.3). */}
        {/* `pt-32 md:pt-40` clears the fixed 80px header; `pb-0` because the
            step to the ivory-3 section below is invisible (1.01 ratio), so both
            rhythm bands stacked into one 144px void under the hero image —
            the empty band that made this page look broken on a phone. */}
        <section className="relative w-full bg-ivory-2 rhythm-1 pt-32 md:pt-40 pb-0">
          <div className="grid-page items-start gap-y-12">
            <div className="seat-anchor">
              {/* The way back, stated as one.
                  This was a hairline plus the word "Solutions" set at t-meta —
                  a link that read as a label. Arriving here from the home page
                  left no obvious route back into it, which is what made these
                  pages feel like a dead end: the section nav goes blank off the
                  home page, so once you were here the site appeared to have
                  stopped. An arrow, a verb-shaped label, and a position count
                  so it is clear this is one of a set rather than the end. */}
              <div className="flex items-center justify-between gap-4 mb-6">
                <Link
                  href="/#solution"
                  className="tap state gap-2 t-meta text-ink-4 hover:text-honey-5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>All solutions</span>
                </Link>

                <span className="t-meta text-ink-4 shrink-0">
                  <span className="index-numeral">{service.id}</span>
                  <span> of </span>
                  <span className="index-numeral">
                    {String(SERVICES.length).padStart(2, "0")}
                  </span>
                </span>
              </div>

              <h1 className="t-h1 text-ink-2 mb-6">{service.title}</h1>
              <p className="t-lead text-ink-3 measure-lead">{service.tagline}</p>

              <div className="flex flex-wrap gap-2 mt-8">
                {service.chips.map((chip) => (
                  <span key={chip} className="tag cut-1">
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            {/* `seat-counter` rather than `md:col-start-9 md:col-span-4`. The
                seats in globals.css are unlayered and Tailwind's column
                utilities are in `@layer utilities`, so a `md:col-*` pair is the
                element's ONLY grid placement — and it says nothing below 900px.
                The grid then auto-placed this into a single track: one column
                of eight on a tablet, one of four on a phone, which rendered the
                hero image as a ~50-100px sliver with the rest of the row blank.
                Same bug, same fix as the About video (AboutUs.tsx). */}
            <div className="seat-counter flex">
              <div className="elevate w-full self-start">
                <div className="m-paper cut-3 overflow-hidden w-full aspect-[3/2] relative">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Archetype C — PAIR. ivory-3, rhythm-2. What it is, and what is in it.

            The opener was on `seat-offset` (columns 6–12). Every other left
            edge on this page — the h1 above, "What's included" directly below,
            the index rows, the closing statement — sits at column 1, so the
            overview alone started 556px in, with an empty column that height
            beside it. `measure-body` already holds the line length, so the
            indent bought nothing it did not already have. */}
        <section className="relative w-full bg-ivory-3 rhythm-2">
          <div className="grid-page gap-y-12">
            <div className="seat-anchor">
              <div className="flex items-center gap-3 mb-6">
                <span aria-hidden className="h-px w-6 bg-ink-6" />
                <span className="t-meta text-ink-4">Overview</span>
              </div>
              <p className="t-body-l text-ink-3 measure-body">{service.overview}</p>
            </div>

            <div className="seat-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mt-4">
              <div>
                <p className="t-meta text-ink-4 mb-5">What&apos;s included</p>
                <ul className="flex flex-col gap-3">
                  {service.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="hex-bullet mt-[7px]" />
                      <span className="t-body-s text-ink-3">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="t-meta text-ink-4 mb-5">Built with</p>
                <div className="flex flex-wrap gap-2">
                  {service.stack.map((tech) => (
                    <span key={tech} className="tag cut-1">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Rule 02.7 — the outcome is the resolution moment on this
                    page, so it is where the honey goes. */}
                <p className="t-meta text-ink-4 mt-10 mb-4">The outcome</p>
                <p className="t-body-l text-honey-5 measure-lead">{service.outcome}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Archetype D — STRIP. Seat `full`, Inset ground, rhythm-2, static.
            The other three services as index rows (§12.5) rather than cards. */}
        <section className="relative w-full bg-ink-8 rhythm-2">
          <div className="grid-page">
            <div className="seat-full">
              <div className="flex items-center gap-3 mb-8">
                <span aria-hidden className="h-px w-6 bg-ink-6" />
                <span className="t-meta text-ink-4">
                  The other {["", "one", "two", "three", "four", "five"][others.length] ?? others.length}
                </span>
              </div>

              <div className="flex flex-col">
                {others.map((other) => (
                  <Link
                    key={other.slug}
                    href={servicePath(other.slug)}
                    className="state group flex items-baseline gap-6 py-6 border-t border-ink-6 hover:bg-chrome"
                  >
                    <span className="index-numeral t-h4 shrink-0 state group-hover:text-honey-5">{other.id}</span>
                    <span className="flex-1 min-w-0">
                      <span className="block t-h4 text-ink-2">{other.title}</span>
                      <span className="block t-body-s text-ink-4 mt-1">{other.tagline}</span>
                    </span>
                  </Link>
                ))}
              </div>

              {/* Sequential navigation, under the list rather than instead of
                  it. The list answers "what else is there"; this answers "keep
                  going" without making the visitor choose. Both are needed
                  because arriving here from search means the home page's own
                  order was never seen. */}
              {/* `justify-between` with only one child would push a lone
                  "Next" to the left, where a Previous should be. The empty
                  `<span />` holds the missing side's place so each control
                  stays on its own edge whichever one is absent. */}
              <div className="mt-10 pt-8 border-t border-ink-6 flex flex-col sm:flex-row gap-6 sm:gap-8 justify-between">
                {prev ? (
                  <Link
                    href={servicePath(prev.slug)}
                    className="tap state gap-3 group text-left"
                    aria-label={`Previous service: ${prev.title}`}
                  >
                    <ArrowLeft className="w-4 h-4 shrink-0 mt-1 text-ink-4" />
                    <span className="min-w-0">
                      <span className="block t-meta text-ink-4">Previous</span>
                      <span className="block t-body-s font-semibold text-ink-2 group-hover:text-honey-5">
                        {prev.title}
                      </span>
                    </span>
                  </Link>
                ) : (
                  <span aria-hidden />
                )}

                {next ? (
                  <Link
                    href={servicePath(next.slug)}
                    className="tap state gap-3 group sm:text-right sm:flex-row-reverse"
                    aria-label={`Next service: ${next.title}`}
                  >
                    <ArrowRight className="w-4 h-4 shrink-0 mt-1 text-ink-4" />
                    <span className="min-w-0">
                      <span className="block t-meta text-ink-4">Next</span>
                      <span className="block t-body-s font-semibold text-ink-2 group-hover:text-honey-5">
                        {next.title}
                      </span>
                    </span>
                  </Link>
                ) : (
                  <span aria-hidden />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Archetype G — CLOSE. ivory-4, rhythm-4. On `anchor` rather than
            `inset`, so the closing statement lines up with everything above it
            instead of introducing a third left edge in the last screen.
            `pt-20 md:pt-24`: the STRIP above closes with its own rhythm-2 band,
            so the two openings met as 240px between the last index row and this
            heading, around only ~200px of content. The bottom keeps rhythm-4 —
            that one is the run into the footer and is meant to be quiet. */}
        <section className="relative w-full bg-ivory-4 rhythm-4 pt-20 md:pt-24">
          <div className="grid-page">
            <div className="seat-anchor">
              <h2 className="t-h2 text-ink-2 measure-statement mb-8">
                Tell us what isn&apos;t working.
              </h2>
              {/* `items-start` so the two buttons keep their own widths on a
                  phone. Without it the default `stretch` made both full-bleed
                  here while the hero's pair — the same component, three
                  sections apart — stayed auto-width. */}
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Link href={START_PROJECT_HREF} className="btn btn-primary state cut-2">
                  Start a project
                </Link>
                <a href={MAILTO} className="btn btn-secondary state cut-2">
                  Email us directly
                </a>
              </div>
            </div>

            {/* The way out, in place of a footer.

                A service page is a detail view opened from one row of the
                Solutions section, so it closes the way a detail view closes:
                by going back to the set it came from. The full site footer —
                four nav columns, the contact block, the staff entrance — is
                the home page's ending, and repeating it here made the page
                read as a destination rather than as one of four.

                This is `seat-full` and centred so it reads as the end of the
                page rather than as one more link in the closing statement's
                column. It is also the only control below the CTA pair, which
                is what makes it findable without a footer to scan. */}
            <div className="seat-full mt-16 md:mt-20 pt-8 border-t border-ink-7 flex justify-center">
              <Link
                href="/#solution"
                className="btn btn-secondary state cut-2 group"
                aria-label="Back to all solutions"
              >
                {/* Rule 08.6 — hover changes value, not position, so the
                    arrow does not slide left on hover. */}
                <ArrowLeft className="w-4 h-4 text-ink-4 group-hover:text-honey-5" />
                Back to all solutions
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Service schema (audit H-07). Absolute URLs — a relative @id is
          ignored by every consumer. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.title,
            description: service.metaDescription,
            serviceType: service.title,
            url: `${SITE_URL}${servicePath(service.slug)}`,
            provider: {
              "@type": "Organization",
              name: "Hivecrest Technologies Pvt Ltd",
              url: SITE_URL,
            },
            areaServed: { "@type": "Country", name: "India" },
          }),
        }}
      />
    </>
  );
}
