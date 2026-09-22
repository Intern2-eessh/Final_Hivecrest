/**
 * The services and platforms, in one place.
 *
 * Order and wording follow the company brochure (Company Brochure PDF): the
 * two AI platforms it leads with — CRM Platform, Video Analytics Platform.
 * The GJ Global dealership portfolio lives in lib/portfolio.ts, not here:
 * those are partner products the company resells, not services it engineers.
 *
 * Before this file existed the same offerings were named in three components
 * with three different wordings. Everything that lists, links to, or renders
 * a service reads from here. The `slug` is the route segment, so adding a
 * service creates its page.
 */

export interface Service {
  /** Two-digit index. Rendered as architecture (bible rule 03.2), not decoration. */
  id: string;
  /** Route segment under /services. */
  slug: string;
  title: string;
  tagline: string;
  image: string;
  /** Short capability tags shown on the overview row. */
  chips: string[];
  overview: string;
  includes: string[];
  stack: string[];
  /** The measured claim. One sentence, no hedging. */
  outcome: string;
  /** Search-facing summary for the service page's own meta description. */
  metaDescription: string;
}

export const SERVICES: Service[] = [
  {
    id: "01",
    slug: "crm-platform",
    title: "CRM Platform",
    tagline: "Turn conversations into actionable intelligence.",
    image: "/assets/ai_telecalling.webp",
    chips: ["Transcription", "Conversation analysis", "Call classification"],
    overview:
      "Our AI-powered call intelligence platform analyzes customer conversations and converts them into structured business insights.",
    includes: [
      "AI-powered transcription",
      "Tone & conversation analysis",
      "Automatic call classification",
      "Repeat-call identification",
      "Conversation intelligence",
      "Performance & coaching reports",
    ],
    stack: ["Telephony API", "Speech-to-text", "LLM intent engine", "Webhooks"],
    outcome: "Understand conversations. Identify patterns. Improve customer interactions.",
    metaDescription:
      "The Hivecrest CRM Platform analyzes customer conversations with AI-powered transcription, tone analysis, call classification and coaching reports, turning calls into actionable intelligence.",
  },
  {
    id: "02",
    slug: "ai-video-analytics",
    title: "Video Analytics Platform",
    tagline: "Transform CCTV into intelligent monitoring.",
    image: "/assets/video_analytics.webp",
    chips: ["Event detection", "Behaviour analysis", "Intelligent alerts"],
    overview:
      "Our AI-powered video analytics platform enables organizations to use existing camera infrastructure for intelligent, real-time monitoring.",
    includes: [
      "Real-time event detection",
      "Behaviour analysis",
      "Intelligent alerts",
      "Safety monitoring",
      "Automated surveillance",
      "Operational monitoring",
    ],
    stack: ["CCTV camera feeds", "Computer vision", "Event detection", "Real-time alerts"],
    outcome: "Monitor intelligently. Detect faster. Respond effectively.",
    metaDescription:
      "The Hivecrest Video Analytics Platform turns existing CCTV infrastructure into intelligent real-time monitoring, with event detection, behaviour analysis and intelligent alerts.",
  },
];

/** Route path for a service page. */
export const servicePath = (slug: string) => `/services/${slug}`;

/** The contact form's dropdown, generated so it can never drift from the list. */
export const SERVICE_OPTIONS = [...SERVICES.map((s) => s.title), "Not sure yet"];
