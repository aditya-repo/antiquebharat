"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { SectionHeading } from "@/app/components/SectionHeading";

export type TraditionalCraft = {
  place: string;
  craft?: string;
  description: string;
  slug: string;
  image: string;
};

type TraditionalCraftsProps = {
  crafts: readonly TraditionalCraft[];
  region: string;
  subtitle?: string;
};

export function TraditionalCrafts({
  crafts,
  region,
  subtitle,
}: TraditionalCraftsProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: "left" | "right") => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(".region-crafts__card");
    const gap = Number.parseFloat(getComputedStyle(track).columnGap || "18");
    const amount = (card?.offsetWidth ?? 260) + gap;
    track.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section
      className="region-crafts"
      aria-labelledby="traditional-crafts-title"
    >
      <SectionHeading
        title="TRADITIONAL CRAFTS"
        titleId="traditional-crafts-title"
      />
      {subtitle ? (
        <p className="region-crafts__subtitle">{subtitle}</p>
      ) : null}

      <div className="region-crafts__carousel">
        <button
          type="button"
          className="region-crafts__nav region-crafts__nav--prev"
          onClick={() => scrollByCard("left")}
          aria-label="Previous crafts"
        >
          <span aria-hidden="true">‹</span>
        </button>

        <div ref={trackRef} className="region-crafts__track">
          {crafts.map((item) => (
            <article key={item.slug} className="region-crafts__card">
              <div className="region-crafts__art">
                <Image
                  src={item.image}
                  alt={item.craft ?? item.place}
                  fill
                  sizes="(max-width: 640px) 70vw, (max-width: 1100px) 40vw, 280px"
                  className="region-crafts__image"
                />
              </div>
              <div className="region-crafts__body">
                {item.place ? (
                  <div className="region-crafts__tags">
                    <span className="region-crafts__tag">{item.place}</span>
                  </div>
                ) : null}
                <h3 className="region-crafts__title">
                  {item.craft ?? item.place}
                </h3>
                <p className="region-crafts__desc">{item.description}</p>
                <Link
                  href={`/shop?region=${region}&craft=${item.slug}`}
                  className="region-crafts__cta"
                >
                  Know More
                </Link>
              </div>
            </article>
          ))}
        </div>

        <button
          type="button"
          className="region-crafts__nav region-crafts__nav--next"
          onClick={() => scrollByCard("right")}
          aria-label="Next crafts"
        >
          <span aria-hidden="true">›</span>
        </button>
      </div>
    </section>
  );
}
