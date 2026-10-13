"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Scissors, Clock, RotateCcw, ShieldCheck } from "lucide-react";

export const WhyChicCouture: React.FC = () => {
  const features = [
    {
      icon: Sparkles,
      title: "Couture-Grade Fabrics",
      metric: "100%",
      metricLabel: "Pure Silks & Velvets",
      desc: "Sourced directly from heritage mills in Varanasi, Como, and Lyon. Zero polyester blends, pure tactile indulgence.",
    },
    {
      icon: Scissors,
      title: "Sculpted Silhouette & Fit",
      metric: "99.4%",
      metricLabel: "Bespoke Fit Accuracy",
      desc: "Internal corsetry architecture with boning engineered to contour effortlessly, plus complimentary virtual sizing.",
    },
    {
      icon: Clock,
      title: "Express Atelier Dispatch",
      metric: "48h",
      metricLabel: "Pan-India Express",
      desc: "White-glove courier shipping across India with complimentary express delivery on orders over ₹2,999.",
    },
    {
      icon: RotateCcw,
      title: "7-Day Doorstep Returns",
      metric: "7 Days",
      metricLabel: "White-Glove Exchange",
      desc: "Try in the comfort of your boudoir. Hassle-free home pickup with our dedicated concierge styling team.",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#0B0B0B] text-white border-y border-[#C9A24B]/30 relative overflow-hidden select-none">
      {/* Background Gold Ambient Bloom */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-80 bg-[#C9A24B]/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C9A24B]/40 bg-[#C9A24B]/10 text-[#E6C879] text-xs font-semibold uppercase tracking-widest mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#E6C879]" />
            <span>The Maison Guarantee</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white">
            Why Chic Couture
          </h2>
          <p className="mt-3 text-sm text-[#E5DFC9]/80 font-light leading-relaxed">
            Where traditional Indian haute craftsmanship meets contemporary Parisian precision.
          </p>
        </div>

        {/* 4 Feature Cards with Animated Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative p-8 rounded-xl bg-[#141414] border border-[#C9A24B]/25 hover:border-[#C9A24B] transition-all duration-300 flex flex-col justify-between hover:shadow-[0_0_30px_rgba(201,162,75,0.15)]"
              >
                <div>
                  {/* Gold Icon Well */}
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#8F6B1F]/30 to-[#E6C879]/10 border border-[#C9A24B]/40 flex items-center justify-center text-[#E6C879] mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Metric Counter */}
                  <div className="mb-2">
                    <span className="font-serif text-3xl sm:text-4xl font-bold gold-text-gradient">
                      {feat.metric}
                    </span>
                    <p className="text-[10px] uppercase tracking-widest text-[#E6C879] font-medium mt-0.5">
                      {feat.metricLabel}
                    </p>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-serif text-lg font-semibold text-white mt-3 group-hover:text-[#E6C879] transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-[#E5DFC9]/75 mt-2 font-light leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                {/* Subtle Bottom Gold Hairline */}
                <div className="w-8 h-[2px] bg-gold-gradient mt-6 group-hover:w-full transition-all duration-500" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
