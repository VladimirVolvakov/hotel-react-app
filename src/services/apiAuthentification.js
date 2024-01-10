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

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return data?.user;
};

export const userLogOut = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
};

export const signUpUser = async ({ fullName, email, password }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  return data;
};
