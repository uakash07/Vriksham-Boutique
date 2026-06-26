"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { auth } = await import("@/lib/firebase");
      const { signInWithEmailAndPassword } = await import("firebase/auth");
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin/dashboard");
    } catch (err: unknown) {
      setError("Invalid credentials. Please try again.");
      setLoading(false);
      console.error(err);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#F5F0E8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "#fff",
          borderRadius: "4px",
          padding: "48px 40px",
          boxShadow: "0 20px 60px rgba(107,76,53,0.12)",
          border: "1px solid rgba(196,146,42,0.2)",
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <Image src="/vriksham-logo.jpg" alt="Vriksham" width={50} height={60} style={{ margin: "0 auto 12px" }} />
          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "20px",
              fontWeight: 700,
              color: "#6B4C35",
              letterSpacing: "2px",
            }}
          >
            ADMIN LOGIN
          </h1>
          <p style={{ fontSize: "12px", color: "#8a7060", marginTop: "4px" }}>Vriksham Boutique Dashboard</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label
              style={{
                display: "block",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "1.5px",
                color: "#C4922A",
                marginBottom: "8px",
              }}
            >
              EMAIL
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "1px solid rgba(196,146,42,0.3)",
                borderRadius: "2px",
                backgroundColor: "#F5F0E8",
                fontSize: "14px",
                color: "#3a2d1e",
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#C4922A")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(196,146,42,0.3)")}
              placeholder="admin@vriksham.com"
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "1.5px",
                color: "#C4922A",
                marginBottom: "8px",
              }}
            >
              PASSWORD
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "1px solid rgba(196,146,42,0.3)",
                borderRadius: "2px",
                backgroundColor: "#F5F0E8",
                fontSize: "14px",
                color: "#3a2d1e",
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#C4922A")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(196,146,42,0.3)")}
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div
              style={{
                padding: "10px 14px",
                backgroundColor: "rgba(196,42,42,0.08)",
                border: "1px solid rgba(196,42,42,0.3)",
                borderRadius: "2px",
                color: "#8B0000",
                fontSize: "13px",
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: "8px",
              width: "100%",
              padding: "14px",
              background: "linear-gradient(135deg, #C4922A, #e8c06a, #C4922A)",
              backgroundSize: "200% auto",
              color: "#fff",
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "2px",
              textTransform: "uppercase",
              border: "none",
              borderRadius: "2px",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
              boxShadow: "0 4px 20px rgba(196,146,42,0.35)",
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
