/**
 * ThailandRouteMap — Enhanced Premium Version
 *
 * SVG map of Thailand's southern peninsula with:
 *  - Land fill with subtle texture
 *  - Glowing animated route paths (straightened)
 *  - Pulsing city pins
 *  - Animated route drawing
 *  - Sea labels and decorative elements
 *  - Singapore dotted sea route showing traditional shipping route (permanent overlay on all routes)
 *  - Navigation arrows to scan through routes
 *
 * SVG viewBox: -50 -50 500 600 (zoomed out to show more sea and context)
 */

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Coastline paths (scaled to expanded viewBox) ─────────────────────────────

/** Gulf of Thailand coastline — Chumphon down to Chumphon */
const GULF_COAST =
  "M 215,48 C 220,72 224,98 226,125 C 228,152 226,175 222,198 C 218,220 210,242 200,260 C 193,272 186,280 178,286";

/** Andaman Sea coastline — Myanmar border down to Phuket */
const ANDAMAN_COAST =
  "M 72,100 C 74,124 77,148 82,172 C 86,192 90,208 94,224 C 97,238 99,248 100,258 C 102,274 106,294 112,314 C 118,334 126,354 134,372 C 138,384 140,396 140,408";

/**
 * Thailand land mass — accurate outline derived from Natural Earth GeoJSON
 * Projection: linear lon/lat, bounds lon 97.5–102.5, lat 5.5–14.5
 * Scaled to 320×480 viewBox (factor 0.8 from 400×600)
 */
