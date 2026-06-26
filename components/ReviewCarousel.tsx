"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const reviews = [
  {
    id: 1,
    quote: "The Banarasi silk is absolutely stunning! Perfect for my daughter's wedding. The quality is unmatched and the colour is even more beautiful in person.",
    name: "Meenakshi R.",
    location: "Chennai",
    stars: 5,
  },
  {
    id: 2,
    quote: "Quality is exceptional and the packaging was so beautiful — it felt like receiving a gift. I will definitely be ordering again!",
    name: "Priya S.",
    location: "Bangalore",
    stars: 5,
  },
  {
    id: 3,
    quote: "My go-to boutique for festival sarees. Always find something unique and elegant that stands out in any crowd.",
    name: "Lakshmi V.",
    location: "Coimbatore",
    stars: 5,
  },
  {
    id: 4,
    quote: "Ordered the Chanderi silk and got so many compliments at the family function. Vriksham never disappoints!",
    name: "Anitha K.",
    location: "Chennai",
    stars: 5,
  },
];

export default function ReviewCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const review = reviews[current];

  return (
    <div style={{ position: "relative", maxWidth: "700px", margin: "0 auto" }}>
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={review.id}
          custom={direction}
          initial={{ opacity: 0, x: direction * 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -60 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{
            backgroundColor: "#fff",
            border: "1px solid rgba(196,146,42,0.2)",
            borderRadius: "4px",
            padding: "40px",
            textAlign: "center",
            boxShadow: "0 8px 40px rgba(107,76,53,0.08)",
            position: "relative",
          }}
        >
          {/* Quote icon */}
          <div style={{ fontSize: "64px", lineHeight: 1, color: "rgba(196,146,42,0.2)", fontFamily: "Georgia, serif", position: "absolute", top: "12px", left: "20px" }}>
            &ldquo;
          </div>

          {/* Stars */}
          <div style={{ display: "flex", justifyContent: "center", gap: "4px", marginBottom: "16px" }}>
            {Array.from({ length: review.stars }).map((_, i) => (
              <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#C4922A">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>

          <p style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "17px",
            lineHeight: 1.7,
            color: "#4a3828",
            fontStyle: "italic",
            marginBottom: "24px",
          }}>
            &ldquo;{review.quote}&rdquo;
          </p>

          <div>
            <div style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 600, fontSize: "14px", color: "#6B4C35" }}>
              — {review.name}
            </div>
            <div style={{ fontSize: "12px", color: "#C4922A", letterSpacing: "1px", marginTop: "4px" }}>
              {review.location}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation dots */}
      <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "24px" }}>
        {reviews.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: i === current ? "28px" : "8px",
              height: "8px",
              borderRadius: "4px",
              background: i === current ? "#C4922A" : "rgba(196,146,42,0.3)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
              padding: 0,
            }}
            aria-label={`Go to review ${i + 1}`}
          />
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={() => { setDirection(-1); setCurrent((c) => (c - 1 + reviews.length) % reviews.length); }}
        style={{
          position: "absolute",
          left: "-48px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "none",
          border: "1px solid rgba(196,146,42,0.4)",
          borderRadius: "50%",
          width: "36px",
          height: "36px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "#C4922A",
        }}
        className="hidden md:flex"
        aria-label="Previous review"
      >
        ←
      </button>
      <button
        onClick={() => { setDirection(1); setCurrent((c) => (c + 1) % reviews.length); }}
        style={{
          position: "absolute",
          right: "-48px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "none",
          border: "1px solid rgba(196,146,42,0.4)",
          borderRadius: "50%",
          width: "36px",
          height: "36px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "#C4922A",
        }}
        className="hidden md:flex"
        aria-label="Next review"
      >
        →
      </button>
    </div>
  );
}
