import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

export const useRecentBookings = () => {
  const [searchParams] = useSearchParams();

  const daysQty = !searchParams.get("last") ? 7 : +searchParams.get("last");
  const queryDate = subDays(new Date(), daysQty).toISOString();

  const { data: bookings, isLoading: isLoadingBookings } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ["bookings", `last-${daysQty}`],
  });

  return { bookings, isLoadingBookings };
};
