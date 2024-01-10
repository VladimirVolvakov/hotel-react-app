import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateUserData } from "../../services/apiAuthentification";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdatingUser } = useMutation({
    mutationFn: updateUserData,
    onSuccess: ({ user }) => {
      toast.success("User profile successfully updated");
      queryClient.setQueryData(["user"], user);
    },
    onError: (error) => toast.error(error.message),
  });

  return { updateUser, isUpdatingUser };
};
