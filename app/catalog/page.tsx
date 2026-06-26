"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { SEED_PRODUCTS } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

const MATERIALS = ["All", "Silk", "Cotton", "Linen", "Organza", "Banarasi", "Kota", "Chanderi", "Tussar Silk"];
const OCCASIONS = ["All", "Wedding", "Party Wear", "Casual", "Festival", "Office Wear"];

export default function CatalogPage() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [material, setMaterial] = useState("All");
  const [occasion, setOccasion] = useState("All");
  const [priceMax, setPriceMax] = useState(6000);
  const [sort, setSort] = useState("default");

  const filtered = useMemo(() => {
    let result = [...SEED_PRODUCTS];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q) ||
          p.occasion.toLowerCase().includes(q)
      );
    }

    if (material !== "All") result = result.filter((p) => p.material === material);
    if (occasion !== "All") result = result.filter((p) => p.occasion === occasion);
    result = result.filter((p) => p.price <= priceMax);

    if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
    else if (sort === "name") result.sort((a, b) => a.name.localeCompare(b.name));

    return result;
  }, [search, material, occasion, priceMax, sort]);

  return (
    <div style={{ backgroundColor: "#F5F0E8", minHeight: "100vh" }}>
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #6B4C35 0%, #8B6045 100%)",
          padding: "60px 24px",
          textAlign: "center",
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(28px, 5vw, 48px)",
            fontWeight: 800,
            color: "#F5F0E8",
            marginBottom: "8px",
          }}
        >
          Our Collection
        </motion.h1>
        <p style={{ color: "rgba(245,240,232,0.7)", fontStyle: "italic", fontSize: "16px" }}>
          Handpicked sarees for every chapter of your story
        </p>
      </div>

      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "40px 24px",
          display: "flex",
          gap: "32px",
          alignItems: "flex-start",
        }}
      >
        {/* Sidebar */}
        <aside
          style={{
            width: "240px",
            flexShrink: 0,
            backgroundColor: "#fff",
            borderRadius: "4px",
            padding: "28px",
            border: "1px solid rgba(196,146,42,0.2)",
            boxShadow: "0 4px 20px rgba(107,76,53,0.06)",
            position: "sticky",
            top: "80px",
          }}
          className="hidden md:block"
        >
          <h3
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "16px",
              fontWeight: 700,
              color: "#6B4C35",
              marginBottom: "24px",
              letterSpacing: "1px",
            }}
          >
            Filter By
          </h3>

          {/* Material */}
          <div style={{ marginBottom: "28px" }}>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "2px", color: "#C4922A", marginBottom: "12px" }}>
              MATERIAL
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {MATERIALS.map((m) => (
                <button
                  key={m}
                  onClick={() => setMaterial(m)}
                  style={{
                    textAlign: "left",
                    background: material === m ? "rgba(196,146,42,0.12)" : "transparent",
                    border: material === m ? "1px solid rgba(196,146,42,0.4)" : "1px solid transparent",
                    color: material === m ? "#C4922A" : "#6B5040",
                    fontSize: "13px",
                    fontWeight: material === m ? 600 : 400,
                    padding: "6px 10px",
                    borderRadius: "2px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Occasion */}
          <div style={{ marginBottom: "28px" }}>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "2px", color: "#C4922A", marginBottom: "12px" }}>
              OCCASION
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {OCCASIONS.map((o) => (
                <button
                  key={o}
                  onClick={() => setOccasion(o)}
                  style={{
                    textAlign: "left",
                    background: occasion === o ? "rgba(196,146,42,0.12)" : "transparent",
                    border: occasion === o ? "1px solid rgba(196,146,42,0.4)" : "1px solid transparent",
                    color: occasion === o ? "#C4922A" : "#6B5040",
                    fontSize: "13px",
                    fontWeight: occasion === o ? 600 : 400,
                    padding: "6px 10px",
                    borderRadius: "2px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {o}
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "2px", color: "#C4922A", marginBottom: "12px" }}>
              MAX PRICE: ₹{priceMax.toLocaleString("en-IN")}
            </p>
            <input
              type="range"
              min={500}
              max={6000}
              step={100}
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#C4922A" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#aaa", marginTop: "4px" }}>
              <span>₹500</span>
              <span>₹6,000</span>
            </div>
          </div>

          {/* Reset */}
          <button
            onClick={() => { setMaterial("All"); setOccasion("All"); setPriceMax(6000); setSearch(""); }}
            style={{
              marginTop: "24px",
              width: "100%",
              padding: "8px",
              background: "transparent",
              border: "1px solid rgba(107,76,53,0.3)",
              color: "#6B4C35",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "1px",
              cursor: "pointer",
              borderRadius: "2px",
            }}
          >
            Reset Filters
          </button>
        </aside>

        {/* Main */}
        <div style={{ flex: 1 }}>
          {/* Toolbar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "28px",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            {/* Search */}
            <motion.div
              animate={{ width: searchOpen ? "280px" : "40px" }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              style={{
                height: "40px",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                border: "1px solid rgba(196,146,42,0.4)",
                borderRadius: "2px",
                backgroundColor: "#fff",
              }}
            >
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                style={{ padding: "0 12px", background: "none", border: "none", cursor: "pointer", color: "#C4922A", flexShrink: 0 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </button>
              {searchOpen && (
                <input
                  autoFocus
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search sarees..."
                  style={{
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    fontSize: "13px",
                    color: "#3a2d1e",
                    width: "100%",
                    paddingRight: "12px",
                  }}
                />
              )}
            </motion.div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "13px", color: "#8a7060" }}>
                {filtered.length} result{filtered.length !== 1 ? "s" : ""}
              </span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                style={{
                  border: "1px solid rgba(196,146,42,0.4)",
                  borderRadius: "2px",
                  padding: "8px 12px",
                  backgroundColor: "#fff",
                  fontSize: "13px",
                  color: "#6B4C35",
                  cursor: "pointer",
                  outline: "none",
                }}
              >
                <option value="default">Sort: Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name: A–Z</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0", color: "#8a7060" }}>
              <p style={{ fontSize: "18px", fontStyle: "italic" }}>No sarees found.</p>
              <p style={{ fontSize: "14px", marginTop: "8px" }}>Try adjusting your filters.</p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: "24px",
              }}
            >
              {filtered.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
