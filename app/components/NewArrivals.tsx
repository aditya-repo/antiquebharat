"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { HeartIcon } from "@/app/components/icons/HeaderIcons";
import { SectionHeading } from "@/app/components/SectionHeading";

const PRODUCTS = [
  {
    id: "na-1",
    name: "Brass Ganesha Idol",
    category: "Home Decor",
    price: 3250,
    image:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Brass Ganesha idol on a dark surface",
  },
  {
    id: "na-2",
    name: "Blue Pottery Tea Set",
    category: "Tableware",
    price: 2450,
    image:
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Blue pottery tea set",
  },
  {
    id: "na-3",
    name: "Pichwai Handpainted Wall Art",
    category: "Wall Art",
    price: 3850,
    image:
      "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Traditional handpainted wall art",
  },
  {
    id: "na-4",
    name: "Ajrakh Printed Stole",
    category: "Textiles",
    price: 1950,
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Ajrakh printed stole fabric",
  },
  {
    id: "na-5",
    name: "Brass Bell",
    category: "Pooja Essentials",
    price: 1150,
    image:
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Brass bell for pooja",
  },
  {
    id: "na-6",
    name: "Leather Sling Bag",
    category: "Bags & Accessories",
    price: 2850,
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Leather sling bag",
  },
] as const;

function formatPrice(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function NewArrivals() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: "left" | "right") => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(".product-card");
    const gap = Number.parseFloat(getComputedStyle(track).columnGap || "20");
    const amount = (card?.offsetWidth ?? 280) + gap;
    track.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="new-arrivals" aria-labelledby="new-arrivals-title">
      <SectionHeading
        title="NEW ARRIVALS"
        titleId="new-arrivals-title"
        action={{ label: "VIEW ALL PRODUCTS →", href: "/shop" }}
      />

      <div className="product-carousel">
        <button
          type="button"
          className="product-carousel__nav product-carousel__nav--prev"
          onClick={() => scrollByCard("left")}
          aria-label="Previous new arrivals"
        >
          <span aria-hidden="true">‹</span>
        </button>

        <div ref={trackRef} className="product-carousel__track">
          {PRODUCTS.map((product) => (
            <article key={product.id} className="product-card">
              <Link
                href={`/shop/${product.id}`}
                className="product-card__link"
                draggable={false}
              >
                <div className="product-card__media">
                  <Image
                    src={product.image}
                    alt={product.imageAlt}
                    fill
                    draggable={false}
                    sizes="(max-width: 640px) 48vw, (max-width: 1100px) 38vw, 22vw"
                    className="product-card__image"
                  />
                  <button
                    type="button"
                    className="product-card__wishlist"
                    aria-label={`Add ${product.name} to wishlist`}
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                    }}
                  >
                    <HeartIcon className="product-card__wishlist-icon" />
                  </button>
                </div>
                <div className="product-card__info">
                  <h3 className="product-card__name">{product.name}</h3>
                  <p className="product-card__category">{product.category}</p>
                  <p className="product-card__price">
                    {formatPrice(product.price)}
                  </p>
                </div>
              </Link>
            </article>
          ))}
        </div>

        <button
          type="button"
          className="product-carousel__nav product-carousel__nav--next"
          onClick={() => scrollByCard("right")}
          aria-label="Next new arrivals"
        >
          <span aria-hidden="true">›</span>
        </button>
      </div>

      <Link href="/shop" className="new-arrivals__view-all">
        VIEW ALL PRODUCTS →
      </Link>
    </section>
  );
}
