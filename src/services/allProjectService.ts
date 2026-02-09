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
        const isFilter = category && category !== "All Projects";
        const endpoint = isFilter ? "/projects/filter" : "/projects";

        const response = await api.get(endpoint, {
          params: {
            page: page,
            ...(isFilter && { "category[]": category }),
          },
        });

        const projects = response.data.data.data || response.data.data || [];
        const lastPage = response.data.data.last_page || response.data.last_page || 1;

        return { projects, lastPage };
    } catch (error : unknown) {
        let msg = "Gagal mengambil data proyek";

        if (isAxiosError(error)) {
          msg = error.response?.data?.message || error.message;
        }

        console.error("API Error:", msg);
        return { projects: [], lastPage: 1 };
    }
}
