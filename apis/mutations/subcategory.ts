import { useMutation } from "@tanstack/react-query";
import { addSubCategory } from "../client/subcategory";

export const useAddSubCategory = () => {
  return useMutation({
    mutationKey: ["add-subcategory"],
    mutationFn: addSubCategory,
  });
};
