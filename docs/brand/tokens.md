# HIVECREST — Token Reference

Flat lookup. Every value in the Phase 1 system, its name, and what it is allowed to do.
Rule numbers reference [`BRAND-BIBLE.md`](./BRAND-BIBLE.md).

> **Not yet wired.** These are specified, not implemented. Nothing in `src/app/globals.css` has changed.
> Transcription into `@theme` happens after approval.

---

## Colour — Ivory (surfaces)

| Token | Hex | Rel. lum | Allowed use |
|---|---|---|---|
| `--ivory-1` | `#F6F6F4` | 92.04 | Page ground — noise register only |
| `--ivory-2` | `#FAF9F4` | 94.61 | Page ground — transitional |
| `--ivory-3` | `#FDFAF2` | 95.66 | Page ground — anchor (existing brand value) |
| `--ivory-4` | `#FDF7EA` | 93.34 | Page ground — resolving |
| `--ivory-5` | `#FCF6E6` | 92.32 | Page ground — settled |
| `--paper` | `#FFFFFF` | 100.00 | `Paper` material only. Never a full-width band. (06.1) |

Max ratio across the whole scale: **1.04**. Adjacent steps: 1.011–1.026. Warmth (R−B) is monotonic:
2 → 6 → 11 → 19 → 22. Direction of travel is one-way (02.2).

## Colour — Ink (structure)

| Token | Hex | On `ivory-3` | Allowed use |
|---|---|---|---|
| `--ink-1` | `#14110F` | 18.03 AAA | `Ink` material ground. Once sitewide. (06.3) |
| `--ink-2` | `#1C1917` | 16.77 AAA | Primary text · primary button ground · 2px structural edge |
| `--ink-3` | `#443E39` | 10.10 AAA | Secondary text · long-form body |
| `--ink-4` | `#6B625A` | 5.72 AA | Tertiary text · labels · captions. **Text floor.** |
| `--ink-5` | `#9A9088` | 3.00 ✗ | **Never text.** Disabled foreground · large numerals |
| `--ink-6` | `#C8C0B5` | 1.73 | Group-boundary hairline · hex bullet · understructure stroke |
| `--ink-7` | `#E3DCD1` | 1.62 | In-group hairline |
| `--ink-8` | `#F0EADF` | 1.51 | `Inset` material ground |

Text colour is a token, never an opacity (02.4). Three text tiers only (02.5).

## Colour — Honey (marking)

| Token | Hex | On `ivory-3` | On `ink-1` | Allowed use |
|---|---|---|---|---|
| `--honey-1` | `#FBF3D9` | — | — | Mark background |
| `--honey-2` | `#F5C242` | 1.59 ✗ | 11.35 AAA | Fill/text on **dark grounds only** · focus ring on `Ink` |
| `--honey-3` | `#D4AF37` | 2.02 ✗ | 8.94 AAA | Brand gold. Fills and marks. **Never text on light.** (02.8) |
| `--honey-4` | `#A87C10` | 3.62 large | — | Text ≥24px and icons only |
| `--honey-5` | `#8A6100` | 5.31 AA | — | **Only honey permitted for body text.** Focus ring on light. |
| `--honey-6` | `#5E4200` | 8.93 AAA | — | Text on `honey-1` where AAA required |

**Budget: 3 honey marks per viewport, maximum** (02.6). Exclusive permitted list (02.7):
① the single most important word or figure on a screen ② active nav state ③ focus ring ④ hex bullet
⑤ a narrative resolution moment. Nothing else.

## Colour — Slate (the unresolved)

| Token | Hex | On `ivory-3` | Allowed use |
|---|---|---|---|
| `--slate-1` | `#E7EBEC` | — | Cold wash |
| `--slate-2` | `#A8B5B9` | 2.24 ✗ | Structural only |
| `--slate-3` | `#6B7C82` | 4.17 large | Large text and icons — noise register |
| `--slate-4` | `#47565C` | 7.31 AAA | Text — noise register |
| `--slate-5` | `#2C383D` | 11.57 AAA | Cold dark ground — noise register |

Quarantined to the noise register. Never appears after the narrative resolves (02.9).

## Colour — Semantic

| Token | Hex | Contrast | Use |
|---|---|---|---|
| `--success` | `#8A6100` (= `honey-5`) | 4.99 AA on `--success-wash` | Success text. Resolution is honey. (02.10) |
| `--success-wash` | `#FBF3D9` (= `honey-1`) | — | Success ground |
| `--danger` | `#A6321F` | 6.50 AA on `ivory-3` · 5.94 AA on wash | Error text |
| `--danger-wash` | `#FBEDE9` | — | Error ground |

Replaces raw Tailwind `red-400`/`red-600` (02.11).

---

## Typography — Faces

| Token | Bound to | Carries |
|---|---|---|
| `--font-display` | Space Grotesk | Display headings · labels · numerals · measurements · timestamps |
| `--font-text` | Inter | Body · paragraphs · form fields · buttons |
| `--font-mono` | *(reserved, unbound)* | Deferred technical voice. No rule depends on it. (03.3) |

