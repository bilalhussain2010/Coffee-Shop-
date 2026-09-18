"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ShieldCheck, Zap, DollarSign, Bot, Palette, ArrowRight, CheckCircle2, Coffee, Send } from "lucide-react";
import { BRAND_THEMES, applyBrandTheme, DEFAULT_BRAND_CONFIG } from "@/config/brand";

export default function B2BPage() {
  const [activeThemeId, setActiveThemeId] = useState("artisan-roastery");
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    ownerName: "",
    cafeName: "",
    email: "",
    phone: "",
    city: "",
  });

  const handleThemeToggle = (themeId: string) => {
    setActiveThemeId(themeId);
    applyBrandTheme(themeId);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const features = [
    {
      icon: <Bot size={24} className="text-brand-primary" />,
      title: "n8n AI Barista Chatbot",
      desc: "Handles 24/7 menu inquiries, size recommendations, dietary filters, and direct pickup orders via external webhooks.",
    },
    {
      icon: <DollarSign size={24} className="text-brand-primary" />,
      title: "Zero Commission Fees",
      desc: "Stop giving away 30% of your margins to third-party delivery apps. Keep 100% of your online pickup revenues.",
    },
    {
      icon: <Palette size={24} className="text-brand-primary" />,
      title: "Instant White-Label Rebranding",
      desc: "Swap brand colors, typography, logos, and menu items instantly using CSS variables and modular configs.",
    },
    {
      icon: <Zap size={24} className="text-brand-primary" />,
      title: "Sub-10 Minute Setup",
      desc: "Deployable on Vercel or Netlify with built-in Next.js App Router and server-side API routes.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24 min-h-screen">
      
      {/* 1. HERO B2B HEADER */}
      <div className="text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-brand-primary/40 text-xs font-bold text-brand-accent shadow-xl">
          <Sparkles size={14} className="text-brand-primary animate-pulse" />
          <span>Turnkey Cafe Digital Solution & AI Automation Template</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Sell More Coffee. Eliminate Wait Lines. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-accent to-amber-200">
            Powered by Next.js & n8n AI.
          </span>
        </h1>

        <p className="text-base sm:text-lg text-brand-muted max-w-2xl mx-auto leading-relaxed">
          The ultimate white-label template for local cafe owners. Boost pickup orders by up to 35%, automate customer support 24/7, and rebrand for any coffee shop client in minutes.
        </p>
      </div>

      {/* 2. LIVE INTERACTIVE THEME CUSTOMIZER DEMO SANDBOX */}
      <div className="p-8 sm:p-12 rounded-3xl glass-panel border border-brand-primary/40 bg-gradient-to-b from-brand-surface to-brand-card space-y-8 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-widest text-brand-primary flex items-center gap-1.5 mb-1">
              <Palette size={16} /> Interactive White-Label Sandbox
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Test Instant Brand Color Swapping
            </h2>
            <p className="text-xs text-brand-muted mt-1">
              Click any color preset below to see the entire website theme update in real-time!
            </p>
          </div>

          {/* Theme Buttons Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {BRAND_THEMES.map((theme) => (
              <button
                key={theme.id}
                onClick={() => handleThemeToggle(theme.id)}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  activeThemeId === theme.id
                    ? "border-brand-primary bg-brand-dark shadow-lg shadow-brand-primary/20"
                    : "border-brand-border bg-brand-surface hover:border-brand-muted"
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <span
                    className="w-3.5 h-3.5 rounded-full inline-block border border-white/20"
                    style={{ backgroundColor: theme.colors.primary }}
                  />
                  <span className="text-xs font-bold text-white truncate">{theme.name}</span>
                </div>
                <div className="text-[10px] text-brand-muted truncate">{theme.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Sandbox Preview Banner */}
        <div className="p-6 rounded-2xl bg-brand-dark border border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-primary text-white flex items-center justify-center font-bold">
              <Coffee size={24} />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Active Theme: {BRAND_THEMES.find(t => t.id === activeThemeId)?.name}</div>
              <div className="text-xs text-brand-muted">Primary Color Token: <span className="font-mono text-brand-primary">{BRAND_THEMES.find(t => t.id === activeThemeId)?.colors.primary}</span></div>
            </div>
          </div>
          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl bg-brand-primary text-white text-xs font-bold hover:bg-brand-primary-hover transition-all"
          >
            View Home Page With This Theme →
          </Link>
        </div>
      </div>

      {/* 3. B2B FEATURES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl glass-card border border-brand-border/60 space-y-4 hover:border-brand-primary transition-all"
          >
            <div className="p-3 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 w-fit">
              {f.icon}
            </div>
            <h3 className="text-lg font-bold text-white">{f.title}</h3>
            <p className="text-xs text-brand-muted leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* 4. PRICING PLANS FOR CAFE OWNERS */}
      <div className="space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-primary">
            Simple White-Label Pricing
          </span>
          <h2 className="text-3xl font-extrabold text-white">Choose Your Deployment Model</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Plan 1: Starter */}
          <div className="p-8 rounded-3xl glass-card border border-brand-border space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-brand-muted">Starter License</div>
              <div className="text-3xl font-extrabold text-white">$299 <span className="text-xs text-brand-muted font-normal">/ month</span></div>
              <p className="text-xs text-brand-muted">Ideal for single-location specialty coffee shops.</p>
              <ul className="space-y-2.5 text-xs text-brand-text pt-4 border-t border-brand-border">
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-400" /> Full Next.js Coffee Website</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-400" /> n8n Chatbot Webhook Routing</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-400" /> Mobile Order Ahead Cart</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-400" /> 4 Pre-built Color Themes</li>
              </ul>
            </div>
            <a href="#lead-form" className="w-full py-3.5 rounded-2xl bg-brand-surface border border-brand-border text-white text-center font-bold text-xs hover:border-brand-primary transition-all">
              Get Started
            </a>
          </div>

          {/* Plan 2: Growth (Recommended) */}
          <div className="p-8 rounded-3xl glass-panel border-2 border-brand-primary relative space-y-6 flex flex-col justify-between shadow-2xl bg-brand-card">
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-brand-primary text-white text-[10px] font-extrabold uppercase tracking-widest shadow-lg">
              Most Popular Solution
            </span>
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-brand-accent">Complete White-Label Package</div>
              <div className="text-3xl font-extrabold text-white">$2,499 <span className="text-xs text-brand-muted font-normal">One-Time Fee</span></div>
              <p className="text-xs text-brand-muted">Full source code ownership, custom branding setup, and dedicated n8n workflow deployment.</p>
              <ul className="space-y-2.5 text-xs text-brand-text pt-4 border-t border-brand-border">
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-400" /> Complete Next.js Source Code</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-400" /> Custom n8n Workflow JSON Included</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-400" /> White-Label Theme Customizer</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-400" /> Custom Domain & Vercel Setup</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-400" /> Priority Technical Support</li>
              </ul>
            </div>
            <a href="#lead-form" className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-brand-primary to-brand-accent text-white text-center font-bold text-xs shadow-lg hover:brightness-110 transition-all">
              Buy Full Source Code Template
            </a>
          </div>

          {/* Plan 3: Multi-Location Enterprise */}
          <div className="p-8 rounded-3xl glass-card border border-brand-border space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-brand-muted">Multi-Store Chain</div>
              <div className="text-3xl font-extrabold text-white">Custom <span className="text-xs text-brand-muted font-normal">Quote</span></div>
              <p className="text-xs text-brand-muted">For regional coffee roasters with 3+ locations.</p>
              <ul className="space-y-2.5 text-xs text-brand-text pt-4 border-t border-brand-border">
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-400" /> Multi-location Store Locator</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-400" /> POS System Integration (Square/Toast)</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-400" /> Custom AI Barista Voice Persona</li>
              </ul>
            </div>
            <a href="#lead-form" className="w-full py-3.5 rounded-2xl bg-brand-surface border border-brand-border text-white text-center font-bold text-xs hover:border-brand-primary transition-all">
              Contact Agency Sales
            </a>
          </div>
        </div>
      </div>

      {/* 5. LEAD CAPTURE FORM */}
      <div id="lead-form" className="p-8 sm:p-12 rounded-3xl glass-panel border border-brand-border max-w-3xl mx-auto space-y-8 bg-brand-surface">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-extrabold text-white">Request Cafe Automation Demo & Quote</h3>
          <p className="text-xs text-brand-muted">
            Fill out your cafe details below and our team will prepare a custom white-labeled demo for your coffee shop.
          </p>
        </div>

        {submitted ? (
          <div className="p-8 rounded-2xl bg-emerald-950/60 border border-emerald-800 text-center space-y-3">
            <CheckCircle2 size={40} className="text-emerald-400 mx-auto" />
            <h4 className="text-xl font-bold text-white">Demo Request Received!</h4>
            <p className="text-xs text-brand-muted max-w-sm mx-auto">
              Thank you! Our automation team will reach out to <span className="text-white font-bold">{formData.email}</span> within 4 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-brand-muted mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.ownerName}
                  onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                  placeholder="e.g. Marcus Vance"
                  className="w-full bg-brand-card border border-brand-border rounded-xl px-4 py-2.5 text-xs text-white placeholder-brand-muted focus:outline-none focus:border-brand-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-brand-muted mb-1">Cafe / Roastery Name</label>
                <input
                  type="text"
                  required
                  value={formData.cafeName}
                  onChange={(e) => setFormData({ ...formData, cafeName: e.target.value })}
                  placeholder="e.g. Apex Roast Lab"
                  className="w-full bg-brand-card border border-brand-border rounded-xl px-4 py-2.5 text-xs text-white placeholder-brand-muted focus:outline-none focus:border-brand-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-brand-muted mb-1">Work Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="marcus@apexroast.com"
                  className="w-full bg-brand-card border border-brand-border rounded-xl px-4 py-2.5 text-xs text-white placeholder-brand-muted focus:outline-none focus:border-brand-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-brand-muted mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(555) 000-0000"
                  className="w-full bg-brand-card border border-brand-border rounded-xl px-4 py-2.5 text-xs text-white placeholder-brand-muted focus:outline-none focus:border-brand-primary"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-brand-primary to-brand-accent text-white font-extrabold text-sm shadow-xl shadow-brand-primary/30 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              <Send size={16} /> Request Custom White-Label Demo
            </button>
          </form>
        )}
      </div>

    </div>
  );
}