const LAND_FILL =
  "M 318.3,125.4 L 306.6,123.0 L 304.9,117.9 L 308.2,117.8 L 311.0,114.8 L 309.6,113.3 L 310.1,115.0 L 306.6,116.4 L 307.4,110.6 L 305.3,112.4 L 305.3,109.8 L 300.9,110.2 L 305.5,115.9 L 302.6,116.1 L 292.6,107.3 L 295.2,104.6 L 288.6,103.2 L 292.2,105.4 L 291.7,108.3 L 288.6,104.9 L 285.5,104.6 L 284.8,101.0 L 284.6,105.1 L 274.1,95.9 L 269.1,95.6 L 265.1,98.6 L 253.8,99.6 L 250.8,101.6 L 229.6,97.0 L 223.3,98.7 L 222.4,101.4 L 219.3,100.3 L 218.7,98.0 L 214.9,98.6 L 215.4,95.9 L 213.6,95.6 L 218.9,90.1 L 215.4,84.3 L 219.8,79.8 L 216.2,74.7 L 220.5,69.3 L 218.4,64.3 L 222.8,60.9 L 223.8,53.5 L 216.9,55.0 L 203.5,52.9 L 197.9,50.4 L 198.2,47.4 L 195.6,52.7 L 181.6,54.3 L 177.6,52.5 L 163.4,58.0 L 157.5,64.4 L 164.7,71.8 L 166.6,77.0 L 157.4,97.7 L 160.8,113.7 L 158.9,118.9 L 161.3,123.0 L 149.2,137.4 L 148.3,147.1 L 144.1,148.8 L 137.0,158.7 L 132.4,168.9 L 133.5,176.2 L 129.8,176.7 L 127.8,179.6 L 128.7,193.8 L 124.4,193.6 L 119.9,203.7 L 116.1,205.5 L 114.5,210.0 L 111.4,212.2 L 113.2,212.9 L 111.4,215.6 L 114.5,218.0 L 114.2,220.6 L 105.7,221.0 L 106.8,224.6 L 112.3,227.5 L 108.9,228.8 L 105.7,234.5 L 107.4,238.6 L 105.4,252.4 L 110.3,264.4 L 116.7,272.5 L 111.0,275.4 L 111.0,278.5 L 112.3,281.0 L 120.2,283.0 L 126.4,282.6 L 130.3,278.3 L 140.2,276.5 L 150.6,277.6 L 154.9,288.7 L 157.9,314.4 L 169.2,325.9 L 171.9,325.5 L 170.6,319.9 L 168.4,319.2 L 174.1,322.7 L 177.4,329.8 L 188.2,374.6 L 196.7,389.6 L 187.2,385.8 L 185.0,369.8 L 180.8,369.4 L 177.4,371.7 L 181.0,365.0 L 179.7,359.6 L 177.3,357.6 L 173.4,358.3 L 169.1,362.6 L 171.8,372.6 L 177.8,380.7 L 183.7,382.2 L 184.6,385.8 L 187.3,386.9 L 185.1,388.2 L 187.9,391.4 L 195.6,392.3 L 197.4,388.0 L 209.0,400.9 L 214.4,402.0 L 223.8,407.7 L 236.2,407.4 L 239.6,405.2 L 246.5,406.6 L 240.8,403.0 L 242.6,402.4 L 259.7,408.4 L 273.4,426.6 L 292.6,439.6 L 291.8,448.2 L 283.8,454.3 L 282.4,460.8 L 275.2,467.2 L 270.5,464.7 L 266.6,465.8 L 264.6,461.0 L 259.7,458.1 L 239.9,464.7 L 237.6,470.3 L 231.8,473.0 L 221.8,464.4 L 225.0,458.7 L 229.0,456.6 L 230.0,448.7 L 227.4,446.2 L 229.7,443.3 L 229.2,440.2 L 222.3,438.8 L 213.3,440.7 L 211.5,431.2 L 207.0,429.0 L 206.7,427.0 L 200.4,429.6 L 184.8,425.5 L 181.0,423.6 L 176.9,416.0 L 170.6,416.2 L 170.7,423.1 L 168.2,429.8 L 165.8,427.4 L 166.6,424.9 L 164.1,426.3 L 159.4,421.4 L 157.7,421.7 L 157.5,418.1 L 151.5,412.6 L 139.9,406.6 L 141.7,403.1 L 139.4,398.6 L 143.8,393.3 L 139.4,393.4 L 139.0,390.9 L 135.3,392.7 L 131.7,389.4 L 130.9,385.8 L 134.6,379.9 L 131.2,383.9 L 128.6,379.4 L 126.2,385.0 L 120.2,382.9 L 117.5,379.5 L 117.1,373.1 L 114.9,373.0 L 114.7,366.9 L 112.0,366.5 L 112.4,365.0 L 104.3,359.1 L 101.8,363.1 L 98.2,361.4 L 97.0,356.6 L 100.0,354.2 L 100.5,350.6 L 97.8,351.8 L 90.7,343.9 L 86.0,346.5 L 83.2,343.8 L 81.3,345.4 L 79.6,335.2 L 78.6,333.1 L 77.2,334.6 L 77.0,330.7 L 71.9,331.7 L 73.9,326.4 L 70.6,325.5 L 65.7,328.7 L 59.4,329.8 L 61.6,335.1 L 59.2,338.7 L 57.0,339.4 L 50.0,334.6 L 44.8,318.2 L 45.4,315.7 L 48.2,318.2 L 46.1,316.3 L 47.4,311.9 L 46.1,307.9 L 50.7,297.4 L 57.0,291.4 L 53.3,291.9 L 53.1,290.6 L 56.5,289.5 L 52.6,282.2 L 55.8,281.3 L 54.6,279.9 L 61.3,264.1 L 63.1,265.2 L 66.0,263.1 L 61.7,261.1 L 64.9,258.4 L 63.6,255.3 L 66.8,255.7 L 68.2,253.8 L 64.5,253.8 L 64.5,252.0 L 69.3,248.4 L 67.1,250.2 L 64.8,248.7 L 72.4,242.6 L 70.6,240.3 L 78.1,227.8 L 82.6,213.3 L 80.4,204.5 L 85.1,199.3 L 94.9,195.6 L 96.1,189.0 L 99.5,189.6 L 109.6,180.9 L 123.4,160.2 L 124.8,153.9 L 130.7,152.5 L 136.3,143.1 L 131.9,140.1 L 132.7,134.6 L 129.2,131.9 L 130.6,125.8 L 125.0,126.4 L 126.3,123.4 L 120.8,108.5 L 121.8,102.6 L 110.4,95.0 L 105.8,84.6 L 106.6,81.3 L 102.0,77.9 L 102.6,70.9 L 108.2,67.8 L 105.8,41.8 L 102.5,38.5 L 101.8,33.6 L 96.5,29.4 L 91.8,22.1 L 67.0,6.6 L 317.0,50.0 L 308.1,51.1 L 309.0,65.4 L 312.5,72.7 L 319.4,80.2 L 317.8,83.8 L 319.8,98.5 Z";

