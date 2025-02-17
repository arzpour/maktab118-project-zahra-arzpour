"use client";

import { notFound, useParams } from "next/navigation";
import React from "react";
import useCategoryList from "@/hooks/useCategory";
import useProductList from "@/hooks/useProduct";
import OtherProductsCards from "../product-gorups/product-list-card";
import ProductInfoCard, { ProductInfoCardSkeleton } from "./product-info-card";
import Breadcrumbs from "../breadcrumbs";
import { useAppDispatch } from "@/redux/hook";
import { productActions } from "@/redux/features/product.slice";

const ProductInfoById = () => {
  const { data: categories, isSuccess: categoryLoaded } =
    useCategoryList(Infinity);
  const { data: products, isSuccess, isLoading } = useProductList(Infinity);

  const { productId } = useParams();

  const findProduct = products?.data?.products.find(
    (el) => el._id === productId
  );

  if (isSuccess) {
    if (findProduct?._id !== productId) {
      notFound();
    }
  }

  const findCategory = categories?.data?.categories.find(
    (el) => el._id === findProduct?.category
  );

  const dispatch = useAppDispatch();

  return (
    <>
      {categoryLoaded && (
        <Breadcrumbs
          categoryName={findCategory?.name || ""}
          productName={findProduct?.name || ""}
          categoryId={findCategory?._id || ""}
        />
      )}

      {isLoading && <ProductInfoCardSkeleton />}
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

      <OtherProductsCards
        categoryId={findProduct?.category || ""}
        categoryName="محصولات مرتبط"
        sort={true}
        className="xl:mx-0"
      />
    </>
  );
};

export default ProductInfoById;
