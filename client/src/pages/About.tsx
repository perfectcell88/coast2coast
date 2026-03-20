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
        className="relative text-white py-32 md:py-44 overflow-hidden"
        style={{
          backgroundImage: "url('/gallery/4.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center 50%",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(6,22,44,0.88) 0%, rgba(6,22,44,0.72) 50%, rgba(14,116,144,0.45) 100%)",
          }}
        />
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

      {/* ── PHUKET MARINE ORACLE — premium standalone section ── */}
      <section className="py-24 md:py-32" style={{ background: "linear-gradient(160deg, #f8fbff 0%, #eef6fb 100%)" }}>
        <div className="container">
          <FadeSection>
            <motion.div variants={fadeUp} className="max-w-4xl mx-auto">
              {/* Section label */}
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, transparent, rgba(0,150,150,0.4))" }} />
                <p className="font-mono-accent text-xs tracking-[0.3em] uppercase" style={{ color: "#0e7490" }}>Our Heritage</p>
                <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, rgba(0,150,150,0.4), transparent)" }} />
              </div>

              {/* Premium card */}
              <div
                className="rounded-3xl overflow-hidden shadow-xl"
                style={{
                  background: "linear-gradient(135deg, #041828 0%, #062840 60%, #083858 100%)",
                  border: "1px solid rgba(0,200,200,0.18)",
                  boxShadow: "0 24px 64px rgba(4,24,40,0.18), 0 1px 0 rgba(0,200,200,0.12) inset",
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-[1fr_2px_1fr] gap-0">
                  {/* Left — icon + title */}
                  <div className="flex flex-col justify-center items-center text-center p-10 md:p-14">
                    <div
                      className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6"
                      style={{
                        background: "rgba(0,200,200,0.12)",
                        border: "1px solid rgba(0,200,200,0.3)",
                        boxShadow: "0 0 32px rgba(0,200,200,0.15)",
                      }}
                    >
                      <Anchor size={34} style={{ color: "#00c8c8" }} />
                    </div>
                    <p
                      className="font-mono-accent text-xs tracking-[0.3em] uppercase mb-3"
                      style={{ color: "rgba(0,200,200,0.7)" }}
                    >
                      Est. 2005
                    </p>
                    <h2
                      className="font-display text-2xl md:text-3xl font-bold leading-tight"
                      style={{ color: "#ffffff" }}
                    >
                      Part of Phuket Marine Oracle Co., Ltd.
                    </h2>
                    <div
                      className="mt-5 h-px w-16 mx-auto"
                      style={{ background: "linear-gradient(90deg, transparent, rgba(0,200,200,0.6), transparent)" }}
                    />
                  </div>

                  {/* Divider */}
                  <div className="hidden md:block" style={{ background: "rgba(0,200,200,0.12)" }} />

                  {/* Right — description */}
                  <div className="flex flex-col justify-center p-10 md:p-14">
                    <p
                      className="text-lg leading-relaxed mb-5"
                      style={{ color: "rgba(255,255,255,0.78)" }}
                    >
                      Phuket Marine Oracle Co., Ltd. was established in 2005 — it's the parent company of Coast to Coast. Get on the inside track and take advantage of 20 years of experience in the marine industry in Thailand.
                    </p>
                    <p
                      className="text-base leading-relaxed"
                      style={{ color: "rgba(255,255,255,0.55)" }}
                    >
                      That depth of institutional knowledge underpins every vessel relocation we undertake — from crane selection and transit cradle fabrication to port clearance coordination and final handover.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                      {["20 Years Experience", "Marine Industry Specialists", "Thailand-Based"].map((badge) => (
                        <span
                          key={badge}
                          className="text-xs font-semibold px-4 py-2 rounded-full"
                          style={{
                            background: "rgba(0,200,200,0.10)",
                            border: "1px solid rgba(0,200,200,0.25)",
                            color: "rgba(0,200,200,0.85)",
                          }}
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
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
                  For the sea legs — whether that's the Gulf approach to Chumphon or the Andaman delivery from Ranong to Phuket — we can set you up with professional ticketed captains & crew. If you have the time and prefer to do these sea miles yourself, we will amend the quote for your contribution.
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
