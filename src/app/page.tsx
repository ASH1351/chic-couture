import React from "react";
import { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { MarqueeStrip } from "@/components/sections/MarqueeStrip";
import { CategoriesSection } from "@/components/sections/CategoriesSection";
import { FeaturedProductsSection } from "@/components/sections/FeaturedProductsSection";
import { EditorialBanner } from "@/components/sections/EditorialBanner";
import { LookbookSection } from "@/components/sections/LookbookSection";
import { WhyChicCouture } from "@/components/sections/WhyChicCouture";
import { BeautyEditSection } from "@/components/sections/BeautyEditSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { InstagramFeedSection } from "@/components/sections/InstagramFeedSection";
import { NewsletterSection } from "@/components/sections/NewsletterSection";

export const metadata: Metadata = {
  title: "Chic Couture | Women's Fashion, Designer Dresses & Luxury Boutique",
  description:
    "Discover award-level luxury fashion at Chic Couture. Handcrafted evening gowns, zardozi organza sarees, designer silk co-ords, and haute parfumerie. Wear Confidence.",
  alternates: {
    canonical: "https://chiccouture.com",
  },
  openGraph: {
    title: "Chic Couture | Wear Confidence - Luxury Fashion & Boutique",
    description:
      "Award-level luxury fashion house. Discover bespoke evening wear, designer sarees, co-ords, and haute parfumerie.",
    url: "https://chiccouture.com",
    siteName: "Chic Couture",
    images: [
      {
        url: "/chic-couture-logo.png",
        width: 1200,
        height: 630,
        alt: "Chic Couture Brand Emblem",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#FBF9F4] text-[#0B0B0B] selection:bg-[#C9A24B] selection:text-[#0B0B0B]">
      {/* 1. Hero Section (Full Viewport) */}
      <HeroSection />

      {/* 2. Marquee Strip */}
      <MarqueeStrip />

      {/* 3. Shop by Category */}
      <CategoriesSection />

      {/* 4. New Arrivals & Featured Products */}
      <FeaturedProductsSection />

      {/* 5. Editorial Banner (Style That Speaks Before You Do) */}
      <EditorialBanner />

      {/* 6. Lookbook & Style Gallery with Hotspots */}
      <LookbookSection />

      {/* 7. Why Chic Couture (Dark Velvet Section with Animated Counters) */}
      <WhyChicCouture />

      {/* 8. Beauty & Style Edit */}
      <BeautyEditSection />

      {/* 9. Testimonials Carousel */}
      <TestimonialsSection />

      {/* 10. Instagram Feed Grid */}
      <InstagramFeedSection />

      {/* 11. Newsletter Luxury Signup */}
      <NewsletterSection />
    </main>
  );
}
