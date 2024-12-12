import { useMutation } from "@tanstack/react-query";
import { addProduct, deleteProductById, patchProductById } from "../client/product";

export const useAddProducts = () => {
  return useMutation({ mutationKey: ["add-product"], mutationFn: addProduct });
};

export const useDeleteProducts = () => {
  return useMutation({
    mutationKey: ["delete-product"],
    mutationFn: deleteProductById,
  });
};

export const usePatchProducts = () => {
  return useMutation({
    mutationKey: ["patch-product"],
    mutationFn: patchProductById,
  });
};
