"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";

export const WishlistDrawer: React.FC = () => {
  const { wishlist, isWishlistOpen, setIsWishlistOpen, toggleWishlist, addToCart } = useCart();

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsWishlistOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="w-screen max-w-md bg-[#FBF9F4] text-[#0B0B0B] shadow-2xl flex flex-col border-l border-[#C9A24B]/30"
            >
              <div className="p-6 border-b border-[#C9A24B]/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-[#C9A24B] fill-[#C9A24B]" />
                  <h2 className="font-serif text-xl tracking-wide uppercase font-semibold">
                    Saved Pieces ({wishlistedProducts.length})
                  </h2>
                </div>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="p-2 text-[#6B6458] hover:text-[#0B0B0B] rounded-full hover:bg-[#E6C879]/20"
                  aria-label="Close Wishlist"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {wishlistedProducts.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-16">
                    <div className="w-16 h-16 rounded-full bg-[#E6C879]/20 flex items-center justify-center mb-4">
                      <Heart className="w-8 h-8 text-[#C9A24B]" />
                    </div>
                    <p className="font-serif text-2xl mb-2">No Saved Pieces Yet</p>
                    <p className="text-[#6B6458] text-sm max-w-xs mb-6">
                      Click the heart on any couture piece to curate your personal runway collection.
                    </p>
                    <button
                      onClick={() => setIsWishlistOpen(false)}
                      className="px-6 py-2.5 bg-[#0B0B0B] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#8F6B1F] transition-colors"
                    >
                      Browse Collections
                    </button>
                  </div>
                ) : (
                  wishlistedProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex gap-4 p-3 bg-white border border-[#C9A24B]/20 rounded-sm hover:border-[#C9A24B]/60 transition-all"
                    >
                      <Link
                        href={`/product/${product.id}`}
                        onClick={() => setIsWishlistOpen(false)}
                        className="relative w-20 h-28 bg-[#F3EFE6] shrink-0 overflow-hidden rounded"
                      >
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </Link>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-1">
                            <Link
                              href={`/product/${product.id}`}
                              onClick={() => setIsWishlistOpen(false)}
                              className="font-serif text-sm font-medium line-clamp-1 hover:text-[#8F6B1F]"
                            >
                              {product.name}
                            </Link>
                            <button
                              onClick={() => toggleWishlist(product.id)}
                              className="text-[#6B6458] hover:text-red-500 p-0.5"
                              aria-label="Remove from wishlist"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-xs text-[#8F6B1F] mt-0.5">{product.categoryLabel}</p>
                          <p className="font-semibold text-sm mt-1 text-[#0B0B0B]">
                            ₹{product.price.toLocaleString("en-IN")}
                          </p>
                        </div>

                        <button
                          onClick={() => {
                            addToCart(product);
                            toggleWishlist(product.id);
                          }}
                          className="mt-2 flex items-center justify-center gap-2 py-2 bg-[#0B0B0B] text-white text-xs tracking-wider uppercase font-medium hover:bg-[#8F6B1F] transition-colors"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Move to Bag</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {wishlistedProducts.length > 0 && (
                <div className="p-6 border-t border-[#C9A24B]/20 bg-[#F3EFE6]">
                  <Link
                    href="/shop"
                    onClick={() => setIsWishlistOpen(false)}
                    className="w-full flex items-center justify-center gap-2 py-3 border border-[#0B0B0B] text-[#0B0B0B] text-xs font-semibold tracking-widest uppercase hover:bg-[#0B0B0B] hover:text-white transition-colors"
                  >
                    <span>Continue Exploring</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
