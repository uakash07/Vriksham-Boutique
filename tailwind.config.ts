import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F5F0E8",
        beige: "#E8DDD0",
        sage: "#8FAF8A",
        gold: "#C4922A",
        brown: "#6B4C35",
        leafGreen: "#6DB33F",
      },
      fontFamily: {
        playfair: ["Playfair Display", "Georgia", "serif"],
        inter: ["Inter", "system-ui", "sans-serif"],
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(196, 146, 42, 0.4)" },
          "50%": { boxShadow: "0 0 0 12px rgba(196, 146, 42, 0)" },
        },
        "silk-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "leaf-sway": {
          "0%, 100%": { transform: "rotate(-5deg) translateY(0)" },
          "50%": { transform: "rotate(5deg) translateY(-8px)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(2.5)", opacity: "0" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "grow-up": {
          "0%": { transform: "scaleY(0)", transformOrigin: "bottom" },
          "100%": { transform: "scaleY(1)", transformOrigin: "bottom" },
        },
        bloom: {
          "0%": { transform: "scale(0)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        shimmer: "shimmer 3s linear infinite",
        float: "float 4s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "silk-shift": "silk-shift 6s ease infinite",
        "leaf-sway": "leaf-sway 3s ease-in-out infinite",
        "pulse-ring": "pulse-ring 1.8s ease-out infinite",
        "fade-in-up": "fade-in-up 0.8s ease-out forwards",
        "grow-up": "grow-up 1s ease-out forwards",
        bloom: "bloom 0.8s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
