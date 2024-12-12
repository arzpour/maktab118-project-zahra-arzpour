import ProductListContainer from "@/containers/product-list";
import React from "react";

const ProductsPage = () => {
  return (
    <div className="bg-BackgroundColor pb-20 text-white max-w-1770 mx-auto">
      <div className="max-w-1400 mx-auto">
        <ProductListContainer />
      </div>
    </div>
  );
};

export default ProductsPage;
