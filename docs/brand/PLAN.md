> **Provenance.** This is the approved plan for the Hivecrest redesign, presented and accepted on
> 2026-07-31. It is recovered from the session transcript and preserved here as a historical record.
> Where it disagrees with the delivered documents, the delivered documents win — see
> [`DECISIONS.md`](./DECISIONS.md) for the choices as actually locked. Note that section numbering
> shifted during writing (plan §05/§06/§07 → bible §02/§03/§06).

---

# Hivecrest Design System & Brand Bible

## Context

Hivecrest Technologies' current site (`C:\Users\ELCOT\Desktop\HIVE\hivecrest`) is well-built but visually
undifferentiated. The diagnosis from this session's audit: the problem is **uniformity**, not taste. One
section archetype (`src/components/ui/SectionHeading.tsx`) opens six sections; one surface treatment
(`.card-surface` in `src/app/globals.css:52` — the code comment literally says *"the one surface treatment
sitewide"*); one motion (`opacity:0, y:32-48, power3.out` repeated across five components); one accent
applied to every semantic element; and near-universal centered composition.

We have agreed a creative direction — **THE SETTLED STATE** — built on the observation that Hivecrest's
own copy measures value in *working days*, not launches ("six months after we hand it over, is anyone
still using it?"). The site opens in noise and resolves into quiet, decrescendo-ing as it descends.

This plan produces the **single source of truth** that every future page decision references. No page
design happens until it exists and is approved. The Hero section is the first thing designed against it.

**Outcome:** a versioned brand bible plus a live specimen page, concrete enough that a designer or
engineer can build a new section without asking a question, and specific enough that *"does this belong
in Hivecrest?"* has an objective answer.

---

## Locked decisions

| Decision | Choice | Consequence |
|---|---|---|
| **Typography** | **Keep Inter + Space Grotesk.** Not changing primary faces. | §05 becomes a *discipline* spec — hierarchy, scale, weight, tracking, measure — on the faces already installed. Every rule is written against a token, never a font name, so a future face swap is a one-line change and not a rewrite. |
| **Monospace** | **Deferred, additive.** | A token slot and a usage spec are reserved for a technical/metadata voice. Nothing in the system depends on it. Switched on later as a pure addition. |
| **Wordmark** | **Custom-drawn**, on the hex construction grid. | The one place typography is truly ownable. Becomes a real §03 deliverable, replacing the current 14 KB raster PNG. Differentiation comes from here plus layout, motion and interaction — not from licensed faces. |
| **Licensing** | **Free faces only** for all running text. | No commercial licences, no tracking, no cost. Inter and Space Grotesk already qualify. |
| **Cut corner** | **Single ~14px clip, 30°, top-right.** | The form signature. Applies universally, chip through full-bleed band. Cascades into §07, §08, §13, §14. |
| **Deliverable** | **Markdown + rendered specimen page.** | The specimen is a validation lab, explicitly *not* site design. Hard constraint below. |

### Where the differentiation now sits

Per your read — and I agree — the weakness is repeated layouts, centered composition, identical
animations, and no interaction language. So the document is weighted accordingly. Four sections carry
the load and get the most depth:

**§06 Composition & grid · §09 Motion · §10 Interaction · §14 Section archetypes.**

Colour, typography and surface are supporting systems, specified rigorously but not asked to be the
thing anyone remembers.

---

## Deliverables

| File | Purpose |
|---|---|
| `docs/brand/BRAND-BIBLE.md` | The document. All 16 sections below. Every rule states *what*, *why*, and *the failure case it prevents*. |
| `docs/brand/tokens.md` | Flat reference: token name → value → allowed usage. The lookup table you keep open while building. |
| `docs/brand/DECISIONS.md` | Decision log — each locked choice, its reasoning, and what was rejected. Stops settled questions being re-litigated in month three. |
| `docs/brand/specimen.html` | The living design system. Self-contained, opens by double-clicking. |

**Specimen page constraints** (from your brief, treated as hard rules):
- It is a laboratory, not a website. No hero, no page layouts, no site sections, no navigation.
- It must not resemble the finished site. Presented as a spec sheet — labelled, measured, annotated.
- Standalone HTML in `docs/brand/`, deliberately **outside** the Next.js app so it can never ship to
  production or be mistaken for a page. No build step, no route, no `out/` entry.
- Shows what markdown cannot: live colour swatches with measured contrast ratios, the type ramp in the
  real faces at real sizes, the cut corner rendered at every scale, spacing and grid rulers, motion
  curves you can actually watch and re-trigger, and every component state side by side.

**Not in scope:** no changes to `globals.css`, no component edits, no Hero design. Token names and
values are *specified* in the document; wiring them into `@theme` is a separate, later step.

---

## Document structure

### Part I — Foundation

**01. The thesis.** THE SETTLED STATE in one paragraph. The five design laws — design the sixth month
not the launch / every visible line is load-bearing / mass not magic / one loud thing per screen /
nothing centered unless it is a monument. Each law paired with a "this is what violating it looks like"
example drawn from the current site.

**02. Voice.** The existing copy voice is the strongest asset on the site and needs codifying before it
erodes. Sentence-length rules, the anti-hype banned list (*seamless, cutting-edge, empower, revolutionize*),
the "state, don't sell" principle, capitalisation law, and how the voice governs microcopy.

**03. Wordmark & logo.** The custom HIVECREST wordmark: construction grid, the 30° chamfer language
shared with the cut corner, letterform decisions, and the geometric rationale. Lockups (primary,
horizontal, mark-only, single-colour, reverse), clear space expressed in hex units, minimum sizes,
misuse gallery. Delivered as SVG. Includes the rule that the letter-assembly animation
(`PremiumHero.tsx:129-142`) fires **once per session and nowhere else**.

### Part II — The systems

**04. Colour.** Three-layer architecture (primitive → semantic → component).
- The **ivory temperature scale** — five values from cool/early to warm/settled, mapped to scroll depth,
  with rules for which section gets which.
- The **ink scale** (currently one charcoal doing every job).
- **Honey as a marking tool, not a theme** — with a hard *honey budget*: a stated maximum number of honey
  elements per viewport, and an exclusive list of what is permitted to be honey. Directly reverses the
  current everything-is-a-honey-pill pattern.
- **One cold accent** (slate ink), so warmth has something to be warm against.
- Warm-shifted **semantic status colours**, replacing the off-palette raw Tailwind `red-400/red-600` in
  `ContactSection.tsx:166`.
- A **contrast matrix** — every approved foreground/background pair with its *measured* ratio and AA/AAA
  verdict. Pairs not in the matrix are not allowed. Flags the existing `honey-700`-on-white risk.

**05. Typographic discipline.** Built on Inter + Space Grotesk as installed.
- Full fluid ramp with `clamp()` values, micro-label through monument — with far wider size contrast than
  the current `text-4xl`/`text-6xl` ceiling.
- A **weight whitelist** per face; unlisted weights are forbidden.
- Tracking rules by size, measure rules by role, and the enforcement mechanism for **one loud thing per
  screen**.
- **Numerals as architecture** — how `01–04` and similar are set and scaled.
- Reserved slot and usage spec for the deferred monospace voice.
- Explicit note: every rule references a role token (`--font-display`, `--font-text`), never a face name.

**06. Composition & grid.** *Load-bearing section.* The fix for centered sameness.
- Base unit and full spatial scale.
- The **half-offset comb grid**: content shifting a half-column per section to create a brick rag down
  the page, specified as concrete column counts and offsets per breakpoint.
- The **asymmetry law** — the permitted alignment set, and the two moments in the entire site where true
  centering is allowed.
- **Vertical rhythm scale** replacing the uniform `py-14 md:py-20` currently on every section, so section
  density itself carries the decrescendo.
- Container widths, breakpoints, and how the grid degrades on mobile without collapsing to a stack of
  centered blocks.

**07. Geometry & form language.** The **cut corner**: 14px, 30°, top-right, with the size ramp defining
how the clip scales from a 24px chip to a full-bleed band, the mobile floor, and the exhaustive list of
exceptions (when a shape may still be a circle or a plain rectangle). Hairline weights and their
meanings. The hex bullet promoted from one-off to system glyph.

**08. Surface & material.** Replaces the single `.card-surface` with a small **materials system** —
named surfaces (paper / inset / ink / hairline-only), each with its own shadow spec, border rule and
permitted contents. Includes the law that a surface must be justified by hierarchy rather than used as
default packaging — the fix for "everything is a white rounded rect".

### Part III — Behaviour

**09. Motion.** *Load-bearing section.* Written as physics, not effects.
- Easing curves and duration bands, with the settle-tail character derived from the existing wordmark
  animation, which already has the right physics.
- The vocabulary — **settle, shift, reveal, hold** — and the banned list: translate-Y fades, bounce,
  overshoot, pop, anything a physical object could not do.
- The **rhythm rule**: adjacent sections may not share a scroll behaviour. Scrubbed and static alternate.
- Choreography budgets — how many things may move at once, and how that budget shrinks as the page descends.
- The `prefers-reduced-motion` contract, including the note that because this direction resolves *to* a
  settled state, the reduced-motion fallback is the correct final frame by definition.

**10. Interaction philosophy.** *Load-bearing section.* The missing interaction language.
- **The understructure** — pointer-revealed load-bearing grid beneath surfaces, the literal expression of
  "the digital backbone your business grows on." Full spec: reveal shape, falloff, performance budget,
  and the touch / no-pointer fallback.
- Hover, press and focus contracts for every interactive class, with `:focus-visible` treated as a
  designed state rather than a browser default.
- The scroll contract — what scroll is allowed to drive and what it may never drive.
- Accessibility floor: target sizes, focus order, motion, contrast.

**11. Iconography.** A hex-grid-derived icon system: construction grid, stroke weight, terminals, corner
treatment (inheriting the 30° language), the permitted size set, and the rule governing when a stock
`lucide` icon is acceptable versus when a custom mark is required. Stops the current mix of lucide plus
ad-hoc inline SVGs (`VisionMission.tsx:114-129`) drifting further apart.

**12. Photography & imagery.** The **grade spec** — the duotone/tritone treatment every image is pulled
through so photographs belong to the brand instead of sitting on top of it. Subject rules, crop rules,
and an explicit forbidden list (generic stock: headsets, handshakes, abstract blue circuitry — which is
exactly what `ai_telecalling.jpg`, `CRM_software.jpg` and `web_service.jpg` currently are). The
"photograph the sixth month, not the launch" principle. Video rules including a hard weight ceiling —
the current About video is a 13 MB file named `travel_vlog_video.mp4`.

### Part IV — Application

**13. Component catalogue.** Every component with anatomy, all states (default / hover / press / focus /
disabled / loading / error), sizing, and the rule for when to use it. Covers buttons (three tiers),
links, chips and tags (deliberately demoted from their current omnipresence), form fields, **index rows**
(the specimen-sheet pattern that replaces cards), spec tables, section openers (now a *set* of archetypes
rather than one component), navigation, the hairline credential strip, and statement blocks.

**14. Section archetypes.** *Load-bearing section.* The direct fix for six identical sections. Defines
the allowed section formats — each with its own composition, density, motion behaviour and interaction
identity — plus the governing law: **no two adjacent sections may share an archetype.** Includes the
archetype-to-narrative map showing how the set produces the noise-to-quiet arc.

**15. Do / Don't.** A gallery of the specific failure modes this system exists to prevent, drawn from
real patterns in the current codebase.

**16. Token reference.** Complete naming scheme and every token, ready to transcribe into `@theme` when
implementation begins.

---

## Verification

The deliverable is a document plus a spec page, so verification is editorial and visual rather than
executable:

1. **Coverage test** — take five existing components (`PremiumHero`, `SolutionsSection`,
   `OurAchievements`, `ContactSection`, `FooterGlow`) and confirm every visual decision in each is either
   specified by the bible or explicitly forbidden by it. Gaps mean the document is incomplete.
2. **Contrast audit** — every pair in the §04 matrix computed and recorded, not estimated. No pair ships
   without a measured ratio. Verified visually on the specimen page.
3. **Specimen review** — open `docs/brand/specimen.html` and confirm the ivory temperature scale reads as
   progression, the cut corner holds up from 24px to full-bleed, the motion curves feel like mass rather
   than easing presets, and the type ramp has genuine contrast. These are judgement calls that can only
   be made by looking.
4. **The Hero test** — the real proof. Design the Hero referencing only the bible. Any question that
   requires asking a human is a hole in the document, patched before proceeding.
5. **Ambiguity sweep** — no rule may contain "generally", "usually", or "as appropriate". Every rule is
   testable, or it is not a rule.
