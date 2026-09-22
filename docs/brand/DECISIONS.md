# HIVECREST — Decision Log

Each locked choice, what was rejected, and why. The purpose of this file is to stop settled questions
being re-litigated in month three. **If you want to reverse a decision, add a new entry — do not edit an
old one.**

Rule references point to [`BRAND-BIBLE.md`](./BRAND-BIBLE.md).

---

## D-001 · Creative direction: THE SETTLED STATE
**Date:** 2026-07-31 · **Status:** locked

The brand is organised around the sixth month after handover, not around launch day. The site opens in
noise and resolves into quiet, decrescendo-ing in motion, density, contrast and colour temperature as it
descends.

**Why.** It is derived from the company's own writing, which measures value in working days rather than
launches — *"make the working day shorter"*, *"a team uses every morning"*, *"six months after we hand it
over, is anyone still using it?"* It is not borrowed from any reference site.

**Rejected:**
- *Load-bearing / structural-engineering direction alone* — reads cold and industrial, fights the warm
  ivory ground that already works.
- *Handmade-software / craft warmth* — reads artisanal, undermines technical credibility.
- *Residue-of-use* (designing software that looks worn-in) — original, but very hard to execute without
  simply looking unfinished.

**Consequence.** Every system below inherits a direction of travel. Anything that escalates toward the
foot of the page is wrong by definition.

---

## D-002 · Typography: keep Inter + Space Grotesk
**Date:** 2026-07-31 · **Status:** locked · **Decided by:** client

Primary typefaces are unchanged. §03 becomes a *discipline* spec — hierarchy, ramp, weight whitelist,
tracking, measure — rather than a replacement.

**Why.** The client's read: repeated layouts, centred composition, identical animations and the absent
interaction language are higher-impact problems than face selection, and the redesign should not depend on
a font change. That is correct — the faces were never the reason the site reads generic; having no scale
contrast, no weight discipline and no assigned jobs was.

**Rejected:** editorial-serif display (Instrument Serif / Fraunces); technical-grotesk display; a
single-sans supersystem; serif-body/sans-UI inversion. All four were live options and all four are
deferred, not vetoed.

**Consequence.** Every typographic rule binds to a role token (`--font-display`, `--font-text`), never to
a face name. Changing faces later is a one-line token change (Rule 03.0). The document does not need
rewriting to accommodate a future swap.

---

## D-003 · Two voices instead of a third face
**Date:** 2026-07-31 · **Status:** locked

Space Grotesk becomes the **structural voice** (display headings, all labels, all numerals, measurements,
timestamps). Inter becomes the **reading voice** (body, paragraphs, fields, buttons).

**Why.** The site had no monospace and therefore no technical register — the fastest available signal of
engineering seriousness. Space Grotesk's geometric letterforms and even-width figures already read
technical when set small, tracked and uppercase. This buys the register without adding a face, which
respects D-002.

**Rejected:** adding a monospace now. It would have contradicted D-002's intent by making the redesign
depend on a new face.

**Consequence.** `--font-mono` exists as a reserved, unbound token. Switching it on later reassigns
exactly two jobs and changes nothing else. **No rule in the system depends on it** (Rule 03.3).

---

## D-004 · Wordmark: custom-drawn
**Date:** 2026-07-31 · **Status:** locked · **Decided by:** client · **Deliverable: Phase 2**

The HIVECREST wordmark will be custom letterforms constructed on the hex grid, sharing the 30° chamfer
language of the cut corner. All running text uses free faces.

**Why.** The client's position: uniqueness should not depend on font licensing. The wordmark is the one
place typography is genuinely ownable, and it is a one-time cost.

**Consequence.** Replaces the current 14 KB raster PNG (`public/assets/Hivecrest_Logo.png`), which cannot
scale, cannot be recoloured, and cannot be animated per glyph. Delivered as SVG in Phase 2.

---

## D-005 · Licensing: free faces only
**Date:** 2026-07-31 · **Status:** locked · **Decided by:** client

No commercial licences for running text. Inter and Space Grotesk already satisfy this.

**Rejected:** foundry faces (Signifier, GT Sectra, Söhne, ABC Diatype) at ~$200–800 one-time. Genuine
typographic distinction, but the client's judgement is that differentiation should come from wordmark,
layout, motion and interaction. Agreed.

---