/** Phuket island — accurate GeoJSON outline */
const PHUKET_ISLAND =
  "M 58.8,351.8 L 60.2,352.7 L 57.6,353.9 L 57.4,356.6 L 54.0,355.6 L 52.6,358.9 L 50.6,358.6 L 50.2,351.8 L 48.2,350.5 L 50.0,346.5 L 50.0,336.4 L 53.1,337.6 L 54.0,340.9 L 60.1,342.2 L 57.4,348.2 L 58.8,351.8 Z";

// ─── Per-route animated path data ────────────────────────────────────────────
// All coordinates use exact geographic positions (scaled to 320×480 viewBox):
//   Pattaya:  x=216.5, y=84.1
//   Chumphon: x=107.5, y=213.7
//   Ranong:   x=71.0,  y=242.5
//   Phuket:   x=57.1,  y=353.0

const LAND_BRIDGE = "M 107.5,213.7 L 71.0,242.5";

// Singapore sea routes — wraps around the southernmost point of the peninsula WITHOUT touching land
// Each route has its own Singapore alternative showing what the traditional long sea route would be
const SINGAPORE_ROUTES: Record<string, string> = {
  "pattaya-phuket": "M 216.5,84.1 C 280,60 340,80 360,160 C 370,220 360,300 320,380 C 280,420 140,440 57.1,353.0",
  "phuket-pattaya": "M 57.1,353.0 C 140,440 280,420 320,380 C 360,300 370,220 360,160 C 340,80 280,60 216.5,84.1",
  "chumphon-phuket": "M 107.5,213.7 C 180,180 300,160 360,240 C 370,300 340,360 260,400 C 140,440 57.1,353.0 57.1,353.0",
  "phuket-chumphon": "M 57.1,353.0 C 140,440 260,400 340,360 C 360,300 370,240 360,240 C 300,160 180,180 107.5,213.7",
  "ranong-pattaya": "M 71.0,242.5 C 120,220 280,140 360,160 C 380,180 360,240 340,300 C 300,360 216.5,84.1 216.5,84.1",
  "pattaya-ranong": "M 216.5,84.1 C 300,360 340,300 360,240 C 380,180 360,160 280,140 C 120,220 71.0,242.5 71.0,242.5",
};

// Route paths now STRAIGHTENED (direct lines instead of curves):
const ROUTES_DATA = [
  {
    label: "Pattaya → Phuket",
    // Straightened Gulf leg: direct line from Pattaya to Chumphon
    gulfSea: "M 216.5,84.1 L 107.5,213.7",
    landBridge: LAND_BRIDGE,
    // Straightened Andaman leg: direct line from Ranong to Phuket
    andamanSea: "M 71.0,242.5 L 57.1,353.0",
    singaporeRoute: SINGAPORE_ROUTES["pattaya-phuket"],
    originPin: "pattaya",
    destPin: "phuket",
    direction: "forward" as const,
  },
  {
    label: "Phuket → Pattaya",
    gulfSea: "M 107.5,213.7 L 216.5,84.1",
    landBridge: "M 71.0,242.5 L 107.5,213.7",
    andamanSea: "M 57.1,353.0 L 71.0,242.5",
    singaporeRoute: SINGAPORE_ROUTES["phuket-pattaya"],
    originPin: "phuket",
    destPin: "pattaya",
    direction: "reverse" as const,
  },
  {
    label: "Chumphon → Phuket",
    // No Gulf leg needed — starts at Chumphon
    gulfSea: "M 107.5,213.7 C 107.5,213.7 107.5,213.7 107.5,213.7",
    landBridge: LAND_BRIDGE,
    andamanSea: "M 71.0,242.5 L 57.1,353.0",
    singaporeRoute: SINGAPORE_ROUTES["chumphon-phuket"],
    originPin: "chumphon",
    destPin: "phuket",
    direction: "forward" as const,
  },
  {
    label: "Phuket → Chumphon",
    gulfSea: "M 107.5,213.7 C 107.5,213.7 107.5,213.7 107.5,213.7",
    landBridge: "M 71.0,242.5 L 107.5,213.7",
    andamanSea: "M 57.1,353.0 L 71.0,242.5",
    singaporeRoute: SINGAPORE_ROUTES["phuket-chumphon"],
    originPin: "phuket",
    destPin: "chumphon",
    direction: "reverse" as const,
  },
  {
    label: "Ranong → Pattaya",
    gulfSea: "M 107.5,213.7 L 216.5,84.1",
    landBridge: "M 71.0,242.5 L 107.5,213.7",
    // No Andaman leg — starts at Ranong
    andamanSea: "M 71.0,242.5 C 71.0,242.5 71.0,242.5 71.0,242.5",
    singaporeRoute: SINGAPORE_ROUTES["ranong-pattaya"],
    originPin: "ranong",
    destPin: "pattaya",
    direction: "reverse" as const,
  },
  {
    label: "Pattaya → Ranong",
    gulfSea: "M 216.5,84.1 L 107.5,213.7",
    landBridge: LAND_BRIDGE,
    // No Andaman leg — ends at Ranong
    andamanSea: "M 71.0,242.5 C 71.0,242.5 71.0,242.5 71.0,242.5",
    singaporeRoute: SINGAPORE_ROUTES["pattaya-ranong"],
    originPin: "pattaya",
    destPin: "ranong",
    direction: "forward" as const,
  },
];

