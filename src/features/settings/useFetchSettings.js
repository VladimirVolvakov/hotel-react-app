import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export const useFetchSettings = () => {
  const res = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  const { data: settings, isLoading, error } = res;

  return { settings, isLoading, error };
};
