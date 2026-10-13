"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Sparkles, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    couponCode,
    applyCoupon,
    removeCoupon,
    subtotal,
    discountAmount,
    shippingFee,
    freeShippingThreshold,
    freeShippingProgress,
    total,
  } = useCart();

  const [inputCode, setInputCode] = useState("");
  const [couponError, setCouponError] = useState("");

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const res = applyCoupon(inputCode);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError("");
      setInputCode("");
    }
  };

  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer Container */}
          <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="w-screen max-w-md bg-[#FBF9F4] text-[#0B0B0B] shadow-2xl flex flex-col border-l border-[#C9A24B]/30"
            >
              {/* Header */}
              <div className="p-6 border-b border-[#C9A24B]/20 flex items-center justify-between bg-[#FBF9F4]">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-5 h-5 text-[#C9A24B]" />
                  <h2 className="font-serif text-xl tracking-wide uppercase font-semibold">
                    Shopping Bag ({cart.reduce((sum, item) => sum + item.quantity, 0)})
                  </h2>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 text-[#6B6458] hover:text-[#0B0B0B] transition-colors rounded-full hover:bg-[#E6C879]/20"
                  aria-label="Close Bag"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Progress Bar */}
              <div className="px-6 py-3.5 bg-[#F3EFE6] border-b border-[#C9A24B]/15 text-xs text-[#0B0B0B]">
                {remainingForFreeShipping > 0 ? (
                  <p className="flex items-center gap-1.5 font-medium">
                    <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
                    Add <span className="font-bold text-[#8F6B1F]">₹{remainingForFreeShipping.toLocaleString("en-IN")}</span> more for complimentary express delivery
                  </p>
                ) : (
                  <p className="flex items-center gap-1.5 font-medium text-[#1A4D2E]">
                    <Check className="w-3.5 h-3.5 text-[#1A4D2E]" />
                    You’ve unlocked Complimentary White-Glove Shipping!
                  </p>
                )}
                <div className="w-full bg-[#E5DFC9] h-1.5 rounded-full mt-2 overflow-hidden">
                  <motion.div
                    className="h-full bg-gold-gradient rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${freeShippingProgress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-5">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-16">
                    <div className="w-16 h-16 rounded-full bg-[#E6C879]/20 flex items-center justify-center mb-4">
                      <ShoppingBag className="w-8 h-8 text-[#C9A24B]" />
                    </div>
                    <p className="font-serif text-2xl mb-2 text-[#0B0B0B]">Your Bag is Empty</p>
                    <p className="text-[#6B6458] text-sm max-w-xs mb-6">
                      Explore our couture creations and elevate your wardrobe with timeless pieces.
                    </p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="px-6 py-2.5 bg-[#0B0B0B] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#8F6B1F] transition-colors"
                    >
                      Explore New Arrivals
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 pb-5 border-b border-[#C9A24B]/15 last:border-b-0"
                    >
                      <div className="relative w-20 h-28 bg-[#F3EFE6] shrink-0 overflow-hidden rounded border border-[#C9A24B]/20">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h3 className="font-serif text-base font-medium line-clamp-1 text-[#0B0B0B]">
                              {item.name}
                            </h3>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-[#6B6458] hover:text-[#C9A24B] p-1 transition-colors"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex items-center gap-2 mt-1 text-xs text-[#6B6458]">
                            <span className="px-1.5 py-0.5 bg-[#E6C879]/25 rounded text-[11px] font-medium text-[#4A3810]">
                              {item.size}
                            </span>
                            <span>•</span>
                            <span>{item.color}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          {/* Quantity selector */}
                          <div className="flex items-center border border-[#C9A24B]/40 rounded">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:bg-[#E6C879]/20 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3 text-[#0B0B0B]" />
                            </button>
                            <span className="px-2.5 text-xs font-semibold text-[#0B0B0B]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:bg-[#E6C879]/20 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3 text-[#0B0B0B]" />
                            </button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <p className="font-semibold text-sm text-[#0B0B0B]">
                              ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                            </p>
                            {item.originalPrice && (
                              <p className="text-[11px] text-[#6B6458] line-through">
                                ₹{(item.originalPrice * item.quantity).toLocaleString("en-IN")}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer / Checkout */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-[#C9A24B]/20 bg-[#F3EFE6] space-y-4">
                  {/* Privilege Coupon Form */}
                  {!couponCode ? (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Privilege Code (try CHIC10)"
                        value={inputCode}
                        onChange={(e) => {
                          setInputCode(e.target.value);
                          setCouponError("");
                        }}
                        className="flex-1 bg-white border border-[#C9A24B]/40 px-3 py-2 text-xs uppercase placeholder:normal-case placeholder:text-gray-400 focus:outline-none focus:border-[#C9A24B]"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#0B0B0B] text-white text-xs font-medium uppercase tracking-wider hover:bg-[#8F6B1F] transition-colors"
                      >
                        Apply
                      </button>
                    </form>
                  ) : (
                    <div className="flex items-center justify-between bg-white border border-[#C9A24B]/50 px-3 py-2 rounded text-xs">
                      <div className="flex items-center gap-1.5 text-[#8F6B1F] font-semibold">
                        <Sparkles className="w-3.5 h-3.5" />
                        Privilege code: {couponCode} (-10%)
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-red-700 hover:underline text-[11px] font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  )}

                  {couponError && <p className="text-red-600 text-xs">{couponError}</p>}

                  {/* Pricing Breakdown */}
                  <div className="space-y-1.5 text-xs text-[#6B6458]">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-[#0B0B0B] font-medium">₹{subtotal.toLocaleString("en-IN")}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-[#8F6B1F] font-medium">
                        <span>Chic Circle Privilege (10%)</span>
                        <span>-₹{discountAmount.toLocaleString("en-IN")}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Express Shipping</span>
                      <span className="text-[#0B0B0B] font-medium">
                        {shippingFee === 0 ? "Complimentary" : `₹${shippingFee}`}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-[#C9A24B]/20 flex justify-between text-base font-serif text-[#0B0B0B] font-semibold">
                      <span>Total</span>
                      <span className="gold-text-gradient font-bold">₹{total.toLocaleString("en-IN")}</span>
                    </div>
                  </div>

                  {/* Checkout CTA */}
                  <Link
                    href="/checkout"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-gold-gradient text-[#0B0B0B] font-semibold text-xs tracking-widest uppercase shadow-md hover:opacity-95 transition-all group"
                  >
                    <span>Proceed to Concierge Checkout</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <p className="text-center text-[10px] text-[#6B6458] tracking-wider uppercase">
                    Tax Included • 7-Day Doorstep Returns • 100% Authentic
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
