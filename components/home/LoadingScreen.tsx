"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface Props { onComplete: () => void }

export default function LoadingScreen({ onComplete }: Props) {
  const leftRef  = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const wrapRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap  = wrapRef.current;
    const left  = leftRef.current;
    const right = rightRef.current;
    if (!wrap || !left || !right) return;

    const letters = lettersRef.current.filter(Boolean) as HTMLSpanElement[];
    const tl = gsap.timeline();

    tl.fromTo(letters,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, stagger: 0.07, duration: 0.38, ease: "power3.out" },
      0.9
    )
    .to([left, right], {
      x: (i: number) => (i === 0 ? "-100%" : "100%"),
      duration: 0.8,
      ease: "power4.inOut",
      onComplete: () => {
        /* Forcibly hide after panels slide off */
        wrap.style.display       = "none";
        wrap.style.pointerEvents = "none";
        wrap.style.zIndex        = "-1";
        document.body.style.overflow = "auto";
        onComplete();
      },
    }, 2.5);

    return () => { tl.kill(); };
  }, [onComplete]);

  const BRAND = "VRIKSHAM BOUTIQUE";

  return (
    <div ref={wrapRef} style={{ position: "fixed", inset: 0, zIndex: 9999, overflow: "hidden", willChange: "display" }}>
      {/* Left panel */}
      <div ref={leftRef} style={{
        position: "absolute", top: 0, left: 0, width: "50%", height: "100%", background: "#000"
      }} />
      {/* Right panel */}
      <div ref={rightRef} style={{
        position: "absolute", top: 0, right: 0, width: "50%", height: "100%", background: "#000"
      }} />

      {/* Center content sits above both panels */}
      <div style={{
        position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", zIndex: 10, pointerEvents: "none"
      }}>
        <TreeSVG />
        <div style={{ marginTop: 28, display: "flex", gap: 0, letterSpacing: "0.25em" }}>
          {BRAND.split("").map((ch, i) => (
            <span
              key={i}
              ref={el => { lettersRef.current[i] = el; }}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: ch === " " ? 0 : 13,
                color: "#C4922A",
                opacity: 0,
                display: "inline-block",
                minWidth: ch === " " ? "0.6em" : undefined,
              }}
            >{ch}</span>
          ))}
        </div>
        <div style={{
          marginTop: 16, width: 1, background: "#C4922A",
          animation: "growLine 2s ease-out 0.2s forwards",
          height: 0,
        }} />
      </div>

      <style>{`
        @keyframes draw { to { stroke-dashoffset: 0; } }
        @keyframes popIn { to { opacity: 0.9; transform: scale(1); } }
        @keyframes growLine { to { height: 32px; } }
      `}</style>
    </div>
  );
}

function TreeSVG() {
  const dur = (d: number, delay: number) => ({
    strokeDasharray: d,
    strokeDashoffset: d,
    animation: `draw ${d * 0.012}s ${delay}s ease-out forwards`,
  } as React.CSSProperties);

  return (
    <svg width="140" height="170" viewBox="0 0 140 170" fill="none">
      {/* Trunk */}
      <path d="M70 165 C68 148 65 130 67 112 C69 94 71 86 70 68"
        stroke="#C4922A" strokeWidth="3.5" strokeLinecap="round" style={dur(120, 0.05)} />
      {/* Root left */}
      <path d="M70 155 C60 158 48 157 38 160"
        stroke="#C4922A" strokeWidth="2" strokeLinecap="round" style={dur(38, 0.3)} />
      {/* Root right */}
      <path d="M70 155 C80 158 92 157 102 160"
        stroke="#C4922A" strokeWidth="2" strokeLinecap="round" style={dur(38, 0.3)} />
      {/* Branch left main */}
      <path d="M70 68 C58 58 40 52 22 46"
        stroke="#C4922A" strokeWidth="2.2" strokeLinecap="round" style={dur(58, 0.55)} />
      {/* Branch right main */}
      <path d="M70 68 C82 58 100 52 118 46"
        stroke="#C4922A" strokeWidth="2.2" strokeLinecap="round" style={dur(58, 0.55)} />
      {/* Branch center up */}
      <path d="M70 68 C70 52 70 38 70 22"
        stroke="#C4922A" strokeWidth="1.8" strokeLinecap="round" style={dur(48, 0.6)} />
      {/* Left sub-branch top */}
      <path d="M22 46 C14 36 8 24 4 12"
        stroke="#C4922A" strokeWidth="1.5" strokeLinecap="round" style={dur(44, 0.9)} />
      {/* Left sub-branch bottom */}
      <path d="M22 46 C18 35 22 24 26 14"
        stroke="#C4922A" strokeWidth="1.5" strokeLinecap="round" style={dur(38, 0.9)} />
      {/* Right sub-branch top */}
      <path d="M118 46 C126 36 132 24 136 12"
        stroke="#C4922A" strokeWidth="1.5" strokeLinecap="round" style={dur(44, 0.9)} />
      {/* Right sub-branch bottom */}
      <path d="M118 46 C122 35 118 24 114 14"
        stroke="#C4922A" strokeWidth="1.5" strokeLinecap="round" style={dur(38, 0.9)} />
      {/* Center sub left */}
      <path d="M70 38 C62 28 56 20 50 10"
        stroke="#C4922A" strokeWidth="1.2" strokeLinecap="round" style={dur(34, 1.0)} />
      {/* Center sub right */}
      <path d="M70 38 C78 28 84 20 90 10"
        stroke="#C4922A" strokeWidth="1.2" strokeLinecap="round" style={dur(34, 1.0)} />

      {/* Leaf clusters — circles */}
      {[
        [4, 8, 7], [26, 10, 5], [136, 8, 7], [114, 10, 5],
        [70, 16, 6], [50, 6, 5], [90, 6, 5],
      ].map(([cx, cy, r], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="#C4922A"
          style={{ opacity: 0, transform: "scale(0.5)", transformOrigin: `${cx}px ${cy}px`,
            animation: `popIn 0.4s ${1.1 + i * 0.06}s ease-out forwards` } as React.CSSProperties} />
      ))}
    </svg>
  );
}
