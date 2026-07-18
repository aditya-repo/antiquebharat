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

const LOCK_PX = 12;
const COMMIT_RATIO = 0.22;
const SETTLE_MS = 280;
const MOBILE_QUERY = "(max-width: 1100px)";

type TabPageTransitionProps = {
  children: ReactNode;
};

type DragDirection = "left" | "right";

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
  const touchRef = useRef<TouchState | null>(null);
  const dragXRef = useRef(0);
  const directionRef = useRef<DragDirection | null>(null);
  const widthRef = useRef(0);
  const busyRef = useRef(false);
  const pendingHrefRef = useRef<string | null>(null);

  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [active, setActive] = useState(false);

  const screenW = () => widthRef.current || window.innerWidth || 1;

  const applyDrag = (x: number) => {
    dragXRef.current = x;
    setDragX(x);
  };

  const clearLayers = () => {
    const host = outgoingRef.current;
    if (host) host.innerHTML = "";
    setActive(false);
    setDragging(false);
    applyDrag(0);
    directionRef.current = null;
    busyRef.current = false;
  };

  const captureOutgoing = () => {
    const shell = shellRef.current;
    const host = outgoingRef.current;
    if (!shell || !host) return;
    host.innerHTML = "";

    const scroller = document.createElement("div");
    scroller.className = "tab-swipe-layer__scroller";
    scroller.style.transform = `translateY(-${window.scrollY}px)`;

    const clone = shell.cloneNode(true) as HTMLElement;
    clone.classList.add("tab-swipe-layer__clone");
    clone.removeAttribute("style");
    scroller.appendChild(clone);
    host.appendChild(scroller);
    setActive(true);
  };

  const neighborHref = (dir: DragDirection) => {
    const index = getMobileTabIndex(pathname);
    if (index < 0) return null;
    const next = dir === "left" ? index + 1 : index - 1;
    if (next < 0 || next >= MOBILE_TABS.length) return null;
    return MOBILE_TABS[next].href;
  };

  useEffect(() => {
    const index = getMobileTabIndex(pathname);
    if (index < 0) return;
    if (index + 1 < MOBILE_TABS.length) router.prefetch(MOBILE_TABS[index + 1].href);
    if (index - 1 >= 0) router.prefetch(MOBILE_TABS[index - 1].href);
  }, [pathname, router]);

  useEffect(() => {
    const node = document.querySelector(".tab-page-viewport");
    if (!(node instanceof HTMLElement)) return;

    const onMove = (event: Event) => {
      const start = touchRef.current;
      if (!start || start.ignore || start.locked !== "h") return;
      event.preventDefault();
    };

    node.addEventListener("touchmove", onMove, { passive: false });
    return () => node.removeEventListener("touchmove", onMove);
  }, []);

  // Clear overlay after the committed route has landed
  useEffect(() => {
    const pending = pendingHrefRef.current;
    if (!pending) return;
    if (pathname === pending || pathname.startsWith(`${pending}/`)) {
      pendingHrefRef.current = null;
      window.scrollTo(0, 0);
      clearLayers();
    }
  }, [pathname]);

  const goTo = (href: string, dir: DragDirection) => {
    if (busyRef.current) return;
    busyRef.current = true;
    pendingHrefRef.current = href;
    setTabSlideDirection(dir);
    setDragging(false);

    const endX = dir === "left" ? -screenW() : screenW();
    applyDrag(endX);

    window.setTimeout(() => {
      router.push(href);
      // Safety clear if effect doesn't run
      window.setTimeout(() => {
        if (pendingHrefRef.current === href) {
          pendingHrefRef.current = null;
          clearLayers();
        }
      }, 1000);
    }, SETTLE_MS);
  };

  const cancelSwipe = () => {
    setDragging(false);
    applyDrag(0);
    window.setTimeout(() => {
      if (!pendingHrefRef.current) clearLayers();
    }, SETTLE_MS);
  };

  const resolveSwipe = () => {
    if (busyRef.current) return;

    const dir = directionRef.current;
    const x = dragXRef.current;
    const w = screenW();
    const href = dir ? neighborHref(dir) : null;
    const progress = Math.abs(x) / w;
    const correctWay =
      dir != null && Math.sign(x) === (dir === "left" ? -1 : 1);

    if (href && correctWay && progress >= COMMIT_RATIO) {
      goTo(href, dir);
      return;
    }

    cancelSwipe();
  };

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
      captureOutgoing();
      directionRef.current = dir;
      applyDrag(0);

      requestAnimationFrame(() => {
        goTo(href, dir);
      });
    };

    document.addEventListener("click", onClickCapture, true);
    return () => document.removeEventListener("click", onClickCapture, true);
  }, [pathname]);

  const onTouchStart = (event: ReactTouchEvent<HTMLDivElement>) => {
    if (!isMobileViewport() || busyRef.current) return;
    const touch = event.changedTouches[0];
    if (!touch) return;

    widthRef.current = window.innerWidth;
    touchRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      ignore: isInsideCarousel(event.target),
      locked: "none",
    };
  };

  const onTouchMove = (event: ReactTouchEvent<HTMLDivElement>) => {
    const start = touchRef.current;
    if (!start || start.ignore || busyRef.current) return;

    const touch = event.changedTouches[0];
    if (!touch) return;

    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;

    if (start.locked === "none") {
      if (Math.abs(deltaX) < LOCK_PX && Math.abs(deltaY) < LOCK_PX) return;
      start.locked = Math.abs(deltaX) > Math.abs(deltaY) * 1.2 ? "h" : "v";
      touchRef.current = start;
      if (start.locked !== "h") return;
      captureOutgoing();
    }

    if (start.locked !== "h") return;

    const dir: DragDirection = deltaX < 0 ? "left" : "right";
    const index = getMobileTabIndex(pathname);
    const blocked =
      index < 0 ||
      (dir === "left" && index >= MOBILE_TABS.length - 1) ||
      (dir === "right" && index <= 0);

    directionRef.current = dir;
    const href = neighborHref(dir);
    if (href) router.prefetch(href);

    const w = screenW();
    const x = blocked ? deltaX * 0.18 : Math.max(-w, Math.min(w, deltaX));
    setDragging(true);
    applyDrag(x);
  };

  const onTouchEnd = () => {
    const start = touchRef.current;
    touchRef.current = null;
    if (busyRef.current) return;

    if (!start || start.ignore) return;
    if (start.locked === "v") {
      if (active) cancelSwipe();
      return;
    }
    if (start.locked !== "h") return;

    resolveSwipe();
  };

  const transition = dragging
    ? "none"
    : `transform ${SETTLE_MS}ms cubic-bezier(0.32, 0.72, 0, 1)`;

  const outgoingStyle: CSSProperties | undefined = active
    ? { transform: `translate3d(${dragX}px, 0, 0)`, transition }
    : undefined;

  const peekStyle: CSSProperties | undefined = active
    ? {
        transform: `translate3d(${
          dragX <= 0 ? screenW() + dragX : -screenW() + dragX
        }px, 0, 0)`,
        transition,
      }
    : undefined;

  return (
    <div
      className={active ? "tab-page-viewport is-swiping" : "tab-page-viewport"}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchEnd}
    >
      <div
        className={active ? "tab-swipe-peek is-visible" : "tab-swipe-peek"}
        style={peekStyle}
        aria-hidden
      />

      <div
        ref={outgoingRef}
        className={
          active ? "tab-swipe-outgoing is-visible" : "tab-swipe-outgoing"
        }
        style={outgoingStyle}
        aria-hidden
      />

      <div
        ref={shellRef}
        className="tab-page-shell"
        style={active ? { visibility: "hidden" } : undefined}
      >
        {children}
      </div>
    </div>
  );
}
