"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 100, suffix: "+", label: "Sarees" },
  { value: 5,   suffix: "★", label: "Rating" },
  { value: 28,  suffix: "+", label: "States Delivered" },
];

function Counter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started || !ref.current) return;
    gsap.fromTo(ref.current, { textContent: 0 }, {
      textContent: value, duration: 1.8, ease: "power2.out", snap: { textContent: 1 },
      onUpdate() { if (ref.current) ref.current.textContent = Math.ceil(parseFloat(ref.current.textContent || "0")).toString(); }
    });
  }, [started, value]);

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(36px, 5vw, 60px)",
        fontWeight: 700, color: "#1a1a1a", lineHeight: 1,
      }}>
        <span ref={ref}>0</span>{suffix}
      </div>
      <p style={{
        fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600,
        letterSpacing: "0.2em", color: "#888", textTransform: "uppercase", marginTop: 6,
      }}>{label}</p>
      <div style={{
        width: 24, height: 2, background: "#C4922A", margin: "10px auto 0",
        display: "none",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...(undefined as any),
      }}
        ref={el => {
          if (!el) return;
          ScrollTrigger.create({
            trigger: el,
            start: "top 85%",
            onEnter: () => setStarted(true),
            once: true,
          });
        }}
      />
    </div>
  );
}

export default function BrandStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const linesRef   = useRef<(HTMLDivElement | null)[]>([]);
  const statsRef   = useRef<HTMLDivElement>(null);
  const imgRef     = useRef<HTMLDivElement>(null);

  const LINES = [
    "Rooted in Chennai.",
    "Blooming across India.",
    "Every saree, handpicked with love.",
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text lines clip up
      linesRef.current.filter(Boolean).forEach((el, i) => {
        gsap.fromTo(el,
          { clipPath: "inset(0 0 100% 0)", y: 24, opacity: 0 },
          {
            clipPath: "inset(0 0 0% 0)", y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 82%", toggleActions: "play none none reverse" },
            delay: i * 0.12,
          }
        );
      });

      // Stats fade up
      gsap.fromTo(statsRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: statsRef.current, start: "top 82%", toggleActions: "play none none reverse" }
        }
      );

      /* Logo is visible by default — just add a subtle entrance */
      gsap.fromTo(imgRef.current,
        { opacity: 0, scale: 0.88 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      minHeight: "100vh",
      overflow: "hidden",
    }}>
      {/* LEFT — dark green with spinning logo */}
      <div style={{
        background: "#0A1F0A", display: "flex", alignItems: "center",
        justifyContent: "center", position: "relative", overflow: "hidden",
      }}>
        {/* Golden radial glow */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(circle at center, rgba(196,146,42,0.18) 0%, rgba(196,146,42,0.04) 45%, transparent 70%)",
        }} />
        {/* Outer decorative ring */}
        <div style={{
          position: "absolute", width: 340, height: 340, borderRadius: "50%",
          border: "1px solid rgba(196,146,42,0.12)",
          animation: "ringPulse 4s ease-in-out infinite",
        }} />
        <div ref={imgRef} style={{ opacity: 0, position: "relative", zIndex: 2 }}>
          <div style={{ animation: "gentleRock 6s ease-in-out infinite" }}>
            <Image src="/vriksham-logo.jpg" alt="Vriksham" width={240} height={296}
              style={{
                objectFit: "contain",
                /* invert + hue-rotate: dark tree → warm golden, white bg → near-black */
                filter: "invert(1) hue-rotate(200deg) saturate(2.5) brightness(1.05)",
                dropShadow: "0 0 40px rgba(196,146,42,0.3)",
              }} />
          </div>
        </div>
        <p style={{
          position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)",
          fontFamily: "'Inter', sans-serif", fontSize: 9, fontWeight: 600,
          letterSpacing: "0.35em", color: "rgba(196,146,42,0.4)", textTransform: "uppercase",
          whiteSpace: "nowrap",
        }}>@vriksham_.boutique</p>
      </div>

      {/* RIGHT — cream with text */}
      <div style={{
        background: "#F5F0E8", display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "80px 60px",
      }}>
        <p style={{
          fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 700,
          letterSpacing: "0.35em", color: "#C4922A", textTransform: "uppercase", marginBottom: 32,
        }}>Our Story</p>

        {LINES.map((line, i) => (
          <div key={i}
            ref={el => { linesRef.current[i] = el; }}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: i === 0 ? "clamp(28px, 3.8vw, 48px)" : i === 1 ? "clamp(24px, 3.2vw, 40px)" : "clamp(18px, 2.2vw, 28px)",
              fontWeight: i === 2 ? 400 : 600,
              fontStyle: i === 1 ? "italic" : "normal",
              color: "#1a1a1a",
              lineHeight: 1.3,
              marginBottom: i === 2 ? 48 : 12,
              opacity: 0,
            }}>
            {line}
          </div>
        ))}

        <div ref={statsRef} style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24,
          paddingTop: 40, borderTop: "1px solid #d6cfc3", opacity: 0,
        }}>
          {STATS.map(s => <Counter key={s.label} {...s} />)}
        </div>
      </div>

      <style>{`
        @keyframes gentleRock {
          0%, 100% { transform: rotate(-2deg) scale(1); }
          50%       { transform: rotate(2deg) scale(1.03); }
        }
        @keyframes ringPulse {
          0%, 100% { transform: scale(1);    opacity: 0.6; }
          50%       { transform: scale(1.06); opacity: 1;   }
        }
      `}</style>
    </section>
  );
}
