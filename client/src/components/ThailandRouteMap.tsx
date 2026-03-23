import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ROUTES_DATA = [
  // Direct Express Routes (Standard Gold)
  { id: 'pth-hkt-express', label: 'Pattaya → Phuket (Express)', points: 'M 320 280 L 150 650', isDotted: false, color: '#D4AF37' },
  { id: 'bkk-hkt-express', label: 'Bangkok → Phuket (Express)', points: 'M 280 250 L 150 650', isDotted: false, color: '#D4AF37' },
  
  // Traditional Route via Singapore (Dotted)
  { 
    id: 'pth-sg-pkt-trad', 
    label: 'Pattaya → Singapore → Phuket (Traditional)', 
    points: 'M 320 280 L 350 850 L 150 650', // Note the 'L' for direct segments
    isDotted: true, 
    color: '#D4AF37' 
  },
  
  // Coastal/Secondary Routes
  { id: 'ran-cmp', label: 'Ranong → Chumphon', points: 'M 140 520 L 195 500', isDotted: false, color: '#0ea5e9' }
];

const CITIES = [
  { name: 'Bangkok', x: 280, y: 250 },
  { name: 'Pattaya', x: 320, y: 280 },
  { name: 'Phuket', x: 150, y: 650 },
  { name: 'Chumphon', x: 195, y: 500 },
  { name: 'Ranong', x: 140, y: 520 },
  { name: 'Singapore', x: 350, y: 850 },
];

const MapComponent = () => {
  const [hoveredRoute, setHoveredRoute] = useState(null);

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { duration: 2.5, ease: "easeInOut" } 
    }
  };

  return (
    <div className="relative w-full h-[900px] bg-slate-950 flex items-center justify-center overflow-hidden rounded-xl border border-white/10 shadow-2xl">
      {/* Background Subtle Map Texture or Image could go here */}
      <svg 
        viewBox="0 0 500 1000" 
        className="w-full h-full drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]"
      >
        {/* Render Routes */}
        {ROUTES_DATA.map((route) => (
          <motion.path
            key={route.id}
            d={route.points}
            variants={pathVariants}
            initial="hidden"
            animate="visible"
            fill="none"
            stroke={route.color}
            strokeWidth={hoveredRoute === route.id ? "3" : "2"}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={route.isDotted ? "8, 8" : "0"}
            onMouseEnter={() => setHoveredRoute(route.id)}
            onMouseLeave={() => setHoveredRoute(null)}
            className="cursor-pointer transition-all duration-300"
            style={{
              filter: `drop-shadow(0 0 ${hoveredRoute === route.id ? '8px' : '3px'} ${route.color}80)`
            }}
          />
        ))}

        {/* Render City Pins */}
        {CITIES.map((city) => (
          <motion.g 
            key={city.name}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
          >
            <circle cx={city.x} cy={city.y} r="4" fill="#fff" className="shadow-lg" />
            <circle cx={city.x} cy={city.y} r="8" fill="transparent" stroke={city.name === 'Singapore' ? '#D4AF37' : '#fff'} strokeWidth="1" opacity="0.5" />
            <text 
              x={city.x + 12} 
              y={city.y + 4} 
              fill="white" 
              fontSize="12" 
              fontWeight="300" 
              className="pointer-events-none uppercase tracking-widest select-none"
              style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}
            >
              {city.name}
            </text>
          </motion.g>
        ))}
      </svg>

      {/* Premium UI Overlay */}
      <div className="absolute top-8 left-8 p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg">
        <h2 className="text-white text-xl font-light tracking-tighter uppercase mb-2">
          Route Logistics
        </h2>
        <div className="w-12 h-[2px] bg-[#D4AF37] mb-4" />
        <p className="text-white/60 text-xs font-medium max-w-[200px] leading-relaxed">
          Premium marine transit connecting strategic hubs across Thailand and beyond.
        </p>
      </div>
    </div>
  );
};

export default MapComponent;
