"use client";

const REVIEWS = [
  { name: "Priya Venkatesh",  saree: "Kanjivaram Silk",  text: "The Kanjivaram silk I ordered was absolutely stunning. Perfect for my daughter's wedding! The quality exceeded every expectation." },
  { name: "Lakshmi Rajan",    saree: "Chanderi Cotton",  text: "Chanderi cotton saree — so lightweight and beautiful. Vriksham truly has the best collection in Chennai!" },
  { name: "Meena Krishnan",   saree: "Banarasi Brocade", text: "Ordered the Banarasi brocade — arrived swiftly, quality exceeded every expectation. Will definitely order again!" },
  { name: "Divya Suresh",     saree: "Organza Elegance", text: "My go-to boutique for festival sarees. The Organza was breathtaking — every woman complimented me!" },
  { name: "Anitha Murugan",   saree: "Tussar Silk",      text: "Tussar silk saree for my anniversary — husband was speechless. Thank you Vriksham for making it so special!" },
  { name: "Kavitha Balaji",   saree: "Mysore Silk",      text: "Best customer service and the Mysore silk was exactly as described. Colours are rich and fabric is divine." },
];

function Stars() {
  return (
    <div style={{ display: "flex", gap: 3, marginBottom: 14 }}>
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#C4922A">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

function Card({ r }: { r: typeof REVIEWS[0] }) {
  return (
    <div style={{
      flexShrink: 0, width: 320, background: "#111",
      border: "1px solid #222", borderRadius: 4, padding: "28px 28px",
      margin: "0 8px",
    }}>
      <Stars />
      <p style={{
        fontFamily: "'Playfair Display', serif", fontSize: 14, fontStyle: "italic",
        color: "#ccc", lineHeight: 1.7, marginBottom: 20,
      }}>"{r.text}"</p>
      <div>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600, color: "#fff" }}>{r.name}</p>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: "#C4922A", letterSpacing: "0.1em" }}>{r.saree}</p>
      </div>
    </div>
  );
}

function Track({ dir, delay }: { dir: "left" | "right"; delay: number }) {
  const items = [...REVIEWS, ...REVIEWS];
  return (
    <div style={{ overflow: "hidden", marginBottom: 12 }}>
      <div style={{
        display: "flex",
        animation: `marquee${dir === "left" ? "L" : "R"} 40s linear ${delay}s infinite`,
        width: "max-content",
      }}>
        {items.map((r, i) => <Card key={i} r={r} />)}
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section style={{ background: "#080808", padding: "100px 0", overflow: "hidden" }}>
      <div style={{ textAlign: "center", marginBottom: 56, padding: "0 24px" }}>
        <p style={{
          fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 700,
          letterSpacing: "0.35em", color: "#C4922A", textTransform: "uppercase", marginBottom: 14,
        }}>What Our Customers Say</p>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(28px, 5vw, 56px)",
          fontWeight: 700, color: "#fff", margin: 0,
        }}>Loved Across India</h2>
      </div>

      <Track dir="left"  delay={0} />
      <Track dir="right" delay={-20} />

      <style>{`
        @keyframes marqueeL {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeR {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
