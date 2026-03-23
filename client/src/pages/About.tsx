import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Anchor, Ship } from "lucide-react";
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

export default function About() {
  return (
    <div className="min-h-screen">
      <SEO
        title="About Us | Coast to Coast Marine Transportation Thailand"
        description="Learn about Coast to Coast Marine Transportation Thailand — a subsidiary of Phuket Marine Oracle Co., Ltd. Our team of licensed captains, engineers and maritime loadmasters has been safely relocating vessels between Thailand's Gulf and Andaman coasts."
        path="/about"
      />

      {/* ── HERO ── */}
      <section
        className="relative text-white overflow-hidden"
        style={{
          height: "420px",
          display: "flex",
          alignItems: "flex-end",
          backgroundImage: "url('/gallery/4.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center 50%",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(44,62,80,0.1) 0%, rgba(44,62,80,0.35) 60%, rgba(44,62,80,0.85) 100%)",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: "linear-gradient(90deg, transparent, #0e7490, transparent)" }} />
        <div className="container relative z-10 pb-14">
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

      {/* ── PHUKET MARINE ORACLE — full-width cinematic section ── */}
      <section
        className="relative py-28 md:py-36 overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #2c3e50 0%, #2c3e50 55%, #2a4a5e 100%)",
        }}
      >
        {/* Subtle teal glow top */}
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(0,200,200,0.35), transparent)" }} />
        {/* Subtle teal glow bottom */}
        <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(0,200,200,0.35), transparent)" }} />
        {/* Background radial glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,200,200,0.05) 0%, transparent 70%)" }} />

        <div className="container relative z-10">
          <FadeSection>
            <motion.div variants={fadeUp} className="max-w-5xl mx-auto text-center">
              {/* Logo mark */}
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 overflow-hidden"
                style={{
                  background: "rgba(0,200,200,0.08)",
                  border: "1px solid rgba(0,200,200,0.22)",
                  boxShadow: "0 0 40px rgba(0,200,200,0.12)",
                }}
              >
                <img src="/logo-mark.webp" alt="Coast to Coast Marine Transportation Thailand" className="w-14 h-14 object-contain" />
              </div>

              {/* Est. label */}
              <p
                className="font-mono-accent text-xs tracking-[0.35em] uppercase mb-5"
                style={{ color: "rgba(0,200,200,0.65)" }}
              >
                Est. 2005
              </p>

              {/* Title */}
              <h2
                className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight"
                style={{ color: "#ffffff" }}
              >
                A Subsidiary of Phuket Marine Oracle Co., Ltd.
              </h2>

              {/* Teal rule */}
              <div className="flex items-center justify-center gap-3 mb-10">
                <div className="h-px w-20" style={{ background: "linear-gradient(90deg, transparent, rgba(0,200,200,0.6))" }} />
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(0,200,200,0.8)", boxShadow: "0 0 6px rgba(0,200,200,0.8)" }} />
                <div className="h-px w-20" style={{ background: "linear-gradient(90deg, rgba(0,200,200,0.6), transparent)" }} />
              </div>

              {/* Body copy */}
              <p
                className="text-xl md:text-2xl leading-relaxed mb-6 mx-auto"
                style={{ color: "rgba(255,255,255,0.75)", maxWidth: "720px" }}
              >
               Phuket Marine Oracle Co., Ltd. was established in 2005 — it's the parent company of Coast to Coast. A diverse and dedicated team with a long track record in the marine industry in Thailand.
              </p>


            </motion.div>
          </FadeSection>
        </div>
      </section>

      {/* ── THE TEAM ── */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container">
          <FadeSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div variants={fadeUp} className="relative">
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="/gallery/7.webp"
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
                  Our loadmaster is on site throughout the entire process, ensuring correct lifting points, weights & balances, securing & strong points, monitoring the overland journey from the rear pilot car — the entire team are in VHF radio contact for the duration of the trip.
                </p>
                <p className="text-lg text-foreground/70 mb-5 leading-relaxed">
                  For the ocean miles — whether that's the Gulf approach to Chumphon or the Andaman delivery from Ranong to Phuket — we can set you up with professional ticketed captains & crew. If you have the time and prefer to do these sea miles yourself, we will amend the quote for your contribution.
                </p>
                <p className="text-lg text-foreground/70 leading-relaxed">
                  From initial consultation to final handover, you have one point of contact. We handle the logistics, the paperwork, the crane bookings, and the coordination — so you can focus on what matters.
                </p>
              </motion.div>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 md:py-28 bg-primary text-white">
        <div className="container text-center">
          <FadeSection>
            <motion.div variants={fadeUp}>
              <h2 className="font-display text-4xl font-bold mb-6">For Full Details Contact Us</h2>
              <p className="text-xl opacity-75 mb-10 max-w-2xl mx-auto">
                Contact our team to discuss your vessel transport needs and receive a professional quote.
              </p>
              <Link href="/contact">
                <a>
                  <Button className="bg-secondary hover:bg-secondary/90 text-white px-10 py-6 text-lg font-semibold shadow-lg">
                    Contact Us
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
