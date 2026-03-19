/**
 * ThailandRouteMap
 *
 * An accurate, minimal SVG outline of Thailand's southern peninsula showing:
 *  - Gulf of Thailand coastline (east side)
 *  - Andaman Sea coastline (west side)
 *  - The overland land-bridge route: Chumphon → Ranong (80 km)
 *  - Key city pins: Bangkok, Pattaya, Chumphon, Ranong, Phuket
 *  - Animated dashed route line that draws itself on scroll-into-view
 *
 * The SVG coordinate space is 200 × 420 (viewBox).
 * Coordinates are hand-traced from a geographic reference of the Kra Isthmus region.
 */

import { useRef, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

// ─── Geography ──────────────────────────────────────────────────────────────
// All coordinates are in the SVG viewBox space (0 0 200 420).
// North is up. The map covers roughly 5°N – 16°N latitude.

/** Simplified east (Gulf) coastline path — from Bangkok area down to Chumphon */
const GULF_COAST =
  "M 130,18 C 138,30 145,55 148,80 C 150,100 149,120 145,145 C 141,165 136,180 130,200 C 125,215 120,228 116,240";

/** Simplified west (Andaman) coastline path — from Myanmar border down to Phuket */
const ANDAMAN_COAST =
  "M 58,80 C 60,100 62,120 65,140 C 68,160 70,175 72,190 C 74,205 75,218 76,230 C 77,242 78,255 80,268 C 83,285 88,300 95,315 C 100,325 106,335 112,345";

/** The land-bridge overland segment: Chumphon (Gulf side) → Ranong (Andaman side) */
const LAND_BRIDGE_PATH = "M 116,240 C 105,238 95,236 86,234 C 82,233 79,232 76,230";

/** Sea route: Pattaya → Chumphon (down the Gulf) */
const GULF_SEA_ROUTE = "M 140,115 C 138,135 132,160 125,185 C 120,200 118,220 116,240";

/** Sea route: Ranong → Phuket (down the Andaman) */
const ANDAMAN_SEA_ROUTE = "M 76,230 C 77,248 80,268 86,285 C 92,300 100,318 112,345";

// ─── Pin positions ───────────────────────────────────────────────────────────
const PINS = [
  { id: "bangkok",  label: "Bangkok",  x: 148, y: 68,  side: "right" as const, color: "#0e7490", size: 6 },
  { id: "pattaya",  label: "Pattaya",  x: 148, y: 108, side: "right" as const, color: "#0e7490", size: 5 },
  { id: "chumphon", label: "Chumphon", x: 116, y: 240, side: "right" as const, color: "#f59e0b", size: 5 },
  { id: "ranong",   label: "Ranong",   x: 76,  y: 230, side: "left"  as const, color: "#f59e0b", size: 5 },
  { id: "phuket",   label: "Phuket",   x: 112, y: 345, side: "left"  as const, color: "#0e7490", size: 6 },
];

// ─── Legend items ────────────────────────────────────────────────────────────
const LEGEND = [
  { color: "#0e7490",  dash: "none",    label: "Sea route" },
  { color: "#f59e0b",  dash: "4 3",     label: "80 km overland" },
];

// ─── Component ───────────────────────────────────────────────────────────────
export default function ThailandRouteMap({ activeRoute }: { activeRoute: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  // Which sea-route segments to highlight based on active tab
  // 0 = Pattaya→Phuket, 1 = Phuket→Pattaya, 2 = Bangkok→Phuket, 3 = Phuket→Bangkok
  const showBangkok = activeRoute === 2 || activeRoute === 3;
  const showPattaya = activeRoute === 0 || activeRoute === 1;

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 1.8, ease: "easeInOut" as const },
    },
  };

  const pinVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (delay: number) => ({
      scale: 1,
      opacity: 1,
      transition: { delay, duration: 0.4, type: "spring" as const, stiffness: 260, damping: 20 },
    }),
  };

  return (
    <div ref={ref} className="relative w-full" style={{ maxWidth: 320, margin: "0 auto" }}>
      <svg
        viewBox="0 0 200 420"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        style={{ overflow: "visible" }}
        aria-label="Map of Thailand's southern peninsula showing the Coast to Coast transport route"
      >
        {/* ── Background ── */}
        <rect x="0" y="0" width="200" height="420" fill="transparent" />

        {/* ── Sea labels ── */}
        <text x="168" y="180" fontSize="7" fill="#0e7490" opacity="0.55" fontFamily="monospace" transform="rotate(90, 168, 180)">GULF OF THAILAND</text>
        <text x="28" y="200" fontSize="7" fill="#0e7490" opacity="0.55" fontFamily="monospace" transform="rotate(-90, 28, 200)">ANDAMAN SEA</text>

        {/* ── Coastlines (static, subtle) ── */}
        <path d={GULF_COAST}    fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />
        <path d={ANDAMAN_COAST} fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />

        {/* ── Animated route lines ── */}

        {/* Gulf sea route (Pattaya/Bangkok → Chumphon) */}
        {(showPattaya || showBangkok) && (
          <motion.path
            key={`gulf-${activeRoute}`}
            d={GULF_SEA_ROUTE}
            fill="none"
            stroke="#0e7490"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="5 3"
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={pathVariants}
          />
        )}

        {/* Land bridge (Chumphon → Ranong) — always shown */}
        <motion.path
          key={`land-${activeRoute}`}
          d={LAND_BRIDGE_PATH}
          fill="none"
          stroke="#f59e0b"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="4 3"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            visible: {
              pathLength: 1,
              opacity: 1,
              transition: { duration: 0.8, ease: "easeInOut" as const, delay: 0.9 },
            },
          }}
        />

        {/* Andaman sea route (Ranong → Phuket) */}
        <motion.path
          key={`andaman-${activeRoute}`}
          d={ANDAMAN_SEA_ROUTE}
          fill="none"
          stroke="#0e7490"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="5 3"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            visible: {
              pathLength: 1,
              opacity: 1,
              transition: { duration: 1.2, ease: "easeInOut" as const, delay: 1.4 },
            },
          }}
        />

        {/* ── City pins ── */}
        {PINS.map((pin, i) => {
          // Only show Bangkok pin when Bangkok routes are active
          if (pin.id === "bangkok" && !showBangkok) return null;
          // Only show Pattaya pin when Pattaya routes are active
          if (pin.id === "pattaya" && !showPattaya) return null;

          return (
            <motion.g
              key={pin.id}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={0.3 + i * 0.2}
              variants={pinVariants}
            >
              {/* Outer ring */}
              <circle cx={pin.x} cy={pin.y} r={pin.size + 3} fill={pin.color} opacity="0.18" />
              {/* Inner dot */}
              <circle cx={pin.x} cy={pin.y} r={pin.size} fill={pin.color} />
              <circle cx={pin.x} cy={pin.y} r={pin.size - 2} fill="white" opacity="0.7" />

              {/* Label */}
              <text
                x={pin.side === "right" ? pin.x + pin.size + 5 : pin.x - pin.size - 5}
                y={pin.y + 4}
                fontSize="9"
                fontWeight="600"
                fill={pin.color}
                textAnchor={pin.side === "right" ? "start" : "end"}
                fontFamily="system-ui, sans-serif"
              >
                {pin.label}
              </text>
            </motion.g>
          );
        })}

        {/* ── Overland label ── */}
        {inView && (
          <motion.text
            x="96"
            y="228"
            fontSize="7.5"
            fontWeight="700"
            fill="#f59e0b"
            textAnchor="middle"
            fontFamily="system-ui, sans-serif"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
            80 km overland
          </motion.text>
        )}
      </svg>

      {/* ── Legend ── */}
      <div className="flex items-center justify-center gap-5 mt-2">
        {LEGEND.map((l) => (
          <div key={l.label} className="flex items-center gap-1.5">
            <svg width="22" height="4" viewBox="0 0 22 4">
              <line
                x1="0" y1="2" x2="22" y2="2"
                stroke={l.color}
                strokeWidth="2.5"
                strokeDasharray={l.dash === "none" ? undefined : l.dash}
                strokeLinecap="round"
              />
            </svg>
            <span className="text-xs text-foreground/55 font-medium">{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
