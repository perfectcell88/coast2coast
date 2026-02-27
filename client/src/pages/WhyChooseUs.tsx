import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Award, Shield, Zap, Users, CheckCircle, TrendingUp } from "lucide-react";

export default function WhyChooseUs() {
  const advantages = [
    {
      icon: Award,
      title: "Industry Experience",
      description: "Years of proven expertise in oversized boat transport across Thailand's maritime routes",
    },
    {
      icon: Users,
      title: "Professional Team",
      description: "Fully ticketed captains, marine engineers, and experienced loadmasters",
    },
    {
      icon: Shield,
      title: "Safety First",
      description: "Rigorous safety protocols and compliance with maritime regulations",
    },
    {
      icon: Zap,
      title: "Fast Delivery",
      description: "Reliable 4-5 day transport from Pattaya to Phuket",
    },
    {
      icon: TrendingUp,
      title: "Transparent Pricing",
      description: "Competitive rates with detailed quotes and no hidden fees",
    },
    {
      icon: CheckCircle,
      title: "Complete Support",
      description: "End-to-end coordination from consultation to final delivery",
    },
  ];

  const stats = [
    { number: "100+", label: "Successful Transports" },
    { number: "15+", label: "Years Experience" },
    { number: "4-5", label: "Days Delivery" },
    { number: "24/7", label: "Support" },
  ];

  return (
    <div className="min-h-screen">
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="container">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">Why Choose Us</h1>
          <p className="text-xl opacity-90 max-w-3xl">Thailand's specialist in oversized boat transport</p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold text-primary mb-4">Our Advantages</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">What sets us apart in marine logistics</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((adv, index) => {
              const Icon = adv.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-lg shadow-md border border-border hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="text-secondary" size={28} />
                  </div>
                  <h3 className="font-display text-lg font-bold text-primary mb-3">{adv.title}</h3>
                  <p className="text-foreground/70">{adv.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="bg-white p-12 rounded-lg shadow-md border border-border">
            <h2 className="font-display text-4xl font-bold text-primary mb-6 text-center">Our Commitment</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-display text-xl font-bold text-primary mb-3">Safety & Reliability</h3>
                <p className="text-foreground/70 leading-relaxed">
                  We prioritize the safety of your vessel above all else. Every transport is handled with meticulous attention to detail, using proven techniques and state-of-the-art equipment. Our team follows strict safety protocols and maintains full compliance with maritime regulations.
                </p>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-primary mb-3">Professional Excellence</h3>
                <p className="text-foreground/70 leading-relaxed">
                  Our licensed captains, marine engineers, and experienced loadmasters bring decades of combined expertise. We invest in continuous training and stay updated with industry best practices to ensure the highest standards of service.
                </p>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-primary mb-3">Transparent Communication</h3>
                <p className="text-foreground/70 leading-relaxed">
                  We believe in keeping you informed every step of the way. From initial consultation to final delivery, you'll receive regular updates and have direct access to our team. No surprises, no hidden fees—just honest, professional service.
                </p>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-primary mb-3">Customer-Centric Service</h3>
                <p className="text-foreground/70 leading-relaxed">
                  Your satisfaction is our success. We tailor our services to meet your specific needs and provide 24/7 support throughout the transport process. Your vessel is our responsibility, and we treat it with the care it deserves.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-primary/5">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold text-primary mb-4">What Our Clients Say</h2>
            <p className="text-lg text-foreground/70">Trusted by boat owners and maritime companies across Thailand</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Captain Somchai", role: "Yacht Owner", text: "Professional, reliable, and trustworthy. They handled my yacht transport perfectly." },
              { name: "Marina Manager", role: "Phuket Marina", text: "Coast to Coast is our go-to partner for vessel transport. Highly recommended." },
              { name: "Boat Broker", role: "Bangkok", text: "Excellent service, competitive pricing, and professional team. Best in the business." },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-border">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-secondary">★</span>
                  ))}
                </div>
                <p className="text-foreground/70 mb-4 italic">"{testimonial.text}"</p>
                <p className="font-display font-bold text-primary">{testimonial.name}</p>
                <p className="text-sm text-foreground/70">{testimonial.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="container text-center">
          <h2 className="font-display text-4xl font-bold mb-6">Experience the Difference</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">Let us handle your boat transport with the professionalism and care it deserves</p>
          <Link href="/contact">
            <a>
              <Button className="bg-secondary hover:bg-secondary/90 text-white px-8 py-6 text-lg font-semibold">Get Started Today</Button>
            </a>
          </Link>
        </div>
      </section>
    </div>
  );
}
