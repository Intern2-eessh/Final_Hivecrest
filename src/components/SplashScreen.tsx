"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function SplashScreen() {
  const [show, setShow] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    // Prevent scrolling while splash screen is active
    document.body.style.overflow = "hidden";

    // Start fading out at 2 seconds
    const fadeTimer = setTimeout(() => {
      setFade(true);
    }, 2000);

    // Completely remove from DOM at 2.5 seconds
    const removeTimer = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "auto";
    }, 2500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-ivory-3 transition-opacity duration-500 ${
        fade ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center justify-center animate-glow-pulse">
        <Image
          src="/assets/Hivecrest_Logo.png"
          alt="Hivecrest Logo"
          width={160}
          height={160}
          className="w-24 md:w-32 h-auto object-contain mb-6 drop-shadow-[0_0_30px_rgba(212,163,42,0.6)]"
          priority
        />
        <div className="flex flex-col items-center">
          <span className="font-display font-bold text-honey-5 whitespace-nowrap text-xl md:text-3xl tracking-[0.15em] leading-tight drop-shadow-[0_0_15px_rgba(212,163,42,0.4)]">
            HIVECREST TECHNOLOGY
          </span>
          <blockquote className="text-[0.65rem] md:text-xs font-semibold text-ink-4 tracking-[0.3em] uppercase mt-2">
            PRIVATE LIMITED
          </blockquote>
          
          {/* Animated Loading Bar */}
          <div className="w-48 h-1 bg-ink-7/30 rounded-full overflow-hidden mt-10 relative">
            <div className="absolute top-0 left-0 h-full w-1/3 bg-honey-4 rounded-full animate-progress-slide" />
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes glow-pulse {
          0%, 100% { 
            opacity: 1; 
            transform: scale(1);
            filter: drop-shadow(0 0 10px rgba(212,163,42,0.2));
          }
          50% { 
            opacity: 0.9; 
            transform: scale(1.02);
            filter: drop-shadow(0 0 40px rgba(212,163,42,0.6));
          }
        }
        @keyframes progress-slide {
          0% { transform: translateX(-150%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(350%); }
        }
        .animate-glow-pulse {
          animation: glow-pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-progress-slide {
          animation: progress-slide 2s cubic-bezier(0.65, 0, 0.35, 1) infinite;
        }
      `}</style>
    </div>
  );
}
