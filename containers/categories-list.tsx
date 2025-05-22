"use client";
import OtherProductsCards from "@/components/home/products/product-gorups/product-list-card";
import useCategoryList from "@/hooks/useCategory";
import React from "react";

interface ICategoriesList {
  numbers: { start: number; end: number };
}
const CategoriesList: React.FC<ICategoriesList> = ({ numbers }) => {
  const { data: categories } = useCategoryList(Infinity);

  return (
    categories?.data?.categories.length &&
    categories?.data?.categories.length > 0 &&
    categories?.data?.categories
      .slice(numbers.start, numbers.end)
      .map((el) => (
        <OtherProductsCards
          key={el._id}
          categoryId={el._id ?? ""}
          categoryName={el.name ?? ""}
        />
      ))
  );
};

export default CategoriesList;
