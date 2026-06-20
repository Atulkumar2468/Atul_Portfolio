"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { CERTIFICATIONS } from "@/lib/constants";
import type { Certification } from "@/lib/constants";

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <>
      <section className="py-24 md:py-32" id="certifications">
        <div
          ref={ref}
          className="container mx-auto px-5 md:px-20 max-w-[1200px]"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 md:mb-20 space-y-4"
          >
            <h2 className="font-[family-name:var(--font-geist)] text-3xl md:text-[32px] font-semibold">
              Professional{" "}
              <span className="text-[var(--color-primary)]">
                Certifications.
              </span>
            </h2>
            <p className="text-[var(--color-on-surface-variant)] max-w-2xl mx-auto">
              Industry-recognized certifications validating technical
              expertise.
            </p>
          </motion.div>

          {/* Certification Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CERTIFICATIONS.map((cert, index) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                onClick={() => setSelectedCert(cert)}
                className="glass-card p-8 rounded-3xl group cursor-pointer hover:-translate-y-1 transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-[var(--color-primary)]/10 flex items-center justify-center mb-6 text-[var(--color-primary)] group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-2xl">
                    {cert.icon}
                  </span>
                </div>

                {/* Content */}
                <h4 className="font-[family-name:var(--font-geist)] text-lg font-semibold mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                  {cert.title}
                </h4>
                <p className="text-[var(--color-on-surface-variant)] text-sm font-[family-name:var(--font-mono)] tracking-wider mb-4">
                  {cert.issuer}
                </p>
                <p className="text-[var(--color-on-surface-variant)] text-sm line-clamp-2">
                  {cert.description}
                </p>

                {/* View Button */}
                <div className="mt-6 flex items-center gap-2 text-[var(--color-primary)] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>View Details</span>
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificate Preview Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card p-8 md:p-12 rounded-3xl max-w-lg w-full relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                <span className="material-symbols-outlined">close</span>
              </button>

              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-[var(--color-primary)]/10 flex items-center justify-center mb-6 text-[var(--color-primary)]">
                <span className="material-symbols-outlined text-3xl">
                  {selectedCert.icon}
                </span>
              </div>

              {/* Content */}
              <h3 className="font-[family-name:var(--font-geist)] text-2xl font-semibold mb-2">
                {selectedCert.title}
              </h3>
              <p className="text-[var(--color-primary)] font-[family-name:var(--font-mono)] text-sm tracking-wider mb-6">
                Issued by {selectedCert.issuer}
              </p>
              <p className="text-[var(--color-on-surface-variant)] leading-relaxed">
                {selectedCert.description}
              </p>

              {/* Certificate Badge */}
              <div className="mt-8 p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                <span className="material-symbols-outlined text-[var(--color-tertiary)]">
                  verified
                </span>
                <span className="text-sm text-[var(--color-on-surface-variant)]">
                  Certificate Verified
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
