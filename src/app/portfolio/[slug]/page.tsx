import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PORTFOLIO, portfolioPath } from "@/lib/portfolio";
import { SITE_NAME, SITE_URL, MAILTO, START_PROJECT_HREF } from "@/lib/site";
import SiteHeader from "@/components/SiteHeader";

/**
 * One page per GJ Global portfolio product, built on the same archetype
 * sequence as the service pages (STATEMENT → PAIR → STRIP → CLOSE) so a
 * visitor moving between the two kinds of detail page never feels a seam.
 * The differences are deliberate: the hero carries the product's system
 * label, the capabilities list runs two columns because the brochure lists
 * up to eleven, and there is no "Built with" block — these are partner
 * products, not systems Hivecrest engineered.
 *
 * `output: "export"` has no server, so every slug is enumerated at build time.
 */
export function generateStaticParams() {
  return PORTFOLIO.map((p) => ({ slug: p.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = PORTFOLIO.find((p) => p.slug === slug);
  if (!product) return {};

  const url = portfolioPath(product.slug);
  const title = `${product.name} | ${SITE_NAME}`;

  return {
    title,
    description: product.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title,
      description: product.metaDescription,
      siteName: SITE_NAME,
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: product.metaDescription,
    },
  };
}

export default async function PortfolioPage({ params }: Params) {
  const { slug } = await params;
  const product = PORTFOLIO.find((p) => p.slug === slug);
  if (!product) notFound();

  const others = PORTFOLIO.filter((p) => p.slug !== slug);
  const index = PORTFOLIO.findIndex((p) => p.slug === slug);
  const prev = index > 0 ? PORTFOLIO[index - 1] : null;
  const next = index < PORTFOLIO.length - 1 ? PORTFOLIO[index + 1] : null;

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen">
        {/* Archetype B — STATEMENT. Same opening as a service page. */}
        <section className="relative w-full bg-ivory-2 rhythm-1 pt-32 md:pt-40 pb-0">
          <div className="grid-page items-start gap-y-12">
            <div className="seat-anchor">
              <div className="flex items-center justify-between gap-4 mb-6">
                <Link
                  href="/#portfolio"
                  className="tap state gap-2 t-meta text-ink-4 hover:text-honey-5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Full portfolio</span>
                </Link>

                <span className="t-meta text-ink-4 shrink-0">
                  <span className="index-numeral">{product.id}</span>
                  <span> of </span>
                  <span className="index-numeral">
                    {String(PORTFOLIO.length).padStart(2, "0")}
                  </span>
                </span>
              </div>

              {/* The system label from the brochure's portfolio spread — the
                  one element a service page hero does not have. */}
              <div className="flex items-center gap-3 mb-4">
                <span aria-hidden className="h-px w-6 bg-ink-6" />
                <span className="t-meta text-ink-4">{product.system}</span>
              </div>

              <h1 className="t-h1 text-ink-2 mb-6">{product.name}</h1>
              <p className="t-lead text-ink-3 measure-lead">{product.position}</p>

              <div className="flex flex-wrap gap-2 mt-8">
                {product.chips.map((chip) => (
                  <span key={chip} className="tag cut-1">
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            {/* `seat-counter` carries placement at both breakpoints — see the
                identical note on the service page. */}
            <div className="seat-counter flex">
              <div className="elevate w-full self-start">
                <div className="m-paper cut-3 overflow-hidden w-full aspect-[3/2] relative">
                  <Image
                    src={product.image}
                    alt={`${product.name}, ${product.system}`}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Archetype C — PAIR. What it is, and what is in it. */}
        <section className="relative w-full bg-ivory-3 rhythm-2">
          <div className="grid-page gap-y-12">
            <div className="seat-anchor">
              <div className="flex items-center gap-3 mb-6">
                <span aria-hidden className="h-px w-6 bg-ink-6" />
                <span className="t-meta text-ink-4">Overview</span>
              </div>
              <p className="t-body-l text-ink-3 measure-body">{product.overview}</p>
              <p className="t-body-s text-ink-4 measure-body mt-6">
                Part of the GJ Global portfolio, offered through Hivecrest
                Technologies as a dealership partner.
              </p>
            </div>

            <div className="seat-full mt-4">
              <p className="t-meta text-ink-4 mb-5">Key capabilities</p>
              {/* Two columns from md: the brochure lists up to eleven, and a
                  single column that long reads as a form, not a page. */}
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-3">
                {product.capabilities.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="hex-bullet mt-[7px]" />
                    <span className="t-body-s text-ink-3">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Rule 02.7 — the outcome is the resolution moment on this
                  page, so it is where the honey goes. */}
              <p className="t-meta text-ink-4 mt-12 mb-4">The outcome</p>
              <p className="t-body-l text-honey-5 measure-lead">{product.outcome}</p>
            </div>
          </div>
        </section>

        {/* Archetype D — STRIP. The rest of the portfolio as index rows. */}
        <section className="relative w-full bg-ink-8 rhythm-2">
          <div className="grid-page">
            <div className="seat-full">
              <div className="flex items-center gap-3 mb-8">
                <span aria-hidden className="h-px w-6 bg-ink-6" />
                <span className="t-meta text-ink-4">The rest of the portfolio</span>
              </div>

              <div className="flex flex-col">
                {others.map((other) => (
                  <Link
                    key={other.slug}
                    href={portfolioPath(other.slug)}
                    className="state group flex items-baseline gap-6 py-6 border-t border-ink-6 hover:bg-chrome"
                  >
                    <span className="index-numeral t-h4 shrink-0 state group-hover:text-honey-5">{other.id}</span>
                    <span className="flex-1 min-w-0">
                      <span className="block t-h4 text-ink-2">{other.name}</span>
                      <span className="block t-body-s text-ink-4 mt-1">{other.system}</span>
                    </span>
                  </Link>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-ink-6 flex flex-col sm:flex-row gap-6 sm:gap-8 justify-between">
                {prev ? (
                  <Link
                    href={portfolioPath(prev.slug)}
                    className="tap state gap-3 group text-left"
                    aria-label={`Previous product: ${prev.name}`}
                  >
                    <ArrowLeft className="w-4 h-4 shrink-0 mt-1 text-ink-4" />
                    <span className="min-w-0">
                      <span className="block t-meta text-ink-4">Previous</span>
                      <span className="block t-body-s font-semibold text-ink-2 group-hover:text-honey-5">
                        {prev.name}
                      </span>
                    </span>
                  </Link>
                ) : (
                  <span aria-hidden />
                )}

                {next ? (
                  <Link
                    href={portfolioPath(next.slug)}
                    className="tap state gap-3 group sm:text-right sm:flex-row-reverse"
                    aria-label={`Next product: ${next.name}`}
                  >
                    <ArrowRight className="w-4 h-4 shrink-0 mt-1 text-ink-4" />
                    <span className="min-w-0">
                      <span className="block t-meta text-ink-4">Next</span>
                      <span className="block t-body-s font-semibold text-ink-2 group-hover:text-honey-5">
                        {next.name}
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

        {/* Archetype G — CLOSE. Same close as a service page. */}
        <section className="relative w-full bg-ivory-4 rhythm-4 pt-20 md:pt-24">
          <div className="grid-page">
            <div className="seat-anchor">
              <h2 className="t-h2 text-ink-2 measure-statement mb-8">
                Ask us about {product.name}.
              </h2>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Link href={START_PROJECT_HREF} className="btn btn-primary state cut-2">
                  Start a project
                </Link>
                <a href={MAILTO} className="btn btn-secondary state cut-2">
                  Email us directly
                </a>
              </div>
            </div>

            <div className="seat-full mt-16 md:mt-20 pt-8 border-t border-ink-7 flex justify-center">
              <Link
                href="/#portfolio"
                className="btn btn-secondary state cut-2 group"
                aria-label="Back to the full portfolio"
              >
                <ArrowLeft className="w-4 h-4 text-ink-4 group-hover:text-honey-5" />
                Back to the full portfolio
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Service schema, with GJ Global carried as the brand. Absolute URLs —
          a relative @id is ignored by every consumer. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: product.name,
            description: product.metaDescription,
            serviceType: product.system,
            brand: { "@type": "Brand", name: "GJ Global" },
            url: `${SITE_URL}${portfolioPath(product.slug)}`,
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
