"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Github, Eye, Building2, Calendar } from "lucide-react";

// --- Types ---
export interface Project {
  id: number;
  title: string;
  company: string;
  description: string;
  tech_stack: string[];
  category: string[];
  start_date: string;
  end_date: string;
  image_url: string;
  repo_url: string;
  live_url: string;
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, type: "spring", stiffness: 100 },
  },
};

const ProjectCard: React.FC<{ project: Project; isDark: boolean }> = ({
  project,
  isDark,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={itemVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group cursor-pointer">
      <div
        className={`relative flex flex-col h-full border-2 transition-all duration-300 overflow-hidden ${
          isDark
            ? "bg-slate-800/50 border-slate-700 hover:border-slate-500 shadow-2xl shadow-black/20"
            : "bg-white border-gray-200 hover:border-gray-300 shadow-xl shadow-gray-200/50"
        }`}>
        {/* Image Container */}
        <div
          className={`relative h-55 overflow-hidden flex items-center justify-center transition-all duration-500 ${
            isDark ? "bg-slate-900" : "bg-gray-100"
          } p-4 md:p-0`}>
          <motion.img
            src={project.image_url}
            alt={project.title}
            className="w-full h-full object-contain md:object-cover transition-transform duration-700 z-10"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://via.placeholder.com/400x300?text=No+Image";
            }}
          />

          <div className="absolute inset-0 hidden md:block bg-linear-to-t from-black/60 via-transparent to-transparent z-20" />

          {!isDark && (
            <div
              className="absolute inset-0 opacity-10 md:hidden bg-center bg-cover filter blur-xl scale-110"
              style={{ backgroundImage: `url(${project.image_url})` }}
            />
          )}
        </div>

        {/* Content Container */}
        <div className="relative p-6 flex flex-col grow min-h-50">
          <div className="mb-3">
            <h3
              className={`text-xl font-bold tracking-tight mb-1 ${isDark ? "text-white" : "text-slate-900"}`}>
              {project.title}
            </h3>
            <div className="flex items-center gap-2">
              <Building2
                size={14}
                className={isDark ? "text-purple-500" : "text-slate-900"}
              />
              <span
                className={`text-sm font-medium ${isDark ? "text-slate-200" : "text-slate-600"}`}>
                {project.company || "Personal Project"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <Calendar
              size={14}
              className={isDark ? "text-purple-500" : "text-slate-900"}
            />
            <span
              className={`text-xs ${isDark ? "text-slate-200" : "text-slate-500"}`}>
              {project.start_date
                ? new Date(project.start_date).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : "05 Jan 2026"}
              {" - "}
              {project.end_date
                ? new Date(project.end_date).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : "Present"}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech_stack.map((tech, index) => (
              <span
                key={index}
                className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border ${
                  isDark
                    ? "bg-slate-800 text-slate-200 border-slate-700"
                    : "bg-gray-100 text-slate-600 border-gray-200"
                }`}>
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-auto grid grid-cols-2 gap-3 z-10">
            {/* Link Live View */}
            {project.live_url ? (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded text-xs font-bold transition-all duration-300 ${
                  isDark
                    ? "bg-purple-600 hover:bg-purple-500 text-white"
                    : "bg-black text-white hover:bg-slate-800"
                }`}>
                <Eye size={14} /> View
              </a>
            ) : (
              <div
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded text-xs font-bold cursor-not-allowed opacity-50 border ${
                  isDark
                    ? "bg-slate-800 border-slate-700 text-slate-500"
                    : "bg-gray-100 border-gray-200 text-gray-400"
                }`}>
                <Eye size={14} /> Deprecated
              </div>
            )}

            {/* Link Repository / Code */}
            {project.repo_url ? (
              <a
                href={project.repo_url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded text-xs font-bold transition-all duration-300 ${
                  isDark
                    ? "bg-purple-600 hover:bg-purple-500 text-white"
                    : "bg-black text-white hover:bg-slate-800"
                }`}>
                <Github size={14} /> Code
              </a>
            ) : (
              <div
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded text-xs font-bold cursor-not-allowed opacity-50 border ${
                  isDark
                    ? "bg-slate-800 border-slate-700 text-slate-500"
                    : "bg-gray-100 border-gray-200 text-gray-400"
                }`}>
                <Github size={14} /> Deprecated
              </div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            className={`absolute top-0 left-0 right-0 bottom-15 p-6 flex flex-col z-0 ${
              isDark ? "bg-slate-900/98" : "bg-white/98"
            }`}
            style={{ pointerEvents: isHovered ? "auto" : "none" }}>
            <h4
              className={`text-xs font-bold mb-2 uppercase tracking-widest ${isDark ? "text-purple-400" : "text-slate-900"}`}>
              Project Description
            </h4>
            <div className="overflow-y-auto pr-2 scrollbar-thin">
              <p
                className={`text-xs leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                {project.description}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
