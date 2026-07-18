import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { HeartIcon } from "@/app/components/icons/HeaderIcons";
import { HeritageJournal } from "@/app/components/HeritageJournal";
import { ArtisanCommunities } from "@/app/components/regions/ArtisanCommunities";
import { TraditionalCrafts } from "@/app/components/regions/TraditionalCrafts";
import { SectionHeading } from "@/app/components/SectionHeading";
import {
  getAllRegionSlugs,
  getRegionBySlug,
} from "@/app/lib/regions";

type RegionPageProps = {
  params: Promise<{ slug: string }>;
};

function formatPrice(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function generateStaticParams() {
  return getAllRegionSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: RegionPageProps) {
  const { slug } = await params;
  const region = getRegionBySlug(slug);
  if (!region) return { title: "Region Not Found" };
  return {
    title: `${region.name} | Antique Bharat`,
    description: region.tagline,
  };
}

export default async function RegionPage({ params }: RegionPageProps) {
  const { slug } = await params;
  const region = getRegionBySlug(slug);

  if (!region) {
    notFound();
  }

  return (
    <main className="region-page">
      <section className="region-hero" aria-labelledby="region-hero-title">
        <header className="region-hero__intro">
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
              <li aria-current="page">{region.name}</li>
            </ol>
          </nav>

          <h1 id="region-hero-title" className="region-hero__title">
            {region.name}
          </h1>
          <p className="region-hero__tagline">{region.tagline}</p>
        </header>

        <div className="region-hero__body">
          <div className="region-hero__content">
            {region.copy.map((paragraph, index) => (
              <p
                key={index}
                className={
                  index === 0
                    ? "region-hero__copy"
                    : "region-hero__copy region-hero__copy--second"
                }
              >
                {paragraph}
              </p>
            ))}

            <ul className="region-hero__highlights">
              {region.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <blockquote className="region-hero__quote">
              <p>{region.quote}</p>
            </blockquote>
          </div>

          <div className="region-hero__media">
            <Image
              src={region.heroImage}
              alt={region.heroImageAlt}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 52vw"
              className="region-hero__image"
            />
          </div>
        </div>
      </section>

      <TraditionalCrafts
        crafts={region.crafts}
        region={region.slug}
        subtitle={region.craftsSubtitle}
      />

      <section
        className="region-products"
        aria-labelledby="region-products-title"
      >
        <SectionHeading
          title={region.productsTitle}
          titleId="region-products-title"
        />

        <ul className="region-products__grid">
          {region.products.map((product) => (
            <li key={product.id} className="region-products__item">
              <article className="product-card">
                <Link
                  href={`/shop/${product.id}`}
                  className="product-card__link"
                  draggable={false}
                >
                  <div className="product-card__media">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      draggable={false}
                      sizes="(max-width: 640px) 48vw, 25vw"
                      className="product-card__image"
                    />
                    <span
                      className="product-card__wishlist"
                      aria-hidden="true"
                    >
                      <HeartIcon className="product-card__wishlist-icon" />
                    </span>
                  </div>
                  <div className="product-card__info">
                    <h3 className="product-card__name">{product.name}</h3>
                    <p className="product-card__desc">{product.description}</p>
                    <p className="product-card__price">
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
            href={`/shop?region=${region.slug}`}
            className="region-products__button"
          >
            {region.productsCtaLabel}
          </Link>
        </div>
      </section>

      <ArtisanCommunities
        communities={region.communities}
        region={region.slug}
        subtitle={region.communitiesSubtitle}
      />

      {region.showHeritageJournal ? <HeritageJournal /> : null}
    </main>
  );
}
