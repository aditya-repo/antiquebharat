"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { getMobileTabIndex } from "@/app/components/MobileBottomNav";

type TabPageTransitionProps = {
  children: ReactNode;
};

export function TabPageTransition({ children }: TabPageTransitionProps) {
  const pathname = usePathname();
  const previousPath = useRef(pathname);
  const [animClass, setAnimClass] = useState("");

  useEffect(() => {
    if (previousPath.current === pathname) return;

    let direction = "left";
    try {
      direction = sessionStorage.getItem("mobile-tab-slide") || "left";
      sessionStorage.removeItem("mobile-tab-slide");
    } catch {
      /* ignore */
    }

    if (direction === "none") {
      previousPath.current = pathname;
      return;
    }

    if (direction !== "left" && direction !== "right") {
      const prevIndex = getMobileTabIndex(previousPath.current);
      const nextIndex = getMobileTabIndex(pathname);
      if (prevIndex >= 0 && nextIndex >= 0 && prevIndex !== nextIndex) {
        direction = nextIndex > prevIndex ? "left" : "right";
      } else {
        direction = "left";
      }
    }

    setAnimClass(
      direction === "right"
        ? "tab-page-transition tab-page-transition--from-left"
        : "tab-page-transition tab-page-transition--from-right",
    );

    const timer = window.setTimeout(() => setAnimClass(""), 320);
    previousPath.current = pathname;

    return () => window.clearTimeout(timer);
  }, [pathname]);

  return (
    <div className={animClass ? `tab-page-shell ${animClass}` : "tab-page-shell"}>
      {children}
    </div>
  );
}
