import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    // Absolute, and pointing at the production origin rather than the
    // deploy-preview host — the audit's launch checklist item 06.
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
