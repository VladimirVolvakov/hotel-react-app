import { QTY_PER_PAGE } from "../utils/constants";
import { getToday } from "../utils/helpers";
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

// FUNCTIONS THAT ARE USED FOR DASHBOARD PAGE

// Returns all bookings that were created after date (ISO string) in input:
export const getBookingsAfterDate = async (date) => {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error.message);
    throw new Error("Can not load bookings... Please try later...");
  }

  return data;
};

// Returns all bookings that were created after date (ISO string) in input:
export const getStaysAfterDate = async (date) => {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error.message);
    throw new Error("Can not load bookings... Please try later...");
  }

  return data;
};

// Activity means that there is a check in or a check out today
export const getStaysTodayActivity = async () => {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      // Equivalent to: (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) || 
      // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  if (error) {
    console.error(error);
    throw new Error("Can not load bookings... Please try later...");
  }
  return data;
};
