"use client";

import React from "react";
import { motion, useMotionValue, useTransform, type Variants } from "framer-motion";
import { Code2 } from "lucide-react";
import { useSkills } from "../hooks/useSkills";
import { type Skill } from "../services/skillService";

// --- Variabel Animasi (Dikeluarkan agar statis) ---
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
  exit: { opacity: 0, scale: 0.5, transition: { duration: 0.2 } },
};

// --- Sub-Komponen: SkillCard ---
const SkillCard: React.FC<{ skill: Skill; isDark: boolean; index: number }> = ({
  skill,
  isDark,
  index,
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-60, 60], [15, -15]);
  const rotateY = useTransform(x, [-60, 60], [-15, 15]);

  const handleMouse = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - (rect.left + rect.width / 2));
    y.set(event.clientY - (rect.top + rect.height / 2));
  };

  return (
    <motion.div
      variants={itemVariants}
      className="relative group"
      onMouseMove={handleMouse}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ perspective: 1000 }}>
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ y: -8, x: -4 }}
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.1,
        }}
        className={`relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center rounded-2xl border-[3px] transition-colors duration-300
          ${isDark ? "bg-slate-800 border-slate-700 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" : "bg-white border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"} 
          group-hover:shadow-none`}>
        <div
          className="flex flex-col items-center justify-center gap-2"
          style={{ transform: "translateZ(30px)" }}>
          <img
            src={skill.icon_url}
            alt={skill.name}
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
          />
          <div
            className={`absolute -bottom-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap px-2 py-1 rounded text-xs font-bold
            ${isDark ? "bg-white text-black" : "bg-black text-white"}`}>
            {skill.name}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- Komponen Utama ---
const Skills: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const { skills, loading, error } = useSkills();

  return (
    <section
      id="skills"
      className={`py-24 px-6 overflow-hidden transition-colors duration-500 relative ${isDark ? "bg-[#0f172a] text-white" : "bg-slate-50 text-gray-900"}`}
      style={{
        backgroundImage: `radial-gradient(${isDark ? "#1e293b" : "#e2e8f0"} 1.5px, transparent 0)`,
        backgroundSize: "30px 30px",
      }}>
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          className="flex flex-col items-center mb-16 text-center">
          <div className="flex items-center gap-3 mb-4">
            <Code2 size={32} className="text-purple-600" />
            <h2 className="text-4xl font-bold">
              My <span className="text-purple-600">Skill</span>
            </h2>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">Error: {error}</div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-3 sm:flex sm:flex-wrap justify-center gap-x-4 gap-y-12 sm:gap-10">
            {skills.map((skill, index) => (
              <SkillCard
                key={index}
                skill={skill}
                isDark={isDark}
                index={index}
              />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Skills;
