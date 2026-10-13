"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { categories } from "@/data/categories";

export const CategoriesSection: React.FC = () => {
  return (
    <section id="collections" className="py-20 lg:py-28 bg-[#FBF9F4] select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#8F6B1F] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
              <span>Curated Capsules</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0B0B0B]">
              Shop by Category
            </h2>
            <p className="mt-3 text-sm text-[#6B6458] max-w-xl font-light">
              Explore bespoke silhouettes crafted from the finest mulberry silks, hand-embroidered organza, and opulent velvets.
            </p>
          </div>

          <Link
            href="/shop"
            className="mt-6 md:mt-0 inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#0B0B0B] hover:text-[#8F6B1F] group transition-colors"
          >
            <span>View All Collections</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#C9A24B]" />
          </Link>
        </div>

        {/* Tall Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className={`group relative overflow-hidden rounded-lg bg-[#F3EFE6] aspect-[3/4] cursor-pointer border border-[#C9A24B]/20 transition-all duration-500 hover:shadow-2xl hover:border-[#C9A24B] ${
                idx === 0 ? "sm:col-span-2 lg:col-span-2 aspect-[4/3] sm:aspect-[16/10]" : ""
              }`}
            >
              <Link href={`/shop?category=${cat.slug}`} className="block w-full h-full">
                {/* Background Image with Zoom */}
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Dark Vignette Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 group-hover:from-black/90 transition-all duration-500" />

                {/* Gold Inner Border Line Draw on Hover */}
                <div className="absolute inset-3 border border-transparent group-hover:border-[#C9A24B]/60 transition-all duration-500 pointer-events-none rounded" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between text-white z-10">
                  {/* Top Item Count Badge */}
                  <div className="flex justify-between items-start">
                    <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md text-[10px] uppercase tracking-widest text-[#E6C879] rounded border border-[#C9A24B]/40 font-semibold">
                      {cat.itemCount} Designs
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-[#C9A24B]/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105">
                      <ArrowUpRight className="w-4 h-4 text-[#E6C879]" />
                    </div>
                  </div>

                  {/* Bottom Title & Tagline */}
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-semibold tracking-wide text-white group-hover:text-[#E6C879] transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-[#E5DFC9]/80 line-clamp-2 mt-1.5 font-light">
                      {cat.tagline}
                    </p>
                    <span className="inline-block mt-3 text-[11px] font-semibold uppercase tracking-widest text-[#E6C879] underline underline-offset-4 group-hover:translate-x-1 transition-transform">
                      Explore Capsule →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
