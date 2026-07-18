"use client";

import Image from "next/image";
import { useRef } from "react";

import { HeartIcon } from "@/app/components/icons/HeaderIcons";
import { SectionHeading } from "@/app/components/SectionHeading";

export type ArtisanCommunity = {
  name: string;
  craft: string;
  image: string;
};

type ArtisanCommunitiesProps = {
  communities: readonly ArtisanCommunity[];
  subtitle?: string;
};

export function ArtisanCommunities({
  communities,
  subtitle = "Skilled hands preserving centuries-old techniques.",
}: ArtisanCommunitiesProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollNext = () => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(".region-artisan-card");
    const gap = Number.parseFloat(getComputedStyle(track).columnGap || "16");
    const amount = (card?.offsetWidth ?? 260) + gap;
    track.scrollBy({ left: amount, behavior: "smooth" });
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
      <p className="region-artisans__subtitle">{subtitle}</p>

      <div className="region-artisans__carousel">
        <div ref={trackRef} className="region-artisans__track">
          {communities.map((community) => (
            <article key={community.name} className="region-artisan-card">
              <div className="region-artisan-card__media">
                <Image
                  src={community.image}
                  alt={`${community.name} — ${community.craft}`}
                  fill
                  sizes="(max-width: 640px) 48vw, 280px"
                  className="region-artisan-card__image"
                />
                <button
                  type="button"
                  className="region-artisan-card__wishlist"
                  aria-label={`Save ${community.name}`}
                >
                  <HeartIcon className="region-artisan-card__wishlist-icon" />
                </button>
              </div>
              <p className="region-artisan-card__label">
                {community.name}{" "}
                <span className="region-artisan-card__craft">
                  ({community.craft})
                </span>
              </p>
            </article>
          ))}
        </div>

        <button
          type="button"
          className="region-artisans__nav"
          onClick={scrollNext}
          aria-label="Next artisan communities"
        >
          <span aria-hidden="true">›</span>
        </button>
      </div>
    </section>
  );
}
