import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookings } from "../../services/apiBookings";

export const useFetchBookingsData = () => {
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : {
          field: "status",
          value: filterValue,
        };

  const sortByValue = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByValue.split("-");
  const sortBy = { field, direction };

  const res = useQuery({
    queryKey: ["bookings", filter, sortBy],
    queryFn: () => getBookings({ filter, sortBy }),
  });

  const { data: bookings, isLoading, error } = res;

  return { bookings, isLoading, error };
};
