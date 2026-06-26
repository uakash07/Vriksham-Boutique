"use client";

import { useEffect, useRef } from "react";

export default function LeafParticles() {
  const mountRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    if (!mountRef.current) return;
    const mount = mountRef.current;
    let cleanupFn: (() => void) | undefined;

    async function init() {
      const THREE = await import("three");

      const width = window.innerWidth;
      const height = window.innerHeight;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
      camera.position.z = 5;

      const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(1);
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);

      // Create a leaf-shaped canvas texture
      const leafCanvas = document.createElement("canvas");
      leafCanvas.width = 32;
      leafCanvas.height = 48;
      const ctx = leafCanvas.getContext("2d")!;
      ctx.clearRect(0, 0, 32, 48);
      ctx.fillStyle = "#6DB33F";
      ctx.beginPath();
      ctx.ellipse(16, 24, 8, 16, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#5DA82F";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(16, 8);
      ctx.lineTo(16, 40);
      ctx.stroke();

      const leafTexture = new THREE.CanvasTexture(leafCanvas);

      const leafCount = 120;
      const leaves: {
        mesh: THREE.Sprite;
        vx: number;
        vy: number;
        vz: number;
        rotSpeed: number;
        phase: number;
        opacityDir: number;
        currentOpacity: number;
      }[] = [];

      for (let i = 0; i < leafCount; i++) {
        const isGold = Math.random() > 0.7;
        const mat = new THREE.SpriteMaterial({
          map: leafTexture,
          transparent: true,
          opacity: Math.random() * 0.25 + 0.05,
          color: isGold ? 0xc4922a : 0x6db33f,
          blending: THREE.NormalBlending,
          depthWrite: false,
        });

        const sprite = new THREE.Sprite(mat);
        const scale = Math.random() * 0.12 + 0.06;
        sprite.scale.set(scale * 0.7, scale, 1);

        const spread = 6;
        sprite.position.set(
          (Math.random() - 0.5) * spread * (width / height),
          (Math.random() - 0.5) * spread,
          (Math.random() - 0.5) * 2
        );

        scene.add(sprite);
        leaves.push({
          mesh: sprite,
          vx: (Math.random() - 0.5) * 0.002,
          vy: -(Math.random() * 0.004 + 0.001),
          vz: 0,
          rotSpeed: (Math.random() - 0.5) * 0.01,
          phase: Math.random() * Math.PI * 2,
          opacityDir: Math.random() > 0.5 ? 1 : -1,
          currentOpacity: mat.opacity,
        });
      }

      let t = 0;

      function animate() {
        animRef.current = requestAnimationFrame(animate);
        t += 0.01;

        const aspect = width / height;
        const halfH = 3;
        const halfW = halfH * aspect;

        leaves.forEach((leaf, i) => {
          const p = leaf.mesh.position;
          p.x += leaf.vx + Math.sin(t * 0.5 + leaf.phase) * 0.003;
          p.y += leaf.vy;

          // Drift leaves back when off screen
          if (p.y < -halfH - 0.5) {
            p.y = halfH + 0.2;
            p.x = (Math.random() - 0.5) * halfW * 2;
          }
          if (p.x > halfW + 0.5) p.x = -halfW - 0.2;
          if (p.x < -halfW - 0.5) p.x = halfW + 0.2;

          // Gently fade opacity
          leaf.currentOpacity += leaf.opacityDir * 0.001;
          if (leaf.currentOpacity > 0.3) { leaf.currentOpacity = 0.3; leaf.opacityDir = -1; }
          if (leaf.currentOpacity < 0.03) { leaf.currentOpacity = 0.03; leaf.opacityDir = 1; }
          (leaf.mesh.material as THREE.SpriteMaterial).opacity = leaf.currentOpacity;
        });

        renderer.render(scene, camera);
      }

      animate();

      const onResize = () => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
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
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
