import supabase from "./supabase";

export const getBookings = async ({ filter, sortBy }) => {
  let query = supabase
    .from("bookings")
    .select("*, cabins(name), guests(fullName, email)");

  if (filter) {
    const { field, value, method } = filter;
    query = query[method || "eq"](field, value);
  }

  if (sortBy) {
    const { field, direction } = sortBy;
    query = query.order(field, { ascending: direction === "asc" });
  }

  const { data: bookings, error } = await query;

  if (error) {
    console.error(error.message);
    throw new Error("Cannot get bookings data... Please try later...");
  }

  return bookings;
};
