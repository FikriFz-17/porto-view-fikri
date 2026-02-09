"use client";

import { motion, type Variants } from "framer-motion";
import { FolderGit2 } from "lucide-react";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import { useProjects } from "../hooks/useProjects";

// Deklarasikan variants di sini agar tidak ada error "Cannot find module"
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

export default function Projects({ isDark }: { isDark: boolean }) {
  const { projects, loading } = useProjects();

  return (
    <section
      id="projects"
      className={`py-20 px-4 md:px-6 ${isDark ? "bg-[#020617]" : "bg-gray-50"}`}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          className="flex justify-center items-center gap-3 mb-16">
          <FolderGit2 size={32} className="text-blue-500" />
          <h2
            className={`text-4xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
            My <span className="text-purple-600">Projects</span>
          </h2>
        </motion.div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-500 italic">Memuat Proyek...</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Filter hanya 6 project terbaru untuk ditampilkan di landing page */}
            {projects.slice(0, 6).map((project) => (
              <ProjectCard key={project.id} project={project} isDark={isDark} />
            ))}
          </motion.div>
        )}

        {!loading && projects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 flex justify-center">
            <Link
              to="/projects"
              className={`group flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all duration-300 ${
                isDark
                  ? "bg-slate-800 text-white hover:ring-2 hover:ring-purple-500 shadow-md"
                  : "bg-white text-slate-900 border border-gray-200 hover:ring-2 hover:ring-black shadow-md"
              }`}>
              <span>View All Projects</span>
              <FolderGit2
                size={18}
                className="text-purple-500 group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