## Typography — Ramp

| Token | Range | `clamp()` | Face | Wt | Track | Lead |
|---|---|---|---|---|---|---|
| `--t-meta` | 11→12 | `clamp(0.6875rem, 0.665rem + 0.09vw, 0.75rem)` | display | 500 | `0.18em` | 1.2 |
| `--t-caption` | 13→14 | `clamp(0.8125rem, 0.79rem + 0.09vw, 0.875rem)` | text | 400 | `0` | 1.5 |
| `--t-body-s` | 15→16 | `clamp(0.9375rem, 0.915rem + 0.09vw, 1rem)` | text | 400 | `0` | 1.6 |
| `--t-body` | 16→18 | `clamp(1rem, 0.955rem + 0.19vw, 1.125rem)` | text | 400 | `0` | 1.65 |
| `--t-body-l` | 18→21 | `clamp(1.125rem, 1.058rem + 0.28vw, 1.3125rem)` | text | 400 | `-0.005em` | 1.6 |
| `--t-lead` | 21→26 | `clamp(1.3125rem, 1.2rem + 0.47vw, 1.625rem)` | text | 400 | `-0.01em` | 1.5 |
| `--t-h4` | 24→30 | `clamp(1.5rem, 1.366rem + 0.57vw, 1.875rem)` | display | 500 | `-0.015em` | 1.25 |
| `--t-h3` | 30→40 | `clamp(1.875rem, 1.65rem + 0.94vw, 2.5rem)` | display | 500 | `-0.02em` | 1.15 |
| `--t-h2` | 40→60 | `clamp(2.5rem, 2.05rem + 1.89vw, 3.75rem)` | display | 700 | `-0.025em` | 1.05 |
| `--t-h1` | 56→88 | `clamp(3.5rem, 2.78rem + 3.02vw, 5.5rem)` | display | 700 | `-0.03em` | 0.98 |
| `--t-monument` | 80→160 | `clamp(5rem, 3.21rem + 7.55vw, 10rem)` | display | 700 | `-0.04em` | 0.92 |

Fluid range 380 → 1440px. `--t-monument`: **2 uses sitewide** (03.4). Adjacent sizes must be ≥2 ramp
steps apart (03.5).

## Typography — Weights

| Face | Weight | Job |
|---|---|---|
| Space Grotesk | 500 | Labels · `--t-h4` · `--t-h3` |
| Space Grotesk | 700 | `--t-h2` · `--t-h1` · `--t-monument` |
| Inter | 400 | All body copy |
| Inter | 600 | Buttons · form labels · one emphasised word |

Any other weight is forbidden (03.6).

## Typography — Measure

| Token | Ceiling |
|---|---|
| `--measure-body` | 64ch |
| `--measure-lead` | 48ch |
| `--measure-statement` | 20ch |

---

## Grid

| Breakpoint | Width | Cols | Gutter | Margin | Max |
|---|---|---|---|---|---|
| `xs` | 380–639 | 4 | 16 | 24 | fluid |
| `sm` | 640–899 | 8 | 24 | 32 | fluid |
| `md` | 900–1199 | 12 | 24 | 48 | fluid |
| `lg` | 1200–1439 | 12 | 32 | 64 | 1280 |
| `xl` | ≥1440 | 12 | 32 | auto | 1280 |

## Seats

| Token | Columns (md+) | Note |
|---|---|---|
| `--seat-anchor` | 1 – 7 | Default |
| `--seat-inset` | 3 – 9 | |
| `--seat-offset` | 6 – 12 | |
| `--seat-full` | 1 – 12 | Structural only |
| `--seat-monument` | 3 – 10, centered | **Budget: 2 sitewide** (04.3) |

Consecutive sections may not share a seat (04.1) and must differ by ≥2 columns (04.2).

## Spacing

`--s-1` 4 · `--s-2` 8 · `--s-3` 12 · `--s-4` 16 · `--s-5` 20 · `--s-6` 24 · `--s-8` 32 · `--s-10` 40 ·
`--s-12` 48 · `--s-16` 64 · `--s-20` 80 · `--s-24` 96 · `--s-32` 128 · `--s-40` 160 · `--s-48` 192 ·
`--s-64` 256

Off-scale values are forbidden (04.5).

## Vertical rhythm

| Token | Mobile | Desktop | Register |
|---|---|---|---|
| `--rhythm-1` | 72 | 96 | Noise |
| `--rhythm-2` | 96 | 128 | Working |
| `--rhythm-3` | 128 | 176 | Resolving |
| `--rhythm-4` | 176 | 240 | Settled |

May only increase down the page (04.7).

---

## Geometry — the cut corner

`h = w · tan(30°) = 0.5774 · w` · top-right only.

| Token | `w` | `h` | Applies to |
|---|---|---|---|
| `--cut-1` | 12 | 7 | Tags, small controls, inline marks |
| `--cut-2` | 18 | 10 | Buttons, form fields, list rows |
| `--cut-3` | 28 | 16 | Panels, media frames, index rows |
| `--cut-4` | 48 | 28 | Large surfaces, feature frames |
| `--cut-5` | 88 | 51 | Full-bleed bands, chapter breaks |

