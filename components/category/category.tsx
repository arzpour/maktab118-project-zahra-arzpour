import React from "react";
import CategoryListTable from "./category-list-table";
import AddCategoryBtn from "./add-category-btn";

const CategoryMain = () => {
  return (
    <div className="mx-10">
      <div className="w-full flex justify-between items-center mb-4 mt-1 pl-3">
        <div className="flex gap-4 items-center">
          <p className="font-medium xl:text-lg">دسته بندی ها</p>
        </div>
        <AddCategoryBtn />
      </div>
      <CategoryListTable />
    </div>
  );
};

export default CategoryMain;
