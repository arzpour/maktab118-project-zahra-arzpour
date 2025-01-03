import { useMutation } from "@tanstack/react-query";
import { addToShoppingCart, deleteShoppingCartByUserId, editShoppingCart } from "../client/shopping-cart";

export const useAddToShoppingCart = () => {
  return useMutation({
    mutationKey: ["add-to-shopping-cart"],
    mutationFn: addToShoppingCart,
  });
};

export const useEditShoppingCart = () => {
  return useMutation({
    mutationKey: ["edit-shopping-cart"],
    mutationFn: editShoppingCart,
  });
};

export const useDeleteShoppingCart = () => {
  return useMutation({
    mutationKey: ["delete-shopping-cart"],
    mutationFn: deleteShoppingCartByUserId,
  });
};
