"use client";

import React from "react";
import CreateModal from "../modals/create-modal";

const AddProductBtn = () => {
  const [showProductModal, setShowAddProductModal] =
    React.useState<boolean>(false);

  return (
    <div>
      <button
        onClick={() => setShowAddProductModal(true)}
        className="bg-green-600 text-white py-2 px-5 rounded text-sm ml-2"
      >
        اضافه کردن محصول
      </button>
      {showProductModal && (
        <CreateModal
          setShowAddModal={setShowAddProductModal}
          status="product"
        />
      )}
    </div>
  );
};

export default AddProductBtn;
