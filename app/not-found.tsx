import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-page__panel">
        <p className="not-found-page__eyebrow">Lost on the craft trail</p>
        <p className="not-found-page__code" aria-hidden="true">
          404
        </p>
        <h1 className="not-found-page__title">Page not found</h1>
        <span className="not-found-page__rule" aria-hidden="true" />
        <p className="not-found-page__copy">
          This path has wandered off the map — like a motif that never made it
          onto the loom. The page you seek may have moved, or it may never have
          been woven here.
        </p>

        <div className="not-found-page__actions">
          <Link
            href="/"
            className="not-found-page__button not-found-page__button--primary"
          >
            Return home
          </Link>
          <Link href="/regions" className="not-found-page__button">
            Explore regions
          </Link>
          <Link href="/shops" className="not-found-page__button">
            Browse shops
          </Link>
        </div>

        <nav className="not-found-page__links" aria-label="Helpful links">
          <Link href="/heritage-journal">Heritage Journal</Link>
          <span aria-hidden="true">·</span>
          <Link href="/artisan">Meet the Artisan</Link>
          <span aria-hidden="true">·</span>
          <Link href="/our-story">Our Story</Link>
        </nav>
      </div>
    </main>
  );
}
