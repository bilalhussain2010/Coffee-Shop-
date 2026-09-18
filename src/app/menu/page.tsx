"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search, Filter, Sparkles, Coffee, Plus, Check } from "lucide-react";
import { MENU_ITEMS, MenuItem, DIETARY_LABELS } from "@/config/menu";
import { ItemModal } from "@/components/ItemModal";
import { useCart } from "@/context/CartContext";

export default function MenuPage() {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const categories = [
    { id: "all", label: "All Items" },
    { id: "espresso", label: "Espresso" },
    { id: "brews", label: "Cold Brews & Drip" },
    { id: "teas", label: "Artisanal Teas" },
    { id: "pastries", label: "Fresh Bakery" },
    { id: "seasonal", label: "Seasonal Specials" },
  ];

  const dietaryFilterKeys = ["vegan", "gluten-free", "dairy-free", "nut-free", "organic", "high-caffeine"];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category Match
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }
      // Search Query Match
      if (
        searchQuery &&
        !item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !item.description.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      // Dietary Filters Match (Must contain all selected tags)
      if (selectedDietary.length > 0) {
        const hasAllDietary = selectedDietary.every((tag) =>
          item.dietary.includes(tag as any)
        );
        if (!hasAllDietary) return false;
      }
      return true;
    });
  }, [selectedCategory, searchQuery, selectedDietary]);

  const toggleDietaryFilter = (key: string) => {
    setSelectedDietary((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 min-h-screen">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-extrabold uppercase tracking-widest text-brand-primary flex items-center justify-center gap-1.5">
          <Coffee size={16} /> Handcrafted Daily
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Artisanal Coffee & Bakery Menu
        </h1>
        <p className="text-sm text-brand-muted leading-relaxed">
          Filter by category or dietary preference. Customize your milk, syrup, and espresso strength for instant pickup.
        </p>
      </div>

      {/* Search & Filter Controls Bar */}
      <div className="p-4 rounded-3xl glass-panel border border-brand-border space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search mocha, croissant, matcha..."
              className="w-full bg-brand-surface border border-brand-border rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-brand-muted focus:outline-none focus:border-brand-primary"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20"
                    : "bg-brand-surface border border-brand-border text-brand-muted hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dietary Filter Toggles */}
        <div className="pt-3 border-t border-brand-border/40 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-brand-muted flex items-center gap-1 mr-1">
            <Filter size={12} /> Dietary Tags:
          </span>
          {dietaryFilterKeys.map((key) => {
            const isSelected = selectedDietary.includes(key);
            const info = DIETARY_LABELS[key];
            return (
              <button
                key={key}
                onClick={() => toggleDietaryFilter(key)}
                className={`px-3 py-1 rounded-lg text-[11px] font-semibold border transition-all flex items-center gap-1 ${
                  isSelected
                    ? "bg-brand-primary border-brand-primary text-white"
                    : "bg-brand-surface border-brand-border text-brand-muted hover:border-brand-muted"
                }`}
              >
                {isSelected && <Check size={12} />}
                <span>{info?.label || key}</span>
              </button>
            );
          })}
          {selectedDietary.length > 0 && (
            <button
              onClick={() => setSelectedDietary([])}
              className="text-[11px] font-bold text-rose-400 hover:underline ml-2"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Grid of Menu Items */}
      {filteredItems.length === 0 ? (
        <div className="py-24 text-center space-y-4">
          <Coffee size={48} className="mx-auto text-brand-muted/30" />
          <h3 className="text-xl font-bold text-white">No Menu Items Match Your Search</h3>
          <p className="text-xs text-brand-muted max-w-sm mx-auto">
            Try resetting your dietary filters or search query to explore our complete specialty menu.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
              setSelectedDietary([]);
            }}
            className="px-5 py-2.5 rounded-xl bg-brand-primary text-white text-xs font-bold hover:bg-brand-primary-hover transition-all"
          >
            Clear All Search Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="group relative rounded-3xl glass-card border border-brand-border/60 overflow-hidden flex flex-col hover:border-brand-primary/60 hover:shadow-2xl transition-all duration-300"
            >
              {/* Image & Price */}
              <div className="relative h-56 w-full overflow-hidden bg-brand-surface">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-card via-transparent to-black/20" />
                
                <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-white font-extrabold text-sm">
                  ${item.price.toFixed(2)}
                </span>

                {item.popular && (
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-brand-primary text-white font-bold text-[11px] shadow-lg flex items-center gap-1">
                    <Sparkles size={11} /> Popular
                  </span>
                )}
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-brand-primary transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-brand-muted mt-2 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Dietary Tags */}
                  {item.dietary.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {item.dietary.map((tag) => {
                        const info = DIETARY_LABELS[tag];
                        if (!info) return null;
                        return (
                          <span
                            key={tag}
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${info.bg} ${info.text}`}
                          >
                            {info.label}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Footer Trigger */}
                <div className="pt-3 border-t border-brand-border/40 flex items-center justify-between">
                  {item.customizable ? (
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="w-full py-3 px-4 rounded-xl bg-brand-surface border border-brand-border text-white text-xs font-bold hover:border-brand-primary transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>Customize Options</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => addToCart(item)}
                      className="w-full py-3 px-4 rounded-xl bg-brand-primary text-white text-xs font-bold hover:bg-brand-primary-hover transition-all flex items-center justify-center gap-1.5"
                    >
                      <Plus size={14} /> Quick Add • ${item.price.toFixed(2)}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Item Modal */}
      {selectedItem && (
        <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}
