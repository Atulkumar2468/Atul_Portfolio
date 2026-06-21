"use client";

import { PERSONAL } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-background)] border-t border-white/10">
      <div className="flex flex-col md:flex-row justify-between items-center w-full py-12 px-5 md:px-20 max-w-[1200px] mx-auto gap-6">
        <a
          href="#hero"
          className="font-[family-name:var(--font-geist)] text-2xl font-bold text-[var(--color-primary)]"
        >
          AK
        </a>

        <p className="text-[var(--color-on-surface-variant)] text-base text-center">
          Designed &amp; Developed by {PERSONAL.name} © 2026
        </p>

        <div className="flex gap-8 flex-wrap justify-center">
          <a
            href={PERSONAL.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] transition-colors font-[family-name:var(--font-mono)] text-sm"
          >
            LinkedIn
          </a>
          <a
            href={PERSONAL.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] transition-colors font-[family-name:var(--font-mono)] text-sm"
          >
            GitHub
          </a>
          <a
            href={PERSONAL.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] transition-colors font-[family-name:var(--font-mono)] text-sm"
          >
            Instagram
          </a>
          <a
            href={PERSONAL.social.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] transition-colors font-[family-name:var(--font-mono)] text-sm"
          >
            WhatsApp
          </a>
          <a
            href={PERSONAL.social.email}
            className="text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] transition-colors font-[family-name:var(--font-mono)] text-sm"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
