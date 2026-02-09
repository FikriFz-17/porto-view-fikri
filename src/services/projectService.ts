// src/services/projectService.ts
import { api } from "../lib/axios";
import { isAxiosError } from "axios";
import type { Project } from "../components/ProjectCard";

export const getLatestProjects = async (): Promise<Project[]> => {
  try {
    const { data } = await api.get<{ data: Project[] }>("/projects/latest");
    return data.data || [];
  } catch (error: unknown) {
    let msg = "Gagal mengambil data proyek";
    if (isAxiosError(error)) {
      msg = error.response?.data?.message || error.message;
    }
    console.error("API Error:", msg);
    return []; // Fallback agar UI tidak crash
  }
};
