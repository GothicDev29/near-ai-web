"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { usePathname } from "next/navigation";

/**
 * Drives a "floating" compact header that only exists once the user has
 * scrolled past the hero: hidden while scrolling down, revealed on any
 * upward scroll, and gone entirely once back near the top (where the
 * normal in-flow header is already visible).
 *
 * Pass `scrollRef` to track a scrollable container; omit it to track the
 * window itself.
 */
export function useFloatingHeader(scrollRef?: RefObject<HTMLElement | null>, threshold = 260) {
  const [pastHero, setPastHero] = useState(false);
  const [scrollingUp, setScrollingUp] = useState(false);
  const lastY = useRef(0);
  const pathname = usePathname();

  // Client-side route changes don't re-mount this hook (it lives in the
  // layout), so reset state whenever the page changes underneath it.
  useEffect(() => {
    setPastHero(false);
    setScrollingUp(false);
  }, [pathname]);

  useEffect(() => {
    const target: HTMLElement | Window = scrollRef?.current ?? window;
    const getY = () => (scrollRef?.current ? scrollRef.current.scrollTop : window.scrollY);
    lastY.current = getY();

    const onScroll = () => {
      const y = getY();
      const delta = y - lastY.current;

      setPastHero(y > threshold);
      if (delta > 4) setScrollingUp(false);
      else if (delta < -4) setScrollingUp(true);

      lastY.current = y;
    };

    target.addEventListener("scroll", onScroll, { passive: true });
    return () => target.removeEventListener("scroll", onScroll);
  }, [scrollRef, threshold, pathname]);

  return { pastHero, floatingVisible: pastHero && scrollingUp };
}
