import Link from "next/link";

import {
  ElephantDecor,
  FacebookIcon,
  InstagramIcon,
  PinterestIcon,
  YoutubeIcon,
} from "@/app/components/icons/FooterIcons";

const SHOP_LINKS = [
  { label: "All Products", href: "/shop" },
  { label: "Home Decor", href: "/shop/home-decor" },
  { label: "Tableware", href: "/shop/tableware" },
  { label: "Textiles", href: "/shop/textiles" },
  { label: "Pooja Essentials", href: "/shop/pooja-essentials" },
  { label: "Jewellery", href: "/shop/jewellery" },
  { label: "Bags & Accessories", href: "/shop/bags" },
  { label: "Gift Cards", href: "/shop/gift-cards" },
] as const;

const COLLECTION_LINKS = [
  { label: "Best Sellers", href: "/collections/best-sellers" },
  { label: "New Arrivals", href: "/collections/new-arrivals" },
  { label: "Handpicked Collection", href: "/collections" },
  { label: "Artisan Stories", href: "/collections/artisan-stories" },
  { label: "Sustainable Living", href: "/collections/sustainable" },
] as const;

const HELP_LINKS = [
  { label: "FAQ's", href: "/help/faq" },
  { label: "Shipping & Delivery", href: "/help/shipping" },
  { label: "Returns & Exchanges", href: "/help/returns" },
  { label: "Track Your Order", href: "/help/track" },
  { label: "Size Guide", href: "/help/size-guide" },
] as const;

const ABOUT_LINKS = [
  { label: "Our Story", href: "/about" },
  { label: "Artisans", href: "/about/artisans" },
  { label: "Journal", href: "/journal" },
  { label: "Careers", href: "/careers" },
  { label: "Contact Us", href: "/contact" },
] as const;

const PAYMENTS = ["VISA", "Mastercard", "RuPay", "UPI", "Net Banking"] as const;

const SOCIAL = [
  { label: "Instagram", href: "https://instagram.com", Icon: InstagramIcon },
  { label: "Facebook", href: "https://facebook.com", Icon: FacebookIcon },
  { label: "Pinterest", href: "https://pinterest.com", Icon: PinterestIcon },
  { label: "YouTube", href: "https://youtube.com", Icon: YoutubeIcon },
] as const;

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <section className="stay-connected" aria-labelledby="stay-connected-title">
        <ElephantDecor className="stay-connected__elephant stay-connected__elephant--left" facing="right" />
        <ElephantDecor className="stay-connected__elephant stay-connected__elephant--right" facing="left" />

        <div className="stay-connected__inner">
          <h2 id="stay-connected-title" className="stay-connected__title">
            STAY CONNECTED
          </h2>
          <p className="stay-connected__copy">
            Subscribe to get updates on new collections, stories &amp; exclusive
            offers.
          </p>

          <form className="stay-connected__form" action="#" method="post">
            <label className="sr-only" htmlFor="footer-email">
              Email address
            </label>
            <input
              id="footer-email"
              type="email"
              name="email"
              className="stay-connected__input"
              placeholder="Enter your email address"
              required
            />
            <button type="submit" className="stay-connected__submit">
              SUBSCRIBE
            </button>
          </form>

          <ul className="stay-connected__social">
            {SOCIAL.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  className="stay-connected__social-link"
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="stay-connected__social-icon" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="footer-main" aria-label="Site footer">
        <div className="footer-main__grid">
          <div className="footer-brand">
            <Link href="/" className="footer-brand__name">
              ANTIQUE BHARAT
            </Link>
            <p className="footer-brand__tagline">Preserving India's Living Heritage</p>
            <p className="footer-brand__blurb">
              Bringing you the finest handcrafted treasures, deeply rooted in
              Indian heritage and culture.
            </p>
          </div>

          <nav className="footer-col" aria-labelledby="footer-shop-title">
            <h3 id="footer-shop-title" className="footer-col__title">
              SHOP
            </h3>
            <ul className="footer-col__list">
              {SHOP_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-col__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer-col" aria-labelledby="footer-collections-title">
            <h3 id="footer-collections-title" className="footer-col__title">
              COLLECTIONS
            </h3>
            <ul className="footer-col__list">
              {COLLECTION_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-col__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer-col" aria-labelledby="footer-help-title">
            <h3 id="footer-help-title" className="footer-col__title">
              HELP
            </h3>
            <ul className="footer-col__list">
              {HELP_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-col__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer-col" aria-labelledby="footer-about-title">
            <h3 id="footer-about-title" className="footer-col__title">
              ABOUT US
            </h3>
            <ul className="footer-col__list">
              {ABOUT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-col__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-col footer-payments" aria-labelledby="footer-payments-title">
            <h3 id="footer-payments-title" className="footer-col__title">
              PAYMENT METHODS
            </h3>
            <ul className="footer-payments__list">
              {PAYMENTS.map((method) => (
                <li key={method} className="footer-payments__badge">
                  {method}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-legal">
          <p className="footer-legal__copy">
            © 2024 Antique Bharat. All rights reserved.
          </p>
          <p className="footer-legal__links">
            <Link href="/privacy">Privacy Policy</Link>
            <span aria-hidden="true"> | </span>
            <Link href="/terms">Terms &amp; Conditions</Link>
          </p>
        </div>
      </section>
    </footer>
  );
}
