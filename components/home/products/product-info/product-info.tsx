"use client";

import { notFound, usePathname } from "next/navigation";
import React from "react";
import useCategoryList from "@/hooks/useCategory";
import useProductList from "@/hooks/useProduct";
import OtherProductsCards from "../product-gorups/product-list-card";
import ProductInfoCard from "./product-info-card";
import Breadcrumbs from "../breadcrumbs";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { productActions } from "@/redux/features/product.slice";

const ProductInfoById = () => {
  const { data: categories, isSuccess: categoryLoaded } =
    useCategoryList(Infinity);
  const { data: products, isSuccess } = useProductList(Infinity);
  const route = usePathname();
  const id = route.split("/").pop();
  console.log(id);

  const findProduct = products?.data?.products.find((el) => el._id === id);
  console.log(findProduct);

  if (isSuccess) {
    if (findProduct?._id !== id) {
      notFound();
    }
  }

  const findCategory = categories?.data?.categories.find(
    (el) => el._id === findProduct?.category
  );

  const dispatch = useAppDispatch();

  const listtt = useAppSelector((state) => state.product.list);
  console.log(listtt, listtt);

  return (
    <>
      {categoryLoaded && (
        <Breadcrumbs
          categoryName={findCategory?.name || ""}
          productName={findProduct?.name || ""}
        />
      )}

      {isSuccess && findProduct && (
        <ProductInfoCard
          addToCart={(selectedQuantity) =>
            dispatch(
              productActions.addToCart({ ...findProduct, selectedQuantity })
            )
          }
          {...findProduct}
        />
      )}

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
