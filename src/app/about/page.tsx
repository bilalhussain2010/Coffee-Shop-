"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Coffee, Heart, Globe, Flame, Leaf, Award, ArrowRight, Sparkles } from "lucide-react";
import { DEFAULT_BRAND_CONFIG } from "@/config/brand";

export default function AboutPage() {
  const values = [
    {
      icon: <Globe size={24} className="text-brand-primary" />,
      title: "100% Direct-Trade Sourcing",
      desc: "We partner directly with smallholder coffee farmers in Colombia, Ethiopia, and Guatemala, ensuring 3x fair market value payouts.",
    },
    {
      icon: <Flame size={24} className="text-brand-primary" />,
      title: "Small-Batch Micro Roasting",
      desc: "Our master roasters roast in 10kg batches daily using custom profiles designed to extract maximum fruit, floral, and chocolate notes.",
    },
    {
      icon: <Leaf size={24} className="text-brand-primary" />,
      title: "Zero-Waste & Compostable",
      desc: "Every cup, straw, and bag is 100% plant-based and 90-day commercially compostable. Our coffee grounds are donated to local gardens.",
    },
    {
      icon: <Heart size={24} className="text-brand-primary" />,
      title: "Community First",
      desc: "5% of every order goes directly to local youth barista apprenticeships and food shelter outreach programs in our neighborhood.",
    },
  ];

  const timeline = [
    { year: "2019", title: "First Pop-Up Cart", desc: "Started as a weekend pour-over pop-up cart at the Mission District farmers market." },
    { year: "2021", title: "Flagship Cafe Opens", desc: "Opened our first brick-and-mortar cafe featuring custom espresso bars and organic bakery." },
    { year: "2024", title: "Zero-Emission Roastery", desc: "Built our state-of-the-art electric solar-powered coffee roastery facility." },
    { year: "2026", title: "AI-Powered Cafe Experience", desc: "Integrated smart n8n order routing and 24/7 AI Barista pickup assistant!" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
      
      {/* 1. HERO STORY HEADER */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-primary flex items-center gap-1.5">
            <Award size={16} /> Our Coffee Philosophy
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Rooted in Craft, Dedicated to Community.
          </h1>
          <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
            {DEFAULT_BRAND_CONFIG.name} was born out of an unrelenting obsession with exceptional single-origin coffee and genuine human connection. We believe every cup of espresso should tell a story—from high-altitude volcanic soils to your morning cup.
          </p>
          <div className="pt-2 flex items-center gap-4">
            <Link
              href="/menu"
              className="px-6 py-3.5 rounded-2xl bg-brand-primary text-white font-bold text-xs hover:bg-brand-primary-hover transition-all flex items-center gap-2"
            >
              <Coffee size={16} /> Taste Our Roasts
            </Link>
            <Link
              href="/locations"
              className="px-6 py-3.5 rounded-2xl glass-card border border-brand-border text-white font-bold text-xs hover:border-brand-primary transition-all"
            >
              Visit Our Cafe
            </Link>
          </div>
        </div>

        {/* Feature Image Grid */}
        <div className="relative h-96 sm:h-[440px] rounded-3xl overflow-hidden glass-panel border border-brand-border">
          <Image
            src="/images/cafe-interior.png"
            alt="Velvet & Bean Cafe Interior & Barista Counter"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl glass-card border border-white/10 text-xs text-white">
            <div className="font-bold text-sm text-brand-primary">Our San Francisco Flagship Roastery</div>
            <div className="text-brand-muted mt-0.5">Designed with warm natural timber, acoustic acoustic panels, and precision Synesso espresso machines.</div>
          </div>
        </div>
      </div>

      {/* 2. OUR CORE VALUES GRID */}
      <div className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-primary">
            Ethical Sourcing & Sustainability
          </span>
          <h2 className="text-3xl font-extrabold text-white">The Four Pillars of Our Craft</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl glass-card border border-brand-border/60 space-y-4 hover:border-brand-primary/50 transition-colors"
            >
              <div className="p-3 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 w-fit">
                {v.icon}
              </div>
              <h3 className="text-lg font-bold text-white">{v.title}</h3>
              <p className="text-xs text-brand-muted leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. TIMELINE JOURNEY */}
      <div className="p-8 sm:p-12 rounded-3xl glass-panel border border-brand-border space-y-10 bg-brand-surface/70">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-accent">
            Our Growth Journey
          </span>
          <h2 className="text-3xl font-extrabold text-white">From Farmers Market Cart to AI Cafe</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {timeline.map((t, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-brand-card border border-brand-border space-y-2 relative"
            >
              <span className="text-2xl font-black text-brand-primary font-mono">{t.year}</span>
              <h4 className="text-sm font-bold text-white">{t.title}</h4>
              <p className="text-xs text-brand-muted">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. B2B TEMPLATE PROMOTIONAL BANNER */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-brand-card to-brand-surface border border-brand-primary/40 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="text-xs font-bold text-brand-accent flex items-center gap-1">
            <Sparkles size={14} /> White-Label Template Demonstration
          </div>
          <h3 className="text-xl font-bold text-white">Want This Exact Website & Story Layout for Your Own Cafe?</h3>
          <p className="text-xs text-brand-muted">
            Rebrand colors, logos, and narrative in under 10 minutes with our complete white-label automation solution.
          </p>
        </div>
        <Link
          href="/b2b"
          className="px-6 py-3 rounded-xl bg-brand-primary text-white text-xs font-bold hover:bg-brand-primary-hover shrink-0 transition-colors"
        >
          View B2B Sales Page
        </Link>
      </div>

    </div>
  );
}
