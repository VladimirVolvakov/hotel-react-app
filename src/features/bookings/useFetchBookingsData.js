import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";

export const useFetchBookingsData = () => {
  const res = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });

  const { data: bookings, isLoading, error } = res;

  return { bookings, isLoading, error };
};
