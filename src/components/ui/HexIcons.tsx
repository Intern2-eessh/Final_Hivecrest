import React from "react";

/**
 * Icons drawn on the hex construction grid (bible §10).
 *
 * Construction:
 *  · 24 × 24 viewBox, 1.75 stroke, square terminals, mitre joins.
 *  · The outer silhouette is the same hexagon the bullet uses, so an icon and
 *    a list marker at the same size share a profile.
 *  · No round caps and no round joins: the system has no radii (Rule 05.1),
 *    and a rounded terminal on an icon next to a 30° chamfer on everything
 *    else reads as two unrelated drawings.
 *
 * These replace hand-rolled inline `<svg>` blocks that had been pasted into
 * components with a different stroke weight and round caps — the drift Rule
 * 10.0 exists to stop. `lucide` is still acceptable for conventional interface
 * glyphs (menu, close, arrow); a mark that carries meaning specific to
 * Hivecrest is drawn here instead.
 */

type IconProps = { className?: string; title?: string };

function Icon({ className, title, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className ?? "w-5 h-5"}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="square"
      strokeLinejoin="miter"
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {children}
    </svg>
  );
}

/** The hex cell itself — the shape every other icon is registered against. */
const HEX = "M12 1.5 L21.5 6.75 V17.25 L12 22.5 L2.5 17.25 V6.75 Z";

/**
 * Vision — a hex with a sightline running through it to a marked centre.
 * Deliberately not an eye: an eye is passive, and the copy is about aim.
 */
export function VisionIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d={HEX} />
      <path d="M12 8.5 V12 H15.5" />
      <path d="M6.5 12 H8.5" />
    </Icon>
  );
}

/**
 * Mission — a hex with a path stepping up through it. The step is the
 * workflow-first idea the About copy states: start low, finish higher.
 */
export function MissionIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d={HEX} />
      <path d="M7 15.5 H11 V11 H15 V7.5" />
    </Icon>
  );
}

/** The bare cell, for use as a standalone mark. */
export function HexIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d={HEX} />
    </Icon>
  );
}
