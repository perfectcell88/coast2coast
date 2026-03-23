import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock, Facebook, MessageCircle } from "lucide-react";
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

  const inputClass = "h-12 rounded-xl text-sm border-gray-200 bg-gray-50 focus:bg-white focus:border-teal-500 transition-colors placeholder:text-gray-400";
  const labelClass = "block text-[11px] font-bold uppercase tracking-[0.12em] mb-2";

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(160deg, #2c3e50 0%, #071e30 40%, #2c3e50 100%)" }}>
      <SEO
        title="Contact Us | Coast to Coast Marine Transportation Thailand"
        description="Request a free quote for vessel relocation between Thailand's Gulf and Andaman coasts."
        path="/contact"
      />

      {/* ── HERO ── */}
      <section className="relative text-white overflow-hidden" style={{ height: "420px", display: "flex", alignItems: "flex-end" }}>
        <div className="absolute inset-0" style={{ backgroundImage: "url('/gallery/8.webp')", backgroundSize: "cover", backgroundPosition: "center 40%" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(44,62,80,0.1) 0%, rgba(44,62,80,0.35) 60%, rgba(44,62,80,0.85) 100%)" }} />
        {/* Teal accent line at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: "linear-gradient(90deg, transparent, #0e7490, transparent)" }} />
        <div className="relative z-10 container pb-16 pt-44">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center gap-3 mb-4">
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

      {/* ── MAIN CONTENT ── */}
      <section className="pb-24 pt-10">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch" style={{ position: "relative" }}>

            {/* ── LEFT COLUMN ── */}
            <motion.div className="lg:col-span-2 flex flex-col gap-6"
              initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>

              {/* ── QR CODES — HERO ELEMENT ── */}
              <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", boxShadow: "0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)", border: "1px solid rgba(0,200,200,0.15)" }}>
                <div className="px-7 py-5" style={{ background: "linear-gradient(135deg, #2c3e50 0%, #083248 100%)" }}>
                  <p className="font-mono-accent text-xs tracking-[0.3em] uppercase mb-1" style={{ color: "#00c8c8" }}>Instant Message</p>
                  <h2 className="font-display text-xl font-bold text-white">Scan to Contact Us</h2>
                  <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>Open WhatsApp or LINE directly on your phone</p>
                </div>
                <div className="p-6 grid grid-cols-2 gap-4">
                  {/* WhatsApp QR */}
                  <a
                    href="https://wa.me/66862697138?text=Hi%2C%20I%27d%20like%20a%20quote%20for%20vessel%20transport"
                    target="_blank" rel="noopener noreferrer"
                    className="flex flex-col items-center gap-4 p-5 rounded-2xl transition-all duration-200 group"
                    style={{ border: "1px solid rgba(37,211,102,0.25)", background: "rgba(255,255,255,0.06)" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#25d366"; (e.currentTarget as HTMLElement).style.background = "rgba(37,211,102,0.1)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(37,211,102,0.25)"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"; }}
                  >
                    <div className="w-full" style={{ maxWidth: "180px", margin: "0 auto" }}>
                      <img src="/qr-whatsapp.png" alt="WhatsApp QR Code"
                        className="w-full aspect-square rounded-xl object-contain group-hover:scale-[1.03] transition-transform duration-200"
                        style={{ display: "block" }} />
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1.5 mb-0.5">
                        <div className="w-3 h-3 rounded-full" style={{ background: "#25d366" }} />
                        <p className="text-sm font-bold" style={{ color: "rgba(255,255,255,0.9)" }}>WhatsApp</p>
                      </div>
                      <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>Tap to open chat</p>
                    </div>
                  </a>

                  {/* LINE QR */}
                  <div
                    className="flex flex-col items-center gap-4 p-5 rounded-2xl"
                    style={{ border: "1px solid rgba(6,199,85,0.25)", background: "rgba(255,255,255,0.06)" }}
                  >
                    <div className="w-full" style={{ maxWidth: "180px", margin: "0 auto" }}>
                      <img src="/qr-line.png" alt="LINE QR Code"
                        className="w-full aspect-square rounded-xl object-contain"
                        style={{ display: "block" }} />
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1.5 mb-0.5">
                        <div className="w-3 h-3 rounded-full" style={{ background: "#06c755" }} />
                        <p className="text-sm font-bold" style={{ color: "rgba(255,255,255,0.9)" }}>LINE</p>
                      </div>
                      <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>ID: 0862697138</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── CONTACT DETAILS ── */}
              <div className="rounded-2xl overflow-hidden flex-1" style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", boxShadow: "0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)", border: "1px solid rgba(0,200,200,0.15)" }}>
                <div className="px-7 py-5" style={{ background: "linear-gradient(135deg, #2c3e50 0%, #083248 100%)" }}>
                  <p className="font-mono-accent text-xs tracking-[0.3em] uppercase mb-1" style={{ color: "#00c8c8" }}>Reach Us Directly</p>
                  <h2 className="font-display text-xl font-bold text-white">Contact Information</h2>
                </div>
                <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                  {[
                    { icon: Phone, label: "Phone", value: "+66 86 269 7138", href: "tel:+66862697138", accent: "#0a8a8a" },
                    { icon: MessageCircle, label: "WhatsApp", value: "+66 86 269 7138", href: "https://wa.me/66862697138?text=Hi%2C%20I%27d%20like%20a%20quote%20for%20vessel%20transport", accent: "#25d366" },
                    { icon: MessageCircle, label: "LINE", value: "ID: 0862697138", href: undefined, accent: "#06c755" },
                    { icon: Mail, label: "Email", value: "brentmcinnes000@gmail.com", href: "mailto:brentmcinnes000@gmail.com", accent: "#0a8a8a" },
                    { icon: MapPin, label: "Operating Areas", value: "Pattaya · Chumphon · Ranong · Phuket", href: undefined, accent: "#0a8a8a" },
                    { icon: Clock, label: "Hours", value: "7 days a week, 8 AM – 7 PM", href: undefined, accent: "#0a8a8a" },
                    { icon: Facebook, label: "Facebook", value: "Follow us on Facebook", href: "https://www.facebook.com/profile.php?id=61588477663667", accent: "#1877f2" },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    const row = (
                        <div className="flex items-center gap-4 px-7 py-4 transition-colors hover:bg-white/5">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${item.accent}18` }}>
                          <Icon size={16} style={{ color: item.accent }} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "rgba(0,200,200,0.7)" }}>{item.label}</p>
                          <p className="text-sm font-medium truncate" style={{ color: "rgba(255,255,255,0.88)" }}>{item.value}</p>
                        </div>
                      </div>
                    );
                    return (
                      <div key={i}>
                        {item.href ? (
                          <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="block">{row}</a>
                        ) : row}
                      </div>
                    );
                  })}
                </div>
              </div>

            </motion.div>

            {/* ── RIGHT: QUOTE FORM ── */}
            <motion.div className="lg:col-span-3 flex flex-col"
              initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
              <div className="rounded-2xl overflow-hidden flex-1" style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", boxShadow: "0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)", border: "1px solid rgba(0,200,200,0.15)" }}>

                {/* Form header */}
                <div className="px-10 py-8" style={{ background: "linear-gradient(135deg, #2c3e50 0%, #083248 100%)", borderBottom: "3px solid #0a8a8a" }}>
                  <p className="font-mono-accent text-xs tracking-[0.3em] uppercase mb-2" style={{ color: "#00c8c8" }}>Free Quote</p>
                  <h2 className="font-display text-3xl font-bold text-white mb-1">Request a Quote</h2>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>Fill in your vessel details and we'll respond within 24 hours.</p>
                </div>

                <form onSubmit={handleSubmit} className="px-10 py-10 space-y-7" style={{ color: "rgba(255,255,255,0.9)" }}>

                  {/* Section: Your Details */}
                  <div>
                    <p className="font-mono-accent text-[10px] tracking-[0.3em] uppercase mb-5 pb-2" style={{ color: "#0a8a8a", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
                      Your Details
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className={labelClass} style={{ color: "rgba(255,255,255,0.7)" }}>
                          Full Name <span style={{ color: "#00c8c8" }}>*</span>
                        </label>
                        <Input type="text" name="name" value={formData.name} onChange={handleChange}
                          placeholder="Your full name" required className={inputClass} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "white" } as React.CSSProperties} />
                      </div>
                      <div>
                        <label className={labelClass} style={{ color: "rgba(255,255,255,0.7)" }}>
                          Email Address <span style={{ color: "#00c8c8" }}>*</span>
                        </label>
                        <Input type="email" name="email" value={formData.email} onChange={handleChange}
                          placeholder="your@email.com" required className={inputClass} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "white" } as React.CSSProperties} />
                      </div>
                      <div className="sm:col-span-2">
                        <label className={labelClass} style={{ color: "rgba(255,255,255,0.7)" }}>
                          Phone / WhatsApp <span style={{ color: "#00c8c8" }}>*</span>
                        </label>
                        <Input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                          placeholder="+66 (0) XXX-XXXX" required className={inputClass} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "white" } as React.CSSProperties} />
                      </div>
                    </div>
                  </div>

                  {/* Section: Vessel Details */}
                  <div>
                    <p className="font-mono-accent text-[10px] tracking-[0.3em] uppercase mb-5 pb-2" style={{ color: "#0a8a8a", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
                      Vessel Details
                    </p>
                    <div className="space-y-5">
                      <div>
                        <label className={labelClass} style={{ color: "rgba(255,255,255,0.7)" }}>Vessel Type</label>
                        <select name="vesselType" value={formData.vesselType} onChange={handleChange}
                          className="w-full h-12 rounded-xl px-4 text-sm focus:outline-none focus:border-teal-400 transition-colors dark-select"
                          style={{ background: "#2c3e50", border: "1px solid rgba(0,200,200,0.3)", color: formData.vesselType ? "white" : "rgba(255,255,255,0.55)" }}>
                          <option value="" disabled style={{ background: "#2c3e50", color: "rgba(255,255,255,0.55)" }}>Select vessel type…</option>
                          <option value="Powerboat" style={{ background: "#2c3e50", color: "white" }}>Powerboat</option>
                          <option value="Keel Yacht" style={{ background: "#2c3e50", color: "white" }}>Keel Yacht</option>
                          <option value="Catamaran" style={{ background: "#2c3e50", color: "white" }}>Catamaran</option>
                          <option value="Other" style={{ background: "#2c3e50", color: "white" }}>Other</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelClass} style={{ color: "rgba(255,255,255,0.7)" }}>Vessel Dimensions</label>
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
                              className={inputClass} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "white" } as React.CSSProperties} />
                          ))}
                        </div>
                        <p className="text-xs mt-2.5 flex items-center gap-1.5" style={{ color: "#9ca3af" }}>
                          <span style={{ color: "#0a8a8a", fontWeight: 600 }}>Max capacity:</span>
                          15 m L · 5.5 m W · 5.5 m H · 32 T
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Section: Message */}
                  <div>
                    <p className="font-mono-accent text-[10px] tracking-[0.3em] uppercase mb-5 pb-2" style={{ color: "#0a8a8a", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
                      Additional Information
                    </p>
                      <Textarea name="message" value={formData.message} onChange={handleChange}
                      placeholder="Tell us about your transport needs, preferred timeline, departure and destination ports, and any other details…"
                      className="rounded-xl text-sm resize-none transition-colors"
                      style={{ minHeight: "140px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "white" }} />
                  </div>

                  {/* Submit */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-5">
                    <button type="submit"
                      className="w-full sm:w-auto flex-shrink-0 text-white font-bold text-xs tracking-[0.15em] uppercase py-4 px-12 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
                      style={{ background: "linear-gradient(135deg, #2c3e50 0%, #0a6a6a 100%)", boxShadow: "0 4px 20px rgba(44,62,80,0.28)" }}>
                      Send Enquiry →
                    </button>
                    <p className="text-xs leading-relaxed text-center sm:text-left" style={{ color: "#9ca3af" }}>
                      We respond within 24 hours.<br />
                      For urgent requests, call or WhatsApp directly.
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
