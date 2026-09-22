import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
  /**
   * The heading element to render. `h2` everywhere by default, because a
   * section opener sits under the page's own `h1`.
   *
   * `h1` exists for the one case where a shared section IS the page: /contact
   * renders `ContactSection` as its entire body, and with a hardcoded `h2` that
   * route shipped with no `h1` at all. A document whose outline starts at h2
   * gives a screen-reader user nothing to jump to and gives a crawler no
   * primary heading for the page.
   *
   * Styling is unchanged either way — `t-h1`/`t-h2` are type scales, and the
   * opener's size is a function of its position on the page, not of its level
   * in the outline.
   */
  as?: "h1" | "h2";
}

/**
 * The section opener.
 *
 * Rule 03.8 — labels are not chips. The eyebrow is bare text preceded by a
 * 24px hairline in `ink-6`. The rounded honey pill with a dot that used to
 * live here spent one of the three honey marks per viewport (02.6) on a label,
 * which is not on the permitted list (02.7), and used a `rounded-full` shape
 * that Rule 05.3 reserves for portraits, status dots and avatars.
 *
 * Rule 03.7 — this label is the only place uppercase is permitted sitewide.
 *
 * The bible replaces this single opener with a *set* of archetypes; until that
 * section is written this stays the shared default.
 */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  // Law 5 — nothing is centered unless it is a monument, and centering has a
  // budget of two uses sitewide. Section openers take a seat on the comb grid
  // instead, so left is the default and `center` has to be asked for.
  align = "left",
  className,
  as: Heading = "h2",
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div className={cn(centered ? "text-center" : "text-left", className)}>
      <div className={cn("flex items-center gap-3 mb-5", centered && "justify-center")}>
        <span aria-hidden className="h-px w-6 bg-ink-6" />
        <span className="t-meta text-ink-4">{eyebrow}</span>
      </div>

      <Heading className="t-h2 text-ink-2 mb-4">{title}</Heading>

      {subtitle && (
        <p className={cn("t-lead text-ink-3 measure-lead", centered && "mx-auto")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
