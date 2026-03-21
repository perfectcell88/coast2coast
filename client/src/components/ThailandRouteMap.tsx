/**
 * ThailandRouteMap — Enhanced Premium Version
 *
 * SVG map of Thailand's southern peninsula with:
 *  - Land fill with subtle texture
 *  - Glowing animated route paths
 *  - Pulsing city pins
 *  - Animated route drawing
 *  - Sea labels and decorative elements
 *
 * SVG viewBox: 0 0 320 480
 */

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Coastline paths (scaled to 320×480 viewBox) ─────────────────────────────

/** Gulf of Thailand coastline — Bangkok down to Chumphon */
const GULF_COAST =
  "M 215,48 C 220,72 224,98 226,125 C 228,152 226,175 222,198 C 218,220 210,242 200,260 C 193,272 186,280 178,286";

/** Andaman Sea coastline — Myanmar border down to Phuket */
const ANDAMAN_COAST =
  "M 72,100 C 74,124 77,148 82,172 C 86,192 90,208 94,224 C 97,238 99,248 100,258 C 102,274 106,294 112,314 C 118,334 126,354 134,372 C 138,384 140,396 140,408";

/** Thailand land mass — rough peninsula outline */
const LAND_FILL =
  "M 215,48 C 220,72 224,98 226,125 C 228,152 226,175 222,198 C 218,220 210,242 200,260 C 193,272 186,280 178,286 C 168,292 158,294 148,294 C 138,294 128,292 118,288 C 110,284 104,278 100,270 C 97,262 97,252 98,242 C 99,232 101,222 102,212 C 104,198 104,184 102,170 C 100,156 96,142 92,128 C 88,114 84,100 82,86 C 80,72 80,58 82,48 C 90,44 100,42 112,42 C 124,42 136,44 148,46 C 162,48 178,50 192,50 Z";

// ─── Per-route animated path data ────────────────────────────────────────────
const LAND_BRIDGE = "M 178,286 C 164,284 150,282 136,281 C 126,280 114,280 100,280";

const ROUTES_DATA = [
  {
    label: "Pattaya → Phuket",
    gulfSea: "M 218,108 C 214,132 208,160 202,186 C 196,212 188,236 181,258 C 179,272 178,280 178,286",
    landBridge: LAND_BRIDGE,
    andamanSea: "M 100,280 C 100,298 104,318 110,338 C 116,356 124,374 132,390 C 136,402 138,406 140,408",
    originPin: "pattaya",
    destPin: "phuket",
    direction: "forward" as const,
  },
  {
    label: "Phuket → Pattaya",
    gulfSea: "M 178,286 C 179,272 181,258 188,236 C 196,212 202,186 208,160 C 214,132 217,118 218,108",
    landBridge: "M 100,280 C 114,280 126,280 136,281 C 150,282 164,284 178,286",
    andamanSea: "M 140,408 C 138,406 136,402 132,390 C 124,374 116,356 110,338 C 104,318 100,298 100,280",
    originPin: "phuket",
    destPin: "pattaya",
    direction: "reverse" as const,
  },
  {
    label: "Bangkok → Phuket",
    gulfSea: "M 215,48 C 220,72 224,98 226,125 C 228,152 224,178 218,202 C 212,226 202,248 192,266 C 186,278 180,284 178,286",
    landBridge: LAND_BRIDGE,
    andamanSea: "M 100,280 C 100,298 104,318 110,338 C 116,356 124,374 132,390 C 136,402 138,406 140,408",
    originPin: "bangkok",
    destPin: "phuket",
    direction: "forward" as const,
  },
  {
    label: "Phuket → Bangkok",
    gulfSea: "M 178,286 C 180,284 186,278 192,266 C 202,248 212,226 218,202 C 224,178 228,152 226,125 C 224,98 220,72 215,48",
    landBridge: "M 100,280 C 114,280 126,280 136,281 C 150,282 164,284 178,286",
    andamanSea: "M 140,408 C 138,406 136,402 132,390 C 124,374 116,356 110,338 C 104,318 100,298 100,280",
    originPin: "phuket",
    destPin: "bangkok",
    direction: "reverse" as const,
  },
  {
    label: "Chumphon → Phuket",
    gulfSea: "M 178,286 C 178,286 178,286 178,286",
    landBridge: LAND_BRIDGE,
    andamanSea: "M 100,280 C 100,298 104,318 110,338 C 116,356 124,374 132,390 C 136,402 138,406 140,408",
    originPin: "chumphon",
    destPin: "phuket",
    direction: "forward" as const,
  },
  {
    label: "Phuket → Chumphon",
    gulfSea: "M 178,286 C 178,286 178,286 178,286",
    landBridge: "M 100,280 C 114,280 126,280 136,281 C 150,282 164,284 178,286",
    andamanSea: "M 140,408 C 138,406 136,402 132,390 C 124,374 116,356 110,338 C 104,318 100,298 100,280",
    originPin: "phuket",
    destPin: "chumphon",
    direction: "reverse" as const,
  },
  {
    label: "Ranong → Pattaya",
    gulfSea: "M 178,286 C 179,272 181,258 188,236 C 196,212 202,186 208,160 C 214,132 217,118 218,108",
    landBridge: "M 100,280 C 114,280 126,280 136,281 C 150,282 164,284 178,286",
    andamanSea: "M 100,280 C 100,280 100,280 100,280",
    originPin: "ranong",
    destPin: "pattaya",
    direction: "reverse" as const,
  },
  {
    label: "Pattaya → Ranong",
    gulfSea: "M 218,108 C 214,132 208,160 202,186 C 196,212 188,236 181,258 C 179,272 178,280 178,286",
    landBridge: LAND_BRIDGE,
    andamanSea: "M 100,280 C 100,280 100,280 100,280",
    originPin: "pattaya",
    destPin: "ranong",
    direction: "forward" as const,
  },
];

