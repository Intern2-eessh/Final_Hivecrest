# HIVECREST — Brand Bible

**Phase 1 — Core system.** Philosophy · Colour · Typography · Composition · Geometry · Surface · Motion · Interaction.

> Status: draft for approval. Phase 2 (wordmark, iconography, photography, components, section archetypes) is
> listed at the end and is deliberately not written yet.
>
> Companion files: [`tokens.md`](./tokens.md) — flat lookup table. [`DECISIONS.md`](./DECISIONS.md) — decision
> log. [`specimen.html`](./specimen.html) — the living specimen; open it in a browser.

**How to read this.** Every rule states what it is, why it exists, and the failure it prevents. A rule
containing "generally", "usually" or "as appropriate" is a bug — report it. Where a rule has a number, the
number is the rule.

---

# 01 · The thesis

## THE SETTLED STATE

Every software company sells **Day One** — the launch, the reveal, the product shot. Hivecrest's own writing
measures value somewhere else entirely: *"make the working day shorter"*, *"a team uses every morning"*,
*"six months after we hand it over, is anyone still using it?"* The company's belief is that launch day is
meaningless and the only thing that counts is an ordinary Tuesday, half a year later, when the software either
holds or it doesn't.

So the brand is not designed around the reveal. It is designed around **the sixth month** — proven, warm,
worn-in, calm. The site opens in noise and resolves into quiet. It **decrescendos**: motion, density, contrast
and colour temperature all reduce as the page descends. A visitor remembers this because no site they have ever
scrolled got *calmer* toward the bottom.

That single inversion is the brand. Everything below enforces it.

## The five laws

### Law 1 — Design the sixth month, not the launch.

Nothing may look new, unboxed, or aspirational. It looks proven.

- **Violation in the current site:** `AboutUs.tsx:82` illustrates the company with `travel_vlog_video.mp4` —
  13 MB of footage of somewhere else, doing something else. That is launch-day fantasy.
- **The test:** *Could this have been photographed, written, or drawn on an ordinary Tuesday inside a client's
  office?* If no, it fails.

### Law 2 — Every visible line is load-bearing.

A line separates, aligns, measures, or bounds. A line that only decorates is deleted.

- **Violation:** `.honeycomb-texture` at `opacity: 0.05` (`globals.css:59-63`) — the brand motif rendered as
  wallpaper, holding nothing up. The hexagon's real property is structural: maximum load per unit of material.
  Using it as texture throws away the only interesting thing about it.
- **The test:** *Delete it. Did anything become harder to read, align, group, or navigate?* If nothing did, it
  stays deleted.

### Law 3 — Mass, not magic.

Motion obeys weight and friction. Objects settle; they never materialise.

- **Violation:** `opacity: 0 → 1, y: 32` repeated in five components. Matter does not fade into existence.
- **The test:** *Could a physical object of known weight perform this motion?* Bounce, elastic, pop, and
  overshoot all fail. A long deceleration tail passes.

### Law 4 — One loud thing per screen.

Exactly one element per viewport sits at full volume. Everything else steps down hard.

- **Violation:** `SectionHeading.tsx` gives every section a honey chip **and** a `text-4xl md:text-6xl` bold
  heading **and** a subtitle — six times, at identical volume. When everything shouts, nothing lands.
- **The test:** squint until type is unreadable. If two elements still compete for the eye, one of them is
  wrong.

### Law 5 — Nothing is centered unless it is a monument.

Centered composition is the absence of a decision. It carries no tension and gives the eye nothing to travel
along.

- **Violation:** near-universal `items-center` + `text-center` + `mx-auto` across every section.
- **The test:** centering has a **budget of two uses across the entire site**. Spend them on statements, not on
  layouts.

## Voice

The writing already on the site is the strongest asset the brand owns. It is codified here so it cannot erode.

| Rule | |
|---|---|
| **State, don't sell.** | Describe what is true. Never claim what it will feel like. |
| **Concrete over abstract.** | "Three spreadsheets and a WhatsApp group" beats "fragmented workflows". |
| **Short sentences carry weight.** | Average under 20 words. One sentence per idea. |
| **Admit limits.** | *"If it only works in a demo, it does not work"* is more persuasive than any superlative. |
| **Sentence case everywhere.** | The only exception is the structural label style (§03). |
| **No exclamation marks.** | Ever. |

**Banned words:** seamless · cutting-edge · empower · revolutionize · leverage · solutions-driven ·
best-in-class · game-changing · unlock · elevate · robust · bespoke · synergy.

**Microcopy inherits the voice.** Error text says what to do (`"That email address doesn't look right."`), not
what went wrong. Buttons name the outcome, not the mechanism.

---

# 02 · Colour

## The doctrine

Colour on this site is not a palette. It is a **semantic system with four roles**, and every value belongs to
exactly one. This is what makes the honey budget (below) enforceable rather than aspirational.

| Family | Means | Where it lives |
|---|---|---|
| **IVORY** | The light of the working day. Warms as the page resolves. | Every page surface. |
| **INK** | Structure and substance. The material things are made of. | Text, rules, borders, the dark chapter. |
| **SLATE** | **The unresolved.** The problem, the before, Day Zero. Cold. | The noise register only. |
| **HONEY** | **The mark of resolution.** The thing that works. Warm. | Marking. Never decoration. |

The consequence is that **slate and honey are opposites in meaning, not just in temperature**. A section that
depicts the problem is cold. A section that depicts the outcome is warm. You cannot use honey decoratively
without lying, which is precisely the constraint the current site lacks.

## IVORY — the surface scale

Five values, monotonically **warming**. Measured red-minus-blue: 2 → 6 → 11 → 19 → 22.

