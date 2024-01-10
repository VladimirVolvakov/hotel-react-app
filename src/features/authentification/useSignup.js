import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signUpUser } from "../../services/apiAuthentification";

export const useSignup = () => {
  const { mutate: signUp, isLoading: isSigningUp } = useMutation({
    mutationFn: signUpUser,
    onSuccess: () => {
      toast.success(
        "Account successfully created. Please check your email for registration confirmation link"
      );
    },
  });

  return { signUp, isSigningUp };
};
