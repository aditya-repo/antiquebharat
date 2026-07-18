import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArtisanCollectionsCarousel } from "@/app/components/artisan/ArtisanCollectionsCarousel";
import { ArtisanProfileIntro } from "@/app/components/artisan/ArtisanProfileIntro";
import { HeartIcon } from "@/app/components/icons/HeaderIcons";
import {
  getAllArtisanSlugs,
  getArtisanBySlug,
} from "@/app/lib/artisans";

type ArtisanPageProps = {
  params: Promise<{ slug: string }>;
};

function formatPrice(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

function CraftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 18h16M7 18V9l5-5 5 5v9"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function VillageIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="12" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function ExperienceIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M12 8v4l3 2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SpecializationIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3 4.5 7v5c0 4.5 3.2 7.8 7.5 9 4.3-1.2 7.5-4.5 7.5-9V7L12 3Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GenerationsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="8" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="16" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M4 18c.8-2.2 2.6-3.5 4.5-3.5S12 15.8 12.8 18M11.2 18c.8-2.2 2.6-3.5 4.5-3.5S20 15.8 20.8 18"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function generateStaticParams() {
  return getAllArtisanSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ArtisanPageProps) {
  const { slug } = await params;
  const artisan = getArtisanBySlug(slug);
  if (!artisan) return { title: "Artisan Not Found" };
  return {
    title: `${artisan.name} | Antique Bharat`,
    description: artisan.bio,
  };
}

export default async function ArtisanProfilePage({ params }: ArtisanPageProps) {
  const { slug } = await params;
  const artisan = getArtisanBySlug(slug);

  if (!artisan) {
    notFound();
  }

  const meta = [
    { label: "Craft", value: artisan.craft, icon: <CraftIcon /> },
    { label: "Village", value: artisan.village, icon: <VillageIcon /> },
    { label: "Experience", value: artisan.experience, icon: <ExperienceIcon /> },
    {
      label: "Specialization",
      value: artisan.specialization,
      icon: <SpecializationIcon />,
    },
    {
      label: "Generations",
      value: artisan.generations,
      icon: <GenerationsIcon />,
    },
  ] as const;

  return (
    <main className="artisan-profile">
      <div className="artisan-profile__inner">
        <nav className="region-breadcrumb" aria-label="Breadcrumb">
          <ol className="region-breadcrumb__list">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li aria-hidden="true">›</li>
            <li>
              <Link href="/artisan">Artisans</Link>
            </li>
            <li aria-hidden="true">›</li>
            <li>
              <Link href="/artisan">Artisan Shops</Link>
            </li>
            <li aria-hidden="true">›</li>
            <li aria-current="page">{artisan.name}</li>
          </ol>
        </nav>

        <section
          className="artisan-profile__hero"
          aria-labelledby="artisan-profile-title"
        >
          <div className="artisan-profile__hero-main">
            <div className="artisan-profile__portrait">
              <Image
                src={artisan.portrait}
                alt={artisan.portraitAlt}
                fill
                priority
                sizes="(max-width: 900px) 100vw, 48vw"
                className="artisan-profile__portrait-image"
              />
            </div>

            <ArtisanProfileIntro
              name={artisan.name}
              title={artisan.title}
              bio={artisan.bio}
              verified={artisan.verified}
              heroDecorImage={artisan.heroDecorImage}
              meta={meta}
            />
          </div>

          <ul
            className="artisan-profile__meta artisan-profile__meta--desktop"
            aria-label="Artisan details"
          >
            {meta.map((item) => (
              <li key={item.label} className="artisan-profile__meta-item">
                <span className="artisan-profile__meta-icon">{item.icon}</span>
                <span className="artisan-profile__meta-text">
                  <span className="artisan-profile__meta-label">
                    {item.label}
                  </span>
                  <span className="artisan-profile__meta-value">
                    {item.value}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section
          className="artisan-profile__section"
          aria-labelledby="artisan-collections-title"
        >
          <div className="artisan-profile__section-head">
            <h2
              id="artisan-collections-title"
              className="artisan-profile__section-title"
            >
              Shop by Collection
            </h2>
            <Link
              href={`/artisan/${artisan.slug}/collections`}
              className="artisan-profile__section-link"
            >
              View all collections →
            </Link>
          </div>

          <ArtisanCollectionsCarousel
            artisanSlug={artisan.slug}
            collections={artisan.collections}
          />
        </section>

        <section
          className="artisan-profile__section"
          aria-labelledby="artisan-products-title"
        >
          <div className="artisan-profile__section-head">
            <h2
              id="artisan-products-title"
              className="artisan-profile__section-title"
            >
              Featured Products
            </h2>
            <Link
              href={`/shop?artisan=${artisan.slug}`}
              className="artisan-profile__section-link"
            >
              View all products →
            </Link>
          </div>

          <ul className="artisan-profile__products">
            {artisan.featuredProducts.map((product) => (
              <li key={product.id}>
                <article className="product-card artisan-profile__product-card">
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
                        sizes="(max-width: 640px) 48vw, 16vw"
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
                      {product.description ? (
                        <p className="product-card__desc">
                          {product.description}
                        </p>
                      ) : null}
                      <p className="product-card__price">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
