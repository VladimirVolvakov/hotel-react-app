import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookings } from "../../services/apiBookings";
import { QTY_PER_PAGE } from "../../utils/constants";

export const useFetchBookingsData = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // Filtering bookings:
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : {
          field: "status",
          value: filterValue,
        };

  // Sorting bookings:
  const sortByValue = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByValue.split("-");
  const sortBy = { field, direction };

  // Pagination:
  const currentPageNum = !searchParams.get("page")
    ? 1
    : +searchParams.get("page");

  // Query:
  const res = useQuery({
    queryKey: ["bookings", filter, sortBy, currentPageNum],
    queryFn: () => getBookings({ filter, sortBy, currentPageNum }),
  });

  const { data: { bookings, count } = {}, isLoading, error } = res;

  // Pre-fetching bookings data:
  const pagesQty = Math.ceil(count / QTY_PER_PAGE);

  if (currentPageNum < pagesQty) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, currentPageNum + 1],
      queryFn: () =>
        getBookings({ filter, sortBy, currentPageNum: currentPageNum + 1 }),
    });
  }

  if (currentPageNum > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, currentPageNum - 1],
      queryFn: () =>
        getBookings({ filter, sortBy, currentPageNum: currentPageNum - 1 }),
    });
  }

  return { bookings, count, isLoading, error };
};
