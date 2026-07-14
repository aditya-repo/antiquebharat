import Link from "next/link";

import categoryImg from "@/app/assets/elements/category.png";
import { SectionHeading } from "@/app/components/SectionHeading";

const CATEGORIES = [
  { label: "HOME DECOR", href: "/shop/home-decor" },
  { label: "TABLEWARE", href: "/shop/tableware" },
  { label: "TEXTILES", href: "/shop/textiles" },
  { label: "WALL ART", href: "/shop/wall-art" },
  { label: "POOJA ESSENTIALS", href: "/shop/pooja-essentials" },
  { label: "FURNITURE", href: "/shop/furniture" },
] as const;

export function ShopByCategory() {
  return (
    <section className="shop-by-category" aria-labelledby="shop-by-category-title">
      <SectionHeading title="SHOP BY CATEGORY" titleId="shop-by-category-title" />
      <div className="category-carousel">
        <ul className="category-grid">
          {CATEGORIES.map((category) => (
            <li key={category.label} className="category-grid__item">
              <Link href={category.href} className="category-card">
                <div className="category-card__art">
                  <img
                    src={categoryImg.src}
                    alt=""
                    className="category-card__image"
                    draggable={false}
                  />
                </div>
                <span className="category-card__label">{category.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
