import React from "react";
import { Metadata } from "next";
import { LookbookSection } from "@/components/sections/LookbookSection";
import { GoldDivider } from "@/components/ui/GoldDivider";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Lookbook | Autumn & Festive Haute Couture - Chic Couture",
  description:
    "Explore the official Autumn / Winter Haute Couture and Heritage Bridal Lookbooks by Maison Chic Couture. Wear Confidence on the runway and beyond.",
};

export default function LookbookPage() {
  return (
    <main className="min-h-screen bg-[#FBF9F4] text-[#0B0B0B] py-12 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Title Banner */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F3EFE6] border border-[#C9A24B]/30 rounded-full text-xs uppercase tracking-widest text-[#8F6B1F] font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
            <span>Seasonal Campaigns &amp; Runway</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-semibold tracking-tight text-[#0B0B0B]">
            The Haute Lookbook
          </h1>
          <p className="mt-4 text-sm sm:text-base text-[#6B6458] font-light leading-relaxed">
            Capturing the intersection of architectural structure, fluid drapery, and midnight glamour. 
            Every visual is a chapter in the story of modern feminine empowerment.
          </p>

          <GoldDivider withTagline={true} className="my-8" />
        </div>

        {/* Campaign Featured Banner */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden border border-[#C9A24B]/40 shadow-2xl mb-16 bg-[#141414]">
          <Image
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1600&auto=format&fit=crop"
            alt="Runway Campaign Film Still"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

          <div className="absolute bottom-8 inset-x-8 sm:inset-x-12 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#E6C879] font-bold">
                Chapter I • The Nocturne Collection
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-semibold text-white mt-1">
                Sovereign Grace &amp; Molten Silks
              </h2>
            </div>

            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gold-gradient text-[#0B0B0B] text-xs uppercase tracking-widest font-bold rounded shadow hover:opacity-95"
            >
              <span>Shop All Runway Looks</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Hotspot Style Gallery */}
        <LookbookSection />
      </div>
    </main>
  );
}
