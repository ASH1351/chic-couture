"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Filter,
  X,
  SlidersHorizontal,
  ChevronDown,
  ArrowUpDown,
  Grid3X3,
  LayoutGrid,
  RotateCcw,
} from "lucide-react";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { ProductCard } from "@/components/ui/ProductCard";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialFilter = searchParams.get("filter") || "";
  const initialQuery = searchParams.get("q") || "";

  // State
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number>(65000);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [gridCols, setGridCols] = useState<3 | 4>(4);

  // Available Sizes & Colors across catalog
  const allSizes = ["XS", "S", "M", "L", "XL", "XXL", "One Size", "100ml", "120ml"];
  const allColors = [
    { name: "Black", hex: "#0B0B0B" },
    { name: "Gold", hex: "#C9A24B" },
    { name: "Ivory", hex: "#FBF9F4" },
    { name: "Emerald", hex: "#0F3827" },
    { name: "Champagne", hex: "#E8D8B0" },
    { name: "Plum", hex: "#3B1B2F" },
  ];

  // Toggle helpers
  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (colorName: string) => {
    setSelectedColors((prev) =>
      prev.includes(colorName) ? prev.filter((c) => c !== colorName) : [...prev, colorName]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategory("all");
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange(65000);
    setSortBy("featured");
  };

  const activeFiltersCount =
    (selectedCategory !== "all" ? 1 : 0) +
    selectedSizes.length +
    selectedColors.length +
    (priceRange < 65000 ? 1 : 0);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search query filter
    if (initialQuery.trim()) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(initialQuery.toLowerCase()) ||
          p.categoryLabel.toLowerCase().includes(initialQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(initialQuery.toLowerCase())
      );
    }

    // "new" filter from URL
    if (initialFilter === "new") {
      result = result.filter((p) => p.tag === "NEW ARRIVAL");
    }

    // Category filter
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Price filter
    result = result.filter((p) => p.price <= priceRange);

    // Size filter
    if (selectedSizes.length > 0) {
      result = result.filter((p) =>
        p.sizes.some((size) => selectedSizes.includes(size))
      );
    }

    // Color filter
    if (selectedColors.length > 0) {
      result = result.filter((p) =>
        p.colors.some((color) =>
          selectedColors.some((sc) =>
            color.name.toLowerCase().includes(sc.toLowerCase())
          )
        )
      );
    }

    // Sorting
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => (b.tag === "NEW ARRIVAL" ? 1 : -1));
        break;
      default:
        // featured default
        result.sort((a, b) => (b.isFeatured ? 1 : -1));
        break;
    }

    return result;
  }, [selectedCategory, selectedSizes, selectedColors, priceRange, sortBy, initialQuery, initialFilter]);

  return (
    <div className="min-h-screen bg-[#FBF9F4] text-[#0B0B0B] py-8 sm:py-12 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Header */}
        <div className="mb-8">
          <p className="text-xs uppercase tracking-widest text-[#8F6B1F] font-semibold mb-2">
            Maison Atelier • Ready-to-Wear &amp; Haute Couture
          </p>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#0B0B0B]">
              The Couture Collection
            </h1>
            <p className="text-xs sm:text-sm text-[#6B6458]">
              Showing {filteredProducts.length} of {products.length} creations
            </p>
          </div>
        </div>

        {/* Top Control Bar (Filter Pills, Sort, View Layout) */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 px-5 bg-white border border-[#C9A24B]/30 rounded-lg shadow-sm mb-8">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 bg-[#0B0B0B] text-white text-xs uppercase tracking-wider font-semibold rounded"
          >
            <Filter className="w-4 h-4 text-[#E6C879]" />
            <span>Filters ({activeFiltersCount})</span>
          </button>

          {/* Desktop Category Quick Pills */}
          <div className="hidden lg:flex items-center gap-2 overflow-x-auto">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3 py-1.5 text-xs uppercase tracking-wider rounded-full transition-colors ${
                selectedCategory === "all"
                  ? "bg-[#0B0B0B] text-white"
                  : "bg-[#F3EFE6] text-[#0B0B0B] hover:bg-[#E6C879]/30"
              }`}
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.slug)}
                className={`px-3 py-1.5 text-xs uppercase tracking-wider rounded-full whitespace-nowrap transition-colors ${
                  selectedCategory === c.slug
                    ? "bg-[#0B0B0B] text-white"
                    : "bg-[#F3EFE6] text-[#0B0B0B] hover:bg-[#E6C879]/30"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* Sort Dropdown & Layout Buttons */}
          <div className="flex items-center gap-3 ml-auto">
            <div className="flex items-center gap-2 text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#8F6B1F]" />
              <span className="hidden sm:inline text-[#6B6458]">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#F3EFE6] border border-[#C9A24B]/30 rounded px-2.5 py-1.5 text-xs text-[#0B0B0B] focus:outline-none focus:border-[#C9A24B]"
              >
                <option value="featured">Featured Masterpieces</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Grid density toggle (Desktop only) */}
            <div className="hidden sm:flex items-center gap-1 border-l border-[#C9A24B]/30 pl-3">
              <button
                onClick={() => setGridCols(3)}
                className={`p-1.5 rounded transition-colors ${
                  gridCols === 3 ? "bg-[#0B0B0B] text-white" : "text-[#6B6458] hover:text-[#0B0B0B]"
                }`}
                title="3 Columns"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridCols(4)}
                className={`p-1.5 rounded transition-colors ${
                  gridCols === 4 ? "bg-[#0B0B0B] text-white" : "text-[#6B6458] hover:text-[#0B0B0B]"
                }`}
                title="4 Columns"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {activeFiltersCount > 0 && (
          <div className="flex items-center gap-2 flex-wrap mb-6">
            <span className="text-xs font-semibold text-[#8F6B1F] uppercase tracking-wider">
              Active Filters:
            </span>
            {selectedCategory !== "all" && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#C9A24B]/40 rounded-full text-xs text-[#0B0B0B]">
                Category: {selectedCategory}
                <button onClick={() => setSelectedCategory("all")} className="hover:text-red-500">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedSizes.map((s) => (
              <span
                key={s}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#C9A24B]/40 rounded-full text-xs text-[#0B0B0B]"
              >
                Size: {s}
                <button onClick={() => toggleSize(s)} className="hover:text-red-500">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {selectedColors.map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#C9A24B]/40 rounded-full text-xs text-[#0B0B0B]"
              >
                Color: {c}
                <button onClick={() => toggleColor(c)} className="hover:text-red-500">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {priceRange < 65000 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#C9A24B]/40 rounded-full text-xs text-[#0B0B0B]">
                Max ₹{priceRange.toLocaleString("en-IN")}
                <button onClick={() => setPriceRange(65000)} className="hover:text-red-500">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <button
              onClick={clearAllFilters}
              className="text-xs text-[#8F6B1F] hover:underline flex items-center gap-1 font-semibold ml-2"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear All</span>
            </button>
          </div>
        )}

        {/* Main Body: Desktop Sidebar + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filter Sidebar (3 columns) */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6 bg-white p-6 rounded-lg border border-[#C9A24B]/30 shadow-sm sticky top-24">
            <div className="flex items-center justify-between pb-4 border-b border-[#C9A24B]/20">
              <h3 className="font-serif text-lg font-semibold uppercase tracking-wider text-[#0B0B0B]">
                Refine Pieces
              </h3>
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-[11px] text-[#8F6B1F] hover:underline"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Price Filter Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-[#0B0B0B]">
                  Price Ceiling
                </h4>
                <span className="font-semibold text-xs text-[#8F6B1F]">
                  Up to ₹{priceRange.toLocaleString("en-IN")}
                </span>
              </div>
              <input
                type="range"
                min="5000"
                max="65000"
                step="2500"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-[#C9A24B] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#6B6458] mt-1">
                <span>₹5,000</span>
                <span>₹65,000+</span>
              </div>
            </div>

            {/* Sizes */}
            <div className="pt-4 border-t border-[#C9A24B]/15">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-[#0B0B0B] mb-2.5">
                Size
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {allSizes.map((size) => {
                  const isChecked = selectedSizes.includes(size);
                  return (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`px-2.5 py-1 text-xs rounded border transition-colors ${
                        isChecked
                          ? "bg-[#0B0B0B] text-white border-[#0B0B0B]"
                          : "bg-[#FBF9F4] text-[#0B0B0B] border-[#C9A24B]/30 hover:border-[#C9A24B]"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Colors */}
            <div className="pt-4 border-t border-[#C9A24B]/15">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-[#0B0B0B] mb-2.5">
                Color Palette
              </h4>
              <div className="flex flex-wrap gap-2">
                {allColors.map((color) => {
                  const isChecked = selectedColors.includes(color.name);
                  return (
                    <button
                      key={color.name}
                      onClick={() => toggleColor(color.name)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded border transition-all ${
                        isChecked
                          ? "border-[#C9A24B] bg-[#E6C879]/20 font-semibold"
                          : "border-gray-200 hover:border-[#C9A24B]"
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full border border-gray-300"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Product Grid (9 columns on desktop) */}
          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-24 bg-white rounded-lg border border-[#C9A24B]/20 p-8">
                <SlidersHorizontal className="w-12 h-12 text-[#C9A24B] mx-auto mb-4" />
                <h3 className="font-serif text-2xl font-medium text-[#0B0B0B]">
                  No matching haute creations
                </h3>
                <p className="text-xs text-[#6B6458] mt-2 max-w-sm mx-auto">
                  Try adjusting your price ceiling, removing filters, or browsing our full collection.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="mt-6 px-6 py-2.5 bg-gold-gradient text-[#0B0B0B] text-xs font-semibold uppercase tracking-wider rounded"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div
                className={`grid grid-cols-2 md:grid-cols-3 ${
                  gridCols === 4 ? "xl:grid-cols-4" : "xl:grid-cols-3"
                } gap-4 sm:gap-6`}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Bottom-Sheet / Drawer */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="w-screen max-w-sm bg-[#FBF9F4] text-[#0B0B0B] shadow-2xl flex flex-col justify-between"
              >
                <div className="p-6 border-b border-[#C9A24B]/20 flex items-center justify-between">
                  <h3 className="font-serif text-lg font-semibold uppercase">Filters</h3>
                  <button onClick={() => setIsMobileFilterOpen(false)}>
                    <X className="w-5 h-5 text-[#0B0B0B]" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {/* Category */}
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-semibold mb-2">Category</h4>
                    <div className="flex flex-col gap-1.5">
                      <button
                        onClick={() => setSelectedCategory("all")}
                        className={`text-left text-xs py-1.5 px-3 rounded ${
                          selectedCategory === "all" ? "bg-[#0B0B0B] text-white" : "hover:bg-gray-100"
                        }`}
                      >
                        All Categories
                      </button>
                      {categories.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => setSelectedCategory(c.slug)}
                          className={`text-left text-xs py-1.5 px-3 rounded ${
                            selectedCategory === c.slug ? "bg-[#0B0B0B] text-white" : "hover:bg-gray-100"
                          }`}
                        >
                          {c.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price */}
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-semibold mb-2">
                      Price Up to ₹{priceRange.toLocaleString("en-IN")}
                    </h4>
                    <input
                      type="range"
                      min="5000"
                      max="65000"
                      step="2500"
                      value={priceRange}
                      onChange={(e) => setPriceRange(Number(e.target.value))}
                      className="w-full accent-[#C9A24B]"
                    />
                  </div>

                  {/* Sizes */}
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-semibold mb-2">Sizes</h4>
                    <div className="flex flex-wrap gap-2">
                      {allSizes.map((s) => (
                        <button
                          key={s}
                          onClick={() => toggleSize(s)}
                          className={`px-3 py-1.5 text-xs rounded border ${
                            selectedSizes.includes(s)
                              ? "bg-[#0B0B0B] text-white border-[#0B0B0B]"
                              : "bg-white border-gray-300"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 border-t border-[#C9A24B]/20 bg-white flex gap-3">
                  <button
                    onClick={clearAllFilters}
                    className="flex-1 py-3 border border-gray-300 text-xs font-semibold uppercase tracking-wider rounded"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="flex-1 py-3 bg-gold-gradient text-[#0B0B0B] text-xs font-semibold uppercase tracking-wider rounded shadow"
                  >
                    Apply Filters
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FBF9F4] py-20 text-center">Loading catalogue...</div>}>
      <ShopContent />
    </Suspense>
  );
}
