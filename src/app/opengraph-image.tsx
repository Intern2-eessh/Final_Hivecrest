import {
  OG_ALT,
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderShareCard,
} from "@/lib/og-card";

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

// This is a route handler, and `output: "export"` refuses to build one unless
// it is declared static. The card has no request-time input, so it is rendered
// once at build time into `out/` as a plain PNG.
export const dynamic = "force-static";
export default function Image() {
  return renderShareCard();
}
