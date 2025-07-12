import ProductList from "@/containers/product-list";
import React from "react";

const ProductsPage = () => {
  return (
    <div className="bg-BackgroundColor pb-20 text-white max-w-1770 mx-auto pt-16 sm:pt-32 md:pt-40">
      <div className="max-w-1400 mx-auto">
        <ProductList />
      </div>
    </div>
  );
};

export default ProductsPage;
