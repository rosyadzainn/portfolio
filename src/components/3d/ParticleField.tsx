/* eslint-disable react-hooks/purity, react-hooks/refs, react-hooks/immutability */
"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { generateShapePositions, type ShapeName } from "@/lib/shapes";

const WHITE  = "#ffffff";
const SILVER = "#d0d0d0";
const DIM    = "#888888";

const COUNT   = 4500;
const S_COUNT = 48;

const REPEL_RADIUS   = 0.88;
const REPEL_STRENGTH = 0.17;
const SPRING         = 0.034;
const DAMPING        = 0.87;

interface ParticleFieldProps {
  mouseX: number;
  mouseY: number;
  shape: ShapeName;
  accentColor?: string;
}

export default function ParticleField({ mouseX, mouseY, shape, accentColor = "#22c55e" }: ParticleFieldProps) {
  const groupRef  = useRef<THREE.Group>(null);
  const shapeRef  = useRef<ShapeName>("sphere");
  const explodeRef = useRef<THREE.Vector3 | null>(null);

  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const mouse2D   = useMemo(() => new THREE.Vector2(), []);
  const worldPt   = useMemo(() => new THREE.Vector3(), []);
  const localPt   = useMemo(() => new THREE.Vector3(), []);
  const zeroPlane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), []);

  // Circular sprite texture so particles render as round dots, not squares
  const circleTexture = useMemo(() => {
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = size; canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const c = size / 2;
    // Soft outer glow
    const g = ctx.createRadialGradient(c, c, c * 0.35, c, c, c);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(c, c, c, 0, Math.PI * 2);
    ctx.fill();
    // Crisp solid core
    ctx.fillStyle = "rgba(255,255,255,1)";
    ctx.beginPath();
    ctx.arc(c, c, c * 0.5, 0, Math.PI * 2);
    ctx.fill();
    return new THREE.CanvasTexture(canvas);
  }, []);

  // Target positions — updated when shape changes, spring physics animates particles toward them
  const origRef = useRef<Float32Array>(generateShapePositions("sphere", COUNT));

  const { velocities, cloudGeo, starsGeo } = useMemo(() => {
    const initialPos = origRef.current.slice(); // copy sphere positions
    const velocities = new Float32Array(COUNT * 3);
    const colors     = new Float32Array(COUNT * 3);

    const white  = new THREE.Color(WHITE);
    const silver = new THREE.Color(SILVER);
    const dim    = new THREE.Color(DIM);
    const tmp    = new THREE.Color();

    for (let i = 0; i < COUNT; i++) {
      const rnd = Math.random();
      let brightness = 1;
      if (rnd >= 0.56 && rnd < 0.72) brightness = 1.1;
      else if (rnd >= 0.72 && rnd < 0.86) brightness = 0.38;
      else if (rnd >= 0.86) brightness = 0.55;

      tmp.lerpColors(white, silver, Math.pow(Math.random(), 2));
      if (brightness < 1) tmp.multiplyScalar(brightness);
      colors[i*3] = tmp.r; colors[i*3+1] = tmp.g; colors[i*3+2] = tmp.b;
    }
    void dim;

    const posAttr = new THREE.BufferAttribute(new Float32Array(initialPos), 3);
    posAttr.usage = THREE.DynamicDrawUsage;
    const cloudGeo = new THREE.BufferGeometry();
    cloudGeo.setAttribute("position", posAttr);
    cloudGeo.setAttribute("color",    new THREE.BufferAttribute(colors, 3));

    // Stars layer
    const sPos = new Float32Array(S_COUNT * 3);
    const sCol = new Float32Array(S_COUNT * 3);
    for (let i = 0; i < S_COUNT; i++) {
      const phi   = Math.acos(1 - 2 * (i + 0.5) / S_COUNT);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
      const r     = 1.45 + Math.random() * 0.45;
      sPos[i*3]   = r * Math.sin(phi) * Math.cos(theta);
      sPos[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
      sPos[i*3+2] = r * Math.cos(phi);
      tmp.lerpColors(white, silver, Math.random() * 0.35);
      sCol[i*3] = tmp.r; sCol[i*3+1] = tmp.g; sCol[i*3+2] = tmp.b;
    }
    const starsGeo = new THREE.BufferGeometry();
    starsGeo.setAttribute("position", new THREE.BufferAttribute(sPos, 3));
    starsGeo.setAttribute("color",    new THREE.BufferAttribute(sCol, 3));

    return { velocities, cloudGeo, starsGeo };
  }, []);

  // Update target positions when shape changes
  useEffect(() => {
    shapeRef.current = shape;
    const newPos = generateShapePositions(shape, COUNT);
    origRef.current.set(newPos);
  }, [shape]);

  useFrame(({ clock, camera }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();

    // Rotation: sphere spins with wobble; geometric shapes rotate slowly & level
    if (shapeRef.current === "sphere") {
      groupRef.current.rotation.y = t * 0.062;
      groupRef.current.rotation.x = Math.sin(t * 0.038) * 0.14;
    } else {
      groupRef.current.rotation.y = t * 0.018; // slow continuous rotation
      groupRef.current.rotation.x += (0 - groupRef.current.rotation.x) * 0.025;
    }

    const breathe = 1 + Math.sin(t * 0.9) * 0.018;
    groupRef.current.scale.setScalar(breathe);

    mouse2D.set(mouseX, mouseY);
    raycaster.setFromCamera(mouse2D, camera);
    const hit = raycaster.ray.intersectPlane(zeroPlane, worldPt);
    if (hit) groupRef.current.worldToLocal(localPt.copy(worldPt));
    else     localPt.set(99999, 99999, 99999);

    const mx  = localPt.x, my = localPt.y, mz = localPt.z;
    const pa  = cloudGeo.attributes.position;
    const pos = pa.array as Float32Array;
    const orig = origRef.current;
    const rr  = REPEL_RADIUS * REPEL_RADIUS;

    for (let i = 0; i < COUNT; i++) {
      const ix = i * 3, iy = ix + 1, iz = ix + 2;
      const px = pos[ix], py = pos[iy], pz = pos[iz];

      const dx = px - mx, dy = py - my, dz = pz - mz;
      const dSq = dx*dx + dy*dy + dz*dz;

      let fx = 0, fy = 0, fz = 0;
      if (dSq < rr && dSq > 1e-6) {
        const d   = Math.sqrt(dSq);
        const str = 1 - d / REPEL_RADIUS;
        const f   = str * str * REPEL_STRENGTH;
        fx = (dx / d) * f;
        fy = (dy / d) * f;
        fz = (dz / d) * f;
      }

      // Click explode
      if (explodeRef.current) {
        const ex = px - explodeRef.current.x;
        const ey = py - explodeRef.current.y;
        const ez = pz - explodeRef.current.z;
        const eSq = ex*ex + ey*ey + ez*ez;
        const EXPLODE_R = 1.8;
        if (eSq < EXPLODE_R * EXPLODE_R && eSq > 1e-6) {
          const ed  = Math.sqrt(eSq);
          const str = (1 - ed / EXPLODE_R) * 0.38;
          fx += (ex / ed) * str;
          fy += (ey / ed) * str;
          fz += (ez / ed) * str;
        }
      }

      fx += (orig[ix] - px) * SPRING;
      fy += (orig[iy] - py) * SPRING;
      fz += (orig[iz] - pz) * SPRING;

      velocities[ix] = (velocities[ix] + fx) * DAMPING;
      velocities[iy] = (velocities[iy] + fy) * DAMPING;
      velocities[iz] = (velocities[iz] + fz) * DAMPING;

      pos[ix] += velocities[ix];
      pos[iy] += velocities[iy];
      pos[iz] += velocities[iz];
    }

    pa.needsUpdate = true;
    // Clear explode after one frame
    if (explodeRef.current) explodeRef.current = null;
  });

  return (
    <group ref={groupRef}
      onPointerDown={(e) => {
        if (!groupRef.current) return;
        const pt = new THREE.Vector3();
        if (e.ray.intersectPlane(zeroPlane, pt)) {
          const local = groupRef.current.worldToLocal(pt.clone());
          explodeRef.current = local;
        }
      }}
    >
      <points geometry={cloudGeo}>
        <pointsMaterial
          size={0.020}
          color={accentColor}
          vertexColors
          transparent
          opacity={0.94}
          sizeAttenuation
          depthWrite={false}
          map={circleTexture}
          alphaTest={0.01}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <points geometry={starsGeo}>
        <pointsMaterial
          size={0.048}
          vertexColors
          transparent
          opacity={0.98}
          sizeAttenuation
          depthWrite={false}
          map={circleTexture}
          alphaTest={0.01}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Invisible plane to catch pointer events */}
      <mesh>
        <planeGeometry args={[20, 20]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  );
}
