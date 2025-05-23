import { getBlogById } from "@/apis/client/blog";
import errorHandler from "@/utils/errorHandler";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React from "react";

const useGetBlogById = (id: string) => {
  const { data, isSuccess, isLoading, isError, error } = useQuery({
    queryKey: ["get-blog-by-id", id],
    queryFn: async () => await getBlogById(id),
    refetchOnWindowFocus: false,
    retry: 1,
  });

  React.useEffect(() => {
    if (!error || !isError) return;
    errorHandler(error as AxiosError<IError>);
  }, [error, isError]);
  return { data, isLoading, isSuccess };
};

export default useGetBlogById;
