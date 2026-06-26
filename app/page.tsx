"use client";

import { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";

/* ── Lazy load all heavy home components ── */
const LoadingScreen    = dynamic(() => import("@/components/home/LoadingScreen"),    { ssr: false });
const HeroSection      = dynamic(() => import("@/components/home/HeroSection"),      { ssr: false });
const TextMorphSection = dynamic(() => import("@/components/home/TextMorphSection"), { ssr: false });
const HorizontalGallery= dynamic(() => import("@/components/home/HorizontalGallery"),{ ssr: false });
const BrandStory       = dynamic(() => import("@/components/home/BrandStory"),       { ssr: false });
const Testimonials     = dynamic(() => import("@/components/home/Testimonials"),     { ssr: false });
const InstagramFeed    = dynamic(() => import("@/components/home/InstagramFeed"),    { ssr: false });
const FinalCTA         = dynamic(() => import("@/components/home/FinalCTA"),         { ssr: false });

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);

  /* Hide scrollbar during loading */
  useEffect(() => {
    if (!loaded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [loaded]);

  return (
    <>
      {/* Loading screen — unmounts itself after animation */}
      {!loaded && (
        <Suspense fallback={null}>
          <LoadingScreen onComplete={() => setLoaded(true)} />
        </Suspense>
      )}

      {/* Main content — rendered underneath loading screen */}
      <main>
        {/* 1 ── Hero (WebGL BG + fireflies + cinematic text) */}
        <Suspense fallback={<div style={{ height: "100vh", background: "#050A03" }} />}>
          <HeroSection />
        </Suspense>

        {/* 2 ── Text morph (pinned, GSAP scrub) */}
        <Suspense fallback={<div style={{ height: "200vh", background: "#050A03" }} />}>
          <TextMorphSection />
        </Suspense>

        {/* 3 ── Horizontal saree gallery (pinned, 8 panels × 100vw) */}
        <Suspense fallback={<div style={{ height: "100vh", background: "#111" }} />}>
          <HorizontalGallery />
        </Suspense>

        {/* 4 ── Brand story (split screen) */}
        <Suspense fallback={<div style={{ height: "100vh", background: "#0A1F0A" }} />}>
          <BrandStory />
        </Suspense>

        {/* 5 ── Testimonials (infinite marquee) */}
        <Suspense fallback={<div style={{ height: "400px", background: "#080808" }} />}>
          <Testimonials />
        </Suspense>

        {/* 6 ── Instagram feed (animated gradient grid) */}
        <Suspense fallback={<div style={{ height: "600px", background: "#0e0e0e" }} />}>
          <InstagramFeed />
        </Suspense>

        {/* 7 ── Final CTA (flying text) */}
        <Suspense fallback={<div style={{ height: "100vh", background: "#000" }} />}>
          <FinalCTA />
        </Suspense>
      </main>
    </>
  );
}
