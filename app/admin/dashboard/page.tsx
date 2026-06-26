"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { SEED_PRODUCTS, Product } from "@/lib/products";

type Tab = "products" | "orders";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<Tab>("products");
  const [products] = useState<Product[]>(SEED_PRODUCTS);
  const [searchProduct, setSearchProduct] = useState("");

  useEffect(() => {
    async function checkAuth() {
      try {
        const { auth } = await import("@/lib/firebase");
        const { onAuthStateChanged } = await import("firebase/auth");
        onAuthStateChanged(auth, (user) => {
          if (user) {
            setAuthed(true);
          } else {
            router.replace("/admin");
          }
        });
      } catch {
        router.replace("/admin");
      }
    }
    checkAuth();
  }, [router]);

  const handleSignOut = async () => {
    const { auth } = await import("@/lib/firebase");
    const { signOut } = await import("firebase/auth");
    await signOut(auth);
    router.push("/admin");
  };

  if (!authed) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#F5F0E8", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#6B4C35", fontSize: "18px" }}>
          Checking authentication...
        </p>
      </div>
    );
  }

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchProduct.toLowerCase())
  );

  const totalRevenue = products.reduce((sum, p) => sum + p.price, 0);

  return (
    <div style={{ backgroundColor: "#F5F0E8", minHeight: "100vh" }}>
      {/* Top bar */}
      <div
        style={{
          backgroundColor: "#6B4C35",
          padding: "0 24px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Image src="/vriksham-logo.jpg" alt="Vriksham" width={28} height={34} style={{ filter: "brightness(0) invert(1)" }} />
          <span
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "#F5F0E8",
              fontSize: "15px",
              fontWeight: 700,
              letterSpacing: "2px",
            }}
          >
            ADMIN PANEL
          </span>
        </div>
        <button
          onClick={handleSignOut}
          style={{
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "#F5F0E8",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "1px",
            padding: "8px 16px",
            borderRadius: "2px",
            cursor: "pointer",
          }}
        >
          Sign Out
        </button>
      </div>

      <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "32px 24px" }}>
        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          {[
            { label: "Total Products", value: products.length.toString(), icon: "🌿", color: "#6DB33F" },
            { label: "In Stock", value: products.filter((p) => p.inStock).length.toString(), icon: "✅", color: "#C4922A" },
            { label: "New Arrivals", value: products.filter((p) => p.isNewArrival).length.toString(), icon: "✨", color: "#8FAF8A" },
            { label: "Catalog Value", value: "₹" + totalRevenue.toLocaleString("en-IN"), icon: "💰", color: "#6B4C35" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                backgroundColor: "#fff",
                border: "1px solid rgba(196,146,42,0.15)",
                borderRadius: "4px",
                padding: "24px",
                boxShadow: "0 4px 16px rgba(107,76,53,0.06)",
              }}
            >
              <div style={{ fontSize: "28px", marginBottom: "8px" }}>{stat.icon}</div>
              <div
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "24px",
                  fontWeight: 700,
                  color: stat.color,
                  marginBottom: "4px",
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: "12px", color: "#8a7060", letterSpacing: "1px", fontWeight: 600 }}>
                {stat.label.toUpperCase()}
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "0", marginBottom: "28px", borderBottom: "1px solid rgba(196,146,42,0.2)" }}>
          {(["products", "orders"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: "12px 28px",
                background: "none",
                border: "none",
                borderBottom: tab === t ? "2px solid #C4922A" : "2px solid transparent",
                color: tab === t ? "#C4922A" : "#8a7060",
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: "13px",
                fontWeight: tab === t ? 700 : 500,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.2s",
                marginBottom: "-1px",
              }}
            >
              {t === "products" ? "Products" : "Orders"}
            </button>
          ))}
        </div>

        {tab === "products" && (
          <div>
            {/* Toolbar */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", gap: "16px", flexWrap: "wrap" }}>
              <input
                value={searchProduct}
                onChange={(e) => setSearchProduct(e.target.value)}
                placeholder="Search products..."
                style={{
                  padding: "10px 16px",
                  border: "1px solid rgba(196,146,42,0.3)",
                  borderRadius: "2px",
                  backgroundColor: "#fff",
                  fontSize: "13px",
                  color: "#3a2d1e",
                  outline: "none",
                  width: "260px",
                }}
              />
              <div style={{ display: "flex", gap: "12px" }}>
                <a
                  href="https://console.firebase.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 20px",
                    backgroundColor: "#F5F0E8",
                    border: "1px solid rgba(196,146,42,0.3)",
                    borderRadius: "2px",
                    color: "#6B4C35",
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "1px",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  📦 Open Firebase
                </a>
                <button
                  style={{
                    padding: "10px 20px",
                    background: "linear-gradient(135deg, #C4922A, #e8c06a)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "2px",
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "1px",
                    cursor: "pointer",
                  }}
                  onClick={() => alert("Connect Firebase to add products via the Admin panel")}
                >
                  + Add Product
                </button>
              </div>
            </div>

            {/* Products Table */}
            <div
              style={{
                backgroundColor: "#fff",
                borderRadius: "4px",
                border: "1px solid rgba(196,146,42,0.15)",
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(107,76,53,0.06)",
              }}
            >
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#6B4C35" }}>
                    {["Product Name", "Material", "Occasion", "Price", "Status", "Actions"].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: "14px 16px",
                          textAlign: "left",
                          fontSize: "10px",
                          fontWeight: 700,
                          letterSpacing: "1.5px",
                          color: "rgba(245,240,232,0.85)",
                          textTransform: "uppercase",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product, i) => (
                    <tr
                      key={product.id}
                      style={{
                        borderBottom: "1px solid rgba(196,146,42,0.1)",
                        backgroundColor: i % 2 === 0 ? "#fff" : "#FDFAF5",
                      }}
                    >
                      <td style={{ padding: "14px 16px" }}>
                        <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "14px", fontWeight: 600, color: "#3a2d1e" }}>
                          {product.name}
                        </div>
                        <div style={{ fontSize: "11px", color: "#8a7060", marginTop: "2px" }}>
                          {product.isNewArrival && "New · "}{product.isBestSeller && "Best Seller"}
                        </div>
                      </td>
                      <td style={{ padding: "14px 16px", fontSize: "13px", color: "#5a4030" }}>{product.material}</td>
                      <td style={{ padding: "14px 16px", fontSize: "13px", color: "#5a4030" }}>{product.occasion}</td>
                      <td style={{ padding: "14px 16px", fontFamily: "'Playfair Display', Georgia, serif", fontSize: "15px", fontWeight: 700, color: "#C4922A" }}>
                        ₹{product.price.toLocaleString("en-IN")}
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <span
                          style={{
                            display: "inline-block",
                            padding: "3px 10px",
                            borderRadius: "2px",
                            fontSize: "10px",
                            fontWeight: 700,
                            letterSpacing: "1px",
                            backgroundColor: product.inStock ? "rgba(109,179,63,0.15)" : "rgba(196,42,42,0.1)",
                            color: product.inStock ? "#3a7020" : "#8B0000",
                            border: `1px solid ${product.inStock ? "rgba(109,179,63,0.3)" : "rgba(196,42,42,0.3)"}`,
                          }}
                        >
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </span>
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <a
                            href={`/catalog/${product.id}`}
                            style={{
                              padding: "6px 12px",
                              border: "1px solid rgba(196,146,42,0.4)",
                              borderRadius: "2px",
                              color: "#C4922A",
                              fontSize: "11px",
                              fontWeight: 600,
                              textDecoration: "none",
                              cursor: "pointer",
                            }}
                          >
                            View
                          </a>
                          <button
                            onClick={() => alert("Connect Firebase Firestore to enable editing")}
                            style={{
                              padding: "6px 12px",
                              border: "1px solid rgba(107,76,53,0.3)",
                              borderRadius: "2px",
                              color: "#6B4C35",
                              fontSize: "11px",
                              fontWeight: 600,
                              background: "none",
                              cursor: "pointer",
                            }}
                          >
                            Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: "16px", padding: "16px", backgroundColor: "rgba(143,175,138,0.15)", borderRadius: "4px", border: "1px solid rgba(143,175,138,0.3)" }}>
              <p style={{ fontSize: "13px", color: "#3a6030", fontWeight: 500 }}>
                💡 <strong>To add/edit products:</strong> Set up Firebase Firestore with your credentials in <code>.env.local</code>, then the Add/Edit buttons will connect to your live database. Product images can be uploaded via Firebase Storage.
              </p>
            </div>
          </div>
        )}

        {tab === "orders" && (
          <div>
            <div
              style={{
                backgroundColor: "#fff",
                borderRadius: "4px",
                border: "1px solid rgba(196,146,42,0.15)",
                padding: "60px",
                textAlign: "center",
                boxShadow: "0 4px 20px rgba(107,76,53,0.06)",
              }}
            >
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>📦</div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "#6B4C35",
                  marginBottom: "8px",
                }}
              >
                No Orders Yet
              </h3>
              <p style={{ color: "#8a7060", fontSize: "14px", lineHeight: 1.6, maxWidth: "400px", margin: "0 auto" }}>
                Orders placed via Razorpay or WhatsApp will appear here once you connect Firebase Firestore.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
