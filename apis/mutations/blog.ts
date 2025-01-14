import { useMutation } from "@tanstack/react-query";
import { addBlog } from "../client/blog";

export const useAddBlog = () => {
  return useMutation({
    mutationKey: ["add-blog"],
    mutationFn: addBlog,
  });
};
