/**
 * ThailandRouteMap
 *
 * Accurate SVG map of Thailand's southern peninsula.
 * Each of the four route tabs renders a distinct, geographically correct path:
 *
 *   Route 0 — Pattaya → Phuket  (Gulf south → land bridge → Andaman south)
 *   Route 1 — Phuket → Pattaya  (same path, reversed direction arrow)
 *   Route 2 — Bangkok → Phuket  (Gulf north → further south → land bridge → Andaman)
 *   Route 3 — Phuket → Bangkok  (same path, reversed direction arrow)
 *
 * SVG viewBox: 0 0 220 440
 * Geographic coverage: ~5°N (Phuket) to ~14°N (Bangkok), peninsula width.
 *
 * Coordinate mapping (approximate):
 *   Bangkok  ≈ (148, 42)   — Gulf coast, far north
 *   Pattaya  ≈ (152, 88)   — Gulf coast, mid-north
 *   Chumphon ≈ (120, 238)  — Gulf coast, land bridge east end
 *   Ranong   ≈ (72, 230)   — Andaman coast, land bridge west end
 *   Phuket   ≈ (100, 370)  — Andaman coast, far south
 */

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Static coastlines ───────────────────────────────────────────────────────

/** Gulf of Thailand coastline — Bangkok area down to Chumphon */
const GULF_COAST =
  "M 148,42 C 152,60 156,82 158,105 C 160,128 158,150 154,170 C 150,190 144,210 136,228 C 130,240 125,244 120,238";

/** Andaman Sea coastline — Myanmar border area down to Phuket */
const ANDAMAN_COAST =
  "M 52,90 C 54,110 56,130 60,152 C 63,170 66,185 68,200 C 70,215 71,224 72,230 C 73,242 76,258 80,275 C 84,292 90,310 96,328 C 100,342 100,358 100,370";

// ─── Per-route animated path data ───────────────────────────────────────────
// Each route has:
//   gulfSea   — the sea leg on the Gulf side (origin → Chumphon)
//   landBridge — overland Chumphon → Ranong (always the same 80 km)
//   andamanSea — the sea leg on the Andaman side (Ranong → Phuket)
//   direction  — "forward" draws origin→dest; "reverse" draws dest→origin
//                (we flip the arrowhead marker for reverse routes)

const LAND_BRIDGE = "M 120,238 C 108,236 96,232 84,231 C 80,230 76,230 72,230";

const ROUTES_DATA = [
  {
    // 0: Pattaya → Phuket
    label: "Pattaya → Phuket",
    gulfSea: "M 152,88 C 150,110 146,140 140,168 C 135,190 128,215 122,234 C 121,236 120,237 120,238",
    landBridge: LAND_BRIDGE,
    andamanSea: "M 72,230 C 72,248 75,268 80,288 C 84,305 90,322 96,340 C 98,355 99,363 100,370",
    originPin: "pattaya",
    destPin: "phuket",
    direction: "forward" as const,
  },
  {
    // 1: Phuket → Pattaya (reverse of route 0)
    label: "Phuket → Pattaya",
    gulfSea: "M 120,238 C 121,236 122,234 128,215 C 135,190 140,168 146,140 C 150,110 151,98 152,88",
    landBridge: "M 72,230 C 76,230 80,230 84,231 C 96,232 108,236 120,238",
    andamanSea: "M 100,370 C 99,363 98,355 96,340 C 90,322 84,305 80,288 C 75,268 72,248 72,230",
    originPin: "phuket",
    destPin: "pattaya",
    direction: "reverse" as const,
  },
  {
    // 2: Bangkok → Phuket (longer Gulf leg, starts further north)
    label: "Bangkok → Phuket",
    gulfSea: "M 148,42 C 152,65 156,90 158,115 C 160,140 156,165 150,188 C 144,210 134,228 122,236 C 121,237 120,238 120,238",
    landBridge: LAND_BRIDGE,
    andamanSea: "M 72,230 C 72,248 75,268 80,288 C 84,305 90,322 96,340 C 98,355 99,363 100,370",
    originPin: "bangkok",
    destPin: "phuket",
    direction: "forward" as const,
  },
  {
    // 3: Phuket → Bangkok (reverse of route 2)
    label: "Phuket → Bangkok",
    gulfSea: "M 120,238 C 120,238 121,237 122,236 C 134,228 144,210 150,188 C 156,165 160,140 158,115 C 156,90 152,65 148,42",
    landBridge: "M 72,230 C 76,230 80,230 84,231 C 96,232 108,236 120,238",
    andamanSea: "M 100,370 C 99,363 98,355 96,340 C 90,322 84,305 80,288 C 75,268 72,248 72,230",
    originPin: "phuket",
    destPin: "bangkok",
    direction: "reverse" as const,
  },
];

