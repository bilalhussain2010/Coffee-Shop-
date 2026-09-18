"use client";

import React from "react";
import Link from "next/link";
import { Coffee, MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter, ShieldCheck, Sparkles } from "lucide-react";
import { DEFAULT_BRAND_CONFIG } from "@/config/brand";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-surface border-t border-brand-border text-brand-muted text-sm pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center text-white font-bold">
                <Coffee size={20} />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                {DEFAULT_BRAND_CONFIG.name}
              </span>
            </div>
            <p className="text-xs text-brand-muted leading-relaxed">
              {DEFAULT_BRAND_CONFIG.description}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href={DEFAULT_BRAND_CONFIG.socials.instagram} target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-brand-card hover:text-brand-primary transition-colors">
                <Instagram size={16} />
              </a>
              <a href={DEFAULT_BRAND_CONFIG.socials.facebook} target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-brand-card hover:text-brand-primary transition-colors">
                <Facebook size={16} />
              </a>
              <a href={DEFAULT_BRAND_CONFIG.socials.twitter} target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-brand-card hover:text-brand-primary transition-colors">
                <Twitter size={16} />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Explore Menu & Info</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/menu" className="hover:text-brand-primary transition-colors">
                  Full Artisanal Menu
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-primary transition-colors">
                  Our Direct-Trade Beans & Story
                </Link>
              </li>
              <li>
                <Link href="/locations" className="hover:text-brand-primary transition-colors">
                  Locations, Maps & Store Hours
                </Link>
              </li>
              <li>
                <Link href="/b2b" className="text-brand-accent font-semibold flex items-center gap-1 hover:underline">
                  <Sparkles size={12} /> Cafe Automation Template (B2B)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours & Location */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Visit Us</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="text-brand-primary shrink-0 mt-0.5" />
                <span>{DEFAULT_BRAND_CONFIG.address}, {DEFAULT_BRAND_CONFIG.city}, {DEFAULT_BRAND_CONFIG.stateZip}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="text-brand-primary shrink-0" />
                <span>{DEFAULT_BRAND_CONFIG.phone}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock size={16} className="text-brand-primary shrink-0 mt-0.5" />
                <div>
                  <div>Weekdays: {DEFAULT_BRAND_CONFIG.hours.weekday}</div>
                  <div>Weekends: {DEFAULT_BRAND_CONFIG.hours.weekend}</div>
                </div>
              </li>
            </ul>
          </div>

          {/* Col 4: VIP Newsletter & B2B Badge */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Join The Coffee Club</h4>
            <p className="text-xs text-brand-muted">
              Get secret menu drops, 15% off your first pickup order, and seasonal roast invites.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-brand-card border border-brand-border rounded-xl px-3 py-2 text-xs text-white placeholder-brand-muted focus:outline-none focus:border-brand-primary"
              />
              <button className="px-3 py-2 bg-brand-primary text-white font-bold rounded-xl text-xs hover:bg-brand-primary-hover transition-colors shrink-0">
                Join
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar & B2B White Label Notice */}
        <div className="pt-8 border-t border-brand-border/60 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div>
            © {new Date().getFullYear()} {DEFAULT_BRAND_CONFIG.name}. All rights reserved.
          </div>
          
          {/* B2B Template Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-card border border-brand-border text-brand-muted hover:border-brand-primary transition-all">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span>Powered by <Link href="/b2b" className="text-white font-bold underline hover:text-brand-primary">{DEFAULT_BRAND_CONFIG.b2b.agencyName}</Link> (White-Label Template Solution)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
