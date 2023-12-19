import supabase from "./supabase";

export const getSettings = async () => {
  const { data: settings, error } = await supabase
    .from("settings")
    .select("*")
    .single();

  if (error) {
    console.error(error.message);
    throw new Error("Settings could not be loaded... Please try later...");
  }

  return settings;
};
