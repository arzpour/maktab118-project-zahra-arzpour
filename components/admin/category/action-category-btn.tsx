import { useDeleteCategory } from "@/apis/mutations/category";
import { queryClient } from "@/providers/tanstack.provider";
import errorHandler from "@/utils/errorHandler";
import { AxiosError } from "axios";
import React from "react";
import { toast } from "react-toastify";
import ConfirmModal from "../modals/confirm-modal";

interface IActionCategoryBtn {
  id: string;
}

const ActionCategoryBtn: React.FC<IActionCategoryBtn> = ({ id }) => {
  const [showDeleteCategoryModal, setShowDeleteCategoryModal] =
    React.useState<boolean>(false);
  const deleteCategory = useDeleteCategory();

  const deleteCategoryHandler = async () => {
    try {
      await deleteCategory.mutateAsync(id);

      toast.success("حذف شد");
      queryClient.invalidateQueries({ queryKey: ["get-categories"] });
    } catch (error) {
      toast.error("حذف نشد");
      errorHandler(error as AxiosError<IError>);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowDeleteCategoryModal(true)}
        className="bg-red-600 text-white py-1.5 px-5 rounded text-sm ml-2"
      >
        حذف
      </button>
      <button className="bg-orange text-white py-1.5 px-5 rounded text-sm mr-2">
        ویرایش
      </button>

      {showDeleteCategoryModal && (
        <ConfirmModal
          setShowConfirmModal={setShowDeleteCategoryModal}
          onSubmitHandler={deleteCategoryHandler}
          status="delete-category"
        />
      )}
    </>
  );
};

export default ActionCategoryBtn;
