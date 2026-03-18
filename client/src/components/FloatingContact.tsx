import { useState } from "react";
import { MessageCircle, Facebook, X, Phone } from "lucide-react";

export default function FloatingContact() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3 z-50">

      {/* Expandable contact options */}
      {expanded && (
        <div className="flex flex-col items-end gap-2.5">

          {/* WhatsApp */}
          <a
            href="https://wa.me/66862697138"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 group"
            title="WhatsApp"
          >
            <span
              className="hidden sm:block text-xs font-medium px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0"
              style={{
                background: "rgba(10,37,64,0.9)",
                color: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              WhatsApp
            </span>
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 group-hover:scale-110"
              style={{
                background: "linear-gradient(135deg, #25d366 0%, #128c7e 100%)",
                boxShadow: "0 4px 16px rgba(37,211,102,0.4)",
              }}
            >
              {/* WhatsApp SVG icon */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
          </a>

          {/* Facebook Messenger */}
          <a
            href="https://m.me/61588477663667"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 group"
            title="Facebook Messenger"
          >
            <span
              className="hidden sm:block text-xs font-medium px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0"
              style={{
                background: "rgba(10,37,64,0.9)",
                color: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              Messenger
            </span>
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 group-hover:scale-110"
              style={{
                background: "linear-gradient(135deg, #0084ff 0%, #0052cc 100%)",
                boxShadow: "0 4px 16px rgba(0,132,255,0.4)",
              }}
            >
              {/* Messenger SVG icon */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.652V24l4.088-2.242c1.092.3 2.246.464 3.443.464 6.627 0 12-4.975 12-11.111C24 4.974 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8l3.131 3.26L19.752 8l-6.561 6.963z"/>
              </svg>
            </div>
          </a>

        </div>
      )}

      {/* Main toggle button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110"
        style={{
          background: expanded
            ? "linear-gradient(135deg, #0a4a4a 0%, #0a6464 100%)"
            : "linear-gradient(135deg, #0a8a8a 0%, #00c8c8 100%)",
          boxShadow: "0 4px 20px rgba(0,200,200,0.45)",
        }}
        aria-label="Contact us"
      >
        {expanded ? (
          <X size={22} className="text-white" />
        ) : (
          <Phone size={20} className="text-white" />
        )}
      </button>

    </div>
  );
}
