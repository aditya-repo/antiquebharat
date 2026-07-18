"use client";

import Image from "next/image";
import { useState } from "react";

import { HeartIcon } from "@/app/components/icons/HeaderIcons";

type ProductGalleryProps = {
  name: string;
  images: string[];
};

export function ProductGallery({ name, images }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  return (
    <div className="pdp-gallery">
      <div className="pdp-gallery__main">
        <Image
          src={current}
          alt={name}
          fill
          priority
          sizes="(max-width: 900px) 100vw, 36vw"
          className="pdp-gallery__image"
        />
        <button
          type="button"
          className="pdp-gallery__wishlist"
          aria-label={`Add ${name} to wishlist`}
        >
          <HeartIcon className="pdp-gallery__wishlist-icon" />
        </button>
      </div>

      <ul className="pdp-gallery__thumbs">
        {images.map((src, index) => (
          <li key={src} className="pdp-gallery__thumb-item">
            <button
              type="button"
              className={`pdp-gallery__thumb${active === index ? " is-active" : ""}`}
              onClick={() => setActive(index)}
              aria-label={`View image ${index + 1}`}
              aria-pressed={active === index}
            >
              <span className="pdp-gallery__thumb-frame">
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="72px"
                  className="pdp-gallery__thumb-image"
                />
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
