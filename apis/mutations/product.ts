import { useMutation } from "@tanstack/react-query";
import { addProduct } from "../client/product";

export const useAddProducts = () => {
  return useMutation({ mutationKey: ["add-product"], mutationFn: addProduct });
};
