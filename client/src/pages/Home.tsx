import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Anchor, Shield, Users, Clock, CheckCircle, ArrowRight } from "lucide-react";

/**
 * Design Philosophy: Modern Maritime Minimalism
 * - Deep navy primary with teal accents
 * - Playfair Display for headlines (premium feel)
 * - Generous whitespace and asymmetric layouts
 * - Subtle wave dividers between sections
 */

export default function Home() {
  const heroImage = "https://private-us-east-1.manuscdn.com/sessionFile/YkwAmRvQLErSCeWY8dqaO8/sandbox/3HGU8ECKvYph2ojdYQzeZE-img-1_1772161841000_na1fn_aGVyby15YWNodC10cmFuc3BvcnQ.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvWWt3QW1SdlFMRXJTQ2VXWThkcWFPOC9zYW5kYm94LzNIR1U4RUNLdllwaDJvamRZUXplWkUtaW1nLTFfMTc3MjE2MTg0MTAwMF9uYTFmbl9hR1Z5YnkxNVlXTm9kQzEwY21GdWMzQnZjblEucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=lkuUQvb2U1u888KzMSX~QEyc-0yYIIcFQ-nhqhSyJmPOq9-anNCorwH6uannb0-C647mZHVHvovSaBcdEC4yseK9edu5zNX7CTp8r-cYDE1v0laXsKSc8nO-~2xVO78B2~YFE-BU2EH7r4ewpVhOtf~Ox3VXTjK7LRp-odLTHcuD~omtVVobeyetLC552mvuBeyfqZLQ5Lpdme~xJ3BMzio5efpkb7sI8DrLKMd5l1XX-I~leUOVK~kEMxBCo4s-WDED7wQcXFyq4xlxq5gY9IbrT~URI-NYb1nnNTQ-iwTXs~3IgHqTAe6DVWdb33F7Yc8LgCoW5Fmpf48utci2Hg__";

  const whyChooseItems = [
    {
      icon: Users,
      title: "Experienced Loadmasters",
      description: "Professional team with years of expertise in boat transport",
    },
    {
      icon: Shield,
      title: "Fully Ticketed Captains & Engineers",
      description: "Licensed marine professionals ensuring safe transport",
    },
    {
      icon: Anchor,
      title: "Specialized Vessel Handling",
      description: "Expert techniques for oversized boat transport",
    },
    {
      icon: Clock,
      title: "Fast 4–5 Day Delivery",
      description: "Reliable scheduling from Pattaya to Phuket",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative h-screen bg-cover bg-center flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url('${heroImage}')`,
          backgroundAttachment: "fixed",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-secondary/50"></div>

        {/* Content */}
        <div className="relative z-10 container text-center text-white max-w-3xl mx-auto px-4">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Thailand's Trusted Oversized Boat Transport Specialists
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-95 font-light">
            Safe, Reliable Vessel Transport Between Pattaya & Phuket – 4–5 Day Delivery
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <a>
                <Button className="bg-secondary hover:bg-secondary/90 text-white px-8 py-6 text-lg font-semibold">
                  Request a Quote
                </Button>
              </a>
            </Link>
            <Link href="/services">
              <a>
                <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold">
                  Learn More
                </Button>
              </a>
            </Link>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-background">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            <path
              d="M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z"
              fill="#F8F6F1"
            />
          </svg>
        </div>
      </section>

      {/* Why Choose Us Preview */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">
              Why Choose Coast to Coast?
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              We combine expertise, professionalism, and reliability to ensure your vessel arrives safely
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-border"
                >
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="text-secondary" size={24} />
                  </div>
                  <h3 className="font-display text-lg font-bold text-primary mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-foreground/70">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link href="/why-choose-us">
              <a>
                <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 inline-flex items-center gap-2">
                  Explore Our Advantages
                  <ArrowRight size={18} />
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* Service Areas Preview */}
      <section className="py-16 md:py-24 bg-primary/5">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">
                Serving Thailand's Coasts
              </h2>
              <p className="text-lg text-foreground/70 mb-6">
                We operate major routes connecting Thailand's premier maritime hubs, ensuring efficient transport between east and west coasts.
              </p>
              <ul className="space-y-3 mb-8">
                {["Pattaya", "Chumphon", "Ranong", "Phuket"].map((area) => (
                  <li key={area} className="flex items-center gap-3">
                    <CheckCircle className="text-secondary" size={20} />
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
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md border border-border">
              <div className="bg-primary/10 rounded-lg p-8 text-center">
                <Anchor className="text-primary mx-auto mb-4" size={48} />
                <h3 className="font-display text-2xl font-bold text-primary mb-2">
                  Pattaya to Phuket
                </h3>
                <p className="text-foreground/70 mb-4">
                  Standard route with professional handling
                </p>
                <p className="font-display text-3xl font-bold text-secondary">
                  4–5 Days
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="container text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Ready to Transport Your Vessel?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Contact us today for a free quote and let our experts handle your boat transport safely and professionally.
          </p>
          <Link href="/contact">
            <a>
              <Button className="bg-secondary hover:bg-secondary/90 text-white px-8 py-6 text-lg font-semibold">
                Get Your Free Quote Now
              </Button>
            </a>
          </Link>
        </div>
      </section>
    </div>
  );
}
