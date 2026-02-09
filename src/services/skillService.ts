import { api } from "../lib/axios";
import { isAxiosError } from "axios";

export interface Skill {
  name: string;
  icon_url: string;
  color?: string;
}

export const getSkills = async (): Promise<Skill[]> => {
  try {
    const { data } = await api.get<Skill[]>("/skills");
    return data;
  } catch (error: unknown) {
    let msg = "Failed to fetch skills";
    if (isAxiosError(error)) {
      msg = error.response?.data?.message || error.message;
    }
    throw new Error(msg);
  }
};
