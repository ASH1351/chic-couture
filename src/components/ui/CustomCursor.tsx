"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const cursorX = useSpring(-100, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(-100, { stiffness: 500, damping: 28 });
  const dotX = useSpring(-100, { stiffness: 1000, damping: 35 });
  const dotY = useSpring(-100, { stiffness: 1000, damping: 35 });

  useEffect(() => {
    // Only activate cursor on pointer fine devices (desktops)
    const isPointerFine = window.matchMedia("(pointer: fine)").matches;
    if (!isPointerFine) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const checkHoverable = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactiveEl = target.closest("a, button, input, select, textarea, [data-cursor-hover]");
      setIsHovered(!!interactiveEl);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", checkHoverable);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", checkHoverable);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, dotX, dotY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* Outer Gold Ring */}
      <motion.div
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#C9A24B] pointer-events-none"
        style={{
          x: cursorX,
          y: cursorY,
          width: isHovered ? 48 : 26,
          height: isHovered ? 48 : 26,
          backgroundColor: isHovered ? "rgba(201, 162, 75, 0.15)" : "transparent",
          boxShadow: isHovered ? "0 0 15px rgba(230, 200, 121, 0.4)" : "none",
          transition: "width 0.2s cubic-bezier(0.16, 1, 0.3, 1), height 0.2s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s ease",
        }}
      />
      {/* Inner Pinpoint */}
      <motion.div
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#C9A24B] rounded-full pointer-events-none"
        style={{
          x: dotX,
          y: dotY,
        }}
      />
    </div>
  );
};
