import Image from "next/image";
import Link from "next/link";

import { getAllArtisans } from "@/app/lib/artisans";

export default function ArtisansIndexPage() {
  const artisans = getAllArtisans();

  return (
    <main className="artisan-index">
      <div className="artisan-index__inner">
        <nav className="region-breadcrumb" aria-label="Breadcrumb">
          <ol className="region-breadcrumb__list">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li aria-hidden="true">›</li>
            <li aria-current="page">Artisans</li>
          </ol>
        </nav>

        <h1 className="artisan-index__title">Artisan Shops</h1>
        <p className="artisan-index__copy">
          Meet the makers keeping India&apos;s craft traditions alive — visit
          their shops and discover work made by hand.
        </p>

        <ul className="artisan-index__grid">
          {artisans.map((artisan) => (
            <li key={artisan.slug}>
              <Link
                href={`/artisan/${artisan.slug}`}
                className="artisan-index__card"
              >
                <div className="artisan-index__media">
                  <Image
                    src={artisan.portrait}
                    alt={artisan.portraitAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="artisan-index__image"
                  />
                </div>
                <div className="artisan-index__body">
                  {artisan.verified ? (
                    <span className="artisan-profile__badge artisan-profile__badge--compact">
                      Verified Artisan
                    </span>
                  ) : null}
                  <h2 className="artisan-index__name">{artisan.name}</h2>
                  <p className="artisan-index__role">{artisan.title}</p>
                  <p className="artisan-index__meta">{artisan.village}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
