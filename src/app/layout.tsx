import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { ChatWidget } from "@/components/ChatWidget";
import { DEFAULT_BRAND_CONFIG } from "@/config/brand";

export const metadata: Metadata = {
  metadataBase: new URL("https://velvetandbean.com"),
  title: `${DEFAULT_BRAND_CONFIG.name} | Artisanal Coffee & Order Ahead Pickup`,
  description: `${DEFAULT_BRAND_CONFIG.tagline} - ${DEFAULT_BRAND_CONFIG.description}`,
  keywords: ["specialty coffee", "artisan roastery", "order ahead coffee", "latte art", "san francisco coffee", "n8n AI coffee bot"],
  openGraph: {
    title: DEFAULT_BRAND_CONFIG.name,
    description: DEFAULT_BRAND_CONFIG.description,
    images: ["/images/hero-coffee.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen flex flex-col bg-brand-dark text-brand-text antialiased selection:bg-brand-primary selection:text-white">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <ChatWidget />
        </CartProvider>
      </body>
    </html>
  );
}
