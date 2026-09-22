import React from "react";
import SiteHeader from "@/components/SiteHeader";
import FooterColumn from "@/components/ui/footer-column";

/**
 * The frame every route outside the home page uses.
 *
 * It exists so a new page cannot accidentally invent its own opener. The title
 * block is Archetype B (STATEMENT) from §13.2 — seat `anchor`, ground
 * `ivory-2`, `rhythm-1` — which puts each inner page at the same point in the
 * noise-to-settled arc that the home page's own second section occupies.
 *
 * `pt-32 md:pt-40` clears the fixed 80px header. The header is `position:
 * fixed`, so it takes no space in flow and the first section would otherwise
 * start underneath it.
 */
export default function PageShell({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen">
        {/* `pt-32 md:pt-40` clears the 80px fixed header. It only started
            working once `.rhythm-*` moved into `@layer components` — unlayered,
            `padding-block` beat it and the title rendered under the header.

            `pb-0` because the title block's ground is one step from the section
            below it (ivory-2 to ivory-3, a ratio of 1.01 — invisible by
            design), so stacking both rhythm bands produced 176px of blank with
            no edge in it. The following section's own opening carries the gap. */}
        <section className="relative w-full bg-ivory-2 rhythm-1 pt-32 md:pt-40 pb-0">
          <div className="grid-page">
            <div className="seat-anchor">
              <div className="flex items-center gap-3 mb-6">
                <span aria-hidden className="h-px w-6 bg-ink-6" />
                <span className="t-meta text-ink-4">{eyebrow}</span>
              </div>
              <h1 className="t-h1 text-ink-2">{title}</h1>
              {lead && <p className="t-lead text-ink-3 measure-lead mt-6">{lead}</p>}
            </div>
          </div>
        </section>

        {children}
      </main>
      <FooterColumn />
    </>
  );
}
