import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MessageCircle, MapPin, Clock, Facebook } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";

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

      {/* Hero */}
      <section className="bg-primary text-white py-20 md:py-28">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-mono-accent text-xs tracking-[0.3em] uppercase text-secondary mb-4">Get in Touch</p>
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl opacity-80 max-w-3xl">
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
                  content: <a href="https://wa.me/66862697138" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-secondary transition-colors">+66 86 269 7138</a>,
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
                  content: (
                    <div className="text-foreground/70 space-y-0.5">
                      <p>Monday – Friday: 8:00 AM – 6:00 PM</p>
                      <p>Saturday: 9:00 AM – 4:00 PM</p>
                      <p>Sunday: By appointment</p>
                    </div>
                  ),
                },
                {
                  icon: Facebook,
                  title: "Social Media",
                  content: (
                    <a
                      href="https://www.facebook.com/profile.php?id=61588477663667&sk=about"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/70 hover:text-secondary transition-colors"
                    >
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