## D-006 · Form signature: the cut corner
**Date:** 2026-07-31 · **Status:** locked · **Decided by:** client

A single clipped corner, **top-right, 30° from horizontal**, `h = w · tan(30°) = 0.5774w`. Five size
tokens from 12px (tags) to 88px (full-bleed bands). `border-radius` becomes 0 everywhere.

**Why.** Restrained enough to apply universally without ever reading as sci-fi HUD; distinctive enough
that any surface is identifiable at a glance. Costs nothing to render, works at every breakpoint, and
carries no performance or accessibility penalty.

**Rejected:**
- *Single large chamfer, bottom-right (~32px)* — bolder and more directional, but fights small components
  and would have needed a fallback rule for chips, splitting the language in two.
- *Two opposing corners* — most literally tied to the honeycomb (a hexagon is a rectangle with its corners
  cut), but risks reading as a ticket stub or dated sci-fi at large sizes.

**Consequence.** Cascades into §06 surface, and into §12–13 in Phase 2. Two implementation facts follow:
`clip-path` removes `box-shadow` (use `filter: drop-shadow()` on a wrapper — Rule 05.4), and cuts do not
nest at the same corner (Rule 05.5).

---

## D-007 · Colour is semantic, not decorative
**Date:** 2026-07-31 · **Status:** locked

Four families with fixed meanings: **ivory** = the light of the working day · **ink** = structure ·
**slate** = the unresolved · **honey** = the mark of resolution.

**Why.** The current site applies honey to every semantic — eyebrows, capability tags, stack tags, index
badges, icon tiles, bullets, borders, hover states. An accent applied to everything marks nothing, and
gold-as-theme drifts toward ceremonial rather than engineered. Binding colour to meaning makes the honey
budget enforceable rather than aspirational: you cannot use honey decoratively without lying.

**Consequence.** Slate and honey are opposites in meaning, so the page literally loses its cold as it
resolves. Success is honey (Rule 02.10) rather than a green, because resolution is already honey's
meaning and a green would contradict the doctrine.

---

## D-008 · Honey budget: three marks per viewport
**Date:** 2026-07-31 · **Status:** locked

Honey may mark only: the single most important word or figure on a screen, the active nav state, the
focus ring, the hex bullet, and a narrative resolution moment. Maximum three per viewport.

**Why.** Measured from the current source, a single viewport routinely carries nine or more honey
elements. See PLATE 03 in `specimen.html` for the side-by-side.

**Consequence.** Eyebrow labels, capability chips, stack tags, index numbers and icon tiles all move to
ink. The label style loses its pill and gains a 24px hairline rule, which is load-bearing where the pill
was not (Rule 03.8).

---

## D-009 · Ivory is a five-step temperature scale
**Date:** 2026-07-31 · **Status:** locked

Five grounds, monotonically warming (R−B: 2 → 6 → 11 → 19 → 22), mapped to narrative position. The
existing `#FDFAF2` is retained as the anchor.

**Why.** Gives the page a felt direction of travel without any visible device. Maximum contrast across the
whole scale is **1.04** (adjacent steps 1.011–1.026) — no single step is consciously perceptible, so it
registers as temperature rather than as banded sections.

**Rejected:** a monotonically *darkening* scale. It would have read as evening rather than as settling,
and would have compromised text contrast at the foot of the page.

**Consequence.** Rule 02.2 — a section may never be cooler than the section above it. The page warms in
one direction only.

---

## D-010 · Text colour is a token, never an opacity
**Date:** 2026-07-31 · **Status:** locked

Three text tiers (`ink-2`, `ink-3`, `ink-4`). The `charcoal/65`-style opacity pattern is removed.

**Why.** Opacity-based text shifts unpredictably across five different ivory grounds and over any image,
and it cannot be contrast-audited — the measured ratio depends on whatever happens to be behind it. The
current site uses at least eight distinct charcoal opacities, which is a hierarchy of eight tiers nobody
designed.

---

## D-011 · Four materials replace `.card-surface`
**Date:** 2026-07-31 · **Status:** locked

Paper · Inset · Ink · Line. **Line is the default; Paper must be earned.**

**Why.** `.card-surface` is described in its own source comment as *"the one surface treatment sitewide."*
One surface for every job is precisely why every block reads as the same object. Elevation used as
packaging is the strongest template signal on the current site.

**Consequence.** `Ink` appears exactly once sitewide — a second dark band halves the impact of the first.

