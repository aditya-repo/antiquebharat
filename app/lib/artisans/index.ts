import { rameshKumar } from "@/app/lib/artisans/ramesh-kumar";
import type { ArtisanProfile } from "@/app/lib/artisans/types";

const ARTISANS: Record<string, ArtisanProfile> = {
  [rameshKumar.slug]: rameshKumar,
};

export function getArtisanBySlug(slug: string): ArtisanProfile | undefined {
  return ARTISANS[slug];
}

export function getAllArtisans(): ArtisanProfile[] {
  return Object.values(ARTISANS);
}

export function getAllArtisanSlugs(): string[] {
  return Object.keys(ARTISANS);
}

export type {
  ArtisanCollection,
  ArtisanProduct,
  ArtisanProfile,
} from "@/app/lib/artisans/types";
