import { useState, useEffect, useCallback } from "react";
import {
  getExperiences,
  type ExperienceItem,
} from "../services/experienceService";

export const useExperiences = () => {
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExperiences = useCallback(async (isMounted: boolean = true) => {
    if (isMounted) setLoading(true);
    try {
      const data = await getExperiences();
      if (isMounted) {
        setExperiences(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      if (isMounted) {
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    } finally {
      if (isMounted) setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    fetchExperiences(isMounted);

    return () => {
      isMounted = false;
    };
  }, [fetchExperiences]);

  return { experiences, loading, error, refetch: () => fetchExperiences(true) };
};
