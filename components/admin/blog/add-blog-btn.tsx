"use client";

import React from "react";
import CreateModal from "../modals/create-modal";

const AddBlogBtn = () => {
  const [showBlogModal, setShowAddBlogModal] = React.useState<boolean>(false);

  return (
    <div>
      <button
        onClick={() => setShowAddBlogModal(true)}
        className="bg-green-600 text-white py-2 px-5 rounded text-sm ml-2"
      >
        اضافه کردن بلاگ
      </button>
      {showBlogModal && (
        <CreateModal setShowAddModal={setShowAddBlogModal} status="blog" />
      )}
    </div>
  );
};

export default AddBlogBtn;
