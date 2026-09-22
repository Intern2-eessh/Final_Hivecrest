import {
  OG_ALT,
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderShareCard,
} from "@/lib/og-card";

// X reads `twitter:image` and ignores `og:image` when a Twitter card is
// declared, so the same card has to be emitted under both conventions.
export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

// Required by `output: "export"` — see the note in opengraph-image.tsx.
export const dynamic = "force-static";

export default function Image() {
  return renderShareCard();
}
