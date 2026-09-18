"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Coffee, ArrowRight, Sparkles, Star, ShieldCheck, Clock, Award, MessageSquare, Plus, Check } from "lucide-react";
import { DEFAULT_BRAND_CONFIG } from "@/config/brand";
import { MENU_ITEMS, MenuItem } from "@/config/menu";
import { ItemModal } from "@/components/ItemModal";
import { useCart } from "@/context/CartContext";

export default function HomePage() {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const featuredItems = MENU_ITEMS.filter((item) =>
    selectedCategory === "all" ? item.popular : item.category === selectedCategory
  );

  const testimonials = [
    {
      name: "Marcus Vance",
      role: "Daily Regular & Espresso Lover",
      quote: "The Artisan Iced Oat Latte is hands down the smoothest espresso drink in San Francisco. Ordering ahead via their chatbot takes literally 15 seconds!",
      rating: 5,
    },
    {
      name: "Elena Rostova",
      role: "Pastry Connoisseur",
      quote: "Flaky, buttery almond croissants baked fresh every single morning. Paired with their nitro cold brew, it’s my ultimate morning ritual.",
      rating: 5,
    },
    {
      name: "David Chen",
      role: "Local Cafe Owner",
      quote: "We implemented this exact website & n8n AI chatbot for our own cafe, and our online pickup orders jumped by 38% in the first month!",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen space-y-24 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-12">
        {/* Parallax Coffee Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-coffee.png"
            alt="Barista pouring espresso latte art"
            fill
            className="object-cover object-center scale-105 filter brightness-[0.40] contrast-125"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/50 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-brand-primary/40 text-xs font-semibold text-brand-accent shadow-xl"
          >
            <Sparkles size={14} className="text-brand-primary animate-spin" />
            <span>{DEFAULT_BRAND_CONFIG.tagline}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]"
          >
            Handcrafted Coffee. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-accent to-amber-200">
              Zero Wait Pickup.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-2xl mx-auto text-base sm:text-lg text-brand-muted leading-relaxed"
          >
            {DEFAULT_BRAND_CONFIG.description} Order online or tap our AI Barista assistant to customize your drink for instant pickup.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link
              href="/menu"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-primary to-brand-accent text-white font-extrabold text-sm shadow-2xl shadow-brand-primary/40 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2.5"
            >
              <Coffee size={18} /> Order Ahead Now <ArrowRight size={18} />
            </Link>
            <Link
              href="/b2b"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl glass-card border-brand-border text-white font-bold text-sm hover:border-brand-primary hover:bg-brand-card transition-all flex items-center justify-center gap-2"
            >
              <Sparkles size={16} className="text-brand-accent" /> Buy This Website Template (B2B)
            </Link>
          </motion.div>

          {/* Quick Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            {[
              { label: "Customer Rating", val: "4.9 ★", sub: "Over 2,400 Reviews" },
              { label: "Avg Pickup Time", val: "8 Mins", sub: "Handcrafted to Order" },
              { label: "Direct-Trade Beans", val: "100%", sub: "Single-Origin Sourced" },
              { label: "AI Order Assist", val: "24 / 7", sub: "Powered by n8n Flow" },
            ].map((stat, idx) => (
              <div key={idx} className="p-4 rounded-2xl glass-card border border-brand-border/40 text-center">
                <div className="text-2xl font-black text-white">{stat.val}</div>
                <div className="text-xs font-bold text-brand-primary mt-0.5">{stat.label}</div>
                <div className="text-[10px] text-brand-muted">{stat.sub}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 2. INTERACTIVE POPULAR MENU PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-widest text-brand-primary mb-2 flex items-center gap-2">
              <Award size={16} /> Artisanal Selection
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Customer Favorites & Seasonal Specials
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: "Popular All" },
              { id: "espresso", label: "Espresso" },
              { id: "brews", label: "Cold Brews" },
              { id: "teas", label: "Teas" },
              { id: "pastries", label: "Pastries" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat.id
                    ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20"
                    : "bg-brand-card border border-brand-border text-brand-muted hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredItems.map((item) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="group relative rounded-3xl glass-card border border-brand-border/60 overflow-hidden flex flex-col hover:border-brand-primary/60 hover:shadow-2xl transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative h-48 w-full overflow-hidden bg-brand-surface">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-card via-transparent to-black/20" />
                <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white font-extrabold text-xs">
                  ${item.price.toFixed(2)}
                </span>
              </div>

              {/* Card Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-brand-primary transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-brand-muted mt-1.5 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-brand-border/40 flex items-center justify-between gap-2">
                  {item.customizable ? (
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="w-full py-2.5 px-4 rounded-xl bg-brand-surface border border-brand-border text-white text-xs font-bold hover:border-brand-primary transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>Customize & Add</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => addToCart(item)}
                      className="w-full py-2.5 px-4 rounded-xl bg-brand-primary text-white text-xs font-bold hover:bg-brand-primary-hover transition-all flex items-center justify-center gap-1.5"
                    >
                      <Plus size={14} /> Quick Add
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center pt-4">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-xs font-bold text-brand-primary hover:text-brand-accent transition-colors"
          >
            Explore Full Filterable Menu <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* 3. TESTIMONIALS & SOCIAL PROOF */}
      <section className="bg-brand-surface/60 border-y border-brand-border py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-primary">
              Loved By Locals & Cafe Owners
            </span>
            <h2 className="text-3xl font-extrabold text-white">What Our Community Says</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl glass-card border border-brand-border/60 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-xs text-brand-text italic leading-relaxed">
                    &quot;{t.quote}&quot;
                  </p>
                </div>
                <div className="pt-4 border-t border-brand-border/40">
                  <div className="text-sm font-bold text-white">{t.name}</div>
                  <div className="text-[11px] text-brand-muted">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. EMBEDDED AI CHAT PROVIEW / CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden glass-panel border border-brand-primary/40 p-8 sm:p-12 bg-gradient-to-r from-brand-card via-brand-surface to-brand-dark flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/20 border border-brand-primary/30 text-brand-accent text-xs font-bold">
              <MessageSquare size={14} /> Built-in n8n AI Chatbot
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Have Questions About Our Coffee or Dietary Options?
            </h2>
            <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
              Click our floating Barista AI widget at the bottom right corner! It answers menu inquiries, calculates customized sizes, and routes orders via n8n automation.
            </p>
          </div>

          <div className="shrink-0 space-y-3 text-center sm:text-left">
            <Link
              href="/b2b"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-primary to-brand-accent text-white font-extrabold text-sm shadow-xl shadow-brand-primary/30 hover:brightness-110 transition-all inline-flex items-center gap-2"
            >
              <span>Explore Cafe Automation Solution</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Modal for Item Customization */}
      {selectedItem && (
        <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}
