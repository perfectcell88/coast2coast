import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { MapPin, Clock, Anchor, ArrowRight, Ship, Truck, Waves } from "lucide-react";
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

export default function ServiceAreas() {

  const hubs = [
    {
      name: "Pattaya / Bangkok",
      coast: "Gulf of Thailand",
      role: "East Coast Departure Hub",
      icon: Waves,
      description: "Our primary Gulf-side embarkation point. Vessels are craned out, inspected, and secured onto our custom transit cradle here before the overland journey begins.",
      details: ["Crane-out operations", "Custom cradle fitting & securement", "Pre-transport vessel inspection", "Documentation & port clearance"],
      image: "/gallery/2.webp",
    },
    {
      name: "Chumphon",
      coast: "Gulf of Thailand",
      role: "Gulf-Side Crane Point",
      icon: Anchor,
      description: "The crane-out point on the Gulf side of the 80 km land bridge. Our team manages all lifting operations here with precision and care.",
      details: ["Professional crane operations", "Vessel securement to trailer", "Loadmaster briefing & checks", "Overland transit preparation"],
      image: "/gallery/5.webp",
    },
    {
      name: "Ranong",
      coast: "Andaman Sea",
      role: "Andaman-Side Launch Point",
      icon: Ship,
      description: "The western end of the land bridge. Our 100-ton crane at Ranong handles even the largest catamarans, lowering them gently into the Andaman Sea.",
      details: ["100-ton crane operations", "Controlled water launch", "Post-transit inspection", "Crew handover or delivery"],
      image: "/gallery/3.webp",
    },
    {
      name: "Phuket",
      coast: "Andaman Sea",
      role: "Premier West Coast Destination",
      icon: MapPin,
      description: "Thailand's premier sailing destination. Our delivery crew can complete the final sea leg from Ranong to Phuket, or any Andaman marina of your choice.",
      details: ["Final sea-leg delivery", "Marina coordination", "Vessel handover", "Post-delivery support"],
      image: "/gallery/10.webp",
    },
  ];

  const routes = [
    {
      from: "Pattaya",
      to: "Phuket",
      seaMiles: "~350",
      overland: "80 km",
      time: "Under 1 week",
      engineHours: "~50 hrs",
      highlight: true,
      description: "Our flagship route. Gulf to Andaman in under a week — the smart alternative to 1,700 miles around the Malay Peninsula.",
    },
    {
      from: "Phuket",
      to: "Pattaya",
      seaMiles: "~350",
      overland: "80 km",
      time: "Under 1 week",
      engineHours: "~50 hrs",
      highlight: false,
      description: "We operate in both directions. Andaman to Gulf is just as straightforward — same professional service, same timeline.",
    },
    {
      from: "Bangkok",
      to: "Ranong",
      seaMiles: "~280",
      overland: "80 km",
      time: "Under 1 week",
      engineHours: "~40 hrs",
      highlight: false,
      description: "Bangkok-based vessels can be transported directly to Ranong for launch into the Andaman Sea, with final delivery to Phuket available.",
    },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Service Areas | Coast to Coast Marine Transportation Thailand"
        description="We operate between Bangkok, Pattaya and Phuket — in both directions. The 80 km Kra Isthmus land bridge connects the Gulf of Thailand at Chumphon to the Andaman Sea at Ranong, cutting 1,700 miles of open-ocean sailing."
        path="/service-areas"
      />

      {/* Hero */}
      <section className="bg-primary text-white py-20 md:py-28">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-mono-accent text-xs tracking-[0.3em] uppercase text-secondary mb-4">The Route</p>
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">Service Areas</h1>
            <p className="text-xl opacity-80 max-w-3xl">
              We operate the premier overland marine transport corridor connecting Thailand's Gulf and Andaman coasts — in both directions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Corridor */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container">
          <FadeSection>
            <motion.div variants={fadeUp} className="text-center mb-16">
              <p className="font-mono-accent text-xs tracking-[0.3em] uppercase text-secondary mb-3">The Land Bridge</p>
              <h2 className="font-display text-4xl font-bold text-primary mb-4">The Chumphon–Ranong Corridor</h2>
              <p className="text-lg text-foreground/65 max-w-3xl mx-auto">
                Thailand's 80 km isthmus between Chumphon and Ranong is the shortest overland crossing between the Gulf of Thailand and the Andaman Sea. We have turned this geography into a world-class vessel relocation service.
              </p>
            </motion.div>

            {/* Route visual */}
            <motion.div variants={fadeUp} className="bg-primary rounded-2xl p-8 md:p-12 text-white mb-16 overflow-hidden relative">
              <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_30%_50%,white,transparent_60%)]" />
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
                  {[
                    { label: "Bangkok / Pattaya", sub: "Gulf of Thailand", icon: "🌊", side: "EAST COAST" },
                    { label: "Chumphon", sub: "Crane Out", icon: "🏗️", side: "GULF SIDE" },
                    { label: "80 km Overland", sub: "Land Bridge", icon: "🚛", side: "TRANSIT" },
                    { label: "Ranong", sub: "Crane In", icon: "⚓", side: "ANDAMAN SIDE" },
                    { label: "Phuket", sub: "Andaman Sea", icon: "⛵", side: "WEST COAST" },
                  ].map((stop, i, arr) => (
                    <div key={i} className="flex items-center gap-4 md:gap-3">
                      <div className="text-center">
                        <p className="font-mono-accent text-xs tracking-widest text-secondary/70 mb-1">{stop.side}</p>
                        <div className="text-3xl mb-2">{stop.icon}</div>
                        <p className="font-display font-bold text-white text-sm md:text-base">{stop.label}</p>
                        <p className="text-xs text-white/55 mt-0.5">{stop.sub}</p>
                      </div>
                      {i < arr.length - 1 && (
                        <ArrowRight className="text-secondary/60 flex-shrink-0 hidden md:block" size={20} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </FadeSection>
        </div>
      </section>

      {/* Hub Cards */}
      <section className="py-20 md:py-28 bg-primary/5">
        <div className="container">
          <FadeSection>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <p className="font-mono-accent text-xs tracking-[0.3em] uppercase text-secondary mb-3">Key Locations</p>
              <h2 className="font-display text-4xl font-bold text-primary mb-4">Our Operational Hubs</h2>
              <p className="text-lg text-foreground/65 max-w-2xl mx-auto">
                Each location in our corridor is staffed and equipped for professional vessel handling
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {hubs.map((hub, index) => {
                const Icon = hub.icon;
                return (
                  <motion.div
                    key={index}
                    variants={fadeUp}
                    className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="h-52 overflow-hidden relative">
                      <img
                        src={hub.image}
                        alt={hub.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                      <div className="absolute bottom-4 left-5 text-white">
                        <p className="font-mono-accent text-xs tracking-widest text-secondary mb-1 uppercase">{hub.coast}</p>
                        <h3 className="font-display text-2xl font-bold">{hub.name}</h3>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
                          <Icon className="text-secondary" size={16} />
                        </div>
                        <span className="font-semibold text-secondary text-sm">{hub.role}</span>
                      </div>
                      <p className="text-foreground/65 text-sm leading-relaxed mb-4">{hub.description}</p>
                      <ul className="space-y-2">
                        {hub.details.map((detail, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-foreground/70">
                            <span className="w-1.5 h-1.5 bg-secondary rounded-full flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </FadeSection>
        </div>
      </section>

      {/* Routes */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container">
          <FadeSection>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <p className="font-mono-accent text-xs tracking-[0.3em] uppercase text-secondary mb-3">Routes We Operate</p>
              <h2 className="font-display text-4xl font-bold text-primary mb-4">Transport Routes</h2>
              <p className="text-lg text-foreground/65 max-w-2xl mx-auto">
                All routes use the same 80 km Chumphon–Ranong land bridge. Sea legs are completed by our ticketed captains or handed to your own crew.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {routes.map((route, index) => (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  className="rounded-2xl border p-7 relative overflow-hidden transition-shadow hover:shadow-lg bg-white text-foreground border-border"
                >

                  <div className="flex items-center gap-3 mb-5">
                    <div>
                      <p className="text-xs font-mono-accent tracking-widest uppercase mb-0.5 text-foreground/50">From</p>
                      <p className="font-display text-xl font-bold text-primary">{route.from}</p>
                    </div>
                    <ArrowRight className="flex-shrink-0 text-secondary" size={20} />
                    <div>
                      <p className="text-xs font-mono-accent tracking-widest uppercase mb-0.5 text-foreground/50">To</p>
                      <p className="font-display text-xl font-bold text-primary">{route.to}</p>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed mb-5 text-foreground/60">{route.description}</p>
                  <div className="border-t pt-4 grid grid-cols-2 gap-3 border-border">
                    {[
                      { icon: Clock, label: "Total Time", value: route.time },
                      { icon: Truck, label: "Overland", value: route.overland },
                      { icon: Waves, label: "Sea Miles", value: route.seaMiles },
                      { icon: Anchor, label: "Engine Hours", value: route.engineHours },
                    ].map((stat, i) => {
                      const StatIcon = stat.icon;
                      return (
                        <div key={i} className="flex items-start gap-2">
                          <StatIcon size={14} className="mt-0.5 flex-shrink-0 text-secondary" />
                          <div>
                            <p className="text-xs text-foreground/45">{stat.label}</p>
                            <p className="text-sm font-semibold text-primary">{stat.value}</p>
                          </div>
                        </div>
                      );
                    })}
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
              <h2 className="font-display text-4xl font-bold mb-6">Ready to Move Your Vessel?</h2>
              <p className="text-xl opacity-75 mb-10 max-w-2xl mx-auto">
                Tell us your vessel's dimensions and desired timeline — we'll have a quote ready promptly.
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
