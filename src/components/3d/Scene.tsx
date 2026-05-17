"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import { AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import ParticleField from "./ParticleField";
import type { ShapeName } from "@/lib/shapes";

interface SceneProps {
  mouseX: number;
  mouseY: number;
  shape: ShapeName;
}

function CameraRig({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  useFrame(({ camera }) => {
    camera.position.x += (mouseX * 0.14 - camera.position.x) * 0.028;
    camera.position.y += (0.1 + mouseY * 0.08 - camera.position.y) * 0.028;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function Scene({ mouseX, mouseY, shape }: SceneProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.1, 4.5], fov: 58, near: 0.1, far: 100 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      style={{ background: "transparent", width: "100%", height: "100%" }}
    >
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />

      <Suspense fallback={null}>
        <CameraRig mouseX={mouseX} mouseY={mouseY} />
        <ParticleField mouseX={mouseX} mouseY={mouseY} shape={shape} />

        <EffectComposer>
          <Bloom
            intensity={1.8}
            luminanceThreshold={0.04}
            luminanceSmoothing={0.92}
            mipmapBlur
          />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
