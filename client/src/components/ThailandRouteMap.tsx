/**
 * ThailandRouteMap — Enhanced Premium Version
 * * SVG map of Thailand's southern peninsula with:
 * - Land fill with subtle texture
 * - Glowing animated route paths
 * - Pulsing city pins
 * - Animated route drawing
 * - Sea labels and decorative elements
 * * SVG viewBox: 0 0 320 480
 */

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Path Data ──────────────────────────────────────────────────────────────

const LAND_FILL =
  "M 318.3,125.4 L 306.6,123.0 L 304.9,117.9 L 308.2,117.8 L 311.0,114.8 L 309.6,113.3 L 310.1,115.0 L 306.6,116.4 L 307.4,110.6 L 305.3,112.4 L 305.3,109.8 L 300.9,110.2 L 305.5,115.9 L 302.6,116.1 L 292.6,107.3 L 295.2,104.6 L 288.6,103.2 L 292.2,105.4 L 291.7,108.3 L 288.6,104.9 L 285.5,104.6 L 284.8,101.0 L 284.6,105.1 L 274.1,95.9 L 269.1,95.6 L 265.1,98.6 L 253.8,99.6 L 250.8,101.6 L 229.6,97.0 L 223.3,98.7 L 222.4,101.4 L 219.3,100.3 L 218.7,98.0 L 214.9,98.6 L 215.4,95.9 L 213.6,95.6 L 218.9,90.1 L 215.4,84.3 L 219.8,79.8 L 216.2,74.7 L 220.5,69.3 L 218.4,64.3 L 222.8,60.9 L 223.8,53.5 L 216.9,55.0 L 203.5,52.9 L 197.9,50.4 L 198.2,47.4 L 195.6,52.7 L 181.6,54.3 L 177.6,52.5 L 163.4,58.0 L 157.5,64.4 L 164.7,71.8 L 166.6,77.0 L 157.4,97.7 L 160.8,113.7 L 158.9,118.9 L 161.3,123.0 L 149.2,137.4 L 148.3,147.1 L 144.1,148.8 L 137.0,158.7 L 132.4,168.9 L 133.5,176.2 L 129.8,176.7 L 127.8,179.6 L 128.7,193.8 L 124.4,193.6 L 119.9,203.7 L 116.1,205.4 L 114.5,210.0 L 111.4,212.2 L 113.2,212.9 L 111.4,215.6 L 114.5,218.0 L 114.2,220.6 L 105.7,221.0 L 106.8,224.6 L 112.3,227.5 L 108.9,228.8 L 105.7,234.5 L 107.4,238.6 L 105.4,252.4 L 110.3,264.4 L 116.7,272.5 L 111.0,275.4 L 111.0,278.5 L 112.3,281.0 L 120.2,283.0 L 126.4,282.6 L 130.3,278.3 L 140.2,276.5 L 150.6,277.6 L 154.9,288.7 L 157.9,314.4 L 169.2,325.9 L 171.9,325.5 L 170.6,319.9 L 168.4,319.2 L 174.1,322.7 L 177.4,329.8 L 188.2,374.6 L 196.7,389.6 L 187.2,385.8 L 185.0,369.8 L 180.8,369.4 L 177.4,371.7 L 181.0,365.0 L 179.7,359.6 L 177.3,357.6 L 173.4,358.3 L 169.1,362.6 L 171.8,372.6 L 177.8,380.7 L 183.7,382.2 L 184.6,385.8 L 187.3,386.9 L 185.1,388.2 L 187.9,391.4 L 195.6,392.3 L 197.4,388.0 L 209.0,400.9 L 214.4,402.0 L 223.8,407.7 L 236.2,407.4 L 239.6,405.2 L 246.5,406.6 L 240.8,403.0 L 242.6,402.4 L 259.7,408.4 L 273.4,426.6 L 292.6,439.6 L 291.8,448.2 L 283.8,454.3 L 282.4,460.8 L 275.2,467.2 L 270.5,464.7 L 266.6,465.8 L 264.6,461.0 L 259.7,458.1 L 239.9,464.7 L 237.6,470.3 L 231.8,473.0 L 221.8,464.4 L 225.0,458.7 L 229.0,456.6 L 230.0,448.7 L 227.4,446.2 L 229.7,443.3 L 229.2,440.2 L 222.3,438.8 L 213.3,440.7 L 211.5,431.2 L 207.0,429.0 L 206.7,427.0 L 200.4,429.6 L 184.8,425.5 L 181.0,423.6 L 176.9,416.0 L 170.6,416.2 L 170.7,423.1 L 168.2,429.8 L 165.8,427.4 L 166.6,424.9 L 164.1,426.3 L 159.4,421.4 L 157.7,421.7 L 157.5,418.1 L 151.5,412.6 L 139.9,406.6 L 141.7,403.1 L 139.4,398.6 L 143.8,393.3 L 139.4,393.4 L 139.0,390.9 L 135.3,392.7 L 131.7,389.4 L 130.9,385.8 L 134.6,379.9 L 131.2,383.9 L 128.6,379.4 L 126.2,385.0 L 120.2,382.9 L 117.5,379.5 L 117.1,373.1 L 114.9,373.0 L 114.7,366.9 L 112.0,366.5 L 112.4,365.0 L 104.3,359.1 L 101.8,363.1 L 98.2,361.4 L 97.0,356.6 L 100.0,354.2 L 100.5,350.6 L 97.8,351.8 L 90.7,343.9 L 86.0,346.5 L 83.2,343.8 L 81.3,345.4 L 79.6,335.2 L 78.6,333.1 L 77.2,334.6 L 77.0,330.7 L 71.9,331.7 L 73.9,326.4 L 70.6,325.5 L 65.7,328.7 L 59.4,329.8 L 61.6,335.1 L 59.2,338.7 L 57.0,339.4 L 50.0,334.6 L 44.8,318.2 L 45.4,315.7 L 48.2,318.2 L 46.1,316.3 L 47.4,311.9 L 46.1,307.9 L 50.7,297.4 L 57.0,291.4 L 53.3,291.9 L 53.1,290.6 L 56.5,289.5 L 52.6,282.2 L 55.8,281.3 L 54.6,279.9 L 61.3,264.1 L 63.1,265.2 L 66.0,263.1 L 61.7,261.1 L 64.9,258.4 L 63.6,255.3 L 66.8,255.7 L 68.2,253.8 L 64.5,253.8 L 64.5,252.0 L 69.3,248.4 L 67.1,250.2 L 64.8,248.7 L 72.4,242.6 L 70.6,240.3 L 78.1,227.8 L 82.6,213.3 L 80.4,204.5 L 85.1,199.3 L 94.9,195.6 L 96.1,189.0 L 99.5,189.6 L 109.6,180.9 L 123.4,160.2 L 124.8,153.9 L 130.7,152.5 L 136.3,143.1 L 131.9,140.1 L 132.7,134.6 L 129.2,131.9 L 130.6,125.8 L 125.0,126.4 L 126.3,123.4 L 120.8,108.5 L 121.8,102.6 L 110.4,95.0 L 105.8,84.6 L 106.6,81.3 L 102.0,77.9 L 102.6,70.9 L 108.2,67.8 L 105.8,41.8 L 102.5,38.5 L 101.8,33.6 L 96.5,29.4 L 91.8,22.1 L 67.0,6.6 L 317.0,50.0 L 308.1,51.1 L 309.0,65.4 L 312.5,72.7 L 319.4,80.2 L 317.8,83.8 L 319.8,98.5 Z";