| Token | Hex | Rel. luminance | Register |
|---|---|---|---|
| `--ivory-1` | `#F6F6F4` | 92.04 | Coldest. The noise register. Early, thin, unresolved light. |
| `--ivory-2` | `#FAF9F4` | 94.61 | Transitional. |
| `--ivory-3` | `#FDFAF2` | 95.66 | **Anchor.** The existing brand value. Mid-page. |
| `--ivory-4` | `#FDF7EA` | 93.34 | Warming. Resolution beginning. |
| `--ivory-5` | `#FCF6E6` | 92.32 | Warmest. Settled. The quiet end of the page. |

**Rule 02.1 — The scale is temperature, not brightness.** Maximum contrast ratio across the entire scale is
**1.04**. Adjacent steps range 1.011–1.026. No visitor consciously perceives a single step; every visitor
perceives the journey. This is deliberate — a scale with visible brightness steps would read as banded
sections rather than as passing time.

**Rule 02.2 — Ivory is assigned by narrative position, not by preference.** A section's ivory is determined by
where it sits in the noise-to-quiet arc. Descending sections may hold or warm. **A section may never be cooler
than the section above it.** The page warms in one direction only.

**Rule 02.3 — `--paper` (`#FFFFFF`) is a material, not a background.** It is permitted only for raised surfaces
(§06). No full-width band is ever pure white.

## INK — the structural scale

One charcoal currently does every job at eight different opacities (`charcoal/85`, `/70`, `/65`, `/60`, `/55`,
`/45`, `/40`, `/12`, `/8`). That is replaced by real values.

| Token | Hex | On ivory-3 | Use |
|---|---|---|---|
| `--ink-1` | `#14110F` | 18.03 AAA | The dark chapter band. Deepest ground. |
| `--ink-2` | `#1C1917` | 16.77 AAA | Primary text. Primary buttons. |
| `--ink-3` | `#443E39` | 10.10 AAA | Secondary text. Long-form body. |
| `--ink-4` | `#6B625A` | 5.72 AA | Tertiary text. Captions, meta. **Floor for text.** |
| `--ink-5` | `#9A9088` | 3.00 FAIL | **Never text.** Disabled states, decorative marks only. |
| `--ink-6` | `#C8C0B5` | 1.73 | Strong hairline. |
| `--ink-7` | `#E3DCD1` | 1.62 | Standard hairline. |
| `--ink-8` | `#F0EADF` | 1.51 | Inset fill, subtle divider. |

**Rule 02.4 — Text colour is a token, never an opacity.** `text-charcoal/65` is forbidden. Opacity-based text
shifts unpredictably across the five ivories and over any image, and it cannot be contrast-audited. Every text
colour is one of `ink-2`, `ink-3`, `ink-4`.

**Rule 02.5 — Three text weights of ink, no more.** Primary (`ink-2`), secondary (`ink-3`), tertiary (`ink-4`).
A fourth tier means the hierarchy is broken, not that a colour is missing.

## HONEY — the marking scale

| Token | Hex | On ivory-3 | Permitted use |
|---|---|---|---|
| `--honey-1` | `#FBF3D9` | — | Wash. The mark's background. |
| `--honey-2` | `#F5C242` | **1.59 FAIL** | Fills and marks on **dark grounds only**. 11.35 AAA on ink-1. |
| `--honey-3` | `#D4AF37` | **2.02 FAIL** | Brand gold. Wordmark, fills, marks. **Never text on light.** |
| `--honey-4` | `#A87C10` | 3.62 AA-large | Large text (≥24px) and icons only. |
| `--honey-5` | `#8A6100` | 5.31 AA | **The only honey permitted for body text.** 4.99 AA on honey-1. |
| `--honey-6` | `#5E4200` | 8.93 AAA | Text on honey-1 where AAA is required. |

**Rule 02.6 — The honey budget: three marks per viewport, maximum.** If a fourth honey element appears in a
single screen, one of the four is decoration and must be removed. The current site routinely runs eight or more
(eyebrow chip, capability chips, index badge, icon tile, bullets, borders, quote rule, CTA hover).

**Rule 02.7 — The exclusive honey list.** Honey may mark **only**:

1. The single most important word or figure on a screen.
2. The active state of a navigation item.
3. The focus ring.
4. The hex bullet (§05).
5. A resolution moment in the narrative — the point where a problem becomes solved.

Anything not on this list is not permitted to be honey. Eyebrow labels, capability tags, stack tags, index
numbers, icon tiles and section rules are **removed from honey** and rendered in ink.

**Rule 02.8 — Gold is a fill, not an ink.** `honey-2` and `honey-3` measure 1.59 and 2.02 against ivory. They
are never used for text, icons under 24px, or hairlines on any light ground. On `ink-1` they measure 11.35 and
8.94 — on dark, they are unrestricted.

## SLATE — the unresolved

| Token | Hex | On ivory-3 | Use |
|---|---|---|---|
| `--slate-1` | `#E7EBEC` | — | Cold wash. |
| `--slate-2` | `#A8B5B9` | 2.24 | Structural only. |
| `--slate-3` | `#6B7C82` | 4.17 AA-large | Large text and icons in the noise register. |
| `--slate-4` | `#47565C` | 7.31 AAA | Text in the noise register. |
| `--slate-5` | `#2C383D` | 11.57 AAA | The cold dark ground. |

**Rule 02.9 — Slate is quarantined to the noise register.** It appears only where the site depicts the
unresolved state. It may never appear after the narrative has resolved. This gives the palette a direction of
travel: the page literally loses its cold as it descends.

## Semantic status

**Rule 02.10 — Success is honey.** Resolution is already the meaning of honey; a separate green would
contradict the doctrine. Success = `honey-5` on `honey-1`, measured **4.99 AA**.

