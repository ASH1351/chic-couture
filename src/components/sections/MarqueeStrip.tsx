"use client";

import React from "react";

export const MarqueeStrip: React.FC = () => {
  const marqueeItems = [
    "NEW ARRIVALS",
    "COMPLIMENTARY EXPRESS SHIPPING",
    "7-DAY WHITE-GLOVE RETURNS",
    "WEAR CONFIDENCE",
    "HANDCRAFTED IN OUR ATELIER",
    "BESPOKE BRIDAL & COUTURE",
    "HAUTE PARFUMERIE",
    "100% PURE MULBERRY SILK",
  ];

  return (
    <div className="bg-[#0B0B0B] text-[#E6C879] py-4 border-y border-[#C9A24B]/40 overflow-hidden select-none relative z-20">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...Array(4)].map((_, repeatIdx) => (
          <div key={repeatIdx} className="flex items-center shrink-0">
            {marqueeItems.map((item, idx) => (
              <div key={idx} className="flex items-center mx-4 sm:mx-6">
                <span className="text-xs sm:text-sm uppercase tracking-[0.25em] font-semibold text-[#E6C879] hover:text-white transition-colors cursor-default">
                  {item}
                </span>
                <span className="ml-4 sm:ml-6 text-[#C9A24B] text-xs">◆</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
