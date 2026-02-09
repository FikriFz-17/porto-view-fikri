"use client";

import type React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { Github, Linkedin, Instagram, ArrowDownCircle } from "lucide-react";
// Import animasi partikel
import Particles from "@/animations/Particle";

interface HeroProps {
  isDark: boolean;
}

// Variants tetap sama seperti milikmu
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const photoVariants: Variants = {
  hidden: { scale: 0.8, opacity: 0, rotate: -5 },
  visible: {
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
};

// Data sosial media (tanpa logika string isDark agar tidak error)
const socialLinks = [
  {
    Icon: Github,
    href: "https://github.com/FikriFz-17",
    brandColor: "hover:text-white",
    brandBorder: "hover:border-white",
    brandBg: "hover:bg-white/10",
  },
  {
    Icon: Linkedin,
    href: "https://www.linkedin.com/in/fikri-fauzi-a08588258/",
    brandColor: "hover:text-[#0077b5]",
    brandBorder: "hover:border-[#0077b5]",
    brandBg: "hover:bg-[#0077b5]/10",
  },
  {
    Icon: Instagram,
    href: "https://www.instagram.com/fikrisyoru/",
    brandColor: "hover:text-[#e1306c]",
    brandBorder: "hover:border-[#e1306c]",
    brandBg: "hover:bg-[#e1306c]/10",
  },
];

const Hero = ({ isDark }: HeroProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  function handleMouse(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <section
      id="hero"
      className={`relative min-h-screen flex items-center justify-center px-6 pt-20 pb-10 overflow-hidden transition-colors duration-700 ${
        isDark ? "bg-[#020617]" : "bg-[#f8fafc] text-gray-900"
      }`}>
      {/* BACKGROUND LAYER - DYNAMICS */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {isDark ? (
          <>
            {/* Animasi Partikel Aktif di Dark Mode */}
            <Particles
              particleColors={["#ffffff", "#3b82f6", "#93c5fd"]}
              particleCount={800} 
              particleSpread={12}
              speed={0.12}
              particleBaseSize={200} 
              moveParticlesOnHover={true}
              alphaParticles={true}
            />
            {/* Grid subtle tetap ada di atas partikel */}
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-size-[40px_40px]" />
          </>
        ) : (
          /* Mode Terang: Background Blur Milikmu */
          <>
            <div className="absolute -top-1/2 -right-1/2 w-full h-full rounded-full blur-3xl bg-blue-100/50" />
            <div className="absolute -bottom-1/2 -left-1/2 w-full h-full rounded-full blur-3xl bg-orange-50/50" />
          </>
        )}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center z-10 px-2 sm:px-4">
        {/* Konten Kiri */}
        <div
          className={`space-y-6 order-2 md:order-1 text-center md:text-left ${isDark ? "text-white" : "text-gray-900"}`}>
          <div className="space-y-2">
            <motion.h2
              variants={itemVariants}
              className="text-2xl sm:text-3xl md:text-4xl font-bold italic opacity-70">
              Hi There,
            </motion.h2>
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight">
              I'm <span className="text-orange-500">Fikri</span>{" "}
              <span className={isDark ? "text-slate-100" : "text-orange-600"}>
                Fauzi
              </span>
            </motion.h1>
            <motion.div
              variants={itemVariants}
              className="text-lg sm:text-xl md:text-2xl font-semibold flex items-center justify-center md:justify-start gap-2">
              <span className="opacity-80">I Am Into</span>{" "}
              <span className="text-red-500">
                <Typewriter
                  words={["Machine Learning", "Web Developer", "AI Engineer"]}
                  loop={0}
                  cursor
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1500}
                />
              </span>
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="flex justify-center md:justify-start">
            <motion.a
              href="#about"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-full font-bold shadow-xl transition-all cursor-pointer">
              About Me <ArrowDownCircle size={20} />
            </motion.a>
          </motion.div>

          {/* Social Icons - Perbaikan Logika Warna */}
          <motion.div
            variants={itemVariants}
            className="flex gap-4 pt-4 justify-center md:justify-start">
            {socialLinks.map(
              ({ Icon, href, brandColor, brandBorder, brandBg }, i) => {
                // Logika khusus untuk Github di Mode Terang agar tetap hitam
                const isGithub = i === 0;
                const hoverStyles =
                  isGithub && !isDark
                    ? "hover:text-black hover:border-black hover:bg-black/5"
                    : `${brandColor} ${brandBorder} ${brandBg}`;

                return (
                  <motion.a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -4, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 rounded-full transition-all duration-300 border border-transparent ${hoverStyles} ${
                      isDark
                        ? "bg-slate-900 border-slate-800 text-slate-300 shadow-lg shadow-black/20"
                        : "bg-gray-200 text-gray-800 shadow-md shadow-gray-200"
                    }`}>
                    <Icon size={22} />
                  </motion.a>
                );
              },
            )}
          </motion.div>
        </div>

        {/* Konten Kanan (Foto profil dengan efek 3D tetap dipertahankan) */}
        <motion.div
          variants={photoVariants}
          className="flex justify-center order-1 md:order-2">
          <motion.div
            style={{ rotateX, rotateY, perspective: 1000 }}
            onMouseMove={handleMouse}
            onMouseLeave={handleMouseLeave}
            className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
            <motion.div
              animate={{ opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className={`absolute inset-0 rounded-full blur-3xl ${isDark ? "bg-blue-400" : "bg-blue-500"}`}
            />
            <img
              src="foto.jpg"
              alt="Fikri Fauzi"
              className={`relative w-full h-full object-cover rounded-full border-4 shadow-2xl z-20 transition-colors duration-700 ${
                isDark
                  ? "border-slate-800 bg-slate-900"
                  : "border-white bg-white"
              }`}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`w-5 h-9 rounded-full border-2 flex justify-center p-1 ${isDark ? "border-slate-700" : "border-gray-400"}`}>
          <div
            className={`w-1 h-1 rounded-full ${isDark ? "bg-slate-500" : "bg-gray-500"}`}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