**Rule 02.11 — Danger is warm-shifted.** `--danger: #A6321F` (6.50 AA on ivory-3, 6.78 AA on paper) on
`--danger-wash: #FBEDE9` (5.94 AA). This replaces the raw Tailwind `red-400`/`red-600` in
`ContactSection.tsx:166`, which is a cold red sitting on a warm brand and reads as a browser default.

## Flat colour

**Rule 02.13 — Colour is flat. Gradients are forbidden.** No `linear-gradient`, no `radial-gradient`, no
gradient text fills, no gradient borders, no glow washes.

A gradient is light that has no source. It belongs to the launch-day register — the reveal, the product
shot, the hero glow — and it is the fastest way for a gold brand to read as ceremonial. Flat colour reads
as printed, measured, and settled, which is the whole thesis.

Currently in violation: the footer band (`FooterGlow.tsx:18`), the founder portrait ring
(`FoundersDesk.tsx:70`), the wordmark letter fill (`PremiumHero.tsx:313`), and the hero glow
(`PremiumHero.tsx:272`). All four become flat.

**The two exceptions**, both non-visible: `mask-image` and the understructure's reveal falloff (§08).
A gradient used as a mask is a tool, not a colour.

## The contrast matrix

**Rule 02.12 — A foreground/background pair not in this matrix is not permitted.** All values measured, not
estimated. Regenerate after any palette change.

| Foreground | ivory-1 | ivory-3 | ivory-5 | paper | honey-1 | ink-1 | slate-5 |
|---|---|---|---|---|---|---|---|
| `ink-2` | 16.16 AAA | 16.77 AAA | 16.21 AAA | 17.49 AAA | 15.76 AAA | — | — |
| `ink-3` | 9.73 AAA | 10.10 AAA | 9.76 AAA | 10.53 AAA | 9.49 AAA | — | — |
| `ink-4` | 5.51 AA | 5.72 AA | 5.53 AA | 5.97 AA | 5.38 AA | — | — |
| `ink-5` | 2.89 ✗ | 3.00 ✗ | 2.90 ✗ | 3.13 large | 2.82 ✗ | 6.02 AA | 3.86 large |
| `honey-4` | 3.49 large | 3.62 large | 3.50 large | 3.78 large | 3.41 large | — | — |
| `honey-5` | 5.12 AA | 5.31 AA | 5.13 AA | 5.54 AA | 4.99 AA | — | — |
| `honey-6` | 8.61 AAA | 8.93 AAA | 8.63 AAA | 9.31 AAA | 8.39 AAA | — | — |
| `honey-3` | 1.94 ✗ | **2.02 ✗** | — | 2.10 ✗ | — | 8.94 AAA | 5.74 AA |
| `honey-2` | 1.53 ✗ | **1.59 ✗** | — | 1.66 ✗ | — | 11.35 AAA | 7.29 AAA |
| `slate-3` | 4.02 large | 4.17 large | 4.03 large | 4.35 large | 3.92 large | — | — |
| `slate-4` | 7.05 AAA | 7.31 AAA | 7.07 AAA | 7.63 AAA | 6.87 AA | — | — |
| `danger` | 6.27 AA | 6.50 AA | 6.28 AA | 6.78 AA | 6.11 AA | — | — |
| `ivory-3` | — | — | — | — | — | 18.03 AAA | 11.57 AAA |
| `paper` | — | — | — | — | — | 18.80 AAA | 12.07 AAA |

---

# 03 · Typography

Faces are unchanged: **Space Grotesk** and **Inter**, both already installed via `next/font`
(`layout.tsx:6-16`). The problem was never the faces — it was that they had no jobs, no scale contrast, and no
weight discipline. This section supplies all three.

**Rule 03.0 — Rules reference role tokens, never face names.** Every rule below binds to `--font-display` or
`--font-text`. Swapping a face later is a one-line token change, not a rewrite of this document.

## The two voices

**Rule 03.1 — Space Grotesk is the structural voice. Inter is the reading voice.**

| Voice | Token | Carries |
|---|---|---|
| **Structural** | `--font-display` (Space Grotesk) | Display headings · all labels · all numerals · all measurements · all timestamps |
| **Reading** | `--font-text` (Inter) | Body copy · long-form paragraphs · form fields · buttons |

This split solves the missing-monospace problem without adding a face. Space Grotesk's geometric letterforms
and even-width figures already read as technical when set small, tracked, and uppercase. Giving it the label
and numeral job creates the engineering register the site lacks.

**Rule 03.2 — Numerals are architecture.** `01`–`04`, `09:40`, `DAY 00`, `MONTH 06` are set in
`--font-display`, at `--t-h2` or larger, in `--ink-6` or `--ink-5`. They are structural marks, not captions.
Set with `font-variant-numeric: tabular-nums` wherever numbers stack or align.

**Rule 03.3 — Reserved: the technical voice.** `--font-mono` is a reserved, currently unbound token. It is
additive: switching it on later reassigns labels and numerals from `--font-display` to `--font-mono` and changes
nothing else. **No rule in this system depends on it.**

## The ramp

Eleven steps. The current site uses four (`text-sm`, `text-base`, `text-4xl`, `text-6xl`), which is why
hierarchy reads as flat.

