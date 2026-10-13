"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Heart,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  ChevronDown,
  Ruler,
  Truck,
  RotateCcw,
  CheckCircle2,
  X,
  MessageCircle,
} from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { ProductCard } from "@/components/ui/ProductCard";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export const ProductDetailClient: React.FC<ProductDetailClientProps> = ({
  product,
  relatedProducts,
}) => {
  const { addToCart, isWishlisted, toggleWishlist } = useCart();
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "");
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || "");
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string>("fabric");
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState("");
  const [newReviewText, setNewReviewText] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [reviewsList, setReviewsList] = useState([
    {
      author: "Radhika Mehra",
      rating: 5,
      date: "2 days ago",
      title: "Couture quality beyond words",
      comment: "The hand-finishing on the lining and the weight of the silk are astounding. Arrived in a luxury garment bag.",
    },
    {
      author: "Pooja Singhal",
      rating: 5,
      date: "1 week ago",
      title: "Flattering corseted silhouette",
      comment: "Followed the size chart and the waist fits like a glove. Received countless compliments at the reception.",
    },
  ]);

  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewText.trim()) return;
    setReviewsList([
      {
        author: newReviewAuthor,
        rating: newReviewRating,
        date: "Just now",
        title: "Verified Couture Patron Review",
        comment: newReviewText,
      },
      ...reviewsList,
    ]);
    setReviewModalOpen(false);
    setNewReviewAuthor("");
    setNewReviewText("");
  };

  const productJsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: product.images,
    description: product.description,
    sku: product.id,
    offers: {
      "@type": "Offer",
      url: `https://chiccouture.com/product/${product.id}`,
      priceCurrency: "INR",
      price: product.price,
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Chic Couture",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <main className="min-h-screen bg-[#FBF9F4] text-[#0B0B0B] py-8 sm:py-12 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-[#6B6458] mb-8 font-light overflow-x-auto">
            <Link href="/" className="hover:text-[#0B0B0B]">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-[#0B0B0B]">Collections</Link>
            <span>/</span>
            <Link href={`/shop?category=${product.category}`} className="hover:text-[#0B0B0B]">
              {product.categoryLabel}
            </Link>
            <span>/</span>
            <span className="text-[#0B0B0B] font-medium truncate">{product.name}</span>
          </nav>

          {/* Product Hero Split: Gallery Left, Details Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Gallery (7 cols on desktop) */}
            <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
              {/* Vertical Thumbnail Rail */}
              {product.images.length > 1 && (
                <div className="flex sm:flex-col gap-3 shrink-0 overflow-x-auto sm:overflow-visible">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIdx(idx)}
                      className={`relative w-16 h-20 sm:w-20 sm:h-26 rounded overflow-hidden border-2 transition-all ${
                        selectedImageIdx === idx
                          ? "border-[#C9A24B] shadow-md scale-102"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image src={img} alt="" fill className="object-cover" sizes="80px" />
                    </button>
                  ))}
                </div>
              )}

              {/* Main Active Image with Zoom Frame */}
              <div className="relative flex-1 aspect-[3/4] bg-[#F3EFE6] rounded-xl overflow-hidden border border-[#C9A24B]/30 shadow-lg group">
                <Image
                  src={product.images[selectedImageIdx] || product.images[0]}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-115 cursor-crosshair"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />

                {product.tag && (
                  <span className="absolute top-4 left-4 px-3 py-1 bg-gold-gradient text-[#0B0B0B] font-bold text-xs tracking-wider uppercase rounded shadow">
                    {product.tag}
                  </span>
                )}

                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded text-[11px] text-[#E6C879] opacity-0 group-hover:opacity-100 transition-opacity">
                  Hover to inspect fabric weave
                </div>
              </div>
            </div>

            {/* Product Dossier / Ordering Panel (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                {/* Category & Rating */}
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="uppercase tracking-widest text-[#8F6B1F] font-bold">
                    {product.categoryLabel}
                  </span>
                  <div className="flex items-center gap-1.5 text-[#0B0B0B]">
                    <div className="flex text-[#C9A24B]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="font-semibold text-xs">{product.rating}</span>
                    <span className="text-[#6B6458]">({product.reviewCount} reviews)</span>
                  </div>
                </div>

                <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#0B0B0B] tracking-tight">
                  {product.name}
                </h1>
                <p className="text-sm text-[#6B6458] mt-1 font-light leading-relaxed">
                  {product.subtitle}
                </p>

                {/* Pricing & Stock Urgency */}
                <div className="mt-5 p-4 rounded-lg bg-white border border-[#C9A24B]/30">
                  <div className="flex items-baseline gap-3">
                    <span className="font-serif text-3xl font-bold gold-text-gradient">
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

                  <p className="text-[11px] text-[#6B6458] mt-1">
                    Inclusive of all luxury taxes • Complimentary Express Delivery Pan-India
                  </p>

                  {product.stockCount <= 4 && (
                    <div className="mt-3 text-xs text-[#8F6B1F] font-medium flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                      <span>Atelier Stock Alert: Only {product.stockCount} pieces available in this capsule</span>
                    </div>
                  )}
                </div>

                {/* Color Selection */}
                {product.colors && product.colors.length > 0 && (
                  <div className="mt-6">
                    <div className="flex items-center justify-between text-xs font-medium uppercase tracking-wider mb-2">
                      <span>Color: <strong className="text-[#8F6B1F]">{selectedColor}</strong></span>
                    </div>
                    <div className="flex gap-2.5">
                      {product.colors.map((c) => (
                        <button
                          key={c.name}
                          onClick={() => setSelectedColor(c.name)}
                          className={`w-8 h-8 rounded-full border-2 transition-transform ${
                            selectedColor === c.name
                              ? "border-[#C9A24B] scale-110 ring-2 ring-[#C9A24B]/30"
                              : "border-gray-300"
                          }`}
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                          aria-label={c.name}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selection & Size Guide */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="mt-6">
                    <div className="flex items-center justify-between text-xs uppercase tracking-wider mb-2">
                      <span>Select Size: <strong className="text-[#8F6B1F]">{selectedSize}</strong></span>
                      <button
                        onClick={() => setIsSizeGuideOpen(true)}
                        className="flex items-center gap-1 text-[#8F6B1F] hover:underline font-semibold"
                      >
                        <Ruler className="w-3.5 h-3.5" />
                        <span>Bespoke Size Guide</span>
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((s) => (
                        <button
                          key={s}
                          onClick={() => setSelectedSize(s)}
                          className={`px-4 py-2 text-xs font-medium border rounded transition-all ${
                            selectedSize === s
                              ? "bg-[#0B0B0B] text-white border-[#0B0B0B] shadow-sm"
                              : "bg-white text-[#0B0B0B] border-[#C9A24B]/40 hover:border-[#C9A24B]"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div className="mt-6 flex items-center gap-4">
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#0B0B0B]">
                    Quantity:
                  </span>
                  <div className="flex items-center border border-[#C9A24B]/40 rounded bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1.5 hover:bg-[#E6C879]/20 transition-colors text-xs font-semibold"
                    >
                      -
                    </button>
                    <span className="px-3 py-1.5 text-xs font-bold text-[#0B0B0B]">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1.5 hover:bg-[#E6C879]/20 transition-colors text-xs font-semibold"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="mt-8 space-y-3">
                  <div className="flex gap-3">
                    <button
                      onClick={handleAddToCart}
                      className="flex-1 py-4 bg-gold-gradient text-[#0B0B0B] font-bold text-xs uppercase tracking-widest rounded shadow-lg hover:opacity-95 transition-opacity flex items-center justify-center gap-2 group"
                    >
                      <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-110" />
                      <span>Add to Shopping Bag • ₹{(product.price * quantity).toLocaleString("en-IN")}</span>
                    </button>
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className={`p-4 border rounded transition-colors ${
                        wishlisted
                          ? "border-[#C9A24B] bg-[#C9A24B]/15 text-[#C9A24B]"
                          : "border-[#C9A24B]/40 hover:border-[#C9A24B] text-[#0B0B0B] bg-white"
                      }`}
                      aria-label="Wishlist"
                    >
                      <Heart className={`w-5 h-5 ${wishlisted ? "fill-current" : ""}`} />
                    </button>
                  </div>

                  {/* Stylist Concierge Assistance */}
                  <a
                    href={`https://wa.me/919876543210?text=Hello%20Maison%20Chic,%20I%20am%20enquiring%20about%20${encodeURIComponent(product.name)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 bg-[#0B0B0B] text-[#E6C879] hover:text-white rounded border border-[#C9A24B]/30 text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    <span>Enquire with Private Stylist on WhatsApp</span>
                  </a>
                </div>

                {/* Value Props Bar */}
                <div className="mt-8 pt-6 border-t border-[#C9A24B]/20 grid grid-cols-3 gap-2 text-center text-[10px] text-[#6B6458]">
                  <div className="flex flex-col items-center">
                    <ShieldCheck className="w-4 h-4 text-[#C9A24B] mb-1" />
                    <span>100% Authentic Haute Couture</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Truck className="w-4 h-4 text-[#C9A24B] mb-1" />
                    <span>Complimentary Express Delivery</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <RotateCcw className="w-4 h-4 text-[#C9A24B] mb-1" />
                    <span>7-Day White-Glove Returns</span>
                  </div>
                </div>
              </div>

              {/* Accordion Dossier */}
              <div className="mt-8 border-t border-[#C9A24B]/25 divide-y divide-[#C9A24B]/20">
                {/* Fabric & Care */}
                <div className="py-3.5">
                  <button
                    onClick={() => setActiveAccordion(activeAccordion === "fabric" ? "" : "fabric")}
                    className="w-full flex justify-between items-center text-xs font-serif text-base uppercase font-semibold text-left"
                  >
                    <span>Fabric &amp; Atelier Craftsmanship</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#C9A24B] transition-transform ${
                        activeAccordion === "fabric" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {activeAccordion === "fabric" && (
                    <div className="mt-2 text-xs text-[#6B6458] space-y-1.5 leading-relaxed">
                      <p><strong>Composition:</strong> {product.details.fabric}</p>
                      <p><strong>Provenance:</strong> {product.details.origin}</p>
                      <p><strong>Atelier Care:</strong> {product.details.care}</p>
                    </div>
                  )}
                </div>

                {/* Fit & Sizing */}
                <div className="py-3.5">
                  <button
                    onClick={() => setActiveAccordion(activeAccordion === "fit" ? "" : "fit")}
                    className="w-full flex justify-between items-center text-xs font-serif text-base uppercase font-semibold text-left"
                  >
                    <span>Silhouette &amp; Tailoring Fit</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#C9A24B] transition-transform ${
                        activeAccordion === "fit" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {activeAccordion === "fit" && (
                    <div className="mt-2 text-xs text-[#6B6458] space-y-1.5 leading-relaxed">
                      <p>{product.details.fit}</p>
                      <p>Our model is 5&apos;9&quot; (175 cm) wearing size S with 3-inch heels.</p>
                    </div>
                  )}
                </div>

                {/* Delivery & Returns */}
                <div className="py-3.5">
                  <button
                    onClick={() => setActiveAccordion(activeAccordion === "shipping" ? "" : "shipping")}
                    className="w-full flex justify-between items-center text-xs font-serif text-base uppercase font-semibold text-left"
                  >
                    <span>White-Glove Shipping &amp; Returns</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#C9A24B] transition-transform ${
                        activeAccordion === "shipping" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {activeAccordion === "shipping" && (
                    <div className="mt-2 text-xs text-[#6B6458] space-y-1.5 leading-relaxed">
                      <p>Orders dispatched within 48 business hours in signature Chic Couture black &amp; gold presentation boxes.</p>
                      <p>Complimentary doorstep return or exchange within 7 days of delivery.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Customer Reviews & Ratings Section */}
          <section className="mt-20 pt-12 border-t border-[#C9A24B]/30">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#0B0B0B]">
                  Patron Reviews ({reviewsList.length})
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex text-[#C9A24B]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="font-bold text-sm">{product.rating} out of 5</span>
                </div>
              </div>

              <button
                onClick={() => setReviewModalOpen(true)}
                className="px-5 py-2.5 bg-[#0B0B0B] text-white text-xs uppercase tracking-widest font-semibold rounded hover:bg-[#8F6B1F] transition-colors"
              >
                Write a Review
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviewsList.map((rev, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-white rounded-lg border border-[#C9A24B]/25 shadow-sm space-y-2"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-serif font-semibold text-sm text-[#0B0B0B]">{rev.author}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#8F6B1F]" />
                      </div>
                      <span className="text-[10px] text-gray-400">{rev.date}</span>
                    </div>
                    <div className="flex text-[#C9A24B]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="font-serif text-sm font-medium text-[#0B0B0B]">{rev.title}</p>
                  <p className="text-xs text-[#6B6458] leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Related / Complete The Look */}
          <section className="mt-20 pt-12 border-t border-[#C9A24B]/30">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-xs uppercase tracking-widest text-[#8F6B1F] font-semibold">
                Curated Harmony
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#0B0B0B] mt-1">
                Complete The Look
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        </div>

        {/* Sticky Mobile Add-to-Cart Action Bar */}
        <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#C9A24B]/40 p-3 flex lg:hidden items-center justify-between shadow-2xl">
          <div>
            <span className="font-serif font-bold text-sm gold-text-gradient block">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            <span className="text-[10px] text-[#6B6458] uppercase">{selectedSize} • {selectedColor}</span>
          </div>

          <button
            onClick={handleAddToCart}
            className="px-6 py-2.5 bg-gold-gradient text-[#0B0B0B] text-xs font-bold uppercase tracking-wider rounded shadow flex items-center gap-1.5"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add to Bag</span>
          </button>
        </div>

        {/* Size Guide Modal */}
        <AnimatePresence>
          {isSizeGuideOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-xl w-full bg-[#FBF9F4] p-6 rounded-xl border border-[#C9A24B] shadow-2xl relative"
              >
                <button
                  onClick={() => setIsSizeGuideOpen(false)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-black"
                >
                  <X className="w-5 h-5" />
                </button>

                <h3 className="font-serif text-2xl font-semibold text-[#0B0B0B]">Bespoke Sizing Chart</h3>
                <p className="text-xs text-[#6B6458] mt-1">Measurements in Inches &amp; Centimeters</p>

                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="bg-[#0B0B0B] text-[#E6C879] uppercase">
                        <th className="p-2.5">Size</th>
                        <th className="p-2.5">Bust (in)</th>
                        <th className="p-2.5">Waist (in)</th>
                        <th className="p-2.5">Hips (in)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#C9A24B]/20 bg-white">
                      <tr>
                        <td className="p-2.5 font-bold">XS</td>
                        <td className="p-2.5">32 - 33</td>
                        <td className="p-2.5">24 - 25</td>
                        <td className="p-2.5">35 - 36</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold">S</td>
                        <td className="p-2.5">34 - 35</td>
                        <td className="p-2.5">26 - 27</td>
                        <td className="p-2.5">37 - 38</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold">M</td>
                        <td className="p-2.5">36 - 37</td>
                        <td className="p-2.5">28 - 29</td>
                        <td className="p-2.5">39 - 40</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold">L</td>
                        <td className="p-2.5">38 - 40</td>
                        <td className="p-2.5">30 - 32</td>
                        <td className="p-2.5">41 - 43</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-bold">XL</td>
                        <td className="p-2.5">41 - 43</td>
                        <td className="p-2.5">33 - 35</td>
                        <td className="p-2.5">44 - 46</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 p-3 bg-[#E6C879]/20 rounded text-xs text-[#4A3810] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span>Complimentary custom tailoring available. Chat with our concierge for customized sleeve lengths or hem adjustments.</span>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Review Modal */}
        <AnimatePresence>
          {reviewModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-md w-full bg-[#FBF9F4] p-6 rounded-xl border border-[#C9A24B] shadow-2xl relative"
              >
                <button
                  onClick={() => setReviewModalOpen(false)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-black"
                >
                  <X className="w-5 h-5" />
                </button>

                <h3 className="font-serif text-xl font-semibold text-[#0B0B0B]">Share Your Experience</h3>
                <p className="text-xs text-[#6B6458] mt-1">Reviewing &quot;{product.name}&quot;</p>

                <form onSubmit={handleAddReview} className="mt-4 space-y-3">
                  <div>
                    <label className="text-xs uppercase tracking-wider font-semibold block mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={newReviewAuthor}
                      onChange={(e) => setNewReviewAuthor(e.target.value)}
                      placeholder="e.g. Shalini Kapoor"
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-xs focus:outline-none focus:border-[#C9A24B]"
                    />
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-wider font-semibold block mb-1">
                      Rating
                    </label>
                    <div className="flex gap-1 text-[#C9A24B]">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReviewRating(star)}
                          className="p-1"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              star <= newReviewRating ? "fill-current" : "text-gray-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-wider font-semibold block mb-1">
                      Review Comments
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={newReviewText}
                      onChange={(e) => setNewReviewText(e.target.value)}
                      placeholder="Share your thoughts on fit, fabric, and styling..."
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded text-xs focus:outline-none focus:border-[#C9A24B]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gold-gradient text-[#0B0B0B] font-semibold text-xs uppercase tracking-wider rounded"
                  >
                    Submit Verified Review
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
};
