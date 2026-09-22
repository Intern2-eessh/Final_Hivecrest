/**
 * The motion system, in the terms the brand bible sets (§07).
 *
 * Motion here is written as physics rather than as effects. Four verbs exist
 * and nothing else: settle, shift, reveal, hold.
 *
 *   settle  something already present comes to rest. Ends at zero velocity
 *           and never overshoots.
 *   shift   something present changes position or size.
 *   reveal  something present is uncovered — by mask, clip or scroll. The
 *           point is that it was always there.
 *   hold    deliberate stillness, and the most underused verb available.
 *
 * Rule 07.3 bans, with no exceptions: `opacity: 0 → 1` combined with
 * `translateY` (which was the site's entire previous vocabulary), bounce and
 * overshoot easing, `scale` from 0, infinite loops outside the noise register,
 * parallax on text, anything that moves while the user is reading it, and
 * hover effects that change layout.
 *
 * That ban is why nothing below fades and moves at once. A block is either
 * uncovered (`reveal`, a clip wipe) or it comes to rest (`settle`, a short
 * translate at full opacity). Objects are not created by scrolling.
 */

/** Rule 07.1 — distance sets duration, in seconds for GSAP. */
export const DURATION = {
  tap: 0.09,
  quick: 0.18,
  base: 0.32,
  settle: 0.62,
  long: 1.1,
  monument: 2.4,
} as const;

/** Cubic-bezier control points, matching the --ease-* tokens exactly. */
export const EASE = {
  /** Primary. All arrivals. Fast start, very long tail — mass coming to rest. */
  settle: "cubic-bezier(0.16, 1, 0.30, 1)",
  /** Positional change of something already present. */
  shift: "cubic-bezier(0.32, 0.72, 0.20, 1)",
  /** Opacity, clip-path, masks. */
  reveal: "cubic-bezier(0.25, 0.60, 0.35, 1)",
  /** Tactile feedback under the finger. */
  press: "cubic-bezier(0.30, 0, 0.20, 1)",
  /** Dismissal, removal. */
  exit: "cubic-bezier(0.55, 0, 0.85, 0.35)",
  /** Scrubbed sequences only. */
  drive: "none",
} as const;

/**
 * Rule 07.5 — the choreography budget: how many elements may be in motion at
 * once, by narrative register. The budget shrinks as the page descends, so
 * stillness increases towards the settled end.
 */
export const CHOREOGRAPHY_BUDGET = {
  noise: 6,
  working: 4,
  resolving: 2,
  settled: 1,
} as const;

/**
 * Rule 07.7 — under `prefers-reduced-motion` the page renders the settled end
 * state. Not a shortened animation and not a cross-fade: the final frame,
 * immediately. This costs nothing here because every sequence in the system
 * resolves *to* the settled state, so the still frame is already the correct
 * composition.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * `reveal` — a clip wipe. The element is at full opacity the whole time; it is
 * uncovered rather than faded in, which is the distinction Rule 07.2 draws.
 */
export const revealFrom = { clipPath: "inset(0 0 100% 0)" };
export const revealTo = {
  clipPath: "inset(0 0 0% 0)",
  duration: DURATION.settle,
  ease: EASE.reveal,
};

/**
 * `settle` — a short translate at full opacity, ending at zero velocity.
 * The distance is deliberately small: Rule 07.1 ties duration to distance, and
 * a 200px arrival would need far longer than this to read as mass rather than
 * as a slide.
 */
export const settleFrom = { y: 24 };
export const settleTo = {
  y: 0,
  duration: DURATION.settle,
  ease: EASE.settle,
};

/**
 * Rule 07.6 — motion happens once. No entrance replays on scroll-back.
 * Rule 08.9 — scroll may drive time, position and reveal, never opacity alone.
 */
export const triggerOnce = {
  start: "top 80%",
  toggleActions: "play none none none",
  once: true,
} as const;

/**
 * Rule 07.4 — adjacent sections may not share a scroll behaviour, and there
 * are exactly three to choose from: TRIGGERED (settles once on entry),
 * SCRUBBED (the user drives it frame by frame), STATIC (never moves).
 *
 * The whole point is that no two sections in a row feel the same. Down the
 * page they run: triggered · scrubbed · triggered · scrubbed · triggered ·
 * static · triggered.
 *
 * `scrub: 1` gives the sequence a one-second catch-up rather than welding it
 * to the scrollbar, which is what stops a scrubbed section reading as jittery
 * on a trackpad.
 */
export const scrubbed = (extra?: Record<string, unknown>) => ({
  start: "top 85%",
  end: "top 35%",
  scrub: 1,
  ...extra,
});

/**
 * `wipe` — a directional clip reveal. Unlike `reveal` (which always uncovers
 * downward) this takes a side, so a zig-zag layout can uncover each row from
 * the edge its media sits on and the motion follows the composition instead of
 * fighting it.
 */
export const wipeFrom = (side: "left" | "right" | "up") => ({
  clipPath:
    side === "left"
      ? "inset(0 100% 0 0)"
      : side === "right"
        ? "inset(0 0 0 100%)"
        : "inset(100% 0 0 0)",
});

export const wipeTo = {
  clipPath: "inset(0% 0% 0% 0%)",
  duration: DURATION.long,
  ease: EASE.reveal,
};

/**
 * `draw` — a rule or hairline extending from nothing to its full length.
 * Used where a section should feel constructed rather than delivered.
 */
export const drawFrom = { scaleX: 0, transformOrigin: "left center" };
export const drawTo = {
  scaleX: 1,
  duration: DURATION.long,
  ease: EASE.shift,
};