| Token | Min → Max | `clamp()` | Face | Weight | Tracking | Leading |
|---|---|---|---|---|---|---|
| `--t-meta` | 11 → 12 | `clamp(0.6875rem, 0.665rem + 0.09vw, 0.75rem)` | display | 500 | `0.18em` | 1.2 |
| `--t-caption` | 13 → 14 | `clamp(0.8125rem, 0.79rem + 0.09vw, 0.875rem)` | text | 400 | `0` | 1.5 |
| `--t-body-s` | 15 → 16 | `clamp(0.9375rem, 0.915rem + 0.09vw, 1rem)` | text | 400 | `0` | 1.6 |
| `--t-body` | 16 → 18 | `clamp(1rem, 0.955rem + 0.19vw, 1.125rem)` | text | 400 | `0` | 1.65 |
| `--t-body-l` | 18 → 21 | `clamp(1.125rem, 1.058rem + 0.28vw, 1.3125rem)` | text | 400 | `-0.005em` | 1.6 |
| `--t-lead` | 21 → 26 | `clamp(1.3125rem, 1.2rem + 0.47vw, 1.625rem)` | text | 400 | `-0.01em` | 1.5 |
| `--t-h4` | 24 → 30 | `clamp(1.5rem, 1.366rem + 0.57vw, 1.875rem)` | display | 500 | `-0.015em` | 1.25 |
| `--t-h3` | 30 → 40 | `clamp(1.875rem, 1.65rem + 0.94vw, 2.5rem)` | display | 500 | `-0.02em` | 1.15 |
| `--t-h2` | 40 → 60 | `clamp(2.5rem, 2.05rem + 1.89vw, 3.75rem)` | display | 700 | `-0.025em` | 1.05 |
| `--t-h1` | 56 → 88 | `clamp(3.5rem, 2.78rem + 3.02vw, 5.5rem)` | display | 700 | `-0.03em` | 0.98 |
| `--t-monument` | 80 → 160 | `clamp(5rem, 3.21rem + 7.55vw, 10rem)` | display | 700 | `-0.04em` | 0.92 |

Fluid range is calibrated 380px → 1440px.

**Rule 03.4 — `--t-monument` appears at most twice in the entire site.** It is the wordmark and one statement.
A third use makes both ordinary.

**Rule 03.5 — Skip a step.** Two type sizes adjacent in the layout must be at least **two ramp steps apart**.
Neighbouring steps are too close to read as hierarchy and produce the flat, same-volume effect the current site
has.

## Weight whitelist

**Rule 03.6 — Four weights exist. Any other weight is forbidden.**

| Face | Permitted | Job |
|---|---|---|
| Space Grotesk | **500** | Labels, `--t-h4`, `--t-h3` |
| Space Grotesk | **700** | `--t-h2`, `--t-h1`, `--t-monument` |
| Inter | **400** | All body copy |
| Inter | **600** | Buttons, form labels, the one emphasised word in a paragraph |

Semibold body text, bold body text, light weights, and italic display are all forbidden. Italic is permitted
only in `--t-caption` and `--t-body-s`, for a single attributed line.

## Structural labels

**Rule 03.7 — The label style is the only place uppercase is permitted.** `--t-meta` · display · 500 ·
`0.18em` tracking · uppercase · `--ink-4`. Never honey (Rule 02.7).

**Rule 03.8 — Labels are not chips.** The current pattern wraps every label in a rounded honey pill with a dot
(`SectionHeading.tsx:26-33`). Labels are set as bare text, preceded by a 24px hairline rule in `--ink-6`. The
rule is load-bearing (Law 2): it marks the start of a block and anchors the label to the grid. The pill did not.

## Measure and setting

**Rule 03.9 — Measure ceilings.** Body copy: **64ch**. Lead paragraphs: **48ch**. Statements at `--t-h2` and
above: **20ch**. A line longer than its ceiling is a layout error.

**Rule 03.10 — Optical alignment.** Display type at `--t-h1` and above is optically aligned to the grid, not
metrically. Left-hanging punctuation and round letterforms (`O`, `C`, `G`, `S`) overhang the column edge.

**Rule 03.11 — Tracking is bound to size.** Never set tracking by eye. Use the ramp's value. Positive tracking
exists at exactly one size (`--t-meta`); every step above `--t-body` is negative.

---

# 04 · Composition & grid

*Load-bearing section.* This is the primary fix for repeated layouts and centered sameness.

## The grid

12 columns. Gutters and margins are fixed per breakpoint; column width is fluid.

| Breakpoint | Width | Columns | Gutter | Margin | Max content |
|---|---|---|---|---|---|
| `xs` | 380–639 | 4 | 16 | 24 | fluid |
| `sm` | 640–899 | 8 | 24 | 32 | fluid |
| `md` | 900–1199 | 12 | 24 | 48 | fluid |
| `lg` | 1200–1439 | 12 | 32 | 64 | 1280 |
| `xl` | ≥1440 | 12 | 32 | auto | 1280 |

## Seats — the fix for centering

Content does not float in the middle of the page. It occupies one of five named **seats**.

| Seat | Columns (md+) | Character |
|---|---|---|
| `seat-anchor` | 1 – 7 | Left, wide. The default. |
| `seat-inset` | 3 – 9 | Indented. Reads as a held breath. |
| `seat-offset` | 6 – 12 | Right. Creates counterweight. |
| `seat-full` | 1 – 12 | Full bleed. Structural sections only. |
| `seat-monument` | 3 – 10, centered | **Budget: 2 uses sitewide.** |

**Rule 04.1 — Consecutive sections may not share a seat.** Two sections in a row on `seat-anchor` is the
uniformity failure, restated.

**Rule 04.2 — The half-offset law.** Adjacent seats must differ by **at least 2 columns** of horizontal
displacement. This produces the brick rag of a honeycomb's offset rows — the comb expressed as layout rather
than as wallpaper. `seat-anchor` → `seat-inset` (2 columns) passes. `seat-anchor` → `seat-full` passes.

**Rule 04.3 — Centering costs a budget token.** Two `seat-monument` uses exist for the whole site. Spend them
on statements. Every other centered composition is rejected.

**Rule 04.4 — Mobile does not collapse to centered stacks.** Below `md`, seats map to left-aligned full-width
blocks with a **varying left indent** (0, 1, or 2 columns) inherited from the desktop seat. The rag survives the
breakpoint; that is what stops mobile from flattening into the generic single centered column.

