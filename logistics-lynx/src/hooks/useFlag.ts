import { useQuery } from "@tanstack/react-query";
import { resolveFlag } from "@/lib/flags";

export function useFlag(companyId: string, env: string, key: string, def = false) {
  const { data, isLoading } = useQuery({
    queryKey: ["flag", companyId, env, key],
    queryFn: () => resolveFlag(companyId, env, key),
    staleTime: 10_000,
  });
  return { value: data?.value ?? def, loading: isLoading, resolved: data };
}
