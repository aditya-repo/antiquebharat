"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { SearchIcon, UserIcon } from "@/app/components/icons/HeaderIcons";
import { MandalaIcon } from "@/app/components/icons/MandalaIcon";

const NAV_LINKS = [
  { label: "SHOPS", href: "/shops" },
  { label: "REGIONS", href: "/regions" },
  { label: "ARTISAN", href: "/artisan" },
  { label: "HERITAGE JOURNAL", href: "/heritage-journal" },
  { label: "OUR STORY", href: "/our-story" },
] as const;

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      className="header-menu-btn__icon"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {open ? (
        <path
          d="M6 6L18 18M18 6L6 18"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      ) : (
        <>
          <path d="M4 7H20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M4 12H20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M4 17H20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 1100) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <>
      <header className="site-header">
        <div className="announcement-bar">
          <MandalaIcon className="announcement-bar__icon" />
          <p className="announcement-bar__text">
            FREE SHIPPING ON ORDERS ABOVE ₹1999
          </p>
          <MandalaIcon className="announcement-bar__icon" />
        </div>

        <div className="header-main">
          <div className="header-main__inner">
            <div className="header-brand">
              <Link href="/" className="header-brand__name">
                ANTIQUE BHARAT
              </Link>
              <div className="header-brand__tagline">
                <span className="header-brand__flourish" aria-hidden="true" />
                <span>Preserving India's Living Heritage</span>
                <span className="header-brand__flourish" aria-hidden="true" />
              </div>
            </div>

            <div className="header-center">
              <label className="header-search header-search--inline">
                <span className="sr-only">Search for products</span>
                <input
                  type="search"
                  className="header-search__input"
                  placeholder="Search for products..."
                />
                <SearchIcon className="header-search__icon" />
              </label>
            </div>

            <div className="header-end">
              <nav
                className="header-nav header-nav--desktop"
                aria-label="Main navigation"
              >
                <ul className="header-nav__list">
                  {NAV_LINKS.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="header-nav__link">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="header-actions">
                <div className="header-actions__icons">
                  <Link
                    href="/account"
                    className="header-icon-btn header-icon-btn--desktop-only"
                    aria-label="Account"
                  >
                    <UserIcon className="header-icon-btn__icon" />
                  </Link>

                  <button
                    type="button"
                    className="header-menu-btn"
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={menuOpen}
                    aria-controls="mobile-nav"
                    onClick={() => setMenuOpen((open) => !open)}
                  >
                    <MenuIcon open={menuOpen} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="header-search-bar">
          <label className="header-search">
            <span className="sr-only">Search for products</span>
            <input
              type="search"
              className="header-search__input"
              placeholder="Search for products..."
            />
            <SearchIcon className="header-search__icon" />
          </label>
        </div>
      </header>

      <button
        type="button"
        className={`header-drawer__backdrop${menuOpen ? " is-open" : ""}`}
        aria-label="Close menu"
        tabIndex={menuOpen ? 0 : -1}
        onClick={() => setMenuOpen(false)}
      />

      <aside
        id="mobile-nav"
        className={`header-drawer${menuOpen ? " is-open" : ""}`}
        aria-hidden={!menuOpen}
        aria-label="Site menu"
      >
        <div className="header-drawer__head">
          <p className="header-drawer__title">Menu</p>
          <button
            type="button"
            className="header-drawer__close"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            <MenuIcon open />
          </button>
        </div>

        <nav className="header-drawer__nav" aria-label="Mobile navigation">
          <ul className="header-drawer__list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="header-drawer__link"
                  tabIndex={menuOpen ? 0 : -1}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
