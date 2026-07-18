"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const ARTICLES = [
  {
    id: "dhokra",
    title: "The History of Dhokra Metal Casting",
    description:
      "Trace the lost-wax tradition of tribal metalwork that has shaped idols and utensils for over 4,000 years.",
    category: "Craft History",
    readTime: "6 min read",
    date: "12 Mar 2026",
    href: "/heritage-journal/dhokra-metal-casting",
    image:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Dhokra metal casting sculpture",
  },
  {
    id: "banarasi",
    title: "Why Banarasi Silk is World Famous",
    description:
      "From Mughal patronage to modern looms — the weave, zari, and motifs that made Varanasi silk legendary.",
    category: "Textiles",
    readTime: "5 min read",
    date: "4 Mar 2026",
    href: "/heritage-journal/banarasi-silk",
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Banarasi silk fabric with gold weave",
  },
  {
    id: "temple-bells",
    title: "The Symbolism Behind Indian Temple Bells",
    description:
      "Why a single chime at the doorway is believed to awaken the senses and invite auspicious energy.",
    category: "Symbolism",
    readTime: "4 min read",
    date: "28 Feb 2026",
    href: "/heritage-journal/temple-bells",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Traditional Indian temple bell",
  },
  {
    id: "blue-pottery",
    title: "Jaipur Blue Pottery: A Persian Legacy",
    description:
      "How turquoise glazes and floral patterns travelled to Rajasthan and became a craft of the pink city.",
    category: "Regional Craft",
    readTime: "7 min read",
    date: "18 Feb 2026",
    href: "/heritage-journal/jaipur-blue-pottery",
    image:
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Blue pottery ceramic vessels",
  },
] as const;

export function HeritageJournal() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: "left" | "right") => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(".heritage-journal-card");
    const gap = Number.parseFloat(getComputedStyle(track).columnGap || "20");
    const amount = (card?.offsetWidth ?? 300) + gap;
    track.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="heritage-journal" aria-labelledby="heritage-journal-title">
      <div className="heritage-journal__header">
        <h2 id="heritage-journal-title" className="heritage-journal__title">
          THE HERITAGE JOURNAL
        </h2>
        <p className="heritage-journal__subtitle">
          Stories, history &amp; inspiration
        </p>
      </div>

      <div className="heritage-journal__carousel">
        <button
          type="button"
          className="heritage-journal__nav heritage-journal__nav--prev"
          onClick={() => scrollByCard("left")}
          aria-label="Previous articles"
        >
          <span aria-hidden="true">‹</span>
        </button>

        <div ref={trackRef} className="heritage-journal__track">
          {ARTICLES.map((article) => (
            <article key={article.id} className="heritage-journal-card">
              <Link href={article.href} className="heritage-journal-card__link">
                <div className="heritage-journal-card__media">
                  <Image
                    src={article.image}
                    alt={article.imageAlt}
                    fill
                    sizes="(max-width: 640px) 80vw, (max-width: 1100px) 42vw, 28vw"
                    className="heritage-journal-card__image"
                  />
                  <span className="heritage-journal-card__category">
                    {article.category}
                  </span>
                </div>
                <div className="heritage-journal-card__body">
                  <div className="heritage-journal-card__meta">
                    <time dateTime={article.date}>{article.date}</time>
                    <span aria-hidden="true">·</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="heritage-journal-card__title">
                    {article.title}
                  </h3>
                  <p className="heritage-journal-card__desc">
                    {article.description}
                  </p>
                  <span className="heritage-journal-card__more">
                    Read More →
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>

        <button
          type="button"
          className="heritage-journal__nav heritage-journal__nav--next"
          onClick={() => scrollByCard("right")}
          aria-label="Next articles"
        >
          <span aria-hidden="true">›</span>
        </button>
      </div>
    </section>
  );
}
