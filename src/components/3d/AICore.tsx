"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

const ORANGE   = "#f97316";
const ORANGE_D = "#ea580c";
const AMBER    = "#fbbf24";

interface AICoreProps { mouseX: number; mouseY: number; }

export default function AICore({ mouseX, mouseY }: AICoreProps) {
  const groupRef  = useRef<THREE.Group>(null);
  const coreRef   = useRef<THREE.Mesh>(null);
  const ring1Ref  = useRef<THREE.Mesh>(null);
  const ring2Ref  = useRef<THREE.Mesh>(null);
  const ring3Ref  = useRef<THREE.Mesh>(null);
  const outerRef  = useRef<THREE.Mesh>(null);
  const target    = useRef({ x: 0, y: 0 });

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const lerp = (a: number, b: number, f: number) => a + (b - a) * f;

    target.current.x = lerp(target.current.x, mouseY * 0.35, 0.04);
    target.current.y = lerp(target.current.y, mouseX * 0.35, 0.04);

    if (groupRef.current) {
      groupRef.current.rotation.x = target.current.x;
      groupRef.current.rotation.y = t * 0.14 + target.current.y;
    }
    if (coreRef.current) {
      coreRef.current.rotation.x = t * 0.28;
      coreRef.current.rotation.z = t * 0.18;
      const p = 1 + Math.sin(t * 2.2) * 0.025;
      coreRef.current.scale.setScalar(p);
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.38;
      ring1Ref.current.rotation.x = Math.sin(t * 0.28) * 0.28;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.24;
      ring2Ref.current.rotation.y = t * 0.18;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = t * 0.32;
      ring3Ref.current.rotation.y = -t * 0.14;
    }
    if (outerRef.current) {
      outerRef.current.rotation.y = t * 0.09;
      outerRef.current.rotation.x = t * 0.065;
    }
  });

  return (
    <group ref={groupRef}>
      <pointLight position={[3, 3, 3]} intensity={2.5} color={ORANGE} distance={10} />
      <pointLight position={[-3, -2, -2]} intensity={1.2} color={AMBER} distance={8} />
      <ambientLight intensity={0.08} />

      {/* Crystal core */}
      <Float speed={1.4} rotationIntensity={0.18} floatIntensity={0.28}>
        <mesh ref={coreRef}>
          <icosahedronGeometry args={[0.68, 1]} />
          <MeshTransmissionMaterial
            backside samples={6} thickness={0.5}
            roughness={0.04} transmission={0.95} ior={1.5}
            chromaticAberration={0.07} distortion={0.28} distortionScale={0.5}
            temporalDistortion={0.1}
            color={ORANGE} attenuationColor={AMBER} attenuationDistance={0.6}
          />
        </mesh>
      </Float>

      {/* Inner glow sphere */}
      <mesh>
        <sphereGeometry args={[0.32, 32, 32]} />
        <meshStandardMaterial
          color={ORANGE} emissive={ORANGE} emissiveIntensity={2.5}
          transparent opacity={0.55} roughness={0} metalness={0}
        />
      </mesh>

      {/* Ring 1 — equatorial */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.05, 0.011, 16, 120]} />
        <meshStandardMaterial color={ORANGE} emissive={ORANGE} emissiveIntensity={3} metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Ring 2 — tilted */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.28, 0.007, 16, 120]} />
        <meshStandardMaterial color={AMBER} emissive={AMBER} emissiveIntensity={2} metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Ring 3 — perpendicular */}
      <mesh ref={ring3Ref} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[1.48, 0.005, 16, 120]} />
        <meshStandardMaterial color={ORANGE_D} emissive={ORANGE_D} emissiveIntensity={1.4}
          transparent opacity={0.55} metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Outer wireframe */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1.75, 1]} />
        <meshStandardMaterial color={ORANGE} emissive={ORANGE} emissiveIntensity={0.25} wireframe transparent opacity={0.12} />
      </mesh>

      {/* Orbiting nodes */}
      {Array.from({ length: 6 }, (_, i) => <OrbNode key={i} index={i} />)}

      <Sparkles count={55} scale={5} size={1.1} speed={0.28} opacity={0.45} color={ORANGE} />
      <Sparkles count={25} scale={3.5} size={0.7} speed={0.45} opacity={0.35} color={AMBER} />
      {/* Wide ambient field for full-screen fill */}
      <Sparkles count={90} scale={18} size={0.4} speed={0.08} opacity={0.12} color={ORANGE} />
    </group>
  );
}

function OrbNode({ index }: { index: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!ref.current) return;
    const a = (index / 6) * Math.PI * 2 + t * 0.48;
    ref.current.position.set(Math.cos(a) * 1.35, Math.sin(t * 0.75 + index * 1.2) * 0.28, Math.sin(a) * 1.35);
    ref.current.scale.setScalar((1 + Math.sin(t * 3 + index) * 0.18) * 0.075);
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1, 12, 12]} />
      <meshStandardMaterial
        color={index % 2 === 0 ? "#f97316" : "#fbbf24"}
        emissive={index % 2 === 0 ? "#f97316" : "#fbbf24"}
        emissiveIntensity={4} roughness={0} metalness={0}
      />
    </mesh>
  );
}
