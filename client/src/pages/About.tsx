import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Award, Users, Zap, Globe } from "lucide-react";

/**
 * Design Philosophy: Modern Maritime Minimalism
 * - Professional tone with maritime heritage emphasis
 * - Playfair Display headlines for premium feel
 * - Generous spacing and clear information hierarchy
 */

export default function About() {
  const teamImage = "https://private-us-east-1.manuscdn.com/sessionFile/YkwAmRvQLErSCeWY8dqaO8/sandbox/3HGU8ECKvYph2ojdYQzeZE-img-5_1772161843000_na1fn_dGVhbS1wcm9mZXNzaW9uYWwtbWFyaXRpbWU.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvWWt3QW1SdlFMRXJTQ2VXWThkcWFPOC9zYW5kYm94LzNIR1U4RUNLdllwaDJvamRZUXplWkUtaW1nLTVfMTc3MjE2MTg0MzAwMF9uYTFmbl9kR1ZoYlMxd2NtOW1aWE56YVc5dVlXd3RiV0Z5YVhScGJXVS5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=oQkfd4yxfH6G2JicahnJtmKkJV0GBY-F1K4adCz0rctsBSB3eOGuwxQmGgBsNcQvaFQI6z5qhh6OCtfq9aEqPFgt9lvbQOvtwkYZa4ZNQZXHyJ9~a-ObKfpEXQU5ukpqHMfQxt7R8J34lbaTFCMzOtyFt8LBVm5BAaqJdQtNyYmC0o2kSv1hl32cz24l-3ivagOk3VtYNUwKfs1o9P-CEikWkhvbK8ijax4~59ANUffgT6tgMQRKvIkMmHCbYx0Ou0j3p79yw4IffmdefqeAvc1jccP4tkEvYQ~8fHn33wrkIv8YH2MW2gTapxF5r2xa2aLGG0V6FQtSu2--GyMP5Q__";

  const values = [
    {
      icon: Award,
      title: "Excellence",
      description: "We maintain the highest standards in boat transport and maritime logistics",
    },
    {
      icon: Users,
      title: "Expertise",
      description: "Our team brings decades of combined experience in marine operations",
    },
    {
      icon: Zap,
      title: "Reliability",
      description: "Consistent, on-time delivery with transparent communication",
    },
    {
      icon: Globe,
      title: "Professionalism",
      description: "Licensed captains, engineers, and loadmasters on every transport",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="container">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
            About Coast to Coast
          </h1>
          <p className="text-xl opacity-90 max-w-3xl">
            Specialists in safe, professional oversized boat transport across Thailand's coasts
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-4xl font-bold text-primary mb-6">
                Who We Are
              </h2>
              <p className="text-lg text-foreground/70 mb-4">
                Coast to Coast Trucking Boats Thailand is a specialist marine logistics company dedicated to transporting oversized boats safely between Thailand's east and west coasts. With years of experience in maritime operations, we have become the trusted partner for vessel relocation across major Thai ports.
              </p>
              <p className="text-lg text-foreground/70 mb-4">
                Our team combines professional expertise with cutting-edge logistics to ensure every transport is executed with precision and care. We understand that your vessel is a valuable asset, which is why we treat every transport as our highest priority.
              </p>
              <p className="text-lg text-foreground/70">
                From initial consultation to final delivery, we provide end-to-end coordination with fully ticketed captains, marine engineers, and experienced loadmasters.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src={teamImage}
                alt="Professional maritime team"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission & Vision */}
      <section className="py-16 md:py-24 bg-primary/5">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-md border border-border">
              <h3 className="font-display text-2xl font-bold text-primary mb-4">
                Our Mission
              </h3>
              <p className="text-foreground/70 leading-relaxed">
                To provide safe, reliable, and professional boat transport services that exceed client expectations. We are committed to delivering vessels on time, in perfect condition, with transparent communication and expert handling throughout every journey.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md border border-border">
              <h3 className="font-display text-2xl font-bold text-primary mb-4">
                Our Vision
              </h3>
              <p className="text-foreground/70 leading-relaxed">
                To be Thailand's most trusted and innovative marine transport specialist, recognized for our unwavering commitment to safety, professionalism, and customer satisfaction. We aim to set industry standards for oversized vessel transport.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold text-primary mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              These principles guide every decision and action we take
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="text-secondary" size={24} />
                  </div>
                  <h3 className="font-display text-lg font-bold text-primary mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-foreground/70">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="container text-center">
          <h2 className="font-display text-4xl font-bold mb-6">
            Ready to Work With Us?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Contact our team to discuss your boat transport needs and receive a professional quote
          </p>
          <Link href="/contact">
            <a>
              <Button className="bg-secondary hover:bg-secondary/90 text-white px-8 py-6 text-lg font-semibold">
                Get in Touch
              </Button>
            </a>
          </Link>
        </div>
      </section>
    </div>
  );
}
