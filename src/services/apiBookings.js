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

  const {
    data: bookings,
    error,
    count
  } = await query;

  if (error) {
    console.error(error.message);
    throw new Error("Cannot get bookings data... Please try later...");
  }

  return { bookings, count };
};
