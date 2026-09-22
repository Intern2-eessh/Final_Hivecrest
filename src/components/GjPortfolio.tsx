"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/ui/SectionHeading";
import { PORTFOLIO, portfolioPath } from "@/lib/portfolio";
import { prefersReducedMotion, scrubbed, drawFrom, drawTo } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * The Hivecrest × GJ Global portfolio (company brochure, page 6): seven
 * partner products as an interactive split-view architecture.
 *
 * Left side: Interactive menu index.
 * Right side: Tablet frame rendering a preview image and tagline of the
 * selected product.
 */
export default function GjPortfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(ruleRef.current, drawFrom, {
        ...drawTo,
        ease: "none",
        scrollTrigger: scrubbed({ trigger: sectionRef.current }),
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-ivory-4 rhythm-2 pb-24 md:pb-32"
    >
      <div ref={ruleRef} className="absolute top-0 inset-x-0 h-0.5 bg-ink-2 origin-left" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-ink-7" />

      <div className="grid-page">
        <SectionHeading
          className="seat-anchor"
          eyebrow="Hivecrest × GJ Global"
          title="Smarter technology for every operation"
          subtitle="Hivecrest Technologies is a dealership partner of GJ Global, extending access to a portfolio of enterprise technology solutions designed to simplify and digitize business operations."
        />

        {/* ── Interactive Split Layout ── */}
        <div className="seat-full mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Left Panel: Menu Items */}
          <div className="flex flex-col border-t border-ink-7">
            {PORTFOLIO.map((product, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={product.slug}
                  onClick={() => setActiveIndex(index)}
                  className={[
                    "group flex items-baseline gap-3 sm:gap-4 py-3 sm:py-4 border-b border-ink-7 text-left transition-colors duration-200",
                    isActive ? "bg-ivory-2" : "hover:bg-ivory-2/50",
                  ].join(" ")}
                  aria-pressed={isActive}
                >
                  <span
                    className={[
                      "index-numeral t-body-l font-semibold shrink-0 transition-colors duration-200",
                      isActive ? "text-honey-5" : "text-ink-4 group-hover:text-ink-3",
                    ].join(" ")}
                  >
                    {product.id}
                  </span>
                  <span className="flex-1 min-w-0 pr-2">
                    <span
                      className={[
                        "block t-body-l font-semibold transition-colors duration-200",
                        isActive ? "text-ink-2" : "text-ink-3 group-hover:text-ink-2",
                      ].join(" ")}
                    >
                      {product.name}
                    </span>
                    <span
                      className={[
                        "block text-sm mt-0.5 transition-colors duration-200",
                        isActive ? "text-ink-3 font-medium" : "text-ink-5 group-hover:text-ink-4",
                      ].join(" ")}
                    >
                      {product.system}
                    </span>
                  </span>
                  
                  {/* Subtle right arrow for active state */}
                  <span
                    className={[
                      "text-honey-5 transform transition-all duration-300 mr-2 sm:mr-4 text-xl",
                      isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4",
                    ].join(" ")}
                    aria-hidden="true"
                  >
                    →
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Panel: Premium Tablet Mockup */}
          {/* Sticky positioning so it stays visible while scrolling through the list on desktop */}
          <div className="md:sticky md:top-24 w-full max-w-[550px] mx-auto md:ml-auto">
            
            {/* Tablet Hardware Frame (Realistic iPad style but using theme colors) */}
            <div className="relative w-full aspect-square md:aspect-[10/11] bg-ink-1 rounded-[2.5rem] p-4 sm:p-5 lg:p-6 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] ring-1 ring-ink-3 z-10">
              
              {/* Hardware Buttons (Absolute positioned outside/edge of the frame) */}
              {/* Power Button */}
              <div className="absolute top-12 -right-1 w-1.5 h-12 bg-ink-3 rounded-r-md border-y border-r border-ink-4"></div>
              {/* Volume Buttons */}
              <div className="absolute top-32 -right-1 w-1.5 h-10 bg-ink-3 rounded-r-md border-y border-r border-ink-4"></div>
              <div className="absolute top-44 -right-1 w-1.5 h-10 bg-ink-3 rounded-r-md border-y border-r border-ink-4"></div>

              {/* Front Camera Lens (Landscape top-center) */}
              <div className="absolute top-0 inset-x-0 h-4 sm:h-5 lg:h-6 flex justify-center items-center z-30">
                <div className="w-1.5 h-1.5 rounded-full bg-ink-1 ring-1 ring-white/10 relative">
                   <div className="absolute top-[1px] right-[1px] w-[2px] h-[2px] bg-blue-500/40 rounded-full blur-[0.5px]"></div>
                </div>
              </div>

              {/* Tablet Screen */}
              <div className="relative w-full h-full bg-ink-1 rounded-[1.25rem] overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,1)]">
                
                {/* Screen Glare / Reflection (Glass effect) */}
                <div className="absolute inset-0 z-30 pointer-events-none bg-gradient-to-tr from-white/0 via-white/5 to-white/0 transform -rotate-12 scale-150 translate-x-1/4 -translate-y-1/4 mix-blend-screen"></div>
                <div className="absolute inset-0 z-0">
                  {PORTFOLIO.map((product, index) => (
                    <div
                      key={`img-${product.slug}`}
                      className={[
                        "absolute inset-0 transition-opacity duration-500 ease-in-out",
                        index === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0",
                      ].join(" ")}
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={index === 0} // preload first image
                      />
                      {/* Dark gradient overlay so white text stays readable regardless of image */}
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-1/90 via-ink-1/40 to-transparent" />
                    </div>
                  ))}
                </div>

                {/* Text Overlay Layer (Crossfading) */}
                <div className="absolute bottom-0 inset-x-0 z-20 p-6 sm:p-8 flex flex-col gap-4">
                  {PORTFOLIO.map((product, index) => (
                    <div
                      key={`text-${product.slug}`}
                      className={[
                        "absolute bottom-0 inset-x-0 p-6 sm:p-8 transition-all duration-500 ease-in-out",
                        index === activeIndex
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4 pointer-events-none",
                      ].join(" ")}
                    >
                      <div className="flex items-center gap-4 mb-3">
                        <span className="tag border-paper/20 bg-paper/20 text-paper backdrop-blur-md cut-1 font-semibold text-xs tracking-wider">
                          {product.name}
                        </span>
                      </div>
                      <p className="t-h4 text-paper max-w-lg text-balance drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] leading-snug">
                        {product.position}
                      </p>
                    </div>
                  ))}
                </div>

              </div>
            </div>
            
            {/* Minimalist tablet stand shadow */}
            <div className="mx-auto w-[85%] h-6 bg-black/20 rounded-[100%] blur-xl mt-6"></div>
          </div>

        </div>
      </div>
    </section>
  );
}
