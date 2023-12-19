import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";

export const useCreateCabin = () => {
  const queryClient = useQueryClient();

  const { mutate: addCabin, isLoading: isCreatingCabin } = useMutation({
    mutationFn: (data) => createCabin(data),
    onSuccess: () => {
      toast.success("Cabin was successfully created");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error) => toast.error(error.message),
  });

  return { addCabin, isCreatingCabin };
};
