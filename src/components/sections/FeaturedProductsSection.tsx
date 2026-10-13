"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ui/ProductCard";

export const FeaturedProductsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filterTabs = [
    { label: "All Masterpieces", value: "all" },
    { label: "Evening Gowns", value: "gowns" },
    { label: "Ethnic Couture", value: "ethnic" },
    { label: "Co-ord Sets", value: "coords" },
    { label: "Western Pret", value: "western" },
    { label: "Beauty & Atelier", value: "beauty" },
  ];

  const filteredProducts =
    activeFilter === "all"
      ? products
      : products.filter((p) => p.category === activeFilter);

  return (
    <section className="py-20 lg:py-28 bg-[#FBF9F4] border-t border-[#C9A24B]/20 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F3EFE6] border border-[#C9A24B]/30 rounded-full text-xs uppercase tracking-widest text-[#8F6B1F] font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
            <span>Autumn / Festive Runway Edit</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0B0B0B]">
            New Arrivals & Haute Creations
          </h2>
          <p className="mt-3 text-sm text-[#6B6458] font-light leading-relaxed">
            From red-carpet velvet ballgowns to hand-spun silk organza sarees, discover the pinnacle of craftsmanship.
          </p>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-12">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => setActiveFilter(tab.value)}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest font-medium transition-all ${
                  isActive
                    ? "bg-[#0B0B0B] text-white shadow-md ring-1 ring-[#C9A24B]"
                    : "bg-white text-[#6B6458] hover:text-[#0B0B0B] border border-[#C9A24B]/25 hover:border-[#C9A24B]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Product Grid (2 cols mobile, 3 cols tablet, 4 cols desktop) */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          <AnimatePresence>
            {filteredProducts.slice(0, 8).map((product, idx) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
              >
                <ProductCard product={product} priority={idx < 4} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Explore All CTA */}
        <div className="mt-14 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-transparent border-2 border-[#0B0B0B] hover:bg-[#0B0B0B] text-[#0B0B0B] hover:text-[#FBF9F4] text-xs font-semibold uppercase tracking-widest transition-all duration-300 group shadow-sm"
          >
            <span>Explore Complete Boutique Catalogue ({products.length}+ Pieces)</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};
