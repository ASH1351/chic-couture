"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, ShoppingBag, Heart, ShieldCheck, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, isWishlisted, toggleWishlist } = useCart();
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const currentSize = selectedSize || product.sizes[0];
  const currentColor = selectedColor || product.colors[0]?.name;
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    addToCart(product, currentSize, currentColor, 1);
    setQuickViewProduct(null);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setQuickViewProduct(null)}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm"
        />

        <div className="min-h-screen px-4 text-center flex items-center justify-center py-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-4xl bg-[#FBF9F4] text-[#0B0B0B] rounded-lg shadow-2xl border border-[#C9A24B]/40 overflow-hidden relative text-left"
          >
            {/* Close Button */}
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white text-[#0B0B0B] rounded-full border border-[#C9A24B]/30 shadow-md transition-colors"
              aria-label="Close Quick View"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Product Gallery */}
              <div className="p-6 bg-[#F3EFE6] flex flex-col justify-between">
                <div className="relative aspect-[3/4] w-full rounded overflow-hidden border border-[#C9A24B]/20 bg-white">
                  <Image
                    src={product.images[selectedImageIdx] || product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {product.tag && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-gold-gradient text-[#0B0B0B] font-bold text-[10px] tracking-wider uppercase rounded shadow">
                      {product.tag}
                    </span>
                  )}
                </div>

                {/* Thumbnails */}
                {product.images.length > 1 && (
                  <div className="flex gap-2.5 mt-3">
                    {product.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImageIdx(idx)}
                        className={`relative w-16 h-20 rounded overflow-hidden border-2 transition-all ${
                          selectedImageIdx === idx ? "border-[#C9A24B] scale-105" : "border-transparent opacity-70"
                        }`}
                      >
                        <Image src={img} alt="" fill className="object-cover" sizes="64px" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info & Action */}
              <div className="p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-widest text-[#8F6B1F] font-semibold">
                      {product.categoryLabel}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-[#0B0B0B]">
                      <Star className="w-3.5 h-3.5 fill-[#C9A24B] text-[#C9A24B]" />
                      <span className="font-semibold">{product.rating}</span>
                      <span className="text-[#6B6458]">({product.reviewCount})</span>
                    </div>
                  </div>

                  <h2 className="font-serif text-2xl md:text-3xl font-medium mt-1 text-[#0B0B0B]">
                    {product.name}
                  </h2>
                  <p className="text-xs text-[#6B6458] mt-1">{product.subtitle}</p>

                  {/* Pricing */}
                  <div className="flex items-baseline gap-3 mt-4">
                    <span className="text-2xl font-bold font-serif gold-text-gradient">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                    {product.originalPrice && (
                      <>
                        <span className="text-sm text-[#6B6458] line-through">
                          ₹{product.originalPrice.toLocaleString("en-IN")}
                        </span>
                        <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                        </span>
                      </>
                    )}
                  </div>

                  <p className="text-xs text-[#6B6458] mt-3 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Colors */}
                  {product.colors && product.colors.length > 0 && (
                    <div className="mt-5">
                      <p className="text-xs font-medium text-[#0B0B0B] uppercase tracking-wider mb-2">
                        Color: <span className="font-semibold text-[#8F6B1F]">{currentColor}</span>
                      </p>
                      <div className="flex gap-2">
                        {product.colors.map((c) => (
                          <button
                            key={c.name}
                            onClick={() => setSelectedColor(c.name)}
                            className={`w-7 h-7 rounded-full border-2 transition-transform ${
                              currentColor === c.name ? "border-[#C9A24B] scale-110 ring-2 ring-[#C9A24B]/30" : "border-gray-300"
                            }`}
                            style={{ backgroundColor: c.hex }}
                            title={c.name}
                            aria-label={c.name}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Sizes */}
                  {product.sizes && product.sizes.length > 0 && (
                    <div className="mt-4">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-xs font-medium text-[#0B0B0B] uppercase tracking-wider">
                          Size: <span className="font-semibold text-[#8F6B1F]">{currentSize}</span>
                        </p>
                        <span className="text-[11px] text-[#8F6B1F] underline cursor-pointer">
                          Bespoke Fit Guide
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {product.sizes.map((s) => (
                          <button
                            key={s}
                            onClick={() => setSelectedSize(s)}
                            className={`px-3 py-1.5 text-xs font-medium border transition-colors ${
                              currentSize === s
                                ? "bg-[#0B0B0B] text-white border-[#0B0B0B]"
                                : "bg-white text-[#0B0B0B] border-[#C9A24B]/30 hover:border-[#C9A24B]"
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Stock countdown */}
                  {product.stockCount <= 5 && (
                    <div className="mt-3 text-[11px] text-[#8F6B1F] font-medium flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                      Only {product.stockCount} pieces left in atelier inventory
                    </div>
                  )}
                </div>

                {/* CTAs */}
                <div className="mt-6 pt-4 border-t border-[#C9A24B]/20 space-y-2.5">
                  <div className="flex gap-2">
                    <button
                      onClick={handleAddToCart}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-gold-gradient text-[#0B0B0B] font-semibold text-xs tracking-widest uppercase hover:opacity-95 transition-opacity shadow"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Shopping Bag</span>
                    </button>
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className={`p-3 border rounded transition-colors ${
                        wishlisted
                          ? "border-[#C9A24B] bg-[#C9A24B]/15 text-[#C9A24B]"
                          : "border-[#C9A24B]/40 hover:border-[#C9A24B] text-[#0B0B0B]"
                      }`}
                      aria-label="Wishlist"
                    >
                      <Heart className={`w-4 h-4 ${wishlisted ? "fill-current" : ""}`} />
                    </button>
                  </div>

                  <Link
                    href={`/product/${product.id}`}
                    onClick={() => setQuickViewProduct(null)}
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 text-xs text-[#0B0B0B] hover:text-[#8F6B1F] font-medium transition-colors"
                  >
                    <span>View Full Product Dossier & Care Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <div className="flex items-center justify-center gap-4 text-[11px] text-[#6B6458] pt-1">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#C9A24B]" /> Authentic Atelier
                    </span>
                    <span>•</span>
                    <span>Free Shipping &gt; ₹2,999</span>
                    <span>•</span>
                    <span>7-Day Return</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
