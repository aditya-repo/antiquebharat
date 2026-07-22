import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { TrendingFeed } from "@/app/components/TrendingFeed";
import { TRENDING_COMMUNITIES } from "@/app/lib/trending";

export const metadata: Metadata = {
  title: "Trending | Antique Bharat",
  description: "Discover trending crafts and popular artisan communities.",
};

export default function TrendingPage() {
  return (
    <main className="trending-page">
      <div className="trending-page__inner">
        <section
          className="trending-communities"
          aria-label="Artisan communities"
        >
          <ul className="trending-communities__track">
            {TRENDING_COMMUNITIES.map((community) => (
              <li key={community.slug}>
                <Link href={community.href} className="trending-community">
                  <span className="trending-community__avatar">
                    <Image
                      src={community.image}
                      alt=""
                      fill
                      sizes="72px"
                      className="trending-community__image"
                    />
                  </span>
                  <span className="trending-community__name">
                    {community.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <TrendingFeed />
      </div>
    </main>
  );
}
