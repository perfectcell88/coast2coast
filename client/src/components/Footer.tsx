import { Link } from "wouter";
import { Anchor, Phone, Mail, MessageCircle, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="container py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                <Anchor className="text-white" size={20} />
              </div>
              <div>
                <p className="font-display font-bold text-base leading-tight">Coast to Coast</p>
                <p className="text-xs opacity-60 leading-tight">Marine Transportation Thailand</p>
              </div>
            </div>
            <p className="text-sm opacity-60 leading-relaxed mb-3">
              Thailand's premier vessel relocation specialists — Gulf of Thailand to the Andaman Sea.
            </p>
            <p className="text-xs opacity-40">
              A subsidiary of Phuket Marine Oracle Co/Ltd
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-display font-bold text-sm uppercase tracking-wider mb-5 text-secondary">Navigation</h3>
            <ul className="space-y-2.5">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Services", href: "/services" },
                { label: "Why Choose Us", href: "/why-choose-us" },
                { label: "Service Areas", href: "/service-areas" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <a className="text-sm opacity-65 hover:opacity-100 hover:text-secondary transition-all">
                      {link.label}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display font-bold text-sm uppercase tracking-wider mb-5 text-secondary">Services</h3>
            <ul className="space-y-2.5">
              {[
                "Overland Vessel Transport",
                "Crane Operations",
                "Ticketed Captains & Engineers",
                "Title Transfers",
                "Port Clearances",
                "Monthly Moorings",
              ].map((s) => (
                <li key={s} className="text-sm opacity-65">{s}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-bold text-sm uppercase tracking-wider mb-5 text-secondary">Contact</h3>
            <div className="space-y-3">
              <a href="tel:+66862697138" className="flex items-center gap-3 text-sm opacity-65 hover:opacity-100 hover:text-secondary transition-all">
                <Phone size={15} className="flex-shrink-0" />
                +66 86 269 7138
              </a>
              <a href="https://wa.me/66862697138" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm opacity-65 hover:opacity-100 hover:text-secondary transition-all">
                <MessageCircle size={15} className="flex-shrink-0" />
                WhatsApp
              </a>
              <a href="mailto:brentmcinnes000@gmail.com" className="flex items-center gap-3 text-sm opacity-65 hover:opacity-100 hover:text-secondary transition-all">
                <Mail size={15} className="flex-shrink-0" />
                brentmcinnes000@gmail.com
              </a>
              <a href="https://www.facebook.com/profile.php?id=61588477663667&sk=about" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm opacity-65 hover:opacity-100 hover:text-secondary transition-all">
                <Facebook size={15} className="flex-shrink-0" />
                Facebook
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container py-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs opacity-40">
            &copy; {new Date().getFullYear()} Coast to Coast Marine Transportation Thailand. All rights reserved.
          </p>
          <p className="text-xs opacity-30">
            A subsidiary of Phuket Marine Oracle Co/Ltd
          </p>
        </div>
      </div>
    </footer>
  );
}
