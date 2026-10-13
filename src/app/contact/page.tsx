"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Sparkles,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import { GoldDivider } from "@/components/ui/GoldDivider";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    service: "bridal",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const faqs = [
    {
      q: "How does bespoke custom tailoring work at Chic Couture?",
      a: "Our private styling concierge will connect with you via video call or WhatsApp to record 14 exact anatomical measurements. Your custom corseted garment is assembled by our master tailors and dispatched within 7–10 days.",
    },
    {
      q: "What is your complimentary shipping policy?",
      a: "We offer complimentary express white-glove shipping on all pan-India orders exceeding ₹2,999. Orders below this receive courier delivery for a flat ₹350. Worldwide shipping is dispatched via DHL Express.",
    },
    {
      q: "Can I try a piece at home before committing?",
      a: "Yes. We offer 7-day hassle-free doorstep returns and exchanges. Our courier partner picks up the piece directly from your address in its original garment bag.",
    },
    {
      q: "How do I book a private fitting at the Mumbai or Delhi salons?",
      a: "You can book directly through the concierge form on this page or message us on WhatsApp (+91 98765 43210). Private appointments include a one-on-one consultation with a senior couturière.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen bg-[#FBF9F4] text-[#0B0B0B] py-12 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F3EFE6] border border-[#C9A24B]/30 rounded-full text-xs uppercase tracking-widest text-[#8F6B1F] font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
              <span>Private Client Concierge</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl font-semibold tracking-tight text-[#0B0B0B]">
              At Your Service
            </h1>
            <p className="mt-3 text-sm sm:text-base text-[#6B6458] font-light leading-relaxed">
              Book a private salon fitting, enquire about custom bridal orders, or request personal stylist assistance.
            </p>
            <GoldDivider withTagline={true} className="my-6" />
          </div>

          {/* Contact Split: Form Left, Salon Addresses Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
            {/* Concierge Form (7 cols) */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-[#C9A24B]/30 shadow-md">
              <h2 className="font-serif text-2xl font-semibold text-[#0B0B0B] mb-2">
                Bespoke Fitting &amp; Styling Inquiry
              </h2>
              <p className="text-xs text-[#6B6458] mb-6">
                Our concierge will respond within 4 business hours to arrange your consultation.
              </p>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs uppercase tracking-wider font-semibold block mb-1 text-[#0B0B0B]">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Shalini Roy"
                        className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-gray-300 rounded text-xs focus:outline-none focus:border-[#C9A24B]"
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wider font-semibold block mb-1 text-[#0B0B0B]">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-gray-300 rounded text-xs focus:outline-none focus:border-[#C9A24B]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs uppercase tracking-wider font-semibold block mb-1 text-[#0B0B0B]">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@example.com"
                        className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-gray-300 rounded text-xs focus:outline-none focus:border-[#C9A24B]"
                      />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wider font-semibold block mb-1 text-[#0B0B0B]">
                        Occasion / Event Date
                      </label>
                      <input
                        type="date"
                        value={formData.eventDate}
                        onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-gray-300 rounded text-xs focus:outline-none focus:border-[#C9A24B]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-wider font-semibold block mb-1 text-[#0B0B0B]">
                      Service Required
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-gray-300 rounded text-xs focus:outline-none focus:border-[#C9A24B]"
                    >
                      <option value="bridal">Bridal &amp; Wedding Trousseau</option>
                      <option value="gala">Red Carpet &amp; Evening Gala Gown</option>
                      <option value="fitting">In-Salon Private Fitting Appointment</option>
                      <option value="custom">Bespoke Size Customization</option>
                      <option value="corporate">VIP Corporate Stylist Order</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-wider font-semibold block mb-1 text-[#0B0B0B]">
                      Styling Notes &amp; Requests
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Specify your preferred color palette, silhouettes, or specific pieces from our lookbook..."
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-gray-300 rounded text-xs focus:outline-none focus:border-[#C9A24B]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-gold-gradient text-[#0B0B0B] font-bold text-xs uppercase tracking-widest rounded shadow hover:opacity-95 transition-opacity"
                  >
                    Submit Concierge Request
                  </button>
                </form>
              ) : (
                <div className="p-8 text-center bg-[#FAF8F5] border border-[#C9A24B] rounded-xl space-y-3">
                  <div className="w-12 h-12 rounded-full bg-gold-gradient text-[#0B0B0B] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-[#0B0B0B]">
                    Request Confirmed
                  </h3>
                  <p className="text-xs text-[#6B6458] max-w-sm mx-auto leading-relaxed">
                    Thank you, {formData.name}. A senior stylist from Maison Chic Couture has received your dossier and will reach out via WhatsApp / phone within 4 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 px-4 py-2 text-xs text-[#8F6B1F] underline font-semibold"
                  >
                    Submit another request
                  </button>
                </div>
              )}
            </div>

            {/* Salons & Hotline (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* WhatsApp direct card */}
              <div className="p-6 bg-[#0B0B0B] text-white rounded-2xl border border-[#C9A24B]/40 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-white">Instant WhatsApp Concierge</h3>
                    <p className="text-xs text-[#E6C879]">Direct Atelier Stylist Chat</p>
                  </div>
                </div>
                <p className="text-xs text-[#E5DFC9]/80 mt-3 font-light leading-relaxed">
                  Have a quick question about sizing, stock availability, or express delivery? Tap below to chat immediately.
                </p>
                <a
                  href="https://wa.me/919876543210?text=Hello%20Maison%20Chic%20Couture,%20I%20would%20like%20to%20enquire%20about%20bespoke%20orders."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center justify-center gap-2 py-3 bg-[#25D366] text-white font-semibold text-xs uppercase tracking-wider rounded hover:bg-[#20ba59] transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Start Live Chat (+91 98765 43210)</span>
                </a>
              </div>

              {/* Physical Flagship Salons */}
              <div className="p-6 bg-white rounded-2xl border border-[#C9A24B]/30 shadow-sm space-y-4">
                <h3 className="font-serif text-lg font-semibold text-[#0B0B0B]">
                  Flagship Boutiques
                </h3>

                <div className="space-y-3.5 text-xs text-[#6B6458]">
                  <div className="p-3 rounded bg-[#FAF8F5] border border-[#C9A24B]/20">
                    <p className="font-serif font-bold text-sm text-[#0B0B0B]">Mumbai Flagship Salon</p>
                    <p className="mt-1">14 Altamount Road, Cumballa Hill, Mumbai 400026</p>
                    <p className="text-[#8F6B1F] mt-1 font-medium">Mon - Sat: 11:00 AM – 8:00 PM</p>
                  </div>

                  <div className="p-3 rounded bg-[#FAF8F5] border border-[#C9A24B]/20">
                    <p className="font-serif font-bold text-sm text-[#0B0B0B]">New Delhi Salon</p>
                    <p className="mt-1">DLF Emporio Mall, Ground Floor, Vasant Kunj, New Delhi 110070</p>
                    <p className="text-[#8F6B1F] mt-1 font-medium">Daily: 11:00 AM – 9:00 PM</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#C9A24B]/20 flex flex-col gap-1.5 text-xs">
                  <a href="tel:+919876543210" className="flex items-center gap-2 text-[#0B0B0B] hover:text-[#8F6B1F]">
                    <Phone className="w-3.5 h-3.5 text-[#C9A24B]" />
                    <span>Hotline: +91 (022) 8765 4321</span>
                  </a>
                  <a href="mailto:concierge@chiccouture.com" className="flex items-center gap-2 text-[#0B0B0B] hover:text-[#8F6B1F]">
                    <Mail className="w-3.5 h-3.5 text-[#C9A24B]" />
                    <span>concierge@chiccouture.com</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Accordion Section */}
          <div className="max-w-3xl mx-auto pt-8 border-t border-[#C9A24B]/20">
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-center text-[#0B0B0B] mb-8">
              Frequently Asked Inquiries
            </h2>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-lg border border-[#C9A24B]/25 overflow-hidden transition-all shadow-sm"
                  >
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full p-4 text-left flex justify-between items-center text-xs sm:text-sm font-semibold text-[#0B0B0B]"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#C9A24B] shrink-0 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 text-xs text-[#6B6458] leading-relaxed border-t border-gray-100 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
