"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import {
  TRENDING_FEED,
  type TrendingItem,
} from "@/app/lib/trending";

/* Zigzag collage: tall beside short, then reverse — never a flat row */
const SIZE_PATTERN = ["xl", "sm", "md", "xl", "xs", "lg", "sm", "xl"] as const;

type FeedCard = TrendingItem & {
  key: string;
  size: (typeof SIZE_PATTERN)[number];
};

function sizeFor(index: number): (typeof SIZE_PATTERN)[number] {
  return SIZE_PATTERN[index % SIZE_PATTERN.length];
}

function buildPage(page: number): FeedCard[] {
  return TRENDING_FEED.map((item, index) => {
    const absoluteIndex = page * TRENDING_FEED.length + index;
    return {
      ...item,
      key: `${item.id}-${page}`,
      size: sizeFor(absoluteIndex),
    };
  });
}

function badgeClass(badge: TrendingItem["badge"]) {
  if (badge === "Trending") {
    return "trending-card__badge trending-card__badge--trending";
  }
  if (badge === "Bestseller") {
    return "trending-card__badge trending-card__badge--bestseller";
  }
  return "trending-card__badge trending-card__badge--new";
}

export function TrendingFeed() {
  const [cards, setCards] = useState<FeedCard[]>(() => buildPage(0));
  const pageRef = useRef(0);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);

  useEffect(() => {
    loadingRef.current = false;
  }, [cards.length]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const tryLoad = () => {
      if (loadingRef.current) return;
      const rect = sentinel.getBoundingClientRect();
      if (rect.top >= window.innerHeight + 480) return;

      loadingRef.current = true;
      const nextPage = pageRef.current + 1;
      pageRef.current = nextPage;
      setCards((current) => [...current, ...buildPage(nextPage)]);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) tryLoad();
      },
      { rootMargin: "480px 0px" },
    );

    observer.observe(sentinel);
    tryLoad();

    return () => observer.disconnect();
  }, [cards.length]);

  return (
    <section className="trending-feed" aria-labelledby="trending-feed-title">
      <h2 id="trending-feed-title" className="sr-only">
        Trending crafts
      </h2>

      <ul className="trending-feed__collage">
        {cards.map((item) => (
          <li key={item.key} className="trending-feed__item">
            <article className={`trending-card trending-card--${item.size}`}>
              <Link href={item.href} className="trending-card__link">
                <div className="trending-card__media">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(max-width: 1100px) 48vw, 33vw"
                    className="trending-card__image"
                  />
                  <div className="trending-card__shade" aria-hidden="true" />
                  {item.badge ? (
                    <span className={badgeClass(item.badge)}>{item.badge}</span>
                  ) : null}
                  {item.hasVideo ? (
                    <span className="trending-card__play" aria-hidden="true">
                      ▶
                    </span>
                  ) : null}
                  <h3 className="trending-card__title">{item.title}</h3>
                </div>
              </Link>
            </article>
          </li>
        ))}
      </ul>

      <div
        ref={sentinelRef}
        className="trending-feed__sentinel"
        aria-hidden="true"
      />
    </section>
  );
}
