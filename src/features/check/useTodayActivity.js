import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export const useTodayActivity = () => {
  const { data: stays, isLoading: isLoadingStays } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ["stays-today-activity"],
  });

  return { stays, isLoadingStays };
};
