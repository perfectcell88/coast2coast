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
    <div className="min-h-screen" style={{ background: "#f0f2f5" }}>
      <SEO
        title="Contact Us | Coast to Coast Marine Transportation Thailand"
        description="Request a free quote for vessel relocation between Thailand's Gulf and Andaman coasts."
        path="/contact"
      />

      {/* ── HERO ── */}
      <section className="relative text-white overflow-hidden" style={{ minHeight: "400px", display: "flex", alignItems: "flex-end" }}>
        <div className="absolute inset-0" style={{ backgroundImage: "url('/gallery/3.webp')", backgroundSize: "cover", backgroundPosition: "center 35%" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(4,24,40,0.35) 0%, rgba(4,24,40,0.6) 50%, rgba(4,24,40,0.98) 100%)" }} />
        {/* Teal accent line at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: "linear-gradient(90deg, transparent, #0e7490, transparent)" }} />
        <div className="relative z-10 container pb-12 pt-36">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: "#00c8c8" }} />
              <p className="font-mono-accent text-xs tracking-[0.35em] uppercase" style={{ color: "#00c8c8" }}>Get in Touch</p>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">Contact Us</h1>
            <p className="text-base max-w-xl" style={{ color: "rgba(255,255,255,0.6)" }}>
              Ready to move your vessel? Tell us about your boat and we'll get back to you promptly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="pb-16 pt-8">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

            {/* ── LEFT COLUMN ── */}
            <motion.div className="lg:col-span-2 space-y-6"
              initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>

              {/* ── QR CODES — HERO ELEMENT ── */}
              <div className="rounded-2xl overflow-hidden" style={{ background: "#fff", boxShadow: "0 4px 28px rgba(4,24,40,0.10)", border: "1px solid rgba(0,0,0,0.06)" }}>
                <div className="px-7 py-5" style={{ background: "linear-gradient(135deg, #041828 0%, #083248 100%)" }}>
                  <p className="font-mono-accent text-xs tracking-[0.3em] uppercase mb-1" style={{ color: "#00c8c8" }}>Instant Message</p>
                  <h2 className="font-display text-xl font-bold text-white">Scan to Contact Us</h2>
                  <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>Open WhatsApp or LINE directly on your phone</p>
                </div>
                <div className="p-6 flex flex-col gap-5">
                  {/* WhatsApp QR — full width, large */}
                  <a
                    href="https://wa.me/66862697138?text=Hi%2C%20I%27d%20like%20a%20quote%20for%20vessel%20transport"
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-6 p-5 rounded-2xl transition-all duration-200 group"
                    style={{ border: "2px solid #e5e7eb", background: "#fafafa" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#25d366"; (e.currentTarget as HTMLElement).style.background = "#f0fff4"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#e5e7eb"; (e.currentTarget as HTMLElement).style.background = "#fafafa"; }}
                  >
                    <div className="flex-shrink-0" style={{ width: "110px", height: "110px" }}>
                      <img src="/qr-whatsapp.png" alt="WhatsApp QR Code"
                        className="w-full h-full rounded-xl object-contain group-hover:scale-[1.02] transition-transform duration-200"
                        style={{ display: "block" }} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-3.5 h-3.5 rounded-full" style={{ background: "#25d366" }} />
                        <p className="text-base font-bold" style={{ color: "#1a2535" }}>WhatsApp</p>
                      </div>
                      <p className="text-sm mb-3" style={{ color: "#6b7280" }}>Scan to open chat instantly</p>
                      <p className="text-xs font-medium" style={{ color: "#0a8a8a" }}>+66 86 269 7138</p>
                    </div>
                  </a>

                  {/* LINE QR — full width, large */}
                  <div
                    className="flex items-center gap-6 p-5 rounded-2xl"
                    style={{ border: "2px solid #e5e7eb", background: "#fafafa" }}
                  >
                    <div className="flex-shrink-0" style={{ width: "110px", height: "110px" }}>
                      <img src="/qr-line.png" alt="LINE QR Code"
                        className="w-full h-full rounded-xl object-contain"
                        style={{ display: "block" }} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-3.5 h-3.5 rounded-full" style={{ background: "#06c755" }} />
                        <p className="text-base font-bold" style={{ color: "#1a2535" }}>LINE</p>
                      </div>
                      <p className="text-sm mb-3" style={{ color: "#6b7280" }}>Scan to message on LINE</p>
                      <p className="text-xs font-medium" style={{ color: "#0a8a8a" }}>ID: 0862697138</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── CONTACT DETAILS ── */}
              <div className="rounded-2xl overflow-hidden" style={{ background: "#fff", boxShadow: "0 4px 28px rgba(4,24,40,0.10)", border: "1px solid rgba(0,0,0,0.06)" }}>
                <div className="px-7 py-5" style={{ background: "linear-gradient(135deg, #041828 0%, #083248 100%)" }}>
                  <p className="font-mono-accent text-xs tracking-[0.3em] uppercase mb-1" style={{ color: "#00c8c8" }}>Reach Us Directly</p>
                  <h2 className="font-display text-xl font-bold text-white">Contact Information</h2>
                </div>
                <div className="divide-y" style={{ borderColor: "rgba(0,0,0,0.05)" }}>
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
                      <div className="flex items-center gap-4 px-7 py-4 transition-colors hover:bg-gray-50">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${item.accent}18` }}>
                          <Icon size={16} style={{ color: item.accent }} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#9ca3af" }}>{item.label}</p>
                          <p className="text-sm font-medium truncate" style={{ color: "#1a2535" }}>{item.value}</p>
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
            <motion.div className="lg:col-span-3"
              initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
              <div className="rounded-2xl overflow-hidden" style={{ background: "#fff", boxShadow: "0 4px 28px rgba(4,24,40,0.10)", border: "1px solid rgba(0,0,0,0.06)" }}>

                {/* Form header */}
                <div className="px-8 py-6" style={{ background: "linear-gradient(135deg, #041828 0%, #083248 100%)", borderBottom: "3px solid #0a8a8a" }}>
                  <p className="font-mono-accent text-xs tracking-[0.3em] uppercase mb-2" style={{ color: "#00c8c8" }}>Free Quote</p>
                  <h2 className="font-display text-2xl font-bold text-white mb-1">Request a Quote</h2>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>Fill in your vessel details and we'll respond within 24 hours.</p>
                </div>

                <form onSubmit={handleSubmit} className="px-8 py-8 space-y-6">

                  {/* Section: Your Details */}
                  <div>
                    <p className="font-mono-accent text-[10px] tracking-[0.3em] uppercase mb-5 pb-2" style={{ color: "#0a8a8a", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
                      Your Details
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className={labelClass} style={{ color: "#374151" }}>
                          Full Name <span style={{ color: "#0a8a8a" }}>*</span>
                        </label>
                        <Input type="text" name="name" value={formData.name} onChange={handleChange}
                          placeholder="Your full name" required className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass} style={{ color: "#374151" }}>
                          Email Address <span style={{ color: "#0a8a8a" }}>*</span>
                        </label>
                        <Input type="email" name="email" value={formData.email} onChange={handleChange}
                          placeholder="your@email.com" required className={inputClass} />
                      </div>
                      <div className="sm:col-span-2">
                        <label className={labelClass} style={{ color: "#374151" }}>
                          Phone / WhatsApp <span style={{ color: "#0a8a8a" }}>*</span>
                        </label>
                        <Input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                          placeholder="+66 (0) XXX-XXXX" required className={inputClass} />
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
                        <label className={labelClass} style={{ color: "#374151" }}>Vessel Type</label>
                        <select name="vesselType" value={formData.vesselType} onChange={handleChange}
                          className="w-full h-12 rounded-xl px-4 text-sm border border-gray-200 bg-gray-50 focus:outline-none focus:border-teal-500 focus:bg-white transition-colors"
                          style={{ color: formData.vesselType ? "#111827" : "#9ca3af" }}>
                          <option value="" disabled>Select vessel type…</option>
                          <option value="Powerboat">Powerboat</option>
                          <option value="Keel Yacht">Keel Yacht</option>
                          <option value="Catamaran">Catamaran</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelClass} style={{ color: "#374151" }}>Vessel Dimensions</label>
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
                              className={inputClass} />
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
                      className="rounded-xl text-sm border-gray-200 bg-gray-50 focus:bg-white focus:border-teal-500 resize-none transition-colors placeholder:text-gray-400"
                      style={{ minHeight: "140px" }} />
                  </div>

                  {/* Submit */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-5">
                    <button type="submit"
                      className="w-full sm:w-auto flex-shrink-0 text-white font-bold text-xs tracking-[0.15em] uppercase py-4 px-12 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
                      style={{ background: "linear-gradient(135deg, #041828 0%, #0a6a6a 100%)", boxShadow: "0 4px 20px rgba(4,24,40,0.28)" }}>
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
