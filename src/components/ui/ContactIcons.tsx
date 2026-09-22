import React from "react";
import { CONTACT_EMAIL, CONTACT_PHONE, MAILTO, SOCIAL_LINKS, TEL_HREF } from "@/lib/site";
import {
  EnvelopeIcon,
  PhoneIcon,
  XIcon,
  LinkedInIcon,
  InstagramIcon,
} from "@/components/ui/BrandIcons";

const BRAND_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  X: XIcon,
  LinkedIn: LinkedInIcon,
  Instagram: InstagramIcon,
};

/* Every mark gets the same treatment: an ink glyph in a cut square. 44px, the
   target floor from Rule 08.8.
   Rule 05.3 — a social mark is not a portrait, a status dot or an avatar, so
   it does not get to stay a circle.
   Rule 02.7 — a social icon is not on the honey list, so the hover is a
   one-step ground shift in ink rather than a colour change to gold. */
const CIRCLE =
  "state w-11 h-11 cut-1 border border-ink-6 flex items-center justify-center " +
  "text-ink-3 hover:bg-honey-1 hover:text-honey-6 hover:border-honey-4";
const GLYPH = "w-[19px] h-[19px]";

/**
 * Footer contact row: email plus social marks, all identical — black icon in a
 * circle, honey yellow on hover.
 *
 * Profiles without a URL yet render as non-navigating spans (styled the same,
 * so nothing shifts later) rather than linking nowhere. Add the URL in
 * lib/site.ts and it becomes a live link with no visual change.
 */
export default function ContactIcons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Phone first. Of the marks in this row it is the one that reaches a
          person the same minute, and the footer is where someone scrolls when
          they have finished reading and want to act. */}
      <a
        href={TEL_HREF}
        /* Spaced so it is read as digits rather than as one long number. */
        aria-label={`Call us on ${CONTACT_PHONE.split("").join(" ")}`}
        title={CONTACT_PHONE}
        className={CIRCLE}
      >
        <PhoneIcon className={GLYPH} />
      </a>

      <a
        href={MAILTO}
        aria-label={`Email us at ${CONTACT_EMAIL}`}
        title={CONTACT_EMAIL}
        className={CIRCLE}
      >
        <EnvelopeIcon className={GLYPH} />
      </a>

      {SOCIAL_LINKS.map(({ name, href }) => {
        const Icon = BRAND_ICONS[name];
        if (!Icon) return null;

        return href ? (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Hivecrest on ${name}`}
            title={name}
            className={CIRCLE}
          >
            <Icon className={GLYPH} />
          </a>
        ) : (
          <span
            key={name}
            aria-label={`${name} (coming soon)`}
            title={`${name} (coming soon)`}
            className={`${CIRCLE} cursor-default`}
          >
            <Icon className={GLYPH} />
          </span>
        );
      })}
    </div>
  );
}
