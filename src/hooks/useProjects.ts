// src/hooks/useProjects.ts
import { useState, useEffect, useCallback } from "react";
import { getLatestProjects } from "../services/projectService";
import type { Project } from "../components/ProjectCard";

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Gunakan useCallback agar fungsi tidak dibuat ulang setiap render
  const fetchProjects = useCallback(async (isMounted: boolean = true) => {
    if (isMounted) setLoading(true);
    try {
      const data = await getLatestProjects();
      if (isMounted) setProjects(data);
    } catch (error) {
      console.error(error);
    } finally {
      if (isMounted) setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    // Panggil fetch
    fetchProjects(isMounted);

    // Cleanup function untuk mencegah memory leak & cascading render
    return () => {
      isMounted = false;
    };
  }, [fetchProjects]);

  return { projects, loading, refetch: () => fetchProjects(true) };
};
