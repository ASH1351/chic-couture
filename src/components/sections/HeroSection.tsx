"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Sparkles, ShoppingBag, Eye } from "lucide-react";

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] lg:min-h-[96vh] flex items-center justify-center overflow-hidden bg-[#FBF9F4] select-none"
    >
      {/* Background Floating Gold Hearts & Sparkles Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-[#C9A24B]/30"
            style={{
              top: `${15 + i * 14}%`,
              left: `${8 + i * 16}%`,
            }}
            animate={{
              y: [0, -25, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [0.9, 1.15, 0.9],
            }}
            transition={{
              duration: 5 + i * 1.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.7,
            }}
          >
            {i % 2 === 0 ? (
              <span className="text-xl">♥</span>
            ) : (
              <Sparkles className="w-5 h-5 text-[#E6C879]" />
            )}
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Editorial Copy (7 columns) */}
          <motion.div
            style={{ y: textY }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Top Category Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C9A24B]/40 bg-[#F3EFE6]/80 text-[#8F6B1F] text-xs font-semibold uppercase tracking-widest mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
              <span>Haute Couture • Autumn / Winter 2026</span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.8 }}
              className="space-y-1"
            >
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0B0B0B]">
                Maison Chic Couture
              </h2>
              <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95]">
                <span className="gold-text-gradient drop-shadow-sm">Wear</span>{" "}
                <span className="italic font-normal font-serif text-[#0B0B0B]">Confidence.</span>
              </h1>
            </motion.div>

            {/* Subline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-6 text-base sm:text-lg text-[#6B6458] max-w-xl font-light leading-relaxed"
            >
              Bespoke evening gowns, hand-embroidered zardozi sarees, and sculpted silk tailoring. 
              Meticulously handcrafted for the woman who commands the room before speaking a single word.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.8 }}
              className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
            >
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold-gradient text-[#0B0B0B] font-semibold text-xs uppercase tracking-widest rounded-none shadow-lg hover:opacity-95 transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-center"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Shop the Collection</span>
              </Link>

              <Link
                href="/lookbook"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-[#0B0B0B] text-[#0B0B0B] font-semibold text-xs uppercase tracking-widest rounded-none hover:bg-[#0B0B0B] hover:text-[#FBF9F4] transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-center"
              >
                <Eye className="w-4 h-4" />
                <span>View Lookbook</span>
              </Link>
            </motion.div>

            {/* Quick Metrics Strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85, duration: 0.8 }}
              className="mt-12 pt-6 border-t border-[#C9A24B]/25 grid grid-cols-3 gap-6 w-full max-w-lg"
            >
              <div>
                <p className="font-serif text-2xl font-bold text-[#0B0B0B]">100%</p>
                <p className="text-[11px] text-[#6B6458] uppercase tracking-wider">Pure Mulberry Silk</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-[#0B0B0B]">180h</p>
                <p className="text-[11px] text-[#6B6458] uppercase tracking-wider">Artisan Embroidery</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-[#0B0B0B]">15k+</p>
                <p className="text-[11px] text-[#6B6458] uppercase tracking-wider">Patrons Worldwide</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Cinematic Editorial Visual (5 columns) */}
          <motion.div
            style={{ y: imageY }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-2 border-[#C9A24B]/30 bg-[#F3EFE6]">
              {/* Editorial Model Image */}
              <Image
                src="https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1200&auto=format&fit=crop"
                alt="Chic Couture Evening Gown Campaign"
                fill
                priority
                className="object-cover object-top hover:scale-105 transition-transform duration-1000 ease-out"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />

              {/* Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

              {/* Floating Floating Couture Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass-ivory border border-[#C9A24B]/40 shadow-lg text-[#0B0B0B]">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#8F6B1F]">
                      Featured Piece
                    </span>
                    <h3 className="font-serif text-base font-semibold text-[#0B0B0B]">
                      The Aurum Sculpted Velvet Gown
                    </h3>
                  </div>
                  <span className="font-serif font-bold text-sm gold-text-gradient">₹24,900</span>
                </div>
              </div>
            </div>

            {/* Decorative Offset Golden Border Frame */}
            <div className="hidden sm:block absolute -inset-4 border border-[#C9A24B]/40 rounded-3xl -z-10 translate-x-3 translate-y-3 pointer-events-none" />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-12 lg:mt-8 flex flex-col items-center justify-center text-center select-none"
        >
          <a
            href="#collections"
            className="group flex flex-col items-center gap-2 text-[10px] uppercase tracking-widest text-[#6B6458] hover:text-[#0B0B0B] transition-colors"
          >
            <span>Scroll to Discover</span>
            <div className="w-5 h-8 rounded-full border border-[#C9A24B] flex items-start justify-center p-1">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-1.5 rounded-full bg-[#C9A24B]"
              />
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
