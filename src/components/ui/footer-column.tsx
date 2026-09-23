import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  COMPANY,
  COMPANY_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_2,
  MAILTO,
  TEL_HREF,
  TEL_HREF_2,
  ROUTES,
  SOCIAL_LINKS,
} from "@/lib/site";
import { SERVICES, servicePath } from "@/lib/services";

/**
 * Four-column footer with the Hivecrest brand data.
 * Adapts the mvpblocks Footer4Col layout to the existing design system:
 * uses site.ts constants so content never drifts, and follows the
 * chrome/ink palette rather than secondary/primary tokens.
 */

const aboutLinks = [
  { text: "About Us", href: ROUTES.about },
  { text: "Founder's Desk", href: ROUTES.founder },
  { text: "Notable", href: "/#achievements" },
  { text: "Our Partners", href: "/#portfolio" },
];

const helpfulLinks = [
  { text: "Privacy Policy", href: ROUTES.privacy },
  { text: "Terms of Service", href: ROUTES.terms },
  { text: "Contact Us", href: ROUTES.contact },
];

const contactInfo = [
  { icon: Mail, text: CONTACT_EMAIL, href: MAILTO },
  { icon: Phone, text: CONTACT_PHONE_2, href: TEL_HREF_2 },
  { icon: Phone, text: CONTACT_PHONE, href: TEL_HREF },
  { icon: MapPin, text: COMPANY_ADDRESS, href: "#", isAddress: true },
];

export default function FooterColumn() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 overflow-hidden bg-chrome border-t border-ink-7 mt-0 w-full rounded-t-xl">
      <div className="mx-auto max-w-[1688px] px-6 md:px-12 pt-16 pb-6 lg:pt-20">
        {/* Main grid: brand col + 4 link cols */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">

          {/* ── Brand column ── */}
          <div>
            <Link href={ROUTES.home} className="flex items-center gap-3 w-fit">
              <Image
                src="/assets/Hivecrest_Logo.png"
                alt="Hivecrest Logo"
                width={96}
                height={96}
                className="w-11 h-auto object-contain shrink-0"
              />
              <span className="font-display font-bold text-ink-2 text-xl tracking-[0.15em] uppercase">
                HIVECREST
              </span>
            </Link>

            <p className="text-ink-4 mt-6 max-w-xs text-sm leading-relaxed">
              {COMPANY.legalName}
              <br />
              {COMPANY_ADDRESS}
            </p>

            <p className="text-ink-4 mt-4 text-sm leading-relaxed max-w-xs">
              Smart CRM and video analytics tools.
              Built around the way your team actually works.
            </p>

          </div>

          {/* ── Four link columns ── */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-2">

            {/* Services */}
            <div>
              <p className="t-meta text-ink-4 mb-4 uppercase tracking-widest">Services</p>
              <ul className="flex flex-col gap-3">
                {SERVICES.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={servicePath(service.slug)}
                      className="t-body-s text-ink-4 hover:text-honey-5 transition-colors duration-200"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* About */}
            <div>
              <p className="t-meta text-ink-4 mb-4 uppercase tracking-widest">Company</p>
              <ul className="flex flex-col gap-3">
                {aboutLinks.map(({ text, href }) => (
                  <li key={text}>
                    <Link
                      href={href}
                      className="t-body-s text-ink-4 hover:text-honey-5 transition-colors duration-200"
                    >
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Helpful / Legal */}
            <div>
              <p className="t-meta text-ink-4 mb-4 uppercase tracking-widest">Legal</p>
              <ul className="flex flex-col gap-3">
                {helpfulLinks.map(({ text, href }) => (
                  <li key={text}>
                    <Link
                      href={href}
                      className="t-body-s text-ink-4 hover:text-honey-5 transition-colors duration-200"
                    >
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <p className="t-meta text-ink-4 mb-4 uppercase tracking-widest">Contact</p>
              <ul className="flex flex-col gap-4">
                {contactInfo.map(({ icon: Icon, text, href, isAddress }) => (
                  <li key={text}>
                    <a
                      href={href}
                      className="flex items-start gap-2 group"
                    >
                      <Icon className="w-4 h-4 text-honey-5 mt-0.5 shrink-0" />
                      {isAddress ? (
                        <address className="t-body-s text-ink-4 not-italic group-hover:text-honey-5 transition-colors duration-200 leading-relaxed">
                          {text}
                        </address>
                      ) : (
                        <span className="t-body-s text-ink-4 group-hover:text-honey-5 transition-colors duration-200">
                          {text}
                        </span>
                      )}
                    </a>
                  </li>
                ))}

                {/* Office hours */}
                <li>
                  <p className="t-caption text-ink-4 leading-relaxed">
                    Mon – Sat, 9 am – 5:30 pm IST
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-12 border-t border-ink-7 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="t-caption text-ink-4">
            &copy; {year} Hivecrest Technologies. All rights reserved.
          </p>
          <p className="t-caption text-ink-4">
            RECOGNISED BY STARTUPTN · DPIIT CERTIFIED STARTUP · INCUBATED AT iTNT
          </p>
        </div>
      </div>
    </footer>
  );
}
