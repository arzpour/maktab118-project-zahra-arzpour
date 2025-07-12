import { useMutation } from "@tanstack/react-query";
import { addBlog, deleteBlog, editBlog } from "../client/blog";

export const useAddBlog = () => {
  return useMutation({
    mutationKey: ["add-blog"],
    mutationFn: addBlog,
  });
};

export const useDeleteBlog = () => {
  return useMutation({
    mutationKey: ["delete-blog"],
    mutationFn: deleteBlog,
  });
};

export const useEditBlog = () => {
  return useMutation({
    mutationKey: ["edit-blog"],
    mutationFn: editBlog,
  });
};
