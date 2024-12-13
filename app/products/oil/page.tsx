import ProductListByCategory from "@/containers/product-list-category";
import React from "react";

const OilProductListPage = () => {
  return (
    <div className="bg-BackgroundColor pb-20 text-white max-w-1770 mx-auto">
      <div className="max-w-1400 mx-auto">
        <ProductListByCategory categoryId="675067e958eeb5911f2fccd5" />
      </div>
    </div>
  );
};

export default OilProductListPage;
