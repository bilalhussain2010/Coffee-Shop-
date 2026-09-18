export interface MenuItem {
  id: string;
  name: string;
  category: 'espresso' | 'brews' | 'teas' | 'pastries' | 'seasonal';
  price: number;
  description: string;
  image: string;
  dietary: ('vegan' | 'gluten-free' | 'dairy-free' | 'nut-free' | 'organic' | 'high-caffeine')[];
  popular?: boolean;
  calories?: number;
  customizable?: boolean;
  sizes?: { name: string; extraPrice: number }[];
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "espresso-latte-iced",
    name: "Artisan Iced Oat Latte",
    category: "espresso",
    price: 5.75,
    description: "Double shot of house-roasted espresso shaken with organic creamy oat milk over artisanal ice.",
    image: "/images/espresso-latte.png",
    dietary: ["vegan", "dairy-free", "organic"],
    popular: true,
    calories: 160,
    customizable: true,
    sizes: [
      { name: "Small (12oz)", extraPrice: 0 },
      { name: "Medium (16oz)", extraPrice: 0.75 },
      { name: "Large (20oz)", extraPrice: 1.25 },
    ]
  },
  {
    id: "nitro-cold-brew",
    name: "Velvet Nitro Cold Brew",
    category: "brews",
    price: 5.50,
    description: "Slow-steeped Ethiopian Yirgacheffe coffee infused with nitrogen for a silky, naturally sweet microfoam cascade.",
    image: "/images/cold-brew.png",
    dietary: ["vegan", "gluten-free", "dairy-free", "high-caffeine"],
    popular: true,
    calories: 5,
    customizable: true,
    sizes: [
      { name: "Regular (16oz)", extraPrice: 0 },
      { name: "Large (24oz)", extraPrice: 1.00 },
    ]
  },
  {
    id: "almond-croissant",
    name: "Golden Almond Croissant",
    category: "pastries",
    price: 4.85,
    description: "Hand-laminated flaky butter croissant filled with rich almond frangipane and topped with toasted sliced almonds.",
    image: "/images/pastry-croissant.png",
    dietary: [],
    popular: true,
    calories: 340,
    customizable: false,
  },
  {
    id: "matcha-ceremonial-latte",
    name: "Ceremonial Matcha Latte",
    category: "teas",
    price: 6.25,
    description: "First-harvest Uji ceremonial matcha whisked to order with warm oat milk and organic agave.",
    image: "/images/matcha-tea.png",
    dietary: ["vegan", "dairy-free", "organic"],
    popular: true,
    calories: 140,
    customizable: true,
    sizes: [
      { name: "Small (12oz)", extraPrice: 0 },
      { name: "Medium (16oz)", extraPrice: 0.75 },
      { name: "Large (20oz)", extraPrice: 1.25 },
    ]
  },
  {
    id: "seasonal-pumpkin-cinnamon",
    name: "Smoked Vanilla Cardamom Cappuccino",
    category: "seasonal",
    price: 6.50,
    description: "Espresso with house-made smoked bourbon vanilla bean syrup, micro-foamed milk, and freshly ground cardamom.",
    image: "/images/hero-coffee.png",
    dietary: ["gluten-free"],
    popular: true,
    calories: 180,
    customizable: true,
    sizes: [
      { name: "Small (12oz)", extraPrice: 0 },
      { name: "Medium (16oz)", extraPrice: 0.75 },
    ]
  },
  {
    id: "espresso-double-shot",
    name: "Single-Origin Double Espresso",
    category: "espresso",
    price: 3.75,
    description: "Rich espresso shot extracted from washed Colombian beans featuring notes of dark cocoa and bright citrus zest.",
    image: "/images/hero-coffee.png",
    dietary: ["vegan", "gluten-free", "dairy-free", "nut-free"],
    popular: false,
    calories: 5,
    customizable: false,
  },
  {
    id: "pour-over-kenya",
    name: "Single-Origin Kenya AA Pour-Over",
    category: "brews",
    price: 5.95,
    description: "V60 precision pour-over highlighting vibrant blackcurrant acidity, floral aroma, and a silky smooth body.",
    image: "/images/cold-brew.png",
    dietary: ["vegan", "gluten-free", "dairy-free", "organic"],
    popular: false,
    calories: 2,
    customizable: false,
  },
  {
    id: "tea-earl-grey-lavender",
    name: "Earl Grey Lavender Fog",
    category: "teas",
    price: 5.25,
    description: "Organic Earl Grey tea steeped with French lavender blossoms, topped with velvety steamed milk and vanilla.",
    image: "/images/matcha-tea.png",
    dietary: ["gluten-free"],
    popular: false,
    calories: 120,
    customizable: true,
  },
  {
    id: "pastry-pain-chocolat",
    name: "Artisan Chocolate Babka",
    category: "pastries",
    price: 5.15,
    description: "Twisted sweet brioche dough woven with rich Belgian dark chocolate ganache and orange zest glaze.",
    image: "/images/pastry-croissant.png",
    dietary: ["nut-free"],
    popular: false,
    calories: 390,
    customizable: false,
  },
  {
    id: "seasonal-maple-pecan-cold-foam",
    name: "Maple Pecan Cream Cold Brew",
    category: "seasonal",
    price: 6.75,
    description: "Our signature cold brew topped with aerated maple pecan sweet cold foam and toasted cinnamon crumble.",
    image: "/images/cold-brew.png",
    dietary: ["gluten-free"],
    popular: true,
    calories: 210,
    customizable: true,
  }
];

export const DIETARY_LABELS: Record<string, { label: string; bg: string; text: string }> = {
  vegan: { label: "Vegan", bg: "bg-emerald-950/80", text: "text-emerald-300 border-emerald-800/50" },
  "gluten-free": { label: "Gluten-Free", bg: "bg-amber-950/80", text: "text-amber-300 border-amber-800/50" },
  "dairy-free": { label: "Dairy-Free", bg: "bg-sky-950/80", text: "text-sky-300 border-sky-800/50" },
  "nut-free": { label: "Nut-Free", bg: "bg-purple-950/80", text: "text-purple-300 border-purple-800/50" },
  organic: { label: "Organic", bg: "bg-lime-950/80", text: "text-lime-300 border-lime-800/50" },
  "high-caffeine": { label: "⚡ High Energy", bg: "bg-rose-950/80", text: "text-rose-300 border-rose-800/50" },
};
