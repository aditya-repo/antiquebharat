import Image from "next/image";
import Link from "next/link";

import { HeartIcon } from "@/app/components/icons/HeaderIcons";
import { ArtisanCommunities } from "@/app/components/regions/ArtisanCommunities";
import { SectionHeading } from "@/app/components/SectionHeading";

const STATS = [
  { label: "Craft Traditions", value: "500+ Years" },
  { label: "Artisan Communities", value: "37+" },
  { label: "Popular Crafts", value: "12+" },
  { label: "Generations of Legacy", value: "Countless" },
] as const;

const CRAFTS = [
  {
    label: "Blue Pottery",
    image:
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=400&q=80",
  },
  {
    label: "Marble Inlay",
    image:
      "https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?auto=format&fit=crop&w=400&q=80",
  },
  {
    label: "Meenakari",
    image:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=400&q=80",
  },
  {
    label: "Kota Doria",
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80",
  },
  {
    label: "Leather Craft",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=400&q=80",
  },
  {
    label: "Lac Bangle",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=400&q=80",
  },
] as const;

const COMMUNITIES = [
  {
    name: "Kumhar",
    craft: "Potters",
    image:
      "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Suthar",
    craft: "Carpenters",
    image:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Sonar",
    craft: "Metal Craftsmen",
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Chhipa",
    craft: "Printers & Dyers",
    image:
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Lohar",
    craft: "Blacksmiths",
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
  },
] as const;

const PRODUCTS = [
  {
    id: "rj-1",
    name: "Blue Pottery Plate",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "rj-2",
    name: "Meenakari Elephant",
    price: 2499,
    image:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "rj-3",
    name: "Marble Inlay Box",
    price: 3599,
    image:
      "https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "rj-4",
    name: "Kota Doria Saree",
    price: 2899,
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
  },
] as const;

function formatPrice(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export default function RajasthanRegionPage() {
  return (
    <main className="region-page">
      <section className="region-hero" aria-labelledby="region-hero-title">
        <div className="region-hero__content">
          <nav className="region-breadcrumb" aria-label="Breadcrumb">
            <ol className="region-breadcrumb__list">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li aria-hidden="true">›</li>
              <li>
                <Link href="/regions">Regions</Link>
              </li>
              <li aria-hidden="true">›</li>
              <li aria-current="page">Rajasthan</li>
            </ol>
          </nav>

          <h1 id="region-hero-title" className="region-hero__title">
            Rajasthan
          </h1>
          <p className="region-hero__tagline">
            Land of Kings and Master Craftsmen
          </p>
          <p className="region-hero__copy">
            Rajasthan has a glorious tradition of arts and crafts under royal
            patronage. From the blue pottery of Jaipur to the marble inlay of
            Agra&apos;s influence, every craft tells a story of heritage,
            patience, and unmatched artistry.
          </p>
        </div>

        <div className="region-hero__media">
          <Image
            src="https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1400&q=80"
            alt="Amber Fort in Rajasthan at golden hour"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 52vw"
            className="region-hero__image"
          />
        </div>
      </section>

      <section className="region-stats" aria-label="Rajasthan craft statistics">
        <ul className="region-stats__list">
          {STATS.map((stat) => (
            <li key={stat.label} className="region-stats__item">
              <span className="region-stats__label">{stat.label}</span>
              <span className="region-stats__value">{stat.value}</span>
            </li>
          ))}
        </ul>
      </section>

      <section
        className="region-crafts"
        aria-labelledby="traditional-crafts-title"
      >
        <SectionHeading
          title="TRADITIONAL CRAFTS"
          titleId="traditional-crafts-title"
        />
        <ul className="region-crafts__grid">
          {CRAFTS.map((craft) => (
            <li key={craft.label} className="region-crafts__item">
              <div className="region-crafts__card">
                <div className="region-crafts__art">
                  <Image
                    src={craft.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 45vw, 160px"
                    className="region-crafts__image"
                  />
                </div>
                <span className="region-crafts__label">{craft.label}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <ArtisanCommunities communities={COMMUNITIES} />

      <section
        className="region-products"
        aria-labelledby="region-products-title"
      >
        <SectionHeading
          title="SHOP PRODUCTS FROM RAJASTHAN"
          titleId="region-products-title"
        />

        <ul className="region-products__grid">
          {PRODUCTS.map((product) => (
            <li key={product.id} className="region-products__item">
              <article className="region-product-card">
                <Link
                  href={`/shop/${product.id}`}
                  className="region-product-card__link"
                >
                  <div className="region-product-card__media">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 48vw, 25vw"
                      className="region-product-card__image"
                    />
                    <span
                      className="region-product-card__wishlist"
                      aria-hidden="true"
                    >
                      <HeartIcon className="region-product-card__wishlist-icon" />
                    </span>
                  </div>
                  <div className="region-product-card__info">
                    <h3 className="region-product-card__name">
                      {product.name}
                    </h3>
                    <p className="region-product-card__price">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                </Link>
              </article>
            </li>
          ))}
        </ul>

        <div className="region-products__cta">
          <Link href="/shop?region=rajasthan" className="region-products__button">
            VIEW ALL RAJASTHAN PRODUCTS
          </Link>
        </div>
      </section>
    </main>
  );
}
