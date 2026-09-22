import React from "react";
import Image from "next/image";
import Link from "next/link";
import { COMPANY, COMPANY_ADDRESS, ROUTES } from "@/lib/site";
import { SERVICES, servicePath } from "@/lib/services";
import ContactIcons from "@/components/ui/ContactIcons";

/**
 * The footer, rebuilt for a services business (audit H-03).
 *
 * What was here before was a SaaS template: Features, Integrations, Pricing,
 * Changelog, Documentation, Help Center, Community, Partners — twelve links,
 * none of which navigated anywhere, describing a product the company does not
 * sell. On a new domain that is twelve crawl errors on day one and the
 * clearest possible signal of an unfinished site.
 *
 * Every link below resolves to a page that exists. The service column is
 * generated from `SERVICES`, so a service cannot be listed here without having
 * a page, and cannot have a page without being listed.
 *
 * Ground: `chrome`, one step warmer than ivory-5 and shared with the header.
 * The two pieces that bracket every page sit on one surface, which is also why
 * the ground is named for the job rather than numbered into the ivory scale —
 * that scale describes sections, and Rule 02.2's "never cooler than the section
 * above" does not apply to a bar fixed over the top of all of them.
 */
export default function FooterGlow() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 overflow-hidden bg-chrome border-t border-ink-7">
      <div className="grid-page rhythm-1">
        {/* Column counts track the page grid — 8 at sm, 12 at md — so the
            footer stops being a single ~1085px stack all the way up to 899px,
            which was one full screen of scrolling on a tablet.

            `gap-x` is the page gutter rather than a hand-picked 40px. At 40px
            this nested twelve-column grid did not line up with the page's own
            twelve columns, so every heading in the row sat a few pixels off the
            content above it, drifting further across the row. */}
        <div className="seat-full grid grid-cols-1 sm:grid-cols-8 md:grid-cols-12 gap-y-10 gap-x-[var(--grid-gutter)]">

          <div className="sm:col-span-8 md:col-span-4">
            {/* `min-h-11` — the 44px floor; the lockup's own box was ~38px. */}
            <Link href={ROUTES.home} className="flex items-center gap-3 mb-6 min-h-11 state w-fit">
              <Image
                src="/assets/Hivecrest_Logo.png"
                alt=""
                width={96}
                height={96}
                className="w-11 h-auto object-contain shrink-0"
              />
              <span className="t-h4 font-bold text-ink-2 uppercase tracking-[0.15em]">
                HIVECREST
              </span>
            </Link>

            <p className="t-body-s text-ink-4 measure-body mb-4">
              Web platforms, AI calling systems and the infrastructure underneath.
              Built around the way your team actually works.
            </p>

            {/* The registered name-address block, back in the footer now the
                address is supplied (company profile, page 4). Google Business
                Profile verification and local search read this. */}
            <p className="t-caption text-ink-4 measure-body mb-8">
              {COMPANY.legalName}
              <br />
              {COMPANY_ADDRESS}
            </p>

            <ContactIcons />
          </div>

          <nav className="sm:col-span-3 md:col-span-3" aria-label="Services">
            <h2 className="t-meta text-ink-4 mb-3">Services</h2>
            <div className="flex flex-col">
              {SERVICES.map((service) => (
                <Link
                  key={service.slug}
                  href={servicePath(service.slug)}
                  className="tap state t-body-s text-ink-4 hover:text-honey-5"
                >
                  {service.title}
                </Link>
              ))}
            </div>
          </nav>

          <nav className="sm:col-span-2 md:col-span-2" aria-label="Company">
            <h2 className="t-meta text-ink-4 mb-3">Company</h2>
            <div className="flex flex-col">
              <Link href={ROUTES.about} className="tap state t-body-s text-ink-4 hover:text-honey-5">
                About
              </Link>
              <Link href={ROUTES.founder} className="tap state t-body-s text-ink-4 hover:text-honey-5">
                Founder
              </Link>
              <Link href="/#achievements" className="tap state t-body-s text-ink-4 hover:text-honey-5">
                Achievements
              </Link>
              <Link href="/#portfolio" className="tap state t-body-s text-ink-4 hover:text-honey-5">
                GJ Global Portfolio
              </Link>
              <Link href={ROUTES.contact} className="tap state t-body-s text-ink-4 hover:text-honey-5">
                Contact
              </Link>
            </div>
          </nav>

          {/* Three columns, not two. At two, "Terms of Service" was ~118px in a
              114px column and wrapped to a second line at 900–960px, breaking
              the row against the three navs beside it. */}
          <nav className="sm:col-span-3 md:col-span-3" aria-label="Legal">
            <h2 className="t-meta text-ink-4 mb-3">Legal</h2>
            <div className="flex flex-col">
              <Link href={ROUTES.privacy} className="tap state t-body-s text-ink-4 hover:text-honey-5">
                Privacy Policy
              </Link>
              <Link href={ROUTES.terms} className="tap state t-body-s text-ink-4 hover:text-honey-5">
                Terms of Service
              </Link>
            </div>
          </nav>
        </div>

        {/* The bottom bar. The name-address-email block that sat above it is
            gone at your request — worth knowing that Google Business Profile
            verification and local search both read that block, so if you apply
            for a listing later it needs to come back somewhere crawlable. The
            LocalBusiness schema on /contact still carries it.

            Employee Login has moved out of here and into the header's top
            right — a padlock beside "Start a Project" on desktop, spelled out
            in the mobile menu below 1100px. It is a staff entrance, and the
            top right is where company sites put one; sitting in the footer it
            was also absent from service pages, which no longer render a
            footer at all. Only the copyright closes the page now. */}
        <div className="seat-full mt-10 pt-6 border-t border-ink-7">
          <p className="t-caption text-ink-4 text-center">
            &copy; {year} Hivecrest Technologies. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
