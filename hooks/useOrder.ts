import { getAllOrders } from "@/apis/client/order";
import { perPageLimit } from "@/utils/config";
import errorHandler from "@/utils/errorHandler";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React from "react";

const useOrderList = (limitCus?: number, page?: number) => {
  const limit = limitCus ?? perPageLimit;

  const { data, isSuccess, isLoading, isError, error } = useQuery({
    queryKey: ["get-orders", limit, page],
    queryFn: async () => {
      const res = await getAllOrders({
        limit: limit,
        page: page || 1,
      });
      return res;
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

export default useOrderList;
