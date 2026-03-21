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
          height: "3px",
          background: "linear-gradient(90deg, transparent 0%, rgba(0,168,168,0.4) 15%, rgba(0,210,210,1) 50%, rgba(0,168,168,0.4) 85%, transparent 100%)",
          boxShadow: "0 0 24px rgba(0,200,200,0.35), 0 0 8px rgba(0,200,200,0.2)",
        }}
      />

      <div className="container py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-5">
              <img
                src="/logo-mark.png"
                alt="Coast to Coast Marine Transportation Thailand"
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "contain",
                  filter: "drop-shadow(0 0 12px rgba(0,200,200,0.4)) drop-shadow(0 2px 8px rgba(0,0,0,0.5))",
                }}
              />
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
              ⚓ Part of Phuket Marine Oracle Co., Ltd. — Est. 2005
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
                "Licensed Delivery Crew",
                "Title Transfers & Port Clearances (if needed)",
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
Part of Phuket Marine Oracle Co., Ltd. — Est. 2005
          </p>
        </div>
      </div>
    </footer>
  );
}
