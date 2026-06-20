"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { EDUCATION } from "@/lib/constants";

export default function Education() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section className="py-24 md:py-32 relative" id="education">
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
            Academic{" "}
            <span className="text-[var(--color-primary)]">Credits.</span>
          </h2>
          <p className="text-[var(--color-on-surface-variant)] max-w-2xl mx-auto">
            Educational milestones that shaped my foundations in computer science and engineering.
          </p>
        </motion.div>

        {/* Timeline Visualization */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical Timeline Line */}
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : {}}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute left-4 md:left-1/2 -translate-x-1/2 top-2 bottom-2 w-[2px] bg-gradient-to-b from-[var(--color-primary)]/40 via-[var(--color-secondary)]/30 to-[var(--color-outline-variant)]/20"
          />

          <div className="space-y-12">
            {EDUCATION.map((edu, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={edu.degree}
                  className={`flex flex-col md:flex-row items-stretch md:justify-between relative ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Dot/Icon */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-4 z-10 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0, rotate: -45 }}
                      animate={isInView ? { scale: 1, rotate: 0 } : {}}
                      transition={{ type: "spring", stiffness: 260, damping: 20, delay: index * 0.15 }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                        edu.highlight
                          ? "bg-[var(--color-primary)] border-[var(--color-primary)] shadow-[0_0_20px_rgba(173,198,255,0.5)] text-[var(--color-on-primary)] font-bold"
                          : "bg-[var(--color-background)] border-[var(--color-primary)]/40 text-[var(--color-primary)]"
                      }`}
                    >
                      <span className="material-symbols-outlined text-lg">
                        {edu.highlight ? "school" : "workspace_premium"}
                      </span>
                    </motion.div>
                  </div>

                  {/* Card Content */}
                  <div className="w-full md:w-[45%] pl-12 md:pl-0">
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.6, delay: index * 0.15 }}
                      className={`glass-card p-6 rounded-2xl border-l-4 h-full flex flex-col justify-between ${
                        edu.highlight
                          ? "border-l-[var(--color-primary)] bg-[var(--color-primary)]/5"
                          : "border-l-white/10"
                      }`}
                    >
                      <div>
                        <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                          <span className="font-[family-name:var(--font-mono)] text-xs font-bold tracking-wider text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-2 py-0.5 rounded">
                            {edu.period}
                          </span>
                          {edu.highlight && (
                            <span className="font-[family-name:var(--font-mono)] text-[10px] font-bold tracking-wider text-[var(--color-tertiary)] bg-[var(--color-tertiary)]/10 px-2 py-0.5 rounded uppercase">
                              Active/Latest
                            </span>
                          )}
                        </div>
                        <h3 className="font-[family-name:var(--font-geist)] text-lg md:text-xl font-bold mb-1 leading-tight group-hover:text-[var(--color-primary)] transition-colors">
                          {edu.degree}
                        </h3>
                        <p className="text-[var(--color-on-surface-variant)] text-sm md:text-base">
                          {edu.institution}
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Empty Spacer Column for Desktop Alignment */}
                  <div className="hidden md:block w-[45%]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
