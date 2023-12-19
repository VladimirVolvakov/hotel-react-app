import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export const useFetchCabinData = () => {
  const res = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  const { data: cabins, isLoading, error } = res;

  return { cabins, isLoading, error };
};
