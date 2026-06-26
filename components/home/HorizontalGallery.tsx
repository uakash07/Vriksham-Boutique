"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WA = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919944136595";

const PANELS = [
  { name: "Kanjivaram Silk",    material: "Pure Silk",    price: "₹4,999", from: "#7B0D1E", to: "#C4922A",  tag: "BRIDAL" },
  { name: "Banarasi Brocade",   material: "Silk Brocade", price: "₹5,499", from: "#0D1B4B", to: "#9CA3AF",  tag: "WEDDING" },
  { name: "Chanderi Cotton",    material: "Cotton Silk",  price: "₹1,899", from: "#134E10", to: "#B45309",  tag: "CASUAL" },
  { name: "Organza Elegance",   material: "Pure Organza", price: "₹2,499", from: "#831843", to: "#F59E0B",  tag: "PARTY" },
  { name: "Tussar Heritage",    material: "Tussar Silk",  price: "₹3,299", from: "#78350F", to: "#DC2626",  tag: "FESTIVAL" },
  { name: "Linen Summer",       material: "Pure Linen",   price: "₹1,299", from: "#1F2937", to: "#6EE7B7",  tag: "EVERYDAY" },
  { name: "Mysore Silk",        material: "Mysore Silk",  price: "₹3,799", from: "#134E4A", to: "#C4922A",  tag: "FESTIVE" },
  { name: "Maheshwari Weave",   material: "Silk Cotton",  price: "₹2,199", from: "#7C3AED", to: "#B45309",  tag: "OCCASIONS" },
];

function PaisleySVGFrame() {
  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.18, pointerEvents: "none" }}
      viewBox="0 0 400 600" preserveAspectRatio="none">
      <defs>
        <style>{`
          .pf { fill: none; stroke: #C4922A; stroke-width: 1; }
        `}</style>
      </defs>
      {/* Corner ornaments */}
      <path className="pf" d="M20,20 Q50,20 50,50 Q50,20 80,20" />
      <path className="pf" d="M20,20 Q20,50 50,50 Q20,50 20,80" />
      <circle className="pf" cx="20" cy="20" r="5" />
      <path className="pf" d="M380,20 Q350,20 350,50 Q350,20 320,20" />
      <path className="pf" d="M380,20 Q380,50 350,50 Q380,50 380,80" />
      <circle className="pf" cx="380" cy="20" r="5" />
      <path className="pf" d="M20,580 Q50,580 50,550 Q50,580 80,580" />
      <path className="pf" d="M20,580 Q20,550 50,550 Q20,550 20,520" />
      <circle className="pf" cx="20" cy="580" r="5" />
      <path className="pf" d="M380,580 Q350,580 350,550 Q350,580 320,580" />
      <path className="pf" d="M380,580 Q380,550 350,550 Q380,550 380,520" />
      <circle className="pf" cx="380" cy="580" r="5" />
      {/* Border */}
      <rect x="16" y="16" width="368" height="568" rx="2" className="pf" strokeDasharray="6 4" />
      <rect x="24" y="24" width="352" height="552" rx="1" className="pf" opacity="0.5" />
      {/* Centre lotus */}
      <g transform="translate(200,300)">
        <path className="pf" d="M0,-24 C8,-14 14,-6 0,0 C-14,-6 -8,-14 0,-24Z" />
        <path className="pf" d="M-24,0 C-14,-8 -6,-14 0,0 C-6,14 -14,8 -24,0Z" />
        <path className="pf" d="M0,24 C-8,14 -14,6 0,0 C14,6 8,14 0,24Z" />
        <path className="pf" d="M24,0 C14,8 6,14 0,0 C6,-14 14,-8 24,0Z" />
        <circle className="pf" cx="0" cy="0" r="6" />
      </g>
    </svg>
  );
}