## Spacing

Base unit **4px**. Nothing is spaced off-scale.

`4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 80 · 96 · 128 · 160 · 192 · 256`

**Rule 04.5 — Space is a token or it is a bug.** Arbitrary values (`mt-[13px]`, `gap-[18px]`) are forbidden.

**Rule 04.6 — Vertical space groups.** Space *within* a group is always at least one full step smaller than
space *around* the group. When related things sit as far apart as unrelated things, the eye cannot find the
structure.

## Vertical rhythm — the decrescendo

The current site pads every section identically (`py-14 md:py-20` — 56/80px). Uniform density is why the page
reads flat. Density now **carries the narrative**: sections get airier as the page descends and resolves.

| Token | Mobile | Desktop | Register |
|---|---|---|---|
| `--rhythm-1` | 72 | 96 | Noise. Dense, tight, uncomfortable. |
| `--rhythm-2` | 96 | 128 | Working. |
| `--rhythm-3` | 128 | 176 | Resolving. |
| `--rhythm-4` | 176 | 240 | Settled. Quiet. Nearly empty. |

**Rule 04.7 — Rhythm may only increase down the page.** A section may hold or open. It may never tighten
relative to the section above it. The page breathes out, once, over its full length.

---

# 05 · Geometry & form language

## The cut corner — the form signature

**One corner clipped, top-right, 30° from horizontal.** This is the single most identifiable element in the
system. It costs nothing to render, works at every size, and appears on every surface in the brand.

### The construction

The cut removes a right triangle from the top-right corner. Its horizontal leg `w` runs along the top edge; its
vertical leg `h` runs down the right edge.

```
    w
 ┌──────/
 │     /  h        h = w · tan(30°) = 0.5774 · w
 │    /
 │   |
```

| Token | `w` | `h` | Applies to |
|---|---|---|---|
| `--cut-1` | 12 | 7 | Tags, small controls, inline marks |
| `--cut-2` | 18 | 10 | Buttons, form fields, list rows |
| `--cut-3` | 28 | 16 | Panels, media frames, index rows |
| `--cut-4` | 48 | 28 | Large surfaces, feature frames |
| `--cut-5` | 88 | 51 | Full-bleed bands, chapter breaks |

Implementation:
`clip-path: polygon(0 0, calc(100% - {w}) 0, 100% {h}, 100% 100%, 0 100%)`

**Rule 05.1 — The cut replaces `border-radius`. Radius is 0 everywhere.** The current site runs
`rounded-3xl`, `rounded-2xl`, `rounded-xl` and `rounded-full` simultaneously. All are removed.

**Rule 05.2 — The cut scales with the surface, not with the brand.** A 12px cut on a full-bleed band is
invisible; an 88px cut on a tag destroys it. Pick the token by surface size, using the table.

**Rule 05.3 — The three exceptions.** A shape may remain a circle **only** for: a human portrait, a status dot,
and an avatar. Everything else that is currently `rounded-full` — pills, badges, icon tiles, index bubbles,
buttons — becomes a cut rectangle.

**Rule 05.4 — `clip-path` removes `box-shadow`.** This is a browser fact, not a preference. A cut surface that
needs elevation uses `filter: drop-shadow()` on a wrapper element. `box-shadow` on a clipped element renders
nothing and is a silent bug.

**Rule 05.5 — One cut per surface.** Nesting a cut element inside a cut container at the same corner produces a
stepped, ragged edge. The child reverts to a plain rectangle.

## Hairlines

**Rule 05.6 — Three weights, three meanings.**

| Weight | Colour | Means |
|---|---|---|
| 1px | `--ink-7` | Separation within a group |
| 1px | `--ink-6` | Boundary between groups |
| 2px | `--ink-2` | Structural edge. Chapter-level only. |

**Rule 05.7 — Hairlines run to the grid, not to the content.** A rule stops at a column boundary. A rule
stopping at an arbitrary text width is decoration (Law 2).

## The hex bullet

The 30°/60° hexagon already in `SolutionsSection.tsx:317` and `ContactSection.tsx:138` is promoted to a system
glyph.

**Rule 05.8 — The hex bullet is the only list marker in the system.** Discs, dashes, chevrons and check marks
are removed. Sizes: 8px (inline), 10px (list), 14px (feature list). Colour: `--ink-6` by default; `--honey-3`
only when the bullet is one of the three permitted marks (Rule 02.6).

## The understructure grid

**Rule 05.9 — The hexagonal grid is a structure, never a texture.** The existing `.honeycomb-texture` at 5%
opacity is deleted. The comb geometry survives in exactly three places: the layout offset (Rule 04.2), the
bullet (Rule 05.8), and the pointer-revealed understructure (§08). In all three it holds something up.

---

# 06 · Surface & material

`.card-surface` — described in its own comment as *"the one surface treatment sitewide"* — is replaced by four
named materials. One surface for every job is why everything currently reads as the same object.

| Material | Ground | Edge | Elevation | Cut | Holds |
|---|---|---|---|---|---|
| **Paper** | `--paper` | none | `drop-shadow(0 1px 2px rgba(28,25,23,.05)) drop-shadow(0 12px 28px rgba(28,25,23,.09))` | `--cut-3` | Content lifted above the page. Media, forms. |
| **Inset** | `--ink-8` | none | none — recessed | `--cut-2` | Supporting detail. Specs, metadata, quotes. |
| **Ink** | `--ink-1` | none | none | `--cut-5` | The dark chapter. Full-bleed only. |
| **Line** | transparent | 1px `--ink-6` | none | `--cut-3` | Structure without weight. The default. |

**Rule 06.1 — `Line` is the default material. `Paper` must be earned.** A surface gets elevation only when it
sits at a different level of the hierarchy from its surroundings. Elevation used as packaging — a white card
around every block of content — is what makes the current site read as a template.

