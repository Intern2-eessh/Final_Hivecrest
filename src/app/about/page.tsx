import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import { SERVICES, servicePath } from "@/lib/services";
import { SITE_NAME, ROUTES, START_PROJECT_HREF } from "@/lib/site";

const DESCRIPTION =
  "Hivecrest Technologies builds web applications, business websites and AI calling systems for companies whose processes have outgrown spreadsheets. Engineered for the conditions the work actually happens in.";

export const metadata: Metadata = {
  title: `About | ${SITE_NAME}`,
  description: DESCRIPTION,
  alternates: { canonical: ROUTES.about },
  openGraph: {
    type: "website",
    url: ROUTES.about,
    title: `About | ${SITE_NAME}`,
    description: DESCRIPTION,
    siteName: SITE_NAME,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title: `About | ${SITE_NAME}`, description: DESCRIPTION },
};

const PRINCIPLES = [
  {
    id: "01",
    title: "Design the sixth month, not the launch",
    body: "A launch is one day. The question that matters is whether anyone is still using the thing half a year later, when the novelty has gone and the workarounds have had time to appear.",
  },
  {
    id: "02",
    title: "Build for the conditions the work happens in",
    body: "Patchy connections, low-cost Android phones, staff who were never trained on software, and a business that cannot stop while we deploy. If it only works in a demo, it does not work.",
  },
  {
    id: "03",
    title: "One system, not five impressive ones",
    body: "We would rather ship a single system a team opens every morning than five that photograph well in a presentation and are quietly abandoned by March.",
  },
  {
    id: "04",
    title: "Hand it over properly",
    body: "Software you cannot run without us is not finished. Every project ends with your own team able to operate it, and with us still reachable when they would rather not.",
  },
];

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="About Us"
      title="Software that survives contact with a working day"
      lead="Hivecrest Technologies Private Limited is a technology company focused on Intelligent Systems, Automation, Enterprise Solutions, and Digital Intelligence."
    >
      {/* Archetype C — PAIR. ivory-3, rhythm-2.
          On `anchor`, not `offset`: at 1440px `seat-offset` put this copy at
          x=620 while the page title above and the index rows below both start
          at x=64, leaving a 556px empty column beside it. The measure cap is
          what sets the line length here, not the seat.
          `pb-0`: the INDEX section below is on the *same* ground, so the two
          rhythm bands met with nothing between them — 216px of identical
          ivory-3 reading as a hole rather than as quiet. The gap between the
          two blocks is now the INDEX section's own rhythm-3 opening. */}
      <section className="relative w-full bg-ivory-3 rhythm-2 pb-0">
        <div className="grid-page">
          <div className="seat-anchor">
            <div className="flex items-center gap-3 mb-6">
              <span aria-hidden className="h-px w-6 bg-ink-6" />
              <span className="t-meta text-ink-4">Where we come in</span>
            </div>
            <p className="t-body-l text-ink-3 measure-body mb-6">
              Most companies reach us with a process held together by spreadsheets,
              WhatsApp messages and follow-up calls. Nothing is broken exactly. It just
              takes four people to do the work of one, and nobody can say where a
              given order actually is.
            </p>
            <p className="t-body text-ink-3 measure-body">
              We replace that with one system their team can actually run. We start
              with the workflow and finish with the code, not the other way round.
            </p>
          </div>
        </div>
      </section>

      {/* Archetype E — INDEX. Index rows (§12.5) rather than a grid of cards.
          On `anchor`: an index is a list, and a list that starts 222px inside
          every other left edge on the page reads as an accident. */}
      <section className="relative w-full bg-ivory-3 rhythm-3">
        <div className="grid-page">
          <div className="seat-anchor">
            <div className="flex items-center gap-3 mb-8">
              <span aria-hidden className="h-px w-6 bg-ink-6" />
              <span className="t-meta text-ink-4">How we work</span>
            </div>

            <div className="flex flex-col">
              {PRINCIPLES.map((p) => (
                <div key={p.id} className="flex items-baseline gap-6 py-8 border-t border-ink-6">
                  <span className="index-numeral t-h4 shrink-0">{p.id}</span>
                  <div className="flex-1 min-w-0">
                    <h2 className="t-h4 text-ink-2 mb-3">{p.title}</h2>
                    <p className="t-body-s text-ink-3 measure-body">{p.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Archetype D — STRIP. Inset band listing the services and platforms. */}
      <section className="relative w-full bg-ink-8 rhythm-2">
        <div className="grid-page">
          <div className="seat-full">
            <div className="flex items-center gap-3 mb-8">
              <span aria-hidden className="h-px w-6 bg-ink-6" />
              <span className="t-meta text-ink-4">What we build</span>
            </div>
            <div className="flex flex-col">
              {SERVICES.map((s) => (
                <Link
                  key={s.slug}
                  href={servicePath(s.slug)}
                  className="state group flex items-baseline gap-6 py-6 border-t border-ink-6 hover:bg-ivory-3"
                >
                  <span className="index-numeral t-h4 shrink-0">{s.id}</span>
                  <span className="flex-1 min-w-0">
                    <span className="block t-h4 text-ink-2">{s.title}</span>
                    <span className="block t-body-s text-ink-4 mt-1">{s.tagline}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Archetype G — CLOSE. `pt-20 md:pt-24` for the same reason as the
          service pages: the band above already closes with its own rhythm, so
          two full openings met around ~200px of content. */}
      <section className="relative w-full bg-ivory-4 rhythm-4 pt-20 md:pt-24">
        <div className="grid-page">
          <div className="seat-anchor">
            <h2 className="t-h2 text-ink-2 measure-statement mb-8">
              Tell us what isn&apos;t working.
            </h2>
            <Link href={START_PROJECT_HREF} className="btn btn-primary state cut-2">
              Start a project
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
