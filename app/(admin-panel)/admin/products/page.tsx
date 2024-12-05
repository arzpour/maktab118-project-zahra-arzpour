import ProductMain from "@/components/products/products";
import React from "react";

const AdminProductsPage = () => {
  return (
    <div className="bg-BackgroundColor text-white min-h-screen max-w-1800 mx-auto">
      <div className="max-w-1400 mx-auto pt-10">
        <ProductMain />
      </div>
    </div>
  );
};

export default AdminProductsPage;
