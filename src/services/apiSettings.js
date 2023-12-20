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

export const updateSetting = async (newSetting) => {
  const { data, error } = await supabase
    .from("settings")
    .update(newSetting)
    .eq("id", 1)
    .select();

  if (error) {
    console.error(error.message);
    throw new Error("Settings could not be updated... Please try later");
  }

  return data;
};
