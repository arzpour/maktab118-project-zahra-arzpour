import ProductList from "@/components/home/products/product-list/all-product-list";
import FilterProducts from "@/components/home/products/product-list/product-filter";
import React from "react";

const ProductListContainer = () => {
  return (
    <div className="pt-10 xl:pt-20 flex gap-16 mx-10 flex-col lg:flex-row">
      <FilterProducts />
      <ProductList />
    </div>
  );
};

export default ProductListContainer;
