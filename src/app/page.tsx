"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import CursorGlow from "@/components/CursorGlow";
import AnimatedBackground from "@/components/AnimatedBackground";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";
import { initEmailJS } from "@/lib/emailjs";

// Lazy-load heavier sections for performance
const Certifications = dynamic(
  () => import("@/components/sections/Certifications"),
  { ssr: false }
);
const Appointment = dynamic(
  () => import("@/components/sections/Appointment"),
  { ssr: false }
);

export default function Home() {
  useEffect(() => {
    initEmailJS();
  }, []);

  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <AnimatedBackground />
      <Navbar />

      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Certifications />
        <Appointment />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
