"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { SectionHeading } from "@/app/components/SectionHeading";

export type ArtisanCommunity = {
  name: string;
  description: string;
  slug: string;
  image: string;
};

type ArtisanCommunitiesProps = {
  communities: readonly ArtisanCommunity[];
  region?: string;
  subtitle?: string;
};

export function ArtisanCommunities({
  communities,
  region = "uttar-pradesh",
  subtitle = "Skilled hands preserving centuries-old techniques.",
}: ArtisanCommunitiesProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: "left" | "right") => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(".region-artisan-card");
    const gap = Number.parseFloat(getComputedStyle(track).columnGap || "18");
    const amount = (card?.offsetWidth ?? 260) + gap;
    track.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section
      className="region-artisans"
      aria-labelledby="artisan-communities-title"
    >
      <SectionHeading
        title="ARTISAN COMMUNITIES"
        titleId="artisan-communities-title"
      />
      {subtitle ? (
        <p className="region-artisans__subtitle">{subtitle}</p>
      ) : null}

      <div className="region-artisans__carousel">
        <button
          type="button"
          className="region-artisans__nav region-artisans__nav--prev"
          onClick={() => scrollByCard("left")}
          aria-label="Previous artisan communities"
        >
          <span aria-hidden="true">‹</span>
        </button>

        <div ref={trackRef} className="region-artisans__track">
          {communities.map((community) => (
            <article key={community.slug} className="region-artisan-card">
              <div className="region-artisan-card__media">
                <Image
                  src={community.image}
                  alt={community.name}
                  fill
                  sizes="(max-width: 640px) 70vw, (max-width: 1100px) 40vw, 280px"
                  className="region-artisan-card__image"
                />
              </div>
              <div className="region-artisan-card__body">
                <h3 className="region-artisan-card__name">{community.name}</h3>
                <p className="region-artisan-card__desc">
                  {community.description}
                </p>
                <Link
                  href={`/shop?region=${region}&community=${community.slug}`}
                  className="region-artisan-card__cta"
                >
                  Know More
                </Link>
              </div>
            </article>
          ))}
        </div>

        <button
          type="button"
          className="region-artisans__nav region-artisans__nav--next"
          onClick={() => scrollByCard("right")}
          aria-label="Next artisan communities"
        >
          <span aria-hidden="true">›</span>
        </button>
      </div>
    </section>
  );
}
