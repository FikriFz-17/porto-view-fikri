import { api } from "../lib/axios";
import { isAxiosError } from "axios";

export interface ExperienceItem {
  id?: number | string;
  uuid?: string;
  title?: string;
  job?: string;
  company: string;
  startDate?: string;
  endDate?: string;
  start_date?: string;
  end_date?: string;
}

interface ExperiencesApiResponse {
  data: ExperienceItem[];
  meta?: {
    current_page: number;
    per_page: number;
    total_data: number;
    total_pages: number;
  };
}

export const formatExperienceDate = (dateStr?: string | null): string => {
  if (!dateStr || dateStr.trim() === "" || dateStr.startsWith("0001-01-01")) {
    return "Present";
  }
  if (dateStr.toLowerCase() === "present") {
    return "Present";
  }
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    return dateStr;
  }
  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
};

export const getExperiences = async (): Promise<ExperienceItem[]> => {
  try {
    const response = await api.get<ExperiencesApiResponse | ExperienceItem[]>(
      "/experiences",
      {
        params: { limit: 100 },
      }
    );

    if (Array.isArray(response.data)) {
      return response.data;
    }
    if (response.data && Array.isArray(response.data.data)) {
      return response.data.data;
    }
    return [];
  } catch (error: unknown) {
    let msg = "Failed to fetch experiences";
    if (isAxiosError(error)) {
      msg = error.response?.data?.message || error.message;
    }
    console.error("Experiences API Error:", msg);
    return [];
  }
};
