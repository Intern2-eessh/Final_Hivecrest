# Hivecrest site — outstanding issues

Reviewed 2026-08-05 against the running site at 1440px and 390px, with the
production build. Ranked by what actually costs you enquiries.

---

## 1. There is no proof on the site — highest impact

Verified by inventory of the rendered page: **zero client names, zero case
studies, zero testimonials, zero numbers.** The site argues that Hivecrest
builds software people still use six months later, and then shows nothing
anyone has used.

The founder's line — *"I judge our work by one question. Six months after we
hand it over, is anyone still using it?"* — is the strongest sentence on the
site, and it is immediately followed by no evidence that the answer is yes.

One anonymised case study would do more than every other item in this file
combined. No client permission needed if anonymised, no logo needed:

> A distributor in Coimbatore, 40 staff. Orders lived in three spreadsheets and
> a WhatsApp group. We replaced it with one system in nine weeks. Fourteen
> months later they still run every morning on it.

**Where:** a new section on the home page between Solutions and Founder's Desk,
and a short version on each service page.

---

## 2. The contact form does not send anything — you are losing leads now

`NEXT_PUBLIC_CONTACT_ENDPOINT` is unset, so `ContactSection.tsx` falls back to
`openMailFallback()` — "Send enquiry" builds a `mailto:` and hands off to the
visitor's mail client.

On a phone with no mail app configured, or a desktop using webmail, **nothing
happens and the enquiry is lost silently.** The form looks completely real,
which makes it worse than having no form.

**Fix:** sign up for Formspree, Web3Forms or a small Cloudflare Worker, then set
`NEXT_PUBLIC_CONTACT_ENDPOINT` in `.env.local`. The POST path is already written
and handles success, failure and network errors — it just needs the URL.

**Effort:** ~20 minutes. Do this one first.

---

## 3. Imagery is AI-generated and it shows — DEFERRED

*Deferred by the founder 2026-08-05: no photographs of real product work are
available yet. Recorded here so it is not forgotten.*

Several images have garbled text baked into them, which is the giveaway of an
AI-generated source and reads to a visitor as "this company does not check its
own work":

| file | problem |
|---|---|
| `vision_new.webp` | glowing globe with nonsense text rendered into it — reads **"ENOIR DATA STEVES"** |
| `mission_new.webp` | fake dashboard collage, labels repeat and misspell ("Coloriaen Q1 campaign") |
| `mail_service.webp` | USPS-style postal trucks and a robot shaking hands with a businessman — on the **Domain & Hosting** page |
| `ai_telecalling.webp` | robot head beside a headset operator — the exact stock cliché |
| `CRM_software.webp`, `web_service.webp` | generic abstract blue circuitry |

The brand bible already names these: *"generic stock: headsets, handshakes,
abstract blue circuitry — which is exactly what `ai_telecalling.jpg`,
`CRM_software.jpg` and `web_service.jpg` currently are."* (`docs/brand/PLAN.md`)

**Fix when possible:** real screenshots of actual delivered software, blurred or
anonymised where needed. A blurred real dashboard beats a sharp fake one.
Failing that, drop the images entirely — the layout holds without them.

---

## 4. Three dead social icons

`SOCIAL_LINKS` in `src/lib/site.ts` has X, LinkedIn and Instagram all set to
`null`, so the footer renders three greyed icons labelled "coming soon".
Advertising that you have no social presence is worse than showing no icons.

For a B2B services company **no LinkedIn is a trust question** — procurement
teams check it before they reply.

**Fix:** create the LinkedIn company page and paste the URL into `SOCIAL_LINKS`,
or remove the entries until the accounts exist. Either is one line.

---

## 5. Company registration details are missing

`COMPANY.cin` and `COMPANY.street` are both `null` in `src/lib/site.ts`, with a
`TODO(founder)` against them. They are deliberately not guessed — wrong
structured data is worse than absent structured data.

For an Indian Pvt Ltd the CIN on the website is a compliance expectation, and
procurement teams look for a registered address. The `LocalBusiness` schema on
`/contact` is also incomplete without them.

**Fix:** supply both, they drop straight into the existing schema.

---

## 6. The About video is 12.6 MB

