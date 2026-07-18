"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  ArtisanIcon,
  CartIcon,
  HomeIcon,
  RegionsIcon,
  UserIcon,
} from "@/app/components/icons/HeaderIcons";

const TABS = [
  { label: "Home", href: "/", Icon: HomeIcon },
  { label: "Regions", href: "/regions", Icon: RegionsIcon },
  { label: "Artisan", href: "/artisan", Icon: ArtisanIcon },
  { label: "Account", href: "/account", Icon: UserIcon },
  { label: "Cart", href: "/cart", Icon: CartIcon },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="mobile-tab-bar" aria-label="App tabs">
      <ul className="mobile-tab-bar__list" role="list">
        {TABS.map(({ label, href, Icon }) => {
          const active = isActive(pathname, href);
          return (
            <li key={href} className="mobile-tab-bar__item">
              <Link
                href={href}
                className={
                  active
                    ? "mobile-tab-bar__tab is-active"
                    : "mobile-tab-bar__tab"
                }
                aria-current={active ? "page" : undefined}
              >
                <Icon className="mobile-tab-bar__icon" />
                <span className="mobile-tab-bar__label">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
