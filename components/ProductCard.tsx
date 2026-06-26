"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Product } from "@/lib/products";

const SilkFrame = dynamic(() => import("@/components/three/SilkFrame"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full" style={{ background: "linear-gradient(135deg, #F5F0E8, #E8DDD0)" }} />
  ),
});

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);

  const colorMap: Record<string, string> = {
    Silk: "#C8A8E9",
    Cotton: "#20B2AA",
    Banarasi: "#C4922A",
    Organza: "#90EE90",
    Linen: "#FAF0E6",
    Chanderi: "#FFB347",
    Kota: "#4169E1",
    "Tussar Silk": "#DAA520",
  };

  const colorA = colorMap[product.material] || "#F5F0E8";

  return (
    <div
      className="product-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: "#fff",
        borderRadius: "4px",
        overflow: "hidden",
        boxShadow: hovered
          ? "0 20px 60px rgba(107,76,53,0.2), 0 0 30px rgba(196,146,42,0.15)"
          : "0 4px 20px rgba(107,76,53,0.08)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        transform: hovered ? "translateY(-8px)" : "translateY(0)",
      }}
    >
      {/* Silk animated frame */}
      <div style={{ height: "300px", position: "relative" }}>
        <SilkFrame
          className="w-full h-full"
          colorA={colorA}
          colorB="#C4922A"
          colorC="#8FAF8A"
          showLabel={true}
        />
        {/* Badges */}
        <div style={{ position: "absolute", top: "10px", left: "10px", display: "flex", flexDirection: "column", gap: "4px", zIndex: 10 }}>
          {product.isNewArrival && (
            <span style={{ background: "#6DB33F", color: "#fff", fontSize: "9px", fontWeight: 700, letterSpacing: "1.5px", padding: "3px 8px", borderRadius: "2px" }}>
              NEW
            </span>
          )}
          {product.isBestSeller && (
            <span style={{ background: "#C4922A", color: "#fff", fontSize: "9px", fontWeight: 700, letterSpacing: "1.5px", padding: "3px 8px", borderRadius: "2px" }}>
              BEST SELLER
            </span>
          )}
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: "16px", borderTop: "1px solid rgba(196,146,42,0.15)" }}>
        <h3 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "15px",
          fontWeight: 600,
          color: "#3a2d1e",
          marginBottom: "6px",
          lineHeight: 1.3,
        }}>
          {product.name}
        </h3>

        <div style={{ display: "flex", gap: "6px", marginBottom: "10px" }}>
          <span style={{
            background: "rgba(143,175,138,0.2)",
            color: "#5a8060",
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "1px",
            padding: "2px 8px",
            borderRadius: "2px",
            border: "1px solid rgba(143,175,138,0.4)",
          }}>
            {product.material}
          </span>
          <span style={{
            background: "rgba(196,146,42,0.1)",
            color: "#8a6818",
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "1px",
            padding: "2px 8px",
            borderRadius: "2px",
            border: "1px solid rgba(196,146,42,0.3)",
          }}>
            {product.occasion}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "20px",
            fontWeight: 700,
            color: "#C4922A",
          }}>
            ₹{product.price.toLocaleString("en-IN")}
          </span>

          <Link
            href={`/catalog/${product.id}`}
            style={{
              background: "linear-gradient(135deg, #6B4C35, #8B6045)",
              color: "#F5F0E8",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "1px",
              textTransform: "uppercase",
              padding: "8px 16px",
              borderRadius: "2px",
              textDecoration: "none",
              transition: "background 0.2s",
            }}
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
