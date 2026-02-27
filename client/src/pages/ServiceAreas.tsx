import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { MapPin, Clock, Users, Anchor } from "lucide-react";

export default function ServiceAreas() {
  const pattayaImage = "https://private-us-east-1.manuscdn.com/sessionFile/YkwAmRvQLErSCeWY8dqaO8/sandbox/3HGU8ECKvYph2ojdYQzeZE-img-3_1772161842000_na1fn_cGF0dGF5YS1wb3J0LWZhY2lsaXR5.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvWWt3QW1SdlFMRXJTQ2VXWThkcWFPOC9zYW5kYm94LzNIR1U4RUNLdllwaDJvamRZUXplWkUtaW1nLTNfMTc3MjE2MTg0MjAwMF9uYTFmbl9jR0YwZEdGNVlTMXdiM0owTFdaaFkybHNhWFI1LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=SNjR7HRGQE-OzLc--OaVQtCkhtmiK5KuPiKzwuDLxzg1PthKRcu3i1BJK212LppBtbn8mNlZmD-MNO0yaxUGhLtYWBzw-c8YbDb69xVJ04-BFbOFfn6kcMTsaPl97sJhzWGT5ctSbJgu1kQl2PGox023XFlUnT1iRBi8R7Yl~EJgLvYCp4F8ZOx7ducZI6Ei6b5JeLLWWwtyqx2IsaQ2bYUGmYBzJFOzBgaVKC0cRJD3BZZKlq6cVbDjsKSDtmLF3lfLncwM~jYqC42tWxntgKEdiRK0VFdfBO5BwwLncrtu530OiwTDGK3pfxGfF~swJUvhsLg-CrULfc9qWlds0g__";
  const coastalImage = "https://private-us-east-1.manuscdn.com/sessionFile/YkwAmRvQLErSCeWY8dqaO8/sandbox/3HGU8ECKvYph2ojdYQzeZE-img-4_1772161841000_na1fn_Y29hc3RhbC1yb3V0ZS10aGFpbGFuZA.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvWWt3QW1SdlFMRXJTQ2VXWThkcWFPOC9zYW5kYm94LzNIR1U4RUNLdllwaDJvamRZUXplWkUtaW1nLTRfMTc3MjE2MTg0MTAwMF9uYTFmbl9ZMjloYzNSaGJDMXliM1YwWlMxMGFHRnBiR0Z1WkEucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=seOTJ4mFLiTLG6j37~Hg~cNwxtb4Faih6b7hro5uvwucKy49DbdDycRPa8Y-274rovT31wROdAzRf8K5DGtI~dnLd~qPov3mJXzkJrX290PaKpJQOdXgsjJcSa1uQ8e49v~ZGgmSBYqzWQoekhZcnI0IvARBbyVzLTkdOwwr3Atnyl3TrjKP~JrX-U8UA0lUYUqJiZTr3pNfTmOPp0wxUv1SikvN2phbu6CcfTlZrcJbr5-CvZ0EJ6ZVIJO1QZavD2eGN9o7ZtAmtNDmMqOoYExBesHgv6NhIu6tKW-KBdhFxB5rYfwWCY8qr4tMgNp~65gtEVXFbSIn47z6KcLieg__";

  const areas = [
    {
      name: "Pattaya",
      description: "East Coast Hub - Major departure point for vessel transport",
      features: ["Modern port facilities", "Experienced local team", "Quick turnaround"],
    },
    {
      name: "Chumphon",
      description: "Strategic midpoint connecting east and west coasts",
      features: ["Convenient location", "Professional handling", "Fuel & supply services"],
    },
    {
      name: "Ranong",
      description: "West Coast Gateway - Primary destination port",
      features: ["Full-service facilities", "Expert local crew", "Customs support"],
    },
    {
      name: "Phuket",
      description: "Premium West Coast Destination - Final delivery hub",
      features: ["International standards", "Premium facilities", "Complete support"],
    },
  ];

  const routes = [
    { from: "Pattaya", to: "Phuket", duration: "4-5 Days", distance: "~850 km" },
    { from: "Pattaya", to: "Ranong", duration: "3-4 Days", distance: "~700 km" },
    { from: "Pattaya", to: "Chumphon", duration: "2-3 Days", distance: "~400 km" },
  ];

  return (
    <div className="min-h-screen">
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="container">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">Service Areas</h1>
          <p className="text-xl opacity-90 max-w-3xl">Operating major routes across Thailand's coasts</p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold text-primary mb-4">Our Coverage</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">Professional transport between Thailand's premier maritime hubs</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {areas.map((area, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-border">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="text-secondary" size={24} />
                </div>
                <h3 className="font-display text-xl font-bold text-primary mb-2">{area.name}</h3>
                <p className="text-sm text-foreground/70 mb-4">{area.description}</p>
                <ul className="space-y-2">
                  {area.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-primary/5">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img src={pattayaImage} alt="Pattaya Port" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="font-display text-4xl font-bold text-primary mb-6">East Coast Operations</h2>
              <p className="text-lg text-foreground/70 mb-4">Our Pattaya hub serves as the primary departure point for vessel transport. With modern facilities and an experienced team, we ensure smooth preparation and loading of your boat.</p>
              <ul className="space-y-3">
                {["Pre-transport inspection", "Professional loading", "Documentation support", "Real-time tracking setup"].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <Users className="text-secondary" size={20} />
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-4xl font-bold text-primary mb-6">West Coast Delivery</h2>
              <p className="text-lg text-foreground/70 mb-4">Our Phuket and Ranong facilities provide premier delivery services with full support. We handle all final documentation and ensure your vessel is safely delivered to its destination.</p>
              <ul className="space-y-3">
                {["Safe unloading", "Final inspection", "Customs clearance", "Handover support"].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <Anchor className="text-secondary" size={20} />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img src={coastalImage} alt="Coastal Route" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-primary/5">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold text-primary mb-4">Popular Routes</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">Standard transport routes with proven timelines</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {routes.map((route, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md border border-border">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-foreground/70">From</p>
                    <p className="font-display text-lg font-bold text-primary">{route.from}</p>
                  </div>
                  <Anchor className="text-secondary" size={24} />
                  <div className="text-right">
                    <p className="text-sm text-foreground/70">To</p>
                    <p className="font-display text-lg font-bold text-primary">{route.to}</p>
                  </div>
                </div>
                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="text-secondary" size={18} />
                    <span className="text-foreground font-medium">{route.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="text-secondary" size={18} />
                    <span className="text-foreground font-medium">{route.distance}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="container text-center">
          <h2 className="font-display text-4xl font-bold mb-6">Ready to Start Your Transport?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">Contact us to discuss your specific route and get a customized quote</p>
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
