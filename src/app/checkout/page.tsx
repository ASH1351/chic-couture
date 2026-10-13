"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import confetti from "canvas-confetti";
import {
  ShoppingBag,
  ShieldCheck,
  CreditCard,
  Truck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const {
    cart,
    subtotal,
    discountAmount,
    shippingFee,
    total,
    couponCode,
    clearCart,
  } = useCart();

  const [step, setStep] = useState<"shipping" | "confirmed">("shipping");
  const [formData, setFormData] = useState({
    firstName: "Avanika",
    lastName: "Singhania",
    email: "avanika.s@example.com",
    phone: "+91 98765 43210",
    address: "B-402, Imperial Heights, Altamount Road",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400026",
    paymentMethod: "upi",
  });
  const [orderId, setOrderId] = useState("");

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `CC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderId(generatedId);
    setStep("confirmed");

    // Confetti celebration
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#C9A24B", "#E6C879", "#8F6B1F", "#0B0B0B"],
      });
    } catch {}

    clearCart();
  };

  return (
    <main className="min-h-screen bg-[#FBF9F4] text-[#0B0B0B] py-10 sm:py-16 select-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Header */}
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-widest text-[#8F6B1F] font-semibold">
            Concierge Checkout
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight mt-1 text-[#0B0B0B]">
            Maison Order Dossier
          </h1>
        </div>

        {step === "shipping" ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Form Left (7 cols) */}
            <form onSubmit={handlePlaceOrder} className="lg:col-span-7 space-y-8">
              {/* Shipping Address */}
              <div className="p-6 sm:p-8 bg-white rounded-xl border border-[#C9A24B]/30 shadow-sm space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-[#C9A24B]/20">
                  <Truck className="w-5 h-5 text-[#C9A24B]" />
                  <h2 className="font-serif text-lg font-semibold uppercase">
                    1. White-Glove Delivery Address
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider block mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAF8F5] border border-gray-300 rounded text-xs focus:outline-none focus:border-[#C9A24B]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider block mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAF8F5] border border-gray-300 rounded text-xs focus:outline-none focus:border-[#C9A24B]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAF8F5] border border-gray-300 rounded text-xs focus:outline-none focus:border-[#C9A24B]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider block mb-1">
                      Phone Number (For Concierge Updates)
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAF8F5] border border-gray-300 rounded text-xs focus:outline-none focus:border-[#C9A24B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider block mb-1">
                    Street Address &amp; Suite / Villa
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-gray-300 rounded text-xs focus:outline-none focus:border-[#C9A24B]"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider block mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAF8F5] border border-gray-300 rounded text-xs focus:outline-none focus:border-[#C9A24B]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider block mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAF8F5] border border-gray-300 rounded text-xs focus:outline-none focus:border-[#C9A24B]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider block mb-1">
                      PIN Code
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAF8F5] border border-gray-300 rounded text-xs focus:outline-none focus:border-[#C9A24B]"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="p-6 sm:p-8 bg-white rounded-xl border border-[#C9A24B]/30 shadow-sm space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-[#C9A24B]/20">
                  <CreditCard className="w-5 h-5 text-[#C9A24B]" />
                  <h2 className="font-serif text-lg font-semibold uppercase">
                    2. Payment Method
                  </h2>
                </div>

                <div className="space-y-2.5">
                  {[
                    { id: "upi", label: "Instant UPI (Google Pay, PhonePe, Paytm)", sub: "Fastest verification & immediate dispatch" },
                    { id: "card", label: "Luxury Card (Visa, Mastercard, Amex, RuPay)", sub: "Secure 256-bit encrypted gateway" },
                    { id: "netbanking", label: "Net Banking (All Major Indian Banks)", sub: "HDFC, ICICI, SBI, Axis, Kotak" },
                    { id: "cod", label: "Concierge Pay on Delivery", sub: "Inspect at your doorstep before final payment" },
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-start gap-3 p-3.5 rounded border cursor-pointer transition-colors ${
                        formData.paymentMethod === method.id
                          ? "border-[#C9A24B] bg-[#E6C879]/15"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={formData.paymentMethod === method.id}
                        onChange={() => setFormData({ ...formData, paymentMethod: method.id })}
                        className="mt-1 accent-[#C9A24B]"
                      />
                      <div>
                        <p className="text-xs font-semibold text-[#0B0B0B]">{method.label}</p>
                        <p className="text-[11px] text-[#6B6458]">{method.sub}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gold-gradient text-[#0B0B0B] font-bold text-xs uppercase tracking-widest rounded shadow-xl hover:opacity-95 transition-all flex items-center justify-center gap-2"
              >
                <span>Confirm &amp; Place Couture Order • ₹{total.toLocaleString("en-IN")}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Order Summary Right (5 cols) */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-xl border border-[#C9A24B]/30 shadow-sm space-y-6 sticky top-24">
              <div className="flex items-center justify-between pb-3 border-b border-[#C9A24B]/20">
                <h2 className="font-serif text-lg font-semibold uppercase">
                  Bag Summary ({cart.length})
                </h2>
                <Link href="/shop" className="text-xs text-[#8F6B1F] hover:underline font-semibold">
                  Modify Bag
                </Link>
              </div>

              {cart.length === 0 ? (
                <p className="text-xs text-[#6B6458]">No items in your bag. Explore our collection.</p>
              ) : (
                <div className="space-y-3.5 max-h-72 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-3 items-center">
                      <div className="relative w-14 h-18 bg-[#F3EFE6] rounded overflow-hidden shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px" />
                      </div>
                      <div className="flex-1 min-w-0 text-xs">
                        <p className="font-serif font-semibold text-[#0B0B0B] truncate">{item.name}</p>
                        <p className="text-[11px] text-[#6B6458]">{item.size} • {item.color} • Qty {item.quantity}</p>
                        <p className="font-bold text-[#0B0B0B] mt-0.5">₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Pricing Breakdown */}
              <div className="pt-4 border-t border-[#C9A24B]/20 space-y-2 text-xs text-[#6B6458]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#0B0B0B]">₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#8F6B1F] font-semibold">
                    <span>Chic Circle Privilege (10%)</span>
                    <span>-₹{discountAmount.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Express White-Glove Shipping</span>
                  <span className="font-medium text-[#0B0B0B]">
                    {shippingFee === 0 ? "Complimentary" : `₹${shippingFee}`}
                  </span>
                </div>
                <div className="pt-3 border-t border-[#C9A24B]/30 flex justify-between text-base font-serif font-bold text-[#0B0B0B]">
                  <span>Total Amount</span>
                  <span className="gold-text-gradient">₹{total.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="p-3 bg-[#FAF8F5] rounded text-[11px] text-[#6B6458] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C9A24B] shrink-0" />
                <span>Protected by 256-bit SSL encryption. 7-day white-glove doorstep return guarantee.</span>
              </div>
            </div>
          </div>
        ) : (
          /* Order Confirmation Success Screen */
          <div className="max-w-2xl mx-auto bg-white p-8 sm:p-12 rounded-2xl border border-[#C9A24B] shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-gold-gradient text-[#0B0B0B] flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-[#8F6B1F] font-bold">
                Order Confirmed
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#0B0B0B] mt-1">
                Thank You for Choosing Elegance
              </h2>
              <p className="text-xs text-[#6B6458] mt-2">
                Order Reference: <strong className="font-mono text-sm text-[#0B0B0B]">{orderId}</strong>
              </p>
            </div>

            <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#C9A24B]/20 text-xs text-left space-y-2">
              <p><strong>Recipient:</strong> {formData.firstName} {formData.lastName}</p>
              <p><strong>Shipping To:</strong> {formData.address}, {formData.city}, {formData.state} - {formData.pincode}</p>
              <p><strong>Status:</strong> Hand-packing in signature Chic Couture black &amp; gold presentation box</p>
              <p><strong>Estimated Arrival:</strong> 2–4 Business Days via Express Courier</p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/shop"
                className="px-8 py-3.5 bg-gold-gradient text-[#0B0B0B] text-xs font-bold uppercase tracking-widest rounded shadow hover:opacity-95"
              >
                Continue Exploring Collections
              </Link>
              <Link
                href="/"
                className="px-8 py-3.5 border border-[#0B0B0B] text-[#0B0B0B] text-xs font-bold uppercase tracking-widest rounded hover:bg-black hover:text-white transition-colors"
              >
                Return to Maison Home
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
