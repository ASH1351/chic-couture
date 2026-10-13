"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, ShoppingBag, Menu, X, Sparkles, ArrowRight } from "lucide-react";
import { BrandLogo } from "./BrandLogo";
import { useCart } from "@/context/CartContext";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { cartCount, wishlistCount, setIsCartOpen, setIsWishlistOpen, setIsSearchOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when pathname changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "New Arrivals", href: "/shop?filter=new" },
    { name: "Collections", href: "/#collections" },
    { name: "Shop", href: "/shop" },
    { name: "Lookbook", href: "/lookbook" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Announcement Ribbon */}
      <div className="bg-[#0B0B0B] text-[#E6C879] text-[11px] font-medium tracking-widest uppercase py-2 px-4 border-b border-[#C9A24B]/30 select-none overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-2">
            <Sparkles className="w-3 h-3 text-[#E6C879]" />
            <span>Maison Chic Couture Atelier</span>
          </div>

          <div className="flex-1 sm:flex-initial text-center text-[10px] sm:text-[11px] font-semibold tracking-wider">
            <span>Complimentary Bespoke Fitting & Free Shipping &gt; ₹2,999 • Code: </span>
            <span className="text-white underline underline-offset-2">CHIC10</span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-[10px] text-[#E5DFC9]">
            <Link href="/about" className="hover:text-white transition-colors">Atelier Heritage</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-white transition-colors">Flagship Stores</Link>
          </div>
        </div>
      </div>

      {/* Main Glass Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "glass-ivory border-b border-[#C9A24B]/35 shadow-sm py-3"
            : "bg-[#FBF9F4]/90 backdrop-blur-md py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo (Left) */}
          <div className="flex items-center">
            <BrandLogo size="md" variant="full" />
          </div>

          {/* Desktop Navigation Links (Center) */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative group text-xs uppercase tracking-widest font-medium text-[#0B0B0B] hover:text-[#8F6B1F] py-1 transition-colors"
                >
                  <span>{link.name}</span>
                  {/* Gold Underline Slide-In on Hover */}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-gold-gradient transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons (Search, Wishlist, Cart, Mobile Toggle) */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-[#0B0B0B] hover:text-[#8F6B1F] rounded-full hover:bg-[#E6C879]/20 transition-all flex items-center gap-1.5"
              aria-label="Search Collection"
              title="Search (⌘K)"
            >
              <Search className="w-5 h-5" />
              <span className="hidden xl:inline text-[11px] text-[#6B6458] border border-[#C9A24B]/40 px-1.5 py-0.5 rounded font-mono">
                ⌘K
              </span>
            </button>

            {/* Wishlist Trigger */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2 text-[#0B0B0B] hover:text-[#8F6B1F] rounded-full hover:bg-[#E6C879]/20 transition-all"
              aria-label="Open Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#0B0B0B] text-[#E6C879] text-[10px] font-bold flex items-center justify-center border border-[#C9A24B]"
                >
                  {wishlistCount}
                </motion.span>
              )}
            </button>

            {/* Cart Trigger with Pop Animation */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-[#0B0B0B] hover:text-[#8F6B1F] rounded-full hover:bg-[#E6C879]/20 transition-all group"
              aria-label="Open Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform" />
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                  className="absolute top-1 right-1 w-4 h-4 rounded-full bg-gold-gradient text-[#0B0B0B] text-[10px] font-bold flex items-center justify-center shadow"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#0B0B0B] hover:text-[#8F6B1F] rounded-full hover:bg-[#E6C879]/20 transition-all"
              aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Slide-in Menu with Staggered Link Animation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed inset-0 z-50 bg-[#0B0B0B] text-white flex flex-col justify-between p-6 overflow-y-auto lg:hidden"
          >
            {/* Top Bar inside Drawer */}
            <div className="flex items-center justify-between border-b border-[#C9A24B]/30 pb-4">
              <BrandLogo size="md" variant="full" isDark={true} />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-[#E6C879] hover:text-white rounded-full border border-[#C9A24B]/30"
                aria-label="Close Navigation"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Staggered Navigation Links */}
            <div className="py-8 space-y-4">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * idx, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between py-2 text-xl font-serif tracking-wider text-white hover:text-[#E6C879] transition-colors group"
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="w-4 h-4 text-[#C9A24B] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile Footer Area */}
            <div className="pt-6 border-t border-[#C9A24B]/30 space-y-4">
              <div className="flex items-center justify-between text-xs text-[#E6C879]">
                <span>Concierge: +91 98765 43210</span>
                <span>concierge@chiccouture.com</span>
              </div>

              <div className="text-center pt-2">
                <p className="font-script text-2xl text-[#E6C879] italic">Wear Confidence</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">
                  Maison Chic Couture • Haute Luxury
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
