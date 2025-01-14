import { getBlogs } from "@/server/services/blog.service";
import errorHandler from "@/utils/errorHandler";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React from "react";

const useGetBlogs = () => {
  const { data, isSuccess, isLoading, isError, error } = useQuery({
    queryKey: ["get-blogs"],
    queryFn: getBlogs,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  React.useEffect(() => {
    if (!error || !isError) return;
    errorHandler(error as AxiosError<IError>);
  }, [error, isError]);
  return { data, isLoading, isSuccess };
};

export default useGetBlogs;
