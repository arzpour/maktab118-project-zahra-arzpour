import { useMutation } from "@tanstack/react-query";
import { addBlog, deleteBlog } from "../client/blog";

export const useAddBlog = () => {
  return useMutation({
    mutationKey: ["add-blog"],
    mutationFn: addBlog,
  });
};

export const useDeleteblog = () => {
  return useMutation({
    mutationKey: ["delete-blog"],
    mutationFn: deleteBlog,
  });
};
