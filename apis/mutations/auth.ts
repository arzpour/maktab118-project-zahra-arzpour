import { useMutation } from "@tanstack/react-query";
import { login, signup } from "../client/auth";

export const useLogin = () => {
  return useMutation({ mutationKey: ["login"], mutationFn: login });
};

export const useSignup = () => {
  return useMutation({ mutationKey: ["signup"], mutationFn: signup });
};
