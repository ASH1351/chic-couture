"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

export const EditorialBanner: React.FC = () => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: bannerRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      ref={bannerRef}
      className="relative py-20 lg:py-32 bg-[#0B0B0B] text-white overflow-hidden select-none border-y border-[#C9A24B]/30"
    >
      {/* Ambient Gold Radial Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-[#C9A24B]/15 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Editorial Visual with Parallax */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-2xl border border-[#C9A24B]/40 bg-[#1A1A1A]">
              <motion.div style={{ y: imageY }} className="absolute inset-[-10%] w-[120%] h-[120%]">
                <Image
                  src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1200&auto=format&fit=crop"
                  alt="Chic Couture Atelier Craftsmanship"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

              {/* Floating Quote Stamp */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded bg-black/70 backdrop-blur-md border border-[#C9A24B]/40">
                <p className="font-script text-xl text-[#E6C879] italic">
                  &ldquo;A gown should fit like liquid gold—silent, undeniable, effortless.&rdquo;
                </p>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">
                  — Chic Couture Head Couturière
                </p>
              </div>
            </div>

            {/* Decorative Offset Gold Frame */}
            <div className="hidden sm:block absolute -inset-3 border border-[#C9A24B]/30 rounded-2xl -z-10 translate-x-3 translate-y-3 pointer-events-none" />
          </div>

          {/* Right Editorial Story & Manifesto */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C9A24B]/40 bg-[#C9A24B]/10 text-[#E6C879] text-xs font-semibold uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#E6C879]" />
              <span>The Atelier Manifesto</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-tight">
              Style That Speaks <br />
              <span className="gold-text-gradient italic">Before You Do.</span>
            </h2>

            <p className="mt-6 text-sm sm:text-base text-[#E5DFC9]/80 font-light leading-relaxed">
              At Maison Chic Couture, luxury is never accidental. It is the result of four decades of 
              generational mastery: hand-spinning gossamer organza, sourcing 40mm mulberry silk crepes, and 
              sculpting internal boned corsetry that contours without constraint.
            </p>

            <div className="mt-8 space-y-3.5 w-full">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#C9A24B] shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-[#E5DFC9]/90">
                  <strong className="text-white">Pure Mulberry & Katan Silks:</strong> Zero synthetic blends; all natural, breathable, tactile luxury.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#C9A24B] shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-[#E5DFC9]/90">
                  <strong className="text-white">Bespoke Fit Concierge:</strong> Complimentary measurements guidance and custom waist tailoring.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#C9A24B] shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-[#E5DFC9]/90">
                  <strong className="text-white">Generational Artisans:</strong> Hand-embellished in our historic Mumbai and Varanasi atelier workshops.
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link
                href="/about"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold-gradient text-[#0B0B0B] font-semibold text-xs uppercase tracking-widest hover:opacity-95 transition-opacity shadow-lg group"
              >
                <span>Read The Maison Story</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/lookbook"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 border border-[#C9A24B]/60 text-[#E6C879] hover:bg-[#C9A24B]/15 font-semibold text-xs uppercase tracking-widest transition-colors"
              >
                <span>View Runway Film</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
