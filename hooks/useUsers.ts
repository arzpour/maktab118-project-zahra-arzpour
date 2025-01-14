import { getUsers } from "@/apis/client/user";
import errorHandler from "@/utils/errorHandler";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React from "react";

const useUsersList = () => {
  const { data, isSuccess, isLoading, isError, error } = useQuery({
    queryKey: ["get-users"],
    queryFn: async () => {
      const res = await getUsers({
        limit: Infinity,
        page: 1,
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

export default useUsersList;
