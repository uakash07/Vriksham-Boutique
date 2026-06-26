"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let expandRing = false, showLabel = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };

    const onEnterBtn = () => { expandRing = true; };
    const onLeaveBtn = () => { expandRing = false; showLabel = false; };
    const onEnterCard = () => { showLabel = true; expandRing = true; };

    document.addEventListener("mousemove", onMove);

    // Wire up hover targets
    const wireHovers = () => {
      document.querySelectorAll("a, button").forEach(el => {
        el.addEventListener("mouseenter", onEnterBtn);
        el.addEventListener("mouseleave", onLeaveBtn);
      });
      document.querySelectorAll("[data-cursor='view']").forEach(el => {
        el.addEventListener("mouseenter", onEnterCard);
        el.addEventListener("mouseleave", onLeaveBtn);
      });
    };
    wireHovers();
    const observer = new MutationObserver(wireHovers);
    observer.observe(document.body, { childList: true, subtree: true });

    const LERP = 0.1;
    const loop = () => {
      rx += (mx - rx) * LERP;
      ry += (my - ry) * LERP;

      const dot  = dotRef.current;
      const ring = ringRef.current;
      const lbl  = labelRef.current;
      if (dot)  { dot.style.transform  = `translate(${mx - 6}px, ${my - 6}px)`; }
      if (ring) {
        ring.style.transform = `translate(${rx - 20}px, ${ry - 20}px) scale(${expandRing ? 2.2 : 1})`;
        ring.style.opacity = expandRing ? "0.5" : "0.7";
        ring.style.mixBlendMode = expandRing ? "normal" : "difference";
      }
      if (lbl) {
        lbl.style.transform = `translate(${mx + 14}px, ${my - 8}px)`;
        lbl.style.opacity = showLabel ? "1" : "0";
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} style={{
        position: "fixed", top: 0, left: 0, width: 12, height: 12, borderRadius: "50%",
        background: "#C4922A", pointerEvents: "none", zIndex: 99999,
        willChange: "transform", transition: "width 0.2s, height 0.2s",
      }} />
      <div ref={ringRef} style={{
        position: "fixed", top: 0, left: 0, width: 40, height: 40, borderRadius: "50%",
        border: "1.5px solid #C4922A", pointerEvents: "none", zIndex: 99998,
        willChange: "transform", transition: "transform 0.15s ease, opacity 0.2s, scale 0.25s ease",
      }} />
      <div ref={labelRef} style={{
        position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 99997,
        fontFamily: "'Inter', sans-serif", fontSize: 9, fontWeight: 700,
        letterSpacing: 2, color: "#C4922A", textTransform: "uppercase",
        opacity: 0, transition: "opacity 0.2s", willChange: "transform",
      }}>VIEW</div>
    </>
  );
}
