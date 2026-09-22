/**
 * The social share card, shared by `app/opengraph-image.tsx` and
 * `app/twitter-image.tsx` so the two can never drift apart.
 *
 * Rendered by satori, not a browser: only flexbox and a subset of CSS work,
 * `display: grid` and `clip-path` do not, and every element holding more than
 * one child needs an explicit `display: "flex"`. That is why the cut corner is
 * an inline SVG rather than the `clip-path` the brand bible specifies for the
 * site itself — same geometry, a renderer satori can actually draw.
 *
 * Values are taken from `docs/brand/tokens.md`. This file was written against
 * the new system before the site was, so for a while it was the only thing on
 * the real palette; `globals.css` has since caught up and the two now agree.
 *
 * The hexes stay literal here rather than reading the CSS variables: satori
 * renders outside the browser, with no cascade and no `:root` to resolve
 * against.
 */

import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import {
  SITE_CREDENTIALS,
  SITE_EYEBROW,
  SITE_NAME,
  SITE_TAGLINE,
} from "./site";

/** 1200x630 is the size every major crawler crops to. */
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";
export const OG_ALT = `${SITE_NAME}. ${SITE_TAGLINE.before} ${SITE_TAGLINE.mark} ${SITE_TAGLINE.after}`;

const INK_2 = "#1C1917"; // primary text
const INK_4 = "#6B625A"; // labels and captions — the text floor
const INK_6 = "#C8C0B5"; // group-boundary hairline
const IVORY_3 = "#FDFAF2"; // page ground, the anchor value
const HONEY_4 = "#A87C10"; // the only honey permitted as text at this size

/**
 * `--cut-5`, the full-bleed-band step of the cut corner: 88px wide, and
 * 88 * tan(30 degrees) = 50.8px tall, which is the 30 degree chamfer the whole
 * form language is built on. Drawn as the removed triangle in ink, so the
 * ivory plate reads as having had its corner taken off.
 */
const CUT = { w: 88, h: 51 };

const cutCorner = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${CUT.w}" height="${CUT.h}" viewBox="0 0 ${CUT.w} ${CUT.h}"><polygon points="0,0 ${CUT.w},0 ${CUT.w},${CUT.h}" fill="${INK_2}"/></svg>`,
)}`;

async function loadFont(file: string) {
  // process.cwd() is the project root during `next build`.
  const buffer = await readFile(join(process.cwd(), "assets", file));
  return Uint8Array.from(buffer).buffer;
}

export async function renderShareCard() {
  const [medium, bold] = await Promise.all([
    loadFont("SpaceGrotesk-Medium.ttf"),
    loadFont("SpaceGrotesk-Bold.ttf"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          backgroundColor: IVORY_3,
          // Asymmetric by law: the composition hangs off the left margin
          // rather than centring, so the card reads as designed rather than
          // as a default template.
          padding: "80px 96px",
          fontFamily: "Space Grotesk",
        }}
      >
        {/* The cut corner. Absolute, flush to the top-right. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={cutCorner}
          alt=""
          width={CUT.w}
          height={CUT.h}
          style={{ position: "absolute", top: 0, right: 0 }}
        />

        {/* ── Label ── */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* --line-struct: the 2px structural edge, run to the grid. */}
          <div style={{ width: 64, height: 2, backgroundColor: INK_2 }} />
          <div
            style={{
              marginTop: 24,
              fontSize: 16,
              fontWeight: 500,
              letterSpacing: 2.9, // 0.18em, the --t-meta tracking
              textTransform: "uppercase",
              color: INK_4,
            }}
          >
            {SITE_EYEBROW}
          </div>
        </div>

        {/* ── The one loud thing ── */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 120,
              fontWeight: 700,
              letterSpacing: 7, // ~0.06em, matching the hero wordmark
              lineHeight: 1,
              color: INK_2,
            }}
          >
            {SITE_NAME}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 28,
              fontSize: 44,
              fontWeight: 700,
              letterSpacing: -0.9, // -0.02em
              lineHeight: 1.2,
              color: INK_2,
            }}
          >
            {/* Split at a fixed break rather than left to wrap, so the honey
                word can be coloured without satori having to re-flow a
                mixed-colour paragraph. satori collapses whitespace between
                sibling spans, so the word space is a flex gap: 12px is the
                space advance of Space Grotesk at 44px. */}
            <div style={{ display: "flex", gap: 12 }}>
              <span>{SITE_TAGLINE.before}</span>
              <span style={{ color: HONEY_4 }}>{SITE_TAGLINE.mark}</span>
            </div>
            <div style={{ display: "flex" }}>{SITE_TAGLINE.after}</div>
          </div>
        </div>

        {/* ── Credentials ── */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* --line-bound: 1px boundary between groups. */}
          <div style={{ width: "100%", height: 1, backgroundColor: INK_6 }} />
          <div
            style={{
              marginTop: 20,
              fontSize: 15,
              fontWeight: 500,
              letterSpacing: 2.1, // 0.14em
              color: INK_4,
            }}
          >
            {SITE_CREDENTIALS}
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Space Grotesk", data: medium, weight: 500, style: "normal" },
        { name: "Space Grotesk", data: bold, weight: 700, style: "normal" },
      ],
    },
  );
}
