import supabase, { supabaseUrl } from "./supabase";

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

export const updateUserData = async ({ fullName, avatar, password }) => {
  // Determine what kind of user data are being updated:
  let updatedData;

  if (password) updatedData = { password };
  if (fullName)
    updatedData = {
      data: {
        fullName,
      },
    };

  // Update determined data:
  const { data, error } = await supabase.auth.updateUser(updatedData);

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  if (!avatar) return data;

  // Upload avatar to Supabase storage bucket:
  const fileName = `avatar=${data.user.id}-${Math.floor(
    Math.random() * 100000
  )}`;

  const { error: avatarUploadError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (avatarUploadError) {
    console.error(avatarUploadError.message);
    throw new Error(avatarUploadError.message);
  }

  // Update URL of avatar in user\'s account:
  const { data: updatedUser, error: avatarUrlUpdateError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (avatarUrlUpdateError) {
    console.error(avatarUrlUpdateError.message);
    throw new Error(avatarUrlUpdateError.message);
  }

  return updatedUser;
};
