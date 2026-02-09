import { useState, useEffect, useCallback, useRef } from "react";
import { getAllProjects } from "../services/allProjectService";
import type { Project } from "../components/ProjectCard";

export const useAllProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState("All Projects");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const isInitialMount = useRef(true);

  const fetchProjects = useCallback(
    async (isMounted: boolean) => {
      if (!isInitialMount.current) {
        setLoading(true);
      }

      try {
        const { projects: data, lastPage } = await getAllProjects(
          currentPage,
          activeCategory,
        );

        if (isMounted) {
          setProjects(data);
          setTotalPages(lastPage);

          if (categories.length === 0 && data.length > 0) {
            const extracted = data.flatMap((p: Project) => p.category || []);
            // Perbaikan: Pastikan hasil Set adalah string[]
            const uniqueCategories = [
              "All Projects",
              ...(Array.from(new Set(extracted)) as string[]),
            ];
            setCategories(uniqueCategories);
          }
        }
      } catch (error) {
        console.error("Fetch Projects Error:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
          isInitialMount.current = false;
        }
      }
    },
    [currentPage, activeCategory, categories.length],
  );

  useEffect(() => {
    let isMounted = true;

    fetchProjects(isMounted);

    window.scrollTo({ top: 0, behavior: "smooth" });

    return () => {
      isMounted = false;
    };
  }, [fetchProjects]);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  return {
    projects,
    categories,
    activeCategory,
    loading,
    currentPage,
    totalPages,
    setCurrentPage,
    handleCategoryChange,
  };
};
