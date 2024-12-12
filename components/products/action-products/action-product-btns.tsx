"use client";

import { useDeleteProducts } from "@/apis/mutations/product";
import { queryClient } from "@/providers/tanstack.provider";
import React from "react";
import { toast } from "react-toastify";
import errorHandler from "@/utils/errorHandler";
import { AxiosError } from "axios";
import DeleteProductModal from "@/components/modals/delete-product-modal";
import EditProductModal from "@/components/modals/edit-product-modal";

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
      toast.success("حذف شد", {
        style: { backgroundColor: "#6e6e6e", color: "#fff", fontSize: "15px" },
      });
      queryClient.invalidateQueries({ queryKey: ["get-products"] });
    } catch (error) {
      console.log(error);
      errorHandler(error as AxiosError<IError>);
      toast.success("حذف نشد", {
        style: { backgroundColor: "#6e6e6e", color: "#fff", fontSize: "15px" },
      });
    }
  };

  return (
    <div>
      <button
        onClick={() => setShowDeleteProductModal(true)}
        className="bg-red-600 text-white py-1.5 px-5 rounded text-sm ml-2"
      >
        حذف
      </button>
      {showDeleteProductModal && (
        <DeleteProductModal
          setShowDeleteProductModal={setShowDeleteProductModal}
          deleteProduct={deleteOnclickHandler}
        />
      )}
      <button
        onClick={() => setShowEditProductModal(true)}
        className="bg-orange text-white py-1.5 px-5 rounded text-sm mr-2"
      >
        ویرایش
      </button>
      {showEditProductModal && (
        <EditProductModal
          setShowEditProductModal={setShowEditProductModal}
          id={id}
        />
      )}
    </div>
  );
};

export default ActionBtns;
