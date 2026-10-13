"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface BrandLogoProps {
  className?: string;
  variant?: "full" | "mark-only" | "image-only";
  size?: "sm" | "md" | "lg" | "xl";
  isDark?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = "",
  variant = "full",
  size = "md",
  isDark = false,
}) => {
  const sizeClasses = {
    sm: "h-8",
    md: "h-12",
    lg: "h-16",
    xl: "h-24",
  };

  const imageSizes = {
    sm: { width: 34, height: 34 },
    md: { width: 52, height: 52 },
    lg: { width: 68, height: 68 },
    xl: { width: 100, height: 100 },
  };

  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-3.5 tracking-wider transition-opacity hover:opacity-95 select-none ${className}`}
      aria-label="Chic Couture Home"
    >
      {/* Brand Mark: The official logo image from the brand */}
      <div className="relative shrink-0 overflow-hidden rounded-full ring-1 ring-[#C9A24B]/30 p-0.5 bg-gradient-to-br from-[#E6C879]/20 to-transparent">
        <Image
          src="/chic-couture-logo.png"
          alt="Chic Couture Brand Mark"
          width={imageSizes[size].width}
          height={imageSizes[size].height}
          className="object-cover rounded-full transition-transform duration-500 group-hover:scale-105"
          priority
        />
      </div>

      {variant === "full" && (
        <div className="flex flex-col">
          {/* Chic in Gold, Couture in Black/White */}
          <div className="flex items-baseline gap-1.5 leading-none">
            <span className="font-serif text-xl md:text-2xl font-bold tracking-tight gold-text-gradient drop-shadow-sm">
              Chic
            </span>
            <span
              className={`font-serif text-xl md:text-2xl font-semibold tracking-tight transition-colors ${
                isDark ? "text-white" : "text-[#0B0B0B]"
              }`}
            >
              Couture
            </span>
          </div>

          {/* Tagline */}
          <span
            className={`font-script text-xs md:text-sm tracking-wide -mt-0.5 transition-colors ${
              isDark ? "text-[#E6C879]/90" : "text-[#8F6B1F]"
            }`}
          >
            Wear Confidence
          </span>
        </div>
      )}
    </Link>
  );
};
