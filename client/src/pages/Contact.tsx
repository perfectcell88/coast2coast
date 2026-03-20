import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock, Facebook } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", vesselType: "",
    vesselLength: "", vesselBeam: "", vesselHeight: "", vesselWeight: "", message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        toast.success("Thank you — we'll be in touch shortly.");
        setFormData({ name: "", email: "", phone: "", vesselType: "", vesselLength: "", vesselBeam: "", vesselHeight: "", vesselWeight: "", message: "" });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Submission failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "#f0f2f5" }}>
      <SEO
        title="Contact Us | Coast to Coast Marine Transportation Thailand"
        description="Request a free quote for vessel relocation between Thailand's Gulf and Andaman coasts."
        path="/contact"
      />

      {/* ── HERO ── */}
      <section className="relative text-white overflow-hidden" style={{ minHeight: "400px", display: "flex", alignItems: "flex-end" }}>
        <div className="absolute inset-0" style={{ backgroundImage: "url('/gallery/3.webp')", backgroundSize: "cover", backgroundPosition: "center 35%" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(4,24,40,0.45) 0%, rgba(4,24,40,0.7) 55%, rgba(4,24,40,0.98) 100%)" }} />
        <div className="relative z-10 container pb-14 pt-36">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8" style={{ background: "#00c8c8" }} />
              <p className="font-mono-accent text-xs tracking-[0.35em] uppercase" style={{ color: "#00c8c8" }}>Get in Touch</p>
            </div>
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-3">Contact Us</h1>
            <p className="text-lg max-w-xl" style={{ color: "rgba(255,255,255,0.6)" }}>
              Ready to move your vessel? Tell us about your boat and we'll get back to you promptly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── MAIN GRID ── */}
      <section className="pb-24 pt-10">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-7 items-start">

            {/* ── LEFT SIDEBAR ── */}
            <motion.div className="lg:col-span-2 space-y-5"
              initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>

              {/* Contact Details Card */}
              <div className="rounded-2xl overflow-hidden" style={{ background: "#fff", boxShadow: "0 4px 24px rgba(4,24,40,0.09)", border: "1px solid rgba(0,0,0,0.06)" }}>
                <div className="px-7 py-6" style={{ background: "linear-gradient(135deg, #041828 0%, #083248 100%)" }}>
                  <p className="font-mono-accent text-xs tracking-[0.3em] uppercase mb-1" style={{ color: "#00c8c8" }}>Reach Us Directly</p>
                  <h2 className="font-display text-xl font-bold text-white">Contact Information</h2>
                </div>
                <div>
                  {[
                    { icon: Phone, label: "Phone", value: "+66 86 269 7138", href: "tel:+66862697138" },
                    { icon: Phone, label: "WhatsApp", value: "+66 86 269 7138", href: "https://wa.me/66862697138?text=Hi%2C%20I%27d%20like%20a%20quote%20for%20vessel%20transport" },
                    { icon: Phone, label: "LINE", value: "ID: 0862697138", href: undefined },
                    { icon: Mail, label: "Email", value: "brentmcinnes000@gmail.com", href: "mailto:brentmcinnes000@gmail.com" },
                    { icon: MapPin, label: "Operating Areas", value: "Pattaya · Chumphon · Ranong · Phuket", href: undefined },
                    { icon: Clock, label: "Hours", value: "7 days a week, 8 AM – 7 PM", href: undefined },
                    { icon: Facebook, label: "Facebook", value: "Follow us on Facebook", href: "https://www.facebook.com/profile.php?id=61588477663667" },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    const row = (
                      <div className="flex items-center gap-4 px-7 py-3.5 transition-colors hover:bg-gray-50">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(0,138,138,0.1)" }}>
                          <Icon size={15} style={{ color: "#0a8a8a" }} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#9ca3af" }}>{item.label}</p>
                          <p className="text-sm font-medium" style={{ color: "#1a2535" }}>{item.value}</p>
                        </div>
                      </div>
                    );
                    return (
                      <div key={i} style={{ borderTop: i === 0 ? "none" : "1px solid rgba(0,0,0,0.05)" }}>
                        {item.href ? (
                          <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="block">{row}</a>
                        ) : row}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* QR Codes Card */}
              <div className="rounded-2xl overflow-hidden" style={{ background: "#fff", boxShadow: "0 4px 24px rgba(4,24,40,0.09)", border: "1px solid rgba(0,0,0,0.06)" }}>
                <div className="px-7 py-5 border-b" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                  <p className="font-mono-accent text-xs tracking-[0.3em] uppercase" style={{ color: "#0a8a8a" }}>Scan to Message Us</p>
                </div>
                <div className="p-6 grid grid-cols-2 gap-5">
                  <a
                    href="https://wa.me/66862697138?text=Hi%2C%20I%27d%20like%20a%20quote%20for%20vessel%20transport"
                    target="_blank" rel="noopener noreferrer"
                    className="flex flex-col items-center gap-3 p-5 rounded-xl transition-all duration-200 group"
                    style={{ border: "1.5px solid #e5e7eb", background: "#fafafa" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#0a8a8a"; (e.currentTarget as HTMLElement).style.background = "#f0fafa"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#e5e7eb"; (e.currentTarget as HTMLElement).style.background = "#fafafa"; }}
                  >
                    <img src="/qr-whatsapp.png" alt="WhatsApp QR Code" className="w-full aspect-square rounded-lg object-contain group-hover:scale-105 transition-transform duration-200" style={{ maxWidth: "160px" }} />
                    <div className="text-center">
                      <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "#1a2535" }}>WhatsApp</p>
                      <p className="text-xs mt-0.5" style={{ color: "#9ca3af" }}>Tap to open chat</p>
                    </div>
                  </a>
                  <div className="flex flex-col items-center gap-3 p-5 rounded-xl" style={{ border: "1.5px solid #e5e7eb", background: "#fafafa" }}>
                    <img src="/qr-line.png" alt="LINE QR Code" className="w-full aspect-square rounded-lg object-contain" style={{ maxWidth: "160px" }} />
                    <div className="text-center">
                      <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "#1a2535" }}>LINE</p>
                      <p className="text-xs mt-0.5" style={{ color: "#9ca3af" }}>ID: 0862697138</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── RIGHT: QUOTE FORM ── */}
            <motion.div className="lg:col-span-3"
              initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
              <div className="rounded-2xl overflow-hidden" style={{ background: "#fff", boxShadow: "0 4px 24px rgba(4,24,40,0.09)", border: "1px solid rgba(0,0,0,0.06)" }}>

                {/* Form header */}
                <div className="px-10 py-8" style={{ background: "linear-gradient(135deg, #041828 0%, #083248 100%)", borderBottom: "3px solid #0a8a8a" }}>
                  <p className="font-mono-accent text-xs tracking-[0.3em] uppercase mb-1" style={{ color: "#00c8c8" }}>Free Quote</p>
                  <h2 className="font-display text-3xl font-bold text-white mb-1">Request a Quote</h2>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>Fill in your vessel details and we'll respond within 24 hours.</p>
                </div>

                <form onSubmit={handleSubmit} className="px-10 py-9 space-y-6">

                  {/* Row 1: Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#374151" }}>
                        Full Name <span style={{ color: "#0a8a8a" }}>*</span>
                      </label>
                      <Input type="text" name="name" value={formData.name} onChange={handleChange}
                        placeholder="Your full name" required
                        className="h-11 rounded-lg text-sm border-gray-200 bg-gray-50 focus:bg-white focus:border-teal-500 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#374151" }}>
                        Email <span style={{ color: "#0a8a8a" }}>*</span>
                      </label>
                      <Input type="email" name="email" value={formData.email} onChange={handleChange}
                        placeholder="your@email.com" required
                        className="h-11 rounded-lg text-sm border-gray-200 bg-gray-50 focus:bg-white focus:border-teal-500 transition-colors" />
                    </div>
                  </div>

                  {/* Row 2: Phone + Vessel Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#374151" }}>
                        Phone / WhatsApp <span style={{ color: "#0a8a8a" }}>*</span>
                      </label>
                      <Input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                        placeholder="+66 (0) XXX-XXXX" required
                        className="h-11 rounded-lg text-sm border-gray-200 bg-gray-50 focus:bg-white focus:border-teal-500 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#374151" }}>
                        Vessel Type
                      </label>
                      <select name="vesselType" value={formData.vesselType} onChange={handleChange}
                        className="w-full h-11 rounded-lg px-3 text-sm border border-gray-200 bg-gray-50 focus:outline-none focus:border-teal-500 focus:bg-white transition-colors"
                        style={{ color: formData.vesselType ? "#111827" : "#9ca3af" }}>
                        <option value="">Select vessel type…</option>
                        <option value="Powerboat">Powerboat</option>
                        <option value="Keel Yacht">Keel Yacht</option>
                        <option value="Catamaran">Catamaran</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Vessel Dimensions */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#374151" }}>
                      Vessel Dimensions
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { name: "vesselLength", placeholder: "Length (m)" },
                        { name: "vesselBeam",   placeholder: "Beam (m)"   },
                        { name: "vesselHeight", placeholder: "Height (m)" },
                        { name: "vesselWeight", placeholder: "Weight (T)" },
                      ].map((field) => (
                        <Input key={field.name} type="text" name={field.name}
                          value={formData[field.name as keyof typeof formData]}
                          onChange={handleChange} placeholder={field.placeholder}
                          className="h-11 rounded-lg text-sm border-gray-200 bg-gray-50 focus:bg-white focus:border-teal-500 transition-colors" />
                      ))}
                    </div>
                    <p className="text-xs mt-2" style={{ color: "#9ca3af" }}>Max capacity: 15 m L · 5.5 m W · 5.5 m H · 32 T</p>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#374151" }}>
                      Message
                    </label>
                    <Textarea name="message" value={formData.message} onChange={handleChange}
                      placeholder="Tell us about your transport needs, preferred timeline, departure and destination ports, and any other details…"
                      className="rounded-lg text-sm border-gray-200 bg-gray-50 focus:bg-white focus:border-teal-500 resize-none transition-colors"
                      style={{ minHeight: "120px" }} />
                  </div>

                  {/* Divider */}
                  <div className="h-px" style={{ background: "rgba(0,0,0,0.07)" }} />

                  {/* Submit row */}
                  <div className="flex flex-col sm:flex-row items-center gap-5">
                    <button type="submit"
                      className="w-full sm:w-auto flex-shrink-0 text-white font-bold text-xs tracking-[0.15em] uppercase py-4 px-10 rounded-xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
                      style={{ background: "linear-gradient(135deg, #041828 0%, #0a6a6a 100%)", boxShadow: "0 4px 20px rgba(4,24,40,0.28)", letterSpacing: "0.12em" }}>
                      Send Enquiry →
                    </button>
                    <p className="text-xs leading-relaxed" style={{ color: "#9ca3af" }}>
                      We respond within 24 hours. For urgent requests, please call or WhatsApp directly.
                    </p>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
