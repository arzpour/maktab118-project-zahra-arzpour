import ProductListByCategory from "@/containers/product-list-category";
import React from "react";

const MedicinalProductListPage = () => {
  return (
    <div className="bg-BackgroundColor pb-20 text-white max-w-1770 mx-auto">
      <div className="max-w-1400 mx-auto">
        <ProductListByCategory categoryId="6750684d58eeb5911f2fccd9" />
      </div>
    </div>
  );
};

export default MedicinalProductListPage;
