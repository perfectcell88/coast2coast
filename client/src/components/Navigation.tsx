import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Service Areas", href: "/service-areas" },
    { label: "Why Choose Us", href: "/why-choose-us" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav
      style={{
        background: scrolled
          ? "rgba(6, 22, 44, 0.82)"
          : "rgba(6, 22, 44, 0.45)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderBottom: scrolled
          ? "1px solid rgba(0, 168, 168, 0.22)"
          : "1px solid rgba(255,255,255,0.08)",
        boxShadow: scrolled
          ? "0 8px 40px rgba(0,0,0,0.35), 0 1px 0 rgba(0,168,168,0.15)"
          : "0 2px 20px rgba(0,0,0,0.15)",
        transition: "all 0.4s ease",
      }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* Teal accent line at bottom — always visible, stronger on scroll */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: scrolled
            ? "linear-gradient(90deg, transparent 0%, rgba(0,168,168,0.5) 20%, rgba(0,200,200,0.95) 50%, rgba(0,168,168,0.5) 80%, transparent 100%)"
            : "linear-gradient(90deg, transparent 0%, rgba(0,200,200,0.2) 30%, rgba(0,200,200,0.45) 50%, rgba(0,200,200,0.2) 70%, transparent 100%)",
          transition: "all 0.4s ease",
        }}
      />

      {/* Main nav bar — relative so we can absolutely centre the links */}
      <div className="relative flex items-center h-16 md:h-[72px] px-6 max-w-[1400px] mx-auto">

        {/* Logo — left */}
        <Link href="/">
          <a className="flex items-center gap-3 group flex-shrink-0 z-10">
            <div
              className="w-10 h-10 rounded-xl flex-shrink-0 overflow-hidden transition-all duration-300 group-hover:scale-105"
              style={{
                boxShadow: scrolled
                  ? "0 0 18px rgba(0,200,200,0.5), 0 2px 8px rgba(0,0,0,0.35)"
                  : "0 2px 10px rgba(0,0,0,0.3)",
              }}
            >
              <img
                src="/logo-mark.webp"
                alt="Coast to Coast Marine Transportation Thailand"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="hidden sm:block leading-none">
              <span
                className="block font-display font-bold text-white text-[15px]"
                style={{ letterSpacing: "-0.01em" }}
              >
                Coast to Coast
              </span>
              <span
                className="block text-[9px] font-semibold tracking-[0.24em] uppercase mt-0.5"
                style={{ color: "rgba(0,210,210,0.8)" }}
              >
                Marine Transportation Thailand
              </span>
            </span>
          </a>
        </Link>

        {/* Desktop Nav Links — absolutely centred in the viewport */}
        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-0.5">
          {navItems.map((item) => {
            const active = location === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <a
                  className="relative px-4 py-2 text-[13.5px] font-medium rounded-lg transition-all duration-200 group whitespace-nowrap"
                  style={{
                    color: active ? "#00d4d4" : "rgba(255,255,255,0.8)",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) (e.currentTarget as HTMLElement).style.color = "#ffffff";
                  }}
                  onMouseLeave={(e) => {
                    if (!active) (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.8)";
                  }}
                >
                  {/* Hover background pill */}
                  <span
                    className="absolute inset-0 rounded-lg transition-opacity duration-200 opacity-0 group-hover:opacity-100"
                    style={{ background: "rgba(255,255,255,0.07)" }}
                  />
                  <span className="relative">{item.label}</span>
                  {/* Active indicator dot */}
                  {active && (
                    <span
                      className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                      style={{
                        background: "#00d4d4",
                        boxShadow: "0 0 8px rgba(0,212,212,0.9)",
                      }}
                    />
                  )}
                </a>
              </Link>
            );
          })}
        </div>

        {/* CTA Button — right */}
        <div className="hidden lg:flex items-center ml-auto z-10">
          <Link href="/contact">
            <a>
              <button
                className="text-white text-[13px] font-semibold px-5 py-2.5 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #0a8a8a 0%, #00b8b8 100%)",
                  boxShadow: "0 0 22px rgba(0,184,184,0.4), 0 2px 8px rgba(0,0,0,0.3)",
                  border: "1px solid rgba(0,200,200,0.35)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 32px rgba(0,200,200,0.6), 0 4px 14px rgba(0,0,0,0.35)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 22px rgba(0,184,184,0.4), 0 2px 8px rgba(0,0,0,0.3)";
                }}
              >
                Get a Quote
              </button>
            </a>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors ml-auto"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isOpen && (
        <div
          style={{
            background: "rgba(5, 18, 36, 0.97)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderTop: "1px solid rgba(0,168,168,0.2)",
            boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
          }}
        >
          <div className="px-6 py-4 space-y-1 max-w-[1400px] mx-auto">
            {navItems.map((item) => {
              const active = location === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <a
                    className="flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all"
                    style={{
                      color: active ? "#00d4d4" : "rgba(255,255,255,0.82)",
                      background: active ? "rgba(0,200,200,0.1)" : "transparent",
                    }}
                    onClick={() => setIsOpen(false)}
                  >
                    {active && (
                      <span
                        className="w-1.5 h-1.5 rounded-full mr-2.5 flex-shrink-0"
                        style={{ background: "#00d4d4", boxShadow: "0 0 6px rgba(0,212,212,0.9)" }}
                      />
                    )}
                    {item.label}
                  </a>
                </Link>
              );
            })}
            <div className="pt-3 pb-1">
              <Link href="/contact">
                <a onClick={() => setIsOpen(false)}>
                  <button
                    className="w-full text-white font-semibold py-3 rounded-xl transition-all hover:opacity-90"
                    style={{
                      background: "linear-gradient(135deg, #0a8a8a 0%, #00b8b8 100%)",
                      boxShadow: "0 0 20px rgba(0,184,184,0.3)",
                    }}
                  >
                    Get a Quote
                  </button>
                </a>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
