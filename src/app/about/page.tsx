import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ShieldCheck, Heart, ArrowRight } from "lucide-react";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { BrandLogo } from "@/components/ui/BrandLogo";

export const metadata: Metadata = {
  title: "The Maison Story & Heritage | Chic Couture",
  description:
    "Discover the history, master artisans, and philosophy of Maison Chic Couture. Handcrafted luxury fashion engineered to empower the modern woman. Wear Confidence.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FBF9F4] text-[#0B0B0B] py-12 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F3EFE6] border border-[#C9A24B]/30 rounded-full text-xs uppercase tracking-widest text-[#8F6B1F] font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
            <span>Maison Heritage • Est. 1988</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-semibold tracking-tight text-[#0B0B0B]">
            The Architecture of Elegance
          </h1>

          <p className="mt-4 text-sm sm:text-base text-[#6B6458] font-light leading-relaxed">
            Founded on the singular belief that couture is not mere ornamentation, but an armour of confidence. 
            Maison Chic Couture marries generational Indian textile mastery with contemporary Parisian draping.
          </p>

          <GoldDivider withTagline={true} className="my-8" />
        </div>

        {/* The Brand Emblem Story Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20 bg-white p-8 sm:p-12 rounded-2xl border border-[#C9A24B]/30 shadow-sm">
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-2xl overflow-hidden border-2 border-[#C9A24B]/40 p-4 bg-gradient-to-br from-[#FAF8F5] to-[#F3EFE6] shadow-xl flex items-center justify-center">
              <Image
                src="/chic-couture-logo.png"
                alt="Chic Couture Official Logo Emblem"
                width={280}
                height={280}
                className="object-contain"
              />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#8F6B1F] font-semibold">
              The Sovereign Emblem
            </span>
            <h2 className="font-serif text-3xl font-semibold text-[#0B0B0B]">
              The Story of the Interlocking Cs
            </h2>
            <p className="text-sm text-[#6B6458] leading-relaxed font-light">
              Our emblem was born from two intersecting forces: one letter &quot;C&quot; forged in molten metallic gold, 
              representing radiant divinity and royalty; and the other in deep rich black, signifying unapologetic power 
              and timeless sophistication.
            </p>
            <p className="text-sm text-[#6B6458] leading-relaxed font-light">
              Through the center flows the silhouette of a woman in an evening gown—her posture poised, her back bare, 
              her train sweeping through the gold and black curves. At the crown rests the golden heart over the word &quot;Chic&quot;, 
              and beneath sits the diamond floral star ornament. It is our vow to you: whenever you wear our creation, you 
              <strong> Wear Confidence</strong>.
            </p>
          </div>
        </div>

        {/* 3 Pillars of Haute Craftsmanship */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="p-8 bg-[#141414] text-white rounded-xl border border-[#C9A24B]/30 shadow-md">
            <div className="w-10 h-10 rounded-full bg-gold-gradient text-[#0B0B0B] flex items-center justify-center font-bold text-sm mb-4">
              01
            </div>
            <h3 className="font-serif text-xl font-semibold text-white">Varanasi Looms</h3>
            <p className="text-xs text-[#E5DFC9]/80 mt-2 font-light leading-relaxed">
              We commission 4th-generation katan silk weavers who hand-cast pure silver and gold bullion zardozi threads into gossamer organza drapes.
            </p>
          </div>

          <div className="p-8 bg-[#141414] text-white rounded-xl border border-[#C9A24B]/30 shadow-md">
            <div className="w-10 h-10 rounded-full bg-gold-gradient text-[#0B0B0B] flex items-center justify-center font-bold text-sm mb-4">
              02
            </div>
            <h3 className="font-serif text-xl font-semibold text-white">Internal Corsetry</h3>
            <p className="text-xs text-[#E5DFC9]/80 mt-2 font-light leading-relaxed">
              Every gown incorporates flexible German spring steel and spiral boning, sculpting the waistline while ensuring 100% breathing comfort through long galas.
            </p>
          </div>

          <div className="p-8 bg-[#141414] text-white rounded-xl border border-[#C9A24B]/30 shadow-md">
            <div className="w-10 h-10 rounded-full bg-gold-gradient text-[#0B0B0B] flex items-center justify-center font-bold text-sm mb-4">
              03
            </div>
            <h3 className="font-serif text-xl font-semibold text-white">Grasse Olfactive Atelier</h3>
            <p className="text-xs text-[#E5DFC9]/80 mt-2 font-light leading-relaxed">
              Our haute perfumes and body elixirs are formulated with master noses in Grasse, France, using 35% pure extrait concentrations and organic 24k gold flakes.
            </p>
          </div>
        </div>

        {/* Founder's Letter */}
        <div className="bg-[#FAF8F5] p-8 sm:p-14 rounded-2xl border border-[#C9A24B]/30 shadow-sm max-w-4xl mx-auto text-center">
          <p className="text-xs uppercase tracking-widest text-[#8F6B1F] font-semibold mb-2">
            Founder&apos;s Letter
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#0B0B0B]">
            &ldquo;When a woman feels breathtaking, she is unstoppable.&rdquo;
          </h2>
          <p className="text-xs sm:text-sm text-[#6B6458] mt-4 leading-relaxed font-light max-w-2xl mx-auto">
            I built Chic Couture because I grew weary of compromises between ceremonial grandeur and wearable modern ease. 
            A gown should not be a cage. It should be a triumph. Thank you for welcoming our pieces into the most cherished 
            evenings of your life.
          </p>
          <div className="mt-6 flex flex-col items-center">
            <p className="font-script text-3xl text-[#8F6B1F] italic">Avanika Singhania</p>
            <p className="text-[11px] uppercase tracking-wider text-gray-500 mt-1">
              Creative Director &amp; Founder, Maison Chic Couture
            </p>
          </div>

          <div className="mt-8">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold-gradient text-[#0B0B0B] text-xs font-semibold uppercase tracking-widest rounded shadow hover:opacity-95"
            >
              <span>Explore The Current Collection</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
