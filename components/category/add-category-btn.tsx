import React from "react";

const AddCategoryBtn = () => {
  return (
    <div className="flex gap-2">
      <button className="bg-green-600 text-white py-2 px-5 rounded text-sm ml-2 shadow">
        اضافه کردن دسته بندی
      </button>
      <button className="bg-green-600 text-white py-2 px-5 rounded text-sm ml-2 shadow">
        اضافه کردن زیر مجموعه
      </button>
    </div>
  );
};

export default AddCategoryBtn;
