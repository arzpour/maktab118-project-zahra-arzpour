"use client";

import Pagination from "@/components/admin/pagination";
import useProductList from "@/hooks/useProduct";
import { perPageLimit } from "@/utils/config";
import React from "react";
import ProductCard from "../product-card";
import ProductFilterMobile from "./product-filter-mobile";
import { useAppSelector } from "@/redux/hook";

const ProductList = () => {
  const [page, setPage] = React.useState<number>(1);
  const { data: products, isSuccess } = useProductList(Infinity);

  const selectedFilters = useAppSelector(
    (state) => state.filter.selectedFilters
  );

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const filteredProducts = React.useMemo(() => {
    if (!selectedFilters.length) return products?.data?.products || [];
    return products?.data?.products.filter((product) =>
      selectedFilters.includes(product.subcategory!)
    );
  }, [selectedFilters, products]);

  console.log(filteredProducts);

  const totalPages = Math.ceil(filteredProducts?.length! / perPageLimit);

  const filteredItems = filteredProducts?.slice(
    (page - 1) * perPageLimit,
    page * perPageLimit
  );

  return (
    <>
      <ProductFilterMobile />

      <div className="mt-3 lg:mt-0 flex flex-col gap-2 flex-wrap items-center">
        <div className="flex gap-7 flex-wrap mb-10 justify-center">
          {filteredItems?.map((el) => (
            <ProductCard {...el} />
          ))}
        </div>
        {isSuccess && (
          <Pagination
            handlePageChange={handlePageChange}
            page={page}
            totalPages={totalPages}
          />
        )}
      </div>
    </>
  );
};

export default ProductList;
