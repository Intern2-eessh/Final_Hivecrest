import type { MetadataRoute } from "next";
import { SITE_URL, ROUTES } from "@/lib/site";
import { SERVICES, servicePath } from "@/lib/services";
import { PORTFOLIO, portfolioPath } from "@/lib/portfolio";

/**
 * Generated from the same route constants the footer links to, so a page
 * cannot appear in one and not the other.
 *
 * `output: "export"` renders this to a static sitemap.xml at build time.
 */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const paths: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: ROUTES.home, priority: 1.0, freq: "monthly" },
    ...SERVICES.map((s) => ({
      path: servicePath(s.slug),
      priority: 0.9,
      freq: "monthly" as const,
    })),
    ...PORTFOLIO.map((p) => ({
      path: portfolioPath(p.slug),
      priority: 0.8,
      freq: "monthly" as const,
    })),
    { path: ROUTES.about, priority: 0.7, freq: "yearly" },
    { path: ROUTES.founder, priority: 0.6, freq: "yearly" },
    { path: ROUTES.contact, priority: 0.8, freq: "yearly" },
    { path: ROUTES.privacy, priority: 0.2, freq: "yearly" },
    { path: ROUTES.terms, priority: 0.2, freq: "yearly" },
  ];

  return paths.map(({ path, priority, freq }) => ({
    // Absolute — a relative <loc> is rejected by Search Console.
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    lastModified: now,
    changeFrequency: freq,
    priority,
  }));
}
