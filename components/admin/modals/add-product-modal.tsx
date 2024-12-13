import AddProductForm from "@/components/form/add-product-form";
import React from "react";

interface IAddProductModal {
  setShowAddProductModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddProductModal: React.FC<IAddProductModal> = ({
  setShowAddProductModal,
}) => {
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
        onClick={() => setShowAddProductModal!(false)}
      >
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl"
          >
            <div className="bg-white w-full pb-4 pt-5 sm:py-6 px-8 sm:pb-4">
              <div className="mt-3 text-start">
                <p className="font-medium text-gray-800 text-lg">
                  دسته بندی جدید
                </p>
              </div>
              <AddProductForm setShowAddProductModal={setShowAddProductModal} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