// ─── Pin definitions ──────────────────────────────────────────────────────
// Exact geographic positions derived from real lat/lon coordinates
// REMOVED Bangkok — no longer part of active routes
const ALL_PINS: Record<string, { x: number; y: number; label: string; side: "left" | "right" }> = {
  pattaya:  { x: 216.5, y: 84.1,  label: "Pattaya",  side: "right" },
  chumphon: { x: 107.5, y: 213.7, label: "Chumphon", side: "right" },
  ranong:   { x: 71.0,  y: 242.5, label: "Ranong",   side: "left"  },
  phuket:   { x: 57.1,  y: 353.0, label: "Phuket",   side: "left"  },
};

// ─── Animation variants ───────────────────────────────────────────────────────
const drawPath = (delay = 0, duration = 1.6) => ({
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { delay, duration, ease: "easeInOut" as const },
  },
});

const popIn = (delay = 0) => ({
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { delay, duration: 0.4, type: "spring" as const, stiffness: 260, damping: 20 },
  },
});

// ─── Component ────────────────────────────────────────────────────────────────
export default function ThailandRouteMap({
  activeRoute,
  onPrev,
  onNext,
  totalRoutes,
}: {
  activeRoute: number;
  onPrev?: () => void;
  onNext?: () => void;
  totalRoutes?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    setAnimKey((k) => k + 1);
  }, [activeRoute]);

  const route = ROUTES_DATA[activeRoute];
  const isForward = route.direction === "forward";
  const visiblePins = Array.from(
    new Set(["chumphon", "ranong", route.originPin, route.destPin])
  );
  const shouldAnimate = inView;

  return (
    <div ref={ref} className="flex flex-col items-center gap-4 w-full relative">
      {/* ── In-map navigation arrows ── */}
      {onPrev && (
        <button
          onClick={onPrev}
          aria-label="Previous route"
          className="absolute z-20 flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{
            left: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "rgba(0,200,200,0.15)",
            border: "1px solid rgba(0,200,200,0.35)",
            backdropFilter: "blur(6px)",
            color: "#00c8c8",
            boxShadow: "0 0 12px rgba(0,200,200,0.2)",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7L9 12" stroke="#00c8c8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
      {onNext && (
        <button
          onClick={onNext}
          aria-label="Next route"
          className="absolute z-20 flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "rgba(0,200,200,0.15)",
            border: "1px solid rgba(0,200,200,0.35)",
            backdropFilter: "blur(6px)",
            color: "#00c8c8",
            boxShadow: "0 0 12px rgba(0,200,200,0.2)",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5 2L10 7L5 12" stroke="#00c8c8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
      {/* Route indicator dots */}
      {totalRoutes && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
          {Array.from({ length: totalRoutes }).map((_, i) => (
            <div
              key={i}
              style={{
                width: i === activeRoute ? "18px" : "6px",
                height: "6px",
                borderRadius: "3px",
                background: i === activeRoute ? "#00c8c8" : "rgba(0,200,200,0.3)",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={animKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full"
        >
          <svg
            viewBox="-50 -50 500 600"
            className="w-full max-w-2xl mx-auto"
            style={{
              filter: "drop-shadow(0 0 20px rgba(0,200,200,0.15))",
              aspectRatio: "400 / 500",
            }}
          >
            <defs>
              {/* Glow filters */}
              <filter id="glow-teal">
                <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="glow-pin">
                <feGaussianBlur stdDeviation="1.2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Arrow markers */}
              <marker id="arrow-teal" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" fill="#00c8c8" />
              </marker>
              <marker id="arrow-gold" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" fill="#f59e0b" />
              </marker>

              {/* Animated dash pattern for Singapore route */}
              <style>{`
                @keyframes dashAnimation {
                  to {
                    stroke-dashoffset: -20;
                  }
                }
                .singapore-route-animated {
                  animation: dashAnimation 20s linear infinite;
                }
              `}</style>
            </defs>

            {/* ── Sea background ── */}
            <rect x="-50" y="-50" width="500" height="600" fill="#0f172a" />

            {/* ── Land ── */}
            <motion.path
              d={LAND_FILL}
              fill="#1e3a3a"
              stroke="rgba(0,200,200,0.2)"
              strokeWidth="0.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            />

            {/* ── Phuket Island ── */}
            <motion.path
              d={PHUKET_ISLAND}
              fill="#1e3a3a"
              stroke="rgba(0,200,200,0.2)"
              strokeWidth="0.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            />

            {/* ── Singapore sea route (animated dotted, PERMANENT OVERLAY on all routes) ── */}
            {shouldAnimate && route.singaporeRoute && (
              <motion.path
                d={route.singaporeRoute}
                fill="none"
                stroke="#fbbf24"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="8 6"
                opacity={0.6}
                className="singapore-route-animated"
                initial="hidden"
                animate="visible"
                variants={drawPath(0.2, 2.4)}
              />
            )}

            {/* ── Gulf Sea route ── */}
            {shouldAnimate && route.gulfSea && (
              <>
                <motion.path
                  d={route.gulfSea}
                  fill="none"
                  stroke="#00c8c8"
                  strokeWidth="3"
                  strokeLinecap="round"
                  markerEnd={isForward ? "url(#arrow-teal)" : undefined}
                  markerStart={isForward ? undefined : "url(#arrow-teal)"}
                  initial="hidden"
                  animate="visible"
                  variants={drawPath(0.6, 1.2)}
                  filter="url(#glow-teal)"
                />
                <motion.path
                  d={route.gulfSea}
                  fill="none"
                  stroke="#00c8c8"
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity={0.25}
                  initial="hidden"
                  animate="visible"
                  variants={drawPath(0.6, 1.2)}
                />
              </>
            )}

            {/* ── Land Bridge route ── */}
            {shouldAnimate && route.landBridge && (
              <>
                <motion.path
                  d={route.landBridge}
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="6 5"
                  markerEnd={isForward ? "url(#arrow-gold)" : undefined}
                  markerStart={isForward ? undefined : "url(#arrow-gold)"}
                  initial="hidden"
                  animate="visible"
                  variants={drawPath(1.2, 1.0)}
                  filter="url(#glow-teal)"
                />
                <motion.path
                  d={route.landBridge}
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="6 5"
                  opacity={0.25}
                  initial="hidden"
                  animate="visible"
                  variants={drawPath(1.2, 1.0)}
                />
              </>
            )}

            {/* ── Andaman Sea route ── */}
            {shouldAnimate && route.andamanSea && (
              <>
                <motion.path
                  d={route.andamanSea}
                  fill="none"
                  stroke="#00c8c8"
                  strokeWidth="3"
                  strokeLinecap="round"
                  markerEnd={isForward ? "url(#arrow-teal)" : undefined}
                  markerStart={isForward ? undefined : "url(#arrow-teal)"}
                  initial="hidden"
                  animate="visible"
                  variants={drawPath(1.4, 1.2)}
                  filter="url(#glow-teal)"
                />
                <motion.path
                  d={route.andamanSea}
                  fill="none"
                  stroke="#00c8c8"
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity={0.25}
                  initial="hidden"
                  animate="visible"
                  variants={drawPath(1.4, 1.2)}
                />
              </>
            )}

            {/* ── City pins ── */}
            {visiblePins.map((pinId, i) => {
              const pin = ALL_PINS[pinId];
              if (!pin) return null;
              const isOrigin = pinId === route.originPin;
              const isDest   = pinId === route.destPin;
              const isLandBridge = pinId === "chumphon" || pinId === "ranong";
              const color = isLandBridge ? "#f59e0b" : (isOrigin || isDest) ? "#00c8c8" : "#94a3b8";
              const outerR = isOrigin || isDest ? 11 : 8;
              const innerR = isOrigin || isDest ? 6 : 5;
              const labelSize = isOrigin || isDest ? 12 : 11;

              return shouldAnimate ? (
                <motion.g
                  key={pinId}
                  initial="hidden"
                  animate="visible"
                  variants={popIn(0.3 + i * 0.18)}
                >
                  {/* Outer pulse ring */}
                  <motion.circle
                    cx={pin.x} cy={pin.y} r={outerR + 6}
                    fill="none"
                    stroke={color}
                    strokeWidth="1"
                    opacity={0}
                    animate={{ opacity: [0, 0.5, 0], r: [outerR + 4, outerR + 12, outerR + 4] }}
                    transition={{ delay: 1.8 + i * 0.2, duration: 2.5, repeat: Infinity, ease: "easeOut" }}
                  />
                  {/* Glow halo */}
                  <circle cx={pin.x} cy={pin.y} r={outerR + 4} fill={color} opacity="0.12" />
                  {/* Outer ring */}
                  <circle cx={pin.x} cy={pin.y} r={outerR} fill={color} opacity="0.25" />
                  {/* Main dot */}
                  <circle cx={pin.x} cy={pin.y} r={innerR} fill={color} filter="url(#glow-pin)" />
                  {/* White centre */}
                  <circle cx={pin.x} cy={pin.y} r={innerR - 2.5} fill="white" opacity="0.9" />

                  {/* City name */}
                  <text
                    x={pin.side === "right" ? pin.x + outerR + 6 : pin.x - outerR - 6}
                    y={pin.y + 4}
                    fontSize={labelSize}
                    fontWeight={isOrigin || isDest ? "700" : "600"}
                    fill={color}
                    textAnchor={pin.side === "right" ? "start" : "end"}
                    fontFamily="system-ui, sans-serif"
                    style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}
                  >
                    {pin.label}
                  </text>

                  {/* Origin/Destination badge */}
                  {(isOrigin || isDest) && (
                    <text
                      x={pin.side === "right" ? pin.x + outerR + 6 : pin.x - outerR - 6}
                      y={pin.y + 17}
                      fontSize="8"
                      fill={color}
                      opacity="0.65"
                      textAnchor={pin.side === "right" ? "start" : "end"}
                      fontFamily="system-ui, sans-serif"
                    >
                      {isOrigin ? "▶ Origin" : "▶ Destination"}
                    </text>
                  )}
                </motion.g>
              ) : (
                <g key={pinId} opacity="0" />
              );
            })}

            {/* ── Compass rose (decorative) ── */}
            <g opacity="0.18" transform="translate(36, 36)">
              <circle cx="0" cy="0" r="14" fill="none" stroke="#38bdf8" strokeWidth="0.8" />
              <circle cx="0" cy="0" r="10" fill="none" stroke="#38bdf8" strokeWidth="0.5" />
              <line x1="0" y1="-14" x2="0" y2="14" stroke="#38bdf8" strokeWidth="0.8" />
              <line x1="-14" y1="0" x2="14" y2="0" stroke="#38bdf8" strokeWidth="0.8" />
              <polygon points="0,-14 -3,-6 0,-9 3,-6" fill="#38bdf8" opacity="0.8" />
              <text x="0" y="-17" fontSize="6" fill="#38bdf8" textAnchor="middle" fontFamily="monospace">N</text>
            </g>

          </svg>
        </motion.div>
      </AnimatePresence>

      {/* ── Legend ── */}
      <div className="flex flex-col items-center justify-center gap-3 mt-4">
        {[
          { color: "#00c8c8", dash: "8 5", label: "Sea route" },
          { color: "#f59e0b", dash: "6 5", label: "80 km overland" },
          { color: "#fbbf24", dash: "8 6", label: "Traditional sea route (via Singapore)" },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-2">
            <svg width="26" height="8" viewBox="0 0 26 8">
              <line x1="0" y1="4" x2="26" y2="4"
                stroke={l.color} strokeWidth="2.5"
                strokeDasharray={l.dash} strokeLinecap="round"
              />
            </svg>
            <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.55)" }}>{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
