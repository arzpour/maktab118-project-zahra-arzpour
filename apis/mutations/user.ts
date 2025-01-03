
import { useMutation } from "@tanstack/react-query";
import { editUserById } from "../client/user";

export const useEditUserById = () => {
  return useMutation({
    mutationKey: ["edit-user"],
    mutationFn: editUserById,
  });
};