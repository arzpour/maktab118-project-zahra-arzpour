import { useMutation } from "@tanstack/react-query";
import { addCategory } from "../client/category";

export const useAddCategory = () => {
  return useMutation({
    mutationKey: ["add-category"],
    mutationFn: addCategory,
  });
};
