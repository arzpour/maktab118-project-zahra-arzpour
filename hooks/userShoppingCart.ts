import { getShoppingCart } from "@/apis/client/shopping-cart";
import errorHandler from "@/utils/errorHandler";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React from "react";

const useGetShoppingCart = () => {
  const { data, isSuccess, isLoading, isError, error } = useQuery({
    queryKey: ["get-shopping-cart"],
    queryFn: getShoppingCart,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  React.useEffect(() => {
    if (!error || !isError) return;
    errorHandler(error as AxiosError<IError>);
  }, [error, isError]);
  return { data, isLoading, isSuccess };
};

export default useGetShoppingCart;
