"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ShoppingBag, Eye, Star } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";

export const BeautyEditSection: React.FC = () => {
  const { setQuickViewProduct, addToCart } = useCart();
  const beautyProducts = products.filter(
    (p) => p.category === "beauty" || p.category === "accessories"
  );

  return (
    <section className="py-20 lg:py-28 bg-[#FBF9F4] select-none border-b border-[#C9A24B]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F3EFE6] border border-[#C9A24B]/30 rounded-full text-xs uppercase tracking-widest text-[#8F6B1F] font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
            <span>Haute Parfumerie &amp; Accessories</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#0B0B0B]">
            The Beauty &amp; Style Edit
          </h2>
          <p className="mt-3 text-sm text-[#6B6458] font-light leading-relaxed">
            The finishing touch to your couture silhouette. Hand-poured French extrait de parfum, 24k gold body elixirs, and sculpted brass minaudieres.
          </p>
        </div>

        {/* 2-Column Split: Featured Scent Hero + Curated Products */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Atmospheric Editorial Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-xl border border-[#C9A24B]/30 bg-[#F3EFE6]">
              <Image
                src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1200&auto=format&fit=crop"
                alt="Haute Parfumerie Flacon"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute bottom-6 inset-x-6 text-white">
                <span className="text-[10px] uppercase tracking-widest text-[#E6C879] font-bold">
                  Signature Scent
                </span>
                <h3 className="font-serif text-2xl font-semibold text-white mt-1">
                  Sovereign Extrait de Parfum
                </h3>
                <p className="text-xs text-[#E5DFC9]/80 mt-1 font-light">
                  Cambodian Agarwood • Bulgarian Rose • Molten Amber • 35% Pure Extrait
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-serif font-bold text-lg gold-text-gradient">₹11,500</span>
                  <Link
                    href="/product/sovereign-oud-amber-parfum"
                    className="px-4 py-2 bg-gold-gradient text-[#0B0B0B] text-xs font-semibold uppercase tracking-wider rounded-none hover:opacity-90"
                  >
                    Inspect Scent
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Curated Grid of Beauty & Jewels (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {beautyProducts.slice(0, 4).map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group flex flex-col p-4 bg-white rounded-lg border border-[#C9A24B]/20 hover:border-[#C9A24B] shadow-sm hover:shadow-lg transition-all"
              >
                <div className="relative aspect-square w-full rounded overflow-hidden bg-[#F3EFE6] mb-3">
                  <Image
                    src={item.images[0]}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, 30vw"
                  />
                  {item.tag && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 bg-gold-gradient text-[#0B0B0B] font-bold text-[9px] uppercase tracking-wider rounded">
                      {item.tag}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="uppercase text-[10px] text-[#8F6B1F] font-semibold tracking-wider">
                    {item.categoryLabel}
                  </span>
                  <div className="flex items-center gap-1 text-[#0B0B0B]">
                    <Star className="w-3 h-3 fill-[#C9A24B] text-[#C9A24B]" />
                    <span className="font-semibold text-xs">{item.rating}</span>
                  </div>
                </div>

                <Link href={`/product/${item.id}`} className="hover:text-[#8F6B1F] transition-colors">
                  <h4 className="font-serif text-sm font-semibold text-[#0B0B0B] line-clamp-1">
                    {item.name}
                  </h4>
                </Link>
                <p className="text-[11px] text-[#6B6458] line-clamp-1 mt-0.5">{item.subtitle}</p>

                <div className="mt-3 pt-3 border-t border-[#C9A24B]/15 flex items-center justify-between">
                  <span className="font-serif font-bold text-sm text-[#0B0B0B]">
                    ₹{item.price.toLocaleString("en-IN")}
                  </span>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setQuickViewProduct(item)}
                      className="p-1.5 border border-[#C9A24B]/30 rounded hover:border-[#C9A24B] text-[#0B0B0B]"
                      title="Quick View"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => addToCart(item)}
                      className="px-2.5 py-1.5 bg-[#0B0B0B] hover:bg-[#8F6B1F] text-white text-[10px] uppercase tracking-wider font-semibold rounded flex items-center gap-1 transition-colors"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
