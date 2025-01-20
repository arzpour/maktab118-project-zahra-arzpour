"use client";

import { useDeleteProducts } from "@/apis/mutations/product";
import { queryClient } from "@/providers/tanstack.provider";
import React from "react";
import { toast } from "react-toastify";
import errorHandler from "@/utils/errorHandler";
import { AxiosError } from "axios";
import EditProductModal from "@/components/admin/modals/edit-product-modal";
import ConfirmModal from "../modals/confirm-modal";

interface IActionBtns {
  id: string;
}

const ActionBtns: React.FC<IActionBtns> = ({ id }) => {
  const [showDeleteProductModal, setShowDeleteProductModal] =
    React.useState<boolean>(false);
  const [showEditProductModal, setShowEditProductModal] =
    React.useState<boolean>(false);

  const deleteProduct = useDeleteProducts();

  const deleteOnclickHandler = async () => {
    try {
      await deleteProduct.mutateAsync(id);
      toast.success("حذف شد");
      setShowDeleteProductModal(false);
      queryClient.invalidateQueries({ queryKey: ["get-products"] });
    } catch (error) {
      console.log(error);
      errorHandler(error as AxiosError<IError>);
      toast.success("حذف نشد");
    }
  };

  return (
    <>
      <button
        onClick={() => setShowDeleteProductModal(true)}
        className="bg-red-600 text-white py-1.5 px-5 rounded text-sm ml-2"
      >
        حذف
      </button>

      <button
        onClick={() => setShowEditProductModal(true)}
        className="bg-orange text-white py-1.5 px-5 rounded text-sm mr-2"
      >
        ویرایش
      </button>
      {showDeleteProductModal && (
        <ConfirmModal
          setShowConfirmModal={setShowDeleteProductModal}
          onSubmitHandler={deleteOnclickHandler}
          status="delete-product"
        />
      )}
      {showEditProductModal && (
        <EditProductModal
          setShowEditProductModal={setShowEditProductModal}
          id={id}
        />
      )}
    </>
  );
};

export default ActionBtns;
