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
 * SVG viewBox: 0 0 400 520 (expanded to accommodate Singapore route)
 */

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Coastline paths (scaled to 400×520 viewBox) ─────────────────────────────

/** Gulf of Thailand coastline — Chumphon down to Chumphon */
const GULF_COAST =
  "M 269,60 C 275,90 280,122 282,156 C 284,190 282,219 278,248 C 274,275 263,302 250,325 C 241,340 232,350 222,358";

/** Andaman Sea coastline — Myanmar border down to Phuket */
const ANDAMAN_COAST =
  "M 90,125 C 92,156 95,185 102,215 C 107,240 112,260 117,280 C 120,297 122,310 125,322 C 127,342 132,368 140,392 C 147,417 157,442 167,465 C 172,480 175,495 175,510";

/**
 * Thailand land mass — accurate outline derived from Natural Earth GeoJSON
 * Projection: linear lon/lat, bounds lon 97.5–102.5, lat 5.5–14.5
 * Scaled to 400×520 viewBox (factor 1.0 from original)
 */
const LAND_FILL =
  "M 398,156 L 383,153 L 381,147 L 385,147 L 388,143 L 387,141 L 388,143 L 383,144 L 384,137 L 382,139 L 382,137 L 376,137 L 382,144 L 378,145 L 366,134 L 369,131 L 361,129 L 365,131 L 364,135 L 361,131 L 357,131 L 356,126 L 356,131 L 343,120 L 337,119 L 332,122 L 317,123 L 314,126 L 287,121 L 279,123 L 278,126 L 274,125 L 273,122 L 269,123 L 269,120 L 267,119 L 273,113 L 269,106 L 274,100 L 270,94 L 275,88 L 273,82 L 278,77 L 279,67 L 271,69 L 254,66 L 247,63 L 248,59 L 244,65 L 227,67 L 222,65 L 204,72 L 197,80 L 206,89 L 208,96 L 197,122 L 201,142 L 198,148 L 201,153 L 186,171 L 185,183 L 180,185 L 171,198 L 165,211 L 167,220 L 162,221 L 160,224 L 161,242 L 155,241 L 150,253 L 145,255 L 143,261 L 139,263 L 141,264 L 139,267 L 143,270 L 143,273 L 132,274 L 133,278 L 140,284 L 136,286 L 132,293 L 134,298 L 132,315 L 138,330 L 146,341 L 139,344 L 139,348 L 140,351 L 150,354 L 158,353 L 163,348 L 175,346 L 188,348 L 193,361 L 197,392 L 211,407 L 215,406 L 213,399 L 210,398 L 217,403 L 221,412 L 235,468 L 246,487 L 234,482 L 231,462 L 226,461 L 222,464 L 226,456 L 224,450 L 221,448 L 216,449 L 211,454 L 214,466 L 222,476 L 229,478 L 230,482 L 233,484 L 230,486 L 234,490 L 244,491 L 246,486 L 261,501 L 268,502 L 279,509 L 295,508 L 299,506 L 307,507 L 301,503 L 303,502 L 324,510 L 341,533 L 366,548 L 365,558 L 354,565 L 352,572 L 344,580 L 338,577 L 333,578 L 330,572 L 324,569 L 300,576 L 297,583 L 290,586 L 277,576 L 281,569 L 286,567 L 287,558 L 284,555 L 287,552 L 286,548 L 278,547 L 266,549 L 264,539 L 259,536 L 258,533 L 250,536 L 231,531 L 226,529 L 221,520 L 213,520 L 213,528 L 210,536 L 207,533 L 208,530 L 205,532 L 199,526 L 197,527 L 197,522 L 189,515 L 175,508 L 177,504 L 174,499 L 179,493 L 174,493 L 173,490 L 169,492 L 164,488 L 163,484 L 168,477 L 164,481 L 161,476 L 158,482 L 150,480 L 147,476 L 146,468 L 144,468 L 143,461 L 140,460 L 140,458 L 130,451 L 127,456 L 123,454 L 121,448 L 125,445 L 125,441 L 122,442 L 113,432 L 108,435 L 104,432 L 102,434 L 99,422 L 98,420 L 96,421 L 96,417 L 90,418 L 92,412 L 88,411 L 82,415 L 74,416 L 77,422 L 74,426 L 71,427 L 63,421 L 56,403 L 57,400 L 60,403 L 58,401 L 59,396 L 58,391 L 63,380 L 71,364 L 67,365 L 66,363 L 70,362 L 65,354 L 69,353 L 68,351 L 76,335 L 103,266 L 100,255 L 106,249 L 119,244 L 120,236 L 124,237 L 137,226 L 154,200 L 156,192 L 163,190 L 170,179 L 165,175 L 166,169 L 162,166 L 163,159 L 156,159 L 158,156 L 151,135 L 152,128 L 138,119 L 132,106 L 133,102 L 128,98 L 128,90 L 135,86 L 132,52 L 128,48 L 127,42 L 120,37 L 114,27 L 84,8 L 396,62 L 385,64 L 386,81 L 390,91 L 399,100 L 397,105 L 399,123 Z";

