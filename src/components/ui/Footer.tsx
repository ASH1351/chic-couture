"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp, Phone, Mail, MapPin } from "lucide-react";
import { BrandLogo } from "./BrandLogo";
import { GoldDivider } from "./GoldDivider";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0B0B0B] text-white pt-16 pb-12 border-t border-[#C9A24B]/30 relative overflow-hidden select-none">
      {/* Background ambient gold glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-[#C9A24B]/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Centered Brand Header */}
        <div className="flex flex-col items-center text-center">
          <BrandLogo size="lg" variant="full" isDark={true} />
          
          {/* Thin Gold Divider with Diamond Ornament */}
          <div className="w-full max-w-xl my-4">
            <GoldDivider isDark={true} withTagline={false} />
          </div>

          <p className="max-w-lg text-xs md:text-sm text-[#E5DFC9]/80 font-light tracking-wide leading-relaxed">
            Maison Chic Couture is dedicated to timeless haute couture, master artisan embroidery, and the unyielding empowerment of the modern woman.
          </p>
        </div>

        {/* 4 Link Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 my-14 text-xs">
          {/* Column 1: Shop */}
          <div>
            <h3 className="font-serif text-sm uppercase tracking-widest text-[#E6C879] font-semibold mb-4">
              Couture Capsules
            </h3>
            <ul className="space-y-2.5 text-[#E5DFC9]/75 font-light">
              <li>
                <Link href="/shop?category=gowns" className="hover:text-white transition-colors">
                  Evening & Gala Gowns
                </Link>
              </li>
              <li>
                <Link href="/shop?category=ethnic" className="hover:text-white transition-colors">
                  Zardozi & Organza Sarees
                </Link>
              </li>
              <li>
                <Link href="/shop?category=coords" className="hover:text-white transition-colors">
                  Designer Silk Co-ords
                </Link>
              </li>
              <li>
                <Link href="/shop?category=western" className="hover:text-white transition-colors">
                  Western Pret & Midis
                </Link>
              </li>
              <li>
                <Link href="/shop?category=beauty" className="hover:text-white transition-colors">
                  Haute Parfumerie & Beauty
                </Link>
              </li>
              <li>
                <Link href="/shop?category=accessories" className="hover:text-white transition-colors">
                  Atelier Minaudières & Jewels
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Customer Concierge */}
          <div>
            <h3 className="font-serif text-sm uppercase tracking-widest text-[#E6C879] font-semibold mb-4">
              Client Concierge
            </h3>
            <ul className="space-y-2.5 text-[#E5DFC9]/75 font-light">
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Book a Private Atelier Fitting
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  Bespoke Sizing & Customization
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Track Your Bespoke Order
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Complimentary Pan-India Delivery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  7-Day White-Glove Returns
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Couture Fabric Care Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: The Maison */}
          <div>
            <h3 className="font-serif text-sm uppercase tracking-widest text-[#E6C879] font-semibold mb-4">
              The Maison
            </h3>
            <ul className="space-y-2.5 text-[#E5DFC9]/75 font-light">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Our Atelier Heritage
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Master Artisans of Varanasi & Mumbai
                </Link>
              </li>
              <li>
                <Link href="/lookbook" className="hover:text-white transition-colors">
                  Runway Lookbooks & Campaigns
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Ethical Silk & Zero-Waste Patterning
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Founder&apos;s Letter & Philosophy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Atelier Salons & Contact */}
          <div>
            <h3 className="font-serif text-sm uppercase tracking-widest text-[#E6C879] font-semibold mb-4">
              Flagship Salons
            </h3>
            <div className="space-y-3 text-[#E5DFC9]/75 font-light text-[11px] leading-relaxed">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C9A24B] shrink-0 mt-0.5" />
                <span>
                  <strong>Mumbai Flagship:</strong> 14 Altamount Road, Cumballa Hill, Mumbai 400026
                </span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C9A24B] shrink-0 mt-0.5" />
                <span>
                  <strong>Delhi Salon:</strong> DLF Emporio Mall, Vasant Kunj, New Delhi 110070
                </span>
              </div>
              <div className="flex items-center gap-2 pt-2 text-white">
                <Phone className="w-3.5 h-3.5 text-[#C9A24B]" />
                <a href="tel:+919876543210" className="hover:text-[#E6C879]">
                  +91 (022) 8765 4321
                </a>
              </div>
              <div className="flex items-center gap-2 text-white">
                <Mail className="w-3.5 h-3.5 text-[#C9A24B]" />
                <a href="mailto:concierge@chiccouture.com" className="hover:text-[#E6C879]">
                  concierge@chiccouture.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Social Icons & Payment Badges */}
        <div className="pt-8 border-t border-[#C9A24B]/20 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Social Links */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] uppercase tracking-wider text-[#E6C879]">Follow The Runway:</span>
            <div className="flex gap-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-[#C9A24B]/30 flex items-center justify-center text-gray-300 hover:text-white hover:border-[#C9A24B] transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-[#C9A24B]/30 flex items-center justify-center text-gray-300 hover:text-white hover:border-[#C9A24B] transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-[#C9A24B]/30 flex items-center justify-center text-gray-300 hover:text-white hover:border-[#C9A24B] transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
                  <polygon points="10 15 15 12 10 9 10 15" fill="currentColor"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Payment badges */}
          <div className="flex items-center gap-2 flex-wrap justify-center text-[10px] text-gray-400 font-medium">
            <span className="px-2 py-1 bg-white/5 border border-white/10 rounded">UPI</span>
            <span className="px-2 py-1 bg-white/5 border border-white/10 rounded">VISA</span>
            <span className="px-2 py-1 bg-white/5 border border-white/10 rounded">MASTERCARD</span>
            <span className="px-2 py-1 bg-white/5 border border-white/10 rounded">AMEX</span>
            <span className="px-2 py-1 bg-white/5 border border-white/10 rounded">RUPAY</span>
            <span className="px-2 py-1 bg-white/5 border border-white/10 rounded">APPLE PAY</span>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 border border-[#C9A24B]/40 rounded text-xs uppercase tracking-wider text-[#E6C879] hover:bg-[#C9A24B]/20 transition-all group"
            aria-label="Scroll back to top"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        {/* Bottom Tagline & Legal */}
        <div className="mt-12 pt-6 border-t border-white/5 text-center flex flex-col items-center">
          {/* "Wear Confidence" Script Sign-Off */}
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 text-[#C9A24B] fill-current">♥</span>
            <span className="font-script text-3xl md:text-4xl text-[#E6C879] italic tracking-wide">
              Wear Confidence
            </span>
            <span className="w-2 h-2 text-[#C9A24B] fill-current">♥</span>
          </div>

          <p className="text-[11px] text-gray-500 mt-3 tracking-widest uppercase">
            © {new Date().getFullYear()} Chic Couture Haute Maison. All Rights Reserved. Designed for Award-Level Excellence.
          </p>
        </div>
      </div>
    </footer>
  );
};
