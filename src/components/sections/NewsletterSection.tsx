"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Sparkles, CheckCircle2, Copy, Check, ArrowRight } from "lucide-react";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { useCart } from "@/context/CartContext";

export const NewsletterSection: React.FC = () => {
  const { applyCoupon } = useCart();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please provide a valid email address.");
      return;
    }

    setError("");
    setIsSubmitted(true);
    applyCoupon("CHIC10");

    // Luxury gold confetti explosion
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ["#C9A24B", "#E6C879", "#8F6B1F", "#0B0B0B", "#FFF5D6"],
      });
    } catch {
      // ignore
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText("CHIC10");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="py-20 lg:py-28 bg-[#FBF9F4] select-none">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl bg-[#0B0B0B] text-white p-8 sm:p-14 border border-[#C9A24B]/40 shadow-2xl overflow-hidden text-center">
          {/* Subtle gold radial background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-[#C9A24B]/20 blur-[100px] pointer-events-none" />

          {/* Top Diamond Ornament */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24B]" />
            <Sparkles className="w-4 h-4 text-[#E6C879]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24B]" />
          </div>

          <span className="text-xs uppercase tracking-[0.25em] text-[#E6C879] font-semibold">
            Private Atelier Circle
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white mt-2">
            Join the Chic Circle
          </h2>

          <p className="max-w-md mx-auto text-xs sm:text-sm text-[#E5DFC9]/80 font-light mt-3 leading-relaxed">
            Receive 10% off your inaugural couture piece, private preview invites to fashion week runways, and bespoke styling advice.
          </p>

          <GoldDivider isDark={true} withTagline={false} className="my-6 max-w-xs mx-auto" />

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-6">
              <div className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3.5 bg-white/10 border border-[#C9A24B]/40 rounded text-xs text-white placeholder:text-gray-400 focus:outline-none focus:border-[#E6C879] focus:ring-1 focus:ring-[#E6C879]"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-gold-gradient text-[#0B0B0B] font-semibold text-xs uppercase tracking-widest rounded hover:opacity-95 transition-opacity flex items-center justify-center gap-1.5 shadow-lg shrink-0"
                >
                  <span>Join Privé</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {error && <p className="text-xs text-red-400 mt-2 font-medium">{error}</p>}

              <p className="text-[10px] text-gray-500 mt-3 tracking-wider uppercase">
                Privacy guaranteed. We never compromise on discretion.
              </p>
            </form>
          ) : (
            <div className="max-w-md mx-auto mt-6 p-6 bg-white/5 border border-[#C9A24B] rounded-xl text-center animate-in fade-in zoom-in-95 duration-300">
              <div className="w-12 h-12 rounded-full bg-gold-gradient text-[#0B0B0B] flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-white">
                Welcome to the Chic Circle
              </h3>
              <p className="text-xs text-[#E5DFC9]/80 mt-1">
                Your 10% welcome privilege has been automatically applied to your shopping bag!
              </p>

              <div className="mt-4 p-3 bg-black/60 rounded border border-[#C9A24B]/50 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest block">
                    Your Exclusive Code
                  </span>
                  <span className="font-mono text-base font-bold gold-text-gradient tracking-widest">
                    CHIC10
                  </span>
                </div>
                <button
                  onClick={copyCode}
                  className="flex items-center gap-1 px-3 py-1.5 bg-[#C9A24B]/20 hover:bg-[#C9A24B]/30 border border-[#C9A24B] text-[#E6C879] rounded text-xs transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
