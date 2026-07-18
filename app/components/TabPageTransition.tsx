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

const LOCK_PX = 12;
const START_NAV_PX = 24;
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

type Session = {
  direction: DragDirection;
  fromPath: string;
  toHref: string;
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
  const [outgoingOn, setOutgoingOn] = useState(false);
  const [incomingReady, setIncomingReady] = useState(false);

  const screenW = () => {
    if (!widthRef.current) widthRef.current = window.innerWidth || 1;
    return widthRef.current;
  };

  const applyDrag = (x: number) => {
    dragXRef.current = x;
    setDragX(x);
  };

  const clearOutgoing = () => {
    const host = outgoingRef.current;
    if (host) host.innerHTML = "";
    setOutgoingOn(false);
  };

  const resetSwipe = () => {
    sessionRef.current = null;
    setSession(null);
    applyDrag(0);
    setDragging(false);
    setSettling(false);
    settlingRef.current = false;
    setIncomingReady(false);
    clearOutgoing();
    tapCommitRef.current = false;
  };

  const captureOutgoing = () => {
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
    setOutgoingOn(true);
  };

  const hrefFor = (fromPath: string, dir: DragDirection) => {
    const index = getMobileTabIndex(fromPath);
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

  const snapTo = (endX: number, onDone: () => void) => {
    if (settlingRef.current) return;
    settlingRef.current = true;
    setDragging(false);
    setSettling(true);
    applyDrag(endX);
    window.setTimeout(onDone, SETTLE_MS);
  };

  const completeCommit = () => {
    const active = sessionRef.current;
    if (!active) {
      resetSwipe();
      return;
    }
    const endX = active.direction === "left" ? -screenW() : screenW();
    setTabSlideDirection(active.direction);
    snapTo(endX, () => {
      resetSwipe();
      window.scrollTo(0, 0);
    });
  };

  const completeCancel = () => {
    const active = sessionRef.current;
    const from = active?.fromPath;
    snapTo(0, () => {
      clearOutgoing();
      setIncomingReady(false);
      setSession(null);
      sessionRef.current = null;
      settlingRef.current = false;
      setSettling(false);
      setDragging(false);
      applyDrag(0);
      if (from && pathname !== from) {
        router.replace(from);
      }
    });
  };

  const beginSession = (dir: DragDirection) => {
    if (sessionRef.current) return false;
    const toHref = hrefFor(pathname, dir);
    if (!toHref) return false;

    captureOutgoing();
    const next: Session = {
      direction: dir,
      fromPath: pathname,
      toHref,
    };
    sessionRef.current = next;
    setSession(next);
    setIncomingReady(false);
    router.prefetch(toHref);
    router.push(toHref);
    return true;
  };

  useLayoutEffect(() => {
    if (previousPath.current === pathname) return;
    const active = sessionRef.current;
    previousPath.current = pathname;

    if (!active) {
      if (outgoingOn) resetSwipe();
      return;
    }

    if (pathname === active.toHref || pathname.startsWith(`${active.toHref}/`)) {
      window.scrollTo(0, 0);
      setIncomingReady(true);
      if (tapCommitRef.current) {
        tapCommitRef.current = false;
        requestAnimationFrame(() => completeCommit());
      }
      return;
    }

    // Navigated elsewhere unexpectedly
    resetSwipe();
  }, [pathname, outgoingOn]);

  useEffect(() => {
    const onClickCapture = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const tab = target.closest("a.mobile-tab-bar__tab");
      if (!(tab instanceof HTMLAnchorElement)) return;
      if (!isMobileViewport() || settlingRef.current || sessionRef.current) return;

      const href = tab.getAttribute("href");
      if (!href || href === pathname) return;
      const nextIndex = getMobileTabIndex(href);
      const currentIndex = getMobileTabIndex(pathname);
      if (nextIndex < 0 || currentIndex < 0 || nextIndex === currentIndex) return;

      event.preventDefault();
      event.stopPropagation();

      const dir: DragDirection = nextIndex > currentIndex ? "left" : "right";
      widthRef.current = window.innerWidth;
      tapCommitRef.current = true;
      beginSession(dir);
      applyDrag(0);
    };

    document.addEventListener("click", onClickCapture, true);
    return () => document.removeEventListener("click", onClickCapture, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const resolveSwipe = () => {
    if (settlingRef.current) return;

    const active = sessionRef.current;
    const x = dragXRef.current;
    const w = screenW();

    if (!active && !outgoingOn) {
      resetSwipe();
      return;
    }

    if (!active) {
      snapTo(0, () => resetSwipe());
      return;
    }

    const progress = Math.abs(x) / w;
    const correctWay =
      Math.sign(x) === (active.direction === "left" ? -1 : 1) || x === 0;
    const shouldCommit = correctWay && progress >= COMMIT_RATIO;

    if (shouldCommit) {
      // Ensure we're on the target route before finishing
      if (!incomingReady) {
        router.push(active.toHref);
      }
      completeCommit();
    } else {
      completeCancel();
    }
  };

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
        widthRef.current = window.innerWidth;
        captureOutgoing();
      } else {
        return;
      }
    }

    if (start.locked !== "h") return;

    const dir: DragDirection = deltaX < 0 ? "left" : "right";
    const fromPath = sessionRef.current?.fromPath ?? pathname;
    const index = getMobileTabIndex(fromPath);
    const blocked =
      index < 0 ||
      (dir === "left" && index >= MOBILE_TABS.length - 1) ||
      (dir === "right" && index <= 0);

    if (!sessionRef.current && !blocked && Math.abs(deltaX) >= START_NAV_PX) {
      beginSession(dir);
    }

    const active = sessionRef.current;
    const w = screenW();
    let x = deltaX;

    if (blocked && !active) {
      x = deltaX * 0.2;
    } else if (active) {
      // Keep drag aligned to session direction; allow pull-back toward 0 to cancel
      if (active.direction === "left") {
        x = Math.max(-w, Math.min(0, deltaX));
      } else {
        x = Math.min(w, Math.max(0, deltaX));
      }
    } else {
      x = Math.max(-w, Math.min(w, deltaX));
    }

    setDragging(true);
    applyDrag(x);
  };

  const onTouchEnd = () => {
    const start = touchRef.current;
    touchRef.current = null;
    if (settlingRef.current) return;

    if (start?.locked === "v") {
      if (outgoingOn && !sessionRef.current) resetSwipe();
      return;
    }
    if (start?.ignore) return;

    if (outgoingOn || sessionRef.current || Math.abs(dragXRef.current) > 1) {
      resolveSwipe();
    }
  };

  const active = session;
  const showIncoming = Boolean(active && incomingReady);
  const layersOn = outgoingOn || showIncoming;

  const transition = dragging
    ? "none"
    : `transform ${SETTLE_MS}ms cubic-bezier(0.32, 0.72, 0, 1)`;

  const outgoingStyle: CSSProperties | undefined = outgoingOn
    ? { transform: `translate3d(${dragX}px, 0, 0)`, transition }
    : undefined;

  const incomingOffset = showIncoming
    ? active!.direction === "left"
      ? screenW() + dragX
      : -screenW() + dragX
    : 0;

  const incomingStyle: CSSProperties | undefined = showIncoming
    ? {
        transform: `translate3d(${incomingOffset}px, 0, 0)`,
        transition,
      }
    : outgoingOn
      ? { visibility: "hidden" }
      : undefined;

  return (
    <div
      className={
        layersOn
          ? `tab-page-viewport is-swiping is-swiping--${active?.direction ?? "left"}`
          : "tab-page-viewport"
      }
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchEnd}
    >
      {/* Current page snapshot — follows finger */}
      <div
        ref={outgoingRef}
        className={
          outgoingOn ? "tab-swipe-outgoing is-visible" : "tab-swipe-outgoing"
        }
        style={outgoingStyle}
        aria-hidden
      />

      {/* Real next page — follows finger once loaded (no title placeholder) */}
      <div
        ref={shellRef}
        className={showIncoming ? "tab-page-shell is-incoming" : "tab-page-shell"}
        style={incomingStyle}
      >
        {children}
      </div>
    </div>
  );
}
