"use client";

import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Footer from "./components/Footer";
import AllProjectsPage from "./sections/AllProjects";

// --- Komponen untuk Menangani Scroll ke ID ---
const ScrollHandler = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const sectionId = hash.replace("#", "");

      const scrollToTarget = () => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      };

      // 1. Scroll awal segera setelah render
      scrollToTarget();

      // 2. Koreksi posisi secara dinamis saat tinggi halaman berubah (API loading selesai)
      const resizeObserver = new ResizeObserver(() => {
        scrollToTarget();
      });

      resizeObserver.observe(document.body);

      // Berhenti mengamati setelah 3 detik untuk menghemat memori
      const timeoutId = setTimeout(() => {
        resizeObserver.disconnect();
      }, 3000);

      return () => {
        resizeObserver.disconnect();
        clearTimeout(timeoutId);
      };
    } else if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname, hash]);

  return null;
};

// --- Komponen Halaman Utama (Tanpa min-h paksaan) ---
const HomePage = ({ isDark }: { isDark: boolean }) => {
  return (
    <main>
      <section id="hero" className="min-h-screen">
        <Hero isDark={isDark} />
      </section>
      <section id="about">
        <About isDark={isDark} />
      </section>
      <section id="skills">
        <Skills isDark={isDark} />
      </section>
      <section id="projects">
        <Projects isDark={isDark} />
      </section>
      <section id="experience">
        <Experience isDark={isDark} />
      </section>
    </main>
  );
};

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    // Sinkronkan warna body dengan tema agar transisi tidak memunculkan warna putih
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      document.body.style.backgroundColor = "#0f172a";
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      document.body.style.backgroundColor = "#ffffff";
    }
  }, [isDark]);

  return (
    <BrowserRouter>
      {/* Container utama dengan warna tema yang konsisten */}
      <div
        className={`min-h-screen transition-colors duration-300 ${isDark ? "dark bg-[#0f172a]" : "bg-white"}`}>
        <ScrollHandler />
        <Navbar isDark={isDark} setIsDark={setIsDark} />

        <Routes>
          <Route path="/" element={<HomePage isDark={isDark} />} />
          <Route
            path="/projects"
            element={<AllProjectsPage isDark={isDark} />}
          />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
