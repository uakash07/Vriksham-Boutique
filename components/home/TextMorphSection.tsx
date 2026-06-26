"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import OGLBackground from "./OGLBackground";

gsap.registerPlugin(ScrollTrigger);

const WORDS = [
  { text: "ROOTED",      big: true },
  { text: "IN",          big: false },
  { text: "TRADITION,",  big: true },
  { text: "WOVEN",       big: true },
  { text: "WITH",        big: false },
  { text: "LOVE",        big: true },
];

export default function TextMorphSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef   = useRef<(HTMLSpanElement | null)[]>([]);
  const lineRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = wordsRef.current.filter(Boolean) as HTMLSpanElement[];

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        }
      });

      words.forEach((w, i) => {
        tl.to(w, { color: "#ffffff", duration: 0.3 }, i * 0.18);
      });

      tl.fromTo(lineRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 1.2, ease: "none" },
        0
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{
      position: "relative", height: "100vh",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      overflow: "hidden",
    }}>
      <OGLBackground />

      {/* Faint background label */}
      <p style={{
        position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)",
        fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600,
        letterSpacing: "0.4em", color: "rgba(196,146,42,0.35)", textTransform: "uppercase",
        zIndex: 2, whiteSpace: "nowrap",
      }}>Our Story</p>

      <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 5vw", maxWidth: 900 }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0 20px", rowGap: 8 }}>
          {WORDS.map((w, i) => (
            <span
              key={i}
              ref={el => { wordsRef.current[i] = el; }}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: w.big ? "clamp(36px, 6vw, 80px)" : "clamp(24px, 3.5vw, 48px)",
                fontWeight: w.big ? 700 : 400,
                fontStyle: w.big ? "normal" : "italic",
                color: "#2a2a2a",
                willChange: "color",
                transition: "none",
                lineHeight: 1.1,
              }}
            >
              {w.text}
            </span>
          ))}
        </div>

        {/* Growing gold line */}
        <div style={{ marginTop: 40, height: 1, background: "transparent", overflow: "hidden" }}>
          <div ref={lineRef} style={{
            height: "100%", background: "#C4922A",
            width: "100%", transform: "scaleX(0)", transformOrigin: "left",
          }} />
        </div>

        <p style={{
          marginTop: 24,
          fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 400,
          color: "rgba(255,255,255,0.3)", letterSpacing: "0.2em", textTransform: "uppercase",
        }}>
          Rooted in Chennai. Blooming across India.
        </p>
      </div>
    </section>
  );
}
