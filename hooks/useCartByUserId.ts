import { getShoppingCartByUserId } from "@/apis/client/shopping-cart";
import errorHandler from "@/utils/errorHandler";
import { getAccessToken, getUserId } from "@/utils/session";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React from "react";

const useGetShoppingCartByUserId = () => {
  const [isTokenAvailable, setIsTokenAvailable] =
    React.useState<boolean>(false);
  const userId = getUserId();

  const { data, isSuccess, isLoading, isError, error } = useQuery({
    queryKey: ["get-shopping-cart-by-user-id", userId],
    queryFn: async () => await getShoppingCartByUserId(userId || ""),
    refetchOnWindowFocus: false,
    retry: 1,
    enabled: !!userId || !!isTokenAvailable,
  });

  React.useEffect(() => {
    const token = getAccessToken();
    if (token) {
      setIsTokenAvailable(true);
    }
  }, []);

  React.useEffect(() => {
    if (!error || !isError) return;
    errorHandler(error as AxiosError<IError>);
  }, [error, isError]);
  return { data, isLoading, isSuccess };
};

export default useGetShoppingCartByUserId;
