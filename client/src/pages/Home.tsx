import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Anchor,
  Shield,
  Clock,
  CheckCircle,
  ArrowRight,
  Play,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  TrendingUp,
  Gauge,
  Ruler,
  Weight,
  AlertTriangle,
  MapPin,
} from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThailandRouteMap from "@/components/ThailandRouteMap";
import HeroParticles from "@/components/HeroParticles";
import SEO from "@/components/SEO";

const galleryImages = [
  { src: "/gallery/2.webp", alt: "Boat being prepared for transport at the dock" },
  { src: "/gallery/3.webp", alt: "Catamaran being lowered into the Andaman Sea" },
  { src: "/gallery/4.webp", alt: "Catamaran secured on low-deck trailer at night" },
  { src: "/gallery/5.webp", alt: "Dual crane operation at the waterfront" },
  { src: "/gallery/6.webp", alt: "Custom transit cradle on low-deck trailer" },
  { src: "/gallery/7.webp", alt: "Catamaran lifted by crane at night" },
  { src: "/gallery/9.webp", alt: "Catamaran on low-deck trailer on the road" },
  { src: "/gallery/10.webp", alt: "Dual crane setup ready for lift" },
  { src: "/gallery/12.webp", alt: "Keel yacht on specialist low-loader — rear view showing hull profile" },
  { src: "/gallery/14.webp", alt: "Keel yacht on low-deck trailer secured for overland relocation" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

function useInView(ref: React.RefObject<Element | null>) {
  const [inView, setInView] = useState(false);
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
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return inView;
}

function FadeSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const heroImage = "/heroboat.jpg";
  const [heroLoaded, setHeroLoaded] = useState(false);

  // Preload hero image and fade in when ready
  useEffect(() => {
    const img = new Image();
    img.src = heroImage;
    img.onload = () => setHeroLoaded(true);
    // Fallback in case already cached
    if (img.complete) setHeroLoaded(true);
  }, [heroImage]);

  const [videoOpen, setVideoOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current);
  }, []);

  const startAuto = useCallback(() => {
    stopAuto();
    autoRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % galleryImages.length);
    }, 4500);
  }, [stopAuto]);

  useEffect(() => {
    startAuto();
    return stopAuto;
  }, [startAuto, stopAuto]);

  const goPrev = () => {
    stopAuto();
    setCurrent((c) => (c - 1 + galleryImages.length) % galleryImages.length);
    startAuto();
  };

  const goNext = () => {
    stopAuto();
    setCurrent((c) => (c + 1) % galleryImages.length);
    startAuto();
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  useEffect(() => {
    if (!lightboxOpen && !videoOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxOpen(false);
        setVideoOpen(false);
      }
      if (lightboxOpen) {
        if (e.key === "ArrowLeft") setLightboxIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length);
        if (e.key === "ArrowRight") setLightboxIndex((i) => (i + 1) % galleryImages.length);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxOpen, videoOpen]);

  useEffect(() => {
    document.body.style.overflow = videoOpen || lightboxOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [videoOpen, lightboxOpen]);


  const specItems = [
    { icon: Ruler, label: "Max Height", value: "5.5 m" },
    { icon: Ruler, label: "Max Width", value: "5.5 m" },
    { icon: Ruler, label: "Max Length", value: "15 m" },
    { icon: Weight, label: "Max Weight", value: "32 Tons" },
  ];

  const routes = [
    {
      from: "Pattaya",
      to: "Phuket",
      time: "Under 7 Days",
      engineHours: "~50 hrs",
      seaMiles: "350",
      overland: "80 km",
      description: "Our flagship route — Gulf to Andaman in under a week.",
      highlight: true,
    },
    {
      from: "Phuket",
      to: "Pattaya",
      time: "Under 7 Days",
      engineHours: "~50 hrs",
      seaMiles: "350",
      overland: "80 km",
      description: "Andaman to Gulf — same professional service, reverse direction.",
      highlight: false,
    },
    {
      from: "Chumphon",
      to: "Phuket",
      time: "Under 7 Days",
      engineHours: "~10 hrs",
      seaMiles: "~50",
      overland: "80 km",
      description: "Vessel already at Chumphon? We crane out, transport overland, and launch at Ranong for delivery to Phuket or any Andaman destination.",
      highlight: false,
    },
    {
      from: "Phuket",
      to: "Chumphon",
      time: "Under 7 Days",
      engineHours: "~10 hrs",
      seaMiles: "~50",
      overland: "80 km",
      description: "Andaman to Gulf with Chumphon as your destination. Craned out at Ranong, trucked overland, relaunched at Chumphon.",
      highlight: false,
    },
    {
      from: "Ranong",
      to: "Pattaya",
      time: "Under 7 Days",
      engineHours: "~50 hrs",
      seaMiles: "~350",
      overland: "80 km",
      description: "Vessel at Ranong? We crane out, transport overland to Chumphon, and deliver to Pattaya or any Gulf destination.",
      highlight: false,
    },
    {
      from: "Pattaya",
      to: "Ranong",
      time: "Under 7 Days",
      engineHours: "~50 hrs",
      seaMiles: "~350",
      overland: "80 km",
      description: "Gulf to Andaman with Ranong as your destination. Craned out at Chumphon, trucked overland, relaunched at Ranong.",
      highlight: false,
    },
  ];

  const [activeRoute, setActiveRoute] = useState(0);

  return (
    <div className="min-h-screen">
      <SEO
        title="Coast to Coast Marine Transportation Thailand | Vessel Relocation Specialists"
        description="Thailand's specialist in safe, professional vessel relocation between the Gulf of Thailand and the Andaman Sea. Powerboats, yachts and catamarans transported from Pattaya or Bangkok to Phuket in under 7 days."
        path="/"
      />      {/* ── HERO ──────────────────────────────────────────────────────── */}
      {/* ── MOBILE HERO (hidden on md+) ── */}
      <div
        className="md:hidden flex flex-col"
        style={{ opacity: heroLoaded ? 1 : 0, transition: "opacity 0.9s ease" }}
      >
        {/* Image block — completely clean, no text */}
        <div
          className="relative w-full"
          style={{
            height: "56vw",
            minHeight: "220px",
            maxHeight: "420px",
            backgroundImage: `url('${heroImage}')`,
            backgroundSize: "cover",
            backgroundPosition: "center 55%",
          }}
        >
          {/* Navbar gradient */}
          <div className="absolute inset-x-0 top-0" style={{ height: "80px", background: "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, transparent 100%)" }} />
        </div>
        {/* Content block below image */}
        <div className="bg-[#2c3e50] px-6 py-8 flex flex-col items-center text-center text-white">
          <h1 className="font-display font-bold uppercase mb-2" style={{ fontSize: "clamp(2rem, 10vw, 3rem)", letterSpacing: "0.18em", lineHeight: 1.05, textShadow: "0 2px 12px rgba(0,0,0,0.8)" }}>Coast to Coast</h1>
          <p className="font-mono-accent uppercase font-bold mb-4" style={{ fontSize: "clamp(0.6rem, 3.2vw, 0.85rem)", letterSpacing: "0.38em", color: "rgba(0,200,200,0.95)" }}>Marine Transportation Thailand</p>
          <div className="flex items-center gap-3 w-full max-w-xs mx-auto mb-6">
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(0,200,200,0.6))" }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(0,200,200,1)" }} />
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(0,200,200,0.6), transparent)" }} />
          </div>
          <p className="font-bold mb-3" style={{ fontSize: "clamp(1.1rem, 5vw, 1.4rem)", lineHeight: 1.25 }}>Thailand's Premier Vessel<br />Relocation Specialist</p>
          <p className="mb-8 leading-relaxed" style={{ fontSize: "clamp(0.85rem, 3.8vw, 1rem)", color: "rgba(255,255,255,0.85)" }}>
            Transporting vessels from the Gulf of Thailand overland to the Andaman Sea. Complete marine oversized transportation company — paying attention to detail, coast to coast.
          </p>
          <div className="flex flex-col items-stretch gap-3 w-full max-w-sm">
            <button
              onClick={() => setVideoOpen(true)}
              className="flex items-center justify-center gap-3 w-full bg-white/10 border border-white/30 text-white font-semibold rounded-xl px-6 py-4"
              style={{ fontSize: "0.95rem", letterSpacing: "0.06em" }}
            >
              <div className="w-6 h-6 rounded-full border border-white/50 flex items-center justify-center flex-shrink-0"><Play size={11} className="ml-0.5" /></div>
              <span className="uppercase tracking-widest">Watch Our Process</span>
            </button>
            <Link href="/contact">
              <a className="flex items-center justify-center gap-3 w-full bg-secondary text-white font-semibold rounded-xl px-6 py-4 shadow-xl shadow-secondary/40"
                style={{ fontSize: "0.95rem", letterSpacing: "0.06em" }}
              >
                <Anchor size={16} className="flex-shrink-0 opacity-90" />
                <span className="uppercase tracking-widest">Contact Us</span>
              </a>
            </Link>
            <a
              href="https://www.facebook.com/profile.php?id=61588477663667"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full bg-white/10 border border-white/30 text-white font-semibold rounded-xl px-6 py-4"
              style={{ fontSize: "0.95rem", letterSpacing: "0.06em" }}
            >
              <div className="w-6 h-6 rounded-full bg-[#1877F2] flex items-center justify-center flex-shrink-0">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </div>
              <span className="uppercase tracking-widest">Follow Us on Facebook</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── DESKTOP HERO (hidden on mobile) ── */}
      <section
        className="hidden md:flex relative min-h-screen items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url('${heroImage}')`,
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
          opacity: heroLoaded ? 1 : 0,
          transition: "opacity 0.9s ease",
        }}
      >
        {/* Base darkening overlay */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.18) 55%, rgba(0,0,0,0.38) 100%)" }} />
        {/* Navbar shadow */}
        <div className="absolute inset-x-0 top-0 pointer-events-none" style={{ height: "140px", background: "linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.0) 100%)" }} />
        {/* Subtle drifting particles */}
        <HeroParticles />

        {/* ── TOP BLOCK — title + insignia ── */}
        <motion.div
          className="absolute top-0 left-0 right-0 z-10 flex flex-col items-center text-center text-white px-4"
          style={{ paddingTop: "clamp(8rem, 14.5vh, 12rem)" }}
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" as const }}
        >
          <div className="relative mb-2">
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,200,200,0.10) 0%, transparent 70%)", filter: "blur(18px)" }} />
            <h1
              className="relative font-display font-bold uppercase w-full text-center"
              style={{
                fontSize: "clamp(2.8rem, 7.5vw, 7.5rem)",
                letterSpacing: "0.22em",
                color: "#ffffff",
                textShadow: "0 0 100px rgba(0,200,200,0.18), 0 2px 24px rgba(0,0,0,0.95)",
                lineHeight: 1.05,
              }}
            >
              Coast to Coast
            </h1>
          </div>
          <div className="w-full mb-3">
            <p
              className="font-mono-accent uppercase font-bold text-center"
              style={{
                fontSize: "clamp(0.7rem, 1.6vw, 1.3rem)",
                letterSpacing: "0.42em",
                color: "rgba(255,255,255,0.95)",
                textShadow: "0 0 30px rgba(0,0,0,0.9), 0 2px 12px rgba(0,0,0,0.9)",
              }}
            >
              Marine Transportation Thailand
            </p>
          </div>
          <div className="flex items-center justify-center gap-3 w-full max-w-xl mx-auto mt-3">
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(0,200,200,0.75))" }} />
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "rgba(0,200,200,1)", boxShadow: "0 0 6px rgba(0,200,200,1), 0 0 14px rgba(0,200,200,0.5)" }} />
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                <rect x="1.5" y="1.5" width="9" height="9" transform="rotate(45 6 6)" fill="none" stroke="rgba(0,200,200,0.95)" strokeWidth="1.3" style={{ filter: "drop-shadow(0 0 4px rgba(0,200,200,0.85))" }} />
              </svg>
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "rgba(0,200,200,1)", boxShadow: "0 0 6px rgba(0,200,200,1), 0 0 14px rgba(0,200,200,0.5)" }} />
            </div>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(0,200,200,0.75), transparent)" }} />
          </div>
        </motion.div>

        {/* ── BOTTOM LEFT BLOCK — glassmorphic card (left-anchored) ── */}
        <motion.div
          className="absolute bottom-0 left-0 z-10"
          style={{
            paddingBottom: "clamp(1.5rem, 3vh, 3rem)",
            paddingLeft: "clamp(2rem, 6vw, 7rem)",
            maxWidth: "clamp(280px, 34vw, 480px)",
            width: "100%",
          }}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" as const }}
        >
          {/* The frosted blur card — no borders */}
          <div
            style={{
              width: "100%",
              background: "rgba(4, 14, 28, 0.03)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              borderRadius: "18px 18px 0 0",
              border: "none",
              boxShadow: "none",
              padding: "clamp(1.6rem, 2.8vw, 2.2rem) clamp(1.6rem, 2.8vw, 2.2rem) 0",
            }}
          >
            <p
              className="text-center w-full"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.3rem, 1.8vw, 1.75rem)",
                color: "rgba(255,255,255,1)",
                fontWeight: 700,
                fontStyle: "normal",
                letterSpacing: "0em",
                lineHeight: 1.25,
                marginBottom: "1rem",
                textShadow: "0 2px 20px rgba(0,0,0,0.95), 0 1px 6px rgba(0,0,0,0.8)",
              }}
            >
              Thailand's Premier Vessel<br />Relocation Specialist
            </p>
            <p
              className="text-center leading-relaxed"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.05rem, 1.4vw, 1.45rem)",
                fontWeight: 400,
                fontStyle: "normal",
                color: "rgba(255,255,255,0.92)",
                marginBottom: "1.6rem",
                textShadow: "0 1px 14px rgba(0,0,0,0.95), 0 1px 4px rgba(0,0,0,0.8)",
                lineHeight: 1.65,
              }}
            >
              Transporting vessels from the Gulf of Thailand overland to the Andaman Sea.
              Complete marine oversized transportation company — paying attention to detail, coast to coast.
            </p>

            <div className="flex flex-col items-stretch gap-3">
              <button
                onClick={() => setVideoOpen(true)}
                className="flex items-center justify-center gap-3 w-full text-white font-semibold rounded-xl px-8 py-3.5 transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  fontSize: "0.92rem",
                  letterSpacing: "0.07em",
                  background: "rgba(255,255,255,0.10)",
                  border: "none",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.18)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.10)"; }}
              >
                <div className="w-6 h-6 rounded-full border border-white/40 flex items-center justify-center flex-shrink-0">
                  <Play size={10} className="ml-0.5" />
                </div>
                <span className="uppercase tracking-widest">Watch Our Process</span>
              </button>
              <Link href="/contact">
                <a className="flex items-center justify-center gap-3 w-full bg-secondary hover:bg-secondary/90 text-white font-semibold rounded-xl px-8 py-3.5 shadow-lg transition-all duration-200 hover:shadow-secondary/60 hover:-translate-y-0.5 active:translate-y-0"
                  style={{ fontSize: "0.92rem", letterSpacing: "0.07em", border: "none" }}
                >
                  <Anchor size={15} className="flex-shrink-0 opacity-90" />
                  <span className="uppercase tracking-widest">Contact Us</span>
                </a>
              </Link>
              <a
                href="https://www.facebook.com/profile.php?id=61588477663667"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full text-white font-semibold rounded-xl px-8 py-3.5 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
                style={{
                  fontSize: "0.92rem",
                  letterSpacing: "0.07em",
                  background: "rgba(255,255,255,0.10)",
                  border: "none",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.18)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.10)"; }}
              >
                <div className="w-6 h-6 rounded-full bg-[#1877F2] flex items-center justify-center flex-shrink-0">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <span className="uppercase tracking-widest">Follow Us on Facebook</span>
              </a>
            </div>
            <div style={{ height: "clamp(1.4rem, 2.5vw, 2rem)" }} />
          </div>
        </motion.div>
        {/* Animated scroll chevron */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer z-20"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          onClick={() => window.scrollBy({ top: window.innerHeight * 0.85, behavior: "smooth" })}
        >
          <svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L11 12L21 1" stroke="rgba(0,200,200,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>

      </section>

      {/* ── VIDEO MODAL ───────────────────────────────────────────── */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/92 flex items-center justify-center p-4"
            onClick={() => setVideoOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setVideoOpen(false)}
                className="absolute -top-12 right-0 text-white/80 hover:text-secondary transition-colors"
                aria-label="Close video"
              >
                <X size={30} />
              </button>
              <div className="relative pb-[56.25%] h-0 rounded-2xl overflow-hidden shadow-2xl">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/daaGM_qr1L4?autoplay=1&rel=0&modestbranding=1"
                  title="Coast to Coast Marine Transportation Thailand — Watch Our Process"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p className="text-white/50 text-sm text-center mt-3">
                Coast to Coast Marine Transportation Thailand — Watch Our Process
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* ── ROUTE / MAP ───────────────────────────────────────────── */}
      <section className="py-24 md:py-32 relative overflow-hidden" style={{ background: "linear-gradient(160deg, #2c3e50 0%, #2c3e50 40%, #2a4a5e 70%, #2c3e50 100%)" }}>
        {/* Nautical chart grid overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `
            linear-gradient(rgba(0,180,180,0.055) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,180,180,0.055) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }} />
        {/* Compass rose radial glow centred on map area */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 55% at 72% 52%, rgba(0,200,200,0.1) 0%, rgba(0,120,160,0.06) 40%, transparent 70%)" }} />
        {/* Subtle wave shimmer at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(0,180,180,0.07), transparent)" }} />
        <div className="container relative z-10">
          <FadeSection>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <p className="font-mono-accent text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "#00c8c8" }}>The Route</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Coast to Coast</h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.6)" }}>The premier overland marine transport corridor connecting Thailand's Gulf and Andaman coasts — in both directions.</p>
            </motion.div>
            {/* ── MAP + COMPARISON SECTION SIDE BY SIDE ── */}
            <motion.div variants={fadeUp} className="mb-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto items-stretch">
                {/* Left side: Comparison cards */}
                <div className="flex flex-col gap-6 lg:col-span-1">
                  {/* Comparison header */}
                  <div>
                    <p className="font-mono-accent text-xs tracking-[0.3em] uppercase text-secondary mb-2" style={{ color: "#00c8c8" }}>The Smart Choice</p>
                    <h3 className="font-display text-xl font-bold text-white mb-2">The Shortcut Comparison</h3>
                    <p className="text-sm opacity-70" style={{ color: "rgba(255,255,255,0.6)" }}>Traditional route around the Malay Peninsula vs. our land-bridge solution.</p>
                  </div>

                  {/* Traditional Route Card */}
                  <motion.div
                    variants={fadeUp}
                    className="rounded-2xl p-6 relative flex flex-col"
                    style={{
                      background: "linear-gradient(145deg, #041e2e 0%, #062838 50%, #041e2e 100%)",
                      border: "2px solid rgba(180,145,60,0.55)",
                      boxShadow: "0 0 40px rgba(0,200,200,0.12), 0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(200,170,80,0.15)",
                    }}
                  >
                    <div className="text-xs font-bold px-2 py-1 rounded-full mb-3 inline-block" 
                      style={{ background: "rgba(0,200,200,0.15)", border: "1px solid rgba(0,200,200,0.3)", color: "#00c8c8", width: "fit-content" }}>
                      Traditional Route
                    </div>
                    <AlertTriangle size={24} className="mb-3" style={{ color: "#00c8c8" }} />
                    <h4 className="font-display text-sm font-bold mb-1 text-white">Pattaya → Singapore → Phuket</h4>
                    <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>Via the South China Sea & Malacca Straits</p>
                    <div className="space-y-2 text-xs mb-4">
                      {[
                        { label: "Total Distance", value: "1,700 miles" },
                        { label: "Minimum Time", value: "12+ days (24 hrs/day)" },
                        { label: "Engine Hours", value: "500+ hours" },
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between" style={{ borderBottom: "1px solid rgba(0,200,200,0.2)" }}>
                          <span style={{ color: "rgba(255,255,255,0.65)" }}>{item.label}</span>
                          <span className="font-bold" style={{ color: "#00c8c8" }}>{item.value}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
                      Pattaya to Singapore to Phuket is 1,700 miles — at 6 knots that's 12 days running 24 hours a day, providing all goes well. The east coast of Malaysia provides very little support for repairs and fuel. The notorious South China Sea has its own challenges. Singapore is chaotic with katabatic squalls that create zero visibility and one of the highest incidences of lightning strikes in the world.
                    </p>
                  </motion.div>

                  {/* Coast to Coast Card */}
                  <motion.div
                    variants={fadeUp}
                    className="rounded-2xl p-6 relative flex flex-col"
                    style={{
                      background: "linear-gradient(145deg, #041e2e 0%, #062838 50%, #041e2e 100%)",
                      border: "2px solid rgba(180,145,60,0.55)",
                      boxShadow: "0 0 40px rgba(0,200,200,0.12), 0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(200,170,80,0.15)",
                    }}
                  >
                    <div className="text-xs font-bold px-2 py-1 rounded-full mb-3 inline-block"
                      style={{ background: "linear-gradient(135deg, #a07828, #d4a840)", color: "#fff", boxShadow: "0 0 16px rgba(180,145,60,0.4)", width: "fit-content" }}>
                      ✦ Recommended
                    </div>
                    <TrendingUp size={24} className="mb-3" style={{ color: "#00c8c8" }} />
                    <h4 className="font-display text-sm font-bold mb-1 text-white">Pattaya → Chumphon → Ranong → Phuket</h4>
                    <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.55)" }}>80 km overland land bridge — Coast to Coast</p>
                    <div className="space-y-2 text-xs mb-4">
                      {[
                        { label: "Sea Miles (Pattaya–Phuket)", value: "~350 miles" },
                        { label: "Total Time", value: "Under 1 week" },
                        { label: "Engine Hours", value: "~50 hours" },
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between" style={{ borderBottom: "1px solid rgba(180,145,60,0.2)" }}>
                          <span style={{ color: "rgba(255,255,255,0.6)" }}>{item.label}</span>
                          <span className="font-bold" style={{ color: "#00c8c8" }}>{item.value}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
                      Malacca Straits — another 400 miles of chaos: unlit boats, endless fishing nets, intense Sumatran squalls, dangerous ship convergence zones. It's relentless and no pleasure cruise. Our Chumphon–Ranong land bridge is the new option.
                    </p>
                  </motion.div>

                  {/* Savings summary */}
                  <motion.div variants={fadeUp} className="rounded-xl p-4 grid grid-cols-3 gap-2 text-center"
                    style={{
                      background: "linear-gradient(135deg, #f5f0e8 0%, #faf7f2 50%, #f0ede6 100%)",
                      border: "1px solid rgba(180,145,60,0.25)",
                      boxShadow: "0 4px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.8)",
                    }}>
                    {[
                      { icon: Gauge, value: "79%", label: "Less Sea Miles" },
                      { icon: Clock, value: "90%", label: "Fewer Hrs" },
                      { icon: Shield, value: "<1W", label: "vs 12+ Days" },
                    ].map((s, i) => {
                      const Icon = s.icon;
                      return (
                        <div key={i} className="flex flex-col items-center gap-1">
                          <Icon size={16} style={{ color: "#0a7a7a" }} />
                          <span className="font-display text-xs font-bold" style={{ color: "#061e36" }}>{s.value}</span>
                          <span className="text-xs font-medium" style={{ color: "#4a6070" }}>{s.label}</span>
                        </div>
                      );
                    })}
                  </motion.div>
                </div>

                {/* Right side: Map */}
                <div className="lg:col-span-2 flex flex-col">
                  <ThailandRouteMap
                    activeRoute={activeRoute}
                    onPrev={() => setActiveRoute((activeRoute - 1 + routes.length) % routes.length)}
                    onNext={() => setActiveRoute((activeRoute + 1) % routes.length)}
                    totalRoutes={routes.length}
                  />

                  {/* Active route name label */}
                  <div className="text-center mt-4">
                    <p className="font-display text-lg md:text-xl font-bold text-white">
                      {routes[activeRoute].from} → {routes[activeRoute].to}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>


          </FadeSection>
        </div>
      </section>


      {/* ── TECHNICAL SPECS ─────────────────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ background: "linear-gradient(180deg, #f5f7f9 0%, #eef1f4 100%)" }}>
        <div className="container">
          <FadeSection>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <p className="font-mono-accent text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "#0a8a8a" }}>Load Capacity</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4" style={{ color: "#061e36" }}>
                Our Max Dimensions Are
              </h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: "#4a6070" }}>
                We transport Powerboats, Keel Yachts, and Catamarans. Our custom-fabricated transit cradle accommodates a wide range of vessel profiles.
              </p>
            </motion.div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 max-w-4xl mx-auto">
              {specItems.map((spec, i) => {
                const Icon = spec.icon;
                return (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    className="rounded-2xl p-8 text-center relative overflow-hidden group bg-white"
                    style={{
                      border: "1px solid rgba(0,168,168,0.18)",
                      boxShadow: "0 2px 12px rgba(6,30,54,0.07)",
                      transition: "box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(0,168,168,0.18), 0 2px 12px rgba(6,30,54,0.08)";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,168,168,0.45)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(6,30,54,0.07)";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,168,168,0.18)";
                    }}
                  >
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-4"
                      style={{ background: "rgba(0,168,168,0.1)", border: "1px solid rgba(0,168,168,0.2)" }}>
                      <Icon style={{ color: "#0a8a8a" }} size={20} />
                    </div>
                    <p className="font-display text-4xl font-bold mb-1" style={{ color: "#061e36" }}>{spec.value}</p>
                    <div className="w-8 h-px mx-auto my-2" style={{ background: "rgba(0,168,168,0.35)" }} />
                    <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#4a6070" }}>{spec.label}</p>
                  </motion.div>
                );
              })}
            </div>
            <motion.div variants={fadeUp} className="text-center mt-10">
              <Link href="/contact">
                <a>
                  <button
                    className="text-white font-semibold px-8 py-3 rounded-xl inline-flex items-center gap-2 transition-all duration-300 hover:scale-105"
                    style={{
                      background: "linear-gradient(135deg, #0a8a8a 0%, #00b8b8 100%)",
                      boxShadow: "0 0 24px rgba(0,184,184,0.4), 0 4px 12px rgba(0,0,0,0.3)",
                      border: "1px solid rgba(0,200,200,0.3)",
                    }}
                  >
                    Contact Us <ArrowRight size={18} />
                  </button>
                </a>
              </Link>
            </motion.div>
          </FadeSection>
        </div>
      </section>

      {/* ── RECENT RELOCATIONS GALLERY ────────────────────────────── */}
      <section className="py-20 md:py-28 bg-primary/5">
        <div className="container">
          <FadeSection>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <p className="font-mono-accent text-xs tracking-[0.3em] uppercase text-secondary mb-3">Our Work</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">
                Recent Relocations
              </h2>
              <p className="text-lg text-foreground/65 max-w-2xl mx-auto">
                From crane lifts at midnight to smooth Andaman Sea launches — a glimpse into what we do.
              </p>
            </motion.div>
          </FadeSection>

          {/* Carousel */}
          <div className="relative max-w-5xl mx-auto">
            <div
              className="relative overflow-hidden rounded-2xl shadow-xl cursor-pointer group"
              style={{ aspectRatio: "16/9" }}
              onClick={() => openLightbox(current)}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={current}
                  src={galleryImages[current].src}
                  alt={galleryImages[current].alt}
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.5 }}
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/25 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 backdrop-blur-sm rounded-full p-4">
                  <ZoomIn className="text-white" size={28} />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/75 to-transparent p-6">
                <p className="text-white text-sm font-medium">{galleryImages[current].alt}</p>
                <p className="text-white/55 text-xs mt-0.5">Click to enlarge</p>
              </div>
            </div>

            {/* Arrows */}
            <button
              onClick={goPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all hover:scale-110 z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="text-primary" size={22} />
            </button>
            <button
              onClick={goNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 transition-all hover:scale-110 z-10"
              aria-label="Next image"
            >
              <ChevronRight className="text-primary" size={22} />
            </button>

            {/* Thumbnail strip */}
            <div className="relative mt-4">
            <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
            {/* Right fade gradient to signal scrollability */}
              {galleryImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => { stopAuto(); setCurrent(i); startAuto(); }}
                  className={`flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                    i === current
                      ? "border-secondary shadow-md scale-105"
                      : "border-transparent opacity-55 hover:opacity-85"
                  }`}
                  aria-label={`View image ${i + 1}`}
                >
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            {/* Right fade to signal more thumbnails */}
            <div className="absolute right-0 top-0 bottom-1 w-12 pointer-events-none" style={{ background: "linear-gradient(to right, transparent, rgba(243,246,248,0.95))" }} />
            </div>

            {/* Dot pagination */}
            <div className="flex justify-center gap-2 mt-4">
              {galleryImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { stopAuto(); setCurrent(i); startAuto(); }}
                  className={`rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-6 h-2.5 bg-secondary"
                      : "w-2.5 h-2.5 bg-primary/25 hover:bg-primary/50"
                  }`}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── LIGHTBOX ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute -top-12 right-0 text-white/80 hover:text-secondary transition-colors z-10"
                aria-label="Close lightbox"
              >
                <X size={30} />
              </button>
              <img
                src={galleryImages[lightboxIndex].src}
                alt={galleryImages[lightboxIndex].alt}
                className="w-full max-h-[80vh] object-contain rounded-xl"
              />
              <p className="text-white/65 text-sm text-center mt-3">{galleryImages[lightboxIndex].alt}</p>
              <p className="text-white/35 text-xs text-center mt-1">{lightboxIndex + 1} / {galleryImages.length}</p>
              <button
                onClick={() => setLightboxIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/25 rounded-full p-3 transition-all"
                aria-label="Previous"
              >
                <ChevronLeft className="text-white" size={26} />
              </button>
              <button
                onClick={() => setLightboxIndex((i) => (i + 1) % galleryImages.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/25 rounded-full p-3 transition-all"
                aria-label="Next"
              >
                <ChevronRight className="text-white" size={26} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>



      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section
        className="py-24 md:py-32 text-white relative overflow-hidden"
        style={{
          backgroundImage: "url('/gallery/9.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(44,68,88,0.93) 0%, rgba(10,80,80,0.85) 100%)" }} />
        <div className="container text-center relative z-10">
          <FadeSection>
            <motion.div variants={fadeUp}>
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-8 bg-secondary/60" />
                <p className="font-mono-accent text-xs tracking-[0.3em] uppercase text-secondary">Get Started</p>
                <div className="h-px w-8 bg-secondary/60" />
              </div>
              <p className="text-3xl md:text-4xl mb-10 max-w-2xl mx-auto font-display" style={{ color: "rgba(255,255,255,0.92)", lineHeight: 1.5, fontWeight: 600 }}>
                Contact our Team
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <a>
                    <button
                      className="text-white font-semibold px-10 py-4 rounded-xl text-lg inline-flex items-center gap-2 transition-all duration-300 hover:scale-105"
                      style={{
                        background: "linear-gradient(135deg, #0a8a8a 0%, #00b8b8 100%)",
                        boxShadow: "0 0 28px rgba(0,184,184,0.45), 0 4px 16px rgba(0,0,0,0.3)",
                        border: "1px solid rgba(0,200,200,0.35)",
                      }}
                    >
                      Contact Us <ArrowRight size={18} />
                    </button>
                  </a>
                </Link>
                <Link href="/services">
                  <a>
                    <button
                      className="font-semibold px-10 py-4 rounded-xl text-lg transition-all duration-300 hover:scale-105"
                      style={{
                        background: "rgba(255,255,255,0.08)",
                        border: "1px solid rgba(255,255,255,0.3)",
                        color: "rgba(255,255,255,0.9)",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      Our Services
                    </button>
                  </a>
                </Link>
              </div>
            </motion.div>
          </FadeSection>
        </div>
      </section>
    </div>
  );
}
