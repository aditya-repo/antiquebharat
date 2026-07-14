import Image from "next/image";

import bannerImg from "@/app/assets/elements/assets2.png";

export function HeroBanner() {
  return (
    <section className="hero-banner" aria-label="Featured banner">
      <Image
        src={bannerImg}
        alt="Traditional Indian textiles and vintage decor"
        className="hero-banner__image"
        priority
        sizes="100vw"
      />
    </section>
  );
}