`public/assets/travel_vlog_video.mp4` is 12.6 MB of generic gold 3D logo
animation. It no longer blocks page load — it is lazy-mounted only when the
section approaches the viewport — but it is still the entire remaining payload
of the site, on a company whose own copy promises to build for "patchy
connections and low-cost Android phones".

**Fix:**

```
ffmpeg -i public/assets/travel_vlog_video.mp4 -vf scale=1280:-2 \
  -c:v libx264 -crf 28 -preset slow -an -movflags +faststart \
  public/assets/about.mp4
```

Should land at 1–1.5 MB with no visible difference at the size it renders.

---

## 7. Unreferenced assets are being deployed

`public/assets/` ships to Cloudflare in full. Nothing in the code references
these:

| file | size |
|---|---|
| `ai_transcribe.png` | 5.0 MB |
| `hivecrest_promo_video.mp4` | 2.5 MB |
| `Robotic_arms_in_manufacturing_plant_202607111059.mp4` | 2.4 MB |
| `sentiment_analysis.jpeg` | 174 KB |
| `vision-real.webp`, `mission-real.webp` | 226 KB |
| `psg.png`, `hivecrest_logo_loading.png`, `startuptn-logo.png` | 104 KB |

Plus the original PNG/JPEG sources superseded by the WebP versions (~5 MB).
Roughly **15 MB of dead weight** in the deploy.

**Fix:** delete once you have confirmed none are wanted. Left in place because
they are your assets, not mine to remove.

---

## 8. The logo is a 174×121 raster PNG

`public/assets/Hivecrest_Logo.png` cannot scale, cannot be recoloured and is
soft on a retina display. Decision **D-004** in `docs/brand/DECISIONS.md`
already calls for an SVG wordmark to replace it.

**Fix:** redraw as SVG. Low urgency — it renders at 36–48px, where the softness
is barely visible.

---

## 9. Dead code carrying a duplicate anchor id

`src/components/ui/hero-section.tsx` is imported by nothing, and it contains a
second `id="solution"`. Harmless today. If anyone ever imports it,
`document.querySelector("#solution")` returns it instead of the real Solutions
section and the hero's "Explore Solutions" button silently breaks.

`search-bar.tsx` (378 lines) is also dead and is the only remaining reason
`framer-motion` is a dependency. `progressive-blur.tsx` and
`timeline-animation.tsx` are dead through `hero-section.tsx`.

**Fix:** delete all four, then `npm uninstall framer-motion`.

---

## Suggested order

| | effort | impact |
|---|---|---|
| 2 — wire the contact form | 20 min | **highest, you are losing leads today** |
| 1 — one case study | half a day of writing | **highest** |
| 4 — LinkedIn page, or remove icons | 5 min | medium |
| 5 — CIN and address | 15 min | medium |
| 6 — compress the video | 10 min | medium |
| 7 — delete unused assets | 10 min | low |
| 3 — replace imagery | blocked, no source material | high when unblocked |
| 8, 9 — SVG logo, dead code | an hour | low |

---

## Already fixed (2026-08-05)

- Understructure hex grid was pinning the main thread — a 63–186ms long task on
  every frame the mouse moved. Now compositor-only: **zero** long tasks.
- 12.6 MB autoplay video delayed `window.load`, which triggered GSAP's
  refresh-on-load mid-scroll and reset the page — this was the "Explore
  Solutions goes to About Us" bug. Video is now lazy-mounted.
- Images re-encoded to WebP: **5.0 MB → 654 KB**.
- `.elevate` drop-shadow removed from the playing video (a CSS filter over video
  re-rasterises every decoded frame).
- `seat-offset` / `seat-inset` were putting body copy in columns 6–12 and 3–9,
  leaving a 556px empty column on `/privacy`, `/terms`, `/about` and every
  service page. All reading content now shares one left edge.
- Solutions section header realigned with the rows below it.
- "Start a Project" pointed at `mailto:` in the hero and was absent from the
  mobile menu entirely. All six now go to `/contact`.
- Stale service worker unregistered on load (`GET /sw.js 404` in the dev log
  showed one registered on localhost:3000 from an earlier project).
- Favicon replaced — was the 174×121 non-square logo in a square slot.
