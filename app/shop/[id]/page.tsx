import Link from "next/link";

import { ProductAccordions } from "@/app/components/product/ProductAccordions";
import { ProductGallery } from "@/app/components/product/ProductGallery";
import { ProductPurchase } from "@/app/components/product/ProductPurchase";
import { getProduct } from "@/app/lib/products";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProduct(id);

  return (
    <main className="pdp-page">
      <div className="pdp-page__inner">
        <nav className="pdp-breadcrumb" aria-label="Breadcrumb">
          <ol className="pdp-breadcrumb__list">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li aria-hidden="true">›</li>
            <li>
              <Link href="/artisan">Artisans</Link>
            </li>
          </ol>
          <ol className="pdp-breadcrumb__list pdp-breadcrumb__list--product">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li aria-hidden="true">›</li>
            <li>
              <Link href={product.categoryHref}>{product.category}</Link>
            </li>
            <li aria-hidden="true">›</li>
            <li aria-current="page">{product.name}</li>
          </ol>
        </nav>

        <div className="pdp-layout">
          <ProductGallery name={product.name} images={product.images} />

          <ProductPurchase
            name={product.name}
            price={product.price}
            rating={product.rating}
            reviewCount={product.reviewCount}
            inStock={product.inStock}
            description={product.description}
            specs={product.specs}
          />
        </div>

        <div className="pdp-secondary">
          <ProductAccordions
            items={[
              { id: "story", title: "THE STORY", content: product.story },
              {
                id: "care",
                title: "CARE INSTRUCTIONS",
                content: product.care,
              },
              {
                id: "shipping",
                title: "SHIPPING & RETURNS",
                content: product.shipping,
              },
            ]}
          />

          <aside className="pdp-sidebar" aria-label="Heritage details">
            <section className="pdp-sidebar__block">
              <h2 className="pdp-sidebar__title">HERITAGE SCORE</h2>
              <ul className="pdp-heritage">
                {product.heritage.map((row) => (
                  <li key={row.label} className="pdp-heritage__row">
                    <span className="pdp-heritage__icon" aria-hidden="true">
                      ◆
                    </span>
                    <span>
                      <span className="pdp-heritage__label">{row.label}:</span>{" "}
                      <strong>{row.value}</strong>
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="pdp-sidebar__block">
              <h2 className="pdp-sidebar__title">SYMBOLISM</h2>
              <p className="pdp-sidebar__copy">{product.symbolism}</p>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
