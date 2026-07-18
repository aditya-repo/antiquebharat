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

const SWIPE_MIN_DISTANCE = 64;
const SWIPE_MIN_VELOCITY = 0.45;
const MOBILE_QUERY = "(max-width: 1100px)";
const SETTLE_MS = 320;

type TabPageTransitionProps = {
  children: ReactNode;
};

type TouchState = {
  x: number;
  y: number;
  time: number;
  ignore: boolean;
  locked: "none" | "h" | "v";
};

type DragDirection = "left" | "right";

function isInsideCarousel(target: EventTarget | null) {
  return target instanceof Element && Boolean(target.closest(CAROUSEL_SELECTOR));
}

function isMobileViewport() {
  return typeof window !== "undefined" && window.matchMedia(MOBILE_QUERY).matches;
}

function setTabSlideDirection(direction: DragDirection) {
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
  const outgoingRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<TouchState | null>(null);
  const dragXRef = useRef(0);
  const directionRef = useRef<DragDirection | null>(null);
  const busyRef = useRef(false);
  const pendingHref = useRef<string | null>(null);
  const previousPath = useRef(pathname);
  const widthRef = useRef(0);

  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [settling, setSettling] = useState(false);
  const [direction, setDirection] = useState<DragDirection | null>(null);
  const [hasOutgoing, setHasOutgoing] = useState(false);
  const [awaitingRoute, setAwaitingRoute] = useState(false);

  const getWidth = () => {
    if (!widthRef.current) {
      widthRef.current = window.innerWidth || 1;
    }
    return widthRef.current;
  };

  const resetDrag = () => {
    dragXRef.current = 0;
    directionRef.current = null;
    setDragX(0);
    setDragging(false);
    setSettling(false);
    setDirection(null);
  };

  const clearOutgoing = () => {
    const host = outgoingRef.current;
    if (!host) return;
    host.innerHTML = "";
    setHasOutgoing(false);
  };

  const ensureOutgoingClone = () => {
    const shell = shellRef.current;
    const host = outgoingRef.current;
    if (!shell || !host || host.childElementCount > 0) return;

    const scroller = document.createElement("div");
    scroller.className = "tab-swipe-layer__scroller";
    scroller.style.transform = `translateY(-${window.scrollY}px)`;

    const clone = shell.cloneNode(true) as HTMLElement;
    clone.classList.add("tab-swipe-layer__clone");
    clone.removeAttribute("style");
    scroller.appendChild(clone);
    host.appendChild(scroller);
    setHasOutgoing(true);
  };

  const targetHrefForDirection = (dir: DragDirection) => {
    const currentIndex = getMobileTabIndex(pathname);
    if (currentIndex < 0) return null;
    const nextIndex = dir === "left" ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex < 0 || nextIndex >= MOBILE_TABS.length) return null;
    return MOBILE_TABS[nextIndex].href;
  };

  const finishToRoute = (href: string, dir: DragDirection) => {
    if (busyRef.current) return;
    busyRef.current = true;
    pendingHref.current = href;
    setTabSlideDirection(dir);
    setAwaitingRoute(true);
    router.push(href);
  };

  const settleCommit = (dir: DragDirection, href: string) => {
    const width = getWidth();
    const endX = dir === "left" ? -width : width;
    setDragging(false);
    setSettling(true);
    setDirection(dir);
    dragXRef.current = endX;
    setDragX(endX);

    window.setTimeout(() => {
      finishToRoute(href, dir);
    }, SETTLE_MS);
  };

  const settleCancel = () => {
    setDragging(false);
    setSettling(true);
    dragXRef.current = 0;
    setDragX(0);

    window.setTimeout(() => {
      clearOutgoing();
      resetDrag();
      busyRef.current = false;
      pendingHref.current = null;
    }, SETTLE_MS);
  };

  // After navigation, drop the clone and reveal the real new page in place
  useLayoutEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;

    if (!awaitingRoute || !pendingHref.current) {
      clearOutgoing();
      resetDrag();
      busyRef.current = false;
      setAwaitingRoute(false);
      return;
    }

    window.scrollTo(0, 0);
    clearOutgoing();
    resetDrag();
    busyRef.current = false;
    pendingHref.current = null;
    setAwaitingRoute(false);
  }, [pathname, awaitingRoute]);

  // Prefetch neighbors for snappier swaps
  useEffect(() => {
    const index = getMobileTabIndex(pathname);
    if (index < 0) return;
    if (index + 1 < MOBILE_TABS.length) router.prefetch(MOBILE_TABS[index + 1].href);
    if (index - 1 >= 0) router.prefetch(MOBILE_TABS[index - 1].href);
  }, [pathname, router]);

  useEffect(() => {
    const onClickCapture = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const tab = target.closest("a.mobile-tab-bar__tab");
      if (!(tab instanceof HTMLAnchorElement)) return;
      if (!isMobileViewport() || busyRef.current) return;

      const href = tab.getAttribute("href");
      if (!href || href === pathname) return;

      const nextIndex = getMobileTabIndex(href);
      const currentIndex = getMobileTabIndex(pathname);
      if (nextIndex < 0 || currentIndex < 0 || nextIndex === currentIndex) return;

      event.preventDefault();
      event.stopPropagation();

      const dir: DragDirection = nextIndex > currentIndex ? "left" : "right";
      widthRef.current = window.innerWidth;
      ensureOutgoingClone();
      setDirection(dir);
      directionRef.current = dir;
      // Start from 0 and animate both layers to completion
      dragXRef.current = 0;
      setDragX(0);
      requestAnimationFrame(() => settleCommit(dir, href));
    };

    document.addEventListener("click", onClickCapture, true);
    return () => document.removeEventListener("click", onClickCapture, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const onTouchStart = (event: ReactTouchEvent<HTMLDivElement>) => {
    if (!isMobileViewport() || busyRef.current || settling) {
      touchStart.current = null;
      return;
    }

    const touch = event.changedTouches[0];
    if (!touch) return;

    widthRef.current = window.innerWidth;
    touchStart.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: performance.now(),
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
      start.locked = Math.abs(deltaX) > Math.abs(deltaY) * 1.15 ? "h" : "v";
      touchStart.current = start;
      if (start.locked === "h") {
        ensureOutgoingClone();
      }
    }

    if (start.locked !== "h") return;

    // Prevent vertical scroll while horizontally swiping pages
    event.preventDefault();

    const currentIndex = getMobileTabIndex(pathname);
    if (currentIndex < 0) return;

    let nextX = deltaX;
    let dir: DragDirection | null = deltaX < 0 ? "left" : deltaX > 0 ? "right" : null;

    // Edge rubber-band when no page in that direction
    if (dir === "left" && currentIndex >= MOBILE_TABS.length - 1) {
      nextX = deltaX * 0.22;
      dir = "left";
    } else if (dir === "right" && currentIndex <= 0) {
      nextX = deltaX * 0.22;
      dir = "right";
    }

    if (dir) {
      const href = targetHrefForDirection(dir);
      if (href) router.prefetch(href);
      directionRef.current = dir;
      setDirection(dir);
    }

    // Clamp to one screen width
    const width = getWidth();
    nextX = Math.max(-width, Math.min(width, nextX));

    dragXRef.current = nextX;
    setDragging(true);
    setSettling(false);
    setDragX(nextX);
  };

  const onTouchEnd = () => {
    const start = touchStart.current;
    const currentDrag = dragXRef.current;
    const dir = directionRef.current;
    touchStart.current = null;

    if (!start || start.ignore || start.locked !== "h" || busyRef.current) {
      if (!busyRef.current) settleCancel();
      return;
    }

    const width = getWidth();
    const elapsed = Math.max(1, performance.now() - start.time);
    const velocity = Math.abs(currentDrag) / elapsed;
    const shouldCommit =
      Boolean(dir) &&
      (Math.abs(currentDrag) >= SWIPE_MIN_DISTANCE ||
        velocity >= SWIPE_MIN_VELOCITY) &&
      Math.abs(currentDrag) > width * 0.12;

    if (!shouldCommit || !dir) {
      settleCancel();
      return;
    }

    const href = targetHrefForDirection(dir);
    // Rubber-banded edge with no target
    if (!href || Math.abs(currentDrag) < width * 0.08) {
      settleCancel();
      return;
    }

    settleCommit(dir, href);
  };

  // Incoming (real current shell during drag is still OLD page under clone).
  // Outgoing clone tracks dragX.
  // Peek panel represents the next page and moves in from the side.
  const width = typeof window !== "undefined" ? getWidth() : 0;
  const peekX =
    direction === "left"
      ? width + dragX
      : direction === "right"
        ? -width + dragX
        : width;

  const outgoingStyle: CSSProperties = {
    transform: `translate3d(${dragX}px, 0, 0)`,
    transition: dragging
      ? "none"
      : `transform ${SETTLE_MS}ms cubic-bezier(0.32, 0.72, 0, 1)`,
  };

  const peekStyle: CSSProperties = {
    transform: `translate3d(${direction ? peekX : width}px, 0, 0)`,
    transition: dragging
      ? "none"
      : `transform ${SETTLE_MS}ms cubic-bezier(0.32, 0.72, 0, 1)`,
    opacity: direction && (dragging || settling || Math.abs(dragX) > 0) ? 1 : 0,
  };

  const activeSwipe = hasOutgoing && direction && (dragging || settling || Math.abs(dragX) > 1);

  return (
    <div
      className={
        activeSwipe
          ? `tab-page-viewport is-swiping is-swiping--${direction}`
          : "tab-page-viewport"
      }
    >
      {/* Next/prev page panel — moves with finger */}
      <div
        className="tab-swipe-peek"
        style={peekStyle}
        aria-hidden
      >
        <div className="tab-swipe-peek__inner" />
      </div>

      {/* Current page clone — moves with finger */}
      <div
        ref={outgoingRef}
        className={
          hasOutgoing
            ? "tab-swipe-outgoing is-visible"
            : "tab-swipe-outgoing"
        }
        style={hasOutgoing ? outgoingStyle : undefined}
        aria-hidden
      />

      {/* Live page (stays put under layers during swipe; revealed after route change) */}
      <div
        ref={shellRef}
        className={[
          "tab-page-shell",
          activeSwipe ? "is-covered" : "",
          awaitingRoute ? "is-awaiting" : "",
        ]
          .filter(Boolean)
          .join(" ")}
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