**Rule 06.2 — One elevation level per screen.** Nested shadows are forbidden. A `Paper` surface may not contain
another `Paper` surface.

**Rule 06.3 — `Ink` appears exactly once in the site.** It is the chapter break. A second dark band halves the
impact of the first.

**Rule 06.4 — Materials do not stack their identities.** A surface is one material. It does not take `Inset`'s
ground and `Paper`'s shadow.

**Rule 06.5 — Surfaces are opaque. Translucency and `backdrop-filter` are forbidden.** A material has a
ground colour from the token set, at full opacity. No `bg-white/90`, no `bg-ivory/85`, no `backdrop-blur`.

Three reasons, in order of weight:

1. **It contradicts the material system.** A surface that shows what is behind it has no substance, and
   substance is the point (Law 1). Frosted glass is the launch-day register.
2. **It cannot be contrast-audited.** The measured ratio of text on a translucent ground depends on
   whatever happens to scroll behind it. Rule 02.12 becomes unenforceable.
3. **It is expensive exactly where it must not be.** `backdrop-filter` forces a full-screen composite
   every frame and is one of the most reliable ways to drop frames on the low-cost Android hardware this
   company's own copy promises to build for. A brand that says *"we build for patchy connections and
   low-cost Android phones"* cannot ship a frosted navigation bar.

Currently in violation: the sticky nav and mobile menu (`PremiumHero.tsx:155`, `:226`), the modal scrim
(`SolutionsSection.tsx:267`), and the tag chip (`VisionMission.tsx:37`). Each becomes an opaque ground
plus a hairline.

**The one exception:** a full-screen modal scrim may use `--ink-1` at 55% opacity. It sits over content
deliberately being obscured, carries no text, and covers the viewport rather than compositing a strip.

---

# 07 · Motion

*Load-bearing section.* Written as physics. The current site has one motion; this defines a behaviour system.

## The curves

| Token | `cubic-bezier` | Character | Used for |
|---|---|---|---|
| `--ease-settle` | `(0.16, 1, 0.30, 1)` | Fast start, very long tail. Mass coming to rest. | **The primary curve.** All arrivals. |
| `--ease-shift` | `(0.32, 0.72, 0.20, 1)` | Even, weighted. | Positional change of something already present. |
| `--ease-reveal` | `(0.25, 0.60, 0.35, 1)` | Gentle both ends. | Opacity, clip-path, masks. |
| `--ease-press` | `(0.30, 0, 0.20, 1)` | Immediate. | Tactile feedback under the finger. |
| `--ease-exit` | `(0.55, 0, 0.85, 0.35)` | Accelerating away. | Dismissal, removal. |
| `--ease-drive` | `linear` | None. | **Scrubbed sequences only.** |

`--ease-settle` is derived from the one piece of motion craft already on the site — the wordmark's alternating
letter convergence with a long deceleration (`PremiumHero.tsx:129-142`). That physics was right. It is now the
law.

## Durations

| Token | ms | Used for |
|---|---|---|
| `--d-tap` | 90 | Press feedback |
| `--d-quick` | 180 | Hover, focus |
| `--d-base` | 320 | Component state change |
| `--d-settle` | 620 | Element arrival |
| `--d-long` | 1100 | Section-scale movement |
| `--d-monument` | 2400 | The wordmark. Once per session. |

**Rule 07.1 — Distance sets duration.** A 4px move takes `--d-quick`. A 200px move takes `--d-settle`. Equal
durations across unequal distances is why uniform fade-ups feel synthetic — the objects have no consistent
mass.

## The vocabulary

**Rule 07.2 — Four verbs exist. Motion that is not one of these is not permitted.**

| Verb | Definition |
|---|---|
| **Settle** | Something already present comes to rest. Ends at zero velocity, never overshoots. |
| **Shift** | Something present changes position or size. |
| **Reveal** | Something present is uncovered — by mask, clip, or scroll. It was always there. |
| **Hold** | Deliberate stillness. A composed choice, and the most underused verb available. |

Note what is absent: **enter**, **appear**, **pop**, **drop in**. Objects are not created by scrolling.

## The banned list

**Rule 07.3 — Forbidden, without exception:**

- `opacity: 0 → 1` combined with `translateY` — matter does not fade into existence *(this is the site's current
  entire motion vocabulary)*
- Bounce, elastic, `back` easing, any overshoot
- `scale` from 0
- Infinite loops outside the noise register
- Parallax on text
- Anything that moves while the user is reading it
- Hover effects that change layout

## Rhythm

**Rule 07.4 — Adjacent sections may not share a scroll behaviour.** Every section is exactly one of:
**scrubbed** (the user drives it), **triggered** (it settles once on entry), or **static** (it never moves).
Two consecutive triggered sections is the uniformity failure in motion form — which is the current site
precisely.

**Rule 07.5 — The choreography budget shrinks down the page.** Maximum simultaneously moving elements:

| Register | Budget |
|---|---|
| Noise | 6 |
| Working | 4 |
| Resolving | 2 |
| Settled | 1 |

By the foot of the page, one thing moves at a time, and then nothing does. That is the decrescendo made
mechanical.

**Rule 07.6 — Motion happens once.** No entrance animation replays on scroll-back. The current
`once: true` usage is correct and is retained.

## Reduced motion

**Rule 07.7 — `prefers-reduced-motion: reduce` renders the settled end state.** Not a shortened animation, not
a cross-fade: the final frame, immediately.

This system gets that for free. Because every sequence resolves *to* the settled state, the reduced-motion
fallback is the composition the design is aiming at. The accessible path is also the best-looking one — which is
the correct relationship between the two.

