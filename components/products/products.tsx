import React from "react";
import AddProductBtn from "./add-product-btn";
import ProductListTable from "./product-list-table";

const ProductMain = () => {
  return (
    <div className="mx-10">
      <div className="w-full flex justify-between items-center mb-3 mt-1 pl-3">
        <div className="flex gap-4 items-center">
          <p className="font-medium xl:text-lg">محصولات</p>
        </div>
        <AddProductBtn />
      </div>

      <ProductListTable />
    </div>
  );
};

export default ProductMain;
