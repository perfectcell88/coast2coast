import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Anchor } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 16 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={scrollUp}
          aria-label="Scroll to top"
          className="fixed bottom-24 right-5 z-50 w-11 h-11 rounded-full flex items-center justify-center transition-transform hover:scale-110 group"
          style={{
            background: "linear-gradient(135deg, #0a5f6b 0%, #00b8b8 100%)",
            boxShadow: "0 0 18px rgba(0,184,184,0.45), 0 4px 12px rgba(0,0,0,0.25)",
            border: "1px solid rgba(0,200,200,0.35)",
          }}
        >
          <Anchor
            size={18}
            className="text-white transition-transform group-hover:-translate-y-0.5"
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
