"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, CheckCircle, Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = testimonials[currentIndex];

  return (
    <section className="py-20 lg:py-28 bg-[#0B0B0B] text-white border-y border-[#C9A24B]/30 relative overflow-hidden select-none">
      {/* Background Subtle Gold Shimmer */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#C9A24B]/10 blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C9A24B]/40 bg-[#C9A24B]/10 text-[#E6C879] text-xs font-semibold uppercase tracking-widest mb-3">
            <Quote className="w-3.5 h-3.5 text-[#E6C879]" />
            <span>Patron Testimonials</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white">
            Words of Confidence
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#E5DFC9]/75 font-light">
            Reflections from clients, celebrity stylists, and gala patrons across the world.
          </p>
        </div>

        {/* Testimonial Stage */}
        <div className="relative bg-[#141414] border border-[#C9A24B]/30 rounded-2xl p-8 sm:p-12 shadow-2xl">
          {/* Large Gold Quote Mark in Background */}
          <div className="absolute top-6 left-8 font-serif text-8xl sm:text-9xl text-[#C9A24B]/15 leading-none pointer-events-none select-none">
            “
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="relative z-10 flex flex-col items-center text-center"
            >
              {/* Star Rating */}
              <div className="flex items-center gap-1.5 mb-6">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#C9A24B] text-[#C9A24B]" />
                ))}
              </div>

              {/* Quote Text */}
              <blockquote className="font-serif text-lg sm:text-2xl text-white font-light italic leading-relaxed max-w-3xl">
                &ldquo;{current.quote}&rdquo;
              </blockquote>

              {/* Patron Profile */}
              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#C9A24B] ring-2 ring-[#C9A24B]/20 shadow">
                  <Image
                    src={current.avatar}
                    alt={current.name}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>

                <div className="text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-1.5">
                    <h3 className="font-serif text-base font-semibold text-white">{current.name}</h3>
                    <CheckCircle className="w-3.5 h-3.5 text-[#E6C879]" />
                  </div>
                  <p className="text-xs text-[#E6C879]">{current.role} • {current.city}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    Acquired: <span className="text-[#E5DFC9]">{current.purchasedItem}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    currentIndex === idx ? "w-8 bg-gold-gradient" : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex gap-2">
              <button
                onClick={prevSlide}
                className="w-9 h-9 rounded-full border border-[#C9A24B]/40 flex items-center justify-center text-gray-300 hover:text-white hover:border-[#C9A24B] hover:bg-[#C9A24B]/10 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="w-9 h-9 rounded-full border border-[#C9A24B]/40 flex items-center justify-center text-gray-300 hover:text-white hover:border-[#C9A24B] hover:bg-[#C9A24B]/10 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
