"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { SKILLS, SOFT_SKILLS } from "@/lib/constants";

const colorMap = {
  primary: {
    bg: "bg-[var(--color-primary)]/10",
    text: "text-[var(--color-primary)]",
  },
  secondary: {
    bg: "bg-[var(--color-secondary)]/10",
    text: "text-[var(--color-secondary)]",
  },
  tertiary: {
    bg: "bg-[var(--color-tertiary)]/10",
    text: "text-[var(--color-tertiary)]",
  },
};

export default function Skills() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section
      className="py-24 md:py-32 bg-[var(--color-surface-container-lowest)]"
      id="skills"
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
            Technical{" "}
            <span className="text-[var(--color-primary)]">Ecosystem.</span>
          </h2>
          <p className="text-[var(--color-on-surface-variant)] max-w-2xl mx-auto">
            A specialized toolset refined for performance and scalability.
          </p>
        </motion.div>

        {/* Skill Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILLS.map((category, index) => {
            const colors = colorMap[category.color];
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-8 rounded-3xl group hover:-translate-y-1 transition-all duration-300"
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center mb-6 ${colors.text} group-hover:scale-110 transition-transform`}
                >
                  <span className="material-symbols-outlined">
                    {category.icon}
                  </span>
                </div>

                {/* Title */}
                <h4 className="font-[family-name:var(--font-geist)] text-xl md:text-2xl font-semibold mb-4">
                  {category.title}
                </h4>

                {/* Skill Badges */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-white/5 rounded-full font-[family-name:var(--font-mono)] text-sm border border-white/5"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Soft Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <h4 className="font-[family-name:var(--font-mono)] text-sm text-[var(--color-on-surface-variant)] tracking-wider uppercase mb-4">
            Soft Skills
          </h4>
          <div className="flex flex-wrap justify-center gap-3">
            {SOFT_SKILLS.map((skill) => (
              <span
                key={skill}
                className="px-5 py-2 glass-card rounded-full font-[family-name:var(--font-mono)] text-sm text-[var(--color-primary)]"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