`clip-path: polygon(0 0, calc(100% - {w}) 0, 100% {h}, 100% 100%, 0 100%)`

`border-radius` is **0** everywhere (05.1). Circles permitted only for portraits, status dots, avatars
(05.3). `clip-path` kills `box-shadow` — use `filter: drop-shadow()` on a wrapper (05.4). One cut per
surface; nested children revert to rectangles (05.5).

## Geometry — hairlines

| Token | Weight | Colour | Means |
|---|---|---|---|
| `--line-hair` | 1px | `--ink-7` | Separation within a group |
| `--line-bound` | 1px | `--ink-6` | Boundary between groups |
| `--line-struct` | 2px | `--ink-2` | Structural edge, chapter-level |

Rules run to the grid, not to the content (05.7).

## Geometry — hex bullet

`clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)`

| Token | Size | Use |
|---|---|---|
| `--bullet-s` | 8px | Inline |
| `--bullet-m` | 10px | List |
| `--bullet-l` | 14px | Feature list |

The only list marker in the system (05.8). `--ink-6` by default; `--honey-3` only when it is one of the
three permitted viewport marks.

---

## Surface materials

| Token | Ground | Edge | Elevation | Cut |
|---|---|---|---|---|
| `Paper` | `--paper` | none | `drop-shadow(0 1px 2px rgba(28,25,23,.05)) drop-shadow(0 12px 28px rgba(28,25,23,.09))` | `--cut-3` |
| `Inset` | `--ink-8` | none | none | `--cut-2` |
| `Ink` | `--ink-1` | none | none | `--cut-5` |
| `Line` | transparent | 1px `--ink-6` | none | `--cut-3` |

`Line` is the default; `Paper` must be earned (06.1). One elevation level per screen (06.2). `Ink`
appears once sitewide (06.3).

**Surfaces are opaque (06.5).** No `bg-*/NN`, no `backdrop-filter`. Sole exception: a full-screen modal
scrim at `--ink-1` / 55%.

**Colour is flat (02.13).** No gradients of any kind. Sole exceptions, both non-visible: `mask-image`
and the understructure falloff.

---

## Motion — curves

| Token | `cubic-bezier` | Used for |
|---|---|---|
| `--ease-settle` | `(0.16, 1, 0.30, 1)` | **Primary.** All arrivals. |
| `--ease-shift` | `(0.32, 0.72, 0.20, 1)` | Positional change |
| `--ease-reveal` | `(0.25, 0.60, 0.35, 1)` | Opacity, clip, mask |
| `--ease-press` | `(0.30, 0, 0.20, 1)` | Tactile feedback |
| `--ease-exit` | `(0.55, 0, 0.85, 0.35)` | Dismissal |
| `--ease-drive` | `linear` | Scrubbed sequences only |

## Motion — durations

| Token | ms | Used for |
|---|---|---|
| `--d-tap` | 90 | Press |
| `--d-quick` | 180 | Hover, focus |
| `--d-base` | 320 | Component state |
| `--d-settle` | 620 | Element arrival |
| `--d-long` | 1100 | Section-scale |
| `--d-monument` | 2400 | Wordmark, once per session |

Distance sets duration (07.1). Four verbs only: **settle · shift · reveal · hold** (07.2).

## Motion — choreography budget

| Register | Max simultaneously moving |
|---|---|
| Noise | 6 |
| Working | 4 |
| Resolving | 2 |
| Settled | 1 |

Adjacent sections may not share a scroll behaviour — scrubbed / triggered / static (07.4).

---

## Interaction — understructure

| Token | Value |
|---|---|
| `--under-radius` | 260px |
| `--under-opacity` | 0.09 |
| `--under-cell` | 84 × 150px |
| `--under-stroke` | 1px `--ink-6` |
| `--ux` / `--uy` | Pointer position, rAF-throttled, written on `:root` |

`mask-image: radial-gradient(circle var(--under-radius) at var(--ux) var(--uy), #000 0%, #000 30%, transparent 72%)`

Disabled below 1024px and on coarse pointers (08.2). The only cursor-driven effect in the system (08.4).

## Interaction — states

| State | Treatment | Timing |
|---|---|---|
| Default | Material per §06 | — |
| Hover | Ground shifts one ink step. **No movement, no shadow, no scale.** | `--d-quick` / `--ease-reveal` |
| Press | Ground shifts one further step + 1px optical inset | `--d-tap` / `--ease-press` |
| Focus-visible | 2px `--honey-5` outline, 3px offset. `--honey-2` on `Ink`. | `--d-quick` |
| Disabled | `--ink-5` foreground, no ground, `cursor: not-allowed` | — |

All five states are required on every interactive element (08.5). Target floor **44 × 44px** (08.8).
Total pinned scroll distance sitewide ≤ **250vh** (08.11).
