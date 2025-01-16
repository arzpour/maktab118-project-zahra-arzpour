import AddBlogForm from "@/components/form/add-blog-form";
import AddCategoryForm from "@/components/form/add-category-form";
import AddProductForm from "@/components/form/add-product-form";
import AddSubCategoryForm from "@/components/form/add-subcategory-form";
import React from "react";

interface ICreateModal {
  setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>;
  status: "category" | "product" | "subcategory" | "blog";
}

const CreateModal: React.FC<ICreateModal> = ({ setShowAddModal, status }) => {
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
        onClick={() => setShowAddModal!(false)}
      >
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="flex gap-4 items-center mb-5">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <p className="font-medium text-gray-800">
                    {status === "category"
                      ? "دسته بندی جدید"
                      : status === "product"
                      ? "محصول جدید"
                      : status === "subcategory"
                      ? "زیر مجموعه جدید"
                      : status === "blog"
                      ? "بلاگ جدید"
                      : ""}
                  </p>
                </div>
              </div>
              {status === "category" ? (
                <AddCategoryForm setShowAddCategoryModal={setShowAddModal} />
              ) : status === "product" ? (
                <AddProductForm setShowAddProductModal={setShowAddModal} />
              ) : status === "subcategory" ? (
                <AddSubCategoryForm
                  setShowAddSubCategoryModal={setShowAddModal}
                />
              ) : status === "blog" ? (
                <AddBlogForm setShowAddBlogModal={setShowAddModal} />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateModal;
