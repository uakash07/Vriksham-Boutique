"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface SilkFrameProps {
  className?: string;
  colorA?: string;
  colorB?: string;
  colorC?: string;
  showLabel?: boolean;
}

function hexToVec3(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return [r, g, b];
}

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform float uHover;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;

    float freq = 4.0 + uHover * 6.0;
    float ripple = sin(uv.x * freq + uTime * 1.2) * 0.025 + sin(uv.y * freq * 0.8 + uTime) * 0.02;
    uv += ripple * (0.5 + uHover * 1.5);

    float t1 = (sin(uTime * 0.4) + 1.0) * 0.5;
    float t2 = (sin(uTime * 0.3 + 2.1) + 1.0) * 0.5;

    vec3 col = mix(uColorA, uColorB, t1);
    col = mix(col, uColorC, t2 * 0.6);

    float sheen = pow(abs(sin(uv.x * 8.0 + uTime * 0.5)), 6.0) * 0.15;
    col += sheen;

    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function SilkFrame({
  className,
  colorA = "#F5F0E8",
  colorB = "#C4922A",
  colorC = "#8FAF8A",
  showLabel = true,
}: SilkFrameProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;
    const mount = mountRef.current;
    let cleanupFn: (() => void) | undefined;

    async function init() {
      const THREE = await import("three");

      const width = mount.clientWidth || 300;
      const height = mount.clientHeight || 400;

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
      camera.position.z = 1;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      mount.appendChild(renderer.domElement);

      const [rA, gA, bA] = hexToVec3(colorA);
      const [rB, gB, bB] = hexToVec3(colorB);
      const [rC, gC, bC] = hexToVec3(colorC);

      const uniforms = {
        uTime: { value: 0 },
        uHover: { value: 0 },
        uColorA: { value: new THREE.Vector3(rA, gA, bA) },
        uColorB: { value: new THREE.Vector3(rB, gB, bB) },
        uColorC: { value: new THREE.Vector3(rC, gC, bC) },
      };

      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms,
      });

      const geometry = new THREE.PlaneGeometry(2, 2, 32, 32);
      const plane = new THREE.Mesh(geometry, material);
      scene.add(plane);

      let isHovered = false;
      let currentHover = 0;

      function animate() {
        animRef.current = requestAnimationFrame(animate);
        uniforms.uTime.value += 0.016;

        const targetHover = isHovered ? 1.0 : 0.0;
        currentHover += (targetHover - currentHover) * 0.05;
        uniforms.uHover.value = currentHover;

        renderer.render(scene, camera);
      }

      animate();

      const setHoveredFlag = (val: boolean) => { isHovered = val; };

      const canvas = renderer.domElement;
      canvas.addEventListener("mouseenter", () => setHoveredFlag(true));
      canvas.addEventListener("mouseleave", () => setHoveredFlag(false));

      const onResize = () => {
        const w = mount.clientWidth;
        const h = mount.clientHeight;
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", onResize);

      return () => {
        cancelAnimationFrame(animRef.current);
        window.removeEventListener("resize", onResize);
        mount.removeChild(renderer.domElement);
        renderer.dispose();
      };
    }

    init().then((fn) => { cleanupFn = fn; });

    return () => {
      cancelAnimationFrame(animRef.current);
      cleanupFn?.();
    };
  }, [colorA, colorB, colorC]);

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: `2px solid ${hovered ? "#e8c06a" : "#C4922A"}`,
        boxShadow: hovered
          ? "0 0 30px rgba(196,146,42,0.5), inset 0 0 20px rgba(196,146,42,0.1)"
          : "0 0 10px rgba(196,146,42,0.2)",
        transition: "box-shadow 0.3s ease, border-color 0.3s ease",
      }}
    >
      {/* Corner ornaments */}
      <span className="corner-tr" style={{ position: "absolute", top: -4, right: -4, width: 20, height: 20, borderTop: `3px solid ${hovered ? "#e8c06a" : "#C4922A"}`, borderRight: `3px solid ${hovered ? "#e8c06a" : "#C4922A"}`, zIndex: 10 }} />
      <span style={{ position: "absolute", bottom: -4, left: -4, width: 20, height: 20, borderBottom: `3px solid ${hovered ? "#e8c06a" : "#C4922A"}`, borderLeft: `3px solid ${hovered ? "#e8c06a" : "#C4922A"}`, zIndex: 10 }} />
      <span style={{ position: "absolute", top: -4, left: -4, width: 20, height: 20, borderTop: `3px solid ${hovered ? "#e8c06a" : "#C4922A"}`, borderLeft: `3px solid ${hovered ? "#e8c06a" : "#C4922A"}`, zIndex: 10 }} />
      <span style={{ position: "absolute", bottom: -4, right: -4, width: 20, height: 20, borderBottom: `3px solid ${hovered ? "#e8c06a" : "#C4922A"}`, borderRight: `3px solid ${hovered ? "#e8c06a" : "#C4922A"}`, zIndex: 10 }} />

      <div ref={mountRef} className="w-full h-full" />

      {showLabel && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
          style={{ zIndex: 5 }}
        >
          {/* Lotus SVG */}
          <svg width="48" height="40" viewBox="0 0 48 40" className="mb-3 animate-float opacity-80">
            <path d="M24 38 Q18 30 12 28 Q16 22 24 24 Q32 22 36 28 Q30 30 24 38Z" fill="#C4922A" opacity="0.7"/>
            <path d="M24 38 Q14 26 8 20 Q14 14 24 18 Q34 14 40 20 Q34 26 24 38Z" fill="#C4922A" opacity="0.5"/>
            <path d="M24 38 Q10 24 4 14 Q14 8 24 14 Q34 8 44 14 Q38 24 24 38Z" fill="#C4922A" opacity="0.3"/>
            <circle cx="24" cy="24" r="3" fill="#C4922A" opacity="0.9"/>
          </svg>
          <span
            className="text-xs tracking-widest uppercase font-inter"
            style={{
              color: "#C4922A",
              textShadow: "0 0 10px rgba(196,146,42,0.5)",
              animation: "pulse-glow 2s ease-in-out infinite",
            }}
          >
            Coming Soon
          </span>
        </div>
      )}
    </div>
  );
}
