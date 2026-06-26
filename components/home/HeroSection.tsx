"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import OGLBackground from "./OGLBackground";

gsap.registerPlugin(ScrollTrigger);

const WA_NUM = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919944136595";
const WA_MSG = encodeURIComponent("Hi Vriksham Boutique! 👋 I visited your website and I'm interested in exploring your saree collection. Could you please help me find the right one? 🌿");

export default function HeroSection() {
  const sectionRef   = useRef<HTMLElement>(null);
  const badgeRef     = useRef<HTMLDivElement>(null);
  const line1Ref     = useRef<HTMLDivElement>(null);
  const line2Ref     = useRef<HTMLDivElement>(null);
  const line3Ref     = useRef<HTMLDivElement>(null);
  const btnRef       = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLCanvasElement>(null);

  /* ── Firefly particles on canvas ── */
  useEffect(() => {
    const cv = particlesRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d")!;
    const resize = () => { cv.width = cv.offsetWidth; cv.height = cv.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    type P = { x: number; y: number; vy: number; vx: number; size: number; opacity: number; phase: number };
    const pts: P[] = Array.from({ length: 120 }, () => ({
      x: Math.random() * cv.width,
      y: Math.random() * cv.height,
      vy: -(0.2 + Math.random() * 0.5),
      vx: (Math.random() - 0.5) * 0.3,
      size: 1 + Math.random() * 2.5,
      opacity: 0.3 + Math.random() * 0.7,
      phase: Math.random() * Math.PI * 2,
    }));

    let raf = 0;
    const loop = (t: number) => {
      ctx.clearRect(0, 0, cv.width, cv.height);
      pts.forEach(p => {
        p.y += p.vy;
        p.x += p.vx;
        p.phase += 0.02;
        const glow = p.opacity * (0.5 + 0.5 * Math.sin(p.phase));
        if (p.y < -10) { p.y = cv.height + 10; p.x = Math.random() * cv.width; }
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        g.addColorStop(0, `rgba(196,146,42,${glow})`);
        g.addColorStop(1, "rgba(196,146,42,0)");
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  /* ── GSAP: text reveals on mount (after loading screen) ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const textTl = gsap.timeline({ delay: 3.0 }); // waits for loading screen (2.5s slide + 0.5s buffer)
      textTl
        .fromTo(badgeRef.current,  { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" })
        .fromTo(line1Ref.current,  { clipPath: "inset(0 0 100% 0)", y: 30 }, { clipPath: "inset(0 0 0% 0)", y: 0, duration: 0.8, ease: "power3.out" }, "-=0.2")
        .fromTo(line2Ref.current,  { clipPath: "inset(0 0 100% 0)", y: 30 }, { clipPath: "inset(0 0 0% 0)", y: 0, duration: 0.7, ease: "power3.out" }, "-=0.5")
        .fromTo(line3Ref.current,  { clipPath: "inset(0 0 100% 0)", y: 20 }, { clipPath: "inset(0 0 0% 0)", y: 0, duration: 0.5, ease: "power3.out" }, "-=0.35")
        .fromTo(btnRef.current,    { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.2");
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{
      position: "relative", minHeight: "100vh", overflow: "hidden",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      paddingTop: 80, /* clear the fixed navbar */
    }}>
      {/* WebGL background */}
      <OGLBackground />

      {/* Firefly canvas */}
      <canvas ref={particlesRef} style={{
        position: "absolute", inset: 0, width: "100%", height: "100%",
        pointerEvents: "none", zIndex: 2,
      }} />

      {/* ── Centered text block ── */}
      <div style={{
        position: "relative", zIndex: 10,
        textAlign: "center", width: "min(92vw, 860px)",
        display: "flex", flexDirection: "column", alignItems: "center",
      }}>
        {/* Badge */}
        <div ref={badgeRef} style={{
          fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 600,
          letterSpacing: "0.35em", color: "#C4922A", textTransform: "uppercase",
          opacity: 0, marginBottom: 32, whiteSpace: "nowrap",
        }}>
          Chennai &nbsp;·&nbsp; Est. 2024
        </div>

        {/* HANDPICKED */}
        <div ref={line1Ref} style={{ overflow: "hidden", marginBottom: 4, width: "100%" }}>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(60px, 10vw, 130px)",
            fontWeight: 700, color: "#fff", lineHeight: 1,
            letterSpacing: "-0.02em", margin: 0,
          }}>HANDPICKED</h1>
        </div>

        {/* Sarees */}
        <div ref={line2Ref} style={{ overflow: "hidden", marginBottom: 12, width: "100%" }}>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(32px, 6vw, 80px)",
            fontStyle: "italic", color: "#C4922A",
            fontWeight: 400, margin: 0, lineHeight: 1,
          }}>Sarees</p>
        </div>

        {/* for every occasion */}
        <div ref={line3Ref} style={{ overflow: "hidden", marginBottom: 48, width: "100%" }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(11px, 1.3vw, 14px)",
            fontWeight: 500, color: "rgba(255,255,255,0.5)",
            letterSpacing: "0.3em", textTransform: "uppercase", margin: 0,
          }}>for every occasion</p>
        </div>

        {/* Buttons */}
        <div ref={btnRef} style={{
          display: "flex", gap: 16, justifyContent: "center",
          opacity: 0, flexWrap: "wrap",
        }}>
          <Link href="/catalog" style={{
            fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700,
            letterSpacing: "0.2em", textTransform: "uppercase",
            padding: "14px 36px", background: "#C4922A", color: "#000",
            borderRadius: 2, transition: "background 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget.style.background = "#fff")}
            onMouseLeave={e => (e.currentTarget.style.background = "#C4922A")}>
            Explore Collection
          </Link>
          <a href={`https://wa.me/${WA_NUM}?text=${WA_MSG}`} target="_blank" rel="noopener noreferrer"
            style={{
              fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700,
              letterSpacing: "0.2em", textTransform: "uppercase",
              padding: "14px 36px", background: "transparent", color: "#fff",
              border: "1px solid rgba(255,255,255,0.3)", borderRadius: 2,
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#C4922A"; (e.currentTarget as HTMLElement).style.color = "#C4922A"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.3)"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}>
            WhatsApp Us
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8, zIndex: 10,
        animation: "fadeUpDown 2s ease-in-out 4s both infinite",
      }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, letterSpacing: "0.3em",
          color: "rgba(255,255,255,0.35)", textTransform: "uppercase" }}>Scroll</span>
        <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, rgba(196,146,42,0.7), transparent)" }} />
      </div>

      <style>{`
        @keyframes fadeUpDown {
          0%,100% { opacity: 0.4; transform: translateX(-50%) translateY(0); }
          50%      { opacity: 1;   transform: translateX(-50%) translateY(6px); }
        }
      `}</style>
    </section>
  );
}
