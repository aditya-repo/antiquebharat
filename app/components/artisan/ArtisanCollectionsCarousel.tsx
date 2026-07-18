"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import type { ArtisanCollection } from "@/app/lib/artisans/types";

type ArtisanCollectionsCarouselProps = {
  artisanSlug: string;
  collections: readonly ArtisanCollection[];
};

export function ArtisanCollectionsCarousel({
  artisanSlug,
  collections,
}: ArtisanCollectionsCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: "left" | "right") => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(".artisan-collection-card");
    const gap = Number.parseFloat(getComputedStyle(track).columnGap || "16");
    const amount = (card?.offsetWidth ?? 200) + gap;
    track.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="artisan-collections-carousel">
      <button
        type="button"
        className="artisan-collections-carousel__nav artisan-collections-carousel__nav--prev"
        onClick={() => scrollByCard("left")}
        aria-label="Previous collections"
      >
        <span aria-hidden="true">‹</span>
      </button>

      <div ref={trackRef} className="artisan-collections-carousel__track">
        {collections.map((collection) => (
          <Link
            key={collection.slug}
            href={`/artisan/${artisanSlug}?collection=${collection.slug}`}
            className="artisan-collection-card"
          >
            <div className="artisan-collection-card__media">
              <Image
                src={collection.image}
                alt=""
                fill
                sizes="(max-width: 640px) 55vw, (max-width: 1100px) 28vw, 16vw"
                className="artisan-collection-card__image"
              />
            </div>
            <h3 className="artisan-collection-card__name">{collection.name}</h3>
            <p className="artisan-collection-card__count">
              {collection.productCount} Products
            </p>
          </Link>
        ))}
      </div>

      <button
        type="button"
        className="artisan-collections-carousel__nav artisan-collections-carousel__nav--next"
        onClick={() => scrollByCard("right")}
        aria-label="Next collections"
      >
        <span aria-hidden="true">›</span>
      </button>
    </div>
  );
}
