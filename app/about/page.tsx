"use client";

import { motion } from "framer-motion";

const VALUES = [
  {
    icon: "🌿",
    title: "Quality",
    desc: "Every saree is personally inspected for weave integrity, colour fastness, and fabric quality before it reaches you.",
  },
  {
    icon: "🏺",
    title: "Authenticity",
    desc: "We source directly from master weavers across India — from Banaras to Kanchipuram — preserving centuries-old craft.",
  },
  {
    icon: "✨",
    title: "Elegance",
    desc: "We believe every woman deserves to feel radiant. Our curation balances tradition with timeless modern appeal.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: "easeOut" },
  }),
};

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: "#F5F0E8" }}>
      {/* Hero */}
      <section
        style={{
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 24px",
          background: "linear-gradient(180deg, #EDE5D5 0%, #F5F0E8 100%)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Animated growing tree SVG */}
        <motion.svg
          width="140"
          height="180"
          viewBox="0 0 160 200"
          xmlns="http://www.w3.org/2000/svg"
          initial={{ opacity: 0, scale: 0.3 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: "32px" }}
        >
          <circle cx="80" cy="178" r="5" fill="#6B4C35" />
          <rect x="74" y="115" width="12" height="63" rx="6" fill="#6B4C35" />
          <ellipse cx="55" cy="125" rx="18" ry="14" fill="#5A9E32" opacity="0.85" />
          <ellipse cx="105" cy="120" rx="16" ry="13" fill="#4A8E28" opacity="0.85" />
          <ellipse cx="57" cy="98" rx="22" ry="18" fill="#6DB33F" opacity="0.9" />
          <ellipse cx="103" cy="95" rx="20" ry="16" fill="#5DA82F" opacity="0.9" />
          <ellipse cx="80" cy="90" rx="26" ry="20" fill="#7DC44F" opacity="0.95" />
          <ellipse cx="62" cy="65" rx="22" ry="18" fill="#6DB33F" />
          <ellipse cx="98" cy="62" rx="20" ry="17" fill="#5DA82F" />
          <ellipse cx="80" cy="58" rx="28" ry="22" fill="#7DC44F" />
          <ellipse cx="80" cy="36" rx="23" ry="18" fill="#8ED458" />
          <ellipse cx="80" cy="22" rx="16" ry="13" fill="#9EE468" />
          <circle cx="80" cy="14" r="4" fill="#C4922A" opacity="0.9" />
          <circle cx="62" cy="42" r="3" fill="#C4922A" opacity="0.7" />
          <circle cx="98" cy="40" r="3" fill="#C4922A" opacity="0.7" />
        </motion.svg>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 800,
            color: "#3a2d1e",
            marginBottom: "16px",
          }}
        >
          Our Story
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{
            height: "1px",
            width: "120px",
            background: "linear-gradient(90deg, transparent, #C4922A, transparent)",
            marginBottom: "32px",
          }}
        />
      </section>

      {/* Story */}
      <section style={{ maxWidth: "760px", margin: "0 auto", padding: "60px 24px" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(18px, 2.5vw, 24px)",
              fontStyle: "italic",
              color: "#C4922A",
              lineHeight: 1.6,
              marginBottom: "32px",
              textAlign: "center",
            }}
          >
            &ldquo;Vriksham — meaning &lsquo;tree&rsquo; in Sanskrit — was born from a love of handwoven textiles and a belief that every saree carries a story.&rdquo;
          </p>

          {[
            "Founded in Chennai by a family with generations of textile appreciation, Vriksham Boutique was built on one simple conviction: every woman deserves a saree that makes her feel extraordinary. Like a tree that draws strength from its roots to bloom beautifully, we draw from the rich traditions of Indian weaving to bring you sarees that are timeless.",
            "Our journey began with a collection of handpicked Kanchipuram silks and quickly grew to encompass the finest weaves from across India — Banarasi brocades from Varanasi, airy Kota cottons from Rajasthan, delicate Chanderi silks from Madhya Pradesh, and earthy Tussar from Bengal and Jharkhand.",
            "Every piece in our collection is personally chosen. We visit weavers, feel the fabric, study the weave, and only then bring it home to you. Because we believe that in a world of fast fashion, some things are worth doing slowly and with love.",
          ].map((para, i) => (
            <motion.p
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: "16px",
                lineHeight: 1.9,
                color: "#5a4030",
                marginBottom: "24px",
              }}
            >
              {para}
            </motion.p>
          ))}
        </motion.div>
      </section>

      {/* Values */}
      <section
        style={{
          backgroundColor: "#EDE5D5",
          padding: "80px 24px",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(24px, 4vw, 36px)",
              fontWeight: 700,
              color: "#3a2d1e",
              textAlign: "center",
              marginBottom: "48px",
            }}
          >
            What We Stand For
          </motion.h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "28px",
            }}
          >
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid rgba(196,146,42,0.2)",
                  borderRadius: "4px",
                  padding: "36px 28px",
                  textAlign: "center",
                  boxShadow: "0 4px 24px rgba(107,76,53,0.07)",
                }}
              >
                <div style={{ fontSize: "40px", marginBottom: "16px" }}>{v.icon}</div>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "#6B4C35",
                    marginBottom: "12px",
                  }}
                >
                  {v.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: "14px",
                    lineHeight: 1.7,
                    color: "#7a6050",
                  }}
                >
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: "80px 24px",
          textAlign: "center",
          backgroundColor: "#F5F0E8",
        }}
      >
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(22px, 3vw, 32px)",
            fontWeight: 700,
            color: "#3a2d1e",
            marginBottom: "24px",
          }}
        >
          Ready to find your perfect saree?
        </motion.h2>
        <a
          href="/catalog"
          style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #C4922A, #e8c06a, #C4922A)",
            backgroundSize: "200% auto",
            color: "#fff",
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "2px",
            textTransform: "uppercase",
            padding: "16px 40px",
            borderRadius: "2px",
            textDecoration: "none",
            boxShadow: "0 8px 30px rgba(196,146,42,0.35)",
          }}
        >
          Explore Our Collection
        </a>
      </section>
    </div>
  );
}
