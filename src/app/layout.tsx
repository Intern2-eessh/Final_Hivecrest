import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Understructure from "@/components/Understructure";
import {
  SITE_DESCRIPTION,
  SITE_EYEBROW,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/site";

/**
 * Body font: DM Sans — clean, geometric, humanist sans-serif.
 * The preferred choice for modern service and SaaS brands. Highly legible
 * at all sizes, especially body copy and UI labels.
 *
 * Display font: Space Grotesk — the existing brand voice. Mechanical, precise,
 * slightly technical — reinforces the engineering identity in headings.
 */
const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",   // replaces --font-inter so t-body / t-caption are DM Sans
  weight: ["300", "400", "500", "600", "700"],
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-grotesk",
  weight: ["400", "500", "600", "700"],
});

const SHARE_TITLE = `${SITE_NAME} | ${SITE_EYEBROW}`;

export const metadata: Metadata = {
  // Crawlers reject relative URLs, so every metadata URL below is resolved
  // against this origin. Without it `og:image` ships as a path and the share
  // card renders blank.
  metadataBase: new URL(SITE_URL),
  // The searchable title, not the bare brand — see SITE_TITLE. Every route
  // under this layout sets its own `title`, so this applies to the home page
  // alone and does not prefix the others.
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  // `og:image` and `twitter:image` are not listed here on purpose — Next
  // generates both from app/opengraph-image.tsx and app/twitter-image.tsx,
  // including the type, width and height tags.
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: "/",
    title: SHARE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: SHARE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${grotesk.variable} text-ink-2 antialiased`}
    >
      <body className={dmSans.className}>
        {/* This site has never shipped a service worker, but the dev server log
            shows `GET /sw.js 404` — which a browser only ever asks for when one
            is already registered for the origin. Something served earlier on
            localhost:3000 left one behind, and a stale worker sits in front of
            every request: it can serve an old build's HTML and JS while the dev
            server compiles the current one, which looks exactly like the page
            being slow, the images not resolving and anchors landing on the
            wrong section.

            Unregistering is a no-op when there is nothing registered, so this
            costs a visitor with a clean origin nothing. Inline and not a
            component, so it runs before hydration rather than after it. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `if(navigator.serviceWorker){navigator.serviceWorker.getRegistrations().then(function(rs){rs.forEach(function(r){r.unregister()})}).catch(function(){})}`,
          }}
        />
        {/* The pointer-revealed hex grid sits beneath every section (§08). It
            renders nothing at all below 1024px or on a coarse pointer. */}
        <Understructure />
        {children}
      </body>
    </html>
  );
}
