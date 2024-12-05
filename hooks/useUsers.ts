import { getAllSubCategories } from "@/apis/client/subcategory";
import { getUsers } from "@/apis/client/user";
import { perPageLimit } from "@/utils/config";
import errorHandler from "@/utils/errorHandler";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React from "react";

const useUsersList = () => {
  const { data, isSuccess, isLoading, isError, error } = useQuery({
    queryKey: ["get-users"],
    queryFn: async () => {
      const res = await getUsers();
      console.log(res);
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
