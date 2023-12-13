import supabase from "./supabase";

const getCabins = async () => {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error.message);
    throw new Error("An error occured while loading data about cabins");
  }

  return data;
};

const deleteCabin = async (id) => {
  const { error } = await supabase
    .from("cabins")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error.message);
    throw new Error("Something went wrong... Please try later...");
  }

  return null;
};

export { getCabins, deleteCabin };
