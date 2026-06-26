"use client";

import { useEffect, useRef } from "react";

// ─── Canopy target positions — where each leaf ends up on the tree ───
const CANOPY_TARGETS = [
  // Crown top
  [-0.1, 4.1, 0.1], [0.1, 4.2, -0.1], [0.3, 4.0, 0.2], [-0.3, 4.0, -0.2],
  // Upper dome
  [-0.7, 3.8, 0.3], [-0.4, 3.9, -0.2], [0.0, 3.9, 0.3], [0.4, 3.8, -0.1], [0.7, 3.7, 0.2],
  // Mid-upper
  [-1.1, 3.5, 0.2], [-0.8, 3.6, -0.3], [-0.3, 3.7, 0.4], [0.2, 3.7, -0.3], [0.7, 3.5, 0.1], [1.1, 3.4, -0.2],
  // Middle layer
  [-1.5, 3.1, 0.1], [-1.2, 3.2, -0.3], [-0.7, 3.3, 0.3], [-0.2, 3.4, -0.1], [0.3, 3.4, 0.4],
  [0.8, 3.2, -0.2], [1.2, 3.1, 0.2], [1.5, 2.9, -0.1],
  // Mid-lower
  [-1.8, 2.6, -0.2], [-1.4, 2.7, 0.3], [-1.0, 2.8, -0.1], [-0.5, 2.9, 0.3], [0.0, 3.0, -0.3],
  [0.5, 2.8, 0.2], [1.0, 2.7, -0.2], [1.4, 2.5, 0.1], [1.7, 2.3, -0.1],
  // Lower layer
  [-1.7, 2.0, 0.2], [-1.3, 2.1, -0.2], [-0.9, 2.2, 0.1], [-0.4, 2.3, -0.3],
  [0.1, 2.4, 0.2], [0.5, 2.3, -0.1], [0.9, 2.1, 0.3], [1.3, 2.0, -0.2], [1.6, 1.8, 0.1],
  // Near trunk
  [-0.4, 2.7, 0.5], [0.4, 2.6, 0.5], [-0.7, 3.0, 0.5], [0.6, 2.9, 0.5],
  [-0.3, 2.1, -0.5], [0.3, 2.2, -0.5], [-0.6, 2.5, -0.5], [0.5, 2.4, -0.5],
  // Deep interior
  [-0.2, 2.8, 0.0], [0.2, 3.0, 0.0], [-0.5, 3.2, 0.0], [0.5, 3.1, 0.0],
  [-0.8, 2.4, 0.0], [0.7, 2.3, 0.0],
  // Extra fill
  [-1.0, 3.4, 0.4], [1.0, 3.3, 0.4], [-1.2, 2.9, -0.4], [1.1, 2.8, -0.4],
  [-0.2, 1.8, 0.2], [0.2, 1.7, -0.2], [-1.5, 1.6, 0.2], [1.4, 1.5, -0.2],
  [-0.5, 1.5, 0.3], [0.5, 1.4, -0.3],
  [-0.1, 4.3, 0.0], [0.0, 3.5, 0.6], [0.0, 3.5, -0.6],
];

