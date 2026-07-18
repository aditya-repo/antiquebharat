import { assamRegion } from "@/app/lib/regions/assam";
import { biharRegion } from "@/app/lib/regions/bihar";
import { gujaratRegion } from "@/app/lib/regions/gujarat";
import { karnatakaRegion } from "@/app/lib/regions/karnataka";
import { kashmirRegion } from "@/app/lib/regions/kashmir";
import { odishaRegion } from "@/app/lib/regions/odisha";
import { rajasthanRegion } from "@/app/lib/regions/rajasthan";
import { tamilNaduRegion } from "@/app/lib/regions/tamil-nadu";
import { uttarPradeshRegion } from "@/app/lib/regions/uttar-pradesh";
import { westBengalRegion } from "@/app/lib/regions/west-bengal";
import type { RegionPageData } from "@/app/lib/regions/types";

/** State-wise region registry. Add new states here as they go live. */
const REGIONS: Record<string, RegionPageData> = {
  [rajasthanRegion.slug]: rajasthanRegion,
  [kashmirRegion.slug]: kashmirRegion,
  [gujaratRegion.slug]: gujaratRegion,
  [uttarPradeshRegion.slug]: uttarPradeshRegion,
  [biharRegion.slug]: biharRegion,
  [westBengalRegion.slug]: westBengalRegion,
  [odishaRegion.slug]: odishaRegion,
  [karnatakaRegion.slug]: karnatakaRegion,
  [tamilNaduRegion.slug]: tamilNaduRegion,
  [assamRegion.slug]: assamRegion,
};

export function getRegionBySlug(slug: string): RegionPageData | undefined {
  return REGIONS[slug];
}

export function getAllRegions(): RegionPageData[] {
  return Object.values(REGIONS);
}

export function getAllRegionSlugs(): string[] {
  return Object.keys(REGIONS);
}

export type { RegionPageData, RegionProduct } from "@/app/lib/regions/types";
