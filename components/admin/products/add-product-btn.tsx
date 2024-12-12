"use client";

import React from "react";
import AddProductModal from "../modals/add-product-modal";

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
        <AddProductModal setShowAddProductModal={setShowAddProductModal} />
      )}
    </div>
  );
};

export default AddProductBtn;
