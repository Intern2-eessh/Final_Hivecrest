/**
 * Site-wide constants. Anything that appears in more than one component belongs
 * here, so a value can never be updated in one place and missed in another.
 */

export const CONTACT_EMAIL = "hivecrest.technologies@gmail.com";
export const MAILTO = `mailto:${CONTACT_EMAIL}`;

/**
 * The phone number, in the two forms it has to exist in.
 *
 * `CONTACT_PHONE` is what a person reads: grouped 5-5 the way an Indian mobile
 * is written and said aloud. `TEL_HREF` is what a phone dials — E.164, no
 * spaces, country code included. They are separate because a `tel:` href
 * containing spaces is parsed inconsistently across dialers, and a display
 * string written as +919976784292 is unreadable.
 *
 * The country code is not optional in either. Without it the number only works
 * for a caller already in India, and `schema.org` `telephone` is specified as
 * E.164 — Google will not surface a call button for anything else.
 */
export const CONTACT_PHONE = "+91 99767 84292";
export const TEL_HREF = "tel:+919976784292";

/**
 * Second line from the company profile. Same display/dial split as above.
 * Listed first in the profile, so it renders first wherever both appear.
 */
export const CONTACT_PHONE_2 = "+91 96882 22555";
export const TEL_HREF_2 = "tel:+919688222555";

/**
 * Canonical origin. Every share crawler — Facebook, X, LinkedIn, WhatsApp,
 * Slack — rejects a relative `og:image`, so the origin has to be absolute and
 * reachable or the link preview stays blank. `metadataBase` in app/layout.tsx
 * uses this to make every metadata URL absolute.
 *
 * This is the live custom domain, not the deploy host. It was
 * `hivecrest.workers.dev` — the pre-domain Cloudflare hostname — long after
 * `hivecrest.tech` went live and `hivecrest.workers.dev` stopped resolving at
 * all. Every canonical tag, every `og:url`, every sitemap entry, the
 * `robots.txt` host line and the `logo`/`Offer` URLs in the Organization schema
 * are built from this one constant, so all of them were pointing search engines
 * and share crawlers at a host with no DNS record: the site was asking to be
 * de-indexed, and every WhatsApp/LinkedIn/Slack link preview came back blank
 * because `og:image` resolved to nothing.
 *
 * Hardcoded to the real domain rather than left to an env var. A default that
 * is only correct when someone remembers to set NEXT_PUBLIC_SITE_URL at deploy
 * time is how the wrong host shipped in the first place. The override is kept
 * for preview builds.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://hivecrest.tech";

export const SITE_NAME = "HIVECREST";
export const SITE_EYEBROW = "Next-Gen Software Services";

/**
 * The home page `<title>`.
 *
 * Separate from SITE_NAME because the two are read by different audiences. The
 * home page title was the bare word "HIVECREST", which only finds people who
 * already know the company exists — it names no service and no place, so there
 * is nothing for anyone searching "AI calling company Coimbatore" to match. The
 * inner pages already carry "About | HIVECREST", "AI Tele-Calling | HIVECREST"
 * and so on; this is the one page that was left with only the brand.
 *
 * Brand first because that is what a returning visitor scans a tab strip for.
 * Kept under 60 characters so Google renders it whole rather than truncating.
 */
export const SITE_TITLE =
  "HIVECREST | CRM Platform, AI Video Analytics";

/**
 * The share-card headline, pre-split at the line break the card uses. The
 * emphasised word is the one honey mark on the card (brand bible rule 02.7 —
 * "the single most important word on a screen"), so it is stored separately
 * rather than being pattern-matched out of a sentence at render time.
 */
export const SITE_TAGLINE = {
  before: "The digital",
  mark: "backbone",
  after: "your business grows on.",
};

export const SITE_DESCRIPTION =
  "AI-powered CRM and Video Analytics platforms. Built around the way your team actually works.";

/** Credentials line. Kept short enough to stay on one line at 1200px wide.
    Wording per the company profile: "Recognised by StartupTN", "DPIIT
    Certified Startup", "Incubated at iTNT" — exactly those forms. */
export const SITE_CREDENTIALS =
  "RECOGNISED BY STARTUPTN · DPIIT CERTIFIED STARTUP · INCUBATED AT iTNT";

/**
 * Order must match the order the sections actually appear in on the page
 * (see app/page.tsx): About -> Vision -> Notables -> Solution -> Founder's Desk.
 * If a section is reordered there, reorder it here too.
 */
export const NAV_ITEMS = [
  { label: "ABOUT US", id: "about", href: "/#about" },
  { label: "VISION & MISSION", id: "vision", href: "/#vision" },
  { label: "NOTABLES", id: "achievements", href: "/#achievements" },
  { label: "SOLUTION", id: "solution", href: "/#solution" },
  { label: "PORTFOLIO", id: "portfolio", href: "/#portfolio" },
  { label: "FOUNDER'S DESK", id: "founders", href: "/#founders" },
  /* `/#contact`, not `/contact`. Every other item in this nav scrolls to a
     section and the scrollspy highlights it on the way past; this one alone
     navigated away to a standalone page, so the highlight it had just earned
     went blank the moment you acted on it. The nav is now six section links
     that behave identically. `/contact` is still a real page — the footer
     links to it and search engines index it — it is just no longer the thing
     the section nav points at. */
  { label: "CONTACT", id: "contact", href: "/#contact" },
];

