import { getProductById } from "@/apis/client/product";
import errorHandler from "@/utils/errorHandler";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React from "react";

const useGetProductById = (id: string) => {
  const { data, isSuccess, isLoading, isError, error } = useQuery({
    queryKey: ["get-product-by-id", id],
    queryFn: async () => {
      const response = await getProductById(id);
      console.log(response);
      return response.data?.product;
    },
    refetchOnWindowFocus: false,
    retry: 1,
  });

  React.useEffect(() => {
    if (!error || !isError) return;
    errorHandler(error as AxiosError<IError>);
  }, [error, isError]);
  return { data, isLoading, isSuccess };
};

export default useGetProductById;
