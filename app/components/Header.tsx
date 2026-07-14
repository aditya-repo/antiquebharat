"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { SearchIcon, UserIcon } from "@/app/components/icons/HeaderIcons";
import { LotusIcon } from "@/app/components/icons/LotusIcon";
import { MandalaIcon } from "@/app/components/icons/MandalaIcon";

const NAV_LINKS = [
  { label: "HOME", href: "/" },
  { label: "SHOP", href: "/shop" },
  { label: "COLLECTIONS", href: "/collections" },
  { label: "ABOUT US", href: "/about" },
  { label: "CONTACT", href: "/contact" },
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

  return (
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
            <LotusIcon className="header-brand__icon" />
            <Link href="/" className="header-brand__name">
              ANTIQUE BHARAT
            </Link>
            <div className="header-brand__tagline">
              <span className="header-brand__flourish" aria-hidden="true" />
              <span>The Art of India</span>
              <span className="header-brand__flourish" aria-hidden="true" />
            </div>
          </div>

          <nav className="header-nav header-nav--desktop" aria-label="Main navigation">
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
            <label className="header-search header-search--inline">
              <span className="sr-only">Search for products</span>
              <input
                type="search"
                className="header-search__input"
                placeholder="Search for products..."
              />
              <SearchIcon className="header-search__icon" />
            </label>

            <div className="header-actions__icons">
              <Link href="/account" className="header-icon-btn" aria-label="Account">
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

      <div
        className={`header-drawer${menuOpen ? " is-open" : ""}`}
        id="mobile-nav"
      >
        <nav className="header-drawer__nav" aria-label="Mobile navigation">
          <ul className="header-drawer__list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="header-drawer__link"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {menuOpen ? (
        <button
          type="button"
          className="header-drawer__backdrop"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        />
      ) : null}
    </header>
  );
}
