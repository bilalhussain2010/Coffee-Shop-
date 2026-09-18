"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, ShoppingBag, Clock, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { DEFAULT_BRAND_CONFIG } from "@/config/brand";

export const CartDrawer: React.FC = () => {
  const { cart, isOpen, setIsOpen, removeFromCart, updateQuantity, clearCart, subtotal, totalItems } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const tax = Number((subtotal * 0.0875).toFixed(2));
  const total = Number((subtotal + tax).toFixed(2));

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      clearCart();
    }, 1800);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="pointer-events-auto w-screen max-w-md bg-brand-dark border-l border-brand-border flex flex-col shadow-2xl"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-brand-border/60 flex items-center justify-between bg-brand-surface/80">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-brand-primary/20 text-brand-primary border border-brand-primary/30">
                    <ShoppingBag size={20} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">Your Pickup Order</h2>
                    <p className="text-xs text-brand-muted">{totalItems} {totalItems === 1 ? 'item' : 'items'} selected</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setOrderComplete(false);
                  }}
                  className="p-2 rounded-xl text-brand-muted hover:text-white hover:bg-brand-card transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {orderComplete ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                      <CheckCircle2 size={36} />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Order Received!</h3>
                    <p className="text-sm text-brand-muted max-w-xs mx-auto">
                      Your order <span className="text-brand-primary font-mono font-bold">#VB-8492</span> is being handcrafted by our barista.
                    </p>
                    <div className="p-4 rounded-2xl bg-brand-card border border-brand-border text-left space-y-2">
                      <div className="flex items-center gap-2 text-xs font-semibold text-brand-accent">
                        <Clock size={14} /> Estimated Ready Time: <span className="text-white font-bold">10-12 Mins</span>
                      </div>
                      <div className="text-xs text-brand-muted">
                        Pickup Location: {DEFAULT_BRAND_CONFIG.address}
                      </div>
                    </div>
                    <button
                      onClick={() => setOrderComplete(false)}
                      className="mt-4 px-6 py-2.5 rounded-xl bg-brand-primary text-white text-xs font-bold hover:bg-brand-primary-hover transition-all"
                    >
                      Back to Menu
                    </button>
                  </motion.div>
                ) : cart.length === 0 ? (
                  <div className="py-20 text-center space-y-4">
                    <ShoppingBag size={48} className="mx-auto text-brand-muted/40" />
                    <p className="text-sm text-brand-muted">Your order bag is currently empty.</p>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="px-5 py-2.5 rounded-xl border border-brand-border text-xs font-semibold text-brand-text hover:border-brand-primary hover:text-brand-primary transition-all"
                    >
                      Explore Menu Items
                    </button>
                  </div>
                ) : (
                  cart.map((cartItem) => (
                    <div
                      key={cartItem.cartItemId}
                      className="p-3.5 rounded-2xl bg-brand-card border border-brand-border/60 flex items-center gap-3.5"
                    >
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
                        <Image
                          src={cartItem.item.image}
                          alt={cartItem.item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-white truncate">
                          {cartItem.item.name}
                        </h4>
                        <div className="text-[11px] text-brand-muted space-y-0.5 mt-0.5">
                          {cartItem.selectedSize && (
                            <div>Size: {cartItem.selectedSize}</div>
                          )}
                          {cartItem.selectedMilk && (
                            <div>Milk: {cartItem.selectedMilk}</div>
                          )}
                          {cartItem.selectedSyrup && (
                            <div>Syrup: {cartItem.selectedSyrup}</div>
                          )}
                          {cartItem.extraShots ? (
                            <div>Shots: +{cartItem.extraShots} Extra</div>
                          ) : null}
                        </div>
                        <div className="text-xs font-bold text-brand-primary mt-1">
                          ${(cartItem.unitPrice * cartItem.quantity).toFixed(2)}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex flex-col items-end gap-2">
                        <button
                          onClick={() => removeFromCart(cartItem.cartItemId)}
                          className="text-brand-muted hover:text-rose-400 p-1 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                        <div className="flex items-center gap-1 bg-brand-surface rounded-lg p-1 border border-brand-border">
                          <button
                            onClick={() => updateQuantity(cartItem.cartItemId, -1)}
                            className="w-5 h-5 flex items-center justify-center text-brand-text hover:text-white text-xs"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-xs font-bold text-white min-w-[14px] text-center">
                            {cartItem.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(cartItem.cartItemId, 1)}
                            className="w-5 h-5 flex items-center justify-center text-brand-text hover:text-white text-xs"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer */}
              {!orderComplete && cart.length > 0 && (
                <div className="p-6 border-t border-brand-border/60 bg-brand-surface/90 space-y-4">
                  {/* Estimated Ready Time Notification */}
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-brand-primary/10 border border-brand-primary/20 text-xs text-brand-accent">
                    <Clock size={16} />
                    <span>Estimated pickup in <strong>8 - 12 minutes</strong> upon checkout.</span>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-brand-muted">
                      <span>Subtotal</span>
                      <span className="font-semibold text-brand-text">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-brand-muted">
                      <span>Estimated Sales Tax (8.75%)</span>
                      <span className="font-semibold text-brand-text">${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-brand-border/40">
                      <span>Total Due</span>
                      <span className="text-brand-primary">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-brand-primary to-brand-accent text-white font-bold text-sm shadow-xl shadow-brand-primary/25 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isCheckingOut ? (
                      <span className="flex items-center gap-2">
                        <Sparkles className="animate-spin" size={16} /> Transmitting Order...
                      </span>
                    ) : (
                      <>
                        <span>Place Pickup Order</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
};
