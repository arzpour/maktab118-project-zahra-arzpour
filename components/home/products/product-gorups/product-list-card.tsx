"use client";

import React from "react";
import Link from "next/link";
import useProductList from "@/hooks/useProduct";
import ProductCard, { ProductCardSkeleton } from "../product-card";

interface IProductsCards {
  categoryId: string;
  categoryName: string;
  sort?: boolean;
  className?: string;
}

const OtherProductsCards: React.FC<IProductsCards> = ({
  categoryId,
  categoryName,
  sort,
  className,
}) => {
  const { data: products, isLoading } = useProductList(Infinity);

  const filteredProducts = React.useMemo(() => {
    const filtered = products?.data?.products.filter(
      (el) => el.category === categoryId
    );
    if (sort) {
      return filtered?.sort(() => Math.random() - 0.5).slice(0, 4);
    }
    return filtered?.slice(0, 4);
  }, [products, categoryId, sort]);

  return (
    <div className={`pt-14 xl:mx-10 ${className}`}>
      <div className="flex justify-between items-center mx-8 sm:mx-8 md:mx-10 xl:mx-0 mb-7">
        <h4 className="text-sm sm:text-lg text-slate-100 pr-4">
          {categoryName}
        </h4>
        <Link href={`/products/${categoryId}`}>
          <p className="text-orange hover:border-b hover:border-b-orange text-sm px-6 py-2.5 rounded-full cursor-pointer">
            مشاهده همه
          </p>
        </Link>
      </div>
      <div className="flex gap-5 xl:gap-10 items-center justify-center flex-wrap xl:flex-nowrap px-5 lg:px-0">
        {isLoading &&
          [1, 2, 3, 4].map((el) => <ProductCardSkeleton key={el} />)}
        {filteredProducts?.map((el) => (
          <ProductCard key={el._id} {...el} />
        ))}
      </div>
    </div>
  );
};

export default OtherProductsCards;
