import { QTY_PER_PAGE } from "../utils/constants";
import supabase from "./supabase";

export const getBookings = async ({ filter, sortBy, currentPageNum }) => {
  let query = supabase
    .from("bookings")
    .select("*, cabins(name), guests(fullName, email)", {
      count: "exact",
    });

  if (filter) {
    const { field, value, method } = filter;
    query = query[method || "eq"](field, value);
  }

  if (sortBy) {
    const { field, direction } = sortBy;
    query = query.order(field, { ascending: direction === "asc" });
  }

  if (currentPageNum) {
    const startIndex = (currentPageNum - 1) * QTY_PER_PAGE;
    const finalIndex = currentPageNum * QTY_PER_PAGE - 1;
    query = query.range(startIndex, finalIndex);
  }

  const { data: bookings, error, count } = await query;

  if (error) {
    console.error(error.message);
    throw new Error("Cannot get bookings data... Please try later...");
  }

  return { bookings, count };
};

export const getBooking = async (id) => {
  let { data: booking, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error.message);
    throw new Error("Cannot get this booking data... Please try later...");
  }

  return booking;
};

export const updateBooking = async (id, object) => {
  const { data, error } = await supabase
    .from("bookings")
    .update(object)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error.message);
    throw new Error("Cannot get this booking data... Please try later...");
  }

  return data;
};

export const deleteBooking = async (id) => {
  const { error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error.message);
    throw new Error("Cannot delete this booking... Please try later...");
  }

  return null;
};
