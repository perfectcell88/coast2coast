import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Anchor,
  Shield,
  Users,
  Clock,
  CheckCircle,
  ArrowRight,
  Play,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  TrendingDown,
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
  { src: "/gallery/11.webp", alt: "Luxury powerboat secured on low-deck trailer for overland transport" },
  { src: "/gallery/12.webp", alt: "Keel yacht on specialist low-loader — rear view showing hull profile" },
  { src: "/gallery/13.webp", alt: "Sailing yacht oversize load transit on open highway" },
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
      { threshold: 0.12 }
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

  const whyChooseItems = [
    {
      icon: Users,
      title: "Expert Loadmasters",
      description: "Our Maritime Loadmaster travels with your vessel from coast to coast, monitoring it from the rear pilot vehicle throughout the entire journey.",
    },
    {
      icon: Shield,
      title: "Ticketed Captains & Engineers",
      description: "Fully licensed marine professionals handle every aspect of your vessel's relocation with the highest standards of safety.",
    },
    {
      icon: Anchor,
      title: "Custom Transit Cradles",
      description: "Bespoke fabricated cradles engineered for your specific vessel, ensuring perfect support and zero movement during transport.",
    },
    {
      icon: Clock,
      title: "Door-to-Door in Under a Week",
      description: "Crane out, overland, crane in — your vessel is back in the water at its destination within 7 days, with full port clearance handled for you.",
    },
  ];

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
      from: "Bangkok",
      to: "Phuket",
      time: "Under 7 Days",
      engineHours: "~40 hrs",
      seaMiles: "~280",
      overland: "80 km",
      description: "Bangkok-based vessels transported to the Andaman Sea with final delivery to Phuket.",
      highlight: false,
    },
    {
      from: "Phuket",
      to: "Bangkok",
      time: "Under 7 Days",
      engineHours: "~40 hrs",
      seaMiles: "~280",
      overland: "80 km",
      description: "Return route — Andaman to the Gulf of Thailand via the same land bridge.",
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
      />

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen bg-cover bg-center flex items-center justify-center overflow-hidden"
        style={{ backgroundImage: `url('${heroImage}')`, backgroundAttachment: "fixed" }}
      >
        {/* Darkened overlay for strong text contrast */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, rgba(8,32,50,0.92) 0%, rgba(10,55,65,0.82) 50%, rgba(0,100,100,0.70) 100%)" }} />
        {/* Subtle radial light bloom from centre */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(0,184,184,0.08) 0%, transparent 70%)" }} />
        {/* Subtle drifting particles — sea spray / light on water */}
        <HeroParticles />

        <div className="relative z-10 container text-center text-white max-w-4xl mx-auto px-4 pt-32 md:pt-40 pb-40">
          <motion.div
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" as const }}
          >
            <div className="flex items-center justify-center gap-3 mb-10">
              <div
                className="h-px w-12"
                style={{ background: "linear-gradient(90deg, transparent, #00c8c8)", boxShadow: "0 0 6px rgba(0,200,200,0.6)" }}
              />
              <p
                className="font-mono-accent text-xs md:text-sm tracking-[0.28em] uppercase font-semibold"
                style={{
                  color: '#e0f7f7',
                  textShadow: '0 0 20px rgba(0,200,200,0.5), 0 1px 6px rgba(0,0,0,0.8)',
                  letterSpacing: '0.28em',
                }}
              >
                Coast to Coast Marine Transportation Thailand
              </p>
              <div
                className="h-px w-12"
                style={{ background: "linear-gradient(90deg, #00c8c8, transparent)", boxShadow: "0 0 6px rgba(0,200,200,0.6)" }}
              />
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Thailand's Premier<br />
              <span className="text-secondary">Vessel Relocation</span> Specialists
            </h1>
            <p className="text-lg md:text-xl mb-12 font-light max-w-xl mx-auto leading-loose" style={{ color: "rgba(255,255,255,0.82)", textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}>
              From the Gulf of Thailand to the Andaman Sea — and back. We transport your vessel between Bangkok, Pattaya, and Phuket in under a week.
            </p>
            <div className="flex flex-col items-center gap-5 justify-center">
              <Link href="/contact">
                <a>
                  <Button className="bg-secondary hover:bg-secondary/90 text-white px-10 py-6 text-lg font-semibold shadow-xl w-64 sm:w-72">
                    Request a Quote
                  </Button>
                </a>
              </Link>
              <button
                onClick={() => setVideoOpen(true)}
                className="inline-flex items-center justify-center gap-3 border-2 border-white/50 text-white hover:bg-white/15 hover:border-white/80 px-10 py-4 text-base font-medium rounded-md transition-all w-64 sm:w-72"
              >
                <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                  <Play size={12} className="ml-0.5" />
                </div>
                Watch Our Process
              </button>
            </div>
          </motion.div>
        {/* Animated scroll chevron */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          onClick={() => window.scrollBy({ top: window.innerHeight * 0.85, behavior: "smooth" })}
        >
          <span className="text-white/40 text-xs tracking-widest uppercase font-mono-accent" style={{ fontSize: "0.6rem", letterSpacing: "0.2em" }}>Scroll</span>
          <svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L11 12L21 1" stroke="rgba(0,200,200,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
        </div>

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
                  src="https://www.youtube.com/embed/8_Vxj5agMEA?autoplay=1&rel=0&modestbranding=1"
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

      {/* ── WHY CHOOSE US ─────────────────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ background: "linear-gradient(180deg, #f8fafb 0%, #ffffff 100%)" }}>
        <div className="container">
          <FadeSection>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <p className="font-mono-accent text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "#00a8a8" }}>Our Advantage</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">
                Why Choose Coast to Coast?
              </h2>
              <p className="text-lg text-foreground/65 max-w-2xl mx-auto">
                We combine maritime expertise, precision logistics, and professional care to ensure your vessel arrives safely — every time.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyChooseItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    variants={fadeUp}
                    className="relative bg-white rounded-2xl p-7 group cursor-default overflow-hidden"
                    style={{
                      border: "1px solid rgba(0,168,168,0.12)",
                      boxShadow: "0 2px 16px rgba(10,37,64,0.06), 0 1px 4px rgba(0,0,0,0.04)",
                      transition: "box-shadow 0.3s ease, transform 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 40px rgba(0,168,168,0.18), 0 2px 12px rgba(0,0,0,0.08)";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 16px rgba(10,37,64,0.06), 0 1px 4px rgba(0,0,0,0.04)";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    }}
                  >
                    {/* Top accent line */}
                    <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: "linear-gradient(90deg, transparent, #00c8c8, transparent)" }} />
                    <div
                      className="w-13 h-13 rounded-2xl flex items-center justify-center mb-5"
                      style={{
                        background: "linear-gradient(135deg, rgba(0,168,168,0.12) 0%, rgba(0,200,200,0.18) 100%)",
                        width: "52px", height: "52px",
                      }}
                    >
                      <Icon style={{ color: "#0a8a8a" }} size={24} />
                    </div>
                    <h3 className="font-display text-lg font-bold text-primary mb-2">{item.title}</h3>
                    <p className="text-sm text-foreground/65 leading-relaxed">{item.description}</p>
                  </motion.div>
                );
              })}
            </div>
            <motion.div variants={fadeUp} className="text-center mt-12">
              <Link href="/why-choose-us">
                <a>
                  <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 inline-flex items-center gap-2">
                    Explore Our Advantages <ArrowRight size={18} />
                  </Button>
                </a>
              </Link>
            </motion.div>
          </FadeSection>
        </div>
      </section>

      {/* ── COMPARISON ────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 text-white overflow-hidden" style={{ background: "linear-gradient(160deg, #061e36 0%, #0a2540 50%, #0d3050 100%)" }}>
        <div className="container">
          <FadeSection>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <p className="font-mono-accent text-xs tracking-[0.3em] uppercase text-secondary mb-3">The Smart Choice</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">The Shortcut Comparison</h2>
              <p className="text-lg opacity-70 max-w-2xl mx-auto">
                The traditional route around the Malay Peninsula is gruelling, dangerous, and expensive. Our land-bridge solution changes everything.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Traditional */}
              <motion.div
                variants={fadeUp}
                className="rounded-2xl p-8 relative"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div className="absolute top-5 right-5 bg-red-500/20 border border-red-400/30 text-red-300 text-xs font-semibold px-3 py-1 rounded-full">
                  Traditional Route
                </div>
                <AlertTriangle className="text-red-400 mb-5" size={32} />
                <h3 className="font-display text-xl font-bold mb-1">Pattaya → Singapore → Phuket</h3>
                <p className="text-white/55 text-sm mb-6">Via the South China Sea & Malacca Straits</p>
                <div className="space-y-3">
                  {[
                    { label: "Total Distance", value: "1,700 miles" },
                    { label: "Minimum Time", value: "12+ days (24 hrs/day)" },
                    { label: "Engine Hours", value: "500+ hours" },
                    { label: "Risk Level", value: "Very High" },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-white/10 pb-3">
                      <span className="text-white/60 text-sm">{item.label}</span>
                      <span className="font-semibold text-red-300 text-sm">{item.value}</span>
                    </div>
                  ))}
                </div>
                <p className="text-white/45 text-xs mt-5 leading-relaxed">
                  Notorious South China Sea, katabatic squalls in Singapore, zero-visibility conditions, unlit vessels, endless fishing nets, dangerous ship convergence zones in the Malacca Straits — no place for the novice.
                </p>
              </motion.div>

              {/* Coast to Coast */}
              <motion.div
                variants={fadeUp}
                className="rounded-2xl p-8 relative"
                style={{
                  background: "linear-gradient(135deg, rgba(0,168,168,0.18) 0%, rgba(0,200,200,0.08) 100%)",
                  border: "2px solid rgba(0,200,200,0.55)",
                  boxShadow: "0 0 40px rgba(0,200,200,0.18), 0 8px 32px rgba(0,0,0,0.3)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div className="absolute top-5 right-5 text-white text-xs font-semibold px-3 py-1 rounded-full"
                  style={{ background: "linear-gradient(135deg, #0a8a8a, #00c8c8)", boxShadow: "0 0 16px rgba(0,200,200,0.5)" }}>
                  ✦ Recommended
                </div>
                <TrendingDown className="text-secondary mb-5" size={32} />
                <h3 className="font-display text-xl font-bold mb-1">Pattaya → Chumphon → Ranong → Phuket</h3>
                <p className="text-white/55 text-sm mb-6">80 km overland land bridge — Coast to Coast</p>
                <div className="space-y-3">
                  {[
                    { label: "Total Sea Miles", value: "350 miles" },
                    { label: "Total Time", value: "Under 1 week" },
                    { label: "Engine Hours", value: "~50 hours" },
                    { label: "Risk Level", value: "Minimal" },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-white/10 pb-3">
                      <span className="text-white/60 text-sm">{item.label}</span>
                      <span className="font-semibold text-secondary text-sm">{item.value}</span>
                    </div>
                  ))}
                </div>
                <p className="text-white/65 text-xs mt-5 leading-relaxed">
                  Craned out at Chumphon, secured on our custom transit cradle, trucked 80 km overland, then craned into the Andaman Sea at Ranong by our 100-ton crane. Simple. Safe. Professional.
                </p>
              </motion.div>
            </div>

            {/* Savings bar */}
            <motion.div variants={fadeUp} className="mt-10 max-w-5xl mx-auto">
              <div className="rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(0,200,200,0.2)",
                  backdropFilter: "blur(8px)",
                  boxShadow: "inset 0 1px 0 rgba(0,200,200,0.15)",
                }}>
                {[
                  { icon: Gauge, value: "79% Less", label: "Sea Miles" },
                  { icon: Clock, value: "90% Fewer", label: "Engine Hours" },
                  { icon: Shield, value: "Zero", label: "Open-Ocean Risk" },
                ].map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <Icon className="text-secondary" size={26} />
                      <span className="font-display text-3xl font-bold text-secondary">{s.value}</span>
                      <span className="text-white/60 text-sm">{s.label}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </FadeSection>
        </div>
      </section>

      {/* ── TECHNICAL SPECS ───────────────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ background: "linear-gradient(180deg, #061e36 0%, #0a2540 100%)" }}>
        <div className="container">
          <FadeSection>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <p className="font-mono-accent text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "#00c8c8" }}>Load Capacity</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Technical Specifications
              </h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.6)" }}>
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
                    className="rounded-2xl p-8 text-center relative overflow-hidden group"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(0,200,200,0.2)",
                      backdropFilter: "blur(8px)",
                      transition: "box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 0 32px rgba(0,200,200,0.25), 0 8px 24px rgba(0,0,0,0.3)";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,200,200,0.55)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,200,200,0.2)";
                    }}
                  >
                    {/* Subtle radial glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: "radial-gradient(circle at 50% 0%, rgba(0,200,200,0.12) 0%, transparent 70%)" }} />
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-4"
                      style={{ background: "rgba(0,200,200,0.12)", border: "1px solid rgba(0,200,200,0.2)" }}>
                      <Icon style={{ color: "#00c8c8" }} size={20} />
                    </div>
                    <p className="font-display text-4xl font-bold mb-1" style={{ color: "#00c8c8" }}>{spec.value}</p>
                    <div className="w-8 h-px mx-auto my-2" style={{ background: "rgba(0,200,200,0.4)" }} />
                    <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.5)" }}>{spec.label}</p>
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
                    Check if Your Vessel Qualifies <ArrowRight size={18} />
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
            <div className="flex gap-3 mt-4 overflow-x-auto pb-1">
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

      {/* ── WAVE DIVIDER ──────────────────────────────────────────── */}
      <div className="overflow-hidden leading-none" style={{ background: "#f0f4f8" }}>
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-12 md:h-16" style={{ display: "block" }}>
          <path d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z" fill="#ffffff" />
        </svg>
      </div>

      {/* ── SERVICE AREAS PREVIEW ─────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container">
          <FadeSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <motion.div variants={fadeUp}>
                <p className="font-mono-accent text-xs tracking-[0.3em] uppercase text-secondary mb-3">The Route</p>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">
                  Serving Thailand's Coasts
                </h2>
                <p className="text-lg text-foreground/65 mb-6">
                  We operate the premier overland marine transport corridor connecting Thailand's Gulf and Andaman coasts — in both directions.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Bangkok / Pattaya (Gulf of Thailand)",
                    "Chumphon — Crane out & load",
                    "80 km Overland Land Bridge",
                    "Ranong — Crane into Andaman Sea",
                    "Phuket & Andaman destinations",
                  ].map((area) => (
                    <li key={area} className="flex items-center gap-3">
                      <CheckCircle className="text-secondary flex-shrink-0" size={20} />
                      <span className="text-foreground font-medium">{area}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/service-areas">
                  <a>
                    <Button className="bg-secondary hover:bg-secondary/90 text-white px-8 py-3">
                      View All Service Areas
                    </Button>
                  </a>
                </Link>
              </motion.div>

              {/* Route map + carousel card */}
              <motion.div variants={fadeUp}>
                {/* Animated Thailand route map */}
                <div className="mb-6">
                  <ThailandRouteMap activeRoute={activeRoute} />
                </div>

                {/* Route tabs */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {routes.map((r, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveRoute(i)}
                      className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 border ${
                        activeRoute === i
                          ? "bg-secondary text-white border-secondary shadow-md"
                          : "bg-white text-primary border-border hover:border-secondary/60 hover:text-secondary"
                      }`}
                    >
                      {r.from} → {r.to}
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeRoute}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.28 }}
                    className="bg-white rounded-2xl shadow-md border border-border overflow-hidden"
                  >
                    <div className="bg-primary/8 rounded-t-2xl p-8 text-center">
                      <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="text-secondary" size={18} />
                          <span className="font-display font-bold text-primary text-lg">{routes[activeRoute].from}</span>
                        </div>
                        <ArrowRight className="text-secondary/60" size={20} />
                        <div className="flex items-center gap-2">
                          <Anchor className="text-secondary" size={18} />
                          <span className="font-display font-bold text-primary text-lg">{routes[activeRoute].to}</span>
                        </div>
                      </div>
                      <p className="text-foreground/55 text-sm mb-4">{routes[activeRoute].description}</p>
                      <p className="font-display text-4xl font-bold text-secondary mb-1">{routes[activeRoute].time}</p>
                      <p className="text-sm text-foreground/45">{routes[activeRoute].engineHours} engine hours added</p>
                    </div>
                    <div className="p-5 grid grid-cols-3 gap-3 text-center text-sm">
                      <div className="bg-primary/5 rounded-xl p-3">
                        <p className="font-bold text-primary text-base">{routes[activeRoute].seaMiles}</p>
                        <p className="text-foreground/50 text-xs mt-0.5">Sea Miles</p>
                      </div>
                      <div className="bg-primary/5 rounded-xl p-3">
                        <p className="font-bold text-primary text-base">{routes[activeRoute].overland}</p>
                        <p className="text-foreground/50 text-xs mt-0.5">Overland</p>
                      </div>
                      <div className="bg-secondary/10 rounded-xl p-3">
                        <p className="font-bold text-secondary text-base">100T</p>
                        <p className="text-foreground/50 text-xs mt-0.5">Crane @ Ranong</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>
          </FadeSection>
        </div>
      </section>

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
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(10,40,60,0.93) 0%, rgba(10,80,80,0.85) 100%)" }} />
        <div className="container text-center relative z-10">
          <FadeSection>
            <motion.div variants={fadeUp}>
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-px w-8 bg-secondary/60" />
                <p className="font-mono-accent text-xs tracking-[0.3em] uppercase text-secondary">Get Started</p>
                <div className="h-px w-8 bg-secondary/60" />
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                Ready to Transport Your Vessel?
              </h2>
              <p className="text-xl mb-10 opacity-75 max-w-2xl mx-auto">
                Contact our team today. Provide your vessel's dimensions — length, beam, height, and weight — and we'll have a quote underway promptly.
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
                      Get Your Free Quote <ArrowRight size={18} />
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
