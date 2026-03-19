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
      description: "Our Maritime Loadmaster oversees every lift, securement, and transit. They travel with your vessel in the rear pilot vehicle from coast to coast, monitoring it throughout.",
    },
    {
      icon: Shield,
      title: "Licensed Delivery Crew",
      description: "Our ticketed captains and engineers are available to handle the ocean legs of your relocation — sailing your vessel on the Gulf or Andaman sea portions, or completing the final delivery to your destination. Your choice: hand over at Ranong or destination to destination.",
    },
    {
      icon: Anchor,
      title: "Crane Operations",
      description: "Our 100-ton crane at Ranong handles even the largest vessels. Professional crane operations at both Chumphon and Ranong ensure safe, controlled lifts every time.",
    },
    {
      icon: CheckCircle,
      title: "End-to-End Coordination",
      description: "We handle all aspects and logistics of your relocation — from initial consultation and route planning to final handover. One point of contact, zero stress.",
    },
  ];

  const additionalServices = [
    {
      icon: FileText,
      title: "Title Transfers & Documentation",
      description: "We coordinate the administrative side of your vessel relocation, including title transfers and required customs documentation, through our licensed agent.",
    },

    {
      icon: Home,
      title: "Dockside & Monthly Moorings",
      description: "Daily and monthly mooring options available at either end of the route — Gulf of Thailand or Andaman Sea. Secure, supervised berths for your vessel.",
    },
    {
      icon: Compass,
      title: "Maritime Logistics Consulting",
      description: "Not sure which route or timing is right for you? Our team provides expert advice on the best approach for your specific vessel and destination.",
    },
    {
      icon: Camera,
      title: "Documentation & Media",
      description: "We provide professional photos and videos of your vessel's transport process — a full record of every stage from crane-out to launch.",
    },
    {
      icon: Anchor,
      title: "Custom Transit Cradle Fabrication",
      description: "Every vessel is different. We fabricate custom transit cradles tailored to your hull profile, ensuring perfect support and zero movement during overland transport.",
    },
    {
      icon: ClipboardCheck,
      title: "Pre-Transport Vessel Inspection",
      description: "A thorough condition report is completed before every lift — documenting your vessel's state prior to transport so both parties have a clear, agreed record.",
    },
  ];

  const processSteps = [
    { number: 1, title: "Consultation", description: "Discuss your vessel's specifications, dimensions, and desired timeline" },
    { number: 2, title: "Quotation", description: "Receive a detailed, transparent quote with full logistics plan" },
    { number: 3, title: "Preparation", description: "Cradle fabrication, crane booking, and route coordination" },
    { number: 4, title: "Crane Out", description: "Professional lift at Chumphon onto our low-deck trailer" },
    { number: 5, title: "Overland Transit", description: "80 km land bridge with Loadmaster escort in rear pilot vehicle" },
    { number: 6, title: "Launch & Handover", description: "100-ton crane launch at Ranong — delivered to your crew or ours" },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Services | Coast to Coast Marine Transportation Thailand"
        description="Full-service vessel relocation between Thailand's Gulf and Andaman coasts. Crane operations, custom transit cradles, overland transport, sea delivery, and title transfer administration."
        path="/services"
      />

      {/* Hero */}
      <section className="bg-primary text-white py-20 md:py-28">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-mono-accent text-xs tracking-[0.3em] uppercase text-secondary mb-4">What We Offer</p>
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">Our Services</h1>
            <p className="text-xl opacity-80 max-w-3xl">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  className="bg-white p-6 rounded-xl shadow-sm border border-border text-center hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-secondary text-white rounded-full flex items-center justify-center font-display font-bold text-lg mx-auto mb-4 shadow-sm">
                    {step.number}
                  </div>
                  <h3 className="font-display font-bold text-primary mb-2">{step.title}</h3>
                  <p className="text-sm text-foreground/60 leading-relaxed">{step.description}</p>
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
              <h2 className="font-display text-4xl font-bold mb-6">Ready to Transport?</h2>
              <p className="text-xl opacity-75 mb-10 max-w-2xl mx-auto">
                Contact us today. Provide your vessel's length, beam, height, and weight and we'll get your quote underway.
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
