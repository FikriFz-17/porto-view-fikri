"use client";

import { motion, type Variants } from "framer-motion";
import { Briefcase } from "lucide-react";

interface ExperienceProps {
  isDark: boolean;
}

const experienceData = [
  {
    id: 1,
    title: "Internship Trainee At Advanced Software Laboratory",
    company: "Advanced Software Engineer Lab",
    startDate: "June 2023",
    endDate: "August 2023",
  },
  {
    id: 2,
    title: "Senior Member",
    company: "Big Data Laboratory",
    startDate: "Feb 2025",
    endDate: "Jun 2025",
  },
  {
    id: 3,
    title: "Full-Stack Developer Intern",
    company: "Communication And Informatics Service Department Of Kebumen City",
    startDate: "June 2025",
    endDate: "August 2025",
  },
  {
    id: 4,
    title: "Web Programmer",
    company: "Telkom University",
    startDate: "October 2025",
    endDate: "December 2025",
  },
];

// Animasi Container Utama
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

// Animasi Item (Kiri & Kanan) dengan efek keluar
const itemVariantsLeft: Variants = {
  hidden: { opacity: 0, x: -50, scale: 0.9 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const itemVariantsRight: Variants = {
  hidden: { opacity: 0, x: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Experience({ isDark }: ExperienceProps) {
  return (
    <section
      id="experience"
      className={`relative min-h-screen py-20 px-4 sm:px-6 lg:px-8 overflow-x-hidden transition-colors duration-300 ${
        isDark ? "bg-[#0f172a]" : "bg-gray-100"
      }`}>
      <div className="max-w-5xl mx-auto">
        {/* Section Title dengan animasi scroll */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }} // Animasi ulang setiap masuk
          className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Briefcase size={32} className="text-blue-500" />
            <h2
              className={`text-4xl font-bold ${
                isDark ? "text-white" : "text-slate-800"
              }`}>
              Experience
            </h2>
          </div>
        </motion.div>

        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          // amount: 0.1 berarti animasi mulai saat 10% komponen terlihat
          // once: false agar animasi terulang saat scroll balik
          viewport={{ once: false, amount: 0.1 }}>
          {/* Garis Tengah */}
          <div
            className={`absolute left-4 sm:left-8 lg:left-1/2 lg:-translate-x-1/2 top-0 bottom-0 w-1 rounded-full ${
              isDark ? "bg-slate-700" : "bg-slate-300"
            }`}
          />

          <div className="relative">
            {experienceData.map((experience, idx) => {
              const isRight = idx % 2 === 0;

              return (
                <div key={experience.id} className="relative mb-12 last:mb-0">
                  {/* Dot Timeline */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: false }}
                    className={`absolute z-10 left-4 sm:left-8 lg:left-1/2 -translate-x-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full border-4 flex items-center justify-center transition-colors ${
                      isDark
                        ? "bg-slate-900 border-blue-500"
                        : "bg-white border-blue-700"
                    }`}>
                    <Briefcase
                      className={`w-3 h-3 sm:w-4 sm:h-4 ${
                        isDark ? "text-blue-400" : "text-blue-700"
                      }`}
                    />
                  </motion.div>

                  {/* Card Container */}
                  <motion.div
                    className={`relative ml-12 sm:ml-20 lg:ml-0 lg:w-[calc(50%-30px)] ${
                      isRight ? "lg:ml-auto" : "lg:mr-auto"
                    }`}
                    variants={isRight ? itemVariantsRight : itemVariantsLeft}>
                    {/* Panah Desktop */}
                    <div
                      className={`hidden lg:block absolute top-4 w-0 h-0 border-y-10 border-y-transparent ${
                        isRight
                          ? "-left-2.5 border-r-10 border-r-blue-600"
                          : "-right-2.5 border-l-10 border-l-blue-600"
                      }`}
                    />

                    {/* Panah Mobile */}
                    <div
                      className={`lg:hidden absolute top-3 -left-2.5 w-0 h-0 border-y-8 border-y-transparent border-r-10 ${
                        isDark ? "border-r-slate-800" : "border-r-white"
                      }`}
                    />

                    {/* Konten Card dengan Efek Hover Zoom & Scroll */}
                    <motion.div
                      whileHover={{
                        scale: 1.05,
                        x: isRight ? 10 : -10,
                        transition: { duration: 0.2 },
                      }}
                      className={`p-5 rounded-xl text-left border-l-4 cursor-default ${
                        isRight
                          ? "lg:border-l-4 lg:border-r-0"
                          : "lg:border-r-4 lg:border-l-0"
                      } shadow-lg transition-all ${
                        isDark
                          ? "bg-slate-800 border-blue-500 text-white hover:bg-slate-700"
                          : "bg-white border-blue-700 text-slate-800 hover:shadow-xl"
                      }`}>
                      <h3 className="text-lg sm:text-xl font-bold mb-1 leading-tight">
                        {experience.title}
                      </h3>
                      <p
                        className={`text-sm sm:text-base font-semibold mb-2 ${
                          isDark ? "text-blue-400" : "text-blue-700"
                        }`}>
                        {experience.company}
                      </p>
                      <p
                        className={`text-xs sm:text-sm font-medium ${
                          isDark ? "text-slate-400" : "text-slate-500"
                        }`}>
                        {experience.startDate} — {experience.endDate}
                      </p>
                    </motion.div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
