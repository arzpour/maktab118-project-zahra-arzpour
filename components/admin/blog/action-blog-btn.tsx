"use client";

import { queryClient } from "@/providers/tanstack.provider";
import errorHandler from "@/utils/errorHandler";
import { AxiosError } from "axios";
import React from "react";
import { toast } from "react-toastify";
import ConfirmModal from "../modals/confirm-modal";
import { useDeleteblog } from "@/apis/mutations/blog";

interface IActionBlogBtn {
  id: string;
}

const ActionBlogBtn: React.FC<IActionBlogBtn> = ({ id }) => {
  const [showDeleteBlogModal, setShowDeleteBlogModal] =
    React.useState<boolean>(false);
  const deleteBlog = useDeleteblog();

  const deleteBlogHandler = async () => {
    try {
      await deleteBlog.mutateAsync(id);

      toast.success("حذف شد");
      setShowDeleteBlogModal(false);
      queryClient.invalidateQueries({ queryKey: ["get-blogs"] });
    } catch (error) {
      toast.error("حذف نشد");
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
      <button className="bg-orange text-white py-1.5 px-5 rounded text-sm mr-2">
        ویرایش
      </button>

      {showDeleteBlogModal && (
        <ConfirmModal
          setShowConfirmModal={setShowDeleteBlogModal}
          onSubmitHandler={deleteBlogHandler}
          status="delete-blog"
        />
      )}
    </>
  );
};

export default ActionBlogBtn;
