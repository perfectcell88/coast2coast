import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MessageCircle, MapPin, Clock, Facebook } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    vesselName: "",
    vesselSize: "",
    fromLocation: "",
    toLocation: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields");
      return;
    }
    toast.success("Thank you for your inquiry! We will contact you shortly.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      vesselName: "",
      vesselSize: "",
      fromLocation: "",
      toLocation: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen">
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="container">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl opacity-90 max-w-3xl">Get in touch with our team to discuss your boat transport needs</p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <h2 className="font-display text-2xl font-bold text-primary mb-8">Get in Touch</h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="text-secondary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-primary mb-1">Phone</h3>
                    <a href="tel:++66862697138" className="text-foreground/70 hover:text-secondary transition-colors">
                      +66 86 269 7138
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="text-secondary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-primary mb-1">Email</h3>
                    <a href="mailto:brentmcinnes000@gmail.com" className="text-foreground/70 hover:text-secondary transition-colors">
                      brentmcinnes000@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="text-secondary" size={24} />
                  </div>
                <h3 className="font-display font-bold text-primary mb-1">WhatsApp</h3>
<a
  href="https://wa.me/66862697138"
  target="_blank"
  rel="noopener noreferrer"
  className="text-foreground/70 hover:text-secondary transition-colors"
>
  Message us on WhatsApp
</a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="text-secondary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-primary mb-1">Hours</h3>
                    <p className="text-foreground/70">Monday - Friday: 8:00 AM - 6:00 PM</p>
                    <p className="text-foreground/70">Saturday: 9:00 AM - 4:00 PM</p>
                    <p className="text-foreground/70">Sunday: By appointment</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Facebook className="text-secondary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-primary mb-1">Social Media</h3>
                    <a
                      href="https://www.facebook.com/profile.php?id=61588477663667&sk=about"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/70 hover:text-secondary transition-colors"
                    >
                      Follow us on Facebook
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 rounded-lg shadow-md border border-border">
                <h2 className="font-display text-2xl font-bold text-primary mb-6">Request a Quote</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Name *</label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="w-full"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="w-full"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Phone *</label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+66 (0) XXX-XXXX"
                        className="w-full"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Vessel Name</label>
                      <Input
                        type="text"
                        name="vesselName"
                        value={formData.vesselName}
                        onChange={handleChange}
                        placeholder="Name of your boat"
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Vessel Size (meters)</label>
                      <Input
                        type="text"
                        name="vesselSize"
                        value={formData.vesselSize}
                        onChange={handleChange}
                        placeholder="e.g., 45m"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">From Location</label>
                      <select
                        name="fromLocation"
                        value={formData.fromLocation}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-border rounded-md bg-white text-foreground"
                      >
                        <option value="">Select departure port</option>
                        <option value="Pattaya">Pattaya</option>
                        <option value="Chumphon">Chumphon</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">To Location</label>
                    <select
                      name="toLocation"
                      value={formData.toLocation}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-border rounded-md bg-white text-foreground"
                    >
                      <option value="">Select destination port</option>
                      <option value="Phuket">Phuket</option>
                      <option value="Ranong">Ranong</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your transport needs..."
                      className="w-full h-32"
                    />
                  </div>

                  <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90 text-white py-3 font-semibold">
                    Send Quote Request
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-primary/5">
        <div className="container">
          <div className="bg-white p-8 rounded-lg shadow-md border border-border">
            <h2 className="font-display text-2xl font-bold text-primary mb-4">Quick Response Guarantee</h2>
            <p className="text-foreground/70 leading-relaxed">
              We understand that time is important when planning your boat transport. That's why we commit to responding to all inquiries within 24 hours. Whether you contact us by phone, email, WhatsApp, or through our online form, our team will get back to you promptly with a professional quote and detailed information about your transport options.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
