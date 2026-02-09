"use client";

import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, ChevronLeft, ChevronRight } from "lucide-react";
import ProjectCard from "../components/ProjectCard";
import { useAllProjects } from "../hooks/useAllProject";

export default function AllProjectsPage({ isDark }: { isDark: boolean }) {
  // Ambil semua state dan fungsi kontrol dari Custom Hook kita
  const {
    projects,
    categories,
    activeCategory,
    loading,
    currentPage,
    totalPages,
    setCurrentPage,
    handleCategoryChange,
  } = useAllProjects();

  return (
    <div
      className={`min-h-screen pt-32 pb-20 px-4 md:px-6 transition-colors duration-300 ${
        isDark ? "bg-[#020617]" : "bg-gray-50"
      }`}>
      <div className="max-w-7xl mx-auto">
        {/* --- Header Section --- */}
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-6">
            <LayoutGrid size={36} className="text-blue-500" />
            <h1
              className={`text-4xl md:text-5xl font-extrabold ${
                isDark ? "text-white" : "text-slate-900"
              }`}>
              Projects <span className="text-yellow-400">Made</span>
            </h1>
          </motion.div>

          {/* --- Filter Buttons --- */}
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-6 py-2 rounded-md text-sm font-bold transition-all border-2 ${
                  activeCategory === cat
                    ? "bg-white text-slate-900 border-white shadow-lg scale-105"
                    : isDark
                      ? "bg-slate-900/40 text-white border-slate-700 hover:border-purple-500"
                      : "bg-white text-slate-600 border-gray-200 hover:border-black"
                }`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* --- Project Grid Area --- */}
        <div className="min-h-100">
          {loading ? (
            <div className="flex flex-col justify-center items-center py-20 gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
              <p className="text-slate-500 animate-pulse">
                Loading amazing projects...
              </p>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {projects.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{
                      opacity: 0,
                      scale: 0.8,
                      transition: { duration: 0.2 },
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    }}>
                    <ProjectCard project={project} isDark={isDark} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {!loading && projects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-500 text-lg">
                No projects found in this category.
              </p>
            </div>
          )}
        </div>

        {/* --- Pagination Controls --- */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-6 mt-20">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className={`p-3 rounded-full border-2 transition-all ${
                currentPage === 1
                  ? "opacity-20 cursor-not-allowed border-slate-500"
                  : "hover:bg-purple-500 border-purple-500 text-purple-500 hover:text-white"
              }`}>
              <ChevronLeft size={24} />
            </button>

            <span
              className={`text-lg font-bold ${
                isDark ? "text-white" : "text-slate-900"
              }`}>
              {currentPage} / {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className={`p-3 rounded-full border-2 transition-all ${
                currentPage === totalPages
                  ? "opacity-20 cursor-not-allowed border-slate-500"
                  : "hover:bg-purple-500 border-purple-500 text-purple-500 hover:text-white"
              }`}>
              <ChevronRight size={24} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
