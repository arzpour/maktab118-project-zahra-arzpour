"use client";

import { queryClient } from "@/providers/tanstack.provider";
import errorHandler from "@/utils/errorHandler";
import { AxiosError } from "axios";
import React from "react";
import { toast } from "react-toastify";
import ConfirmModal from "../modals/confirm-modal";
import { useDeleteBlog } from "@/apis/mutations/blog";
import EditModal from "../modals/edit-product-modal";

interface IActionBlogBtn {
  id: string;
}

const ActionBlogBtn: React.FC<IActionBlogBtn> = ({ id }) => {
  const [showDeleteBlogModal, setShowDeleteBlogModal] =
    React.useState<boolean>(false);

  const [showEditBlogModal, setShowEditBlogModal] =
    React.useState<boolean>(false);
  const deleteBlog = useDeleteBlog();

  const deleteBlogHandler = async () => {
    try {
      await deleteBlog.mutateAsync(id);

      toast.success("حذف شد", {
        className: "custom-toast",
      });
      setShowDeleteBlogModal(false);
      queryClient.invalidateQueries({ queryKey: ["get-blogs"] });
    } catch (error) {
      toast.error("حذف نشد", {
        className: "custom-toast",
      });
      errorHandler(error as AxiosError<IError>);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowDeleteBlogModal(true)}
        className="bg-red-600 text-white py-1.5 px-5 rounded text-sm ml-2"
      >
        حذف
      </button>
      <button
        onClick={() => setShowEditBlogModal(true)}
        className="bg-orange text-white py-1.5 px-5 rounded text-sm mr-2"
      >
        ویرایش
      </button>

      {showDeleteBlogModal && (
        <ConfirmModal
          setShowConfirmModal={setShowDeleteBlogModal}
          onSubmitHandler={deleteBlogHandler}
          status="delete-blog"
        />
      )}

      {showEditBlogModal && (
        <EditModal
          setShowEditModal={setShowEditBlogModal}
          id={id}
          status="blog"
        />
      )}
    </>
  );
};

export default ActionBlogBtn;