// ─── Pin definitions ─────────────────────────────────────────────────────────
const ALL_PINS: Record<string, { x: number; y: number; label: string; side: "left" | "right" }> = {
  bangkok:  { x: 148, y: 42,  label: "Bangkok",  side: "right" },
  pattaya:  { x: 152, y: 88,  label: "Pattaya",  side: "right" },
  chumphon: { x: 120, y: 238, label: "Chumphon", side: "right" },
  ranong:   { x: 72,  y: 230, label: "Ranong",   side: "left"  },
  phuket:   { x: 100, y: 370, label: "Phuket",   side: "left"  },
};

// ─── Animation variants ──────────────────────────────────────────────────────
const drawPath = (delay = 0, duration = 1.4) => ({
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
    transition: { delay, duration: 0.35, type: "spring" as const, stiffness: 280, damping: 22 },
  },
});

// ─── Component ───────────────────────────────────────────────────────────────
export default function ThailandRouteMap({ activeRoute }: { activeRoute: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  // animKey forces Framer Motion to remount animated elements on tab change
  const [animKey, setAnimKey] = useState(0);

  // Trigger on scroll into view (once)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Re-trigger animation whenever the active route tab changes
  useEffect(() => {
    setAnimKey((k) => k + 1);
  }, [activeRoute]);

  const route = ROUTES_DATA[activeRoute];
  const isForward = route.direction === "forward";

  // Pins to show: always Chumphon + Ranong, plus origin + dest
  const visiblePins = Array.from(
    new Set(["chumphon", "ranong", route.originPin, route.destPin])
  );

  const shouldAnimate = inView;

  return (
    <div ref={ref} className="relative w-full select-none" style={{ maxWidth: 300, margin: "0 auto" }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={animKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <svg
            viewBox="0 0 220 440"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            style={{ overflow: "visible" }}
            aria-label={`Map showing ${route.label} transport route`}
          >
            {/* ── Defs: arrowhead markers ── */}
            <defs>
              <marker id="arrow-teal" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#0e7490" opacity="0.9" />
              </marker>
              <marker id="arrow-amber" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#f59e0b" opacity="0.9" />
              </marker>
            </defs>

            {/* ── Sea area fills (very subtle) ── */}
            <rect x="0" y="0" width="220" height="440" fill="transparent" />

            {/* ── Sea labels ── */}
            <text
              x="192" y="200" fontSize="6.5" fill="#0e7490" opacity="0.45"
              fontFamily="monospace" transform="rotate(90, 192, 200)"
            >
              GULF OF THAILAND
            </text>
            <text
              x="22" y="220" fontSize="6.5" fill="#0e7490" opacity="0.45"
              fontFamily="monospace" transform="rotate(-90, 22, 220)"
            >
              ANDAMAN SEA
            </text>

            {/* ── Static coastlines ── */}
            <path d={GULF_COAST}    fill="none" stroke="#cbd5e1" strokeWidth="1.8" strokeLinecap="round" />
            <path d={ANDAMAN_COAST} fill="none" stroke="#cbd5e1" strokeWidth="1.8" strokeLinecap="round" />

            {/* ── Animated route: Gulf sea leg ── */}
            {shouldAnimate && (
              <motion.path
                d={route.gulfSea}
                fill="none"
                stroke="#0e7490"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="6 4"
                markerEnd={isForward ? undefined : "url(#arrow-teal)"}
                markerStart={isForward ? "url(#arrow-teal)" : undefined}
                initial="hidden"
                animate="visible"
                variants={drawPath(0, 1.4)}
              />
            )}

            {/* ── Animated route: Land bridge ── */}
            {shouldAnimate && (
              <motion.path
                d={route.landBridge}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="4 3"
                markerEnd="url(#arrow-amber)"
                initial="hidden"
                animate="visible"
                variants={drawPath(1.2, 0.7)}
              />
            )}

            {/* ── Animated route: Andaman sea leg ── */}
            {shouldAnimate && (
              <motion.path
                d={route.andamanSea}
                fill="none"
                stroke="#0e7490"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="6 4"
                markerEnd={isForward ? "url(#arrow-teal)" : undefined}
                markerStart={isForward ? undefined : "url(#arrow-teal)"}
                initial="hidden"
                animate="visible"
                variants={drawPath(1.7, 1.2)}
              />
            )}

            {/* ── Overland label ── */}
            {shouldAnimate && (
              <motion.text
                x="96" y="222"
                fontSize="7" fontWeight="700"
                fill="#f59e0b"
                textAnchor="middle"
                fontFamily="system-ui, sans-serif"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.4 }}
              >
                80 km overland
              </motion.text>
            )}

            {/* ── City pins ── */}
            {visiblePins.map((pinId, i) => {
              const pin = ALL_PINS[pinId];
              if (!pin) return null;
              const isOrigin = pinId === route.originPin;
              const isDest   = pinId === route.destPin;
              const color    = (pinId === "chumphon" || pinId === "ranong")
                ? "#f59e0b"
                : isOrigin || isDest
                  ? "#0e7490"
                  : "#94a3b8";
              const size = isOrigin || isDest ? 6 : 4.5;

              return shouldAnimate ? (
                <motion.g
                  key={pinId}
                  initial="hidden"
                  animate="visible"
                  variants={popIn(0.2 + i * 0.15)}
                >
                  <circle cx={pin.x} cy={pin.y} r={size + 4} fill={color} opacity="0.15" />
                  <circle cx={pin.x} cy={pin.y} r={size} fill={color} />
                  <circle cx={pin.x} cy={pin.y} r={size - 2} fill="white" opacity="0.75" />
                  <text
                    x={pin.side === "right" ? pin.x + size + 5 : pin.x - size - 5}
                    y={pin.y + 4}
                    fontSize={isOrigin || isDest ? "9.5" : "8.5"}
                    fontWeight={isOrigin || isDest ? "700" : "500"}
                    fill={color}
                    textAnchor={pin.side === "right" ? "start" : "end"}
                    fontFamily="system-ui, sans-serif"
                  >
                    {pin.label}
                  </text>
                  {/* Origin/dest badge */}
                  {(isOrigin || isDest) && (
                    <text
                      x={pin.side === "right" ? pin.x + size + 5 : pin.x - size - 5}
                      y={pin.y + 15}
                      fontSize="6.5"
                      fill={color}
                      opacity="0.65"
                      textAnchor={pin.side === "right" ? "start" : "end"}
                      fontFamily="system-ui, sans-serif"
                    >
                      {isOrigin ? "Origin" : "Destination"}
                    </text>
                  )}
                </motion.g>
              ) : (
                <g key={pinId} opacity="0" />
              );
            })}
          </svg>
        </motion.div>
      </AnimatePresence>

      {/* ── Legend ── */}
      <div className="flex items-center justify-center gap-5 mt-1">
        {[
          { color: "#0e7490", dash: "6 4", label: "Sea route" },
          { color: "#f59e0b", dash: "4 3", label: "80 km overland" },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-1.5">
            <svg width="22" height="6" viewBox="0 0 22 6">
              <line x1="0" y1="3" x2="22" y2="3"
                stroke={l.color} strokeWidth="2.5"
                strokeDasharray={l.dash} strokeLinecap="round"
              />
            </svg>
            <span className="text-xs text-foreground/55 font-medium">{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
