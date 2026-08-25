"use client";

import { useState } from "react";
import Image from "next/image";
import { PlusIcon, XIcon } from "lucide-react";
import GetInTouchModal from "@/components/site/GetInTouchModal";

const NAV_LINKS = [
  { href: "/blog", label: "BLOG" },
  { href: "/company", label: "OUR COMPANY" },
];

export default function SiteHeader({ compact = false, dark = true }: { compact?: boolean; dark?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const text = dark ? "text-white/80" : "text-[#101010]/80";
  const textHover = dark ? "hover:text-white" : "hover:text-[#101010]";
  const border = dark ? "border-white/40" : "border-[#101010]/30";
  const borderHover = dark ? "hover:border-white/70" : "hover:border-[#101010]/60";

  return (
    <header className={`relative ${compact ? "py-3" : "py-8"} text-[0.75rem] lg:text-[0.875rem] uppercase tracking-[0.2em] ${text}`}>
      <div className="flex items-center justify-between">
        <a href="/">
          <Image
            src={dark ? "/near-ai.png" : "/branding/logos/primary/primary-color.svg"}
            alt="NEAR AI"
            width={120}
            height={24}
            className="w-auto h-5 md:h-6"
          />
        </a>

        <div className="flex items-center gap-4 md:gap-8">
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className={`text-pretty transition-colors ${textHover}`}>
                {link.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className={`md:hidden relative z-50 flex items-center justify-center w-8 h-8 border ${border} rounded-full ${text} ${textHover} ${borderHover} transition-colors cursor-pointer`}
          >
            {menuOpen ? <XIcon className="w-4 h-4" /> : <PlusIcon className="w-4 h-4" />}
          </button>

          <GetInTouchModal dark={dark} />
        </div>
      </div>

      {menuOpen && (
        <>
          <button
            type="button"
            aria-hidden="true"
            tabIndex={-1}
            onClick={() => setMenuOpen(false)}
            className="md:hidden fixed inset-0 z-40 cursor-default"
          />
          <nav
            id="mobile-nav-menu"
            className={
              dark
                ? "md:hidden absolute right-0 top-full z-50 flex flex-col items-start gap-4 rounded-2xl border border-white/15 bg-[#3a3a3a] px-6 py-5 shadow-xl shadow-black/30"
                : "md:hidden absolute right-0 top-full z-50 flex flex-col items-start gap-4 rounded-2xl border border-black/10 bg-white px-6 py-5 shadow-xl shadow-black/10"
            }
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`text-pretty transition-colors ${textHover}`}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </>
      )}
    </header>
  );
}
