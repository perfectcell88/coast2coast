import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Award, Users, Zap, Globe, Anchor, Building2, CheckCircle, Ship } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import SEO from "@/components/SEO";

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
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
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

export default function About() {
  const values = [
    {
      icon: Award,
      title: "Excellence",
      description: "We maintain the highest standards in vessel transport and maritime logistics — every vessel, every time, without exception.",
    },
    {
      icon: Users,
      title: "Expertise",
      description: "Our team brings deep experience in marine operations, crane logistics, overland transport, and coastal navigation across Thailand.",
    },
    {
      icon: Zap,
      title: "Reliability",
      description: "Consistent, on-time delivery with transparent communication from the moment we lift your vessel to the moment we launch it.",
    },
    {
      icon: Globe,
      title: "Professionalism",
      description: "Licensed captains, engineers, and a dedicated Maritime Loadmaster on every transport — your vessel is in expert hands throughout.",
    },
  ];

  const capabilities = [
    "Powerboats, Keel Yachts & Catamarans",
    "Vessels up to 15m length, 5.5m beam, 5.5m height",
    "Maximum vessel weight: 32 tonnes",
    "100-ton crane at Ranong for safe water launch",
    "Custom-fabricated transit cradle for every vessel",
    "Maritime Loadmaster present on every job",
    "Ticketed captains and engineers for sea legs",
    "Title transfers & customs documentation (via licensed agent)",
    "Monthly moorings at Gulf or Andaman coast",
    "Both directions — Gulf to Andaman and Andaman to Gulf",
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="About Us | Coast to Coast Marine Transportation Thailand"
        description="Learn about Coast to Coast Marine Transportation Thailand — a subsidiary of Phuket Marine Oracle Co., Ltd. Our team of licensed captains, engineers and maritime loadmasters has been safely relocating vessels between Thailand's Gulf and Andaman coasts."
        path="/about"
      />

      {/* Hero */}
      <section
        className="relative text-white py-32 md:py-44 overflow-hidden"
        style={{
          backgroundImage: "url('/gallery/9.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
        }}
      >
        {/* Cinematic overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(6,22,44,0.88) 0%, rgba(6,22,44,0.72) 50%, rgba(14,116,144,0.45) 100%)",
          }}
        />
        {/* Subtle teal accent line at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: "linear-gradient(90deg, transparent, #0e7490, transparent)" }} />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-mono-accent text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#2dd4bf" }}>About Us</p>
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6" style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>
              Coast to Coast Marine<br />Transportation Thailand
            </h1>
            <p className="text-xl max-w-3xl leading-relaxed" style={{ color: "rgba(255,255,255,0.82)", textShadow: "0 1px 8px rgba(0,0,0,0.4)" }}>
              Thailand's specialist in safe, professional oversized vessel relocation between the Gulf of Thailand and the Andaman Sea — a subsidiary of Phuket Marine Oracle Co., Ltd.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              {["Powerboats", "Keel Yachts", "Catamarans", "Both Directions"].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 rounded-full text-sm font-medium"
                  style={{
                    background: "rgba(14,116,144,0.35)",
                    border: "1px solid rgba(45,212,191,0.4)",
                    color: "#a5f3fc",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container">
          <FadeSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div variants={fadeUp}>
                <p className="font-mono-accent text-xs tracking-[0.3em] uppercase text-secondary mb-3">Our Story</p>
                <h2 className="font-display text-4xl font-bold text-primary mb-6">
                  Built Around a Better Way
                </h2>
                <p className="text-lg text-foreground/70 mb-5 leading-relaxed">
                  The traditional route for moving a vessel between Thailand's Gulf and Andaman coasts meant navigating the South China Sea, threading the Malacca Straits, and enduring 1,700 miles of open ocean — a gruelling 12-plus-day passage running 24 hours a day, adding 500+ engine hours to your vessel's log, and exposing it to some of the most hazardous waters in Asia. For many owners, it simply wasn't worth the risk.
                </p>
                <p className="text-lg text-foreground/70 mb-5 leading-relaxed">
                  Coast to Coast Marine Transportation Thailand was founded on a straightforward insight: Thailand's geography offers a shortcut. The 80 km isthmus between Chumphon on the Gulf side and Ranong on the Andaman side means a vessel can be craned out of the water, transported overland, and relaunched — completing the coast-to-coast journey in under a week, adding only approximately 50 engine hours.
                </p>
                <p className="text-lg text-foreground/70 leading-relaxed">
                  We built the expertise, the equipment, and the professional team to make that shortcut a reliable, premium service. Today, boat owners and captains across Thailand trust us with their most valuable assets — and we treat every vessel accordingly.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="relative">
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="/gallery/9.webp"
                    alt="Catamaran being transported overland on a low-deck trailer in Thailand"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-5 -left-5 bg-secondary text-white rounded-2xl p-5 shadow-xl">
                  <p className="font-display text-3xl font-bold">80 km</p>
                  <p className="text-sm opacity-80">Overland Land Bridge</p>
                </div>
              </motion.div>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* Who We Are — Operations */}
      <section className="py-20 md:py-28 bg-primary/5">
        <div className="container">
          <FadeSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

              <motion.div variants={fadeUp} className="space-y-6">
                {/* Subsidiary badge */}
                <div className="bg-white border border-primary/15 rounded-2xl p-6 flex gap-4 items-start shadow-sm">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Building2 className="text-primary" size={22} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-primary mb-1">Part of Phuket Marine Oracle Co., Ltd.</h3>
                    <p className="text-foreground/65 text-sm leading-relaxed">
                      Coast to Coast Marine Transportation Thailand is a subsidiary of <strong className="text-primary">Phuket Marine Oracle Co., Ltd.</strong> — an established Thai marine enterprise. This means you benefit from a wider professional network, institutional resources, and the credibility of a registered Thai company behind every job.
                    </p>
                  </div>
                </div>

                {/* Vessel types */}
                <div className="bg-white border border-secondary/20 rounded-2xl p-6 flex gap-4 items-start shadow-sm">
                  <div className="w-12 h-12 bg-secondary/15 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Anchor className="text-secondary" size={22} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-primary mb-2">Vessels We Transport</h3>
                    <p className="text-sm text-foreground/65 mb-3 leading-relaxed">
                      We transport powerboats, keel yachts, and catamarans. Our custom-fabricated transit cradle is engineered specifically for your hull profile — not a one-size-fits-all solution.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["Powerboats", "Keel Yachts", "Catamarans"].map((v) => (
                        <span key={v} className="bg-secondary/15 text-secondary text-xs font-semibold px-3 py-1.5 rounded-full">
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Key stats */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: "350", unit: "Sea Miles", label: "Total Route" },
                    { value: "<7", unit: "Days", label: "Coast to Coast" },
                    { value: "80 km", unit: "Overland", label: "Land Bridge" },
                    { value: "100T", unit: "Crane", label: "At Ranong" },
                  ].map((s, i) => (
                    <div key={i} className="bg-white border border-border rounded-xl p-4 text-center shadow-sm">
                      <p className="font-display text-2xl font-bold text-secondary">{s.value}</p>
                      <p className="text-xs font-semibold text-primary">{s.unit}</p>
                      <p className="text-xs text-foreground/50 mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeUp}>
                <p className="font-mono-accent text-xs tracking-[0.3em] uppercase text-secondary mb-3">What We Do</p>
                <h2 className="font-display text-4xl font-bold text-primary mb-6">
                  Full-Service Vessel Relocation
                </h2>
                <p className="text-lg text-foreground/70 mb-6 leading-relaxed">
                  We operate the Bangkok/Pattaya to Chumphon to Ranong corridor in both directions. Our team manages every aspect of the relocation — crane operations, overland transit, and all associated administration. For the sea legs, you can deploy our licensed crew or handle those portions yourself. Either way, you have one point of contact throughout.
                </p>
                <ul className="space-y-3">
                  {capabilities.map((cap, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="text-secondary flex-shrink-0 mt-0.5" size={17} />
                      <span className="text-sm text-foreground/70 leading-relaxed">{cap}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* The Team */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container">
          <FadeSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div variants={fadeUp} className="relative">
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="/gallery/2.webp"
                    alt="Coast to Coast team preparing a vessel for transport"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-5 -right-5 bg-primary text-white rounded-2xl p-5 shadow-xl">
                  <Ship className="text-secondary mb-1" size={22} />
                  <p className="font-display text-sm font-bold">Professional Team</p>
                  <p className="text-xs opacity-60">Every job, every time</p>
                </div>
              </motion.div>

              <motion.div variants={fadeUp}>
                <p className="font-mono-accent text-xs tracking-[0.3em] uppercase text-secondary mb-3">Our People</p>
                <h2 className="font-display text-4xl font-bold text-primary mb-6">
                  The Team Behind Every Transport
                </h2>
                <p className="text-lg text-foreground/70 mb-5 leading-relaxed">
                  Every Coast to Coast relocation is managed by a dedicated Maritime Loadmaster who oversees the crane lift, the securement of your vessel onto our custom transit cradle, the overland transit, and the re-launch at the other end. They travel with your vessel in the rear pilot vehicle for the entire journey.
                </p>
                <p className="text-lg text-foreground/70 mb-5 leading-relaxed">
                  For the sea legs — whether that's the Gulf approach to Chumphon or the Andaman delivery from Ranong to Phuket — we can deploy fully licensed, ticketed marine captains and engineers on your behalf. If you prefer to handle those portions yourself, that option is available too. Either way, your vessel is never in unqualified hands.
                </p>
                <p className="text-lg text-foreground/70 leading-relaxed">
                  From initial consultation to final handover, you have one point of contact. We handle the logistics, the paperwork, the crane bookings, and the coordination — so you can focus on what matters.
                </p>
              </motion.div>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 md:py-28 bg-primary/5">
        <div className="container">
          <FadeSection>
            <motion.div variants={fadeUp} className="text-center mb-12">
              <p className="font-mono-accent text-xs tracking-[0.3em] uppercase text-secondary mb-3">Our Purpose</p>
              <h2 className="font-display text-4xl font-bold text-primary mb-4">Mission & Vision</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div variants={fadeUp} className="bg-white p-8 rounded-2xl shadow-sm border border-border">
                <h3 className="font-display text-2xl font-bold text-primary mb-4">Our Mission</h3>
                <p className="text-foreground/65 leading-relaxed">
                  To provide safe, reliable, and professional vessel transport services that exceed client expectations. We are committed to delivering your boat on time, in perfect condition, with transparent communication and expert handling throughout every journey — coast to coast.
                </p>
              </motion.div>
              <motion.div variants={fadeUp} className="bg-white p-8 rounded-2xl shadow-sm border border-border">
                <h3 className="font-display text-2xl font-bold text-primary mb-4">Our Vision</h3>
                <p className="text-foreground/65 leading-relaxed">
                  To be Thailand's most trusted marine transport specialist, recognised for our unwavering commitment to safety, professionalism, and client satisfaction. We aim to set the industry standard for oversized vessel relocation across the Kingdom.
                </p>
              </motion.div>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container">
          <FadeSection>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <p className="font-mono-accent text-xs tracking-[0.3em] uppercase text-secondary mb-3">What Drives Us</p>
              <h2 className="font-display text-4xl font-bold text-primary mb-4">Our Core Values</h2>
              <p className="text-lg text-foreground/65 max-w-2xl mx-auto">
                These principles guide every decision and action we take
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={index}
                    variants={fadeUp}
                    className="bg-white p-7 rounded-xl shadow-sm border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-secondary/20 transition-colors">
                      <Icon className="text-secondary" size={24} />
                    </div>
                    <h3 className="font-display text-lg font-bold text-primary mb-2">{value.title}</h3>
                    <p className="text-sm text-foreground/65 leading-relaxed">{value.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </FadeSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-primary text-white">
        <div className="container text-center">
          <FadeSection>
            <motion.div variants={fadeUp}>
              <h2 className="font-display text-4xl font-bold mb-6">Ready to Work With Us?</h2>
              <p className="text-xl opacity-75 mb-10 max-w-2xl mx-auto">
                Contact our team to discuss your vessel transport needs and receive a professional quote.
              </p>
              <Link href="/contact">
                <a>
                  <Button className="bg-secondary hover:bg-secondary/90 text-white px-10 py-6 text-lg font-semibold shadow-lg">
                    Get in Touch
                  </Button>
                </a>
              </Link>
            </motion.div>
          </FadeSection>
        </div>
      </section>
    </div>
  );
}
