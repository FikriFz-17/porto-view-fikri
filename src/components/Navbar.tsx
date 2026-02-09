/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";

const Navbar = ({
  isDark,
  setIsDark,
}: {
  isDark: boolean;
  setIsDark: (v: boolean) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const { pathname} = useLocation();

  const navLinks = [
    { name: "Home", href: "/#hero" },
    { name: "About", href: "/#about" },
    { name: "Skills", href: "/#skills" },
    { name: "Projects", href: "/#projects" },
    { name: "Experience", href: "/#experience" },
  ];

  // Scroll Spy Logic
  useEffect(() => {
    if (pathname !== "/") return;
    const handleScroll = () => {
      const sections = navLinks.map((l) => l.href.split("#")[1]);
      let current = "hero";
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && el.getBoundingClientRect().top <= 200) current = section;
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return (
    <>
      <nav
        className={`fixed w-full top-0 left-0 z-50 transition-all ${isDark ? "bg-[#0f172a]/80 backdrop-blur-md shadow-black/20" : "bg-white/80 backdrop-blur-md shadow-sm"}`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          <Link
            to="/#hero"
            className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-800"}`}>
            Fikri Fauzi
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const sectionId = link.href.split("#")[1];
              const isActive = pathname === "/" && activeSection === sectionId;

              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-sm font-semibold relative py-2 transition-colors group ${
                    isActive
                      ? isDark
                        ? "text-blue-400"
                        : "text-blue-600"
                      : isDark
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-700 hover:text-blue-600"
                  }`}>
                  {link.name}

                  {/* Garis Bawah dengan Animasi Hover */}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 ease-in-out ${
                      isActive ? "w-full" : "w-0 group-hover:w-full" // Garis melebar saat link di-hover
                    } ${isDark ? "bg-blue-400" : "bg-blue-600"}`}
                  />
                </Link>
              );
            })}
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-full">
              {isDark ? (
                <Sun size={18} className="text-yellow-400" />
              ) : (
                <Moon size={18} />
              )}
            </button>
          </div>

          <div className="md:hidden flex gap-2">
            <button onClick={() => setIsDark(!isDark)}>
              {isDark ? (
                <Sun size={20} className="text-yellow-400" />
              ) : (
                <Moon size={20} />
              )}
            </button>
            <button onClick={() => setIsOpen(true)}>
              <Menu
                size={24}
                className={isDark ? "text-white" : "text-gray-800"}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 z-100 transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"} ${isDark ? "bg-[#0f172a]" : "bg-white"}`}>
        <div className="flex justify-end p-4">
          <button onClick={() => setIsOpen(false)}>
            <X size={24} className={isDark ? "text-white" : "text-gray-800"} />
          </button>
        </div>
        <div className="flex flex-col px-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setIsOpen(false)}
              className={`text-lg font-semibold py-2 px-4 rounded-lg ${pathname === "/" && activeSection === link.href.split("#")[1] ? "bg-blue-500/10 text-blue-400" : isDark ? "text-gray-300" : "text-gray-700"}`}>
              {link.name}
            </Link>
          ))}
        </div>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-90"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};
export default Navbar;