---

## D-012 · Motion is physics, and it happens once
**Date:** 2026-07-31 · **Status:** locked

Four verbs: **settle · shift · reveal · hold**. `--ease-settle` `(0.16, 1, 0.30, 1)` is the primary curve.
`opacity 0→1` combined with `translateY` is banned outright.

**Why.** The banned pattern is the current site's entire motion vocabulary, repeated across five
components. Matter does not fade into existence. `--ease-settle` is derived from the one piece of motion
craft already on the site — the wordmark's alternating letter convergence with a long deceleration tail
(`PremiumHero.tsx:129-142`) — which already had the right physics.

**Consequence.** Adjacent sections may not share a scroll behaviour (Rule 07.4). The choreography budget
shrinks down the page: 6 → 4 → 2 → 1. Reduced motion resolves to the settled end state, which — because
every sequence resolves *to* that state — is the composition the design is aiming at anyway.

---

## D-013 · One cursor idea: the understructure
**Date:** 2026-07-31 · **Status:** locked

A pointer-revealed hexagonal grid beneath surfaces. Peak opacity 0.09, 260px radius. The only
cursor-driven effect in the system.

**Why.** It makes the site's own headline — *"the digital backbone your business grows on"* — literal,
and it gives the honeycomb a load-bearing job, satisfying Law 2. The 5%-opacity wallpaper version is
deleted because it holds nothing up.

**Rejected:** custom cursors, cursor followers, magnetic buttons, spotlight effects. All are common, none
say anything about this company.

**Consequence.** Disabled below 1024px and on coarse pointers, and deliberately **not** replaced by a tap
interaction — a decorative tap target teaches the user a lie about what is clickable.

---

## D-014 · Deliverable format: markdown + specimen lab
**Date:** 2026-07-31 · **Status:** locked · **Decided by:** client

Three markdown files plus a standalone `specimen.html`.

**Why.** Colour, type and motion cannot be approved from hex codes and easing strings on a page. The
specimen exists to validate the visual language before any section is designed.

**Constraints, treated as hard rules.** It is a laboratory, not a website: no hero, no page layouts, no
site sections, no navigation design. It deliberately uses cool neutral lab chrome so it cannot be mistaken
for the brand. It sits outside the Next.js app — no route, no build step, no `out/` entry — so it can
never ship to production. Contrast values are computed in-page rather than transcribed, so the matrix is
provably measured.

---

## D-015 · Flat and opaque
**Date:** 2026-07-31 · **Status:** locked · **Origin:** coverage test

Two rules added after running the Phase 1 coverage test against five live components. Both were genuine
holes — patterns in active use that no rule governed.

**Colour is flat (Rule 02.13).** No gradients of any kind. A gradient is light without a source; it
belongs to the launch-day register and is the fastest way for a gold brand to read as ceremonial. Found in
6 components: footer band, founder ring, wordmark fill, hero glow.

**Surfaces are opaque (Rule 06.5).** No translucent grounds, no `backdrop-filter`. It contradicts the
material system (a surface showing what is behind it has no substance), it makes Rule 02.12 unenforceable
(measured contrast depends on whatever scrolls behind), and `backdrop-filter` forces a full-screen
composite every frame — the most reliable way to drop frames on exactly the low-cost Android hardware this
company's own copy promises to build for. Found in 5 components.

**Exceptions, deliberately narrow.** Gradients survive only as `mask-image` and as the understructure's
reveal falloff — used as tools, never as colour. Translucency survives only on a full-screen modal scrim
(`--ink-1` at 55%), which carries no text and covers the viewport rather than compositing a strip.

**Consequence.** The wordmark's gold gradient fill becomes flat `--honey-3`, which also removes the
per-letter `background-clip: text` workaround currently required in `PremiumHero.tsx:311-313`. This feeds
directly into D-004.

---

## Open — carried into Phase 2

| # | Question |
|---|---|
| P2-1 | Wordmark letterform construction — how literal should the hex derivation be? |
| P2-2 | Icon system — full custom set, or a constrained `lucide` subset re-drawn to the grid? |
| P2-3 | Photography grade — two-tone or three-tone, and how far to push it |
| P2-4 | Which single section receives the `Ink` material (D-011 permits exactly one) |
| P2-5 | Where the two `seat-monument` and two `--t-monument` budget tokens are spent |
