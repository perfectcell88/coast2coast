import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MessageCircle, MapPin, Clock, Facebook } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    vesselType: "",
    vesselLength: "",
    vesselBeam: "",
    vesselHeight: "",
    vesselWeight: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const response = await fetch("https://formspree.io/f/maqdkyjd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Thank you for your inquiry! We will contact you shortly.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          vesselType: "",
          vesselLength: "",
          vesselBeam: "",
          vesselHeight: "",
          vesselWeight: "",
          message: "",
        });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Submission failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Contact Us | Coast to Coast Marine Transportation Thailand"
        description="Request a free quote for vessel relocation between Thailand's Gulf and Andaman coasts. Provide your vessel's length, beam, height and weight and we'll respond promptly."
        path="/contact"
      />

      {/* Hero */}
      <section
        className="relative text-white py-24 md:py-36 overflow-hidden"
        style={{
          backgroundImage: "url('/gallery/9.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
        }}
      >
        {/* Deep gradient overlay */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(135deg, rgba(6,30,54,0.93) 0%, rgba(10,37,64,0.82) 50%, rgba(0,168,168,0.3) 100%)"
        }} />
        {/* Subtle bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(248,250,251,0.15))" }} />
        <div className="relative z-10 container">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8" style={{ background: "rgba(0,200,200,0.7)" }} />
              <p className="font-mono-accent text-xs tracking-[0.3em] uppercase" style={{ color: "#00c8c8" }}>Get in Touch</p>
            </div>
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6" style={{ textShadow: "0 2px 20px rgba(0,0,0,0.4)" }}>Contact Us</h1>
            <p className="text-xl max-w-3xl" style={{ color: "rgba(255,255,255,0.78)" }}>
              Get in touch with our team to discuss your vessel transport needs and receive a professional quote.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <div>
                <p className="font-mono-accent text-xs tracking-[0.3em] uppercase text-secondary mb-3">Reach Us</p>
                <h2 className="font-display text-2xl font-bold text-primary mb-6">Contact Information</h2>
              </div>

                {[
                {
                  icon: Phone,
                  title: "Phone",
                  content: <a href="tel:+66862697138" className="text-foreground/70 hover:text-secondary transition-colors">+66 86 269 7138</a>,
                },
                {
                  icon: MessageCircle,
                  title: "WhatsApp",
                  content: <a href="https://wa.me/66862697138?text=Hi%2C%20I%27d%20like%20a%20quote%20for%20vessel%20transport" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-secondary transition-colors">+66 86 269 7138</a>,
                },
                {
                  icon: MessageCircle,
                  title: "LINE",
                  content: <p className="text-foreground/70">ID: 0862697138</p>,
                },
                {
                  icon: Mail,
                  title: "Email",
                  content: <a href="mailto:brentmcinnes000@gmail.com" className="text-foreground/70 hover:text-secondary transition-colors break-all">brentmcinnes000@gmail.com</a>,
                },
                {
                  icon: MapPin,
                  title: "Operating Areas",
                  content: <p className="text-foreground/70">Pattaya · Chumphon · Ranong · Phuket</p>,
                },
                {
                  icon: Clock,
                  title: "Hours",
                  content: <p className="text-foreground/70">7 days a week: 8:00 AM – 7:00 PM</p>,
                },
                {
                  icon: Facebook,
                  title: "Social Media",
                  content: (
                    <a href="https://www.facebook.com/profile.php?id=61588477663667&sk=about" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-secondary transition-colors">
                      Follow us on Facebook
                    </a>
                  ),
                },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex gap-4">
                    <div className="w-11 h-11 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="text-secondary" size={20} />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-primary text-sm mb-1">{item.title}</h3>
                      {item.content}
                    </div>
                  </div>
                );
              })}

              {/* QR Codes */}
              <div className="pt-4 border-t border-border">
                <p className="font-mono-accent text-xs tracking-[0.3em] uppercase text-secondary mb-4">Scan to Contact</p>
                <div className="grid grid-cols-2 gap-4">
                  <a href="https://wa.me/66862697138?text=Hi%2C%20I%27d%20like%20a%20quote%20for%20vessel%20transport" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 p-3 rounded-xl border border-border hover:border-secondary/50 hover:shadow-sm transition-all bg-white">
                    <img src="/qr-whatsapp.png" alt="WhatsApp QR Code" className="w-24 h-24 rounded-md" />
                    <span className="text-xs font-semibold text-foreground/60">WhatsApp</span>
                  </a>
                  <div className="flex flex-col items-center gap-2 p-3 rounded-xl border border-border bg-white">
                    <img src="/qr-line.png" alt="LINE QR Code" className="w-24 h-24 rounded-md" />
                    <span className="text-xs font-semibold text-foreground/60">LINE</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quote Form */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-2"
            >
              <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-border">
                <p className="font-mono-accent text-xs tracking-[0.3em] uppercase text-secondary mb-2">How can we help?</p>
                <h2 className="font-display text-3xl font-bold text-primary mb-8">Request a Quote</h2>

                <form onSubmit={handleSubmit} className="space-y-5">

                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Your name <span className="text-secondary">*</span>
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="w-full h-12 rounded-xl border-border focus:border-secondary"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Your email <span className="text-secondary">*</span>
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full h-12 rounded-xl border-border focus:border-secondary"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Your phone <span className="text-secondary">*</span>
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+66 (0) XXX-XXXX"
                      className="w-full h-12 rounded-xl border-border focus:border-secondary"
                      required
                    />
                  </div>

                  {/* Vessel Type */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Vessel type
                    </label>
                    <select
                      name="vesselType"
                      value={formData.vesselType}
                      onChange={handleChange}
                      className="w-full h-12 rounded-xl border border-border bg-white px-3 text-sm text-foreground focus:outline-none focus:border-secondary transition-colors"
                    >
                      <option value="">Select vessel type...</option>
                      <option value="Powerboat">Powerboat</option>
                      <option value="Keel Yacht">Keel Yacht</option>
                      <option value="Catamaran">Catamaran</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Vessel Dimensions */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Vessel dimensions
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { name: "vesselLength", placeholder: "Length (m)" },
                        { name: "vesselBeam", placeholder: "Beam (m)" },
                        { name: "vesselHeight", placeholder: "Height (m)" },
                        { name: "vesselWeight", placeholder: "Weight (T)" },
                      ].map((field) => (
                        <Input
                          key={field.name}
                          type="text"
                          name={field.name}
                          value={formData[field.name as keyof typeof formData]}
                          onChange={handleChange}
                          placeholder={field.placeholder}
                          className="h-12 rounded-xl border-border focus:border-secondary text-sm"
                        />
                      ))}
                    </div>
                    <p className="text-xs text-foreground/45 mt-1.5">
                      Max capacity: 15m L · 5.5m W · 5.5m H · 32 Tons
                    </p>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Message
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can we help you? Tell us about your transport needs, preferred timeline, and any other details..."
                      className="w-full h-36 rounded-xl border-border focus:border-secondary resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-secondary hover:bg-secondary/90 text-white py-4 h-14 text-base font-semibold rounded-xl shadow-md transition-all hover:shadow-lg"
                  >
                    Send
                  </Button>

                  <p className="text-xs text-foreground/40 text-center">
                    We typically respond within 24 hours. For urgent enquiries, please call or WhatsApp directly.
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
