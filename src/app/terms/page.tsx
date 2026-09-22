import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { SITE_NAME, ROUTES, CONTACT_EMAIL, COMPANY } from "@/lib/site";

const DESCRIPTION =
  "The terms covering use of the Hivecrest Technologies website and the basis on which project work is quoted and delivered.";

export const metadata: Metadata = {
  title: `Terms of Service | ${SITE_NAME}`,
  description: DESCRIPTION,
  alternates: { canonical: ROUTES.terms },
  robots: { index: true, follow: true },
};

/**
 * TODO(founder): review before the ad account application. Accurate, not legal
 * advice — in particular the liability and governing-law clauses should be
 * checked against the standard contract you actually issue.
 */
export default function TermsPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Terms of Service"
      lead={`The basis on which ${COMPANY.legalName} provides this site and quotes for work.`}
    >
      <section className="relative w-full bg-ivory-3 rhythm-2">
        <div className="grid-page">
          {/* `anchor`, not `offset` — same reason as the privacy page: a
              document body is not a short opener, and `seat-offset` left the
              whole of it in the right half of the screen. */}
          <div className="seat-anchor flex flex-col gap-10">
            <div>
              <h2 className="t-h4 text-ink-2 mb-3">This site</h2>
              <p className="t-body-s text-ink-3 measure-body">
                The content here describes services we offer and is provided for
                information. It is not an offer capable of acceptance, and nothing on
                this site forms a contract on its own.
              </p>
            </div>

            <div>
              <h2 className="t-h4 text-ink-2 mb-3">Quotes and engagements</h2>
              <p className="t-body-s text-ink-3 measure-body">
                Work is carried out under a written proposal covering scope, timeline,
                price and payment schedule. Where that proposal and this page differ,
                the proposal governs. Indicative figures given on service pages are
                estimates and are not binding until quoted.
              </p>
            </div>

            <div>
              <h2 className="t-h4 text-ink-2 mb-3">Intellectual property</h2>
              <p className="t-body-s text-ink-3 measure-body">
                On full payment, ownership of the deliverables built specifically for
                you passes to you. We retain ownership of our own pre-existing tools,
                libraries and internal frameworks, and grant you a licence to use them
                as part of the delivered work. Third-party components stay under their
                own licences.
              </p>
            </div>

            <div>
              <h2 className="t-h4 text-ink-2 mb-3">Third-party services</h2>
              <p className="t-body-s text-ink-3 measure-body">
                Domains, hosting, telephony and email depend on third-party providers.
                We manage them on your behalf and are accountable for that management,
                but we do not warrant the uptime of providers we do not operate.
              </p>
            </div>

            <div>
              <h2 className="t-h4 text-ink-2 mb-3">Liability</h2>
              <p className="t-body-s text-ink-3 measure-body">
                Our liability for any engagement is limited to the fees paid for that
                engagement. We are not liable for indirect or consequential loss. This
                does not limit liability that cannot lawfully be limited.
              </p>
            </div>

            <div>
              <h2 className="t-h4 text-ink-2 mb-3">Governing law</h2>
              <p className="t-body-s text-ink-3 measure-body">
                These terms are governed by the laws of India, and the courts of{" "}
                {COMPANY.region} have exclusive jurisdiction. Questions to{" "}
                {/* `py-3.5` — the 44px hit-area floor for an inline link. */}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-honey-5 state hover:underline py-3.5">
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
