"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CompanyAnimations() {
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("[data-company-hero]");
    const card = document.querySelector<HTMLElement>("[data-mission-card]");

    if (!hero || !card) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const BOTTOM_GAP = 56; // px, keeps card clear of hero's bottom edge on short viewports

      gsap.fromTo(
        card,
        { y: "100vh" },
        {
          y: () => {
            const heroHeight = hero.offsetHeight;
            const cardHeight = card.offsetHeight;
            const centeredTop = (heroHeight - cardHeight) / 2;
            const desiredTop = centeredTop + heroHeight * 0.3;
            const maxTop = heroHeight - cardHeight - BOTTOM_GAP;
            const top = Math.min(desiredTop, maxTop);
            return top - centeredTop;
          },
          ease: "none",
          scrollTrigger: {
            trigger: "[data-mission-wrapper]",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.2,
            invalidateOnRefresh: true,
          },
        }
      );
    });

    return () => mm.revert();
  }, []);

  return null;
}
