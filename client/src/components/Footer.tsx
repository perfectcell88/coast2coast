import { Link } from "wouter";
import { Phone, Mail, MessageCircle, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer
      style={{
        background: "linear-gradient(180deg, #061e36 0%, #040f1e 100%)",
        position: "relative",
      }}
    >
      {/* Teal accent top border */}
      <div
        style={{
          height: "2px",
          background: "linear-gradient(90deg, transparent 0%, rgba(0,168,168,0.5) 20%, rgba(0,200,200,0.9) 50%, rgba(0,168,168,0.5) 80%, transparent 100%)",
        }}
      />

      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-11 h-11 rounded-xl flex-shrink-0 overflow-hidden"
                style={{ boxShadow: "0 0 20px rgba(0,200,200,0.3)" }}
              >
                <img src="/logo-mark.webp" alt="Coast to Coast Marine Transportation Thailand" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-display font-bold text-base leading-tight text-white">Coast to Coast</p>
                <p
                  className="text-[10px] leading-tight tracking-widest uppercase mt-0.5"
                  style={{ color: "rgba(0,200,200,0.65)" }}
                >
                  Marine Transportation Thailand
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>
              Thailand's premier vessel relocation specialists — Gulf of Thailand to the Andaman Sea.
            </p>
            {/* Subsidiary badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs"
              style={{
                background: "rgba(0,200,200,0.08)",
                border: "1px solid rgba(0,200,200,0.2)",
                color: "rgba(0,200,200,0.75)",
              }}
            >
              ⚓ A subsidiary of Phuket Marine Oracle Co., Ltd.
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3
              className="font-display font-bold text-xs uppercase tracking-[0.2em] mb-5"
              style={{ color: "#00c8c8" }}
            >
              Navigation
            </h3>
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
                    <a
                      className="text-sm transition-all duration-200"
                      style={{ color: "rgba(255,255,255,0.55)" }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.color = "#00c8c8";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.55)";
                      }}
                    >
                      {link.label}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3
              className="font-display font-bold text-xs uppercase tracking-[0.2em] mb-5"
              style={{ color: "#00c8c8" }}
            >
              Services
            </h3>
            <ul className="space-y-2.5">
              {[
                "Overland Vessel Transport",
                "Crane Operations",
                "Ticketed Captains & Engineers",
                "Title Transfers",
                "Port Clearances",
                "Monthly Moorings",
              ].map((s) => (
                <li key={s} className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="font-display font-bold text-xs uppercase tracking-[0.2em] mb-5"
              style={{ color: "#00c8c8" }}
            >
              Contact
            </h3>
            <div className="space-y-3">
              {[
                { href: "tel:+66862697138", icon: Phone, label: "+66 86 269 7138" },
                { href: "https://wa.me/66862697138", icon: MessageCircle, label: "WhatsApp", external: true },
                { href: "mailto:brentmcinnes000@gmail.com", icon: Mail, label: "brentmcinnes000@gmail.com" },
                { href: "https://www.facebook.com/profile.php?id=61588477663667&sk=about", icon: Facebook, label: "Facebook", external: true },
              ].map(({ href, icon: Icon, label, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="flex items-center gap-3 text-sm transition-all duration-200 group"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "#00c8c8";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.55)";
                  }}
                >
                  <Icon size={14} className="flex-shrink-0" />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="container py-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            &copy; {new Date().getFullYear()} Coast to Coast Marine Transportation Thailand. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "rgba(0,200,200,0.4)" }}>
            A subsidiary of Phuket Marine Oracle Co., Ltd.
          </p>
        </div>
      </div>
    </footer>
  );
}
