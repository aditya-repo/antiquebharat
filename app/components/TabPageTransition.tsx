"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  useEffect,
  useLayoutEffect,
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

const SWIPE_MIN_DISTANCE = 70;
const PAIR_MS = 380;
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

type PendingNav = {
  href: string;
  direction: "left" | "right";
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
  const shellRef = useRef<HTMLDivElement>(null);
  const outgoingHostRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<TouchState | null>(null);
  const dragXRef = useRef(0);
  const busyRef = useRef(false);
  const pendingNav = useRef<PendingNav | null>(null);
  const previousPath = useRef(pathname);

  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [pairing, setPairing] = useState(false);
  const [pairDirection, setPairDirection] = useState<"left" | "right">("left");

  const clearOutgoing = () => {
    const host = outgoingHostRef.current;
    if (!host) return;
    host.className = "tab-page-outgoing-host";
    host.innerHTML = "";
  };

  const captureOutgoing = (direction: "left" | "right") => {
    const shell = shellRef.current;
    const host = outgoingHostRef.current;
    if (!shell || !host) return;

    host.innerHTML = "";
    const scroller = document.createElement("div");
    scroller.className = "tab-page-outgoing__scroller";
    scroller.style.transform = `translateY(-${window.scrollY}px)`;

    const clone = shell.cloneNode(true) as HTMLElement;
    clone.classList.add("tab-page-outgoing__clone");
    clone.removeAttribute("style");
    scroller.appendChild(clone);
    host.appendChild(scroller);
    host.className = `tab-page-outgoing-host is-active tab-page-outgoing-host--${direction}`;
  };

  const beginPairTransition = (direction: "left" | "right", href: string) => {
    if (busyRef.current) return;

    if (!isMobileViewport()) {
      setTabSlideDirection(direction);
      router.push(href);
      return;
    }

    busyRef.current = true;
    pendingNav.current = { href, direction };
    setDragging(false);
    setDragX(0);
    dragXRef.current = 0;
    setPairDirection(direction);
    setTabSlideDirection(direction);
    captureOutgoing(direction);
    router.push(href);
  };

  // Place incoming off-screen before paint when route changes during a pair transition
  useLayoutEffect(() => {
    if (previousPath.current === pathname) return;

    const pending = pendingNav.current;
    if (!pending || !busyRef.current) {
      previousPath.current = pathname;
      return;
    }

    window.scrollTo(0, 0);
    setPairing(true);

    const shell = shellRef.current;
    if (shell) {
      shell.classList.remove("is-sliding-in");
      shell.classList.add(
        pending.direction === "left"
          ? "tab-page-shell--park-left"
          : "tab-page-shell--park-right",
      );
    }
  }, [pathname]);

  // Animate both layers after incoming is parked off-screen
  useEffect(() => {
    if (previousPath.current === pathname) return;

    const pending = pendingNav.current;
    previousPath.current = pathname;

    if (!pending || !busyRef.current) {
      pendingNav.current = null;
      busyRef.current = false;
      clearOutgoing();
      setPairing(false);
      return;
    }

    const host = outgoingHostRef.current;
    const shell = shellRef.current;

    const start = window.requestAnimationFrame(() => {
      host?.classList.add("is-sliding");
      if (shell) {
        shell.classList.add("is-sliding-in");
        shell.classList.remove(
          "tab-page-shell--park-left",
          "tab-page-shell--park-right",
        );
      }
    });

    const timer = window.setTimeout(() => {
      clearOutgoing();
      shell?.classList.remove("is-sliding-in");
      setPairing(false);
      pendingNav.current = null;
      busyRef.current = false;
    }, PAIR_MS);

    return () => {
      window.cancelAnimationFrame(start);
      window.clearTimeout(timer);
    };
  }, [pathname]);

  useEffect(() => {
    const onClickCapture = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const tab = target.closest("a.mobile-tab-bar__tab");
      if (!(tab instanceof HTMLAnchorElement)) return;
      if (!isMobileViewport()) return;

      const href = tab.getAttribute("href");
      if (!href || href === pathname) return;

      const nextIndex = getMobileTabIndex(href);
      const currentIndex = getMobileTabIndex(pathname);
      if (nextIndex < 0 || currentIndex < 0 || nextIndex === currentIndex) return;

      event.preventDefault();
      event.stopPropagation();

      beginPairTransition(
        nextIndex > currentIndex ? "left" : "right",
        href,
      );
    };

    document.addEventListener("click", onClickCapture, true);
    return () => document.removeEventListener("click", onClickCapture, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const onTouchStart = (event: ReactTouchEvent<HTMLDivElement>) => {
    if (!isMobileViewport() || busyRef.current) {
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
  };

  const onTouchMove = (event: ReactTouchEvent<HTMLDivElement>) => {
    const start = touchStart.current;
    if (!start || start.ignore || busyRef.current) return;

    const touch = event.changedTouches[0];
    if (!touch) return;

    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;

    if (start.locked === "none") {
      if (Math.abs(deltaX) < 8 && Math.abs(deltaY) < 8) return;
      start.locked = Math.abs(deltaX) > Math.abs(deltaY) * 1.1 ? "h" : "v";
      touchStart.current = start;
    }

    if (start.locked !== "h") return;

    const currentIndex = getMobileTabIndex(pathname);
    if (currentIndex < 0) return;

    let nextX = deltaX;
    if (
      (deltaX < 0 && currentIndex >= MOBILE_TABS.length - 1) ||
      (deltaX > 0 && currentIndex <= 0)
    ) {
      nextX = deltaX * 0.25;
    }

    dragXRef.current = nextX;
    setDragging(true);
    setDragX(nextX);
  };

  const onTouchEnd = () => {
    const start = touchStart.current;
    const currentDrag = dragXRef.current;
    touchStart.current = null;

    if (!start || start.ignore || start.locked === "v" || busyRef.current) {
      setDragging(false);
      setDragX(0);
      dragXRef.current = 0;
      return;
    }

    const currentIndex = getMobileTabIndex(pathname);
    if (currentIndex < 0 || Math.abs(currentDrag) < SWIPE_MIN_DISTANCE) {
      setDragging(false);
      setDragX(0);
      dragXRef.current = 0;
      return;
    }

    if (currentDrag < 0) {
      const next = currentIndex + 1;
      if (next < MOBILE_TABS.length) {
        beginPairTransition("left", MOBILE_TABS[next].href);
        return;
      }
    } else {
      const prev = currentIndex - 1;
      if (prev >= 0) {
        beginPairTransition("right", MOBILE_TABS[prev].href);
        return;
      }
    }

    setDragging(false);
    setDragX(0);
    dragXRef.current = 0;
  };

  const shellStyle: CSSProperties | undefined =
    dragging || dragX !== 0
      ? {
          transform: `translate3d(${dragX}px, 0, 0)`,
          transition: dragging
            ? "none"
            : "transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)",
        }
      : undefined;

  return (
    <div
      className={
        pairing
          ? `tab-page-viewport is-pairing is-pairing--${pairDirection}`
          : "tab-page-viewport"
      }
    >
      <div ref={outgoingHostRef} className="tab-page-outgoing-host" aria-hidden />

      <div
        ref={shellRef}
        className={["tab-page-shell", dragging ? "is-dragging" : ""]
          .filter(Boolean)
          .join(" ")}
        style={shellStyle}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchEnd}
      >
        {children}
      </div>
    </div>
  );
}
