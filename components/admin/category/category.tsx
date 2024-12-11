import React from "react";
import CategoryListTable from "./category-list-table";
import AddCategoryBtn from "./add-category-btn";

const CategoryMain = () => {
  return (
    <div className="mx-10">
      <div className="w-full flex gap-2 justify-between items-center mb-4 mt-1 pl-3">
        <p className="font-medium xl:text-lg hidden sm:block">دسته بندی ها</p>
        <AddCategoryBtn />
      </div>
      <CategoryListTable />
    </div>
  );
};

export default CategoryMain;