function easeOutQuart(t: number) {
  return 1 - Math.pow(1 - t, 4);
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function TreeHero() {
  const mountRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(0);
  const animRef = useRef<number>(0);

  useEffect(() => {
    if (!mountRef.current) return;
    const mount = mountRef.current;
    let cleanup: (() => void) | undefined;

    async function init() {
      const THREE = await import("three");

      const width = mount.clientWidth || window.innerWidth * 0.55;
      const height = mount.clientHeight || window.innerHeight;

      // ── Renderer
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);

      // ── Scene & Camera
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(46, width / height, 0.1, 100);
      camera.position.set(0, 1.2, 10);
      camera.lookAt(0, 1.5, 0);

      // ── Lights
      scene.add(new THREE.AmbientLight(0xfff5e0, 1.1));
      const sun = new THREE.DirectionalLight(0xffe090, 1.5);
      sun.position.set(5, 10, 6);
      scene.add(sun);
      const fill = new THREE.DirectionalLight(0x90e0a0, 0.6);
      fill.position.set(-5, 4, -4);
      scene.add(fill);

      // ── Tree group (so we can sway the whole thing)
      const treeGroup = new THREE.Group();
      scene.add(treeGroup);

      const trunkMat  = new THREE.MeshLambertMaterial({ color: 0x6b4c35 });
      const trunkMat2 = new THREE.MeshLambertMaterial({ color: 0x7d5840 });

      function makeTube(
        points: [number, number, number][],
        radius: number,
        mat: THREE.Material
      ) {
        const curve = new THREE.CatmullRomCurve3(
          points.map(([x, y, z]) => new THREE.Vector3(x, y, z))
        );
        const geo = new THREE.TubeGeometry(curve, 10, radius, 7, false);
        const mesh = new THREE.Mesh(geo, mat);
        treeGroup.add(mesh);
        return mesh;
      }

      // ── Main trunk — rises from roots with a gentle lean
      makeTube([[0,-2.5,0],[0.04,-1.5,0.05],[0,-0.5,0],[0,0.6,0],[0,1.3,0]], 0.20, trunkMat);

      // ── Root base spreads (matches the logo's elegant V-base)
      makeTube([[0,-2.1,0],[-0.5,-2.4,0.1],[-1.0,-2.6,0.05]], 0.13, trunkMat);
      makeTube([[0,-2.1,0],[0.5,-2.4,-0.1],[1.0,-2.6,-0.05]], 0.13, trunkMat);
      makeTube([[0,-2.0,0],[0.05,-2.4,0.25]], 0.09, trunkMat);
      makeTube([[0,-2.0,0],[-0.05,-2.4,-0.2]], 0.08, trunkMat);

      // ── Branches
      const branchDefs: [number,number,number, number,number,number, number][] = [
        [0, 0.9, 0,  -1.7, 2.3, 0.2, 0.09],
        [0, 0.9, 0,  -1.0, 2.7,-0.1, 0.08],
        [0, 1.1, 0,  -0.4, 3.0, 0.3, 0.07],
        [0, 1.1, 0,   0.4, 3.1,-0.2, 0.07],
        [0, 0.9, 0,   1.0, 2.8, 0.1, 0.08],
        [0, 0.9, 0,   1.7, 2.4,-0.2, 0.09],
        [0, 1.3, 0,   0.0, 3.5, 0.1, 0.07],
        [0, 1.2, 0,  -0.6, 3.6, 0.2, 0.06],
        [0, 1.2, 0,   0.6, 3.7,-0.1, 0.06],
        // sub-branches
        [-1.0, 2.2, 0.1, -1.8, 3.0, 0.3, 0.05],
        [ 1.0, 2.3, 0.0,  1.8, 3.1,-0.2, 0.05],
        [-0.4, 2.8, 0.2, -0.9, 3.5, 0.4, 0.04],
        [ 0.4, 2.9,-0.1,  0.8, 3.6, 0.2, 0.04],
        [ 0.0, 3.3, 0.1, -0.4, 3.9, 0.2, 0.04],
        [ 0.0, 3.3, 0.1,  0.4, 4.0,-0.1, 0.04],
      ];

      branchDefs.forEach(([sx,sy,sz, ex,ey,ez, r]) => {
        const mx = (sx+ex)/2 + (Math.random()-0.5)*0.15;
        const mz = (sz+ez)/2 + (Math.random()-0.5)*0.12;
        makeTube([[sx,sy,sz],[mx,(sy+ey)/2,mz],[ex,ey,ez]], r, trunkMat2);
      });

      // ── Leaf canvas texture (hand-drawn oval leaf)
      const lc = document.createElement("canvas");
      lc.width = 64; lc.height = 96;
      const lx = lc.getContext("2d")!;

      const lg = lx.createLinearGradient(0, 0, 0, 96);
      lg.addColorStop(0,   "#9EE468");
      lg.addColorStop(0.35,"#6DB33F");
      lg.addColorStop(1,   "#4A9420");
      lx.fillStyle = lg;
      lx.beginPath();
      lx.moveTo(32, 2);
      lx.bezierCurveTo(60, 16, 62, 70, 32, 94);
      lx.bezierCurveTo( 2, 70,  4, 16, 32,  2);
      lx.closePath();
      lx.fill();

      // Highlight sheen
      const hg = lx.createRadialGradient(24, 18, 2, 24, 22, 22);
      hg.addColorStop(0,"rgba(255,255,255,0.38)");
      hg.addColorStop(1,"rgba(255,255,255,0)");
      lx.fillStyle = hg;
      lx.beginPath();
      lx.ellipse(24, 24, 14, 22, -0.3, 0, Math.PI*2);
      lx.fill();

      // Central vein
      lx.strokeStyle = "rgba(255,255,255,0.4)";
      lx.lineWidth   = 1.6;
      lx.beginPath(); lx.moveTo(32,5); lx.lineTo(32,90); lx.stroke();

      // Side veins
      lx.globalAlpha = 0.28;
      lx.lineWidth   = 0.9;
      for (let i = 0; i < 5; i++) {
        const vy = 18 + i * 14;
        lx.beginPath(); lx.moveTo(32,vy); lx.lineTo(14,vy+10); lx.stroke();
        lx.beginPath(); lx.moveTo(32,vy); lx.lineTo(50,vy+10); lx.stroke();
      }
      lx.globalAlpha = 1;

      const leafTex = new THREE.CanvasTexture(lc);

      // ── Leaves — start scattered in 3D, fly in on scroll
      const LEAF_COUNT = Math.min(CANOPY_TARGETS.length, 68);
      const leafGeo    = new THREE.PlaneGeometry(0.3, 0.45);
      const tintPalette = [0x6db33f, 0x5cb82e, 0x7dc44f, 0x8ed458, 0x4da828];

      interface Leaf {
        mesh: THREE.Mesh;
        startPos: THREE.Vector3;
        targetPos: THREE.Vector3;
        delay: number;       // 0–0.55
        rotVel: THREE.Vector3;
        targetEuler: THREE.Euler;
        arrived: boolean;
      }

      const leaves: Leaf[] = [];

      for (let i = 0; i < LEAF_COUNT; i++) {
        const mat = new THREE.MeshLambertMaterial({
          map: leafTex,
          transparent: true,
          alphaTest: 0.08,
          side: THREE.DoubleSide,
          color: tintPalette[i % tintPalette.length],
        });

        const mesh = new THREE.Mesh(leafGeo, mat);

        // Scatter start positions in a sphere/cone around the scene
        const theta = Math.random() * Math.PI * 2;
        const phi   = Math.random() * Math.PI;
        const dist  = 5.5 + Math.random() * 6;
        const startPos = new THREE.Vector3(
          Math.sin(phi) * Math.cos(theta) * dist,
          Math.random() * 7 - 1.5,
          Math.sin(phi) * Math.sin(theta) * dist * 0.4
        );

        const t = CANOPY_TARGETS[i];
        const targetPos = new THREE.Vector3(
          t[0] + (Math.random()-0.5)*0.14,
          t[1] + (Math.random()-0.5)*0.12,
          t[2] + (Math.random()-0.5)*0.18
        );

        mesh.position.copy(startPos);
        mesh.rotation.set(
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2
        );
        mesh.scale.setScalar(0.6 + Math.random() * 0.5);

        scene.add(mesh);

        leaves.push({
          mesh,
          startPos: startPos.clone(),
          targetPos,
          delay: (i / LEAF_COUNT) * 0.55,
          rotVel: new THREE.Vector3(
            (Math.random()-0.5) * 0.04,
            (Math.random()-0.5) * 0.04,
            (Math.random()-0.5) * 0.03
          ),
          targetEuler: new THREE.Euler(
            (Math.random()-0.5)*0.5,
            (Math.random()-0.5)*0.5,
            (Math.random()-0.5)*0.3
          ),
          arrived: false,
        });
      }

      // ── Gold particles
      const PC     = 180;
      const pPos   = new Float32Array(PC * 3);
      const pVel: { x: number; y: number; ph: number }[] = [];
      for (let i = 0; i < PC; i++) {
        pPos[i*3]   = (Math.random()-0.5)*3.5;
        pPos[i*3+1] = Math.random()*5 - 1;
        pPos[i*3+2] = (Math.random()-0.5)*2;
        pVel.push({ x:(Math.random()-0.5)*0.003, y:0.003+Math.random()*0.006, ph:Math.random()*Math.PI*2 });
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
      const pMat = new THREE.PointsMaterial({
        color: 0xc4922a, size: 0.055, transparent: true,
        opacity: 0.75, sizeAttenuation: true,
        blending: THREE.AdditiveBlending, depthWrite: false,
      });
      scene.add(new THREE.Points(pGeo, pMat));

      // ── Scroll listener
      const onScroll = () => {
        scrollRef.current = Math.min(1, window.scrollY / (window.innerHeight * 0.75));
      };
      window.addEventListener("scroll", onScroll, { passive: true });

      // ── Mouse parallax
      let mx = 0, my = 0;
      const onMouse = (e: MouseEvent) => {
        mx = (e.clientX / window.innerWidth  - 0.5) * 0.5;
        my = (e.clientY / window.innerHeight - 0.5) * 0.3;
      };
      window.addEventListener("mousemove", onMouse);

      // ── Animate
      let t = 0;
      const tmpV = new THREE.Vector3();

      function animate() {
        animRef.current = requestAnimationFrame(animate);
        t += 0.012;

        const sp = scrollRef.current;

        // Camera parallax
        camera.position.x += (mx * 0.8 - camera.position.x) * 0.04;
        camera.position.y += (-my * 0.5 + 1.2 - camera.position.y) * 0.04;
        camera.lookAt(0, 1.5, 0);

        // Tree sway
        treeGroup.rotation.z = Math.sin(t * 0.38) * 0.018;
        treeGroup.rotation.x = Math.sin(t * 0.25) * 0.008;

        // Leaves fly home
        for (const leaf of leaves) {
          if (leaf.arrived) continue;

          const localT = Math.max(0, (sp - leaf.delay) / 0.42);
          const et     = easeOutQuart(Math.min(localT, 1));

          if (localT >= 1) {
            leaf.mesh.position.copy(leaf.targetPos);
            leaf.mesh.rotation.copy(leaf.targetEuler);
            leaf.arrived = true;
            continue;
          }

          // Lerp position toward target
          tmpV.lerpVectors(leaf.startPos, leaf.targetPos, et);
          leaf.mesh.position.copy(tmpV);

          // Tumble during flight; slow spin as it arrives
          const spinFactor = Math.max(0, 1 - et * 1.4);
          leaf.mesh.rotation.x += leaf.rotVel.x * spinFactor;
          leaf.mesh.rotation.y += leaf.rotVel.y * spinFactor;
          leaf.mesh.rotation.z += leaf.rotVel.z * spinFactor;

          // Align to target rotation in final 20%
          if (et > 0.80) {
            const af = (et - 0.80) / 0.20;
            leaf.mesh.rotation.x += (leaf.targetEuler.x - leaf.mesh.rotation.x) * af * 0.12;
            leaf.mesh.rotation.y += (leaf.targetEuler.y - leaf.mesh.rotation.y) * af * 0.12;
            leaf.mesh.rotation.z += (leaf.targetEuler.z - leaf.mesh.rotation.z) * af * 0.12;
          }
        }

        // Gold particles rise
        const pp = pGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < PC; i++) {
          pp[i*3]   += pVel[i].x + Math.sin(t + pVel[i].ph) * 0.003;
          pp[i*3+1] += pVel[i].y;
          if (pp[i*3+1] > 5) { pp[i*3+1] = -1; pp[i*3] = (Math.random()-0.5)*3.5; }
        }
        pGeo.attributes.position.needsUpdate = true;

        renderer.render(scene, camera);
      }
      animate();

      // ── Resize
      const onResize = () => {
        const w = mount.clientWidth;
        const h = mount.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", onResize);

      return () => {
        cancelAnimationFrame(animRef.current);
        window.removeEventListener("scroll",    onScroll);
        window.removeEventListener("mousemove", onMouse);
        window.removeEventListener("resize",    onResize);
        if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
        renderer.dispose();
      };
    }

    init().then((fn) => { cleanup = fn; });
    return () => { cancelAnimationFrame(animRef.current); cleanup?.(); };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(ellipse at 48% 58%, #f2ead8 0%, #e8ddd0 42%, #d8ccbc 100%)",
      }}
    />
  );
}
