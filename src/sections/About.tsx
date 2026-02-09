"use client";

import type React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import { User, ChevronRight } from "lucide-react";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.4 },
  },
};

const leftVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8 },
  },
  exit: {
    opacity: 0,
    x: -30,
    transition: { duration: 0.5 },
  },
};

const rightVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, delay: 0.2 },
  },
  exit: {
    opacity: 0,
    x: 30,
    transition: { duration: 0.5 },
  },
};

const About: React.FC<{ isDark: boolean }> = ({ isDark }) => {
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
      id="about"
      className={`py-20 px-6 overflow-hidden transition-colors duration-500 ${
        isDark ? "bg-[#0f172a] text-white" : "bg-white text-gray-900"
      }`}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          className="flex justify-center items-center gap-3 mb-16">
          <User size={32} className={isDark ? "text-white" : "text-gray-900"} />
          <h2 className="text-4xl font-bold tracking-tight">
            About <span className="text-purple-600">Me</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Bagian Foto dengan Animasi 3D & Hover Color */}
          <motion.div
            variants={leftVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="flex justify-center">
            <motion.div
              style={{ rotateX, rotateY, perspective: 1000 }}
              onMouseMove={handleMouse}
              onMouseLeave={handleMouseLeave}
              className="relative group w-full max-w-87.5 aspect-square">
              {/* Shadow/Glow Background */}
              <div className="absolute -inset-2 bg-linear-to-r from-purple-600 to-blue-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition duration-500"></div>

              <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-2xl border-4 border-white dark:border-slate-800">
                <motion.img
                  src="Fikri.jpg"
                  alt="Fikri Fauzi About"
                  className="w-full h-full object-cover transition duration-500 grayscale group-hover:grayscale-0 scale-105 group-hover:scale-110"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Bagian Konten Teks dengan Animasi Masuk */}
          <motion.div
            variants={rightVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-3xl font-bold">I'm Fikri Fauzi</h3>
              <p className="text-blue-700 dark:text-blue-400 font-bold text-lg uppercase tracking-wide">
                Web Developer & Machine Learning Enthusiast
              </p>
            </div>

            <p
              className={`text-lg leading-relaxed ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}>
              I am an undergraduate student in Informatics at Telkom University.
              Highly motivated to keep learning, able to think critically, and
              able to communicate well. I have an interest in information
              technology, particularly in Artificial Intelligence and Web
              Development.
            </p>

            <div className="space-y-3 pt-2">
              <p className="flex items-center gap-2 text-lg">
                <span className="font-bold text-blue-600 dark:text-blue-400">
                  Email :
                </span>
                <span>fikri36987@gmail.com</span>
              </p>
              <p className="flex items-center gap-2 text-lg">
                <span className="font-bold text-blue-600 dark:text-blue-400">
                  Place :
                </span>
                <span>Bandung, West Java - Indonesia</span>
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-blue-700/30 transition-all mt-6">
              Download CV <ChevronRight size={20} />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
