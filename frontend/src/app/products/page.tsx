"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ALPS_PRODUCTS, PRODUCT_CATEGORIES } from "@/lib/products-data";
import { SITE_CONFIG } from "@/lib/constants";
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sun,
  Search,
  Sparkles,
  MessageCircle,
  Layers,
  Cpu,
  BatteryCharging,
  Truck,
  Building2,
  Zap,
  SlidersHorizontal
} from "lucide-react";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Products");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredProducts = useMemo(() => {
    return ALPS_PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === "All Products" || product.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        product.title.toLowerCase().includes(q) ||
        product.subtitle.toLowerCase().includes(q) ||
        product.series.toLowerCase().includes(q) ||
        product.capacity.toLowerCase().includes(q) ||
        product.specs.some((s) => s.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { "All Products": ALPS_PRODUCTS.length };
    ALPS_PRODUCTS.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "Solar Panels":
        return <Sun className="w-4 h-4 text-solar" />;
      case "Inverters":
        return <Cpu className="w-4 h-4 text-solar" />;
      case "Batteries":
        return <BatteryCharging className="w-4 h-4 text-emerald-600" />;
      case "Mobile ESS":
        return <Truck className="w-4 h-4 text-solar-600" />;
      case "C&I ESS":
        return <Building2 className="w-4 h-4 text-navy-800" />;
      default:
        return <Layers className="w-4 h-4 text-solar" />;
    }
  };

  return (
    <div className="space-y-12 sm:space-y-16 py-10 sm:py-16">
      {/* 1. Header Section - 100% JIENERGIES Brand Theme */}
      <section className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-50 border border-navy-200 text-navy-900 text-xs font-bold uppercase tracking-wider shadow-sm">
            <Zap className="w-3.5 h-3.5 text-solar fill-solar" />
            <span>JIENERGIES CERTIFIED SOLAR HARDWARE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-navy-900 tracking-tight">
            Solar Equipment &amp; Storage Catalog
          </h1>

          <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
            Tier-1 hybrid solar inverters, lithium LiFePO4 battery storage systems, and high-efficiency solar modules engineered for Pakistan&apos;s climate and peak tariff reduction.
          </p>
        </div>
      </section>

      {/* 2. Filter & Search Controls Bar - JIENERGIES Styling */}
      <section className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-surface-border shadow-sm flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {PRODUCT_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2.5 rounded-2xl font-bold text-xs sm:text-sm tracking-wide whitespace-nowrap transition-all flex items-center gap-2 shrink-0 ${
                    isActive
                      ? "bg-navy-800 text-white shadow-md shadow-navy-950/20 scale-[1.02]"
                      : "bg-white text-gray-600 hover:text-navy-900 hover:bg-gray-50 border border-surface-border"
                  }`}
                >
                  {getCategoryIcon(cat)}
                  <span>{cat}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                      isActive
                        ? "bg-solar text-navy-950"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {categoryCounts[cat] || 0}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-80 shrink-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search inverters, batteries, models..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-11 pr-4 bg-gray-50 border border-surface-border rounded-2xl text-navy-900 font-medium text-xs sm:text-sm placeholder:text-gray-400 focus:bg-white focus:border-navy-700 focus:ring-2 focus:ring-navy-700/15 focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Counter & Reset */}
        <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-gray-500 px-2 mt-4">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-solar-700" />
            <span>
              Showing <strong className="text-navy-900">{filteredProducts.length}</strong> of{" "}
              {ALPS_PRODUCTS.length} Certified Products
            </span>
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-navy-800 hover:text-solar-700 font-bold hover:underline text-xs"
            >
              Clear Search
            </button>
          )}
        </div>
      </section>

      {/* 3. Product Cards Grid - 100% JIENERGIES Theme */}
      <section className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        {filteredProducts.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-surface-border shadow-sm space-y-3">
            <p className="text-base font-bold text-navy-900">No equipment matched your search criteria.</p>
            <p className="text-xs text-gray-500">Try searching for a different keyword or reset categories.</p>
            <button
              onClick={() => {
                setSelectedCategory("All Products");
                setSearchQuery("");
              }}
              className="px-6 py-2.5 bg-navy-800 text-white font-bold text-xs rounded-xl shadow hover:bg-navy-700 transition-all"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => {
              const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Assalam-o-Alaikum%20JIENERGIES!%20I%20am%20interested%20in%20pricing%20and%20availability%20for%20${encodeURIComponent(
                product.title
              )}%20(${encodeURIComponent(product.series)}).%20Please%20send%20details.`;

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-3xl border border-surface-border shadow-sm hover:shadow-xl hover:border-solar/70 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                >
                  <div>
                    {/* Clean Studio Product Image Area */}
                    <div className="relative h-64 w-full bg-gradient-to-b from-gray-50 via-white to-gray-50/70 border-b border-gray-100 flex items-center justify-center p-6 overflow-hidden">
                      {/* Product Image */}
                      <img
                        src={product.image}
                        alt={product.title}
                        className="h-48 w-auto max-w-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-500 relative z-10"
                        loading="lazy"
                      />

                      {/* Series Badge Top-Left */}
                      <div className="absolute top-3.5 left-3.5 z-20">
                        <span className="text-[10px] font-black uppercase tracking-wider text-white bg-navy-900/90 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-navy-700/60 shadow-sm">
                          {product.series}
                        </span>
                      </div>

                      {/* Highlight Tag Top-Right */}
                      {product.highlight && (
                        <div className="absolute top-3.5 right-3.5 z-20">
                          <span className="text-[10px] font-black uppercase tracking-wider text-navy-950 bg-solar px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                            <Sparkles className="h-3 w-3" />
                            <span>{product.highlight}</span>
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Title & Capacity Header */}
                    <div className="p-5 sm:p-6 border-b border-gray-100 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-bold text-solar-700 uppercase tracking-wider">
                          {product.category}
                        </span>
                        <span className="px-2.5 py-1 rounded-lg bg-navy-50 text-navy-900 font-extrabold text-xs border border-navy-200">
                          {product.capacity}
                        </span>
                      </div>

                      <h3 className="text-xl font-black text-navy-900 group-hover:text-navy-700 transition-colors">
                        {product.title}
                      </h3>

                      <p className="text-xs text-gray-500 font-medium leading-relaxed">
                        {product.subtitle}
                      </p>
                    </div>

                    {/* Specifications List */}
                    <div className="p-5 sm:p-6 space-y-4">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-2.5">
                          Technical Specifications
                        </span>
                        <ul className="space-y-2">
                          {product.specs.map((spec, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-xs font-medium text-gray-700"
                            >
                              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{spec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Recommended For */}
                      <div className="pt-3 border-t border-gray-100">
                        <span className="text-[10px] font-bold text-gray-400 block uppercase tracking-wider">
                          Recommended Application:
                        </span>
                        <p className="text-xs font-bold text-navy-900 mt-0.5">
                          {product.recommended}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom: Warranty + Action Buttons */}
                  <div className="p-5 bg-gray-50/80 border-t border-gray-100 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                      <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                      <span className="text-[11px]">{product.warranty}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/quote?product=${encodeURIComponent(product.title)}`}
                        className="px-3.5 py-2 text-xs font-bold text-navy-800 hover:text-navy-950 hover:bg-white rounded-xl border border-gray-200 transition-all hidden sm:inline-flex"
                      >
                        Proposal
                      </Link>

                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-xl bg-solar hover:bg-solar-600 text-navy-950 px-4 py-2 text-xs font-black uppercase tracking-wider shadow-sm hover:shadow transition-all shrink-0"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Get Price</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 4. Equipment Integrity & Quality Standard Guarantee (JIENERGIES Navy & Solar Banner) */}
      <section className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-navy-900 text-white border border-navy-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 text-solar text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-solar" /> JIENERGIES Genuine Hardware Assurance
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Direct Tier-1 Supply Chain • 100% Genuine Equipment in Pakistan
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Every solar panel, hybrid inverter, and LiFePO4 battery storage pack provided by JIENERGIES includes verified factory serial registration, authentic flash test reports, and official warranty support across Pakistan.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/quote"
              className="px-6 py-3.5 bg-solar hover:bg-solar-600 text-navy-950 font-black text-xs sm:text-sm rounded-full shadow-lg transition-all"
            >
              Get Custom Solar Proposal
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3.5 bg-navy-800 hover:bg-navy-700 text-white font-bold text-xs sm:text-sm rounded-full border border-navy-700 transition-all"
            >
              Contact Engineering Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
