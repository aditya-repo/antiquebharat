"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type TouchEvent as ReactTouchEvent,
} from "react";

import {
  getMobileTabIndex,
  MOBILE_TABS,
} from "@/app/components/MobileBottomNav";

const CAROUSEL_SELECTOR = [
  ".product-carousel",
  ".product-carousel__track",
  ".category-carousel",
  ".heritage-journal__carousel",
  ".heritage-journal__track",
  ".region-crafts__carousel",
  ".region-crafts__track",
  ".region-artisans__carousel",
  ".region-artisans__track",
  ".artisan-collections-carousel",
  ".artisan-collections-carousel__track",
  "[data-carousel]",
].join(",");

const SWIPE_MIN_DISTANCE = 72;
const DRAG_RESISTANCE = 0.82;
const EXIT_MS = 280;
const ENTER_MS = 520;
const MOBILE_QUERY = "(max-width: 1100px)";

type TabPageTransitionProps = {
  children: ReactNode;
};

type TouchState = {
  x: number;
  y: number;
  ignore: boolean;
  locked: "none" | "h" | "v";
};

function isInsideCarousel(target: EventTarget | null) {
  return target instanceof Element && Boolean(target.closest(CAROUSEL_SELECTOR));
}

function isMobileViewport() {
  return typeof window !== "undefined" && window.matchMedia(MOBILE_QUERY).matches;
}

function setTabSlideDirection(direction: "left" | "right") {
  try {
    sessionStorage.setItem("mobile-tab-slide", direction);
  } catch {
    /* ignore */
  }
}

export function TabPageTransition({ children }: TabPageTransitionProps) {
  const pathname = usePathname();
  const router = useRouter();
  const previousPath = useRef(pathname);
  const touchStart = useRef<TouchState | null>(null);
  const dragXRef = useRef(0);
  const exitingRef = useRef(false);

  const [animClass, setAnimClass] = useState("");
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [exiting, setExiting] = useState<"left" | "right" | null>(null);

  useEffect(() => {
    if (previousPath.current === pathname) return;

    let direction = "left";
    try {
      direction = sessionStorage.getItem("mobile-tab-slide") || "left";
      sessionStorage.removeItem("mobile-tab-slide");
    } catch {
      /* ignore */
    }

    setDragX(0);
    setDragging(false);
    setExiting(null);
    dragXRef.current = 0;
    exitingRef.current = false;

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

    const timer = window.setTimeout(() => setAnimClass(""), ENTER_MS);
    previousPath.current = pathname;

    return () => window.clearTimeout(timer);
  }, [pathname]);

  const goToTab = (nextIndex: number, direction: "left" | "right") => {
    if (nextIndex < 0 || nextIndex >= MOBILE_TABS.length) return;
    if (exitingRef.current) return;

    exitingRef.current = true;
    setDragging(false);
    setExiting(direction);
    setTabSlideDirection(direction);

    window.setTimeout(() => {
      router.push(MOBILE_TABS[nextIndex].href);
    }, EXIT_MS);
  };

  const onTouchStart = (event: ReactTouchEvent<HTMLDivElement>) => {
    if (!isMobileViewport() || exitingRef.current) {
      touchStart.current = null;
      return;
    }

    const touch = event.changedTouches[0];
    if (!touch) return;

    touchStart.current = {
      x: touch.clientX,
      y: touch.clientY,
      ignore: isInsideCarousel(event.target),
      locked: "none",
    };
    setAnimClass("");
  };

  const onTouchMove = (event: ReactTouchEvent<HTMLDivElement>) => {
    const start = touchStart.current;
    if (!start || start.ignore || exitingRef.current) return;

    const touch = event.changedTouches[0];
    if (!touch) return;

    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;

    if (start.locked === "none") {
      if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) return;
      start.locked =
        Math.abs(deltaX) > Math.abs(deltaY) * 1.15 ? "h" : "v";
      touchStart.current = start;
    }

    if (start.locked !== "h") return;

    const currentIndex = getMobileTabIndex(pathname);
    if (currentIndex < 0) return;

    // Edge resistance when no next/prev tab
    let nextX = deltaX * DRAG_RESISTANCE;
    if (
      (deltaX < 0 && currentIndex >= MOBILE_TABS.length - 1) ||
      (deltaX > 0 && currentIndex <= 0)
    ) {
      nextX = deltaX * 0.28;
    }

    dragXRef.current = nextX;
    setDragging(true);
    setDragX(nextX);
  };

  const onTouchEnd = () => {
    const start = touchStart.current;
    const currentDrag = dragXRef.current;
    touchStart.current = null;

    if (!start || start.ignore || start.locked === "v" || exitingRef.current) {
      setDragging(false);
      setDragX(0);
      dragXRef.current = 0;
      return;
    }

    if (!isMobileViewport()) {
      setDragging(false);
      setDragX(0);
      dragXRef.current = 0;
      return;
    }

    const currentIndex = getMobileTabIndex(pathname);
    if (currentIndex < 0) {
      setDragging(false);
      setDragX(0);
      dragXRef.current = 0;
      return;
    }

    if (Math.abs(currentDrag) < SWIPE_MIN_DISTANCE) {
      setDragging(false);
      setDragX(0);
      dragXRef.current = 0;
      return;
    }

    if (currentDrag < 0) {
      goToTab(currentIndex + 1, "left");
    } else {
      goToTab(currentIndex - 1, "right");
    }
  };

  const shellStyle: CSSProperties | undefined = (() => {
    if (exiting === "left") {
      return {
        transform: "translate3d(-108%, 0, 0) scale(0.97)",
        opacity: 0.35,
        transition: `transform ${EXIT_MS}ms cubic-bezier(0.32, 0.72, 0, 1), opacity ${EXIT_MS}ms ease`,
      };
    }
    if (exiting === "right") {
      return {
        transform: "translate3d(108%, 0, 0) scale(0.97)",
        opacity: 0.35,
        transition: `transform ${EXIT_MS}ms cubic-bezier(0.32, 0.72, 0, 1), opacity ${EXIT_MS}ms ease`,
      };
    }
    if (dragging || dragX !== 0) {
      const progress = Math.min(1, Math.abs(dragX) / 220);
      return {
        transform: `translate3d(${dragX}px, 0, 0) scale(${1 - progress * 0.025})`,
        opacity: 1 - progress * 0.2,
        transition: dragging
          ? "none"
          : "transform 0.35s cubic-bezier(0.32, 0.72, 0, 1), opacity 0.35s ease",
      };
    }
    return undefined;
  })();

  const className = [
    "tab-page-shell",
    animClass,
    dragging ? "is-dragging" : "",
    exiting ? "is-exiting" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={className}
      style={shellStyle}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchEnd}
    >
      {children}
    </div>
  );
}
