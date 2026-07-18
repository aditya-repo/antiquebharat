import Link from "next/link";

const REGIONS = [
  { label: "Rajasthan", href: "/regions/rajasthan" },
  { label: "Kashmir", href: "/regions/kashmir" },
  { label: "Gujarat", href: "/regions/gujarat" },
  { label: "Uttar Pradesh", href: "/regions/uttar-pradesh" },
  { label: "Bihar", href: "/regions/bihar" },
  { label: "West Bengal", href: "/regions/west-bengal" },
  { label: "Odisha", href: "/regions/odisha" },
  { label: "Karnataka", href: "/regions/karnataka" },
  { label: "Tamil Nadu", href: "/regions/tamil-nadu" },
  { label: "Assam", href: "/regions/assam" },
] as const;

/** Approximate pin positions on the stylized India map (viewBox 0 0 280 340). */
const MAP_PINS = [
  { x: 78, y: 98 },
  { x: 118, y: 52 },
  { x: 62, y: 148 },
  { x: 148, y: 118 },
  { x: 198, y: 148 },
  { x: 188, y: 178 },
  { x: 108, y: 228 },
  { x: 128, y: 278 },
  { x: 218, y: 108 },
  { x: 168, y: 98 },
  { x: 98, y: 168 },
] as const;

function IndiaMap() {
  return (
    <svg
      className="explore-heritage__map"
      viewBox="0 0 280 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        className="explore-heritage__map-land"
        d="M118 28c8-6 22-10 34-6 14 4 22 16 28 28 6 10 18 14 28 12 8-2 16 6 14 14-2 10 4 18 12 22 10 6 14 18 10 28-4 8 2 18 10 22 6 4 8 14 4 20-6 10-2 22 6 28 6 4 6 14 0 18-8 6-6 18 0 24 4 4 2 14-4 16-10 4-12 16-8 24 4 10-4 18-12 22-8 4-14 14-12 24 2 10-6 18-16 20-12 2-22 10-24 22-2 8-10 14-18 12-12-2-22 6-24 16-2 8-12 10-18 4-8-8-20-4-26 4-4 6-14 6-18 0-6-8-18-6-22 2-4 6-14 4-16-2-4-10-16-12-24-6-6 4-14 0-14-8 0-10-10-16-18-12-6 2-12-4-10-10 4-12-4-24-14-30-6-4-6-14 0-18 8-6 6-18-2-24-4-4-2-12 4-14 10-4 12-16 6-24-4-6 0-16 8-18 10-4 14-14 12-24-2-8 4-16 12-18 6-2 10-10 8-16-2-8 6-16 14-14 6 2 14-2 16-8 4-10 16-12 24-6z"
        fill="#d4c0a0"
        stroke="#b89a72"
        strokeWidth="1.2"
      />
      <path
        d="M130 70c20 8 40 6 54 18M100 120c28 4 50 20 62 40M150 160c-10 24-8 48 6 70M90 180c18 16 24 40 20 62"
        stroke="#c4a882"
        strokeWidth="0.8"
        opacity="0.55"
      />
      {MAP_PINS.map((pin, index) => (
        <g key={`${pin.x}-${pin.y}-${index}`} transform={`translate(${pin.x} ${pin.y})`}>
          <path
            d="M0-14c-5.5 0-10 4.3-10 9.6 0 7.2 10 16.4 10 16.4s10-9.2 10-16.4C10-9.7 5.5-14 0-14z"
            fill="#5a2a24"
          />
          <circle cx="0" cy="-5.5" r="3.2" fill="#f4ebe0" />
        </g>
      ))}
    </svg>
  );
}

function RegionDot() {
  return (
    <span className="explore-heritage__dot" aria-hidden="true">
      <svg viewBox="0 0 16 16" width="14" height="14">
        <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="8" cy="8" r="2.5" fill="currentColor" />
      </svg>
    </span>
  );
}

export function ExploreHeritage() {
  return (
    <section className="explore-heritage" aria-labelledby="explore-heritage-title">
      <div className="explore-heritage__panel">
        <div className="explore-heritage__intro">
          <h2 id="explore-heritage-title" className="explore-heritage__title">
            EXPLORE INDIA&apos;S HERITAGE
          </h2>
          <p className="explore-heritage__copy">
            Discover crafts from different regions and the stories behind them.
          </p>
          <Link href="/regions" className="explore-heritage__cta">
            EXPLORE REGIONS
          </Link>
        </div>

        <div className="explore-heritage__map-wrap">
          <IndiaMap />
        </div>

        <div className="explore-heritage__regions">
          <ul className="explore-heritage__list">
            {REGIONS.map((region) => (
              <li key={region.href}>
                <Link href={region.href} className="explore-heritage__link">
                  <RegionDot />
                  <span>{region.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/regions" className="explore-heritage__all">
            View all Regions →
          </Link>
        </div>
      </div>
    </section>
  );
}
