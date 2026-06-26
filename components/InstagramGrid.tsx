"use client";

import { useState } from "react";

const PLACEHOLDER_CAPTIONS = [
  "Festival season is here ✨",
  "Drape yourself in elegance 🌿",
  "New arrivals this week 💛",
  "The wedding collection 🌸",
  "Pure silk, pure joy ✨",
  "Handpicked with love 🍃",
];

export default function InstagramGrid() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "12px",
        }}
        className="grid-cols-2 sm:grid-cols-3"
      >
        {PLACEHOLDER_CAPTIONS.map((caption, i) => (
          <a
            key={i}
            href="https://instagram.com/vriksham_.boutique"
            target="_blank"
            rel="noopener noreferrer"
            className="insta-frame"
            style={{
              display: "block",
              aspectRatio: "1/1",
              backgroundColor: "#F5F0E8",
              border: `2px solid ${hoveredIndex === i ? "#e8c06a" : "#C4922A"}`,
              borderRadius: "2px",
              position: "relative",
              overflow: "hidden",
              textDecoration: "none",
              boxShadow: hoveredIndex === i
                ? "0 0 30px rgba(196,146,42,0.5)"
                : "0 0 10px rgba(196,146,42,0.1)",
              transition: "box-shadow 0.3s ease, border-color 0.3s ease",
            }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Animated shimmer background */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(135deg, #F5F0E8 0%, #E8DDD0 25%, #C4922A22 50%, #8FAF8A22 75%, #F5F0E8 100%)",
                backgroundSize: "400% 400%",
                animation: `silk-shift ${4 + (i % 3)}s ease infinite`,
              }}
            />

            {/* Lotus pattern overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0.15,
              }}
            >
              <svg width="80" height="80" viewBox="0 0 80 80">
                <path d="M40 70 Q30 55 20 50 Q25 38 40 42 Q55 38 60 50 Q50 55 40 70Z" fill="#C4922A"/>
                <path d="M40 70 Q22 50 14 36 Q24 24 40 30 Q56 24 66 36 Q58 50 40 70Z" fill="#C4922A"/>
                <circle cx="40" cy="42" r="5" fill="#C4922A"/>
              </svg>
            </div>

            {/* Hover overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: "rgba(107,76,53,0.5)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                opacity: hoveredIndex === i ? 1 : 0,
                transition: "opacity 0.3s ease",
                zIndex: 5,
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white" style={{ marginBottom: "8px" }}>
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span style={{ color: "#fff", fontSize: "11px", fontWeight: 600, letterSpacing: "1px" }}>
                @vriksham_.boutique
              </span>
            </div>

            {/* Always-visible caption strip */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "8px 10px",
                background: "linear-gradient(transparent, rgba(107,76,53,0.7))",
                zIndex: 4,
              }}
            >
              <span style={{ color: "#F5F0E8", fontSize: "10px", fontStyle: "italic" }}>
                {caption}
              </span>
            </div>
          </a>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "24px" }}>
        <a
          href="https://instagram.com/vriksham_.boutique"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            color: "#C4922A",
            fontSize: "13px",
            fontWeight: 600,
            letterSpacing: "1.5px",
            textDecoration: "none",
            textTransform: "uppercase",
            borderBottom: "1px solid #C4922A",
            paddingBottom: "2px",
          }}
        >
          Follow us on Instagram →
        </a>
      </div>
    </div>
  );
}
