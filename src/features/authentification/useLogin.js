import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { userLogIn } from "../../services/apiAuthentification";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading: isLoggingIn } = useMutation({
    mutationFn: ({ email, password }) => userLogIn({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueriesData(["user"], user);
      navigate("/");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Wrong email or password");
    },
  });

  return { login, isLoggingIn };
};
