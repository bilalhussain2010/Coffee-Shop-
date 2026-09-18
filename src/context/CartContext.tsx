"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { MenuItem } from "@/config/menu";

export interface CartItem {
  cartItemId: string;
  item: MenuItem;
  selectedSize?: string;
  selectedMilk?: string;
  selectedSyrup?: string;
  extraShots?: number;
  quantity: number;
  unitPrice: number;
}

interface CartContextType {
  cart: CartItem[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  addToCart: (item: MenuItem, options?: { size?: string; milk?: string; syrup?: string; shots?: number }) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  subtotal: number;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Load saved cart from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("velvet_cart");
      if (saved) {
        setCart(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Save cart changes
  useEffect(() => {
    try {
      localStorage.setItem("velvet_cart", JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  const addToCart = (
    item: MenuItem,
    options?: { size?: string; milk?: string; syrup?: string; shots?: number }
  ) => {
    const selectedSize = options?.size || (item.sizes ? item.sizes[0]?.name : undefined);
    const selectedMilk = options?.milk || "Oat Milk";
    const selectedSyrup = options?.syrup;
    const extraShots = options?.shots || 0;

    let extraPrice = 0;
    if (selectedSize && item.sizes) {
      const foundSize = item.sizes.find((s) => s.name === selectedSize);
      if (foundSize) extraPrice += foundSize.extraPrice;
    }
    if (extraShots > 0) extraPrice += extraShots * 0.90;

    const unitPrice = Number((item.price + extraPrice).toFixed(2));
    const cartItemId = `${item.id}-${selectedSize || 'default'}-${selectedMilk}-${selectedSyrup || 'none'}-${extraShots}`;

    setCart((prev) => {
      const existingIndex = prev.findIndex((i) => i.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      } else {
        return [
          ...prev,
          {
            cartItemId,
            item,
            selectedSize,
            selectedMilk,
            selectedSyrup,
            extraShots,
            quantity: 1,
            unitPrice,
          },
        ];
      }
    });

    setIsOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((i) => i.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => {
          if (i.cartItemId === cartItemId) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => setCart([]);

  const subtotal = Number(cart.reduce((acc, i) => acc + i.unitPrice * i.quantity, 0).toFixed(2));
  const totalItems = cart.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        setIsOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
