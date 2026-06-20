"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { sendContactEmail, type ContactFormData } from "@/lib/emailjs";
import { PERSONAL } from "@/lib/constants";

export default function Contact() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await sendContactEmail(formData);
      setShowSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="py-24 md:py-32" id="contact">
        <div
          ref={ref}
          className="container mx-auto px-5 md:px-20 max-w-[1200px]"
        >
          <div className="grid md:grid-cols-2 gap-16 md:gap-20">
            {/* Left — Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="space-y-12"
            >
              <h2 className="font-[family-name:var(--font-geist)] text-3xl md:text-[32px] font-semibold leading-tight">
                Drop me a{" "}
                <span className="text-[var(--color-primary)]">line.</span>
              </h2>

              <div className="space-y-6">
                <a
                  href={`mailto:${PERSONAL.email}`}
                  className="flex items-center gap-4 group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[var(--color-primary)]/20 transition-all">
                    <span className="material-symbols-outlined text-[var(--color-primary)]">
                      mail
                    </span>
                  </div>
                  <span className="text-lg">{PERSONAL.email}</span>
                </a>

                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[var(--color-primary)]/20 transition-all">
                    <span className="material-symbols-outlined text-[var(--color-primary)]">
                      location_on
                    </span>
                  </div>
                  <span className="text-lg">{PERSONAL.location}</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                <a
                  href={PERSONAL.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 glass-card rounded-full flex items-center justify-center hover:text-[var(--color-primary)] transition-colors"
                  aria-label="GitHub"
                >
                  <span className="material-symbols-outlined">terminal</span>
                </a>
                <a
                  href={PERSONAL.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 glass-card rounded-full flex items-center justify-center hover:text-[var(--color-primary)] transition-colors"
                  aria-label="LinkedIn"
                >
                  <span className="material-symbols-outlined">
                    business_center
                  </span>
                </a>
                <a
                  href={PERSONAL.social.email}
                  className="w-12 h-12 glass-card rounded-full flex items-center justify-center hover:text-[var(--color-primary)] transition-colors"
                  aria-label="Email"
                >
                  <span className="material-symbols-outlined">
                    alternate_email
                  </span>
                </a>
              </div>
            </motion.div>

            {/* Right — Contact Form */}
            <motion.form
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-[family-name:var(--font-mono)] text-[var(--color-on-surface-variant)] tracking-wider">
                    NAME
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-transparent border-b border-white/10 focus:border-[var(--color-primary)] transition-all py-3 outline-none"
                    id="contact-name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-[family-name:var(--font-mono)] text-[var(--color-on-surface-variant)] tracking-wider">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-transparent border-b border-white/10 focus:border-[var(--color-primary)] transition-all py-3 outline-none"
                    id="contact-email"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-[family-name:var(--font-mono)] text-[var(--color-on-surface-variant)] tracking-wider">
                  SUBJECT
                </label>
                <input
                  type="text"
                  placeholder="Project inquiry"
                  required
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full bg-transparent border-b border-white/10 focus:border-[var(--color-primary)] transition-all py-3 outline-none"
                  id="contact-subject"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-[family-name:var(--font-mono)] text-[var(--color-on-surface-variant)] tracking-wider">
                  MESSAGE
                </label>
                <textarea
                  placeholder="Tell me about your project..."
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full bg-transparent border-b border-white/10 focus:border-[var(--color-primary)] transition-all py-3 outline-none resize-none"
                  id="contact-message"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[var(--color-primary)] text-[var(--color-on-primary)] font-bold rounded-xl hover:scale-[0.98] transition-transform disabled:opacity-50"
                id="contact-submit"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Success Toast */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[300] glass-card px-8 py-4 rounded-2xl flex items-center gap-3 shadow-2xl"
          >
            <span className="material-symbols-outlined text-[var(--color-tertiary)]">
              check_circle
            </span>
            <span className="font-medium">
              Message sent! I&apos;ll get back to you soon.
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