export default function HorizontalGallery() {
  const outerRef    = useRef<HTMLDivElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);
  const counterRef  = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".h-panel");

      gsap.to(trackRef.current, {
        x: () => -(trackRef.current!.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: outerRef.current,
          start: "top top",
          end: () => `+=${trackRef.current!.scrollWidth - window.innerWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            const idx = Math.round(self.progress * (PANELS.length - 1));
            setActive(idx);
          },
        },
      });

      // Parallax on text inside each panel
      panels.forEach(panel => {
        const inner = panel.querySelector(".panel-text") as HTMLElement;
        if (!inner) return;
        gsap.fromTo(inner,
          { x: 60 },
          { x: -60,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: ScrollTrigger.getById("hscroll"),
              start: "left right",
              end: "right left",
              scrub: true,
            }
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  const buildWA = (name: string) =>
    `https://wa.me/${WA}?text=${encodeURIComponent(`Hi Vriksham Boutique! 👋 I'm interested in the *${name}* saree. Could you share more details and availability? 🌿`)}`;

  return (
    <div ref={outerRef} style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      <div ref={trackRef} style={{
        display: "flex", willChange: "transform",
        height: "100vh", width: `${PANELS.length * 100}vw`,
      }}>
        {PANELS.map((p, i) => (
          <div key={i} className="h-panel" data-cursor="view" style={{
            position: "relative",
            width: "100vw", height: "100vh", flexShrink: 0,
            background: `linear-gradient(135deg, ${p.from} 0%, ${p.to} 100%)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            overflow: "hidden",
          }}>
            <PaisleySVGFrame />

            {/* Animated silk sheen overlay */}
            <div style={{
              position: "absolute", inset: 0, opacity: 0.07,
              backgroundImage: `repeating-linear-gradient(
                105deg,
                rgba(255,255,255,0) 0px,
                rgba(255,255,255,0.6) 1px,
                rgba(255,255,255,0) 2px,
                rgba(255,255,255,0) 8px
              )`,
              animation: `silkSheen 4s linear ${i * 0.5}s infinite`,
            }} />

            <div className="panel-text" style={{
              position: "relative", zIndex: 4, textAlign: "center",
              padding: "0 40px", willChange: "transform",
            }}>
              <p style={{
                fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 700,
                letterSpacing: "0.4em", color: "rgba(255,255,255,0.5)",
                textTransform: "uppercase", marginBottom: 16,
              }}>{p.tag}</p>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(42px, 7vw, 96px)",
                fontWeight: 700, color: "#fff",
                margin: "0 0 8px", lineHeight: 1,
                textShadow: "0 2px 40px rgba(0,0,0,0.4)",
              }}>{p.name}</h2>
              <p style={{
                fontFamily: "'Inter', sans-serif", fontSize: 14, fontStyle: "italic",
                color: "rgba(255,255,255,0.6)", marginBottom: 6,
              }}>{p.material}</p>
              <p style={{
                fontFamily: "'Playfair Display', serif", fontSize: 28,
                color: "#C4922A", fontWeight: 600, marginBottom: 32,
              }}>{p.price}</p>
              <a href={buildWA(p.name)} target="_blank" rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700,
                  letterSpacing: "0.2em", textTransform: "uppercase",
                  padding: "14px 36px", background: "rgba(255,255,255,0.12)",
                  color: "#fff", border: "1px solid rgba(255,255,255,0.3)",
                  borderRadius: 2, backdropFilter: "blur(8px)",
                  transition: "background 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(196,146,42,0.4)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}>
                Enquire on WhatsApp
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Panel counter */}
      <div style={{
        position: "absolute", bottom: 32, right: 40, zIndex: 20,
        fontFamily: "'Inter', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.5)",
        letterSpacing: "0.1em",
      }}>
        <span ref={counterRef} style={{ color: "#C4922A", fontWeight: 700 }}>
          {String(active + 1).padStart(2, "0")}
        </span>
        {" / "}{String(PANELS.length).padStart(2, "0")}
      </div>

      <style>{`
        @keyframes silkSheen {
          0%   { background-position: 0% 0%; }
          100% { background-position: 200% 0%; }
        }
      `}</style>
    </div>
  );
}
