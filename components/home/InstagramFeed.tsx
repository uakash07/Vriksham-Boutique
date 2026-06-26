"use client";
import { useState } from "react";

const TILES = [
  { gradient: "linear-gradient(135deg,#3d1c02 0%,#8B4513 45%,#C4922A 100%)", label: "SILK",    caption: "Kanchipuram silk — woven over generations" },
  { gradient: "linear-gradient(135deg,#1a0a2e 0%,#6b21a8 55%,#a855f7 100%)", label: "BRIDAL",  caption: "Your wedding day deserves nothing less" },
  { gradient: "linear-gradient(135deg,#022c22 0%,#065f46 50%,#10b981 100%)", label: "COTTON",  caption: "Breathe easy, drape beautifully" },
  { gradient: "linear-gradient(135deg,#450a0a 0%,#991b1b 50%,#ef4444 100%)", label: "FESTIVAL",caption: "Celebrate every occasion in colour" },
  { gradient: "linear-gradient(135deg,#1c1917 0%,#78350f 50%,#d97706 100%)", label: "BANARASI",caption: "Gold zari threads meet timeless craft" },
  { gradient: "linear-gradient(135deg,#0c1445 0%,#1e3a8a 50%,#60a5fa 100%)", label: "EVERYDAY",caption: "Elegance doesn't need an occasion" },
];

function Tile({ t, i }: { t: typeof TILES[0]; i: number }) {
  const [hov, setHov] = useState(false);
  return (
    <a href="https://www.instagram.com/vriksham_.boutique/"
      target="_blank" rel="noopener noreferrer"
      style={{ display: "block", aspectRatio: "1/1", position: "relative", overflow: "hidden",
        background: t.gradient, cursor: "pointer", textDecoration: "none",
        transition: "transform 0.3s ease",
        transform: hov ? "scale(1.03)" : "scale(1)",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}>

      {/* Silk sheen */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.09,
        backgroundImage: `repeating-linear-gradient(108deg,rgba(255,255,255,0) 0px,rgba(255,255,255,0.8) 1px,rgba(255,255,255,0) 2px,rgba(255,255,255,0) 10px)`,
        animation: `tileSheen 6s linear ${i * 0.7}s infinite`,
      }} />

      {/* Category label */}
      <p style={{
        position: "absolute", top: 14, left: 16, zIndex: 3,
        fontFamily: "'Inter', sans-serif", fontSize: 9, fontWeight: 700,
        letterSpacing: "0.3em", color: "rgba(255,255,255,0.6)",
        textTransform: "uppercase", margin: 0,
      }}>{t.label}</p>

      {/* Hover overlay */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 4,
        background: "rgba(0,0,0,0.52)", display: "flex",
        flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12,
        opacity: hov ? 1 : 0, transition: "opacity 0.28s ease",
        padding: 24,
      }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="white" opacity="0.8">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 12, fontStyle: "italic",
          color: "#fff", textAlign: "center", lineHeight: 1.6, margin: 0 }}>{t.caption}</p>
      </div>

      {/* Bottom accent */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
        background: "rgba(196,146,42,0.7)",
        transform: hov ? "scaleX(1)" : "scaleX(0)",
        transformOrigin: "left", transition: "transform 0.35s ease",
      }} />
    </a>
  );
}

export default function InstagramFeed() {
  return (
    <section style={{ background: "#0e0e0e", padding: "100px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 700,
            letterSpacing: "0.35em", color: "#C4922A", textTransform: "uppercase", marginBottom: 14 }}>
            Instagram
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(26px, 4.5vw, 52px)", fontWeight: 700, color: "#fff", margin: 0 }}>
            Follow the Story
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#555",
            marginTop: 10, letterSpacing: "0.15em" }}>@vriksham_.boutique</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 4 }}>
          {TILES.map((t, i) => <Tile key={i} t={t} i={i} />)}
        </div>

        <div style={{ textAlign: "center", marginTop: 48 }}>
          <a href="https://www.instagram.com/vriksham_.boutique/" target="_blank" rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "#fff", border: "1px solid #333", padding: "14px 40px", borderRadius: 2,
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#C4922A"; (e.currentTarget as HTMLElement).style.color = "#C4922A"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#333"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}>
            Follow on Instagram
          </a>
        </div>
      </div>

      <style>{`
        @keyframes tileSheen {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
      `}</style>
    </section>
  );
}