// ─── Pin definitions ──────────────────────────────────────────────────────────
const ALL_PINS: Record<string, { x: number; y: number; label: string; side: "left" | "right" }> = {
  bangkok:  { x: 215, y: 48,  label: "Bangkok",  side: "right" },
  pattaya:  { x: 218, y: 108, label: "Pattaya",  side: "right" },
  chumphon: { x: 178, y: 286, label: "Chumphon", side: "right" },
  ranong:   { x: 100, y: 280, label: "Ranong",   side: "left"  },
  phuket:   { x: 140, y: 408, label: "Phuket",   side: "left"  },
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
export default function ThailandRouteMap({ activeRoute }: { activeRoute: number }) {
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
    <div ref={ref} className="relative w-full select-none" style={{ maxWidth: 520, margin: "0 auto" }}>
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
            aria-label={`Map showing ${route.label} transport route`}
          >
            {/* ── Defs ── */}
            <defs>
              {/* Arrowhead markers */}
              <marker id="arrow-teal" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
                <path d="M0,0 L7,3.5 L0,7 Z" fill="#00c8c8" opacity="0.95" />
              </marker>
              <marker id="arrow-amber" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
                <path d="M0,0 L7,3.5 L0,7 Z" fill="#f59e0b" opacity="0.95" />
              </marker>

              {/* Glow filters */}
              <filter id="glow-teal" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="glow-amber" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="glow-pin" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="land-shadow" x="-5%" y="-5%" width="110%" height="110%">
                <feDropShadow dx="2" dy="3" stdDeviation="4" floodColor="#000" floodOpacity="0.35" />
              </filter>

              {/* Ocean gradient */}
              <linearGradient id="ocean-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#041828" />
                <stop offset="50%" stopColor="#062038" />
                <stop offset="100%" stopColor="#041828" />
              </linearGradient>

              {/* Land gradient */}
              <linearGradient id="land-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1a3a2a" />
                <stop offset="50%" stopColor="#1e4030" />
                <stop offset="100%" stopColor="#163224" />
              </linearGradient>

              {/* Gulf glow */}
              <radialGradient id="gulf-glow" cx="85%" cy="45%" r="40%">
                <stop offset="0%" stopColor="#0e4a6a" stopOpacity="0.5" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>

              {/* Andaman glow */}
              <radialGradient id="andaman-glow" cx="22%" cy="55%" r="38%">
                <stop offset="0%" stopColor="#0a3a5a" stopOpacity="0.5" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* ── Ocean background ── */}
            <rect x="0" y="0" width="320" height="480" fill="url(#ocean-bg)" rx="12" />

            {/* Ocean depth glows */}
            <rect x="0" y="0" width="320" height="480" fill="url(#gulf-glow)" rx="12" />
            <rect x="0" y="0" width="320" height="480" fill="url(#andaman-glow)" rx="12" />

            {/* Nautical grid */}
            {[48, 96, 144, 192, 240, 288, 336, 384, 432].map(y => (
              <line key={`h${y}`} x1="0" y1={y} x2="320" y2={y} stroke="#0e7490" strokeWidth="0.4" opacity="0.12" />
            ))}
            {[64, 128, 192, 256].map(x => (
              <line key={`v${x}`} x1={x} y1="0" x2={x} y2="480" stroke="#0e7490" strokeWidth="0.4" opacity="0.12" />
            ))}

            {/* ── Land mass fill ── */}
            <path
              d={LAND_FILL}
              fill="url(#land-grad)"
              stroke="#2a5a3a"
              strokeWidth="1.5"
              opacity="0.9"
              filter="url(#land-shadow)"
            />
            {/* Land highlight edge */}
            <path
              d={LAND_FILL}
              fill="none"
              stroke="rgba(80,180,100,0.15)"
              strokeWidth="1"
            />

            {/* ── Sea labels ── */}
            <text
              x="278" y="220" fontSize="8.5" fill="#38bdf8" opacity="0.4"
              fontFamily="monospace" letterSpacing="2" transform="rotate(90, 278, 220)"
              textAnchor="middle"
            >
              GULF OF THAILAND
            </text>
            <text
              x="24" y="240" fontSize="8.5" fill="#38bdf8" opacity="0.4"
              fontFamily="monospace" letterSpacing="2" transform="rotate(-90, 24, 240)"
              textAnchor="middle"
            >
              ANDAMAN SEA
            </text>

            {/* ── Static coastlines (on top of land) ── */}
            <path d={GULF_COAST}    fill="none" stroke="#3a6a4a" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
            <path d={ANDAMAN_COAST} fill="none" stroke="#3a6a4a" strokeWidth="2" strokeLinecap="round" opacity="0.7" />

            {/* ── Animated route: Gulf sea leg ── */}
            {shouldAnimate && (
              <>
                {/* Wide glow */}
                <motion.path
                  d={route.gulfSea}
                  fill="none"
                  stroke="#00c8c8"
                  strokeWidth="10"
                  strokeLinecap="round"
                  opacity={0.12}
                  initial="hidden"
                  animate="visible"
                  variants={drawPath(0, 1.6)}
                />
                {/* Medium glow */}
                <motion.path
                  d={route.gulfSea}
                  fill="none"
                  stroke="#00c8c8"
                  strokeWidth="5"
                  strokeLinecap="round"
                  opacity={0.25}
                  initial="hidden"
                  animate="visible"
                  variants={drawPath(0, 1.6)}
                />
                {/* Core line */}
                <motion.path
                  d={route.gulfSea}
                  fill="none"
                  stroke="#00c8c8"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="8 5"
                  markerEnd={isForward ? undefined : "url(#arrow-teal)"}
                  markerStart={isForward ? "url(#arrow-teal)" : undefined}
                  initial="hidden"
                  animate="visible"
                  variants={drawPath(0, 1.6)}
                  filter="url(#glow-teal)"
                />
              </>
            )}

            {/* ── Animated route: Land bridge ── */}
            {shouldAnimate && (
              <>
                <motion.path
                  d={route.landBridge}
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="10"
                  strokeLinecap="round"
                  opacity={0.15}
                  initial="hidden"
                  animate="visible"
                  variants={drawPath(1.4, 0.8)}
                />
                <motion.path
                  d={route.landBridge}
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="5"
                  strokeLinecap="round"
                  opacity={0.3}
                  initial="hidden"
                  animate="visible"
                  variants={drawPath(1.4, 0.8)}
                />
                <motion.path
                  d={route.landBridge}
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="5 4"
                  markerEnd="url(#arrow-amber)"
                  initial="hidden"
                  animate="visible"
                  variants={drawPath(1.4, 0.8)}
                  filter="url(#glow-amber)"
                />
              </>
            )}

            {/* ── Animated route: Andaman sea leg ── */}
            {shouldAnimate && (
              <>
                <motion.path
                  d={route.andamanSea}
                  fill="none"
                  stroke="#00c8c8"
                  strokeWidth="10"
                  strokeLinecap="round"
                  opacity={0.12}
                  initial="hidden"
                  animate="visible"
                  variants={drawPath(1.4, 1.6)}
                />
                <motion.path
                  d={route.andamanSea}
                  fill="none"
                  stroke="#00c8c8"
                  strokeWidth="5"
                  strokeLinecap="round"
                  opacity={0.25}
                  initial="hidden"
                  animate="visible"
                  variants={drawPath(1.4, 1.6)}
                />
                <motion.path
                  d={route.andamanSea}
                  fill="none"
                  stroke="#00c8c8"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="8 5"
                  markerEnd={isForward ? "url(#arrow-teal)" : undefined}
                  markerStart={isForward ? undefined : "url(#arrow-teal)"}
                  initial="hidden"
                  animate="visible"
                  variants={drawPath(1.4, 1.6)}
                  filter="url(#glow-teal)"
                />
              </>
            )}

            {/* ── Overland label ── */}
            {shouldAnimate && (
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 0.5 }}
              >
                {/* Label background pill */}
                <rect x="116" y="254" width="88" height="18" rx="9" fill="rgba(245,158,11,0.18)" />
                <text
                  x="160" y="266"
                  fontSize="8.5" fontWeight="700"
                  fill="#f59e0b"
                  textAnchor="middle"
                  fontFamily="system-ui, sans-serif"
                  letterSpacing="0.5"
                >
                  80 km overland
                </text>
              </motion.g>
            )}

            {/* ── City pins ── */}
            {visiblePins.map((pinId, i) => {
              const pin = ALL_PINS[pinId];
              if (!pin) return null;
              const isOrigin = pinId === route.originPin;
              const isDest   = pinId === route.destPin;
              const isLandBridge = pinId === "chumphon" || pinId === "ranong";
              const color = isLandBridge ? "#f59e0b" : (isOrigin || isDest) ? "#00c8c8" : "#94a3b8";
              const outerR = isOrigin || isDest ? 9 : 7;
              const innerR = isOrigin || isDest ? 5 : 4;
              const labelSize = isOrigin || isDest ? 11 : 10;

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
                      fontSize="7.5"
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
      <div className="flex items-center justify-center gap-6 mt-2">
        {[
          { color: "#00c8c8", dash: "8 5", label: "Sea route" },
          { color: "#f59e0b", dash: "5 4", label: "80 km overland" },
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
