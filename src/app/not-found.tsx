import React from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { ArrowRight, ShoppingBag } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center bg-[#FBF9F4] text-[#0B0B0B] px-4 py-16 select-none text-center">
      <div className="max-w-lg mx-auto">
        <BrandLogo size="lg" variant="full" className="justify-center mb-6" />

        <span className="font-serif text-7xl sm:text-8xl font-bold gold-text-gradient block">
          404
        </span>

        <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#0B0B0B] mt-2">
          Silhouette Not Found
        </h1>

        <p className="text-xs sm:text-sm text-[#6B6458] mt-3 leading-relaxed font-light">
          The couture creation you are seeking may have moved to private archives or concluded its runway exhibition.
        </p>

        <GoldDivider withTagline={true} className="my-6" />

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-[#0B0B0B] text-white text-xs uppercase tracking-widest font-semibold rounded hover:bg-[#8F6B1F] transition-colors"
          >
            Return to Maison Home
          </Link>
          <Link
            href="/shop"
            className="px-6 py-3 bg-gold-gradient text-[#0B0B0B] text-xs uppercase tracking-widest font-semibold rounded shadow hover:opacity-95 transition-opacity flex items-center justify-center gap-1.5"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Explore Collection</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
