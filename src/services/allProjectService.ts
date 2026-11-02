import { api } from "../lib/axios";
import { isAxiosError } from "axios";
import type { Project } from "../components/ProjectCard";

// Interface
export interface GetAllProjectsResponse {
  projects: Project[];
  lastPage: number;
}

export const getAllProjects = async (page: number = 1, category?: string) => {
  try {
    const response = await api.get("/projects", {
      params: {
        page: page,
        limit: 9,
      },
    });

    const rawData = response.data;
    const rawProjects: Project[] = Array.isArray(rawData?.data)
      ? rawData.data
      : Array.isArray(rawData?.data?.data)
      ? rawData.data.data
      : [];

    const meta = rawData?.meta;
    const lastPage =
      meta?.total_pages ||
      rawData?.data?.last_page ||
      rawData?.last_page ||
      1;

    const isFilter = category && category !== "All Projects";
    const filteredProjects = isFilter
      ? rawProjects.filter((p) =>
          Array.isArray(p.category)
            ? p.category.includes(category)
            : p.category === category
        )
      : rawProjects;

    return { projects: filteredProjects, lastPage };
  } catch (error: unknown) {
    let msg = "Gagal mengambil data proyek";

    if (isAxiosError(error)) {
      msg = error.response?.data?.message || error.message;
    }

    console.error("API Error:", msg);
    return { projects: [], lastPage: 1 };
  }
};
