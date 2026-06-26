"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WA = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919944136595";
const WA_MSG = encodeURIComponent("Hi Vriksham Boutique! 👋 I couldn't find what I was looking for. Could you help me find the perfect saree? 🌿 Please share your latest collection.");

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const shopRef    = useRef<HTMLDivElement>(null);
  const theRef     = useRef<HTMLDivElement>(null);
  const collRef    = useRef<HTMLDivElement>(null);
  const subRef     = useRef<HTMLDivElement>(null);
  const btnsRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse",
        }
      });

      tl.fromTo(shopRef.current, { x: -120, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9, ease: "power3.out" })
        .fromTo(theRef.current,  { y: -60,  opacity: 0 }, { y: 0,  opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.5")
        .fromTo(collRef.current, { x: 120,  opacity: 0 }, { x: 0,  opacity: 1, duration: 0.9, ease: "power3.out" }, "-=0.6")
        .fromTo(subRef.current,  { opacity: 0, y: 20 },   { opacity: 1, y: 0, duration: 0.5 }, "-=0.2")
        .fromTo(btnsRef.current, { opacity: 0, y: 20 },   { opacity: 1, y: 0, duration: 0.5 }, "-=0.2");
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{
      position: "relative", minHeight: "100vh",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      overflow: "hidden", padding: "80px 24px",
      background: "#000",
    }}>
      {/* Slow breathing gradient */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        background: "radial-gradient(ellipse 70% 60% at 50% 50%, #0D1F0F 0%, #000 100%)",
        animation: "breathe 8s ease-in-out infinite",
      }} />

      {/* Gold top accent line */}
      <div style={{
        position: "absolute", top: 0, left: "10%", right: "10%",
        height: 1, background: "linear-gradient(90deg, transparent, #C4922A, transparent)",
      }} />

      <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
        {/* Floating "THE" */}
        <div ref={theRef} style={{ opacity: 0, marginBottom: -8 }}>
          <span style={{
            fontFamily: "'Inter', sans-serif", fontSize: "clamp(16px, 2.5vw, 28px)",
            fontWeight: 600, letterSpacing: "0.5em", textTransform: "uppercase",
            color: "#C4922A",
          }}>THE</span>
        </div>

        {/* SHOP + COLLECTION row */}
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center",
          gap: "0.2em", flexWrap: "wrap", lineHeight: 0.95 }}>
          <div ref={shopRef} style={{ opacity: 0 }}>
            <span style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(64px, 14vw, 180px)",
              fontWeight: 700, color: "#fff", lineHeight: 0.9,
            }}>SHOP</span>
          </div>
          <div ref={collRef} style={{ opacity: 0 }}>
            <span style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(64px, 14vw, 180px)",
              fontWeight: 700,
              WebkitTextStroke: "1px rgba(255,255,255,0.25)",
              color: "transparent",
              lineHeight: 0.9,
            }}>COLLECTION</span>
          </div>
        </div>

        {/* Subtext */}
        <div ref={subRef} style={{ opacity: 0, marginTop: 32, marginBottom: 48 }}>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.4)",
            letterSpacing: "0.1em", margin: 0,
          }}>100+ handpicked sarees. Straight to your door.</p>
        </div>

        {/* Buttons */}
        <div ref={btnsRef} style={{
          display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", opacity: 0,
        }}>
          <Link href="/catalog" style={{
            fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 700,
            letterSpacing: "0.2em", textTransform: "uppercase",
            padding: "16px 44px", background: "#C4922A", color: "#000",
            borderRadius: 2, transition: "all 0.2s",
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#fff"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#C4922A"; }}>
            Browse All Sarees
          </Link>
          <a href={`https://wa.me/${WA}?text=${WA_MSG}`} target="_blank" rel="noopener noreferrer"
            style={{
              fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 700,
              letterSpacing: "0.2em", textTransform: "uppercase",
              padding: "16px 44px", background: "transparent", color: "#fff",
              border: "1px solid rgba(255,255,255,0.25)", borderRadius: 2,
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#C4922A"; (e.currentTarget as HTMLElement).style.color = "#C4922A"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.25)"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}>
            Chat on WhatsApp
          </a>
        </div>
      </div>

      {/* Bottom accent line */}
      <div style={{
        position: "absolute", bottom: 0, left: "10%", right: "10%",
        height: 1, background: "linear-gradient(90deg, transparent, #C4922A, transparent)",
      }} />

      <style>{`
        @keyframes breathe {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.7; }
        }
      `}</style>
    </section>
  );
}