**Rule 07.8 — Scrubbed sequences render at their end state under reduced motion**, and the scroll distance they
occupied collapses. A pinned section that cannot animate must not still consume 300vh of scrolling.

---

# 08 · Interaction

*Load-bearing section.* The interaction language the site currently has none of.

## The understructure

The site's own headline is *"The digital backbone your business grows on."* The primary interaction makes that
literal: the load-bearing grid beneath the surface, revealed by the pointer — like x-raying the frame inside a
wall.

### Specification

| Property | Value |
|---|---|
| Layer | Single `position: fixed` element, beneath content, above ground |
| Content | Hex grid, 1px stroke, `--ink-6`, 84 × 150 cell |
| Reveal | `mask-image: radial-gradient(circle 260px at var(--ux) var(--uy), #000 0%, #000 30%, transparent 72%)` |
| Peak opacity | `0.09` |
| Update | `pointermove` → `requestAnimationFrame`-throttled → two custom properties on `:root` |
| Transition | `--d-base` / `--ease-reveal` on opacity only. Position is not transitioned. |

**Rule 08.1 — The understructure never repaints content.** It writes two CSS custom properties. It does not
touch layout, does not trigger reflow, and composites on its own layer. If a frame budget is exceeded, the
implementation is wrong — the spec is cheap by construction.

**Rule 08.2 — It is disabled below 1024px and on coarse pointers.** There is no pointer to follow. It is not
replaced by a tap interaction: a decorative tap target teaches the user a lie about what is clickable.

**Rule 08.3 — It reveals; it never draws attention to itself.** Peak opacity is 0.09. If a visitor looks at the
grid instead of the content, it is too strong. It is felt, not read.

**Rule 08.4 — It is the only cursor-driven effect in the system.** No custom cursors, no cursor followers, no
magnetic buttons, no spotlight. One pointer idea, executed once.

## State contracts

**Rule 08.5 — Every interactive element implements all five states.** A missing state is an incomplete
component.

| State | Treatment | Timing |
|---|---|---|
| **Default** | Material per §06 | — |
| **Hover** | Ground shifts one ink step. **No movement, no shadow change, no scale.** | `--d-quick` / `--ease-reveal` |
| **Press** | Ground shifts one further step. Optical inset of 1px. | `--d-tap` / `--ease-press` |
| **Focus-visible** | 2px `--honey-5` outline, 3px offset. On `Ink`, 2px `--honey-2`. | `--d-quick` |
| **Disabled** | `--ink-5` foreground, no ground, `cursor: not-allowed` | — |

**Rule 08.6 — Hover does not move anything.** The current `hover:-translate-y-1.5` on cards
(`OurAchievements.tsx:43`, `VisionMission.tsx:25`) violates Law 3 — surfaces are not magnetic and do not rise
toward a pointer. Hover changes *value*, not *position*.

**Rule 08.7 — Focus is designed, not defaulted.** The focus ring is honey. It is one of only five permitted
honey marks (Rule 02.7) because focus genuinely is the most important thing on the screen when it is present.

**Rule 08.8 — Target floor: 44 × 44px.** Including inline links in dense text, which get vertical padding to
reach it.

## The scroll contract

**Rule 08.9 — Scroll may drive time, position, and reveal. It may never drive opacity alone.** Fading things in
and out on scroll is Law 3's violation restated: matter that flickers in and out of existence as the user moves.

**Rule 08.10 — Scroll never hijacks.** No scroll-jacking, no forced snapping between sections, no delayed
release. Smooth scrolling (Lenis, already installed) smooths input; it does not take control of it.

**Rule 08.11 — A pinned section declares its cost.** Any section that pins states its scroll length in
viewport-heights. Total pinned distance across the site does not exceed **250vh**. Beyond that, the page stops
feeling composed and starts feeling stuck.

## Accessibility floor

Non-negotiable. Ranks above any visual rule in this document.

1. Every foreground/background pair appears in the §02 matrix, measured.
2. Focus order follows visual order. No positive `tabindex`.
3. Every interactive element is reachable and operable by keyboard.
4. `prefers-reduced-motion` is honoured per Rules 07.7 and 07.8.
5. Text is never rendered as an image.
6. Colour is never the sole carrier of meaning — the hex bullet, position, or a label carries it too.
7. Every animation can be interrupted by user input.

---

# 12. Component catalogue

> **Status.** Written during implementation, derived from the systems already
> locked in §02–§08 rather than invented alongside them. Where a component
> below states a value, that value is the one shipped in
> `src/app/globals.css`.

Every component states its material (§06), its cut (§05), its type role (§03)
and its states. Rule 08.5 requires all five states — default, hover, press,
focus-visible, disabled — on every interactive element; only the ones that
differ from the contract are restated here.

## 12.1 Buttons — three tiers

| Tier | Material | Cut | Type | Use |
|---|---|---|---|---|
| **Primary** | ground `--ink-2`, text `--ivory-3` | `--cut-2` | `--font-text` 600, `--t-body-s` | The one action a screen is asking for. **One per viewport.** |
| **Secondary** | transparent, 1px `--line-bound`, text `--ink-2` | `--cut-2` | same | The alternative to the primary action |
| **Quiet** | no ground, text `--ink-2`, no border | none | same | Tertiary actions, inline with content |

Minimum height **44px** (08.8), horizontal padding `--s-8`. Hover shifts the
ground one step (`ink-2 → ink-1` primary, `transparent → ink-8` secondary);
press shifts one further. **No button is honey.** A honey button would spend a
viewport mark on a control, and 02.7 does not list controls.

## 12.2 Links

Inline links carry `--honey-5` — the only honey legal as body text — and
underline on hover, never on default. Navigation links are `--ink-4`, going to
`--ink-2` on hover and `--honey-5` when active (02.7 permits the active nav
state). All links meet the 44px target floor via `.tap`, including in dense
text.

