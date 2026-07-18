import Link from "next/link";

const REGIONS = [
  { label: "Rajasthan", href: "/regions/rajasthan" },
  { label: "Bhadohi, Uttar Pradesh", href: "/regions/uttar-pradesh-bhadohi" },
] as const;

export default function RegionsPage() {
  return (
    <main className="region-page region-index">
      <div className="region-index__inner">
        <h1 className="region-hero__title region-index__title">Regions</h1>
        <p className="region-hero__copy region-index__copy">
          Explore India&apos;s craft heritage, region by region.
        </p>
        <ul className="region-index__list">
          {REGIONS.map((region) => (
            <li key={region.href}>
              <Link href={region.href} className="region-products__button">
                Explore {region.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
