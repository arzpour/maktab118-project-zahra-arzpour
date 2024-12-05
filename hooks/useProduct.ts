import { getAllProducts } from "@/apis/client/product";
import { perPageLimit } from "@/utils/config";
import errorHandler from "@/utils/errorHandler";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React from "react";

const useProductList = (limitCus?: number, sort?: number) => {
  const [page, setPage] = React.useState<number>(1);

  const limit = limitCus ?? perPageLimit;

  const { data, isSuccess, isLoading, isError, error } = useQuery({
    queryKey: ["get-products", page, limit, sort],
    queryFn: async () => {
      const res = await getAllProducts({
        limit: limit,
        page,
        "quantity[gte]": 8,
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
  return { data, isLoading, isSuccess, setPage, page };
};

export default useProductList;
