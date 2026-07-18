import Link from "next/link";

import { getAllRegions } from "@/app/lib/regions";

export default function RegionsPage() {
  const regions = getAllRegions();

  return (
    <main className="region-page region-index">
      <div className="region-index__inner">
        <h1 className="region-hero__title region-index__title">Regions</h1>
        <p className="region-hero__copy region-index__copy">
          Explore India&apos;s craft heritage, state by state.
        </p>
        <ul className="region-index__list">
          {regions.map((region) => (
            <li key={region.slug}>
              <Link
                href={`/regions/${region.slug}`}
                className="region-products__button"
              >
                Explore {region.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
