"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { ABOUT_TIMELINE } from "@/lib/constants";

export default function About() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section className="py-24 md:py-32 relative" id="about">
      <div
        ref={ref}
        className="container mx-auto px-5 md:px-20 max-w-[1200px]"
      >
        <div className="flex flex-col md:flex-row gap-12 md:gap-16">
          {/* Sticky Title */}
          <div className="md:w-1/3">
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="font-[family-name:var(--font-geist)] text-3xl md:text-[32px] font-semibold md:sticky md:top-32 leading-tight"
            >
              The Journey of an{" "}
              <span className="text-[var(--color-primary)]">Architect.</span>
            </motion.h2>
          </div>

          {/* Timeline */}
          <div className="md:w-2/3 space-y-0">
            <div className="relative pl-12 border-l timeline-line">
              {ABOUT_TIMELINE.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="relative mb-16 last:mb-0"
                >
                  {/* Timeline node */}
                  <div
                    className={`absolute -left-[53px] w-10 h-10 rounded-full flex items-center justify-center ${
                      item.highlight
                        ? "bg-[var(--color-primary)] shadow-[0_0_20px_rgba(173,198,255,0.4)]"
                        : "bg-[var(--color-background)] border-2 border-[var(--color-primary)]/40"
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-sm ${
                        item.highlight
                          ? "text-[var(--color-on-primary)]"
                          : "text-[var(--color-on-surface-variant)]"
                      }`}
                    >
                      {item.icon}
                    </span>
                  </div>

                  <h3
                    className={`font-[family-name:var(--font-geist)] text-xl md:text-2xl font-semibold mb-2 ${
                      item.highlight ? "text-[var(--color-primary)]" : ""
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p className="text-[var(--color-on-surface-variant)] leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
