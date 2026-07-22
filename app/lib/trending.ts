export type TrendingCommunity = {
  slug: string;
  name: string;
  image: string;
  href: string;
};

export type TrendingItem = {
  id: string;
  title: string;
  subtitle: string;
  price?: number;
  image: string;
  badge?: "Trending" | "Bestseller" | "New Arrival";
  community: string;
  href: string;
  hasVideo?: boolean;
};

export const TRENDING_COMMUNITIES: readonly TrendingCommunity[] = [
  {
    slug: "kashmir-weavers",
    name: "Kashmir Weavers",
    image:
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=300&q=80",
    href: "/artisan",
  },
  {
    slug: "saharanpur-carvers",
    name: "Saharanpur Carvers",
    image:
      "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=300&q=80",
    href: "/artisan",
  },
  {
    slug: "kumbhar-potters",
    name: "Kumbhar Potters",
    image:
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=300&q=80",
    href: "/artisan",
  },
  {
    slug: "varanasi-weavers",
    name: "Varanasi Weavers",
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=300&q=80",
    href: "/artisan",
  },
  {
    slug: "jaipur-block",
    name: "Jaipur Block Printers",
    image:
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=300&q=80",
    href: "/regions/rajasthan",
  },
  {
    slug: "moradabad-brass",
    name: "Moradabad Brass",
    image:
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=300&q=80",
    href: "/artisan/ramesh-kumar",
  },
  {
    slug: "bidri-masters",
    name: "Bidri Masters",
    image:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=300&q=80",
    href: "/regions/karnataka",
  },
  {
    slug: "madhubani",
    name: "Madhubani Artists",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=300&q=80",
    href: "/regions/bihar",
  },
] as const;

export const TRENDING_FEED: readonly TrendingItem[] = [
  {
    id: "t1",
    title: "Vintage Carved Wooden Panel",
    subtitle: "Handcarved relief for wall or console",
    price: 12499,
    image:
      "https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?auto=format&fit=crop&w=800&q=80",
    badge: "Trending",
    community: "Saharanpur Carvers",
    href: "/shop/1",
  },
  {
    id: "t2",
    title: "The Art of Bidri Work",
    subtitle: "Silver inlay craft from Bidar",
    image:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80",
    badge: "Bestseller",
    community: "Bidri Masters",
    href: "/regions/karnataka",
    hasVideo: true,
  },
  {
    id: "t3",
    title: "Handwoven Pashmina Shawl",
    subtitle: "Fine Kashmiri weave",
    price: 8999,
    image:
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=800&q=80",
    badge: "New Arrival",
    community: "Kashmir Weavers",
    href: "/shop/2",
  },
  {
    id: "t4",
    title: "Brass Temple Diya Set",
    subtitle: "Moradabad cast brass",
    price: 2499,
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
    badge: "Trending",
    community: "Moradabad Brass",
    href: "/shop/5",
  },
  {
    id: "t5",
    title: "Madhubani Wall Scroll",
    subtitle: "Natural dye on handmade paper",
    price: 3499,
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
    community: "Madhubani Artists",
    href: "/shop/3",
  },
  {
    id: "t6",
    title: "Blue Pottery Vase",
    subtitle: "Jaipur glazed ceramic",
    price: 1899,
    image:
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80",
    badge: "Bestseller",
    community: "Kumbhar Potters",
    href: "/shop/3",
  },
  {
    id: "t7",
    title: "Block Print Cotton Quilt",
    subtitle: "Sanganer handblock print",
    price: 4599,
    image:
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80",
    badge: "New Arrival",
    community: "Jaipur Block Printers",
    href: "/shop/6",
  },
  {
    id: "t8",
    title: "Banarasi Silk Scarf",
    subtitle: "Varanasi loom weave",
    price: 5299,
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
    badge: "Trending",
    community: "Varanasi Weavers",
    href: "/shop/2",
  },
] as const;
