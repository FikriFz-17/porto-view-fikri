// src/services/projectService.ts
import { api } from "../lib/axios";
import { isAxiosError } from "axios";
import type { Project } from "../components/ProjectCard";

export const getLatestProjects = async (): Promise<Project[]> => {
  try {
    const response = await api.get<{ data?: Project[] } | Project[]>("/projects/latest");
    if (Array.isArray(response.data)) {
      return response.data;
    }
    if (response.data && Array.isArray(response.data.data)) {
      return response.data.data;
    }
    return [];
  } catch (error: unknown) {
    let msg = "Gagal mengambil data proyek";
    if (isAxiosError(error)) {
      msg = error.response?.data?.message || error.message;
    }
    console.error("API Error:", msg);
    return []; // Fallback agar UI tidak crash
  }
};
