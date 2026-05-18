"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  alpha: number;
  size: number;
  vx: number;
  vy: number;
}

export default function CursorTrail() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const particles  = useRef<Particle[]>([]);
  const rafId      = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      for (let i = 0; i < 3; i++) {
        particles.current.push({
          x:     e.clientX + (Math.random() - 0.5) * 6,
          y:     e.clientY + (Math.random() - 0.5) * 6,
          alpha: 0.45 + Math.random() * 0.3,
          size:  1.2 + Math.random() * 2,
          vx:    (Math.random() - 0.5) * 0.7,
          vy:    -0.4 - Math.random() * 0.6,
        });
      }
    };
    window.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current = particles.current.filter((p) => p.alpha > 0.015);

      for (const p of particles.current) {
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle   = "#ffffff";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        p.x     += p.vx;
        p.y     += p.vy;
        p.alpha *= 0.86;
        p.size  *= 0.96;
      }

      ctx.globalAlpha = 1;
      rafId.current   = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9998,
        pointerEvents: "none",
      }}
    />
  );
}
