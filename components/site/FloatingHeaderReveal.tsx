"use client";

import SiteHeader from "@/components/site/SiteHeader";
import { useFloatingHeader } from "@/components/site/hooks/useFloatingHeader";

/**
 * Compact header that appears once you scroll past the hero and scroll
 * back up, hides on scroll-down, and disappears entirely near the top
 * (where the normal in-flow SiteHeader is already visible).
 *
 * Desktop only for now — mobile keeps today's static header until that
 * gets its own pass.
 */
export default function FloatingHeaderReveal() {
  const { floatingVisible } = useFloatingHeader();

  return (
    <div
      className={`hidden md:block fixed top-4 inset-x-0 z-50 transition-transform duration-300 ease-out ${
        floatingVisible ? "translate-y-0" : "-translate-y-[calc(100%+1rem)]"
      }`}
    >
      <div className="mx-auto w-full max-w-[1920px] px-5 sm:px-10 lg:px-20">
        <div
          className="rounded-full border border-black/10 shadow-xl shadow-black/10 pl-7 pr-4 py-1"
          style={{
            backgroundColor: "rgba(238, 238, 235, 0.9)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
          }}
        >
          <SiteHeader compact dark={false} />
        </div>
      </div>
    </div>
  );
}
