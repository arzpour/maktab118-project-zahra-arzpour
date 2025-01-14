import { getOrderById } from "@/apis/client/order";
import errorHandler from "@/utils/errorHandler";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React from "react";

const useGetOrderById = (id: string) => {
  const { data, isSuccess, isLoading, isError, error } = useQuery({
    queryKey: ["get-order-by-id", id],
    queryFn: async () => {
      const response = await getOrderById(id);
      console.log(response, "resorder");

      return response.order;
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

export default useGetOrderById;