/**
 * Registered entity details. Required for the Organization schema, the footer
 * base, and Google Business Profile verification — all of which need a
 * crawlable name-address block rather than a form.
 *
 * TODO(founder): CIN still needs supplying. It is deliberately left null
 * rather than filled with a placeholder: a wrong CIN in structured data is
 * worse than an absent one.
 *
 * Address is the registered address from the company profile:
 * 176/2A, Kumarapalayam, Namakkal-638007.
 */
export const COMPANY = {
  legalName: "Hivecrest Technologies Private Limited",
  cin: null as string | null,
  street: "176/2A, Kumarapalayam" as string | null,
  locality: "Namakkal",
  postalCode: "638007",
  region: "Tamil Nadu",
  country: "IN",
  founded: "2020",
};

/** The one-line display form of the registered address, as the profile writes it. */
export const COMPANY_ADDRESS = "176/2A, Kumarapalayam, Namakkal-638007";

/**
 * Every route the site publishes. The sitemap and the footer both read this,
 * so a page cannot exist without being linked or be linked without existing —
 * which is how twelve dead footer links happened last time.
 */
export const ROUTES = {
  home: "/",
  about: "/about",
  founder: "/founder",
  contact: "/contact",
  privacy: "/privacy",
  terms: "/terms",
} as const;

/**
 * Where "Start a Project" goes.
 *
 * The home page's own contact section, NOT the standalone `/contact` route.
 *
 * `/contact` is a real page and stays one — it carries its own title, canonical
 * URL and LocalBusiness schema, and people land on it from search. But it is
 * 527px tall: a form and a footer with nothing above them. Sending someone
 * there from the middle of the home page ends the visit. There is nothing to
 * scroll back up to, the section nav has no sections to track so it goes blank,
 * and the only way back into the site is the nav bar. It reads as the page
 * having locked up, which is exactly what it was reported as.
 *
 * `/#contact` puts the visitor on the same form, in place, with Founder's Desk,
 * Solutions, Notables, Vision and About still above them and the footer still
 * below. From another route it loads the home page and scrolls there —
 * SmoothScroll honours the hash on arrival.
 */
export const START_PROJECT_HREF = "/#contact";

/**
 * The Employee Management System's own login page.
 *
 * A URL, not a form. This site is `output: "export"` — a folder of static files
 * on Cloudflare with no server, no session store and no way to verify a
 * password. A username/password form here could only hand the credentials to
 * some other origin over CORS, which means the marketing site's JavaScript
 * would be handling staff passwords for no benefit: every bug, dependency and
 * cache header on the public site would sit in the path of a login it cannot
 * actually perform. Sending employees to the EMS's own login page keeps
 * passwords, sessions and cookies entirely inside the system that owns them.
 *
 * `null` until the EMS is reachable. The footer renders the entry either way —
 * live and clickable with a URL, muted and non-navigating without one — so
 * nothing ever links to a dead page. Paste the URL below (or set
 * NEXT_PUBLIC_EMS_URL at build time) and it goes live with no other change.
 *
 * Must be https. A login page reached over http exposes the password on the
 * wire, and browsers will warn on the form.
 */
export const EMPLOYEE_LOGIN_URL: string | null =
  process.env.NEXT_PUBLIC_EMS_URL ?? null;

/**
 * The EMS endpoint the footer login dialog POSTs `{ username, password }` to.
 *
 * `null` until the EMS exposes one. With no endpoint the dialog still opens and
 * still validates, but it says plainly that sign-in is not connected — it never
 * reports a success it did not get, and there is no credential of any kind in
 * the client bundle. A password check written in JavaScript that ships to the
 * browser is not a login; anyone can read it in devtools.
 *
 * Requirements on the endpoint:
 *   · https, always. A password sent over http is readable in transit.
 *   · `Access-Control-Allow-Origin` for this site's origin, plus
 *     `Access-Control-Allow-Credentials: true` if it sets a session cookie.
 *   · 2xx on success, optionally `{ "redirect": "https://..." }` to choose
 *     where the employee lands; otherwise EMPLOYEE_LOGIN_URL is used.
 *   · 401 (or 403) on bad credentials.
 *   · Rate limiting and lockout on its own side. Nothing on a static site can
 *     throttle a login attempt — the browser is the attacker's own machine.
 */
export const EMPLOYEE_LOGIN_ENDPOINT: string | null =
  process.env.NEXT_PUBLIC_EMS_LOGIN_ENDPOINT ?? null;

/**
 * Social profiles. `href: null` means the account does not exist yet — the icon
 * still renders (greyed out, not clickable) so nothing links to a dead page.
 * To switch one on, paste the profile URL in place of null. That is the only
 * change needed; the UI turns it into a working link automatically.
 */
export const SOCIAL_LINKS: { name: string; href: string | null }[] = [
  { name: "X", href: null },
  { name: "LinkedIn", href: null },
  { name: "Instagram", href: null },
];
