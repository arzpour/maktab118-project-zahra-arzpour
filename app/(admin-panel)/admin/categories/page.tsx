import CategoryMain from "@/components/admin/category/category";
import React from "react";

const AdminCategoriesPage = () => {
  return (
    <div className="bg-BackgroundColor text-white min-h-screen max-w-1800 mx-auto">
      <div className="max-w-1500 mx-auto pt-10 pb-24">
        <CategoryMain />
      </div>
    </div>
  );
};

export default AdminCategoriesPage;
