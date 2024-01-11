import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

export const useRecentStays = () => {
  const [searchParams] = useSearchParams();

  const daysQty = !searchParams.get("last") ? 7 : +searchParams.get("last");
  const queryDate = subDays(Date.now(), daysQty).toISOString();

  const { data: stays, isLoading: isLoadingStays } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ["stays", `last-${daysQty}`],
  });

  const confirmedStays = stays?.filter((stay) => stay.status !== "unconfirmed");

  return { stays, confirmedStays, isLoadingStays, daysQty };
};
