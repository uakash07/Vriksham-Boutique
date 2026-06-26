"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/#collections", label: "Collections" },
  { href: "/catalog", label: "Catalog" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* On homepage: transparent until scrolled; on other pages: always light */
  const darkMode   = isHome && !scrolled;
  const bgColor    = darkMode
    ? "rgba(0,0,0,0)"
    : scrolled
      ? isHome ? "rgba(0,0,0,0.9)" : "rgba(255,255,255,0.97)"
      : isHome ? "rgba(0,0,0,0)" : "rgba(255,255,255,0.95)";
  const textColor  = darkMode || (isHome && scrolled) ? "#fff" : "#1a1a1a";
  /* invert(1) hue-rotate(200deg): turns dark-tree → warm-gold, white-bg → near-black (matches dark navbar) */
  const logoFilter = darkMode || (isHome && scrolled)
    ? "invert(1) hue-rotate(200deg) saturate(2) brightness(1.1)"
    : "none";
  const borderCol  = darkMode || (isHome && scrolled) ? "rgba(255,255,255,0.08)" : "#ece6dc";

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 999,
      backgroundColor: bgColor,
      borderBottom: `1px solid ${borderCol}`,
      boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,0.15)" : "none",
      transition: "background-color 0.4s, border-color 0.4s, box-shadow 0.4s",
      backdropFilter: scrolled ? "blur(14px)" : "none",
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: "0 24px",
        height: 68, display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Image src="/vriksham-logo.jpg" alt="Vriksham Boutique" width={38} height={46}
            style={{ objectFit: "contain", filter: logoFilter, transition: "filter 0.4s" }} />
          <div>
            <div style={{
              fontFamily: "'Playfair Display', serif", fontSize: 14, fontWeight: 700,
              color: textColor, letterSpacing: 2, transition: "color 0.4s",
            }}>VRIKSHAM</div>
            <div style={{
              fontFamily: "'Playfair Display', serif", fontSize: 8,
              color: "#C4922A", letterSpacing: 4,
            }}>BOUTIQUE</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex" style={{ display: "flex", alignItems: "center", gap: 36 }}>
          {NAV.map(l => (
            <Link key={l.href} href={l.href} style={{
              fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 500,
              color: textColor, letterSpacing: "0.08em", transition: "color 0.2s, opacity 0.4s",
              opacity: 0.85,
            }}
              onMouseEnter={e => (e.currentTarget.style.color = "#C4922A")}
              onMouseLeave={e => (e.currentTarget.style.color = textColor)}>
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTA + hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Link href="/catalog" className="hidden sm:block" style={{
            fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700,
            letterSpacing: "0.18em", textTransform: "uppercase",
            padding: "10px 24px", borderRadius: 2,
            background: darkMode || (isHome && scrolled) ? "#C4922A" : "#1a1a1a",
            color: darkMode || (isHome && scrolled) ? "#000" : "#fff",
            transition: "background 0.3s, color 0.3s",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#C4922A"; (e.currentTarget as HTMLElement).style.color = "#000"; }}
            onMouseLeave={e => {
              const dm = document.documentElement.getAttribute("data-home-scrolled") !== "true" && pathname === "/";
              (e.currentTarget as HTMLElement).style.background = dm ? "#C4922A" : "#1a1a1a";
              (e.currentTarget as HTMLElement).style.color = dm ? "#000" : "#fff";
            }}>
            Shop Now
          </Link>

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
            {[0, 1, 2].map(n => (
              <div key={n} style={{
                width: 22, height: 2,
                background: textColor,
                marginBottom: n < 2 ? 5 : 0,
                transition: "transform 0.2s, opacity 0.2s, background 0.4s",
                transform: menuOpen
                  ? n === 0 ? "rotate(45deg) translate(5px,5px)"
                  : n === 2 ? "rotate(-45deg) translate(5px,-5px)"
                  : "none" : "none",
                opacity: menuOpen && n === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
            style={{
              overflow: "hidden",
              borderTop: `1px solid ${borderCol}`,
              background: isHome ? "rgba(0,0,0,0.95)" : "#fff",
              backdropFilter: "blur(16px)",
            }}>
            <nav style={{ padding: "16px 24px", display: "flex", flexDirection: "column", gap: 20 }}>
              {NAV.map(l => (
                <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: "'Inter', sans-serif", fontSize: 15,
                    color: isHome ? "#fff" : "#1a1a1a", fontWeight: 500,
                  }}>
                  {l.label}
                </Link>
              ))}
              <Link href="/catalog" onClick={() => setMenuOpen(false)} style={{
                display: "inline-block", background: "#C4922A", color: "#000",
                fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 700,
                letterSpacing: "0.18em", textTransform: "uppercase",
                padding: "12px 24px", borderRadius: 2, width: "fit-content",
              }}>Shop Now</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
