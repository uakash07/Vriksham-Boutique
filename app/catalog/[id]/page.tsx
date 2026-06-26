"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";
import { SEED_PRODUCTS, Product } from "@/lib/products";
import { initiateRazorpayCheckout } from "@/lib/razorpay";
import ProductCard from "@/components/ProductCard";

const SilkFrame = dynamic(() => import("@/components/three/SilkFrame"), { ssr: false });

const MATERIAL_COLOR_A: Record<string, string> = {
  Silk: "#C8A8E9",
  Cotton: "#20B2AA",
  Banarasi: "#C4922A",
  Organza: "#90EE90",
  Linen: "#FAF0E6",
  Chanderi: "#FFB347",
  Kota: "#4169E1",
  "Tussar Silk": "#DAA520",
};

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [buying, setBuying] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const found = SEED_PRODUCTS.find((p) => p.id === id);
    if (found) {
      setProduct(found);
      setSelectedColor(found.colors[0] || "");
    }
  }, [id]);

  if (!product) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#F5F0E8",
        }}
      >
        <p
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "24px",
            color: "#6B4C35",
          }}
        >
          Saree not found.
        </p>
      </div>
    );
  }

  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919944136595";
  const waMessage = encodeURIComponent(
    `Hi Vriksham Boutique! 👋 I'm interested in purchasing the following saree from your website:\n\n🌿 *${product.name}*\n💰 Price: ₹${product.price.toLocaleString("en-IN")}\n🎨 Colour: ${selectedColor || "N/A"}\n📦 Material: ${product.material}\n\nCould you please confirm availability and share more details? Thank you! 🙏`
  );
  const waLink = `https://wa.me/${whatsapp}?text=${waMessage}`;

  const relatedProducts = SEED_PRODUCTS.filter(
    (p) =>
      p.id !== product.id &&
      (p.material === product.material || p.occasion === product.occasion)
  ).slice(0, 4);

  const handleBuyNow = async () => {
    setBuying(true);
    setMessage(null);
    try {
      await initiateRazorpayCheckout({
        amount: product.price,
        productName: product.name,
        onSuccess: (paymentId) => {
          setMessage(`Payment successful! ID: ${paymentId}`);
          setBuying(false);
        },
        onDismiss: () => setBuying(false),
      });
    } catch {
      setMessage("Payment failed. Please try again or contact us on WhatsApp.");
      setBuying(false);
    }
  };

  const colorA = MATERIAL_COLOR_A[product.material] || "#F5F0E8";

  return (
    <div style={{ backgroundColor: "#F5F0E8", minHeight: "100vh" }}>
      {/* Breadcrumb */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "20px 24px 0",
          fontSize: "12px",
          color: "#8a7060",
          fontFamily: "'Inter', system-ui, sans-serif",
        }}
      >
        <Link href="/" style={{ color: "#C4922A", textDecoration: "none" }}>Home</Link>
        {" / "}
        <Link href="/catalog" style={{ color: "#C4922A", textDecoration: "none" }}>Catalog</Link>
        {" / "}
        <span>{product.name}</span>
      </div>

      {/* Main content */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "32px 24px 60px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "60px",
          alignItems: "start",
        }}
        className="product-detail-grid"
      >
        {/* Left — Animated Silk Frame */}
        <div>
          <div style={{ aspectRatio: "3/4", position: "relative" }}>
            <SilkFrame
              className="w-full h-full"
              colorA={colorA}
              colorB="#C4922A"
              colorC="#8FAF8A"
              showLabel={product.images.length === 0}
            />
          </div>

          {/* Thumbnail row placeholder */}
          <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: "72px",
                  height: "96px",
                  border: i === 0 ? "2px solid #C4922A" : "1.5px solid rgba(196,146,42,0.3)",
                  borderRadius: "2px",
                  backgroundColor: "#EDE5D5",
                  cursor: "pointer",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(196,146,42,0.1), rgba(143,175,138,0.1))", animation: "silk-shift 4s ease infinite", backgroundSize: "400% 400%" }} />
              </div>
            ))}
          </div>
        </div>

        {/* Right — Product Info */}
        <div>
          {/* Badges */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
            {product.isNewArrival && (
              <span style={{ background: "#6DB33F", color: "#fff", fontSize: "10px", fontWeight: 700, letterSpacing: "1.5px", padding: "4px 10px", borderRadius: "2px" }}>
                NEW ARRIVAL
              </span>
            )}
            {product.isBestSeller && (
              <span style={{ background: "#C4922A", color: "#fff", fontSize: "10px", fontWeight: 700, letterSpacing: "1.5px", padding: "4px 10px", borderRadius: "2px" }}>
                BEST SELLER
              </span>
            )}
          </div>

          {/* Name */}
          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(24px, 3vw, 34px)",
              fontWeight: 700,
              color: "#3a2d1e",
              lineHeight: 1.2,
              marginBottom: "16px",
            }}
          >
            {product.name}
          </h1>

          {/* Price */}
          <div style={{ marginBottom: "24px" }}>
            <span
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "32px",
                fontWeight: 700,
                color: "#C4922A",
              }}
            >
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            <span style={{ fontSize: "13px", color: "#8a7060", marginLeft: "8px" }}>inclusive of all taxes</span>
          </div>

          {/* Details */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
              backgroundColor: "#fff",
              border: "1px solid rgba(196,146,42,0.15)",
              borderRadius: "4px",
              padding: "20px",
              marginBottom: "24px",
            }}
          >
            {[
              ["Material", product.material],
              ["Occasion", product.occasion],
              ["Length", product.length],
              ["Blouse", product.blouseIncluded ? "Included" : "Not Included"],
              ["Care", product.careInstructions],
              ["Stock", product.inStock ? "In Stock" : "Out of Stock"],
            ].map(([label, value]) => (
              <div key={label}>
                <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "1.5px", color: "#C4922A", marginBottom: "2px" }}>
                  {label.toUpperCase()}
                </div>
                <div style={{ fontSize: "14px", color: "#5a4030", fontWeight: 500 }}>{value}</div>
              </div>
            ))}
          </div>

          {/* Color swatches */}
          {product.colors.length > 0 && (
            <div style={{ marginBottom: "28px" }}>
              <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "1.5px", color: "#6B4C35", marginBottom: "12px" }}>
                COLOUR OPTIONS
              </p>
              <div style={{ display: "flex", gap: "10px" }}>
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      backgroundColor: color,
                      border: selectedColor === color ? "3px solid #C4922A" : "2px solid rgba(0,0,0,0.15)",
                      outline: selectedColor === color ? "2px solid rgba(196,146,42,0.4)" : "none",
                      outlineOffset: "2px",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                backgroundColor: "#25D366",
                color: "#fff",
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: "14px",
                fontWeight: 700,
                letterSpacing: "1px",
                padding: "16px 24px",
                borderRadius: "2px",
                textDecoration: "none",
                boxShadow: "0 4px 20px rgba(37,211,102,0.35)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 30px rgba(37,211,102,0.5)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(37,211,102,0.35)";
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Enquire on WhatsApp
            </a>

            <button
              onClick={handleBuyNow}
              disabled={buying}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                background: "linear-gradient(135deg, #C4922A, #e8c06a, #C4922A)",
                backgroundSize: "200% auto",
                color: "#fff",
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: "14px",
                fontWeight: 700,
                letterSpacing: "1px",
                padding: "16px 24px",
                borderRadius: "2px",
                border: "none",
                cursor: buying ? "not-allowed" : "pointer",
                opacity: buying ? 0.7 : 1,
                boxShadow: "0 4px 20px rgba(196,146,42,0.35)",
                transition: "background-position 0.4s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                if (!buying) {
                  (e.currentTarget as HTMLElement).style.backgroundPosition = "right center";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundPosition = "left center";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              {buying ? "Processing..." : "Buy Now — ₹" + product.price.toLocaleString("en-IN")}
            </button>
          </div>

          {message && (
            <div
              style={{
                padding: "12px 16px",
                borderRadius: "4px",
                backgroundColor: message.startsWith("Payment successful") ? "rgba(109,179,63,0.15)" : "rgba(196,42,42,0.1)",
                border: `1px solid ${message.startsWith("Payment successful") ? "#6DB33F" : "#c44242"}`,
                color: message.startsWith("Payment successful") ? "#3a7020" : "#8B0000",
                fontSize: "13px",
                marginBottom: "16px",
              }}
            >
              {message}
            </div>
          )}

          {/* Trust badges */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
              padding: "16px",
              backgroundColor: "rgba(143,175,138,0.1)",
              borderRadius: "4px",
              border: "1px solid rgba(143,175,138,0.3)",
            }}
          >
            {[
              { icon: "🚚", text: "Free delivery above ₹1,999" },
              { icon: "🔒", text: "Secure payment" },
              { icon: "↩️", text: "Easy returns" },
            ].map((badge) => (
              <div key={badge.text} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span>{badge.icon}</span>
                <span style={{ fontSize: "12px", color: "#5a8060", fontWeight: 500 }}>{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section style={{ backgroundColor: "#EDE5D5", padding: "60px 24px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "28px",
                fontWeight: 700,
                color: "#3a2d1e",
                textAlign: "center",
                marginBottom: "36px",
              }}
            >
              You May Also Like
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                gap: "24px",
              }}
            >
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <style>{`
        @media (max-width: 768px) {
          .product-detail-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </div>
  );
}
