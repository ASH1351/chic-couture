"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Eye, ShoppingBag, Star, Check } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, priority = false }) => {
  const { addToCart, isWishlisted, toggleWishlist, setQuickViewProduct } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "");
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || "");
  const [isHovered, setIsHovered] = useState(false);
  const [addedRecently, setAddedRecently] = useState(false);

  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selectedSize, selectedColor, 1);
    setAddedRecently(true);
    setTimeout(() => setAddedRecently(false), 2000);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      className="group flex flex-col bg-white rounded-lg border border-[#C9A24B]/20 hover:border-[#C9A24B]/70 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 relative select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with Second Image Hover Swap */}
      <div className="relative aspect-[3/4] w-full bg-[#F3EFE6] overflow-hidden">
        <Link href={`/product/${product.id}`} className="block w-full h-full relative">
          {/* Primary Image */}
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            priority={priority}
            className={`object-cover object-top transition-all duration-700 ease-out ${
              product.images[1] ? "group-hover:opacity-0" : "group-hover:scale-105"
            }`}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Secondary Hover Image (if available) */}
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt={`${product.name} alternate view`}
              fill
              className="object-cover object-top opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          )}
        </Link>

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.tag && (
            <span className="px-2 py-0.5 bg-gold-gradient text-[#0B0B0B] font-bold text-[9px] tracking-wider uppercase rounded shadow">
              {product.tag}
            </span>
          )}
          {product.stockCount <= 3 && (
            <span className="px-2 py-0.5 bg-black/80 text-[#E6C879] font-medium text-[9px] tracking-wider uppercase rounded backdrop-blur-sm border border-[#C9A24B]/40">
              Only {product.stockCount} Left
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            wishlisted
              ? "bg-[#C9A24B] text-[#0B0B0B] shadow"
              : "bg-white/80 hover:bg-white text-[#0B0B0B] backdrop-blur-sm shadow hover:scale-110"
          }`}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? "fill-current" : ""}`} />
        </button>

        {/* Quick View Button (Desktop overlay on hover) */}
        <div className="absolute bottom-3 inset-x-3 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleQuickView}
            className="flex-1 py-2 px-3 bg-white/95 hover:bg-white text-[#0B0B0B] text-[11px] font-semibold uppercase tracking-wider rounded backdrop-blur shadow flex items-center justify-center gap-1.5 border border-[#C9A24B]/30 hover:border-[#C9A24B] transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-[#C9A24B]" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-4 flex-1 flex flex-col justify-between bg-white">
        <div>
          {/* Category & Star Rating */}
          <div className="flex items-center justify-between text-[11px] mb-1">
            <span className="uppercase tracking-widest text-[#8F6B1F] font-semibold truncate">
              {product.categoryLabel}
            </span>
            <div className="flex items-center gap-1 text-[#0B0B0B] shrink-0">
              <Star className="w-3 h-3 fill-[#C9A24B] text-[#C9A24B]" />
              <span className="font-semibold text-[11px]">{product.rating}</span>
              <span className="text-gray-400 text-[10px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <Link href={`/product/${product.id}`} className="block group-hover:text-[#8F6B1F] transition-colors">
            <h3 className="font-serif text-base font-semibold text-[#0B0B0B] line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <p className="text-[11px] text-[#6B6458] line-clamp-1 mt-0.5">{product.subtitle}</p>

          {/* Pricing */}
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-serif text-base font-bold text-[#0B0B0B]">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-xs text-[#6B6458] line-through">
                  ₹{product.originalPrice.toLocaleString("en-IN")}
                </span>
                <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-1 rounded">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
                </span>
              </>
            )}
          </div>

          {/* Color Swatches */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 mt-2.5">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedColor(c.name);
                  }}
                  className={`w-3.5 h-3.5 rounded-full border transition-transform ${
                    selectedColor === c.name ? "border-[#C9A24B] scale-125 ring-1 ring-[#C9A24B]" : "border-gray-300"
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                  aria-label={c.name}
                />
              ))}
              <span className="text-[10px] text-gray-500 ml-1 truncate">{selectedColor}</span>
            </div>
          )}

          {/* Size Chips */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="flex items-center gap-1 mt-2.5 overflow-x-auto no-scrollbar py-0.5">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedSize(s);
                  }}
                  className={`px-1.5 py-0.5 text-[10px] font-medium border rounded transition-colors shrink-0 ${
                    selectedSize === s
                      ? "bg-[#0B0B0B] text-white border-[#0B0B0B]"
                      : "bg-[#FBF9F4] text-[#0B0B0B] border-[#C9A24B]/30 hover:border-[#C9A24B]"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Add to Cart Micro-Interaction Button */}
        <div className="mt-3.5 pt-3 border-t border-[#C9A24B]/15">
          <button
            onClick={handleAddToCart}
            className={`w-full py-2.5 px-3 rounded text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-all ${
              addedRecently
                ? "bg-emerald-700 text-white shadow-md"
                : "bg-[#0B0B0B] hover:bg-gold-gradient text-white hover:text-[#0B0B0B] shadow"
            }`}
          >
            {addedRecently ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
