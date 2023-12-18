import supabase, { supabaseUrl } from "./supabase";

const getCabins = async () => {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error.message);
    throw new Error("An error occured while loading data about cabins");
  }

  return data;
};

const createCabin = async (newCabinData, id) => {
  const hasImagePath = newCabinData.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.ceil(Math.random() * 100000000)}-${
    newCabinData.image.name
  }`.replaceAll("/", "");

  const imagePath = hasImagePath
    ? newCabinData.image
    : `${supabaseUrl}/storage/v1/object/public/cabins/${imageName}`;

  let query = supabase.from("cabins");

  // Create cabin:
  if (!id) query = query.insert([{ ...newCabinData, image: imagePath }]);

  // Edit cabin:
  if (id)
    query = query
      .update({ ...newCabinData, image: imagePath })
      .eq("id", id)
      .select();

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error.message);
    throw new Error("Something went wrong... Please try later...");
  }

  // Upload image:
  const { error: storageError } = await supabase.storage
    .from("cabins")
    .upload(imageName, newCabinData.image);

  // Delete cabin if an error while uploading image occured:
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError.message);
    throw new Error(
      "Something went wrong and the cabin was not created... Please try later..."
    );
  }

  return data;
};

const deleteCabin = async (id) => {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error.message);
    throw new Error("Something went wrong... Please try later...");
  }

  return null;
};

export { getCabins, createCabin, deleteCabin };
