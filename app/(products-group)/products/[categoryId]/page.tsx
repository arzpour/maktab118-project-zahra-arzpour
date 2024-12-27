import ProductListByCategory from "@/containers/product-list-category";
import React from "react";

const ProductListPage = () => {
  return (
    <div className="bg-BackgroundColor pb-20 text-white max-w-1770 mx-auto pt-40">
      <div className="max-w-1400 mx-auto">
        <ProductListByCategory />
      </div>
    </div>
  );
};

export default ProductListPage;
