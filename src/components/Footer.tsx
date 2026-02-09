"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Mail, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    { Icon: Github, href: "https://github.com/FikriFz-17", label: "Github" },
    {
      Icon: Linkedin,
      href: "https://www.linkedin.com/in/fikri-fauzi-a08588258/",
      label: "LinkedIn",
    },
    {
      Icon: Instagram,
      href: "https://www.instagram.com/fikrisyoru/",
      label: "Instagram",
    },
    {
      Icon: Mail,
      href: "https://mail.google.com/mail/?view=cm&fs=1&to=fikri36987@gmail.com",
      label: "Email",
    },
  ];

  return (
    <footer className="relative w-full border-t border-slate-800 bg-[#020617] text-slate-400 transition-colors duration-700">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Bagian Kiri: Brand & Bio Singkat */}
          <div className="space-y-3 text-center md:text-left">
            <h2 className="text-2xl font-bold tracking-tighter text-white">
              Fikri<span className="text-orange-500"> Fauzi</span>
            </h2>
            <p className="text-sm leading-relaxed max-w-xs">
              AI Engineer & Web Developer 
            </p>
          </div>

          {/* Bagian Kanan: Social Media & Back to Top */}
          <div className="flex flex-col items-center md:items-end gap-5">
            <div className="flex gap-4">
              {socialLinks.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all shadow-lg shadow-black/20"
                  aria-label={label}>
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>

            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition-all">
              Back to top
              <span className="p-1.5 rounded-full border border-slate-700 group-hover:border-white group-hover:-translate-y-1 transition-all">
                <ArrowUp size={12} />
              </span>
            </button>
          </div>
        </div>

        {/* Garis Pemisah & Copyright */}
        <div className="mt-10 pt-8 border-t border-slate-800/50 flex flex-col md:flex-row justify-center items-center gap-4">
          <p className="text-xs tracking-wide">
            © 2026 Fikri Fauzi. Built with{" "}
            <span className="text-red-500 animate-pulse">❤</span> Laravel and React.
          </p>
        </div>
      </div>

      {/* Efek Cahaya Latar (Subtle Glow) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-20 bg-blue-500/5 blur-[100px] pointer-events-none" />
    </footer>
  );
}
