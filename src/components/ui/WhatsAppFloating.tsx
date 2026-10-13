"use client";

import React, { useState } from "react";
import { MessageCircle, Phone, X } from "lucide-react";

export const WhatsAppFloating: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappUrl =
    "https://wa.me/919876543210?text=Hello%20Maison%20Chic%20Couture,%20I%20would%20like%20to%20enquire%20about%20bespoke%20styling%20and%20orders.";

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Concierge Mini Card */}
      {isOpen && (
        <div className="mb-3 w-72 bg-[#0B0B0B] text-white p-4 rounded-lg shadow-2xl border border-[#C9A24B]/40 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gold-gradient flex items-center justify-center text-[#0B0B0B] font-bold text-xs">
                CC
              </div>
              <div>
                <p className="font-serif text-sm font-semibold text-white">Maison Stylist Concierge</p>
                <p className="text-[10px] text-[#E6C879]">Online • Instant Assistance</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white p-0.5"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-[#E5DFC9] mt-3 leading-relaxed">
            Need guidance on bespoke sizing, fabric draping, or delivery timelines? Our styling atelier is at your service.
          </p>

          <div className="mt-3.5 pt-3 border-t border-[#C9A24B]/20 flex flex-col gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2 bg-[#25D366] text-white text-xs font-semibold rounded hover:bg-[#20ba59] transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
            <a
              href="tel:+919876543210"
              className="w-full flex items-center justify-center gap-2 py-2 bg-[#1A1A1A] hover:bg-[#252525] text-xs text-[#E6C879] rounded border border-[#C9A24B]/30 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Atelier (+91 98765 43210)</span>
            </a>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#0B0B0B] text-white border-2 border-[#C9A24B] shadow-2xl hover:scale-105 transition-all duration-300"
        aria-label="Contact Maison Stylist Concierge"
      >
        <div className="absolute inset-0 rounded-full bg-[#C9A24B]/20 animate-ping opacity-75 pointer-events-none" />
        <MessageCircle className="w-6 h-6 text-[#E6C879] group-hover:rotate-12 transition-transform" />
      </button>
    </div>
  );
};
