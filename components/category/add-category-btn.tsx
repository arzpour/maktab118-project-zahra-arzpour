"use client";

import React from "react";
import AddCategoryModal from "../admin/modals/add-category-modal";
import AddSubCategoryModal from "../admin/modals/add-subcategory-modal";

const AddCategoryBtn = () => {
  const [showAddCategoryModal, setShowAddCategoryModal] =
    React.useState<boolean>(false);

  const [showAddSubCategoryModal, setShowAddSubCategoryModal] =
    React.useState<boolean>(false);

  return (
    <div className="flex gap-2">
      <button
        onClick={() => setShowAddCategoryModal(true)}
        className="bg-green-600 text-white py-2 px-5 rounded text-sm ml-2 shadow"
      >
        اضافه کردن دسته بندی
      </button>
      {showAddCategoryModal && (
        <AddCategoryModal setShowAddCategoryModal={setShowAddCategoryModal} />
      )}
      <button
        onClick={() => setShowAddSubCategoryModal(true)}
        className="bg-green-600 text-white py-2 px-5 rounded text-sm ml-2 shadow"
      >
        اضافه کردن زیر مجموعه
      </button>
      {showAddSubCategoryModal && (
        <AddSubCategoryModal
          setShowAddSubCategoryModal={setShowAddSubCategoryModal}
        />
      )}
    </div>
  );
};

export default AddCategoryBtn;