## 12.3 Tags

`--ink-8` ground, `--ink-4` text, `--t-meta`, `--cut-1`. **Never honey, never a
pill.** Tags were the single most over-used element on the previous site; they
are demoted deliberately. A tag carries a fact, not emphasis.

## 12.4 Form fields

`--paper` ground, 1px `--line-bound`, `--cut-2`, min-height 48px,
`--t-body-s`. Placeholder is `--ink-5` — which is never a text colour anywhere
else, and is correct here precisely because a placeholder is not text. Error
state takes `--danger` on the border and a `--t-caption` message in `--danger`
below. Focus is the global honey ring; fields do not define their own.

Every field has a real `<label>`. A placeholder is not a label.

## 12.5 Index rows

The specimen-sheet pattern that **replaces cards**. `Line` material,
`--cut-3`, a leading numeral in `--font-display` at `--t-h4` or larger in
`--ink-5` with tabular figures (03.2), a title at `--t-h3`, and supporting
copy at `--t-body-s`. Rows share a `--line-hair` boundary rather than each
carrying its own container.

An index row is the default way to present a list of things. A `Paper` card is
the exception, and 06.1 requires it to be earned.

## 12.6 Section openers

A hairline 24px rule in `--ink-6`, then the label at `--t-meta` in `--ink-4`,
then the title at `--t-h2`, then an optional subtitle at `--t-lead` in
`--ink-3` capped at `--measure-lead`. Left-aligned by default; `center` has to
be asked for and spends monument budget (04.3).

## 12.7 Statement blocks

A single sentence at `--t-h2` or above, capped at `--measure-statement`
(20ch), with one word or figure permitted in honey (02.7). No container, no
material, no ground — a statement is type on the page.

## 12.8 The hairline credential strip

Logos at a common optical height on the `Inset` ground, separated by
`--line-hair` rules that run to the grid (05.7). Greyscale is **not** used:
credentials are shown as issued or not shown.

---

# 13. Section archetypes

> **Status.** As above — derived, not inherited. The set is closed: a new
> section takes one of these seven or the set is amended here first.

## 13.1 The governing law

**No two adjacent sections may share an archetype.**

It composes with four rules already in force, and a section is only correct
when all five hold at once:

| Rule | Constraint across a boundary |
|---|---|
| 13.1 | archetype must differ |
| 04.1 | seat must differ |
| 04.2 | seats differ by ≥2 columns of displacement |
| 04.7 | rhythm may increase or hold, never tighten |
| 02.2 | ivory may warm or hold, never cool |
| 07.4 | scroll behaviour must differ |

## 13.2 The set

| # | Archetype | Seat | Ground | Rhythm | Scroll | Budget | Holds |
|---|---|---|---|---|---|---|---|
| A | **Monument** | `monument` | `ivory-2` | — | triggered on load | 6 | The wordmark and one claim. **Once sitewide** — spends 1 of the 2 centering tokens (04.3) |
| B | **Statement** | `anchor` (1–7) | `ivory-2` | 1 | static | 0 | Long-form prose with a media counterweight in 9–12 |
| C | **Pair** | `offset` (6–12) opener, full content | `ivory-3` | 2 | triggered | 3 | Exactly two peer items. Never three — three is an Index |
| D | **Strip** | `full` | `ink-8` (`Inset`) | 2 | static | 0 | Credentials, logos, facts. Carries no argument |
| E | **Index** | `inset` (3–9) opener, full content | `ivory-3` | 3 | triggered per row | 2 | Three or more peer items as index rows |
| F | **Chapter** | `full` | `ink-1` (`Ink`) | 3 | static | 0 | The break between the working page and its settled end. **Once sitewide** (06.3) |
| G | **Close** | `inset` (3–9) | `ivory-4` | 4 | triggered | 1 | The single action the page has been building towards |

## 13.3 The archetype-to-narrative map

The set produces the noise-to-quiet arc by construction rather than by
intention. Reading down the page, every column moves in one direction only:

| Section | Archetype | Register | Ivory | Rhythm | Budget |
|---|---|---|---|---|---|
| Hero | A Monument | noise | 2 | — | 6 |
| About | B Statement | noise → working | 2 | 1 | 0 |
| Vision & Mission | C Pair | working | 3 | 2 | 3 |
| Achievements | D Strip | working | inset band | 2 | 0 |
| Solutions | E Index | resolving | 3 | 3 | 2 |
| Founder's Desk | F Chapter | resolving | ink | 3 | 0 |
| Contact | G Close | settled | 4 | 4 | 1 |
| Footer | — | settled | 5 | — | 0 |

Choreography falls 6 → 0 → 3 → 0 → 2 → 0 → 1. Scroll behaviour alternates
triggered / static without repeating. Rhythm only opens. Ivory only warms.
**The decrescendo is a consequence of the table, not a thing anyone has to
remember to do.**

## 13.4 What the set forbids

- Six sections that all open with a centered heading over a white card grid —
  the diagnosis this system was written to answer.
- A second `Chapter`. There is one dark band and it is the Founder's Desk.
- A second `Monument`. The remaining centering token is unspent and reserved.
- Adding a section by copying the one above it and changing the copy.

---

# Phase 2 — remaining

| § | Section |
|---|---|
| 09 | **Wordmark & logo** — custom letterforms on the hex construction grid, lockups, clear space, SVG delivery |
| 10 | **Iconography** — hex-grid-derived icon system, stroke weight, terminals, lucide policy |
| 11 | **Photography & imagery** — the duotone grade spec, subject rules, forbidden list, video weight ceiling |
| 14 | **Do / Don't gallery** |

---

*Hivecrest Technologies · Brand Bible · §01–§08 Phase 1 · §12–§13 written during implementation*
