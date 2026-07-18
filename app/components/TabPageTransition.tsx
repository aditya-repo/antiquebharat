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

const LOCK_PX = 10;
const START_NAV_PX = 28;
const COMMIT_PX = 72;
const COMMIT_RATIO = 0.18;
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

type Session = {
  direction: DragDirection;
  fromPath: string;
  toHref: string;
  originX: number;
};

function isInsideCarousel(target: EventTarget | null) {
  return target instanceof Element && Boolean(target.closest(CAROUSEL_SELECTOR));
}

function isMobileViewport() {
  return typeof window !== "undefined" && window.matchMedia(MOBILE_QUERY).matches;
}

export function TabPageTransition({ children }: TabPageTransitionProps) {
  const pathname = usePathname();
  const router = useRouter();

  const shellRef = useRef<HTMLDivElement>(null);
  const outgoingRef = useRef<HTMLDivElement>(null);
  const touchRef = useRef<TouchState | null>(null);
  const sessionRef = useRef<Session | null>(null);
  const dragXRef = useRef(0);
  const widthRef = useRef(0);
  const settlingRef = useRef(false);
  const tapCommitRef = useRef(false);
  const previousPath = useRef(pathname);

  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [settling, setSettling] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [outgoingReady, setOutgoingReady] = useState(false);
  const [routeReady, setRouteReady] = useState(false);

  const width = () => {
    if (!widthRef.current) widthRef.current = window.innerWidth || 1;
    return widthRef.current;
  };

  const clearOutgoing = () => {
    const host = outgoingRef.current;
    if (host) host.innerHTML = "";
    setOutgoingReady(false);
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
    setOutgoingReady(true);
  };

  const hrefFor = (fromPath: string, dir: DragDirection) => {
    const index = getMobileTabIndex(fromPath);
    if (index < 0) return null;
    const next = dir === "left" ? index + 1 : index - 1;
    if (next < 0 || next >= MOBILE_TABS.length) return null;
    return MOBILE_TABS[next].href;
  };

  const resetAll = () => {
    sessionRef.current = null;
    dragXRef.current = 0;
    settlingRef.current = false;
    setSession(null);
    setDragX(0);
    setDragging(false);
    setSettling(false);
    setRouteReady(false);
    clearOutgoing();
  };

  const applyDrag = (x: number) => {
    dragXRef.current = x;
    setDragX(x);
  };

  // When route arrives mid-swipe, keep both layers synced to current finger offset
  useLayoutEffect(() => {
    if (previousPath.current === pathname) return;
    const active = sessionRef.current;
    previousPath.current = pathname;

    if (!active) {
      resetAll();
      return;
    }

    // Landed on the intended page while dragging / settling
    if (pathname === active.toHref || pathname.startsWith(`${active.toHref}/`)) {
      window.scrollTo(0, 0);
      setRouteReady(true);
      if (tapCommitRef.current) {
        tapCommitRef.current = false;
        requestAnimationFrame(() => completeCommit());
      }
      return;
    }

    // Unexpected route
    resetAll();
  }, [pathname]);

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

  const beginSession = (dir: DragDirection, originX: number) => {
    const toHref = hrefFor(pathname, dir);
    if (!toHref || sessionRef.current) return false;

    widthRef.current = window.innerWidth;
    if (!outgoingRef.current?.childElementCount) {
      captureOutgoing();
    }

    const next: Session = {
      direction: dir,
      fromPath: pathname,
      toHref,
      originX,
    };
    sessionRef.current = next;
    setSession(next);
    router.prefetch(toHref);
    router.push(toHref);
    return true;
  };

  const completeCommit = () => {
    const active = sessionRef.current;
    if (!active || settlingRef.current) return;
    settlingRef.current = true;
    setDragging(false);
    setSettling(true);

    const end = active.direction === "left" ? -width() : width();
    applyDrag(end);

    window.setTimeout(() => {
      clearOutgoing();
      sessionRef.current = null;
      setSession(null);
      setRouteReady(false);
      applyDrag(0);
      setSettling(false);
      settlingRef.current = false;
      setDragging(false);
      window.scrollTo(0, 0);
    }, SETTLE_MS);
  };

  const completeCancel = () => {
    const active = sessionRef.current;
    if (settlingRef.current) return;
    settlingRef.current = true;
    setDragging(false);
    setSettling(true);
    applyDrag(0);

    window.setTimeout(() => {
      const from = active?.fromPath;
      clearOutgoing();
      sessionRef.current = null;
      setSession(null);
      setRouteReady(false);
      setSettling(false);
      settlingRef.current = false;
      setDragging(false);
      applyDrag(0);
      if (from && pathname !== from) {
        router.push(from);
      }
    }, SETTLE_MS);
  };

  // Tab bar clicks — animate both pages from center
  useEffect(() => {
    const onClickCapture = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const tab = target.closest("a.mobile-tab-bar__tab");
      if (!(tab instanceof HTMLAnchorElement)) return;
      if (!isMobileViewport() || sessionRef.current || settlingRef.current) return;

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
      const next: Session = {
        direction: dir,
        fromPath: pathname,
        toHref: href,
        originX: 0,
      };
      sessionRef.current = next;
      setSession(next);
      applyDrag(0);
      setDragging(false);
      tapCommitRef.current = true;
      router.push(href);
    };

    document.addEventListener("click", onClickCapture, true);
    return () => document.removeEventListener("click", onClickCapture, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const onTouchStart = (event: ReactTouchEvent<HTMLDivElement>) => {
    if (!isMobileViewport() || settlingRef.current) {
      touchRef.current = null;
      return;
    }
    // If a session is already active, allow continuing? Prefer fresh gesture only when idle
    if (sessionRef.current && !dragging) {
      touchRef.current = null;
      return;
    }

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
      start.locked = Math.abs(deltaX) > Math.abs(deltaY) * 1.15 ? "h" : "v";
      touchRef.current = start;
      if (start.locked === "h") {
        // Freeze the current page immediately so both layers can move with the finger
        widthRef.current = window.innerWidth;
        captureOutgoing();
      }
    }

    if (start.locked !== "h") return;

    const dir: DragDirection = deltaX < 0 ? "left" : "right";
    const currentIndex = getMobileTabIndex(
      sessionRef.current?.fromPath ?? pathname,
    );
    if (currentIndex < 0) return;

    const blocked =
      (dir === "left" && currentIndex >= MOBILE_TABS.length - 1) ||
      (dir === "right" && currentIndex <= 0);

    if (!sessionRef.current && !blocked && Math.abs(deltaX) >= START_NAV_PX) {
      beginSession(dir, start.x);
    }

    let x = deltaX;
    if (blocked && !sessionRef.current) {
      x = deltaX * 0.2;
    } else {
      const w = width();
      x = Math.max(-w, Math.min(w, deltaX));
    }

    // If session direction conflicts with reverse drag past center, allow cancel path
    const active = sessionRef.current;
    if (active && Math.sign(x) !== (active.direction === "left" ? -1 : 1)) {
      // User dragged back toward origin
      x = Math.max(-width() * 0.15, Math.min(width() * 0.15, x));
    }

    setDragging(true);
    applyDrag(x);
  };

  const onTouchEnd = () => {
    const start = touchRef.current;
    touchRef.current = null;
    if (!start || start.ignore || start.locked !== "h" || settlingRef.current) {
      return;
    }

    const active = sessionRef.current;
    const x = dragXRef.current;
    const w = width();

    if (!active) {
      // Never started nav — just spring back
      setDragging(false);
      setSettling(true);
      applyDrag(0);
      window.setTimeout(() => {
        setSettling(false);
        clearOutgoing();
      }, SETTLE_MS);
      return;
    }

    const traveled = Math.abs(x);
    const commit =
      traveled >= COMMIT_PX || traveled >= w * COMMIT_RATIO;

    if (commit && Math.sign(x) === (active.direction === "left" ? -1 : 1)) {
      completeCommit();
    } else {
      completeCancel();
    }
  };

  const active = session;
  const interactive = Boolean(active || dragging || settling || outgoingReady);

  const transition = dragging
    ? "none"
    : `transform ${SETTLE_MS}ms cubic-bezier(0.32, 0.72, 0, 1)`;

  const outgoingStyle: CSSProperties | undefined = outgoingReady
    ? { transform: `translate3d(${dragX}px, 0, 0)`, transition }
    : undefined;

  // Incoming real page sits to the side and follows the same finger delta
  const showIncoming = Boolean(active && routeReady);
  const incomingOffset = showIncoming
    ? active!.direction === "left"
      ? width() + dragX
      : -width() + dragX
    : 0;

  const incomingStyle: CSSProperties | undefined = showIncoming
    ? {
        transform: `translate3d(${incomingOffset}px, 0, 0)`,
        transition,
      }
    : outgoingReady
      ? { visibility: "hidden" }
      : undefined;

  return (
    <div
      className={
        interactive
          ? `tab-page-viewport is-swiping is-swiping--${active?.direction ?? "left"}`
          : "tab-page-viewport"
      }
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchEnd}
    >
      <div
        ref={outgoingRef}
        className={
          outgoingReady ? "tab-swipe-outgoing is-visible" : "tab-swipe-outgoing"
        }
        style={outgoingStyle}
        aria-hidden
      />

      <div
        ref={shellRef}
        className={["tab-page-shell", showIncoming ? "is-incoming" : ""]
          .filter(Boolean)
          .join(" ")}
        style={incomingStyle}
      >
        {children}
      </div>
    </div>
  );
}
