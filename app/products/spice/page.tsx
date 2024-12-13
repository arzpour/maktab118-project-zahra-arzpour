import ProductListByCategory from "@/containers/product-list-category";
import React from "react";

const SpiceProductListPage = () => {
  return (
    <div className="bg-BackgroundColor pb-20 text-white max-w-1770 mx-auto">
      <div className="max-w-1400 mx-auto">
        <ProductListByCategory categoryId="675066f658eeb5911f2fcccc" />
      </div>
    </div>
  );
};

export default SpiceProductListPage;
