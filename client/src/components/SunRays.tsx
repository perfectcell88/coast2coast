/**
 * SunRays — subtle animated sun overlay
 *
 * Very gentle shimmer on the existing sun rays in heroboat.jpg.
 * Sun is at ~30% x, ~58% y of the hero viewport.
 * Low opacity, slow animation — just enough to feel alive.
 */

import { useEffect, useRef } from "react";

const SUN_X = 30;
const SUN_Y = 58;

// Minimal set of rays — matching the main angles visible in the photo
const RAYS = [
  { angle: -42, length: 90, width: 1.6, opacity: 0.18, dur: 7.0, delay: 0.0 },
  { angle: -22, length: 95, width: 2.0, opacity: 0.22, dur: 8.5, delay: 1.2 },
  { angle: -6,  length: 92, width: 1.8, opacity: 0.20, dur: 7.8, delay: 0.5 },
  { angle: 10,  length: 88, width: 1.4, opacity: 0.16, dur: 9.0, delay: 2.0 },
  { angle: 28,  length: 82, width: 1.2, opacity: 0.14, dur: 8.2, delay: 1.5 },
];

function degToRad(deg: number) {
  return (deg * Math.PI) / 180;
}

export default function SunRays() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const startRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = (ts - startRef.current) / 1000;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const sx = (SUN_X / 100) * W;
      const sy = (SUN_Y / 100) * H;

      // Soft warm bloom — very subtle, slow pulse
      const bloomPulse = 0.5 + 0.5 * Math.sin(elapsed * 0.35);
      const bloomRadius = W * (0.18 + bloomPulse * 0.02);
      const bloom = ctx.createRadialGradient(sx, sy, 0, sx, sy, bloomRadius);
      bloom.addColorStop(0,   `rgba(255, 210, 100, ${0.07 + bloomPulse * 0.03})`);
      bloom.addColorStop(0.4, `rgba(255, 170, 50,  ${0.04 + bloomPulse * 0.01})`);
      bloom.addColorStop(1,   "rgba(255, 140, 20, 0)");
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      ctx.fillStyle = bloom;
      ctx.fillRect(0, 0, W, H);
      ctx.restore();

      // Individual rays — slow shimmer
      RAYS.forEach((ray) => {
        const pulse = 0.5 + 0.5 * Math.sin((elapsed / ray.dur) * Math.PI * 2 + ray.delay);
        const currentOpacity = ray.opacity * (0.5 + pulse * 0.5);

        const rad = degToRad(ray.angle - 90);
        const rayLength = (ray.length / 100) * Math.max(W, H);
        const ex = sx + Math.cos(rad) * rayLength;
        const ey = sy + Math.sin(rad) * rayLength;

        const gradient = ctx.createLinearGradient(sx, sy, ex, ey);
        gradient.addColorStop(0,    `rgba(255, 220, 130, ${currentOpacity})`);
        gradient.addColorStop(0.2,  `rgba(255, 200, 90,  ${currentOpacity * 0.6})`);
        gradient.addColorStop(0.6,  `rgba(255, 180, 60,  ${currentOpacity * 0.2})`);
        gradient.addColorStop(1,    "rgba(255, 160, 40, 0)");

        ctx.save();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = ray.width * (W / 1440);
        ctx.lineCap = "round";
        ctx.globalCompositeOperation = "screen";
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(ex, ey);
        ctx.stroke();
        ctx.restore();
      });

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 2, mixBlendMode: "screen" }}
    />
  );
}
