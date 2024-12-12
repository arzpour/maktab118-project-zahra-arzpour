"use client";

import { usePathname } from "next/navigation";
import React from "react";
import useCategoryList from "@/hooks/useCategory";
import useProductList from "@/hooks/useProduct";
import OtherProductsCards from "../product-gorups/product-list-card";
import ProductInfoCard from "./product-info-card";
import Breadcrumbs from "../breadcrumbs";

const ProductInfoById = () => {
  const { data: categories, isSuccess: categoryLoaded } =
    useCategoryList(Infinity);
  const { data: products, isSuccess } = useProductList(Infinity);
  const route = usePathname();
  const id = route.split("/").pop();
  console.log(id);

  const findProduct = products?.data?.products.find((el) => el._id === id);
  console.log(findProduct);

  const findCategory = categories?.data?.categories.find(
    (el) => el._id === findProduct?.category
  );

  return (
    <>
      {categoryLoaded && (
        <Breadcrumbs
          categoryName={findCategory?.name || ""}
          productName={findProduct?.name || ""}
        />
      )}

      {isSuccess && <ProductInfoCard {...findProduct} />}

      {isSuccess && (
        <OtherProductsCards
          categoryId={findProduct?.category || ""}
          categoryName="محصولات مرتبط"
          sort={true}
        />
      )}
    </>
  );
};

export default ProductInfoById;
