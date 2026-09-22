"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The understructure (bible §08).
 *
 * A hex grid lying beneath the whole page, invisible until the pointer passes
 * over it and revealing only inside a soft radius around the cursor. It is the
 * literal form of the line the company's own copy uses — "the digital backbone
 * your business grows on" — and it is the only cursor-driven effect the system
 * permits (Rule 08.4). No custom cursors, no followers, no magnetic buttons,
 * no spotlight anywhere else.
 *
 * Rule 08.1 — it never repaints content. The pointer handler writes one
 * `transform` on each of two composited layers and nothing else: no layout, no
 * style recalc outside this subtree, no React state per frame.
 *
 * It used to write `--ux` / `--uy` on `:root` and let a `mask-image` radial
 * gradient read them. That was the single most expensive thing on the site.
 * Writing a custom property on the root element invalidates inherited values
 * for the whole document, so every pointer frame started with a full-document
 * style recalc; and `mask-image` is not a compositor property, so the same
 * frame also re-rastered a viewport-sized fixed layer. Profiled at 4x CPU
 * throttle that was a 63-186ms long task on *every frame the mouse moved* —
 * the page locked up whenever the pointer was in motion, which is most of the
 * time someone is reading it.
 *
 * The mask is now fixed at the centre of a small window element that is moved
 * to the pointer with `transform`, and the hex grid inside it is moved by the
 * exact inverse so it stays anchored to the viewport rather than dragging
 * along behind the cursor (Rule 08.4 — it reveals, it does not follow).
 *
 * Rule 08.3 — it reveals, it does not attract. Peak opacity is 0.09. It is
 * meant to be felt rather than read.
 *
 * Rule 08.2 — disabled below 1024px and on coarse pointers, and deliberately
 * NOT replaced by a tap interaction: a decorative tap target would teach the
 * visitor something false about what on the page is clickable.
 */
export default function Understructure() {
  const [enabled, setEnabled] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1024px is `--breakpoint-lg`. It used to be a bare magic number here while
    // `lg` meant 1200px, so this layer switched on at a width nothing else in
    // the system recognised and carved a third band out of the tablet range.
    const query = window.matchMedia("(min-width: 1024px) and (pointer: fine)");

    // Rule 07.7 — decorative motion is off entirely under reduced motion.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const evaluate = () => setEnabled(query.matches && !reduced.matches);
    evaluate();

    query.addEventListener("change", evaluate);
    reduced.addEventListener("change", evaluate);
    return () => {
      query.removeEventListener("change", evaluate);
      reduced.removeEventListener("change", evaluate);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const win = windowRef.current;
    const grid = gridRef.current;
    if (!win || !grid) return;

    // The radius the window is sized from, read once. It is a length token
    // (`--under-radius`, globals.css) so the CSS stays the single source of
    // truth for how wide the reveal is.
    const radius =
      parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--under-radius")
      ) || 260;

    let frame = 0;
    let x = -9999;
    let y = -9999;

    // rAF-throttled: many pointermove events collapse into at most one write
    // per frame, which is the whole performance budget this effect has. Both
    // writes are `transform` on an already-promoted layer, so the frame costs
    // a compositor update and nothing else.
    const write = () => {
      frame = 0;
      const left = x - radius;
      const top = y - radius;
      win.style.transform = `translate3d(${left}px, ${top}px, 0)`;
      grid.style.transform = `translate3d(${-left}px, ${-top}px, 0)`;
    };

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!frame) frame = requestAnimationFrame(write);
    };

    // Park the window off-screen until the pointer first moves, so the grid
    // does not sit revealed at the top-left corner on load.
    write();

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="understructure" aria-hidden="true">
      <div ref={windowRef} className="understructure-window">
        <div ref={gridRef} className="understructure-grid" />
      </div>
    </div>
  );
}
