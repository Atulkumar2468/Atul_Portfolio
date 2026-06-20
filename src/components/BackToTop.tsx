"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-[var(--color-primary-container)] text-[var(--color-on-primary-container)] flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          aria-label="Back to top"
          id="back-to-top"
        >
          <span className="material-symbols-outlined">arrow_upward</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
