/**
 * ThailandRouteMap — Full Production Version (v2.4.1)
 * * Optimized for "Coast to Coast Thai Marine Transportation"
 * * UPDATES: 
 * - Fixed: Decorative coastlines converted from Bezier curves to direct "Mechanical" segments.
 * - Fixed: Singapore route dotted line visibility enhanced with higher-contrast dash arrays.
 * - Premium: Added radial atmospheric depth to background and refined grain filters.
 * - Integrity: Zero omissions from the original v2.4.0 script base.
 */

import React, { useRef, useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── GEOMETRIC DATA CONSTANTS ────────────────────────────────────────────────

/**
 * LAND_FILL: High-resolution path data for the Southern Thailand Peninsula.
 * Optimized for fill-opacity and stroke layering.
 */
const LAND_FILL =
  "M 318.3,125.4 L 306.6,123.0 L 304.9,117.9 L 308.2,117.8 L 311.0,114.8 L 309.6,113.3 L 310.1,115.0 L 306.6,116.4 L 307.4,110.6 L 305.3,112.4 L 305.3,109.8 L 300.9,110.2 L 305.5,115.9 L 302.6,116.1 L 292.6,107.3 L 295.2,104.6 L 288.6,103.2 L 292.2,105.4 L 291.7,108.3 L 288.6,104.9 L 285.5,104.6 L 284.8,101.0 L 284.6,105.1 L 274.1,95.9 L 269.1,95.6 L 265.1,98.6 L 253.8,99.6 L 250.8,101.6 L 229.6,97.0 L 223.3,98.7 L 222.4,101.4 L 219.3,100.3 L 218.7,98.0 L 214.9,98.6 L 215.4,95.9 L 213.6,95.6 L 218.9,90.1 L 215.4,84.3 L 219.8,79.8 L 216.2,74.7 L 220.5,69.3 L 218.4,64.3 L 222.8,60.9 L 223.8,53.5 L 216.9,55.0 L 203.5,52.9 L 197.9,50.4 L 198.2,47.4 L 195.6,52.7 L 181.6,54.3 L 177.6,52.5 L 163.4,58.0 L 157.5,64.4 L 164.7,71.8 L 166.6,77.0 L 157.4,97.7 L 160.8,113.7 L 158.9,118.9 L 161.3,123.0 L 149.2,137.4 L 148.3,147.1 L 144.1,148.8 L 137.0,158.7 L 132.4,168.9 L 133.5,176.2 L 129.8,176.7 L 127.8,179.6 L 128.7,193.8 L 124.4,193.6 L 119.9,203.7 L 116.1,205.4 L 114.5,210.0 L 111.4,212.2 L 113.2,212.9 L 111.4,215.6 L 114.5,218.0 L 114.2,220.6 L 105.7,221.0 L 106.8,224.6 L 112.3,227.5 L 108.9,228.8 L 105.7,234.5 L 107.4,238.6 L 105.4,252.4 L 110.3,264.4 L 116.7,272.5 L 111.0,275.4 L 111.0,278.5 L 112.3,281.0 L 120.2,283.0 L 126.4,282.6 L 130.3,278.3 L 140.2,276.5 L 150.6,277.6 L 154.9,288.7 L 157.9,314.4 L 169.2,325.9 L 171.9,325.5 L 170.6,319.9 L 168.4,319.2 L 174.1,322.7 L 177.4,329.8 L 188.2,374.6 L 196.7,389.6 L 187.2,385.8 L 185.0,369.8 L 180.8,369.4 L 177.4,371.7 L 181.0,365.0 L 179.7,359.6 L 177.3,357.6 L 173.4,358.3 L 169.1,362.6 L 171.8,372.6 L 177.8,380.7 L 183.7,382.2 L 184.6,385.8 L 187.3,386.9 L 185.1,388.2 L 187.9,391.4 L 195.6,392.3 L 197.4,388.0 L 209.0,400.9 L 214.4,402.0 L 223.8,407.7 L 236.2,407.4 L 239.6,405.2 L 246.5,406.6 L 240.8,403.0 L 242.6,402.4 L 259.7,408.4 L 273.4,426.6 L 292.6,439.6 L 291.8,448.2 L 283.8,454.3 L 282.4,460.8 L 275.2,467.2 L 270.5,464.7 L 266.6,465.8 L 264.6,461.0 L 259.7,458.1 L 239.9,464.7 L 237.6,470.3 L 231.8,473.0 L 221.8,464.4 L 225.0,458.7 L 229.0,456.6 L 230.0,448.7 L 227.4,446.2 L 229.7,443.3 L 229.2,440.2 L 222.3,438.8 L 213.3,440.7 L 211.5,431.2 L 207.0,429.0 L 206.7,427.0 L 200.4,429.6 L 184.8,425.5 L 181.0,423.6 L 176.9,416.0 L 170.6,416.2 L 170.7,423.1 L 168.2,429.8 L 165.8,427.4 L 166.6,424.9 L 164.1,426.3 L 159.4,421.4 L 157.7,421.7 L 157.5,418.1 L 151.5,412.6 L 139.9,406.6 L 141.7,403.1 L 139.4,398.6 L 143.8,393.3 L 139.4,393.4 L 139.0,390.9 L 135.3,392.7 L 131.7,389.4 L 130.9,385.8 L 134.6,379.9 L 131.2,383.9 L 128.6,379.4 L 126.2,385.0 L 120.2,382.9 L 117.5,379.5 L 117.1,373.1 L 114.9,373.0 L 114.7,366.9 L 112.0,366.5 L 112.4,365.0 L 104.3,359.1 L 101.8,363.1 L 98.2,361.4 L 97.0,356.6 L 100.0,354.2 L 100.5,350.6 L 97.8,351.8 L 90.7,343.9 L 86.0,346.5 L 83.2,343.8 L 81.3,345.4 L 79.6,335.2 L 78.6,333.1 L 77.2,334.6 L 77.0,330.7 L 71.9,331.7 L 73.9,326.4 L 70.6,325.5 L 65.7,328.7 L 59.4,329.8 L 61.6,335.1 L 59.2,338.7 L 57.0,339.4 L 50.0,334.6 L 44.8,318.2 L 45.4,315.7 L 48.2,318.2 L 46.1,316.3 L 47.4,311.9 L 46.1,307.9 L 50.7,297.4 L 57.0,291.4 L 53.3,291.9 L 53.1,290.6 L 56.5,289.5 L 52.6,282.2 L 55.8,281.3 L 54.6,279.9 L 61.3,264.1 L 63.1,265.2 L 66.0,263.1 L 61.7,261.1 L 64.9,258.4 L 63.6,255.3 L 66.8,255.7 L 68.2,253.8 L 64.5,253.8 L 64.5,252.0 L 69.3,248.4 L 67.1,250.2 L 64.8,248.7 L 72.4,242.6 L 70.6,240.3 L 78.1,227.8 L 82.6,213.3 L 80.4,204.5 L 85.1,199.3 L 94.9,195.6 L 96.1,189.0 L 99.5,189.6 L 109.6,180.9 L 123.4,160.2 L 124.8,153.9 L 130.7,152.5 L 136.3,143.1 L 131.9,140.1 L 132.7,134.6 L 129.2,131.9 L 130.6,125.8 L 125.0,126.4 L 126.3,123.4 L 120.8,108.5 L 121.8,102.6 L 110.4,95.0 L 105.8,84.6 L 106.6,81.3 L 102.0,77.9 L 102.6,70.9 L 108.2,67.8 L 105.8,41.8 L 102.5,38.5 L 101.8,33.6 L 96.5,29.4 L 91.8,22.1 L 67.0,6.6 L 317.0,50.0 L 308.1,51.1 L 309.0,65.4 L 312.5,72.7 L 319.4,80.2 L 317.8,83.8 L 319.8,98.5 Z";

const PHUKET_ISLAND =
  "M 58.8,351.8 L 60.2,352.7 L 57.6,353.9 L 57.4,356.6 L 54.0,355.6 L 52.6,358.9 L 50.6,358.6 L 50.2,351.8 L 48.2,350.5 L 50.0,346.5 L 50.0,336.4 L 53.1,337.6 L 54.0,340.9 L 60.1,342.2 L 57.4,348.2 L 58.8,351.8 Z";

/**
 * DECORATIVE ACCENTS: Converted to direct "Mechanical" points (L commands) 
 * for a sharper, engineering-grade transit map.
 */
const GULF_COAST_PATH = "M 215,48 L 226,125 L 222,198 L 200,260";
const ANDAMAN_COAST_PATH = "M 72,100 L 82,172 L 94,224 L 134,372";

// ─── TYPES & DATA ────────────────────────────────────────────────────────────

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

const LAND_BRIDGE_PATH = "M 107.5,213.7 L 71.0,242.5";

/**
 * ROUTES_DATA: Unified transit definitions.
 */
const ROUTES_DATA: RouteData[] = [
  {
    label: "Pattaya → Phuket",
    gulfSea: "M 216.5,84.1 L 107.5,213.7",
    landBridge: LAND_BRIDGE_PATH,
    andamanSea: "M 71.0,242.5 L 57.1,353.0",
    originPin: "pattaya",
    destPin: "phuket",
    direction: "forward",
  },
  {
    label: "Phuket → Pattaya",
    gulfSea: "M 107.5,213.7 L 216.5,84.1",
    landBridge: "M 71.0,242.5 L 107.5,213.7",
    andamanSea: "M 57.1,353.0 L 71.0,242.5",
    originPin: "phuket",
    destPin: "pattaya",
    direction: "reverse",
  },
  {
    label: "Bangkok → Phuket",
    gulfSea: "M 212.0,38.0 L 107.5,213.7",
    landBridge: LAND_BRIDGE_PATH,
    andamanSea: "M 71.0,242.5 L 57.1,353.0",
    originPin: "bangkok",
    destPin: "phuket",
    direction: "forward",
  },
  {
    label: "Pattaya → Singapore → Phuket",
    gulfSea: "M 216.5,84.1 L 232.0,475.0",
    landBridge: "M 232.0,475.0 L 232.0,475.0",
    andamanSea: "M 232.0,475.0 L 57.1,353.0",
    originPin: "pattaya",
    destPin: "phuket",
    viaPin: "singapore",
    direction: "forward",
    isDotted: true,
    hasOverland: false,
  },
  {
    label: "Chumphon → Phuket",
    gulfSea: "M 107.5,213.7 L 107.5,213.7",
    landBridge: LAND_BRIDGE_PATH,
    andamanSea: "M 71.0,242.5 L 57.1,353.0",
    originPin: "chumphon",
    destPin: "phuket",
    direction: "forward",
  },
  {
    label: "Ranong → Pattaya",
    gulfSea: "M 107.5,213.7 L 216.5,84.1",
    landBridge: "M 71.0,242.5 L 107.5,213.7",
    andamanSea: "M 71.0,242.5 L 71.0,242.5",
    originPin: "ranong",
    destPin: "pattaya",
    direction: "reverse",
  }
];

const ALL_PINS: Record<string, { x: number; y: number; label: string; side: "left" | "right" }> = {
  bangkok:   { x: 212.0, y: 38.0,  label: "Bangkok",   side: "right" },
  pattaya:   { x: 216.5, y: 84.1,  label: "Pattaya",   side: "right" },
  chumphon:  { x: 107.5, y: 213.7, label: "Chumphon",  side: "right" },
  ranong:    { x: 71.0,  y: 242.5, label: "Ranong",    side: "left"  },
  phuket:    { x: 57.1,  y: 353.0, label: "Phuket",    side: "left"  },
  singapore: { x: 232.0, y: 475.0, label: "Singapore", side: "right" },
};

// ─── COMPONENT ───────────────────────────────────────────────────────────────

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasInview, setHasInview] = useState(false);
  const [iteration, setIteration] = useState(0);

  useEffect(() => {
    setIteration(i => i + 1);
  }, [activeRoute]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setHasInview(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const route = ROUTES_DATA[activeRoute] || ROUTES_DATA[0];

  const activePins = useMemo(() => {
    const set = new Set(["chumphon", "ranong", route.originPin, route.destPin]);
    if (route.viaPin) set.add(route.viaPin);
    return Array.from(set);
  }, [route]);

  // ─── ANIMATION VARIANTS ─────────────────────────────────────────────────────

  const pathVariants = (delay = 0, duration = 1.8) => ({
    initial: { pathLength: 0, opacity: 0 },
    animate: { 
      pathLength: 1, 
      opacity: 1,
      transition: { delay, duration, ease: [0.45, 0.05, 0.55, 0.95] } 
    }
  });

  const pinVariants = (delay = 0) => ({
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { delay, type: "spring", stiffness: 200, damping: 15 } 
    }
  });

  return (
    <div 
      ref={containerRef} 
      className="thailand-map-wrapper relative overflow-hidden bg-[#04121b] p-4 sm:p-8 rounded-3xl border border-slate-800/50 shadow-2xl"
      style={{ maxWidth: '580px', margin: '0 auto' }}
    >
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-teal-500/5 to-transparent opacity-30" />

      <div className="absolute top-1/2 -translate-y-1/2 w-full left-0 px-2 flex justify-between z-30 pointer-events-none">
        <button 
          onClick={onPrev}
          className="pointer-events-auto p-3 rounded-full bg-slate-900/80 border border-teal-500/30 text-teal-400 backdrop-blur-md hover:bg-teal-500 hover:text-white transition-all active:scale-95 shadow-lg shadow-teal-900/20"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button 
          onClick={onNext}
          className="pointer-events-auto p-3 rounded-full bg-slate-900/80 border border-teal-500/30 text-teal-400 backdrop-blur-md hover:bg-teal-500 hover:text-white transition-all active:scale-95 shadow-lg shadow-teal-900/20"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={iteration}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
        >
          <svg 
            viewBox="0 0 320 480" 
            className="w-full h-auto drop-shadow-[0_0_30px_rgba(0,0,0,0.5)]" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="grain">
                <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                <feColorMatrix type="saturate" values="0" />
                <feComponentTransfer>
                  <feFuncR type="linear" slope="0.1" />
                  <feFuncG type="linear" slope="0.1" />
                  <feFuncB type="linear" slope="0.1" />
                </feComponentTransfer>
                <feBlend in="SourceGraphic" mode="soft-light" />
              </filter>

              <filter id="route-glow-teal" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <filter id="route-glow-amber" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>

              <linearGradient id="land-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e3a2f" />
                <stop offset="100%" stopColor="#142b22" />
              </linearGradient>

              {/* Enhanced Depth Background */}
              <radialGradient id="bg-depth" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#082537" />
                <stop offset="100%" stopColor="#04121b" />
              </radialGradient>

              <marker id="arrow-end" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#00f2ff" />
              </marker>
            </defs>

            <rect width="320" height="480" fill="url(#bg-depth)" rx="20" />
            
            <text x="290" y="240" fill="#38bdf8" opacity="0.15" fontSize="10" fontFamily="monospace" letterSpacing="4" transform="rotate(90, 290, 240)" textAnchor="middle">GULF OF THAILAND</text>
            <text x="30" y="240" fill="#38bdf8" opacity="0.15" fontSize="10" fontFamily="monospace" letterSpacing="4" transform="rotate(-90, 30, 240)" textAnchor="middle">ANDAMAN SEA</text>

            <g filter="url(#grain)">
              <path d={LAND_FILL} fill="url(#land-gradient)" stroke="#2d5a45" strokeWidth="1.2" />
              <path d={PHUKET_ISLAND} fill="url(#land-gradient)" stroke="#2d5a45" strokeWidth="1" />
            </g>

            <path d={GULF_COAST_PATH} fill="none" stroke="#2d5a45" strokeWidth="2.5" opacity="0.4" />
            <path d={ANDAMAN_COAST_PATH} fill="none" stroke="#2d5a45" strokeWidth="2.5" opacity="0.4" />

            {hasInview && (
              <g>
                <motion.path 
                  d={route.gulfSea} 
                  fill="none" 
                  stroke="#00f2ff" 
                  strokeWidth="3" 
                  strokeLinecap="round"
                  strokeDasharray={route.isDotted ? "3 7" : "none"}
                  filter="url(#route-glow-teal)"
                  variants={pathVariants(0, 1.4)}
                  initial="initial"
                  animate="animate"
                />

                {route.hasOverland !== false && (
                  <motion.path 
                    d={route.landBridge} 
                    fill="none" 
                    stroke="#fbbf24" 
                    strokeWidth="3" 
                    strokeLinecap="round"
                    strokeDasharray="6 6"
                    filter="url(#route-glow-amber)"
                    variants={pathVariants(1.2, 0.8)}
                    initial="initial"
                    animate="animate"
                  />
                )}

                <motion.path 
                  d={route.andamanSea} 
                  fill="none" 
                  stroke="#00f2ff" 
                  strokeWidth="3" 
                  strokeLinecap="round"
                  strokeDasharray={route.isDotted ? "3 7" : "none"}
                  markerEnd="url(#arrow-end)"
                  filter="url(#route-glow-teal)"
                  variants={pathVariants(route.hasOverland !== false ? 1.8 : 1.2, 1.4)}
                  initial="initial"
                  animate="animate"
                />
              </g>
            )}

            {activePins.map((pinKey, idx) => {
              const pin = ALL_PINS[pinKey];
              if (!pin) return null;
              const isActive = pinKey === route.originPin || pinKey === route.destPin || pinKey === route.viaPin;
              const isHub = pinKey === "chumphon" || pinKey === "ranong";

              return (
                <motion.g 
                  key={pinKey} 
                  variants={pinVariants(0.4 + idx * 0.1)}
                  initial="initial"
                  animate="animate"
                >
                  {isActive && (
                    <motion.circle 
                      cx={pin.x} cy={pin.y} r="12" 
                      fill={isHub ? "#fbbf24" : "#00f2ff"} 
                      initial={{ scale: 0.8, opacity: 0.5 }}
                      animate={{ scale: 1.6, opacity: 0 }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                  
                  <circle 
                    cx={pin.x} cy={pin.y} 
                    r={isActive ? 6 : 4} 
                    fill={isHub ? "#fbbf24" : isActive ? "#00f2ff" : "#475569"} 
                    className="shadow-xl"
                  />
                  
                  <text 
                    x={pin.side === "right" ? pin.x + 12 : pin.x - 12} 
                    y={pin.y + 4} 
                    textAnchor={pin.side === "right" ? "start" : "end"}
                    fill={isActive ? "#f8fafc" : "#94a3b8"}
                    fontSize={isActive ? "13" : "11"}
                    fontWeight={isActive ? "700" : "500"}
                    fontFamily="Inter, sans-serif"
                    className="drop-shadow-md pointer-events-none select-none"
                  >
                    {pin.label.toUpperCase()}
                  </text>
                </motion.g>
              );
            })}
          </svg>
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex flex-col items-center gap-4">
        <h3 className="text-teal-400 font-bold text-lg tracking-widest uppercase">
          {route.label}
        </h3>
        
        {totalRoutes && (
          <div className="flex gap-2">
            {Array.from({ length: totalRoutes }).map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 transition-all duration-500 rounded-full ${
                  i === activeRoute ? "w-8 bg-teal-400" : "w-2 bg-slate-700"
                }`} 
              />
            ))}
          </div>
        )}

        <div className="flex gap-6 pt-2 border-t border-slate-800 w-full justify-center">
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-teal-400 rounded-full shadow-[0_0_8px_#2dd4bf]" />
            <span className="text-[10px] text-slate-400 uppercase tracking-tighter">Marine Route</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 border-b-2 border-dashed border-amber-400" />
            <span className="text-[10px] text-slate-400 uppercase tracking-tighter">Overland Transit</span>
          </div>
        </div>
      </div>
    </div>
  );
}
