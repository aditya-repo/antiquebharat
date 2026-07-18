import type { ArtisanCommunity } from "@/app/components/regions/ArtisanCommunities";
import type { TraditionalCraft } from "@/app/components/regions/TraditionalCrafts";

export type RegionProduct = {
  id: string;
  name: string;
  tags: readonly string[];
  description: string;
  price: number;
  image: string;
};

export type RegionPageData = {
  slug: string;
  name: string;
  tagline: string;
  heroImage: string;
  heroImageAlt: string;
  copy: readonly string[];
  highlights: readonly string[];
  quote: string;
  craftsSubtitle: string;
  crafts: readonly TraditionalCraft[];
  communitiesSubtitle: string;
  communities: readonly ArtisanCommunity[];
  productsTitle: string;
  productsCtaLabel: string;
  products: readonly RegionProduct[];
  showHeritageJournal?: boolean;
};
