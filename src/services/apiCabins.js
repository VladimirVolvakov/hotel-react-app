import supabase from "./supabase";

const getCabins = async () => {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error.message);
    throw new Error("An error occured while loading data about cabins");
  }

  return data;
};

export { getCabins };
