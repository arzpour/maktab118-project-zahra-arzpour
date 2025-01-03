import { getShoppingCartByUserId } from "@/apis/client/shopping-cart";
import errorHandler from "@/utils/errorHandler";
import { getUserId } from "@/utils/session";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React from "react";

const useGetShoppingCartByUserId = () => {
  const userId = getUserId();

  const { data, isSuccess, isLoading, isError, error } = useQuery({
    queryKey: ["get-shopping-cart-by-user-id"],
    queryFn: () => getShoppingCartByUserId(userId || ""),
    refetchOnWindowFocus: false,
    retry: 1,
  });

  React.useEffect(() => {
    if (!error || !isError) return;
    errorHandler(error as AxiosError<IError>);
  }, [error, isError]);
  return { data, isLoading, isSuccess };
};

export default useGetShoppingCartByUserId;
