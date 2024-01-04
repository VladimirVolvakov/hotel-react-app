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

  const currentPageNum = !searchParams.get("page")
    ? 1
    : +searchParams.get("page");

  const res = useQuery({
    queryKey: ["bookings", filter, sortBy, currentPageNum],
    queryFn: () => getBookings({ filter, sortBy, currentPageNum }),
  });

  const { data: { bookings, count } = {}, isLoading, error } = res;

  return { bookings, count, isLoading, error };
};
