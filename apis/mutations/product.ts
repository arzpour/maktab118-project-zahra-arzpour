import { useMutation } from "@tanstack/react-query";
import { addProduct, patchProductById } from "../client/product";

export const useAddProducts = () => {
  return useMutation({ mutationKey: ["add-product"], mutationFn: addProduct });
};

export const usePatchProducts = () => {
  return useMutation({
    mutationKey: ["patch-product"],
    mutationFn: patchProductById,
  });
};