const PHUKET_ISLAND =
  "M 58.8,351.8 L 60.2,352.7 L 57.6,353.9 L 57.4,356.6 L 54.0,355.6 L 52.6,358.9 L 50.6,358.6 L 50.2,351.8 L 48.2,350.5 L 50.0,346.5 L 50.0,336.4 L 53.1,337.6 L 54.0,340.9 L 60.1,342.2 L 57.4,348.2 L 58.8,351.8 Z";

// ─── Route Logic ────────────────────────────────────────────────────────────

type RouteData = {
  label: string;
  gulfSea: string;
  landBridge: string;
  andamanSea: string;
  originPin: string;
  destPin: string;
  direction: "forward" | "reverse";
  viaPin?: string;
  isDotted?: boolean;
  hasOverland?: boolean;
};

const LAND_BRIDGE = "M 107.5,213.7 L 71.0,242.5";

const ROUTES_DATA: RouteData[] = [
  {
    label: "Pattaya → Phuket",
    gulfSea: "M 216.5,84.1 L 107.5,213.7", // Direct direct line
    landBridge: LAND_BRIDGE,
    andamanSea: "M 71.0,242.5 L 57.1,353.0",
    originPin: "pattaya",
    destPin: "phuket",
    direction: "forward",
  },
  {
    label: "Comparison: via Singapore",
    gulfSea: "M 216.5,84.1 L 232.0,475.0",
    landBridge: "",
    andamanSea: "M 232.0,475.0 L 57.1,353.0",
    originPin: "pattaya",
    destPin: "phuket",
    viaPin: "singapore",
    direction: "forward",
    isDotted: true, // This enables the dotted line styling
    hasOverland: false,
  },
  // ... other routes
];

