import { Link, useLocation } from "wouter";
import { Menu, X, Anchor } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

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

  const isHome = location === "/";

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Service Areas", href: "/service-areas" },
    { label: "Why Choose Us", href: "/why-choose-us" },
    { label: "Contact", href: "/contact" },
  ];

  const transparent = isHome && !scrolled;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        transparent
          ? "bg-transparent"
          : "bg-primary/96 backdrop-blur-md shadow-lg"
      }`}
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href="/">
          <a className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-secondary rounded-lg flex items-center justify-center shadow-sm group-hover:bg-secondary/85 transition-colors flex-shrink-0">
              <Anchor className="text-white" size={18} />
            </div>
            <span className="hidden sm:block leading-tight">
              <span className="block font-display font-bold text-white text-sm">Coast to Coast</span>
              <span className="block text-[10px] font-normal text-white/55 tracking-widest uppercase">Marine Transportation Thailand</span>
            </span>
          </a>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-0.5">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <a
                className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-all ${
                  location === item.href
                    ? "text-secondary bg-white/10"
                    : "text-white/80 hover:text-white hover:bg-white/8"
                }`}
              >
                {item.label}
              </a>
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center gap-3">
          <Link href="/contact">
            <a>
              <Button className="bg-secondary hover:bg-secondary/85 text-white text-sm px-5 h-9 shadow-sm">
                Get a Quote
              </Button>
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
        <div className="lg:hidden border-t border-white/10 bg-primary/97 backdrop-blur-md shadow-xl">
          <div className="container py-4 space-y-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <a
                  className={`block px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                    location === item.href
                      ? "text-secondary bg-white/10"
                      : "text-white/80 hover:text-white hover:bg-white/8"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              </Link>
            ))}
            <div className="pt-2 pb-1">
              <Link href="/contact">
                <a onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-secondary hover:bg-secondary/85 text-white mt-1">
                    Get a Quote
                  </Button>
                </a>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
