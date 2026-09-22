"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { PORTFOLIO, portfolioPath } from "@/lib/portfolio";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export default function GjPortfolio() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Manage active index state for transitions
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80px", // Pin below the 80px header
        end: "bottom bottom",
        pin: panelRef.current,
        scrub: true,
        onUpdate: (self) => {
          // Calculate which of the 7 sections is currently active based on progress
          const index = Math.min(
            PORTFOLIO.length - 1,
            Math.floor(self.progress * PORTFOLIO.length)
          );
          setActiveIndex(index);
        },
      });

      // Apply subtle parallax movement to the images in the right panel
      gsap.to(".portfolio-parallax-img", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80px",
          end: "bottom bottom",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="portfolio" className="relative w-full bg-ivory-4 border-t border-ink-8">
      {/* ── MOBILE: Stacked Cards Layout ── */}
      <div className="md:hidden flex flex-col px-6 py-16 gap-16">
        <SectionHeading
          eyebrow="Hivecrest × GJ Global"
          title="Smarter technology for every operation"
          subtitle="A portfolio of enterprise solutions designed to digitize business operations."
        />
        {PORTFOLIO.map((item) => (
          <div key={item.id} className="flex flex-col gap-6">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-ink-8">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="text-honey-5 font-bold tracking-widest">{item.id}</span>
                <span className="h-px flex-1 bg-ink-7"></span>
              </div>
              <h3 className="t-h3 text-ink-2">{item.name}</h3>
              <p className="t-body font-medium text-ink-3">{item.position}</p>
              <div className="flex flex-wrap gap-2">
                {item.chips.map((chip) => (
                  <span key={chip} className="tag cut-1 text-xs">
                    {chip}
                  </span>
                ))}
              </div>
              <p className="t-body-s text-ink-4 mt-2">{item.overview}</p>
              <Link
                href={portfolioPath(item.slug)}
                className="tap state group/btn gap-3 t-body-s font-semibold text-ink-2 hover:text-honey-5 w-fit mt-2"
              >
                <span>View Solution</span>
                <span className="state p-1.5 cut-1 border border-ink-6 bg-paper group-hover/btn:bg-ink-8">
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* ── DESKTOP TITLE ── */}
      <div className="hidden md:block pt-20 px-12 lg:px-20 bg-ivory-4">
        <SectionHeading
          eyebrow="Hivecrest × GJ Global"
          title="Smarter technology for every operation"
          subtitle="A portfolio of enterprise solutions designed to digitize business operations."
        />
      </div>

      {/* ── DESKTOP: Animated Sticky Scroll Adventure ── */}
      {/* Container height ensures enough scroll distance for 7 items */}
      <div ref={sectionRef} className="hidden md:block relative w-full h-[500vh]">
        {/* Safe wrapper for GSAP pin spacer to prevent React hydration/HMR removeChild errors */}
        <div className="w-full h-full relative">
          <div ref={panelRef} className="w-full h-[calc(100vh-5rem)] overflow-hidden flex bg-ivory-4">
            
            {/* Left Panel: Editorial Narrative */}
            <div className="w-1/2 h-full flex flex-col justify-center relative px-12 lg:px-20 border-r border-ink-8 z-10 bg-ivory-4/80 backdrop-blur-md">

            {/* Vertical Progress Tracker */}
            <div className="absolute left-6 lg:left-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 z-20">
              <span className="text-xs font-bold text-ink-4 tracking-widest">{String(activeIndex + 1).padStart(2, '0')}</span>
              <div className="w-[2px] h-32 bg-ink-7 rounded-full overflow-hidden">
                <div 
                  className="w-full bg-honey-5 transition-all duration-300 ease-out"
                  style={{ height: `${((activeIndex + 1) / PORTFOLIO.length) * 100}%` }}
                />
              </div>
              <span className="text-xs font-bold text-ink-5 tracking-widest">07</span>
            </div>

            {/* Content Layers */}
            {PORTFOLIO.map((item, index) => {
              const isActive = index === activeIndex;
              const isPast = index < activeIndex;
              
              return (
                <div
                  key={item.id}
                  className={[
                    "absolute inset-x-12 lg:inset-x-20 pl-8 flex flex-col justify-center gap-3 lg:gap-4 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    isActive
                      ? "opacity-100 translate-y-0 blur-0 scale-100 pointer-events-auto"
                      : isPast
                      ? "opacity-0 -translate-y-16 blur-sm scale-[0.97] pointer-events-none"
                      : "opacity-0 translate-y-16 blur-sm scale-[0.97] pointer-events-none",
                  ].join(" ")}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-honey-5 font-bold tracking-widest text-sm lg:text-base">
                      {item.id} — {item.name.toUpperCase()}
                    </span>
                  </div>
                  
                  {/* Glassmorphism badge for the system label */}
                  <span className="w-fit px-4 py-1.5 rounded-full border border-ink-6 bg-paper/50 backdrop-blur-md text-xs font-semibold text-ink-3 shadow-sm">
                    {item.system}
                  </span>

                  <h3 className="text-xl lg:text-3xl font-display font-bold text-ink-2 text-balance leading-tight max-w-xl">
                    {item.position}
                  </h3>

                  <Link
                    href={portfolioPath(item.slug)}
                    className="tap state group/btn flex items-center gap-3 t-body font-semibold text-ink-2 hover:text-honey-5 w-fit mt-1 mb-2"
                  >
                    <span>View Platform Details</span>
                    <span className="state p-2 cut-1 border border-ink-6 bg-paper group-hover/btn:bg-ink-8 transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </Link>
                  
                  <p className="text-sm lg:text-base text-ink-3 measure-body hidden 2xl:block">
                    {item.overview}
                  </p>

                  <div className="mt-1">
                    <h4 className="text-xs font-bold text-ink-2 mb-1.5 uppercase tracking-widest">Key Capabilities</h4>
                    <ul className="flex flex-col gap-1">
                      {item.capabilities.map((cap, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-ink-3">
                          <span className="text-honey-5 font-bold">•</span>
                          <span className="leading-tight">{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-2 border-l-2 border-honey-5/30 pl-4">
                     <p className="t-body-s italic text-ink-4 measure-lead line-clamp-3">
                      {item.outcome}
                     </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Panel: Visual Parallax Stage */}
          <div className="w-1/2 h-full relative bg-ivory-3 flex items-center justify-center p-12 lg:p-24">
            
            {/* The Aesthetic Frame */}
            <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] ring-1 ring-ink-7 bg-ink-1">
              {PORTFOLIO.map((item, index) => {
                const isActive = index === activeIndex;
                
                return (
                  <div
                    key={`img-${item.id}`}
                    className={[
                      "absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] origin-center",
                      isActive ? "opacity-100 scale-100 z-10" : "opacity-0 scale-105 z-0",
                    ].join(" ")}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      priority={index === 0}
                      // Oversize the image slightly so the GSAP vertical parallax translation has room to move
                      className="portfolio-parallax-img object-cover absolute !h-[130%] !top-[-15%]"
                    />
                    {/* Subtle gradient overlay to enhance depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-1/40 via-transparent to-transparent opacity-60" />
                  </div>
                );
              })}
            </div>

          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
