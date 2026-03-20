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
    <div className="min-h-screen" style={{ background: "#f8fafb" }}>
      <SEO
        title="Contact Us | Coast to Coast Marine Transportation Thailand"
        description="Request a free quote for vessel relocation between Thailand's Gulf and Andaman coasts. Provide your vessel's length, beam, height and weight and we'll respond promptly."
        path="/contact"
      />

      {/* Hero */}
      <section
        className="relative text-white py-28 md:py-40 overflow-hidden"
        style={{
          backgroundImage: "url('/gallery/3.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
        }}
      >
        <div className="absolute inset-0" style={{
          background: "linear-gradient(135deg, rgba(6,30,54,0.92) 0%, rgba(10,37,64,0.78) 55%, rgba(0,140,140,0.28) 100%)"
        }} />
        {/* Bottom fade to page bg */}
        <div className="absolute bottom-0 left-0 right-0 h-32"
          style={{ background: "linear-gradient(to bottom, transparent, #f8fafb)" }} />
        <div className="relative z-10 container">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10" style={{ background: "rgba(0,200,200,0.8)" }} />
              <p className="font-mono-accent text-xs tracking-[0.3em] uppercase" style={{ color: "#00c8c8" }}>Get in Touch</p>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-5" style={{ textShadow: "0 2px 24px rgba(0,0,0,0.4)" }}>
              Contact Us
            </h1>
            <p className="text-xl max-w-2xl" style={{ color: "rgba(255,255,255,0.75)" }}>
              Ready to move your vessel? Get in touch with our team for a professional quote tailored to your needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 md:py-28" style={{ background: "#f8fafb" }}>
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">

            {/* ── Contact Info Column ── */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Info Card */}
              <div className="rounded-2xl p-8 bg-white shadow-sm border border-gray-100">
                <p className="font-mono-accent text-xs tracking-[0.3em] uppercase mb-2" style={{ color: "#00a8a8" }}>Reach Us</p>
                <h2 className="font-display text-2xl font-bold mb-7" style={{ color: "#061e36" }}>Contact Information</h2>

                <div className="space-y-5">
                  {[
                    {
                      icon: Phone,
                      title: "Phone",
                      content: <a href="tel:+66862697138" className="text-sm transition-colors hover:text-teal-600" style={{ color: "#4a5568" }}>+66 86 269 7138</a>,
                    },
                    {
                      icon: MessageCircle,
                      title: "WhatsApp",
                      content: <a href="https://wa.me/66862697138?text=Hi%2C%20I%27d%20like%20a%20quote%20for%20vessel%20transport" target="_blank" rel="noopener noreferrer" className="text-sm transition-colors hover:text-teal-600" style={{ color: "#4a5568" }}>+66 86 269 7138</a>,
                    },
                    {
                      icon: MessageCircle,
                      title: "LINE",
                      content: <p className="text-sm" style={{ color: "#4a5568" }}>ID: 0862697138</p>,
                    },
                    {
                      icon: Mail,
                      title: "Email",
                      content: <a href="mailto:brentmcinnes000@gmail.com" className="text-sm transition-colors hover:text-teal-600 break-all" style={{ color: "#4a5568" }}>brentmcinnes000@gmail.com</a>,
                    },
                    {
                      icon: MapPin,
                      title: "Operating Areas",
                      content: <p className="text-sm" style={{ color: "#4a5568" }}>Pattaya · Chumphon · Ranong · Phuket</p>,
                    },
                    {
                      icon: Clock,
                      title: "Hours",
                      content: <p className="text-sm" style={{ color: "#4a5568" }}>7 days a week: 8:00 AM – 7:00 PM</p>,
                    },
                    {
                      icon: Facebook,
                      title: "Facebook",
                      content: (
                        <a href="https://www.facebook.com/profile.php?id=61588477663667&sk=about" target="_blank" rel="noopener noreferrer" className="text-sm transition-colors hover:text-teal-600" style={{ color: "#4a5568" }}>
                          Follow us on Facebook
                        </a>
                      ),
                    },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div key={i} className="flex gap-4 items-start">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(0,168,168,0.1)" }}>
                          <Icon size={18} style={{ color: "#00a8a8" }} />
                        </div>
                        <div className="pt-1">
                          <p className="text-xs font-bold uppercase tracking-wider mb-0.5" style={{ color: "#061e36" }}>{item.title}</p>
                          {item.content}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* QR Codes Card */}
              <div className="rounded-2xl p-6 bg-white shadow-sm border border-gray-100">
                <p className="font-mono-accent text-xs tracking-[0.3em] uppercase mb-5 text-center" style={{ color: "#00a8a8" }}>Scan to Contact</p>
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href="https://wa.me/66862697138?text=Hi%2C%20I%27d%20like%20a%20quote%20for%20vessel%20transport"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all group"
                    style={{ borderColor: "#e2e8f0" }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = "#00a8a8")}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = "#e2e8f0")}
                  >
                    <img src="/qr-whatsapp.png" alt="WhatsApp QR" className="w-28 h-28 rounded-lg group-hover:scale-105 transition-transform duration-200" />
                    <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#061e36" }}>WhatsApp</span>
                  </a>
                  <div className="flex flex-col items-center gap-3 p-4 rounded-xl border-2" style={{ borderColor: "#e2e8f0" }}>
                    <img src="/qr-line.png" alt="LINE QR" className="w-28 h-28 rounded-lg" />
                    <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#061e36" }}>LINE</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── Quote Form Column ── */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-3"
            >
              <div className="rounded-2xl bg-white border border-gray-100 overflow-hidden"
                style={{ boxShadow: "0 12px 48px rgba(6,30,54,0.08), 0 2px 8px rgba(6,30,54,0.04)" }}>

                {/* Form header bar */}
                <div className="px-10 py-7 border-b border-gray-100" style={{ background: "linear-gradient(135deg, #061e36 0%, #0a3050 100%)" }}>
                  <p className="font-mono-accent text-xs tracking-[0.3em] uppercase mb-1" style={{ color: "#00c8c8" }}>How can we help?</p>
                  <h2 className="font-display text-3xl font-bold text-white">Request a Quote</h2>
                </div>

                <div className="px-10 py-8">
                  <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Name + Email row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#061e36" }}>
                          Full Name <span style={{ color: "#00a8a8" }}>*</span>
                        </label>
                        <Input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          className="w-full h-12 rounded-xl border-gray-200 focus:border-teal-500 bg-gray-50 focus:bg-white transition-colors"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#061e36" }}>
                          Email <span style={{ color: "#00a8a8" }}>*</span>
                        </label>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          className="w-full h-12 rounded-xl border-gray-200 focus:border-teal-500 bg-gray-50 focus:bg-white transition-colors"
                          required
                        />
                      </div>
                    </div>

                    {/* Phone + Vessel Type row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#061e36" }}>
                          Phone <span style={{ color: "#00a8a8" }}>*</span>
                        </label>
                        <Input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+66 (0) XXX-XXXX"
                          className="w-full h-12 rounded-xl border-gray-200 focus:border-teal-500 bg-gray-50 focus:bg-white transition-colors"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#061e36" }}>
                          Vessel Type
                        </label>
                        <select
                          name="vesselType"
                          value={formData.vesselType}
                          onChange={handleChange}
                          className="w-full h-12 rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm focus:outline-none focus:border-teal-500 focus:bg-white transition-colors"
                          style={{ color: formData.vesselType ? "#1a202c" : "#9ca3af" }}
                        >
                          <option value="">Select vessel type...</option>
                          <option value="Powerboat">Powerboat</option>
                          <option value="Keel Yacht">Keel Yacht</option>
                          <option value="Catamaran">Catamaran</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    {/* Vessel Dimensions */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#061e36" }}>
                        Vessel Dimensions
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
                            className="h-12 rounded-xl border-gray-200 focus:border-teal-500 bg-gray-50 focus:bg-white text-sm transition-colors"
                          />
                        ))}
                      </div>
                      <p className="text-xs mt-2" style={{ color: "#9ca3af" }}>
                        Max capacity: 15m L · 5.5m W · 5.5m H · 32 Tons
                      </p>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#061e36" }}>
                        Message
                      </label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your transport needs, preferred timeline, and any other details..."
                        className="w-full h-32 rounded-xl border-gray-200 focus:border-teal-500 bg-gray-50 focus:bg-white resize-none transition-colors"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full text-white py-4 h-14 text-sm font-bold tracking-widest uppercase rounded-xl shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                      style={{ background: "linear-gradient(135deg, #061e36 0%, #0a8a8a 100%)" }}
                    >
                      Send Enquiry →
                    </Button>

                    <p className="text-xs text-center" style={{ color: "#9ca3af" }}>
                      We typically respond within 24 hours. For urgent enquiries, please call or WhatsApp directly.
                    </p>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
