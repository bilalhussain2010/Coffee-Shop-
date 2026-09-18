"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Coffee, ShoppingBag, Palette, Menu as MenuIcon, X, Sparkles, MapPin } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { DEFAULT_BRAND_CONFIG, BRAND_THEMES, applyBrandTheme } from "@/config/brand";

interface NavbarProps {
  onOpenThemeModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenThemeModal }) => {
  const pathname = usePathname();
  const { totalItems, setIsOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeThemeId, setActiveThemeId] = useState("artisan-roastery");

  const handleThemeChange = (themeId: string) => {
    setActiveThemeId(themeId);
    applyBrandTheme(themeId);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "Our Story", href: "/about" },
    { name: "Locations", href: "/locations" },
    { name: "Cafe Automation B2B", href: "/b2b", highlight: true },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-brand-border/60 bg-brand-dark/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center text-white shadow-lg shadow-brand-primary/20 group-hover:scale-105 transition-transform">
            <Coffee size={22} className="group-hover:rotate-12 transition-transform" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-brand-primary transition-colors">
              {DEFAULT_BRAND_CONFIG.name}
            </span>
            <div className="text-[10px] font-medium tracking-wide text-brand-muted flex items-center gap-1">
              <MapPin size={10} className="text-brand-primary" /> {DEFAULT_BRAND_CONFIG.city}
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all relative ${
                  isActive
                    ? "text-white bg-brand-card border border-brand-border"
                    : link.highlight
                    ? "text-brand-accent bg-brand-primary/10 border border-brand-primary/20 hover:bg-brand-primary/20"
                    : "text-brand-muted hover:text-white hover:bg-brand-surface"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  {link.highlight && <Sparkles size={12} className="text-brand-accent animate-pulse" />}
                  {link.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Quick Theme Selector Dropdown */}
          <div className="relative hidden lg:block">
            <select
              value={activeThemeId}
              onChange={(e) => handleThemeChange(e.target.value)}
              className="bg-brand-surface border border-brand-border text-brand-muted text-xs font-medium py-2 px-3 rounded-xl focus:outline-none focus:border-brand-primary cursor-pointer"
            >
              {BRAND_THEMES.map((theme) => (
                <option key={theme.id} value={theme.id}>
                  🎨 {theme.name}
                </option>
              ))}
            </select>
          </div>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsOpen(true)}
            className="relative p-2.5 rounded-xl bg-brand-card border border-brand-border text-white hover:border-brand-primary transition-all group"
            aria-label="Open pickup cart"
          >
            <ShoppingBag size={18} className="group-hover:scale-110 transition-transform" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-brand-primary text-white text-[10px] font-bold flex items-center justify-center shadow-lg animate-bounce">
                {totalItems}
              </span>
            )}
          </button>

          {/* Order Ahead CTA */}
          <Link
            href="/menu"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-brand-primary text-white font-bold text-xs shadow-lg shadow-brand-primary/20 hover:bg-brand-primary-hover active:scale-95 transition-all"
          >
            Order Ahead
          </Link>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-brand-muted hover:text-white"
          >
            {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-6 border-t border-brand-border bg-brand-dark/95 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-brand-muted hover:text-white hover:bg-brand-card"
            >
              {link.name}
            </Link>
          ))}
          
          <div className="pt-2 border-t border-brand-border/60">
            <label className="block text-xs font-semibold text-brand-muted mb-1.5">
              Select White-Label Theme
            </label>
            <select
              value={activeThemeId}
              onChange={(e) => handleThemeChange(e.target.value)}
              className="w-full bg-brand-surface border border-brand-border text-brand-text text-xs py-2 px-3 rounded-xl"
            >
              {BRAND_THEMES.map((theme) => (
                <option key={theme.id} value={theme.id}>
                  🎨 {theme.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </header>
  );
};
