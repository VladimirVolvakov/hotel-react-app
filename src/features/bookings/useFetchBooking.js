import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";

export const useFetchBooking = () => {
  const { bookingId } = useParams();

  const res = useQuery({
    queryKey: ["bookings", bookingId],
    queryFn: () => getBooking(bookingId),
  });

  const { data: booking, isLoading, error } = res;

  return { booking, isLoading, error };
};
