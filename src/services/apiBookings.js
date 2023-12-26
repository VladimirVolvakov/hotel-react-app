import supabase from "./supabase";

export const getBookings = async () => {
  const { data: bookings, error } = await supabase
    .from("bookings")
    .select("*, cabins(name), guests(fullName, email)");

  if (error) {
    console.error(error.message);
    throw new Error("Cannot get bookings data... Please try later...");
  }

  return bookings;
};
