"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useInView } from "@/hooks/useInView";
import { PROJECTS } from "@/lib/constants";

type Filter = "all" | "web" | "system";

export default function Projects() {
  const [filter, setFilter] = useState<Filter>("all");
  const { ref, isInView } = useInView({ threshold: 0.05 });

  const filtered =
    filter === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === filter);

  const filters: { label: string; value: Filter }[] = [
    { label: "All", value: "all" },
    { label: "Web", value: "web" },
    { label: "System", value: "system" },
  ];

  return (
    <section className="py-24 md:py-32" id="projects">
      <div
        ref={ref}
        className="container mx-auto px-5 md:px-20 max-w-[1200px]"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 md:mb-16 gap-6"
        >
          <div className="space-y-4">
            <h2 className="font-[family-name:var(--font-geist)] text-3xl md:text-[32px] font-semibold">
              Selected{" "}
              <span className="text-[var(--color-primary)]">Works.</span>
            </h2>
            <p className="text-[var(--color-on-surface-variant)]">
              Production-ready solutions crafted with precision.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`px-4 py-2 rounded-full font-[family-name:var(--font-mono)] text-sm transition-all ${
                  filter === f.value
                    ? "bg-[var(--color-primary-container)] text-[var(--color-on-primary-container)] font-bold"
                    : "text-[var(--color-on-surface-variant)] hover:bg-white/5"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="project-card flex flex-col group h-full"
              layout
            >
              {/* Project Image */}
              <div className="project-image-container aspect-video rounded-3xl glass-card overflow-hidden mb-6 relative">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[var(--color-primary)]/40 opacity-0 group-hover:opacity-10 transition-opacity" />
              </div>

              {/* Project Info */}
              <div className="flex-grow space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-[family-name:var(--font-geist)] text-xl md:text-2xl font-semibold group-hover:text-[var(--color-primary)] transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex gap-2">
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] cursor-pointer transition-colors"
                      aria-label={`Live demo for ${project.title}`}
                    >
                      <span className="material-symbols-outlined">link</span>
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] cursor-pointer transition-colors"
                      aria-label={`GitHub for ${project.title}`}
                    >
                      <span className="material-symbols-outlined">code</span>
                    </a>
                  </div>
                </div>

                <p className="text-[var(--color-on-surface-variant)] line-clamp-2">
                  {project.description}
                </p>

                {/* Features List */}
                <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs text-[var(--color-on-surface-variant)] pt-1">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[var(--color-primary)] text-sm shrink-0">
                        arrow_right
                      </span>
                      <span className="truncate" title={feature}>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-1 bg-white/5 rounded text-xs font-[family-name:var(--font-mono)] text-[var(--color-on-surface-variant)] border border-white/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Metric */}
                <div className="flex gap-4 items-center pt-2">
                  <div className="text-[var(--color-primary)] font-bold text-lg">
                    {project.metric.value}
                  </div>
                  <div className="text-[var(--color-on-surface-variant)] text-sm">
                    {project.metric.label}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
