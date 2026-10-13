"use client";

import React from "react";

interface GoldDividerProps {
  className?: string;
  withTagline?: boolean;
  withHearts?: boolean;
  taglineText?: string;
  isDark?: boolean;
}

export const GoldDivider: React.FC<GoldDividerProps> = ({
  className = "",
  withTagline = false,
  withHearts = true,
  taglineText = "Wear Confidence",
  isDark = false,
}) => {
  return (
    <div className={`flex flex-col items-center justify-center my-6 select-none ${className}`}>
      {/* Central Thin Gold Divider with Diamond Motif */}
      <div className="flex items-center justify-center w-full max-w-md gap-3">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C9A24B]/50 to-[#C9A24B]" />
        
        {/* Diamond Floral Star from Logo */}
        <div className="relative flex items-center justify-center">
          <svg
            className="w-4 h-4 text-[#C9A24B] drop-shadow-sm transition-transform duration-500 hover:rotate-90"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
            <circle cx="12" cy="12" r="2" fill={isDark ? "#0B0B0B" : "#FBF9F4"} />
          </svg>
        </div>

        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#C9A24B]/50 to-[#C9A24B]" />
      </div>

      {/* Script Tagline with Tiny Gold Hearts */}
      {withTagline && (
        <div className="flex items-center justify-center gap-3 mt-2.5">
          {withHearts && (
            <svg
              className="w-3 h-3 text-[#C9A24B] fill-current animate-pulse-subtle"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          )}
          
          <span
            className={`text-2xl md:text-3xl font-script tracking-wide italic ${
              isDark ? "text-[#E6C879]" : "text-[#0B0B0B]"
            }`}
          >
            {taglineText}
          </span>

          {withHearts && (
            <svg
              className="w-3 h-3 text-[#C9A24B] fill-current animate-pulse-subtle"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          )}
        </div>
      )}
    </div>
  );
};
