import { getUserById } from "@/apis/client/user";
import errorHandler from "@/utils/errorHandler";
import { getUserId } from "@/utils/session";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React from "react";

const useUserById = () => {
  const userId = getUserId();
  const { data, isSuccess, isLoading, isError, error } = useQuery({
    queryKey: ["get-user-by-id"],
    queryFn: () => getUserById(userId || ""),
    refetchOnWindowFocus: false,
    retry: 1,
  });

  React.useEffect(() => {
    if (!error || !isError) return;
    errorHandler(error as AxiosError<IError>);
  }, [error, isError]);
  return { data, isLoading, isSuccess };
};

export default useUserById;
