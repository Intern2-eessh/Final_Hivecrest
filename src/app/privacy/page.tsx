import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { SITE_NAME, ROUTES, CONTACT_EMAIL, COMPANY } from "@/lib/site";

const DESCRIPTION =
  "How Hivecrest Technologies handles the information you send through this site.";

export const metadata: Metadata = {
  title: `Privacy Policy | ${SITE_NAME}`,
  description: DESCRIPTION,
  alternates: { canonical: ROUTES.privacy },
  robots: { index: true, follow: true },
};

/**
 * Published because a Google Business Profile and any ad account both require
 * it, and because the contact form collects personal data. It describes what
 * the site actually does today — a form that either posts to a form service or
 * opens the visitor's mail client — rather than boilerplate about cookies the
 * site does not set.
 *
 * TODO(founder): have this reviewed before the ad account application. It is
 * accurate, not legal advice.
 */
export default function PrivacyPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Privacy Policy"
      lead={`How ${COMPANY.legalName} handles information you send through this site.`}
    >
      <section className="relative w-full bg-ivory-3 rhythm-2">
        <div className="grid-page">
          {/* `anchor`, not `offset`. This is a document, not an opener — on
              `seat-offset` the entire policy sat in the right half of the
              screen with a 556px empty column beside it for its full height.
              `measure-body` on each paragraph is what keeps the lines
              readable; the seat only decides where the column starts. */}
          <div className="seat-anchor flex flex-col gap-10">
            <div>
              <h2 className="t-h4 text-ink-2 mb-3">What we collect</h2>
              <p className="t-body-s text-ink-3 measure-body">
                Only what you type into the enquiry form: your name, email address,
                optionally your company and phone number, the service you are asking
                about, and your message. We do not collect anything else, and the site
                sets no advertising or tracking cookies.
              </p>
            </div>

            <div>
              <h2 className="t-h4 text-ink-2 mb-3">Why we hold it</h2>
              <p className="t-body-s text-ink-3 measure-body">
                To reply to your enquiry and, if it becomes a project, to carry out the
                work. We do not use it for marketing sequences, and we do not sell,
                rent or share it with third parties.
              </p>
            </div>

            <div>
              <h2 className="t-h4 text-ink-2 mb-3">Where it goes</h2>
              <p className="t-body-s text-ink-3 measure-body">
                This site is a static export with no server of its own. Depending on
                configuration, the form either posts to a third-party form service that
                relays the message to us by email, or opens your own mail client with
                the message prepared, in which case the message travels only between
                you and us.
              </p>
            </div>

            <div>
              <h2 className="t-h4 text-ink-2 mb-3">How long we keep it</h2>
              <p className="t-body-s text-ink-3 measure-body">
                Enquiries that do not become projects are deleted within twelve months.
                Project correspondence is kept for as long as we support the work, and
                for whatever period Indian tax and company law requires after that.
              </p>
            </div>

            <div>
              <h2 className="t-h4 text-ink-2 mb-3">Your rights</h2>
              <p className="t-body-s text-ink-3 measure-body">
                Write to{" "}
                {/* `py-3.5` takes the hit area to the 44px floor (Rule 08.8)
                    without changing the line box — padding on an inline box
                    does not affect line height. */}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-honey-5 state hover:underline py-3.5">
                  {CONTACT_EMAIL}
                </a>{" "}
                and we will tell you what we hold about you, correct it, or delete it.
                We will respond within thirty days.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
