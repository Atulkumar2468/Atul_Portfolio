"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useScrollSpy(
    NAV_LINKS.map((l) => l.href.replace("#", "")),
    80
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
          scrolled
            ? "bg-[var(--color-surface)]/80 backdrop-blur-[20px] border-b border-white/10 shadow-lg backdrop-saturate-150"
            : "bg-transparent"
        }`}
      >
        <nav className="flex justify-between items-center w-full px-5 md:px-20 h-20 max-w-[1200px] mx-auto">
          <div />

          {/* Desktop Nav */}
          <div className="hidden lg:flex gap-6 items-center">
            {NAV_LINKS.filter((l) => l.label !== "Home").map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`font-[family-name:var(--font-mono)] text-sm font-medium tracking-wider transition-colors duration-300 ${
                  activeSection === link.href.replace("#", "")
                    ? "text-[var(--color-primary)]"
                    : "text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)]"
                }`}
              >
                {link.label}
              </a>
            ))}
            <ThemeToggle />
            <a
              href="#booking"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#booking");
              }}
              className="bg-[var(--color-primary-container)] text-[var(--color-on-primary-container)] px-5 py-2 rounded-full font-[family-name:var(--font-mono)] text-sm font-bold hover:scale-95 transition-transform duration-200"
            >
              Book a Meeting
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[var(--color-primary)] p-2"
              aria-label="Toggle menu"
              id="mobile-menu-toggle"
            >
              <span className="material-symbols-outlined text-2xl">
                {isOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[99] bg-[var(--color-background)]/95 backdrop-blur-xl lg:hidden"
          >
            <motion.nav
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              exit={{ y: -20 }}
              transition={{ duration: 0.3, staggerChildren: 0.05 }}
              className="flex flex-col items-center justify-center h-full gap-6"
            >
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`font-[family-name:var(--font-mono)] text-lg tracking-wider transition-colors ${
                    activeSection === link.href.replace("#", "")
                      ? "text-[var(--color-primary)]"
                      : "text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)]"
                  }`}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#booking"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("#booking");
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.05 }}
                className="mt-4 bg-[var(--color-primary-container)] text-[var(--color-on-primary-container)] px-8 py-3 rounded-full font-bold text-lg"
              >
                Book a Meeting
              </motion.a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
