import { useMutation } from "@tanstack/react-query";
import { addOrder, editOrder } from "../client/order";

export const useAddOrder = () => {
  return useMutation({ mutationKey: ["add-order"], mutationFn: addOrder });
};

export const useEditOrder = () => {
  return useMutation({ mutationKey: ["edit-order"], mutationFn: editOrder });
};
