import SmoothScroll from "@/components/SmoothScroll";
import SiteHeader from "@/components/SiteHeader";
import PremiumHero from "@/components/PremiumHero";
import AboutUs from "@/components/AboutUs";
import VisionMission from "@/components/VisionMission";
import SolutionsSection from "@/components/SolutionsSection";
import GjPortfolio from "@/components/GjPortfolio";
import FoundersDesk from "@/components/FoundersDesk";
import OurAchievements from "@/components/OurAchievements";
import ContactSection from "@/components/ContactSection";
import FooterColumn from "@/components/ui/footer-column";
import {
  SITE_URL,
  SITE_DESCRIPTION,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  COMPANY,
} from "@/lib/site";
import { SERVICES, servicePath } from "@/lib/services";

/**
 * The home page stays a single scrolling overview. The real routes added
 * alongside it (audit H-06) each own one subject, one title tag and one
 * canonical URL; this page is the map, not a replacement for them.
 */
export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen">
        <SmoothScroll>
          <PremiumHero />
          <AboutUs />
          <VisionMission />
          <OurAchievements />
          <SolutionsSection />
          <GjPortfolio />
          <FoundersDesk />
          <ContactSection />
          <FooterColumn />
        </SmoothScroll>
      </main>

      {/* Organization schema (audit H-07). Fields the founder has not yet
          supplied — CIN, street address — are omitted rather than guessed;
          wrong structured data is worse than absent structured data. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Hivecrest Technologies",
            legalName: COMPANY.legalName,
            url: SITE_URL,
            logo: `${SITE_URL}/assets/Hivecrest_Logo.png`,
            description: SITE_DESCRIPTION,
            foundingDate: COMPANY.founded,
            email: CONTACT_EMAIL,
            // E.164 with the country code, as schema.org specifies. Google will
            // not render a call action for a bare 10-digit number.
            telephone: CONTACT_PHONE,
            address: {
              "@type": "PostalAddress",
              streetAddress: COMPANY.street,
              addressLocality: COMPANY.locality,
              postalCode: COMPANY.postalCode,
              addressRegion: COMPANY.region,
              addressCountry: COMPANY.country,
            },
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "sales",
              email: CONTACT_EMAIL,
              telephone: CONTACT_PHONE,
              areaServed: "IN",
              availableLanguage: ["en", "ta"],
            },
            makesOffer: SERVICES.map((s) => ({
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: s.title,
                url: `${SITE_URL}${servicePath(s.slug)}`,
              },
            })),
          }),
        }}
      />
    </>
  );
}
