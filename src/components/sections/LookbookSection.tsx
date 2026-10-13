"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Eye, ShoppingBag, X, ArrowRight } from "lucide-react";
import { lookbookItems } from "@/data/lookbook";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { LookbookItem } from "@/types";

export const LookbookSection: React.FC = () => {
  const { setQuickViewProduct, addToCart } = useCart();
  const [activeHotspot, setActiveHotspot] = useState<{
    itemId: string;
    hotspotIdx: number;
  } | null>(null);
  const [lightboxItem, setLightboxItem] = useState<LookbookItem | null>(null);

  const handleHotspotAction = (productId: string) => {
    const found = products.find((p) => p.id === productId);
    if (found) {
      setQuickViewProduct(found);
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-[#FBF9F4] select-none border-b border-[#C9A24B]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#8F6B1F] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
              <span>Runway to Wardrobe</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0B0B0B]">
              Lookbook &amp; Style Gallery
            </h2>
            <p className="mt-3 text-sm text-[#6B6458] max-w-xl font-light">
              Tap the pulsating gold hotspots on our runway captures to inspect and shop individual atelier pieces directly.
            </p>
          </div>

          <Link
            href="/lookbook"
            className="mt-6 md:mt-0 inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#0B0B0B] hover:text-[#8F6B1F] group transition-colors"
          >
            <span>Explore Complete Lookbook</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#C9A24B]" />
          </Link>
        </div>

        {/* Asymmetric Masonry Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {lookbookItems.map((item, idx) => {
            const isWide = idx === 0 || idx === 3;
            const colSpan = isWide ? "md:col-span-7" : "md:col-span-5";

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                className={`${colSpan} relative group rounded-xl overflow-hidden bg-[#F3EFE6] border border-[#C9A24B]/25 shadow-md hover:shadow-2xl transition-all duration-500`}
              >
                {/* Lookbook Image Container */}
                <div className="relative aspect-[4/5] sm:aspect-[3/4] md:aspect-auto md:h-[520px] w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-1000 ease-out"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                  {/* Hotspots */}
                  {item.hotspots.map((hs, hsIdx) => {
                    const isHotspotActive =
                      activeHotspot?.itemId === item.id && activeHotspot?.hotspotIdx === hsIdx;

                    return (
                      <div
                        key={hsIdx}
                        className="absolute z-20"
                        style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                      >
                        {/* Pulsating Trigger Dot */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveHotspot(
                              isHotspotActive ? null : { itemId: item.id, hotspotIdx: hsIdx }
                            );
                          }}
                          className="relative flex items-center justify-center w-8 h-8 rounded-full bg-[#0B0B0B]/80 text-[#E6C879] border-2 border-[#C9A24B] shadow-xl hover:scale-110 transition-transform"
                          aria-label={`Shop ${hs.title}`}
                        >
                          <span className="absolute inset-0 rounded-full bg-[#C9A24B]/40 animate-ping pointer-events-none" />
                          <span className="text-xs font-bold">+</span>
                        </button>

                        {/* Interactive Tooltip Card */}
                        <AnimatePresence>
                          {isHotspotActive && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9, y: 8 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.9, y: 8 }}
                              className="absolute left-1/2 -translate-x-1/2 top-10 w-60 p-3 bg-white/95 text-[#0B0B0B] rounded-lg shadow-2xl border border-[#C9A24B] z-30 backdrop-blur-md"
                            >
                              <div className="flex justify-between items-start">
                                <span className="text-[9px] uppercase tracking-wider text-[#8F6B1F] font-bold">
                                  Shop The Look
                                </span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveHotspot(null);
                                  }}
                                  className="text-gray-400 hover:text-black p-0.5"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              <p className="font-serif text-xs font-semibold mt-1 text-[#0B0B0B] line-clamp-1">
                                {hs.title}
                              </p>
                              <p className="font-semibold text-xs text-[#8F6B1F] mt-0.5">
                                ₹{hs.price.toLocaleString("en-IN")}
                              </p>

                              <div className="mt-2.5 pt-2 border-t border-gray-100 flex gap-2">
                                <button
                                  onClick={() => handleHotspotAction(hs.productId)}
                                  className="flex-1 py-1.5 bg-[#0B0B0B] text-white text-[10px] uppercase tracking-wider font-semibold hover:bg-[#8F6B1F] transition-colors rounded"
                                >
                                  Quick View
                                </button>
                                <button
                                  onClick={() => {
                                    const p = products.find((prod) => prod.id === hs.productId);
                                    if (p) addToCart(p);
                                  }}
                                  className="p-1.5 bg-gold-gradient text-[#0B0B0B] rounded hover:opacity-90"
                                  title="Add to Bag"
                                >
                                  <ShoppingBag className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}

                  {/* Bottom Image Info */}
                  <div className="absolute bottom-5 inset-x-5 text-white flex items-end justify-between z-10">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[#E6C879] font-semibold">
                        {item.season}
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl font-medium mt-0.5 text-white">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#E5DFC9]/80 font-light mt-1 hidden sm:block max-w-sm">
                        {item.description}
                      </p>
                    </div>

                    {/* Lightbox trigger */}
                    <button
                      onClick={() => setLightboxItem(item)}
                      className="p-2.5 rounded-full bg-white/20 backdrop-blur-md border border-[#C9A24B]/40 hover:bg-[#C9A24B] hover:text-[#0B0B0B] text-white transition-colors"
                      aria-label="Enlarge Look"
                      title="Enlarge Look"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-4xl w-full bg-[#0B0B0B] border border-[#C9A24B]/40 rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
              <button
                onClick={() => setLightboxItem(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:text-[#E6C879]"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative aspect-[3/4] md:w-3/5 h-[480px] md:h-[620px]">
                <Image
                  src={lightboxItem.image}
                  alt={lightboxItem.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-8 md:w-2/5 flex flex-col justify-between text-white bg-[#0B0B0B]">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#E6C879] font-semibold">
                    {lightboxItem.season}
                  </span>
                  <h3 className="font-serif text-2xl font-medium mt-1">{lightboxItem.title}</h3>
                  <p className="text-xs text-gray-400 mt-1">Model: {lightboxItem.model}</p>

                  <p className="text-xs text-[#E5DFC9]/80 mt-4 leading-relaxed font-light">
                    {lightboxItem.description}
                  </p>

                  <div className="mt-6 pt-6 border-t border-white/10">
                    <p className="text-[11px] uppercase tracking-widest text-[#E6C879] font-semibold mb-3">
                      Pieces In This Look
                    </p>
                    <div className="space-y-3">
                      {lightboxItem.hotspots.map((hs, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2.5 bg-white/5 rounded border border-[#C9A24B]/20"
                        >
                          <div>
                            <p className="font-serif text-xs font-semibold text-white">{hs.title}</p>
                            <p className="text-xs text-[#E6C879] font-medium">
                              ₹{hs.price.toLocaleString("en-IN")}
                            </p>
                          </div>
                          <button
                            onClick={() => {
                              setLightboxItem(null);
                              handleHotspotAction(hs.productId);
                            }}
                            className="px-3 py-1 bg-gold-gradient text-[#0B0B0B] text-[10px] uppercase font-bold tracking-wider rounded"
                          >
                            Inspect
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <p className="font-script text-2xl text-[#E6C879] text-center italic">
                    Wear Confidence
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
