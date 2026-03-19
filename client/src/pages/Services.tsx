import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Truck,
  MapPin,
  Users,
  Shield,
  Anchor,
  CheckCircle,
  FileText,
  Compass,
  Home,
  Camera,
  ClipboardCheck,
} from "lucide-react";
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

export default function Services() {
  const coreServices = [
    {
      icon: Truck,
      title: "Overland Vessel Transport",
      description: "Specialist low-deck trailer transport with a custom-fabricated transit cradle engineered for your specific vessel. We handle the full 80 km land bridge between Chumphon and Ranong.",
    },
    {
      icon: MapPin,
      title: "East ↔ West Coast Relocation",
      description: "We operate in both directions — Gulf of Thailand to Andaman Sea, or Andaman to Gulf. Pattaya, Bangkok, Chumphon, Ranong, Phuket and beyond.",
    },
    {
      icon: Users,
      title: "Professional Loadmasters",
      description: "Our loadmaster is on site throughout the entire process, ensuring correct lifting points, weights & balances, securing & strong points, monitoring the overland journey from the rear pilot car — the entire team are in VHF radio contact for the duration of the trip.",
    },
    {
      icon: Shield,
      title: "Licensed Delivery Crew",
      description: "Our professional delivery crews can handle both sides of the ocean miles — or your crew can take care of the sea miles for you. Either way, we've got it covered.",
    },
    {
      icon: Anchor,
      title: "Crane Operations",
      description: "Our 100-ton crane at Ranong handles even the largest vessels. Professional crane operations at both Chumphon and Ranong ensure safe, controlled lifts every time.",
    },
  ];

  const additionalServices = [
    {
      icon: FileText,
      title: "Title Transfers & Port Clearances",
      description: "If needed, we can organise title transfers and port clearances through our licensed agent — so you don't have to source your own.",
    },

    {
      icon: Home,
      title: "Dockside & Monthly Moorings",
      description: "Daily and monthly mooring options available at either end of the route — Gulf of Thailand or Andaman Sea.",
    },
    {
      icon: Compass,
      title: "Maritime Logistics Consulting",
      description: "Contact us with your questions about our procedures or to discuss the customisation of your requirements.",
    },
    {
      icon: Camera,
      title: "Photos & Videos",
      description: "For interest and promotional purposes, photos and videos will be created throughout the procedure — from crane-out to launch.",
    },
    {
      icon: Anchor,
      title: "Custom Transit Cradle Fabrication",
      description: "Our team of professional fabricators will design and create a cradle on site to suit the style and profile of your vessel.",
    },
    {
      icon: ClipboardCheck,
      title: "Pre-Transport Vessel Inspection",
      description: "A thorough condition report is completed before every lift — documenting your vessel's state prior to transport so both parties have a clear, agreed record.",
    },
  ];

  const processSteps = [
    { number: 1, title: "Consultation", description: "Discuss your vessel's specifications, dimensions, and desired timeline" },
    { number: 2, title: "Quotation", description: "We assess your vessel and provide a quote based on your specific requirements" },
    { number: 3, title: "Preparation", description: "Your vessel is brought to Chumphon, measured up, and a custom transit cradle is fabricated to fit your hull exactly" },
    { number: 4, title: "Crane Out", description: "Professional lift at Chumphon onto our low-deck trailer" },
    { number: 5, title: "Overland Transit", description: "80 km land bridge with Loadmaster escort in rear pilot vehicle" },
    { number: 6, title: "Launch & Handover", description: "100-ton crane launch at Ranong — continue with our delivery crew to your final destination or take over yourself" },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Services | Coast to Coast Marine Transportation Thailand"
        description="Full-service vessel relocation between Thailand's Gulf and Andaman coasts. Crane operations, custom transit cradles, overland transport, sea delivery, and port clearance assistance if needed."
        path="/services"
      />

      {/* Hero */}
      <section
        className="relative text-white py-32 md:py-44 overflow-hidden"
        style={{
          backgroundImage: "url('/gallery/4.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
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
            <p className="font-mono-accent text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "#2dd4bf" }}>What We Offer</p>
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6" style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>Our Services</h1>
            <p className="text-xl max-w-3xl leading-relaxed" style={{ color: "rgba(255,255,255,0.82)", textShadow: "0 1px 8px rgba(0,0,0,0.4)" }}>
              Comprehensive vessel relocation and marine logistics solutions — from crane to cradle to coast.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container">
          <FadeSection>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <p className="font-mono-accent text-xs tracking-[0.3em] uppercase text-secondary mb-3">Core Services</p>
              <h2 className="font-display text-4xl font-bold text-primary mb-4">What We Offer</h2>
              <p className="text-lg text-foreground/65 max-w-2xl mx-auto">
                Complete marine transport with professional expertise at every stage
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coreServices.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={index}
                    variants={fadeUp}
                    className="bg-white p-8 rounded-xl shadow-sm border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                  >
                    <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-secondary/20 transition-colors">
                      <Icon className="text-secondary" size={26} />
                    </div>
                    <h3 className="font-display text-lg font-bold text-primary mb-3">{service.title}</h3>
                    <p className="text-foreground/65 text-sm leading-relaxed">{service.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </FadeSection>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 md:py-28 bg-primary/5">
        <div className="container">
          <FadeSection>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <p className="font-mono-accent text-xs tracking-[0.3em] uppercase text-secondary mb-3">Related Services</p>
              <h2 className="font-display text-4xl font-bold text-primary mb-4">Additional Services</h2>
              <p className="text-lg text-foreground/65 max-w-2xl mx-auto">
                Beyond the transport itself, we offer a full suite of marine support services
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {additionalServices.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={index}
                    variants={fadeUp}
                    className="bg-white p-7 rounded-xl shadow-sm border border-border hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 bg-primary/8 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                      <Icon className="text-primary" size={22} />
                    </div>
                    <h3 className="font-display text-base font-bold text-primary mb-2">{service.title}</h3>
                    <p className="text-foreground/60 text-sm leading-relaxed">{service.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </FadeSection>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container">
          <FadeSection>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <p className="font-mono-accent text-xs tracking-[0.3em] uppercase text-secondary mb-3">How It Works</p>
              <h2 className="font-display text-4xl font-bold text-primary mb-4">The Transport Process</h2>
              <p className="text-lg text-foreground/65 max-w-2xl mx-auto">
                A streamlined, professionally managed approach from first contact to final delivery
              </p>
            </motion.div>
            <div className="max-w-2xl mx-auto">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  className="relative flex gap-6 pb-10 last:pb-0"
                >
                  {/* Vertical connector line */}
                  {index < processSteps.length - 1 && (
                    <div className="absolute left-6 top-12 bottom-0 w-[2px] bg-gradient-to-b from-secondary/40 to-secondary/10" />
                  )}
                  {/* Step circle */}
                  <div className="flex-shrink-0 w-12 h-12 bg-secondary text-white rounded-full flex items-center justify-center font-display font-bold text-lg shadow-md z-10">
                    {step.number}
                  </div>
                  {/* Content */}
                  <div className="bg-white border border-border rounded-xl p-5 flex-1 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="font-display font-bold text-primary mb-1.5">{step.title}</h3>
                    <p className="text-sm text-foreground/60 leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </FadeSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-primary text-white">
        <div className="container text-center">
          <FadeSection>
            <motion.div variants={fadeUp}>
              <h2 className="font-display text-4xl font-bold mb-6">Ready to Do It the Easy Way Round?</h2>
              <p className="text-xl opacity-75 mb-10 max-w-2xl mx-auto">
                Skip the 1,700-mile slog. Get your vessel coast to coast in under a week — contact us to get started.
              </p>
              <Link href="/contact">
                <a>
                  <Button className="bg-secondary hover:bg-secondary/90 text-white px-10 py-6 text-lg font-semibold shadow-lg">
                    Request a Quote
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
