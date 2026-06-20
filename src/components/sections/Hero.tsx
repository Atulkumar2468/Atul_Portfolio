"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ShaderBackground from "../ShaderBackground";
import TypingAnimation from "../TypingAnimation";
import { PERSONAL, TYPING_TITLES, STATS } from "@/lib/constants";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const },
  },
};

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
      id="hero"
    >
      {/* WebGL Shader Background */}
      <ShaderBackground />

      <div className="container mx-auto px-5 md:px-20 max-w-[1200px] grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8 order-2 md:order-1"
        >
          {/* Available Badge */}
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/5 text-[var(--color-primary)] font-[family-name:var(--font-mono)] text-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-primary)] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-primary)]" />
              </span>
              Available for Projects
            </div>
          </motion.div>

          {/* Hero Title */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h1
              className="font-[family-name:var(--font-geist)] text-4xl md:text-[64px] font-bold tracking-tighter leading-none"
              id="hero-title"
            >
              Hi, I&apos;m{" "}
              <TypingAnimation
                titles={TYPING_TITLES}
                className="text-[var(--color-primary)]"
              />
            </h1>
            <p className="font-[family-name:var(--font-inter)] text-lg text-[var(--color-on-surface-variant)] max-w-lg leading-relaxed">
              {PERSONAL.description}
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#projects")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-4 bg-[var(--color-primary)] text-[var(--color-on-primary)] font-bold rounded-xl flex items-center gap-2 hover:scale-[0.98] transition-transform"
              id="cta-view-projects"
            >
              View Projects
              <span className="material-symbols-outlined">arrow_forward</span>
            </a>
            <a
              href="#booking"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#booking")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-4 glass-card font-bold rounded-xl hover:bg-white/5 transition-all"
              id="cta-book-meeting"
            >
              Book a Meeting
            </a>
            <a
              href={PERSONAL.resumeUrl}
              download
              className="px-8 py-4 border border-white/10 rounded-xl font-bold hover:bg-white/5 transition-all flex items-center gap-2"
              id="cta-download-resume"
            >
              <span className="material-symbols-outlined">download</span>
              Resume
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-12 border-t border-white/10"
          >
            {STATS.map((stat) => (
              <div key={stat.label}>
                <div className="text-[var(--color-primary)] font-[family-name:var(--font-geist)] text-xl md:text-2xl font-bold">
                  {stat.value}
                </div>
                <div className="text-[var(--color-on-surface-variant)] font-[family-name:var(--font-mono)] text-xs tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right - Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="order-1 md:order-2 flex justify-center items-center"
        >
          <div className="relative w-64 h-64 md:w-96 md:h-96">
            {/* Glow backdrop */}
            <div className="absolute inset-0 bg-[var(--color-primary)]/20 blur-[80px] rounded-full animate-pulse" />
            {/* Image container */}
            <div className="relative w-full h-full rounded-2xl border border-white/10 glass-card overflow-hidden">
              <Image
                src={PERSONAL.profileImage}
                alt={`${PERSONAL.name} — Software Engineer`}
                fill
                className="object-cover object-[center_18%] scale-[1.7] origin-[50%_18%] hover:scale-[1.8] transition-all duration-500"
                priority
                sizes="(max-width: 768px) 256px, 384px"
                onError={(e) => {
                  // Fallback to a placeholder if profile image not found
                  const target = e.target as HTMLImageElement;
                  target.src =
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuA9DgWzVuYv3wmodRTts0KJh_LzE290dleZhbULDfUVLqIYwe04Oz9s-ygCZg1C7XVfUgl1DfOvDgAarE41Ljq4jl7nyFH3ZPX3MGRBj80TGebv6vs6k1HQKUWIrjy_bnY_MOTSEiy5xGm53HtU6aPzdv6SXtdunMsPB9gGJlE6Gn62fO63oJmDkl0aJjcxLryx4-MBQoRA0WfyzroYcMZfiylOqAMuZzXBYyuAmwrm7fGXxyVtuJh8VThyGaj2s_-YF3sBuogvIrI";
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
