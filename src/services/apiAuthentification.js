import supabase from "./supabase";

export const userLogIn = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return data;
};

export const getAuthenticatedUser = async () => {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  console.log(data);

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return data?.user;
};
