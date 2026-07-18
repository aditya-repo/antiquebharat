export type ArtisanCollection = {
  slug: string;
  name: string;
  productCount: number;
  image: string;
};

export type ArtisanProduct = {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
};

export type ArtisanProfile = {
  slug: string;
  name: string;
  title: string;
  verified: boolean;
  bio: string;
  portrait: string;
  portraitAlt: string;
  heroDecorImage?: string;
  craft: string;
  village: string;
  experience: string;
  specialization: string;
  generations: string;
  collections: readonly ArtisanCollection[];
  featuredProducts: readonly ArtisanProduct[];
};
