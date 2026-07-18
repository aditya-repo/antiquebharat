export type ProductDetail = {
  id: string;
  name: string;
  category: string;
  categoryHref: string;
  price: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  description: string;
  specs: { label: string; value: string }[];
  heritage: { label: string; value: string }[];
  symbolism: string;
  story: string;
  care: string;
  shipping: string;
  images: string[];
};

const NATARAJA: ProductDetail = {
  id: "brass-nataraja-statue",
  name: "Brass Nataraja Statue",
  category: "Home Decor",
  categoryHref: "/shop/home-decor",
  price: 4899,
  rating: 4.8,
  reviewCount: 124,
  inStock: true,
  description:
    "Handcrafted in brass by skilled artisans, this Nataraja statue represents the cosmic dance of Lord Shiva — a symbol of creation, preservation and transformation.",
  specs: [
    { label: "Material", value: "Pure Brass" },
    { label: "Height", value: "12 inches" },
    { label: "Craft", value: "Traditional Lost-Wax Casting" },
    { label: "Region", value: "Tamil Nadu" },
    { label: "Time to Make", value: "7-10 days" },
  ],
  heritage: [
    { label: "Region", value: "Tamil Nadu" },
    { label: "Craft Age", value: "1000+ Years" },
    { label: "Made by", value: "Local Artisans" },
    { label: "Time to Make", value: "7-10 days" },
    { label: "Material", value: "Pure Brass" },
  ],
  symbolism:
    "Nataraja represents the cosmic dance of creation and destruction. It brings positive energy and removes negativity.",
  story:
    "Cast using the ancient lost-wax method practised across Tamil Nadu, each Nataraja begins as a beeswax model before molten brass fills the mould. Artisan families refine the flame-like aureole, the raised foot of liberation, and the quiet smile that balances motion with stillness — a piece meant to live at the heart of the home.",
  care:
    "Dust gently with a soft dry cloth. Avoid harsh chemicals and abrasive scrubbing. Occasional brass polish restores the warm glow. Keep dry and away from prolonged moisture.",
  shipping:
    "Free shipping on orders above ₹1,999 within India. Easy returns within 7 days of delivery if unused and in original packaging. International shipping available on select routes.",
  images: [
    "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?auto=format&fit=crop&w=1200&q=80",
  ],
};

const CATALOG: Record<string, ProductDetail> = {
  [NATARAJA.id]: NATARAJA,
  "1": {
    ...NATARAJA,
    id: "1",
    name: "Brass Urli Hanging Lamp",
    price: 2850,
    category: "Home Decor",
  },
  "2": {
    ...NATARAJA,
    id: "2",
    name: "Handblock Printed Cotton Dupatta",
    price: 1650,
    category: "Textiles",
    categoryHref: "/shop/textiles",
  },
  "3": {
    ...NATARAJA,
    id: "3",
    name: "Handpainted Ceramic Storage Jar",
    price: 1350,
    category: "Tableware",
    categoryHref: "/shop/tableware",
  },
  "4": {
    ...NATARAJA,
    id: "4",
    name: "Handcarved Wooden Jewellery Box",
    price: 2150,
    category: "Storage",
    categoryHref: "/shop/home-decor",
  },
  "5": {
    ...NATARAJA,
    id: "5",
    name: "Antique Brass Diya Stand",
    price: 1890,
  },
  "6": {
    ...NATARAJA,
    id: "6",
    name: "Handwoven Block Print Cushion",
    price: 980,
  },
  "na-1": { ...NATARAJA, id: "na-1", name: "Brass Ganesha Idol", price: 3250 },
  "na-2": {
    ...NATARAJA,
    id: "na-2",
    name: "Blue Pottery Tea Set",
    price: 2450,
    category: "Tableware",
    categoryHref: "/shop/tableware",
  },
  "rj-1": {
    ...NATARAJA,
    id: "rj-1",
    name: "Blue Pottery Plate",
    price: 1299,
    category: "Tableware",
    categoryHref: "/shop/tableware",
  },
  "bh-1": {
    ...NATARAJA,
    id: "bh-1",
    name: "Hand-Knotted Wool Carpet",
    price: 12999,
    category: "Textiles",
    categoryHref: "/shop/textiles",
  },
};

export function getProduct(id: string): ProductDetail {
  return CATALOG[id] ?? { ...NATARAJA, id };
}

export function formatPrice(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}
