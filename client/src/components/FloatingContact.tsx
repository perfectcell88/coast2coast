import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

export default function FloatingContact() {
  const [expanded, setExpanded] = useState(false);

  const contacts = [
    {
      label: "WhatsApp",
      href: "https://wa.me/66862697138",
      color: "linear-gradient(135deg, #25d366 0%, #128c7e 100%)",
      shadow: "rgba(37,211,102,0.45)",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
    },
    {
      label: "LINE",
      href: "https://line.me/ti/p/~coast2coastmarine",
      color: "linear-gradient(135deg, #06c755 0%, #00a040 100%)",
      shadow: "rgba(6,199,85,0.45)",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
          <path d="M19.952 11.672c0-4.461-4.473-8.088-9.974-8.088-5.5 0-9.974 3.627-9.974 8.088 0 3.998 3.547 7.349 8.338 7.984.325.07.767.214.879.491.101.252.066.647.032.902l-.142.854c-.043.253-.2.99.867.54 1.067-.45 5.754-3.389 7.851-5.806 1.448-1.588 2.123-3.2 2.123-4.965zm-13.37 2.544H4.947a.434.434 0 01-.434-.434V9.618a.434.434 0 01.868 0v3.73h1.201a.434.434 0 010 .868zm1.807 0a.434.434 0 01-.434-.434V9.618a.434.434 0 01.868 0v4.164a.434.434 0 01-.434.434zm4.585 0a.434.434 0 01-.348-.174l-2.003-2.73v2.47a.434.434 0 01-.868 0V9.618a.434.434 0 01.782-.26l2.003 2.73V9.618a.434.434 0 01.868 0v4.164a.434.434 0 01-.434.434zm3.398 0h-2.635a.434.434 0 01-.434-.434V9.618a.434.434 0 01.434-.434h2.635a.434.434 0 010 .868h-2.2v1.098h2.2a.434.434 0 010 .868h-2.2v1.098h2.2a.434.434 0 010 .868z"/>
        </svg>
      ),
    },
    {
      label: "Messenger",
      href: "https://m.me/61588477663667",
      color: "linear-gradient(135deg, #0084ff 0%, #0052cc 100%)",
      shadow: "rgba(0,132,255,0.4)",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
          <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.652V24l4.088-2.242c1.092.3 2.246.464 3.443.464 6.627 0 12-4.975 12-11.111C24 4.974 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8l3.131 3.26L19.752 8l-6.561 6.963z"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3 z-50">

      {/* Expandable contact options */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.92 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="flex flex-col items-end gap-2.5"
          >
            {contacts.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 group"
                title={c.label}
              >
                <span
                  className="hidden sm:block text-xs font-semibold px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0 whitespace-nowrap"
                  style={{
                    background: "rgba(6,18,36,0.92)",
                    color: "rgba(255,255,255,0.95)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.14)",
                  }}
                >
                  {c.label}
                </span>
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 group-hover:scale-110 group-hover:-translate-y-0.5"
                  style={{
                    background: c.color,
                    boxShadow: `0 4px 18px ${c.shadow}`,
                  }}
                >
                  {c.icon}
                </div>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main toggle button */}
      <motion.button
        onClick={() => setExpanded(!expanded)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-colors duration-300"
        style={{
          background: expanded
            ? "linear-gradient(135deg, #0a3a3a 0%, #0a5a5a 100%)"
            : "linear-gradient(135deg, #0a8a8a 0%, #00c8c8 100%)",
          boxShadow: "0 4px 24px rgba(0,200,200,0.5), 0 2px 8px rgba(0,0,0,0.3)",
        }}
        aria-label="Contact us"
      >
        <motion.div
          animate={{ rotate: expanded ? 45 : 0 }}
          transition={{ duration: 0.25 }}
        >
          {expanded ? (
            <X size={22} className="text-white" />
          ) : (
            <MessageCircle size={22} className="text-white" />
          )}
        </motion.div>
      </motion.button>

    </div>
  );
}
