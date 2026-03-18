import { Link, useLocation } from "wouter";
import { Menu, X, Anchor } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const isHome = location === "/";
  const transparent = isHome && !scrolled;

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
      style={
        !transparent
          ? {
              background: "rgba(10, 37, 64, 0.72)",
              backdropFilter: "blur(18px) saturate(180%)",
              WebkitBackdropFilter: "blur(18px) saturate(180%)",
              borderBottom: "1px solid rgba(0, 168, 168, 0.18)",
              boxShadow: "0 4px 32px rgba(0,0,0,0.28), 0 1px 0 rgba(0,168,168,0.12)",
            }
          : {}
      }
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        transparent ? "bg-transparent border-transparent" : ""
      }`}
    >
      {/* Subtle wave accent line at bottom when scrolled */}
      {!transparent && (
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(0,168,168,0.6) 30%, rgba(0,200,200,0.9) 50%, rgba(0,168,168,0.6) 70%, transparent 100%)",
          }}
        />
      )}

      <div className="container flex items-center justify-between h-16 md:h-[72px]">

        {/* Logo */}
        <Link href="/">
          <a className="flex items-center gap-3 group flex-shrink-0">
            {/* Icon with marine glow */}
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #0a8a8a 0%, #00c8c8 100%)",
                boxShadow: scrolled
                  ? "0 0 16px rgba(0,200,200,0.45), 0 2px 8px rgba(0,0,0,0.3)"
                  : "0 2px 8px rgba(0,0,0,0.25)",
              }}
            >
              <Anchor className="text-white" size={19} strokeWidth={2} />
            </div>
            {/* Wordmark */}
            <span className="hidden sm:block leading-none">
              <span
                className="block font-display font-bold text-white text-[15px] tracking-tight"
                style={{ letterSpacing: "-0.01em" }}
              >
                Coast to Coast
              </span>
              <span
                className="block text-[9.5px] font-medium tracking-[0.22em] uppercase mt-0.5"
                style={{ color: "rgba(0,200,200,0.75)" }}
              >
                Marine Transportation Thailand
              </span>
            </span>
          </a>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-0.5">
          {navItems.map((item) => {
            const active = location === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <a
                  className="relative px-4 py-2 text-[13.5px] font-medium rounded-lg transition-all duration-200 group"
                  style={{
                    color: active ? "#00c8c8" : "rgba(255,255,255,0.78)",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) (e.currentTarget as HTMLElement).style.color = "#ffffff";
                  }}
                  onMouseLeave={(e) => {
                    if (!active) (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.78)";
                  }}
                >
                  {/* Hover background */}
                  <span
                    className="absolute inset-0 rounded-lg transition-opacity duration-200 opacity-0 group-hover:opacity-100"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                  />
                  {item.label}
                  {/* Active indicator dot */}
                  {active && (
                    <span
                      className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                      style={{ background: "#00c8c8", boxShadow: "0 0 6px rgba(0,200,200,0.8)" }}
                    />
                  )}
                </a>
              </Link>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center">
          <Link href="/contact">
            <a>
              <button
                className="text-white text-[13px] font-semibold px-5 py-2.5 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #0a8a8a 0%, #00b8b8 100%)",
                  boxShadow: "0 0 20px rgba(0,184,184,0.35), 0 2px 8px rgba(0,0,0,0.25)",
                  border: "1px solid rgba(0,200,200,0.3)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 28px rgba(0,200,200,0.55), 0 4px 12px rgba(0,0,0,0.3)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 0 20px rgba(0,184,184,0.35), 0 2px 8px rgba(0,0,0,0.25)";
                }}
              >
                Get a Quote
              </button>
            </a>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div
          className="lg:hidden shadow-2xl"
          style={{
            background: "rgba(8, 28, 50, 0.96)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderTop: "1px solid rgba(0,168,168,0.2)",
          }}
        >
          <div className="container py-4 space-y-1">
            {navItems.map((item) => {
              const active = location === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <a
                    className="flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all"
                    style={{
                      color: active ? "#00c8c8" : "rgba(255,255,255,0.8)",
                      background: active ? "rgba(0,200,200,0.1)" : "transparent",
                    }}
                    onClick={() => setIsOpen(false)}
                  >
                    {active && (
                      <span
                        className="w-1.5 h-1.5 rounded-full mr-2.5 flex-shrink-0"
                        style={{ background: "#00c8c8", boxShadow: "0 0 6px rgba(0,200,200,0.8)" }}
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
                    className="w-full text-white font-semibold py-3 rounded-xl transition-all"
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
