import { useState, useEffect } from 'react';
import { getFeatureFlag } from "@/lib/flags";

export const useFlag = (companyId: string, env: string, key: string, defaultValue: boolean = false) => {
  const [value, setValue] = useState<boolean>(defaultValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlag = async () => {
      try {
        const flagValue = await getFeatureFlag(companyId, env, key, defaultValue);
        setValue(flagValue);
      } catch (error) {
        console.error('Error fetching feature flag:', error);
        setValue(defaultValue);
      } finally {
        setLoading(false);
      }
    };

    fetchFlag();
  }, [companyId, env, key, defaultValue]);

  return { value, loading };
};
