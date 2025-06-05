"use client";

import Pagination from "@/components/admin/pagination";
import useProductList from "@/hooks/useProduct";
import React from "react";
import { useAppSelector } from "@/redux/hook";
import FilterProducts from "@/components/home/products/product-list/product-filter";
import ProductFilterMobile from "@/components/home/products/product-list/product-filter-mobile";
import ProductCard, {
  ProductCardSkeleton,
} from "@/components/home/products/product-card";
import usePagination from "@/hooks/usePagination";

const ProductList = () => {
  const [page, setPage] = React.useState<number>(1);
  const { data: products, isSuccess, isLoading } = useProductList(Infinity);

  const selectedFilters = useAppSelector(
    (state) => state.filter.selectedFilters
  );

  const filteredProducts = React.useMemo(() => {
    if (!selectedFilters.length) return products?.data?.products || [];
    return products?.data?.products.filter((product) =>
      selectedFilters.includes(product.subcategory!)
    );
  }, [selectedFilters, products]);

  const { handlePageChange, totalPages, filteredItems } = usePagination({
    setPage,
    totalItems: filteredProducts?.length || 0,
    data: filteredProducts || [],
    page,
  });

  return (
    <div className="pt-10 xl:pt-20 flex gap-10 mx-10 flex-col lg:flex-row">
      <FilterProducts setPage={setPage} />

      <ProductFilterMobile setPage={setPage} />

      <div
        className={`mt-3 lg:mt-0 flex flex-wrap w-full ${
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
          isSuccess && (
            <p className="text-center lg:text-start">محصولی وجود ندارد.</p>
          )
        )}

        {filteredItems && filteredItems?.length > 0 && (
          <Pagination
            handlePageChange={handlePageChange}
            page={page}
            totalPages={totalPages}
          />
        )}
      </div>
    </div>
  );
};

export default ProductList;
