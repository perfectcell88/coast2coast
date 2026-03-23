import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ThailandRouteMap = ({ activeRouteIndex = 0 }) => {
  // --- Constants & Styling ---
  const colors = {
    land: "#1a1c1e",
    border: "#33373b",
    seaRoute: "#00f2ff", // Premium Cyan
    landRoute: "#ffcc00", // Alert Amber
    bg: "#0b0c0d"
  };

  // --- Route Data ---
  // Route 0: Standard Gulf to Andaman via Land Bridge
  // Route 1: International Singapore Route (The Dotted Deep Sea Line)
  const routes = [
    {
      id: "gulf-andaman",
      label: "Gulf to Andaman Transit",
      path: "M 220,100 Q 180,150 140,220 L 100,280", // Simplified for example
      isDotted: false,
      hasSingapore: false,
    },
    {
      id: "singapore-expedition",
      label: "Singapore Deep Sea Route",
      path: "M 220,100 C 280,200 300,350 250,450 S 100,350 80,300", 
      isDotted: true,
      hasSingapore: true,
    }
  ];

  const currentRoute = routes[activeRouteIndex] || routes[0];

  return (
    <div className="relative w-full aspect-[3/4] bg-[#0b0c0d] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
      <svg 
        viewBox="0 0 320 480" 
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Premium Glow Filter */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          
          {/* Subtle Land Shadow */}
          <filter id="shadow">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.5" />
          </filter>
        </defs>

        {/* 1. Map Background (Simplified Peninsula) */}
        <path 
          d="M160,20 L200,50 L220,120 L180,220 L140,280 L130,400 L110,480 L80,450 L90,300 L110,200 L130,50 Z" 
          fill={colors.land}
          stroke={colors.border}
          strokeWidth="1"
          filter="url(#shadow)"
        />

        {/* 2. Dynamic Route Line */}
        <AnimatePresence mode="wait">
          <motion.path
            key={currentRoute.id}
            d={currentRoute.path}
            fill="none"
            stroke={currentRoute.isDotted ? colors.seaRoute : colors.landRoute}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={currentRoute.isDotted ? "8, 6" : "0"}
            filter="url(#glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </AnimatePresence>

        {/* 3. Location Markers */}
        <LocationMarker x={220} y={100} label="Pattaya" />
        {currentRoute.hasSingapore && <LocationMarker x={250} y={450} label="Singapore" color={colors.seaRoute} />}
        <LocationMarker x={80} y={300} label="Phuket" />
      </svg>

      {/* 4. HUD Overlay */}
      <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg">
        <h3 className="text-white font-bold text-lg tracking-tight">{currentRoute.label}</h3>
        <p className="text-gray-400 text-xs uppercase tracking-widest mt-1">
          {currentRoute.isDotted ? "Deep Sea Transit" : "Inter-Coastal Land Bridge"}
        </p>
      </div>
    </div>
  );
};

const LocationMarker = ({ x, y, label, color = "#fff" }) => (
  <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }}>
    <circle cx={x} cy={y} r="5" fill={color} filter="url(#glow)" />
    <text x={x + 10} y={y + 5} fill="white" fontSize="10" fontWeight="bold" className="pointer-events-none">
      {label}
    </text>
  </motion.g>
);

export default ThailandRouteMap;
