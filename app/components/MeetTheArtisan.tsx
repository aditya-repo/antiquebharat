import Image from "next/image";
import Link from "next/link";

export function MeetTheArtisan() {
  return (
    <section className="meet-artisan" aria-labelledby="meet-artisan-title">
      <div className="meet-artisan__panel">
        <div className="meet-artisan__content">
          <h2 id="meet-artisan-title" className="meet-artisan__title">
            MEET THE ARTISAN
          </h2>
          <p className="meet-artisan__copy">
            Real people. Real stories.
            <br />
            Keeping traditions alive for generations.
          </p>
          <Link href="/artisan" className="meet-artisan__cta">
            MEET ARTISANS
          </Link>
        </div>

        <div className="meet-artisan__media">
          <Image
            src="https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=1400&q=80"
            alt="Artisan crafting metalware by hand in a traditional workshop"
            fill
            sizes="(max-width: 900px) 100vw, 58vw"
            className="meet-artisan__image"
          />
        </div>
      </div>
    </section>
  );
}
