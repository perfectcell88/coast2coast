import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Shield,
  Users,
  Anchor,
  Clock,
  CheckCircle,
  Award,
  ArrowRight,
  Truck,
  FileText,
  Waves,
} from "lucide-react";
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

export default function WhyChooseUs() {

  const advantages = [
    {
      icon: Truck,
      title: "The Only Land-Bridge Specialist",
      description:
        "We are Thailand's dedicated overland vessel transport operator on the Chumphon–Ranong corridor. This is not a sideline — it is our entire focus. No other operator offers this level of specialisation on this route.",
    },
    {
      icon: Users,
      title: "Maritime Loadmaster On Every Job",
      description:
        "Our Maritime Loadmaster travels with your vessel from coast to coast in the rear pilot vehicle. They oversee the crane lift, the securement, the transit, and the re-launch — every single time.",
    },
    {
      icon: Award,
      title: "Ticketed Captains & Engineers",
      description:
        "Every sea leg is handled by fully licensed, ticketed marine captains and engineers. Your vessel is never in the hands of unqualified personnel — from the Gulf to the Andaman Sea.",
    },
    {
      icon: Anchor,
      title: "100-Ton Crane at Ranong",
      description:
        "Our 100-ton crane at Ranong is capable of handling the largest catamarans and powerboats we transport. Professional crane operations at both ends of the land bridge ensure controlled, damage-free lifts.",
    },
    {
      icon: Shield,
      title: "Custom-Fabricated Transit Cradles",
      description:
        "Every vessel is different. We fabricate a bespoke transit cradle engineered specifically for your hull profile — ensuring perfect support and zero movement during the overland journey.",
    },
    {
      icon: Clock,
      title: "Under a Week, Coast to Coast",
      description:
        "Pattaya to Phuket in under 7 days, adding only approximately 50 engine hours to your vessel's log. Compare that to 1,700 miles and 12+ days around the Malay Peninsula.",
    },
    {
      icon: FileText,
      title: "End-to-End Administration",
      description:
        "Title transfers, port clearances, customs documentation — we handle the paperwork so you don't have to. One point of contact from first enquiry to final handover.",
    },
    {
      icon: CheckCircle,
      title: "Part of Phuket Marine Oracle Co., Ltd.",
      description:
        "Coast to Coast Marine Transportation Thailand is a subsidiary of Phuket Marine Oracle Co., Ltd. — an established Thai marine enterprise. You benefit from a wider network, deeper resources, and institutional expertise.",
    },
    {
      icon: Waves,
      title: "Both Directions, Any Vessel",
      description:
        "We operate Gulf to Andaman and Andaman to Gulf with equal capability. Powerboats, keel yachts, and catamarans up to 15m length, 5.5m beam, 5.5m height, and 32 tonnes.",
    },
  ];

  const comparisons = [
    {
      label: "Sea Miles",
      them: "1,700 miles",
      us: "~350 miles",
      saving: "79% less",
    },
    {
      label: "Transit Time",
      them: "12+ days",
      us: "Under 1 week",
      saving: "50%+ faster",
    },
    {
      label: "Engine Hours",
      them: "500+ hours",
      us: "~50 hours",
      saving: "90% fewer",
    },
    {
      label: "Open-Ocean Risk",
      them: "Very High",
      us: "Minimal",
      saving: "Near zero",
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
            <p className="font-mono-accent text-xs tracking-[0.3em] uppercase text-secondary mb-4">Our Advantage</p>
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">Why Choose Us</h1>
            <p className="text-xl opacity-80 max-w-3xl">
              There is no smarter, safer, or faster way to move your vessel between Thailand's coasts. Here is why boat owners and captains trust Coast to Coast Marine Transportation Thailand.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Numbers */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container">
          <FadeSection>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <p className="font-mono-accent text-xs tracking-[0.3em] uppercase text-secondary mb-3">By the Numbers</p>
              <h2 className="font-display text-4xl font-bold text-primary mb-4">The Case Is Clear</h2>
              <p className="text-lg text-foreground/65 max-w-2xl mx-auto">
                Our land-bridge solution versus the traditional route around the Malay Peninsula — the numbers speak for themselves.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="overflow-x-auto">
              <table className="w-full bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="text-left px-6 py-4 font-display font-bold text-sm">Metric</th>
                    <th className="text-center px-6 py-4 font-display font-bold text-sm opacity-70">Traditional Route</th>
                    <th className="text-center px-6 py-4 font-display font-bold text-sm text-secondary">Coast to Coast</th>
                    <th className="text-center px-6 py-4 font-display font-bold text-sm text-secondary">Your Saving</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisons.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-primary/3"}>
                      <td className="px-6 py-4 font-semibold text-primary text-sm">{row.label}</td>
                      <td className="px-6 py-4 text-center text-foreground/50 text-sm line-through">{row.them}</td>
                      <td className="px-6 py-4 text-center font-bold text-primary text-sm">{row.us}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="bg-secondary/10 text-secondary font-bold text-xs px-3 py-1 rounded-full">{row.saving}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </FadeSection>
        </div>
      </section>

      {/* Advantages Grid */}
      <section className="py-20 md:py-28 bg-primary/5">
        <div className="container">
          <FadeSection>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <p className="font-mono-accent text-xs tracking-[0.3em] uppercase text-secondary mb-3">What Sets Us Apart</p>
              <h2 className="font-display text-4xl font-bold text-primary mb-4">Nine Reasons to Choose Us</h2>
              <p className="text-lg text-foreground/65 max-w-2xl mx-auto">
                From specialist equipment to licensed professionals — every aspect of our service is built around your vessel's safety.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {advantages.map((adv, index) => {
                const Icon = adv.icon;
                return (
                  <motion.div
                    key={index}
                    variants={fadeUp}
                    className="bg-white p-8 rounded-xl shadow-sm border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                  >
                    <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-secondary/20 transition-colors">
                      <Icon className="text-secondary" size={26} />
                    </div>
                    <h3 className="font-display text-lg font-bold text-primary mb-3">{adv.title}</h3>
                    <p className="text-foreground/65 text-sm leading-relaxed">{adv.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </FadeSection>
        </div>
      </section>

      {/* Testimonial / Quote block */}
      <section className="py-20 md:py-28 bg-primary text-white">
        <div className="container">
          <FadeSection>
            <motion.div variants={fadeUp} className="max-w-3xl mx-auto text-center">
              <div className="text-secondary text-6xl font-display leading-none mb-6 opacity-60">"</div>
              <p className="text-xl md:text-2xl font-light leading-relaxed mb-8 opacity-90">
                We built this service because we saw how gruelling the traditional route was — the South China Sea, the Malacca Straits, the risks. There had to be a better way. The land bridge is that better way.
              </p>
              <p className="font-mono-accent text-xs tracking-widest text-secondary uppercase">
                Coast to Coast Marine Transportation Thailand
              </p>
            </motion.div>
          </FadeSection>
        </div>
      </section>

      {/* Gallery strip */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container">
          <FadeSection>
            <motion.div variants={fadeUp} className="text-center mb-12">
              <p className="font-mono-accent text-xs tracking-[0.3em] uppercase text-secondary mb-3">See It In Action</p>
              <h2 className="font-display text-4xl font-bold text-primary mb-4">Real Jobs. Real Results.</h2>
              <p className="text-lg text-foreground/65 max-w-2xl mx-auto">
                Every image below is from an actual Coast to Coast relocation — crane lifts, overland transits, and Andaman Sea launches.
              </p>
            </motion.div>
            <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {["/gallery/7.webp", "/gallery/9.webp", "/gallery/4.webp", "/gallery/3.webp"].map((src, i) => (
                <div key={i} className="rounded-xl overflow-hidden aspect-square shadow-sm hover:shadow-lg transition-shadow">
                  <img src={src} alt={`Coast to Coast operation ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </motion.div>
          </FadeSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-primary/5">
        <div className="container text-center">
          <FadeSection>
            <motion.div variants={fadeUp}>
              <h2 className="font-display text-4xl font-bold text-primary mb-6">Ready to Experience the Difference?</h2>
              <p className="text-lg text-foreground/65 mb-10 max-w-2xl mx-auto">
                Contact our team today. Provide your vessel's dimensions and we'll have a professional quote ready promptly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <a>
                    <Button className="bg-secondary hover:bg-secondary/90 text-white px-10 py-6 text-lg font-semibold shadow-lg">
                      Request a Quote
                    </Button>
                  </a>
                </Link>
                <Link href="/services">
                  <a>
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white px-10 py-6 text-lg font-semibold">
                      View Our Services <ArrowRight size={18} className="ml-2" />
                    </Button>
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
