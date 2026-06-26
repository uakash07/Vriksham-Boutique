"use client";
import dynamic from "next/dynamic";

const SmoothScroll = dynamic(() => import("./SmoothScroll"), { ssr: false });

export default function ClientProviders() {
  return <SmoothScroll />;
}
