"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import {
  ArtisanIcon,
  CartIcon,
  HomeIcon,
  RegionsIcon,
  UserIcon,
} from "@/app/components/icons/HeaderIcons";

export const MOBILE_TABS = [
  { label: "Home", href: "/", Icon: HomeIcon },
  { label: "Regions", href: "/regions", Icon: RegionsIcon },
  { label: "Artisan", href: "/artisan", Icon: ArtisanIcon },
  { label: "Account", href: "/account", Icon: UserIcon },
  { label: "Cart", href: "/cart", Icon: CartIcon },
] as const;

export function getMobileTabIndex(pathname: string) {
  if (pathname === "/") return 0;
  const index = MOBILE_TABS.findIndex(
    (tab) =>
      tab.href !== "/" &&
      (pathname === tab.href || pathname.startsWith(`${tab.href}/`)),
  );
  return index;
}

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function MobileBottomNav() {
  const pathname = usePathname();
  const activeIndex = Math.max(0, getMobileTabIndex(pathname));
  const [indicatorIndex, setIndicatorIndex] = useState(activeIndex);

  useEffect(() => {
    setIndicatorIndex(activeIndex);
  }, [activeIndex]);

  return (
    <nav className="mobile-tab-bar" aria-label="App tabs">
      <ul className="mobile-tab-bar__list" role="list">
        <li
          className="mobile-tab-bar__indicator"
          aria-hidden="true"
          style={{
            transform: `translateX(${indicatorIndex * 100}%)`,
          }}
        />
        {MOBILE_TABS.map(({ label, href, Icon }, index) => {
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
                onClick={() => {
                  const current = getMobileTabIndex(pathname);
                  const direction =
                    index === current
                      ? "none"
                      : index > current
                        ? "left"
                        : "right";
                  try {
                    sessionStorage.setItem("mobile-tab-slide", direction);
                  } catch {
                    /* ignore */
                  }
                  setIndicatorIndex(index);
                }}
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
