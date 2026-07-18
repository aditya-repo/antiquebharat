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
const COMMIT_RATIO = 0.28;
const SETTLE_MS = 300;
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
  const peekRef = useRef<HTMLDivElement>(null);
  const touchRef = useRef<TouchState | null>(null);
  const dragXRef = useRef(0);
  const directionRef = useRef<DragDirection | null>(null);
  const widthRef = useRef(0);
  const settlingRef = useRef(false);
  const pendingHrefRef = useRef<string | null>(null);

  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [settling, setSettling] = useState(false);
  const [direction, setDirection] = useState<DragDirection | null>(null);
  const [layersOn, setLayersOn] = useState(false);

  const screenW = () => {
    if (!widthRef.current) widthRef.current = window.innerWidth || 1;
    return widthRef.current;
  };

  const applyDrag = (x: number) => {
    dragXRef.current = x;
    setDragX(x);
  };

  const clearLayers = () => {
    const host = outgoingRef.current;
    if (host) host.innerHTML = "";
    setLayersOn(false);
    directionRef.current = null;
    setDirection(null);
    applyDrag(0);
    setDragging(false);
    setSettling(false);
    settlingRef.current = false;
    pendingHrefRef.current = null;
  };

  const captureOutgoing = () => {
    const shell = shellRef.current;
    const host = outgoingRef.current;
    if (!shell || !host) return;
    if (host.childElementCount > 0) return;

    const scroller = document.createElement("div");
    scroller.className = "tab-swipe-layer__scroller";
    scroller.style.transform = `translateY(-${window.scrollY}px)`;

    const clone = shell.cloneNode(true) as HTMLElement;
    clone.classList.add("tab-swipe-layer__clone");
    clone.removeAttribute("style");
    scroller.appendChild(clone);
    host.appendChild(scroller);
    setLayersOn(true);
  };

  const hrefForDirection = (dir: DragDirection) => {
    const index = getMobileTabIndex(pathname);
    if (index < 0) return null;
    const next = dir === "left" ? index + 1 : index - 1;
    if (next < 0 || next >= MOBILE_TABS.length) return null;
    return MOBILE_TABS[next].href;
  };

  const fillPeekLabel = (dir: DragDirection) => {
    const peek = peekRef.current;
    if (!peek) return;
    const href = hrefForDirection(dir);
    const tab = MOBILE_TABS.find((item) => item.href === href);
    peek.dataset.label = tab?.label ?? "";
    const label = peek.querySelector(".tab-swipe-peek__label");
    if (label) label.textContent = tab?.label ?? "";
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

  // After navigation from a committed swipe, drop overlay layers
  useEffect(() => {
    const pending = pendingHrefRef.current;
    if (!pending) return;
    if (pathname === pending || pathname.startsWith(`${pending}/`)) {
      window.scrollTo(0, 0);
      clearLayers();
    }
  }, [pathname]);

  const snapTo = (endX: number, onDone: () => void) => {
    if (settlingRef.current) return;
    settlingRef.current = true;
    setDragging(false);
    setSettling(true);
    applyDrag(endX);

    window.setTimeout(() => {
      onDone();
    }, SETTLE_MS);
  };

  const resolveSwipe = () => {
    if (settlingRef.current) return;

    const x = dragXRef.current;
    const dir = directionRef.current;
    const w = screenW();

    // Nothing to resolve
    if (!layersOn && Math.abs(x) < 1) {
      clearLayers();
      return;
    }

    const href = dir ? hrefForDirection(dir) : null;
    const progress = Math.abs(x) / w;
    const shouldCommit =
      Boolean(dir && href) &&
      progress >= COMMIT_RATIO &&
      Math.sign(x) === (dir === "left" ? -1 : 1);

    if (shouldCommit && dir && href) {
      const endX = dir === "left" ? -w : w;
      setTabSlideDirection(dir);
      pendingHrefRef.current = href;
      snapTo(endX, () => {
        router.push(href);
        // layers cleared when pathname effect runs; safety timeout:
        window.setTimeout(() => {
          if (pendingHrefRef.current === href) clearLayers();
        }, 800);
      });
      return;
    }

    // Cancel — always return fully to the current page (never leave mid-gap)
    snapTo(0, () => {
      clearLayers();
    });
  };

  useEffect(() => {
    const onClickCapture = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const tab = target.closest("a.mobile-tab-bar__tab");
      if (!(tab instanceof HTMLAnchorElement)) return;
      if (!isMobileViewport() || settlingRef.current) return;

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
      fillPeekLabel(dir);
      directionRef.current = dir;
      setDirection(dir);
      applyDrag(0);
      setTabSlideDirection(dir);
      pendingHrefRef.current = href;

      requestAnimationFrame(() => {
        const endX = dir === "left" ? -screenW() : screenW();
        snapTo(endX, () => {
          router.push(href);
          window.setTimeout(() => {
            if (pendingHrefRef.current === href) clearLayers();
          }, 800);
        });
      });
    };

    document.addEventListener("click", onClickCapture, true);
    return () => document.removeEventListener("click", onClickCapture, true);
  }, [pathname, router]);

  const onTouchStart = (event: ReactTouchEvent<HTMLDivElement>) => {
    if (!isMobileViewport() || settlingRef.current) return;

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
    if (!start || start.ignore || settlingRef.current) return;

    const touch = event.changedTouches[0];
    if (!touch) return;

    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;

    if (start.locked === "none") {
      if (Math.abs(deltaX) < LOCK_PX && Math.abs(deltaY) < LOCK_PX) return;
      start.locked = Math.abs(deltaX) > Math.abs(deltaY) * 1.2 ? "h" : "v";
      touchRef.current = start;

      if (start.locked === "h") {
        captureOutgoing();
      } else {
        return;
      }
    }

    if (start.locked !== "h") return;

    const dir: DragDirection = deltaX < 0 ? "left" : "right";
    const index = getMobileTabIndex(pathname);
    const blocked =
      index < 0 ||
      (dir === "left" && index >= MOBILE_TABS.length - 1) ||
      (dir === "right" && index <= 0);

    directionRef.current = dir;
    setDirection(dir);
    fillPeekLabel(dir);

    const href = hrefForDirection(dir);
    if (href) router.prefetch(href);

    const w = screenW();
    let x = blocked ? deltaX * 0.2 : Math.max(-w, Math.min(w, deltaX));

    setDragging(true);
    applyDrag(x);
  };

  const onTouchEnd = () => {
    const start = touchRef.current;
    touchRef.current = null;

    if (settlingRef.current) return;

    // Vertical scroll gesture — discard any partial layer capture
    if (start?.locked === "v") {
      if (layersOn) clearLayers();
      return;
    }

    if (start?.ignore) return;

    // Always finish: commit or cancel. Never leave pages mid-gap.
    if (layersOn || Math.abs(dragXRef.current) > 1) {
      resolveSwipe();
    }
  };

  const w = typeof window !== "undefined" ? screenW() : 0;
  const peekX =
    direction === "left" ? w + dragX : direction === "right" ? -w + dragX : w;

  const transition = dragging
    ? "none"
    : `transform ${SETTLE_MS}ms cubic-bezier(0.32, 0.72, 0, 1)`;

  const outgoingStyle: CSSProperties | undefined = layersOn
    ? { transform: `translate3d(${dragX}px, 0, 0)`, transition }
    : undefined;

  const peekStyle: CSSProperties | undefined = layersOn
    ? {
        transform: `translate3d(${direction ? peekX : w}px, 0, 0)`,
        transition,
        opacity: direction ? 1 : 0,
      }
    : undefined;

  return (
    <div
      className={
        layersOn
          ? `tab-page-viewport is-swiping is-swiping--${direction ?? "left"}`
          : "tab-page-viewport"
      }
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchEnd}
    >
      {/* Next page stand-in — moves with finger from the side */}
      <div
        ref={peekRef}
        className={layersOn ? "tab-swipe-peek is-visible" : "tab-swipe-peek"}
        style={peekStyle}
        aria-hidden
      >
        <div className="tab-swipe-peek__panel">
          <span className="tab-swipe-peek__label" />
        </div>
      </div>

      {/* Current page freeze — moves with finger */}
      <div
        ref={outgoingRef}
        className={
          layersOn ? "tab-swipe-outgoing is-visible" : "tab-swipe-outgoing"
        }
        style={outgoingStyle}
        aria-hidden
      />

      <div
        ref={shellRef}
        className="tab-page-shell"
        style={layersOn ? { visibility: "hidden" } : undefined}
      >
        {children}
      </div>
    </div>
  );
}