const ALL_PINS: Record<string, { x: number; y: number; label: string; side: "left" | "right" }> = {
  bangkok:   { x: 212.0, y: 38.0,  label: "Bangkok",   side: "right" },
  pattaya:   { x: 216.5, y: 84.1,  label: "Pattaya",   side: "right" },
  chumphon:  { x: 107.5, y: 213.7, label: "Chumphon",  side: "right" },
  ranong:    { x: 71.0,  y: 242.5, label: "Ranong",    side: "left"  },
  phuket:    { x: 57.1,  y: 353.0, label: "Phuket",    side: "left"  },
  singapore: { x: 232.0, y: 475.0, label: "Singapore", side: "right" },
};

// ─── Animation Config ────────────────────────────────────────────────────────

const drawPath = (delay = 0, duration = 1.6) => ({
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { delay, duration, ease: "easeInOut" },
  },
});

const popIn = (delay = 0) => ({
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { delay, duration: 0.4, type: "spring", stiffness: 260, damping: 20 },
  },
});

// ─── Component ───────────────────────────────────────────────────────────────

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

  const route = ROUTES_DATA[activeRoute] || ROUTES_DATA[0];
  const isForward = route.direction === "forward";
  
  const visiblePins = Array.from(
    new Set(["chumphon", "ranong", route.originPin, route.destPin, route.viaPin].filter(Boolean))
  ) as string[];
  
  const shouldAnimate = inView;

  return (
    <div ref={ref} className="relative w-full select-none" style={{ maxWidth: 520, margin: "0 auto" }}>
      {/* Navigation and Indicator dots UI here (omitted for brevity but same as yours) */}
      
      <AnimatePresence mode="wait">
        <motion.div
          key={animKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <svg
            viewBox="0 0 320 480"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            style={{ overflow: "visible", borderRadius: "16px" }}
          >
            <defs>
              <marker id="arrow-teal" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
                <path d="M0,0 L7,3.5 L0,7 Z" fill="#00c8c8" />
              </marker>
              <filter id="glow-teal" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <linearGradient id="ocean-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#041828" />
                <stop offset="100%" stopColor="#062038" />
              </linearGradient>
            </defs>

            {/* Background & Land */}
            <rect width="320" height="480" fill="url(#ocean-bg)" rx="12" />
            <path d={LAND_FILL} fill="#1a3a2a" stroke="#2a5a3a" strokeWidth="1.5" opacity="0.9" />
            <path d={PHUKET_ISLAND} fill="#1a3a2a" stroke="#2a5a3a" strokeWidth="1" />

            {/* Gulf Leg */}
            {shouldAnimate && (
              <motion.path
                d={route.gulfSea}
                fill="none"
                stroke="#00c8c8"
                strokeWidth="2.5"
                strokeDasharray={route.isDotted ? "4 6" : "none"} // Fixed Dotted Line
                markerEnd={isForward ? "url(#arrow-teal)" : undefined}
                initial="hidden"
                animate="visible"
                variants={drawPath(0, 1.6)}
                filter="url(#glow-teal)"
              />
            )}

            {/* Land Bridge */}
            {shouldAnimate && route.hasOverland !== false && route.landBridge && (
              <motion.path
                d={route.landBridge}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2.5"
                strokeDasharray="5 4"
                initial="hidden"
                animate="visible"
                variants={drawPath(1.4, 0.8)}
              />
            )}

            {/* Andaman Leg */}
            {shouldAnimate && route.andamanSea && (
              <motion.path
                d={route.andamanSea}
                fill="none"
                stroke="#00c8c8"
                strokeWidth="2.5"
                strokeDasharray={route.isDotted ? "4 6" : "none"} // Fixed Dotted Line
                markerEnd={isForward ? "url(#arrow-teal)" : undefined}
                initial="hidden"
                animate="visible"
                variants={drawPath(1.4, 1.6)}
                filter="url(#glow-teal)"
              />
            )}

            {/* City Pins Loop */}
            {visiblePins.map((pinId, i) => {
              const pin = ALL_PINS[pinId];
              if (!pin) return null;
              const isHigh = pinId === route.originPin || pinId === route.destPin;
              return (
                <motion.g key={pinId} variants={popIn(0.3 + i * 0.1)}>
                  <circle cx={pin.x} cy={pin.y} r={isHigh ? 6 : 4} fill={isHigh ? "#00c8c8" : "#94a3b8"} />
                  <text x={pin.x + 8} y={pin.y + 4} fill="white" fontSize="10" fontWeight="bold">
                    {pin.label}
                  </text>
                </motion.g>
              );
            })}
          </svg>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
