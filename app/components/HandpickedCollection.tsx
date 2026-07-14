"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { HeartIcon } from "@/app/components/icons/HeaderIcons";
import { SectionHeading } from "@/app/components/SectionHeading";

const PRODUCTS = [
  {
    id: "1",
    name: "Brass Urli Hanging Lamp",
    category: "Home Decor",
    price: 2850,
    image:
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Brass hanging lamp with warm light",
  },
  {
    id: "2",
    name: "Handblock Printed Cotton Dupatta",
    category: "Textiles",
    price: 1650,
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Folded patterned textile fabric",
  },
  {
    id: "3",
    name: "Handpainted Ceramic Storage Jar",
    category: "Tableware",
    price: 1350,
    image:
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Decorative ceramic storage jar",
  },
  {
    id: "4",
    name: "Handcarved Wooden Jewellery Box",
    category: "Storage",
    price: 2150,
    image:
      "https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Carved wooden jewellery box",
  },
  {
    id: "5",
    name: "Antique Brass Diya Stand",
    category: "Pooja Essentials",
    price: 1890,
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Warm lit brass accent piece",
  },
  {
    id: "6",
    name: "Handwoven Block Print Cushion",
    category: "Home Decor",
    price: 980,
    image:
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Decorative patterned cushion",
  },
] as const;

function formatPrice(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function HandpickedCollection() {
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
    <section
      className="handpicked-collection"
      aria-labelledby="handpicked-collection-title"
    >
      <SectionHeading
        title="HANDPICKED COLLECTION"
        titleId="handpicked-collection-title"
        action={{ label: "VIEW ALL COLLECTIONS →", href: "/collections" }}
      />

      <div className="product-carousel">
        <button
          type="button"
          className="product-carousel__nav product-carousel__nav--prev"
          onClick={() => scrollByCard("left")}
          aria-label="Previous products"
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
                    sizes="(max-width: 640px) 70vw, (max-width: 1100px) 38vw, 22vw"
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
          aria-label="Next products"
        >
          <span aria-hidden="true">›</span>
        </button>
      </div>

      <Link href="/collections" className="handpicked-collection__view-all">
        VIEW ALL COLLECTIONS →
      </Link>
    </section>
  );
}
