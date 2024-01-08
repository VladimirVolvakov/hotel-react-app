import { useQuery } from "@tanstack/react-query";
import { getAuthenticatedUser } from "../../services/apiAuthentification";

export const useFetchUser = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getAuthenticatedUser,
  });

  return {
    user,
    isLoading,
    isAuthentificated: user?.role === "authenticated",
  };
};
