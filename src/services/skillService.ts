import { api } from "../lib/axios";
import { isAxiosError } from "axios";

export interface Skill {
  uuid?: string;
  name: string;
  icon_url: string;
  color?: string;
}

interface SkillsApiResponse {
  data: Skill[];
  meta?: {
    current_page: number;
    per_page: number;
    total_data: number;
    total_pages: number;
  };
}

export const getSkills = async (): Promise<Skill[]> => {
  try {
    const response = await api.get<SkillsApiResponse | Skill[]>("/skills", {
      params: { limit: 100 },
    });

    if (Array.isArray(response.data)) {
      return response.data;
    }
    if (response.data && Array.isArray(response.data.data)) {
      return response.data.data;
    }
    return [];
  } catch (error: unknown) {
    let msg = "Failed to fetch skills";
    if (isAxiosError(error)) {
      msg = error.response?.data?.message || error.message;
    }
    console.error("API Error:", msg);
    return [];
  }
};

