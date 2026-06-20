"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { EXPERIENCES } from "@/lib/constants";

export default function Experience() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section
      className="py-24 md:py-32 bg-[var(--color-surface-container-lowest)] relative"
      id="experience"
    >
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
            <span className="text-[var(--color-primary)]">Path.</span>
          </h2>
          <p className="text-[var(--color-on-surface-variant)] max-w-2xl mx-auto">
            Practical industry exposure and software engineering experience.
          </p>
        </motion.div>

        {/* Timeline Design */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical Timeline Line */}
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : {}}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute left-4 md:left-8 top-2 bottom-2 w-[2px] bg-gradient-to-b from-[var(--color-primary)]/40 to-transparent"
          />

          <div className="space-y-12">
            {EXPERIENCES.map((exp, index) => (
              <div key={exp.title} className="relative pl-12 md:pl-20">
                {/* Timeline Dot/Icon */}
                <div className="absolute left-4 md:left-8 -translate-x-1/2 top-4 z-10 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={isInView ? { scale: 1, rotate: 0 } : {}}
                    transition={{ type: "spring", stiffness: 260, damping: 20, delay: index * 0.15 }}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--color-primary)] shadow-[0_0_20px_rgba(173,198,255,0.4)] border border-[var(--color-primary)] text-[var(--color-on-primary)]"
                  >
                    <span className="material-symbols-outlined text-lg">
                      work
                    </span>
                  </motion.div>
                </div>

                {/* Card Content */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="glass-card p-6 md:p-8 rounded-3xl"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                    <div>
                      <h3 className="font-[family-name:var(--font-geist)] text-xl md:text-2xl font-bold">
                        {exp.title}
                      </h3>
                      <p className="text-[var(--color-primary)] font-semibold text-base">
                        {exp.company}
                      </p>
                    </div>
                    <span className="font-[family-name:var(--font-mono)] text-sm font-bold tracking-wider text-[var(--color-on-surface-variant)] bg-white/5 border border-white/10 px-3 py-1 rounded-full w-fit">
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-[var(--color-on-surface)] mb-6 leading-relaxed">
                    {exp.description}
                  </p>

                  <ul className="space-y-3">
                    {exp.achievements.map((achievement) => (
                      <li
                        key={achievement}
                        className="flex items-start gap-3 text-[var(--color-on-surface-variant)] text-sm md:text-base leading-relaxed"
                      >
                        <span className="material-symbols-outlined text-[var(--color-primary)] text-sm md:text-base mt-1 shrink-0">
                          check_circle
                        </span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
