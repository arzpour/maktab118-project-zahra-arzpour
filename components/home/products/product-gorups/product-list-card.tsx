"use client";

import React from "react";
import Link from "next/link";
import useProductList from "@/hooks/useProduct";
import ProductCard from "../product-card";

interface IProductsCards {
  categoryId: string;
  categoryName: string;
  sort?: boolean;
  productListLink: string;
}

const OtherProductsCards: React.FC<IProductsCards> = ({
  categoryId,
  categoryName,
  sort,
  productListLink,
}) => {
  const { data: products } = useProductList(Infinity);

  return (
    <div className="pt-10 lg:mx-10">
      <div className="flex justify-between mx-10 lg:mx-0 mb-7">
        <h4 className="text-lg text-slate-100">{categoryName}</h4>
        <Link href={`products/${productListLink}`}>
          <p className="text-orange">مشاهده همه</p>
        </Link>
      </div>
      <div className="flex gap-5 xl:gap-10 items-center justify-center flex-wrap xl:flex-nowrap">
        {products?.data?.products
          .filter((el) => el.category === categoryId)
          .sort(sort ? () => Math.random() - 0.5 : undefined)
          .slice(0, 4)
          .map((el) => (
            <Link href={`/products/${el._id}`}>
              <ProductCard key={el._id} {...el} />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default OtherProductsCards;
