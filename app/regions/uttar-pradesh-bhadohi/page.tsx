import Image from "next/image";
import Link from "next/link";

import { HeartIcon } from "@/app/components/icons/HeaderIcons";
import { ArtisanCommunities } from "@/app/components/regions/ArtisanCommunities";
import { SectionHeading } from "@/app/components/SectionHeading";

const STATS = [
  { label: "Carpet Heritage", value: "400+ Years" },
  { label: "Weaver Families", value: "2.5 Lakh+" },
  { label: "Signature Weaves", value: "15+" },
  { label: "GI Tag Legacy", value: "Since 2010" },
] as const;

const CRAFTS = [
  {
    label: "Hand-Knotted Carpet",
    image:
      "https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&w=400&q=80",
  },
  {
    label: "Durries",
    image:
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=400&q=80",
  },
  {
    label: "Flatweave",
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80",
  },
  {
    label: "Silk Carpet",
    image:
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=400&q=80",
  },
  {
    label: "Wool Carpet",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80",
  },
  {
    label: "Tufted Rug",
    image:
      "https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=400&q=80",
  },
] as const;

const COMMUNITIES = [
  {
    name: "Bunkar",
    craft: "Carpet Weavers",
    image:
      "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Knotters",
    craft: "Hand-Knotting",
    image:
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Rangrez",
    craft: "Dye Masters",
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Naqshaband",
    craft: "Pattern Designers",
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Finishing Guild",
    craft: "Clipping & Binding",
    image:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
  },
] as const;

const PRODUCTS = [
  {
    id: "bh-1",
    name: "Hand-Knotted Wool Carpet",
    price: 12999,
    image:
      "https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "bh-2",
    name: "Bhadohi Flatweave Durrie",
    price: 4599,
    image:
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "bh-3",
    name: "Silk Accent Rug",
    price: 18999,
    image:
      "https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "bh-4",
    name: "Traditional Prayer Carpet",
    price: 6299,
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
  },
] as const;

function formatPrice(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export default function BhadohiRegionPage() {
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
              <li aria-current="page">Bhadohi</li>
            </ol>
          </nav>

          <h1 id="region-hero-title" className="region-hero__title">
            Bhadohi
          </h1>
          <p className="region-hero__tagline">
            Carpet Capital of Uttar Pradesh
          </p>
          <p className="region-hero__copy">
            Bhadohi is India&apos;s renowned carpet hub, where generations of
            weavers craft hand-knotted and flatwoven rugs with GI-tagged
            excellence. Every knot carries the quiet discipline of Purvanchal
            craftsmanship and a legacy woven for the world.
          </p>
        </div>

        <div className="region-hero__media">
          <Image
            src="https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&w=1400&q=80"
            alt="Handwoven carpet craft from Bhadohi, Uttar Pradesh"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 52vw"
            className="region-hero__image"
          />
        </div>
      </section>

      <section className="region-stats" aria-label="Bhadohi craft statistics">
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

      <ArtisanCommunities
        communities={COMMUNITIES}
        subtitle="Weavers and dye masters keeping Bhadohi's carpet legacy alive."
      />

      <section
        className="region-products"
        aria-labelledby="region-products-title"
      >
        <SectionHeading
          title="SHOP PRODUCTS FROM BHADOHI"
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
          <Link
            href="/shop?region=bhadohi"
            className="region-products__button"
          >
            VIEW ALL BHADOHI PRODUCTS
          </Link>
        </div>
      </section>
    </main>
  );
}
