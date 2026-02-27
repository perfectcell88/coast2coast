import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Anchor, Shield, Users, Truck, CheckCircle, MapPin } from "lucide-react";

export default function Services() {
  const loadmasterImage = "https://private-us-east-1.manuscdn.com/sessionFile/YkwAmRvQLErSCeWY8dqaO8/sandbox/3HGU8ECKvYph2ojdYQzeZE-img-2_1772161844000_na1fn_bG9hZG1hc3Rlci1zZWN1cmluZy1ib2F0.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvWWt3QW1SdlFMRXJTQ2VXWThkcWFPOC9zYW5kYm94LzNIR1U4RUNLdllwaDJvamRZUXplWkUtaW1nLTJfMTc3MjE2MTg0NDAwMF9uYTFmbl9iRzloWkcxaGMzUmxjaTF6WldOMWNtbHVaeTFpYjJGMC5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=FRdxrVrHSMixk7CkJ0sx7U-rgriZ1wL0OlydFcrsEiPqxJ5CVBYXMP73mg4YnIYjr3kWUpAGMmuioig8LZ5VBVGBcDP9pJnOzqHFcssI1ArSYAXxKkPq9EUWChIO-t765-5GtCjGkeKb6eXrE1-zL6wG~Iog1SLyTWje2Pig7F-BGx00Oxa9WSRnqFRKvQd5NUvO0wAmlrhVxx5N5Jlx8FZLG8-xZkCZ8HC1rb-4pdfMDtBlVm4piSB7dldw1BdR~p7p-oW4OoLKpoU5gFu6xn7F2uYGom7gw-7QT6bFRWz6uDuU7rxC2TAba5zABmCH5NBNXBUxIEa2MoQdwSONsw__";

  const services = [
    { icon: Truck, title: "Oversized Boat Trucking", description: "Professional transport using specialized trucks" },
    { icon: MapPin, title: "East-West Coast Relocation", description: "Safe vessel transport between major ports" },
    { icon: Users, title: "Professional Loadmasters", description: "Expert lifting, securing, and transport" },
    { icon: Shield, title: "Ticketed Captains & Engineers", description: "Licensed professionals on every transport" },
    { icon: Anchor, title: "Secure Hauling & Logistics", description: "State-of-the-art equipment and methods" },
    { icon: CheckCircle, title: "End-to-End Coordination", description: "Complete support from start to finish" },
  ];

  const processSteps = [
    { number: 1, title: "Consultation", description: "Discuss specifications" },
    { number: 2, title: "Quotation", description: "Detailed quote & plan" },
    { number: 3, title: "Preparation", description: "Coordinate logistics" },
    { number: 4, title: "Transport", description: "Safe delivery" },
    { number: 5, title: "Handover", description: "Final delivery" },
  ];

  return (
    <div className="min-h-screen">
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="container">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">Our Services</h1>
          <p className="text-xl opacity-90 max-w-3xl">Comprehensive boat transport solutions</p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold text-primary mb-4">What We Offer</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">Complete marine transport with professional expertise</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="text-secondary" size={28} />
                  </div>
                  <h3 className="font-display text-lg font-bold text-primary mb-3">{service.title}</h3>
                  <p className="text-foreground/70">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-primary/5">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img src={loadmasterImage} alt="Loadmasters" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="font-display text-4xl font-bold text-primary mb-6">Expert Handling</h2>
              <p className="text-lg text-foreground/70 mb-6">Professional techniques and specialized equipment ensure safe transport.</p>
              <ul className="space-y-4">
                {["Professional lifting techniques", "Real-time tracking", "Insurance coverage", "Maritime compliance", "24/7 support"].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="text-secondary flex-shrink-0 mt-1" size={20} />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold text-primary mb-4">Transport Process</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">Streamlined approach to boat transport</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-border text-center">
                  <div className="w-10 h-10 bg-secondary text-white rounded-full flex items-center justify-center font-bold mx-auto mb-3">{step.number}</div>
                  <h3 className="font-display font-bold text-primary mb-2">{step.title}</h3>
                  <p className="text-sm text-foreground/70">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="container text-center">
          <h2 className="font-display text-4xl font-bold mb-6">Ready to Transport?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">Contact us for your transport needs</p>
          <Link href="/contact">
            <a>
              <Button className="bg-secondary hover:bg-secondary/90 text-white px-8 py-6 text-lg font-semibold">Request a Quote</Button>
            </a>
          </Link>
        </div>
      </section>
    </div>
  );
}
