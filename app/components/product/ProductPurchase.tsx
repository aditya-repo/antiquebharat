"use client";

import { useState } from "react";

import { HeartIcon } from "@/app/components/icons/HeaderIcons";
import { formatPrice } from "@/app/lib/products";

type ProductPurchaseProps = {
  name: string;
  price: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  description: string;
  specs: { label: string; value: string }[];
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="pdp-stars" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => {
        const filled = rating >= i + 1;
        const half = !filled && rating >= i + 0.5;
        return (
          <span
            key={i}
            className={`pdp-stars__star${filled ? " is-full" : half ? " is-half" : ""}`}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}

export function ProductPurchase({
  name,
  price,
  rating,
  reviewCount,
  inStock,
  description,
  specs,
}: ProductPurchaseProps) {
  const [qty, setQty] = useState(1);

  return (
    <div className="pdp-info">
      <div className="pdp-info__title-row">
        <h1 className="pdp-info__title">{name}</h1>
        <button
          type="button"
          className="pdp-info__wishlist"
          aria-label={`Add ${name} to wishlist`}
        >
          <HeartIcon className="pdp-info__wishlist-icon" />
        </button>
      </div>

      <p className="pdp-info__price">{formatPrice(price)}</p>

      <div className="pdp-info__rating">
        <StarRating rating={rating} />
        <span className="pdp-info__reviews">
          {rating.toFixed(1)} ({reviewCount} reviews)
        </span>
      </div>

      {inStock ? (
        <p className="pdp-info__stock">
          <span className="pdp-info__stock-dot" aria-hidden="true" />
          In Stock
        </p>
      ) : (
        <p className="pdp-info__stock pdp-info__stock--out">Out of Stock</p>
      )}

      <p className="pdp-info__desc">{description}</p>

      <ul className="pdp-info__specs">
        {specs.map((spec) => (
          <li key={spec.label}>
            <span className="pdp-info__spec-label">{spec.label}:</span>{" "}
            {spec.value}
          </li>
        ))}
      </ul>

      <div className="pdp-qty" aria-label="Quantity">
        <button
          type="button"
          className="pdp-qty__btn"
          onClick={() => setQty((n) => Math.max(1, n - 1))}
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="pdp-qty__value">{qty}</span>
        <button
          type="button"
          className="pdp-qty__btn"
          onClick={() => setQty((n) => n + 1)}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      <div className="pdp-actions">
        <button type="button" className="pdp-actions__cart">
          ADD TO CART
        </button>
        <button type="button" className="pdp-actions__buy">
          BUY NOW
        </button>
      </div>

      <ul className="pdp-trust">
        <li>
          <span className="pdp-trust__icon" aria-hidden="true">
            <TruckIcon />
          </span>
          <span>Free Shipping above ₹1999</span>
        </li>
        <li>
          <span className="pdp-trust__icon" aria-hidden="true">
            <LockIcon />
          </span>
          <span>Secure Payments</span>
        </li>
        <li>
          <span className="pdp-trust__icon" aria-hidden="true">
            <ReturnIcon />
          </span>
          <span>Easy Returns</span>
        </li>
        <li>
          <span className="pdp-trust__icon" aria-hidden="true">
            <GlobeIcon />
          </span>
          <span>Worldwide Delivery</span>
        </li>
      </ul>
    </div>
  );
}

function TruckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
      <path
        d="M3 7h11v8H3V7Zm11 3h4l3 3v2h-7v-5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="7" cy="17.5" r="1.5" fill="currentColor" />
      <circle cx="17" cy="17.5" r="1.5" fill="currentColor" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
      <rect
        x="5"
        y="10"
        width="14"
        height="10"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M8 10V7a4 4 0 0 1 8 0v3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ReturnIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
      <path
        d="M7 7H3v4M3.5 11A8 8 0 1 0 5 6.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M4 12h16M12 4c2.5 2.8 2.5 13.2 0 16M12 4c-2.5 2.8-2.5 13.2 0 16"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}
