"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState<"grow" | "shine" | "fade">("grow");

  useEffect(() => {
    const loaded = localStorage.getItem("vb_loaded");
    if (!loaded) {
      setVisible(true);

      // Phase 1: tree grows in (0 → 1s)
      // Phase 2: golden shimmer (1s → 2s)
      // Phase 3: fade out (2s → 2.6s)
      const t1 = setTimeout(() => setPhase("shine"), 1000);
      const t2 = setTimeout(() => setPhase("fade"),  2000);
      const t3 = setTimeout(() => {
        setVisible(false);
        localStorage.setItem("vb_loaded", "1");
      }, 2700);

      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === "fade" ? 0 : 1 }}
          transition={{ duration: 0.7 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "#F5F0E8",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* Bokeh backgrounds */}
          <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(196,146,42,0.12) 0%, transparent 70%)", top: "20%", left: "30%" }} />
          <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(109,179,63,0.1) 0%, transparent 70%)", bottom: "20%", right: "25%" }} />

          {/* Tree image — grows from bottom */}
          <motion.div
            initial={{ scaleY: 0, scaleX: 0.6, opacity: 0, originY: 1 }}
            animate={{
              scaleY: phase === "grow" ? [0, 1.08, 1] : 1,
              scaleX: phase === "grow" ? [0.6, 1.04, 1] : 1,
              opacity: 1,
            }}
            transition={{
              duration: 1.0,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              transformOrigin: "50% 100%",
              position: "relative",
            }}
          >
            {/* Golden glow ring — appears during "shine" phase */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{
                opacity: phase === "shine" ? [0, 0.7, 0.4] : 0,
                scale:   phase === "shine" ? [0.7, 1.1, 1.05] : 0.7,
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{
                position: "absolute",
                inset: "-20px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(196,146,42,0.25) 30%, transparent 70%)",
                pointerEvents: "none",
                zIndex: 1,
              }}
            />

            <Image
              src="/vriksham-logo.jpg"
              alt="Vriksham Boutique"
              width={240}
              height={290}
              priority
              style={{
                objectFit: "contain",
                filter: phase === "shine"
                  ? "drop-shadow(0 0 30px rgba(196,146,42,0.6)) drop-shadow(0 0 60px rgba(196,146,42,0.3))"
                  : "drop-shadow(0 8px 24px rgba(107,76,53,0.2))",
                transition: "filter 0.5s ease",
                position: "relative",
                zIndex: 2,
              }}
            />
          </motion.div>

          {/* Brand name — fades in after tree */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: phase !== "grow" ? 1 : 0, y: phase !== "grow" ? 0 : 16 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ textAlign: "center", marginTop: "20px" }}
          >
            <div
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "22px",
                letterSpacing: "6px",
                color: "#6B4C35",
                fontWeight: 700,
              }}
            >
              VRIKSHAM BOUTIQUE
            </div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: phase !== "grow" ? "160px" : 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                height: "1px",
                background: "linear-gradient(90deg, transparent, #C4922A, transparent)",
                margin: "8px auto 0",
              }}
            />
          </motion.div>

          {/* Floating leaf particles during load */}
          {phase !== "grow" && [
            { x: "30%", delay: 0 },
            { x: "65%", delay: 0.1 },
            { x: "45%", delay: 0.2 },
            { x: "55%", delay: 0.05 },
          ].map((leaf, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 0, x: leaf.x }}
              animate={{ opacity: [0, 0.7, 0], y: -80 }}
              transition={{ duration: 1.2, delay: leaf.delay, ease: "easeOut" }}
              style={{
                position: "absolute",
                top: "45%",
                left: leaf.x,
                pointerEvents: "none",
              }}
            >
              <svg width="18" height="26" viewBox="0 0 28 40">
                <ellipse cx="14" cy="18" rx="11" ry="16" fill={i % 2 === 0 ? "#6DB33F" : "#C4922A"} opacity="0.8" />
              </svg>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
