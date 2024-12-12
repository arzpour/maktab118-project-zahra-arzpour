import React from "react";
import EditProductForm from "../form/edit-product-form";

interface IEditProductModal {
  setShowEditProductModal: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
}

const EditProductModal: React.FC<IEditProductModal> = ({
  setShowEditProductModal,
  id,
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
        onClick={() => setShowEditProductModal!(false)}
      >
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="mt-3 mb-5 text-start">
                <p className="font-medium text-gray-800 text-lg">
                  ادیت کردن محصول
                </p>
              </div>
              <EditProductForm
                setShowEditProductModal={setShowEditProductModal}
                id={id}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
