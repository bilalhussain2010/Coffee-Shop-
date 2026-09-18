export interface BrandTheme {
  id: string;
  name: string;
  description: string;
  colors: {
    primary: string;
    primaryHover: string;
    primaryGlow: string;
    secondary: string;
    accent: string;
    dark: string;
    surface: string;
    card: string;
    border: string;
    text: string;
    muted: string;
  };
}

export interface BrandConfig {
  name: string;
  tagline: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  stateZip: string;
  hours: {
    weekday: string;
    weekend: string;
  };
  socials: {
    instagram: string;
    facebook: string;
    twitter: string;
  };
  b2b: {
    agencyName: string;
    agencyOffer: string;
    price: string;
  };
}

export const DEFAULT_BRAND_CONFIG: BrandConfig = {
  name: "Velvet & Bean",
  tagline: "Artisanal Specialty Coffee & Fresh Pastries",
  description: "Crafting small-batch direct-trade roasts, organic botanical teas, and handmade daily pastries with love for our community.",
  phone: "(555) 382-9488",
  email: "hello@velvetandbean.com",
  address: "742 Evergreen Terrace, Suite 100",
  city: "San Francisco",
  stateZip: "CA 94107",
  hours: {
    weekday: "6:30 AM - 7:00 PM",
    weekend: "7:00 AM - 8:00 PM",
  },
  socials: {
    instagram: "https://instagram.com/velvetandbean",
    facebook: "https://facebook.com/velvetandbean",
    twitter: "https://twitter.com/velvetandbean",
  },
  b2b: {
    agencyName: "CafeFlow AI Solutions",
    agencyOffer: "Complete AI Chatbot & High-Converting Web Template for Local Cafes",
    price: "$499 / mo or $2,499 One-Time",
  }
};

export const BRAND_THEMES: BrandTheme[] = [
  {
    id: "artisan-roastery",
    name: "Artisan Roastery",
    description: "Warm Amber, Dark Espresso & Gold Accents",
    colors: {
      primary: "#D97706", // Amber 600
      primaryHover: "#B45309", // Amber 700
      primaryGlow: "rgba(217, 119, 6, 0.4)",
      secondary: "#78350F", // Amber 900
      accent: "#F59E0B", // Amber 500
      dark: "#0F0D0C", // Deep Roaster Black
      surface: "#1A1715",
      card: "#24201D",
      border: "#3D3631",
      text: "#F3F4F6",
      muted: "#9CA3AF",
    },
  },
  {
    id: "velvet-cream",
    name: "Velvet Latte",
    description: "Soft Terracotta, Cream & Warm Cocoa",
    colors: {
      primary: "#C2410C", // Terracotta
      primaryHover: "#9A3412",
      primaryGlow: "rgba(194, 65, 12, 0.4)",
      secondary: "#7C2D12",
      accent: "#FB923C",
      dark: "#141110",
      surface: "#1C1816",
      card: "#27221F",
      border: "#443A35",
      text: "#FAFAF9",
      muted: "#A8A29E",
    },
  },
  {
    id: "matcha-botanical",
    name: "Matcha & Mint",
    description: "Sage Green, Forest Moss & Matcha Cream",
    colors: {
      primary: "#15803D", // Green 700
      primaryHover: "#166534",
      primaryGlow: "rgba(21, 128, 61, 0.4)",
      secondary: "#14532D",
      accent: "#4ADE80",
      dark: "#0C140E",
      surface: "#121E15",
      card: "#19291D",
      border: "#2A4532",
      text: "#F0FDF4",
      muted: "#86EFAC",
    },
  },
  {
    id: "midnight-cyber",
    name: "Midnight Brew",
    description: "Ultra-Modern Dark Slate & Neon Espresso Amber",
    colors: {
      primary: "#EAB308", // Golden Yellow
      primaryHover: "#CA8A04",
      primaryGlow: "rgba(234, 179, 8, 0.4)",
      secondary: "#854D0E",
      accent: "#FDE047",
      dark: "#0B0F17",
      surface: "#111827",
      card: "#1F2937",
      border: "#374151",
      text: "#F9FAFB",
      muted: "#9CA3AF",
    },
  },
];

export function applyBrandTheme(themeId: string) {
  if (typeof document === "undefined") return;
  const theme = BRAND_THEMES.find((t) => t.id === themeId) || BRAND_THEMES[0];
  const root = document.documentElement;

  root.style.setProperty("--brand-primary", theme.colors.primary);
  root.style.setProperty("--brand-primary-hover", theme.colors.primaryHover);
  root.style.setProperty("--brand-primary-glow", theme.colors.primaryGlow);
  root.style.setProperty("--brand-secondary", theme.colors.secondary);
  root.style.setProperty("--brand-accent", theme.colors.accent);
  root.style.setProperty("--brand-dark", theme.colors.dark);
  root.style.setProperty("--brand-surface", theme.colors.surface);
  root.style.setProperty("--brand-card", theme.colors.card);
  root.style.setProperty("--brand-border", theme.colors.border);
  root.style.setProperty("--brand-text", theme.colors.text);
  root.style.setProperty("--brand-muted", theme.colors.muted);
}