/** Phuket island — accurate GeoJSON outline */
const PHUKET_ISLAND =
  "M 73,439 L 75,440 L 72,442 L 72,445 L 68,444 L 66,448 L 63,447 L 63,439 L 60,437 L 62,433 L 62,420 L 66,421 L 67,425 L 75,427 L 72,435 L 73,439 Z";

// ─── Per-route animated path data ────────────────────────────────────────────
// All coordinates use exact geographic positions (scaled to 400×520 viewBox):
//   Pattaya:  x=270, y=105
//   Chumphon: x=134, y=267
//   Ranong:   x=89,  y=303
//   Phuket:   x=71,  y=441

const LAND_BRIDGE = "M 134,267 L 89,303";

// Singapore sea route — wraps around the southernmost point of the peninsula WITHOUT touching land
// Extended path that goes far south around the peninsula (like the yellow line in the screenshot)
// Curves well away from the peninsula to avoid any land contact
const SINGAPORE_ROUTE = "M 270,105 C 320,130 360,180 370,260 C 375,320 360,380 320,420 C 280,450 180,470 100,460 C 80,458 71,441 71,441";

// Route paths now STRAIGHTENED (direct lines instead of curves):
const ROUTES_DATA = [
  {
    label: "Pattaya → Phuket",
    // Straightened Gulf leg: direct line from Pattaya to Chumphon
    gulfSea: "M 270,105 L 134,267",
    landBridge: LAND_BRIDGE,
    // Straightened Andaman leg: direct line from Ranong to Phuket
    andamanSea: "M 89,303 L 71,441",
    originPin: "pattaya",
    destPin: "phuket",
    direction: "forward" as const,
  },
  {
    label: "Phuket → Pattaya",
    gulfSea: "M 134,267 L 270,105",
    landBridge: "M 89,303 L 134,267",
    andamanSea: "M 71,441 L 89,303",
    originPin: "phuket",
    destPin: "pattaya",
    direction: "reverse" as const,
  },
  {
    label: "Chumphon → Phuket",
    // No Gulf leg needed — starts at Chumphon
    gulfSea: "M 134,267 C 134,267 134,267 134,267",
    landBridge: LAND_BRIDGE,
    andamanSea: "M 89,303 L 71,441",
    originPin: "chumphon",
    destPin: "phuket",
    direction: "forward" as const,
  },
  {
    label: "Phuket → Chumphon",
    gulfSea: "M 134,267 C 134,267 134,267 134,267",
    landBridge: "M 89,303 L 134,267",
    andamanSea: "M 71,441 L 89,303",
    originPin: "phuket",
    destPin: "chumphon",
    direction: "reverse" as const,
  },
  {
    label: "Ranong → Pattaya",
    gulfSea: "M 134,267 L 270,105",
    landBridge: "M 89,303 L 134,267",
    // No Andaman leg — starts at Ranong
    andamanSea: "M 89,303 C 89,303 89,303 89,303",
    originPin: "ranong",
    destPin: "pattaya",
    direction: "reverse" as const,
  },
  {
    label: "Pattaya → Ranong",
    gulfSea: "M 270,105 L 134,267",
    landBridge: LAND_BRIDGE,
    // No Andaman leg — ends at Ranong
    andamanSea: "M 89,303 C 89,303 89,303 89,303",
    originPin: "pattaya",
    destPin: "ranong",
    direction: "forward" as const,
  },
];

// ─── Pin definitions ──────────────────────────────────────────────────────
// Exact geographic positions derived from real lat/lon coordinates
// REMOVED Bangkok — no longer part of active routes
const ALL_PINS: Record<string, { x: number; y: number; label: string; side: "left" | "right" }> = {
  pattaya:  { x: 270, y: 105,  label: "Pattaya",  side: "right" },
  chumphon: { x: 134, y: 267, label: "Chumphon", side: "right" },
  ranong:   { x: 89,  y: 303, label: "Ranong",   side: "left"  },
  phuket:   { x: 71,  y: 441, label: "Phuket",   side: "left"  },
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
            viewBox="0 0 400 520"
            className="w-full max-w-md mx-auto"
            style={{
              filter: "drop-shadow(0 0 20px rgba(0,200,200,0.15))",
              aspectRatio: "400 / 520",
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
            </defs>

            {/* ── Sea background ── */}
            <rect width="400" height="520" fill="#0f172a" />

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

            {/* ── Singapore sea route (dotted, PERMANENT OVERLAY on all routes) ── */}
            {shouldAnimate && (
              <motion.path
                d={SINGAPORE_ROUTE}
                fill="none"
                stroke="#fbbf24"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="6 5"
                opacity={0.6}
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
            <g opacity="0.18" transform="translate(45, 45)">
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
          { color: "#fbbf24", dash: "6 5", label: "Traditional sea route (via Singapore)" },
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
