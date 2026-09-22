import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import FooterColumn from "@/components/ui/footer-column";
import ContactSection from "@/components/ContactSection";
import {
  SITE_NAME,
  SITE_URL,
  ROUTES,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  COMPANY,
} from "@/lib/site";

const DESCRIPTION =
  "Tell Hivecrest Technologies what isn't working. A reply within one working day, a straight answer on scope and cost, and no sales sequence.";

export const metadata: Metadata = {
  title: `Contact | ${SITE_NAME}`,
  description: DESCRIPTION,
  alternates: { canonical: ROUTES.contact },
  openGraph: {
    type: "website",
    url: ROUTES.contact,
    title: `Contact | ${SITE_NAME}`,
    description: DESCRIPTION,
    siteName: SITE_NAME,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title: `Contact | ${SITE_NAME}`, description: DESCRIPTION },
};

/**
 * The contact route reuses the same `ContactSection` the home page ends with,
 * rather than a second form that would drift out of sync with it. The header
 * offset is applied here because the section is written to sit mid-page.
 */
export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pt-20">
        {/* `h1` here, `h2` on the home page. This section is the entire body of
            this route, so its opener is the page's primary heading. */}
        <ContactSection headingAs="h1" />
      </main>
      <FooterColumn />

      {/* LocalBusiness schema (audit H-07). Google Business Profile and local
          search both key off a crawlable name-address block. The address is
          the registered one from the company profile:
          176/2A, Kumarapalayam, Namakkal-638007. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Hivecrest Technologies",
            legalName: COMPANY.legalName,
            url: `${SITE_URL}${ROUTES.contact}`,
            email: CONTACT_EMAIL,
            // A LocalBusiness without a telephone is the one field Google
            // Business Profile verification will not proceed without.
            telephone: CONTACT_PHONE,
            image: `${SITE_URL}/assets/Hivecrest_Logo.png`,
            address: {
              "@type": "PostalAddress",
              streetAddress: COMPANY.street,
              addressLocality: COMPANY.locality,
              postalCode: COMPANY.postalCode,
              addressRegion: COMPANY.region,
              addressCountry: COMPANY.country,
            },
            areaServed: { "@type": "Country", name: "India" },
          }),
        }}
      />
    </>
  );
}
