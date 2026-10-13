"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen } = useCart();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      }
      if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  const filtered = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.categoryLabel.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase()) ||
          p.tag?.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const trendingTags = [
    "Velvet Gowns",
    "Zardozi Saree",
    "Silk Co-ords",
    "Gold Pleated",
    "Haute Parfumerie",
    "Minaudière",
  ];

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSearchOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          <div className="min-h-screen px-4 text-center flex items-start justify-center pt-20 pb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-3xl bg-[#FBF9F4] text-[#0B0B0B] rounded-lg shadow-2xl border border-[#C9A24B]/40 overflow-hidden relative text-left"
            >
              {/* Search Bar Input */}
              <div className="p-6 border-b border-[#C9A24B]/20 flex items-center gap-4 bg-white">
                <Search className="w-6 h-6 text-[#C9A24B] shrink-0" />
                <input
                  type="text"
                  placeholder="Search gowns, sarees, silk co-ords, beauty..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoFocus
                  className="w-full bg-transparent text-lg md:text-xl font-serif text-[#0B0B0B] placeholder:text-[#6B6458]/60 focus:outline-none"
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="p-2 text-[#6B6458] hover:text-[#0B0B0B] rounded-full hover:bg-gray-100"
                  aria-label="Close Search"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Trending suggestions */}
              {!query && (
                <div className="p-6 bg-[#FBF9F4]">
                  <p className="text-xs uppercase tracking-widest text-[#8F6B1F] font-semibold mb-3 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Trending Runway Searches
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {trendingTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setQuery(tag)}
                        className="px-3.5 py-1.5 text-xs bg-white border border-[#C9A24B]/30 rounded-full hover:border-[#C9A24B] hover:text-[#8F6B1F] transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-[#C9A24B]/15">
                    <p className="text-xs uppercase tracking-widest text-[#6B6458] font-semibold mb-4">
                      Featured Recommendations
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {products.slice(0, 3).map((p) => (
                        <Link
                          key={p.id}
                          href={`/product/${p.id}`}
                          onClick={() => setIsSearchOpen(false)}
                          className="group flex flex-col p-2 bg-white rounded border border-[#C9A24B]/15 hover:border-[#C9A24B]/50 transition-all"
                        >
                          <div className="relative aspect-[3/4] w-full rounded overflow-hidden mb-2 bg-[#F3EFE6]">
                            <Image
                              src={p.images[0]}
                              alt={p.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                              sizes="200px"
                            />
                          </div>
                          <span className="font-serif text-xs font-medium line-clamp-1 group-hover:text-[#8F6B1F]">
                            {p.name}
                          </span>
                          <span className="text-xs font-semibold text-[#0B0B0B] mt-0.5">
                            ₹{p.price.toLocaleString("en-IN")}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Results */}
              {query && (
                <div className="max-h-[60vh] overflow-y-auto p-6 space-y-3 bg-[#FBF9F4]">
                  {filtered.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="font-serif text-xl text-[#0B0B0B]">No couture pieces found</p>
                      <p className="text-xs text-[#6B6458] mt-1">
                        Try searching for &quot;velvet&quot;, &quot;silk&quot;, &quot;saree&quot;, or &quot;parfum&quot;.
                      </p>
                    </div>
                  ) : (
                    <>
                      <p className="text-xs uppercase tracking-widest text-[#6B6458] font-semibold mb-3">
                        Found {filtered.length} piece{filtered.length > 1 ? "s" : ""}
                      </p>
                      <div className="space-y-2.5">
                        {filtered.map((item) => (
                          <Link
                            key={item.id}
                            href={`/product/${item.id}`}
                            onClick={() => setIsSearchOpen(false)}
                            className="flex items-center gap-4 p-3 bg-white rounded border border-[#C9A24B]/20 hover:border-[#C9A24B] hover:shadow-md transition-all group"
                          >
                            <div className="relative w-14 h-18 bg-[#F3EFE6] rounded overflow-hidden shrink-0">
                              <Image
                                src={item.images[0]}
                                alt={item.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                sizes="56px"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-serif text-sm font-medium text-[#0B0B0B] group-hover:text-[#8F6B1F] truncate">
                                  {item.name}
                                </span>
                                {item.tag && (
                                  <span className="px-1.5 py-0.2 bg-[#E6C879]/30 text-[10px] text-[#4A3810] font-semibold rounded">
                                    {item.tag}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-[#6B6458] truncate">{item.subtitle}</p>
                              <p className="text-xs font-semibold text-[#0B0B0B] mt-1">
                                ₹{item.price.toLocaleString("en-IN")}
                              </p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-[#C9A24B] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
