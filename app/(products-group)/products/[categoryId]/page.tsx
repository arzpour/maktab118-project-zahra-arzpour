import ProductListByCategory from "@/containers/product-list-category";
import React from "react";

const ProductListPage = ({ params }: { params: { categoryId: string } }) => {
  return (
    <div className="bg-BackgroundColor pb-20 text-white max-w-1770 mx-auto pt-10 sm:pt-24 md:pt-36">
      <div className="max-w-1400 mx-auto">
        <ProductListByCategory categoryId={params.categoryId} />
      </div>
    </div>
  );
};

export default ProductListPage;
