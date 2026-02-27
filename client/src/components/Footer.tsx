import { Link } from "wouter";
import { Mail, Phone, MessageCircle, MapPin, Facebook } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="font-display text-lg font-bold mb-4">Coast to Coast</h3>
            <p className="text-sm opacity-90 mb-4">
              Thailand's trusted specialist in oversized boat transport between east and west coasts.
            </p>
            <a
              href="https://www.facebook.com/profile.php?id=61588477663667&sk=about"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 px-4 py-2 rounded-md transition-colors text-white text-sm font-medium"
            >
              <Facebook size={16} />
              Follow Us
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-sm font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about">
                  <a className="hover:text-secondary transition-colors">About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <a className="hover:text-secondary transition-colors">Services</a>
                </Link>
              </li>
              <li>
                <Link href="/service-areas">
                  <a className="hover:text-secondary transition-colors">Service Areas</a>
                </Link>
              </li>
              <li>
                <Link href="/why-choose-us">
                  <a className="hover:text-secondary transition-colors">Why Choose Us</a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="font-display text-sm font-bold mb-4">Service Areas</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <MapPin size={14} className="flex-shrink-0" />
                <span>Pattaya</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={14} className="flex-shrink-0" />
                <span>Chumphon</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={14} className="flex-shrink-0" />
                <span>Ranong</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={14} className="flex-shrink-0" />
                <span>Phuket</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-sm font-bold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone size={16} className="flex-shrink-0 mt-0.5" />
                <a href="tel:+66862697138" className="hover:text-secondary transition-colors">
                  +66 86 269 7138
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={16} className="flex-shrink-0 mt-0.5" />
                <a href="mailto:brentmcinnes000@gmail.com" className="hover:text-secondary transition-colors">
                  brentmcinnes000@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MessageCircle size={16} className="flex-shrink-0 mt-0.5" />
                <a href="https://wa.me/66862697138" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm opacity-75">
            <p>&copy; {currentYear} Coast to Coast Trucking Boats Thailand. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-secondary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-secondary transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
