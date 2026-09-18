"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, Phone, Mail, Navigation, Wifi, Car, CheckCircle2, Coffee, Sparkles } from "lucide-react";
import { DEFAULT_BRAND_CONFIG } from "@/config/brand";

export default function LocationsPage() {
  const [selectedStoreId, setSelectedStoreId] = useState("flagship");

  const stores = [
    {
      id: "flagship",
      name: "San Francisco Flagship & Roastery",
      address: "742 Evergreen Terrace, Suite 100",
      city: "San Francisco, CA 94107",
      phone: "(555) 382-9488",
      hoursWeekday: "6:30 AM - 7:00 PM",
      hoursWeekend: "7:00 AM - 8:00 PM",
      status: "OPEN NOW",
      amenities: ["Free High-Speed WiFi", "Outdoor Patio Seating", "Direct Trade Roastery", "EV Charging Stations"],
      mapCoordinates: { lat: 37.7749, lng: -122.4194 },
    },
    {
      id: "downtown",
      name: "Financial District Express Bar",
      address: "100 Montgomery St, Lobby 12",
      city: "San Francisco, CA 94104",
      phone: "(555) 492-1102",
      hoursWeekday: "6:00 AM - 5:00 PM",
      hoursWeekend: "Closed Sat/Sun",
      status: "OPEN NOW",
      amenities: ["Mobile Order Pickup Bay", "Nitro Taps", "Gluten-Free Bakery"],
      mapCoordinates: { lat: 37.7901, lng: -122.4022 },
    },
    {
      id: "sunset",
      name: "Sunset District Coffee Lounge",
      address: "1840 Judah Street",
      city: "San Francisco, CA 94122",
      phone: "(555) 831-7729",
      hoursWeekday: "7:00 AM - 6:00 PM",
      hoursWeekend: "7:00 AM - 7:00 PM",
      status: "OPEN NOW",
      amenities: ["Co-Working Space", "Dog Friendly Patio", "Matcha Tasting Bar"],
      mapCoordinates: { lat: 37.7615, lng: -122.4831 },
    },
  ];

  const activeStore = stores.find((s) => s.id === selectedStoreId) || stores[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 min-h-screen">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-extrabold uppercase tracking-widest text-brand-primary flex items-center justify-center gap-1.5">
          <MapPin size={16} /> Store Locator
        </span>
        <h1 className="text-4xl font-extrabold text-white">Locations & Operating Hours</h1>
        <p className="text-sm text-brand-muted">
          Visit one of our artisanal coffee shops across the city or order ahead for zero-wait pickup.
        </p>
      </div>

      {/* Main Layout: List + Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Col: Store Selector List */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">
            Select A Location ({stores.length})
          </h3>

          {stores.map((store) => (
            <div
              key={store.id}
              onClick={() => setSelectedStoreId(store.id)}
              className={`p-5 rounded-3xl cursor-pointer border transition-all ${
                selectedStoreId === store.id
                  ? "bg-brand-card border-brand-primary shadow-xl shadow-brand-primary/10"
                  : "bg-brand-surface border-brand-border/60 hover:border-brand-muted"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-base font-bold text-white">{store.name}</h4>
                  <p className="text-xs text-brand-muted mt-1">{store.address}</p>
                  <p className="text-xs text-brand-muted">{store.city}</p>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-400 text-[10px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {store.status}
                </span>
              </div>

              <div className="mt-4 pt-3 border-t border-brand-border/40 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-brand-accent font-medium">
                  <Clock size={14} /> Weekdays: {store.hoursWeekday}
                </div>
                <span className="text-brand-primary font-bold hover:underline">Select Store →</span>
              </div>
            </div>
          ))}
        </div>

        {/* Right Col: Interactive Store Detail & Stylized Map */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Stylized Interactive Map Container */}
          <div className="relative h-72 sm:h-96 rounded-3xl overflow-hidden glass-panel border border-brand-border bg-brand-surface flex items-center justify-center">
            {/* Map Grid Background pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#3D3631_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

            {/* Stylized Map View overlay */}
            <div className="relative z-10 text-center p-6 space-y-4 max-w-sm">
              <div className="w-16 h-16 rounded-full bg-brand-primary/20 text-brand-primary border border-brand-primary/40 flex items-center justify-center mx-auto shadow-2xl animate-bounce">
                <MapPin size={32} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">{activeStore.name}</h4>
                <p className="text-xs text-brand-muted mt-1">{activeStore.address}, {activeStore.city}</p>
              </div>

              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(activeStore.address + " " + activeStore.city)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-brand-primary to-brand-accent text-white font-bold text-xs shadow-xl shadow-brand-primary/30 hover:brightness-110 transition-all"
              >
                <Navigation size={14} /> Open in Google Maps
              </a>
            </div>

            {/* Corner Location Badge */}
            <div className="absolute top-4 left-4 p-3 rounded-2xl glass-card border border-white/10 text-xs text-white">
              <div className="text-[10px] text-brand-muted">GPS Coordinates</div>
              <div className="font-mono text-brand-primary">{activeStore.mapCoordinates.lat}, {activeStore.mapCoordinates.lng}</div>
            </div>
          </div>

          {/* Active Store Amenities & Contact Info */}
          <div className="p-6 rounded-3xl glass-card border border-brand-border space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Store Features & Amenities</h4>
            <div className="grid grid-cols-2 gap-3">
              {activeStore.amenities.map((amenity, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-brand-text">
                  <CheckCircle2 size={14} className="text-brand-primary shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-brand-border/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-2 text-brand-muted">
                <Phone size={14} className="text-brand-primary" /> {activeStore.phone}
              </div>
              <Link
                href="/menu"
                className="px-5 py-2.5 rounded-xl bg-brand-primary text-white font-bold hover:bg-brand-primary-hover transition-colors"
              >
                Order Pickup For This Location
              </Link>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
