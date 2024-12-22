"use client";

import Pagination from "@/components/admin/pagination";
import useProductList from "@/hooks/useProduct";
import { perPageLimit } from "@/utils/config";
import React from "react";
import ProductCard, { ProductCardSkeleton } from "../product-card";
import ProductFilterMobile from "./product-filter-mobile";
import { useAppSelector } from "@/redux/hook";

const ProductList = () => {
  const [page, setPage] = React.useState<number>(1);
  const { data: products, isSuccess, isLoading } = useProductList(Infinity);

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

      <div
        className={`mt-3 lg:mt-0 flex flex-wrap items-center ${
          isLoading ? "gap-7" : "flex-col gap-2"
        }`}
      >
        {isLoading &&
          [1, 2, 3, 4, 5, 6].map((el) => <ProductCardSkeleton key={el} />)}

        {filteredItems && filteredItems?.length > 0 ? (
          <div className="flex gap-7 flex-wrap mb-10 justify-center">
            {filteredItems?.map((el) => (
              <ProductCard key={el._id} {...el} />
            ))}
          </div>
        ) : (
          isSuccess && <p>محصولی وجود ندارد.</p>
        )}

        {filteredItems && filteredItems?.length > 0 && (
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
