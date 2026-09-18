"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Check, Coffee, Sparkles } from "lucide-react";
import { MenuItem, DIETARY_LABELS } from "@/config/menu";
import { useCart } from "@/context/CartContext";

interface ItemModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

export const ItemModal: React.FC<ItemModalProps> = ({ item, onClose }) => {
  const { addToCart } = useCart();
  
  const [selectedSize, setSelectedSize] = useState<string>(
    item?.sizes ? item.sizes[0]?.name : "Regular"
  );
  const [selectedMilk, setSelectedMilk] = useState<string>("Oat Milk");
  const [selectedSyrup, setSelectedSyrup] = useState<string>("None");
  const [extraShots, setExtraShots] = useState<number>(0);

  if (!item) return null;

  const milkOptions = ["Oat Milk", "Almond Milk", "Whole Milk", "Coconut Milk", "No Milk"];
  const syrupOptions = ["None", "Smoked Vanilla (+ $0.75)", "Salted Caramel (+ $0.75)", "Cardamom Cinnamon (+ $0.75)"];

  const calculateTotalPrice = () => {
    let price = item.price;
    if (item.sizes) {
      const found = item.sizes.find((s) => s.name === selectedSize);
      if (found) price += found.extraPrice;
    }
    if (selectedSyrup !== "None") price += 0.75;
    price += extraShots * 0.90;
    return price.toFixed(2);
  };

  const handleAdd = () => {
    addToCart(item, {
      size: item.customizable ? selectedSize : undefined,
      milk: item.customizable ? selectedMilk : undefined,
      syrup: selectedSyrup !== "None" ? selectedSyrup : undefined,
      shots: extraShots,
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-lg overflow-hidden rounded-3xl glass-panel border border-white/10 shadow-2xl bg-brand-surface max-h-[90vh] flex flex-col"
        >
          {/* Header Image */}
          <div className="relative h-56 w-full">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-surface via-transparent to-black/30" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white/80 hover:text-white hover:bg-black/90 transition-colors backdrop-blur-sm"
            >
              <X size={20} />
            </button>

            {item.popular && (
              <span className="absolute top-4 left-4 inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-brand-primary text-white shadow-lg">
                <Sparkles size={12} /> Customer Favorite
              </span>
            )}
          </div>

          {/* Body Content */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            <div>
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-2xl font-bold text-white">{item.name}</h3>
                <span className="text-xl font-bold text-brand-primary">
                  ${calculateTotalPrice()}
                </span>
              </div>
              <p className="mt-2 text-sm text-brand-muted leading-relaxed">
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
                        className={`text-[11px] font-medium px-2.5 py-0.5 rounded-md border ${info.bg} ${info.text}`}
                      >
                        {info.label}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Customization Options */}
            {item.customizable && (
              <div className="space-y-5 pt-4 border-t border-brand-border/60">
                {/* Size Selector */}
                {item.sizes && item.sizes.length > 0 && (
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-brand-muted mb-2">
                      Select Size
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {item.sizes.map((sz) => (
                        <button
                          key={sz.name}
                          onClick={() => setSelectedSize(sz.name)}
                          className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                            selectedSize === sz.name
                              ? "bg-brand-primary border-brand-primary text-white shadow-lg shadow-brand-primary/20"
                              : "border-brand-border bg-brand-card text-brand-text hover:border-brand-muted"
                          }`}
                        >
                          <div>{sz.name}</div>
                          {sz.extraPrice > 0 && (
                            <div className="text-[10px] opacity-80">+${sz.extraPrice.toFixed(2)}</div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Milk Choice */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-brand-muted mb-2">
                    Milk Option
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {milkOptions.map((milk) => (
                      <button
                        key={milk}
                        onClick={() => setSelectedMilk(milk)}
                        className={`py-2 px-3 rounded-xl text-xs font-semibold text-left border flex items-center justify-between transition-all ${
                          selectedMilk === milk
                            ? "bg-brand-primary/20 border-brand-primary text-brand-primary"
                            : "border-brand-border bg-brand-card text-brand-text hover:border-brand-muted"
                        }`}
                      >
                        <span>{milk}</span>
                        {selectedMilk === milk && <Check size={14} />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Syrup Choice */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-brand-muted mb-2">
                    Add Artisanal Syrup
                  </label>
                  <select
                    value={selectedSyrup}
                    onChange={(e) => setSelectedSyrup(e.target.value)}
                    className="w-full bg-brand-card border border-brand-border rounded-xl py-2.5 px-3 text-xs text-brand-text focus:outline-none focus:border-brand-primary"
                  >
                    {syrupOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Extra Espresso Shots */}
                <div className="flex items-center justify-between bg-brand-card p-3.5 rounded-2xl border border-brand-border">
                  <div>
                    <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                      <Coffee size={14} className="text-brand-primary" /> Extra Espresso Shot
                    </div>
                    <div className="text-[11px] text-brand-muted">+ $0.90 per double shot</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setExtraShots(Math.max(0, extraShots - 1))}
                      disabled={extraShots === 0}
                      className="w-7 h-7 rounded-lg bg-brand-surface border border-brand-border flex items-center justify-center text-brand-text disabled:opacity-30 hover:border-brand-primary"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-sm font-bold text-white min-w-[16px] text-center">
                      {extraShots}
                    </span>
                    <button
                      onClick={() => setExtraShots(extraShots + 1)}
                      className="w-7 h-7 rounded-lg bg-brand-surface border border-brand-border flex items-center justify-center text-brand-text hover:border-brand-primary"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Action */}
          <div className="p-4 border-t border-brand-border/60 bg-brand-surface">
            <button
              onClick={handleAdd}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-brand-primary to-brand-accent text-white font-bold text-sm shadow-xl shadow-brand-primary/25 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              <span>Add to Order</span>
              <span>•</span>
              <span>${calculateTotalPrice()}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
