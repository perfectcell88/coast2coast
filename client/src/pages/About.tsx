import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Award, Users, Zap, Globe, Anchor, Building2 } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

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
      description: "We maintain the highest standards in boat transport and maritime logistics — every vessel, every time.",
    },
    {
      icon: Users,
      title: "Expertise",
      description: "Our team brings decades of combined experience in marine operations, crane logistics, and coastal navigation.",
    },
    {
      icon: Zap,
      title: "Reliability",
      description: "Consistent, on-time delivery with transparent communication from the moment we lift your vessel to the moment we launch it.",
    },
    {
      icon: Globe,
      title: "Professionalism",
      description: "Licensed captains, engineers, and loadmasters on every transport — your vessel is in expert hands throughout.",
    },
  ];

  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section className="bg-primary text-white py-20 md:py-28">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-mono-accent text-xs tracking-[0.3em] uppercase text-secondary mb-4">About Us</p>
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
              Coast to Coast Marine<br />Transportation Thailand
            </h1>
            <p className="text-xl opacity-80 max-w-3xl">
              Specialists in safe, professional oversized vessel transport across Thailand's coasts — a subsidiary of Phuket Marine Oracle Co/Ltd.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container">
          <FadeSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <motion.div variants={fadeUp}>
                <p className="font-mono-accent text-xs tracking-[0.3em] uppercase text-secondary mb-3">Who We Are</p>
                <h2 className="font-display text-4xl font-bold text-primary mb-6">
                  Thailand's Premier Vessel Relocation Service
                </h2>
                <p className="text-lg text-foreground/70 mb-5 leading-relaxed">
                  Coast to Coast Marine Transportation Thailand transfers vessels between the Gulf of Thailand and the Andaman Sea in just a few days. Operating the Bangkok/Pattaya to Chumphon to Ranong corridor, we crane your vessel out of the water, secure it on our low-deck trailer with a custom-fabricated transit cradle, and transport it overland across the 80 km land bridge — before craning it back into the Andaman Sea at Ranong.
                </p>
                <p className="text-lg text-foreground/70 mb-5 leading-relaxed">
                  We relocate vessels in both directions — east coast to west coast, and west coast to east coast. Our experienced delivery crew can complete the final voyage to your destination on the Andaman coast, or we hand over directly to your own crew.
                </p>
                <p className="text-lg text-foreground/70 leading-relaxed">
                  From initial consultation to final delivery, we provide end-to-end coordination. Our Maritime Loadmaster ensures your boat is handled correctly and well-secured throughout its journey, travelling with it from coast to coast in the rear pilot vehicle.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="space-y-6">
                {/* Subsidiary badge */}
                <div className="bg-primary/5 border border-primary/15 rounded-2xl p-6 flex gap-4 items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Building2 className="text-primary" size={22} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-primary mb-1">Part of a Larger Group</h3>
                    <p className="text-foreground/65 text-sm leading-relaxed">
                      Coast to Coast Marine Transportation Thailand is a subsidiary of <strong className="text-primary">Phuket Marine Oracle Co/Ltd</strong>, bringing the full resources, network, and expertise of an established Thai marine enterprise to every relocation.
                    </p>
                  </div>
                </div>

                {/* Vessel types */}
                <div className="bg-secondary/8 border border-secondary/20 rounded-2xl p-6 flex gap-4 items-start">
                  <div className="w-12 h-12 bg-secondary/15 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Anchor className="text-secondary" size={22} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-primary mb-2">Vessels We Transport</h3>
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
                    <div key={i} className="bg-white border border-border rounded-xl p-4 text-center">
                      <p className="font-display text-2xl font-bold text-secondary">{s.value}</p>
                      <p className="text-xs font-semibold text-primary">{s.unit}</p>
                      <p className="text-xs text-foreground/50 mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 md:py-28 bg-primary/5">
        <div className="container">
          <FadeSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div variants={fadeUp} className="bg-white p-8 rounded-2xl shadow-md border border-border">
                <h3 className="font-display text-2xl font-bold text-primary mb-4">Our Mission</h3>
                <p className="text-foreground/65 leading-relaxed">
                  To provide safe, reliable, and professional vessel transport services that exceed client expectations. We are committed to delivering your boat on time, in perfect condition, with transparent communication and expert handling throughout every journey — coast to coast.
                </p>
              </motion.div>
              <motion.div variants={fadeUp} className="bg-white p-8 rounded-2xl shadow-md border border-border">
                <h3 className="font-display text-2xl font-bold text-primary mb-4">Our Vision</h3>
                <p className="text-foreground/65 leading-relaxed">
                  To be Thailand's most trusted and innovative marine transport specialist, recognised for our unwavering commitment to safety, professionalism, and client satisfaction. We aim to set the industry standard for oversized vessel relocation across the Kingdom.
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
                Contact our team to discuss your vessel transport needs and receive a professional quote
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
