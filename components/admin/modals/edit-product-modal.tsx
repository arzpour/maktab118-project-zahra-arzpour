import React from "react";
import EditProductForm from "../../form/product/edit-product-form";
import EditBlogForm from "@/components/form/blog/edit-blog-form";

interface IEditModal {
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  status: "blog" | "product";
}

const EditModal: React.FC<IEditModal> = ({ setShowEditModal, id, status }) => {
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-800 opacity-85"
        aria-hidden="true"
      ></div>

      <div
        className="fixed inset-0 z-10 w-screen overflow-y-auto"
        onClick={() => setShowEditModal!(false)}
      >
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="mt-3 mb-5 text-start">
                <p className="font-medium text-gray-800 text-lg">
                  {status === "product"
                    ? "ویرایش محصول"
                    : status === "blog"
                    ? "ویرایش بلاگ"
                    : ""}
                </p>
              </div>
              {status === "product" ? (
                <EditProductForm
                  setShowEditProductModal={setShowEditModal}
                  id={id}
                />
              ) : status === "blog" ? (
                <EditBlogForm setShowEditBlogModal={setShowEditModal} id={id} />
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
