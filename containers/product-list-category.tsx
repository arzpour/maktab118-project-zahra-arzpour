"use client";

import React from "react";
import useSubCategoryList from "@/hooks/useSubcategory";
import useProductList from "@/hooks/useProduct";
import Pagination from "@/components/admin/pagination";
import ProductCard, {
  ProductCardSkeleton,
} from "@/components/home/products/product-card";
import { notFound } from "next/navigation";
import usePagination from "@/hooks/usePagination";

interface IProductListByCategory {
  categoryId: string;
}

const ProductListByCategory: React.FC<IProductListByCategory> = ({
  categoryId,
}) => {
  const [selectedSubcategory, setSelectedSubcategory] = React.useState<
    string | null
  >(null);
  const [page, setPage] = React.useState<number>(1);

  const { data: subCategories, isLoading: loadingSubCategory } =
    useSubCategoryList(Infinity);
  const { data: products, isSuccess, isLoading } = useProductList(Infinity);

  const getProductsByCategory = products?.data?.products.filter(
    (el) => el.category === categoryId
  );

  const getSubCategoryList = subCategories?.data?.subcategories.filter(
    (el) => el.category === categoryId
  );

  const filteredProducts = React.useMemo(() => {
    if (selectedSubcategory === "all" || selectedSubcategory === null)
      return getProductsByCategory;
    return getProductsByCategory?.filter(
      (product) => product.subcategory === selectedSubcategory
    );
  }, [selectedSubcategory, getProductsByCategory]);

  const { handlePageChange, totalPages, filteredItems } = usePagination({
    setPage,
    totalItems: filteredProducts?.length || 0,
    data: filteredProducts || [],
    page,
  });

  const isExist = getSubCategoryList?.some((el) => el);

  if (isExist === false) {
    return notFound();
  }

  return (
    <div className="pt-20 px-5">
      <div className="flex gap-6 justify-center flex-wrap">
        <button
          onClick={() => setSelectedSubcategory("all")}
          className={`font-medium text-slate-100 px-4 py-2 rounded-lg cursor-pointer ${
            selectedSubcategory === "all" ? "bg-orange" : "bg-BlueDark"
          } ${loadingSubCategory ? "hidden" : "block"}`}
        >
          همه
        </button>
        {loadingSubCategory &&
          [1, 2, 3, 4].map((el) => (
            <div
              className="w-32 h-8 rounded-lg bg-BlueDark animate-pulse"
              key={el}
            ></div>
          ))}
        {getSubCategoryList?.map((subcategory) => (
          <button
            key={subcategory._id}
            onClick={() => {
              setSelectedSubcategory(subcategory._id || null);
              setPage(1);
            }}
            className={`font-medium text-slate-100 px-4 py-2 rounded-lg cursor-pointer ${
              selectedSubcategory === subcategory._id
                ? "bg-orange"
                : "bg-BlueDark"
            }`}
          >
            {subcategory.name}
          </button>
        ))}
      </div>

      <div className="mt-5 lg:mt-10 xl:mt-14 flex justify-center items-center flex-wrap gap-6">
        {isLoading &&
          [1, 2, 3, 4, 5, 6, 7, 8].map((el) => (
            <ProductCardSkeleton key={el} />
          ))}

        {filteredItems && filteredItems?.length > 0 ? (
          <div className="mt-3 md:mt-10 lg:mt-0 flex flex-col gap-2 flex-wrap justify-center items-center">
            <div className="flex gap-7 flex-wrap mb-10 justify-center">
              {filteredItems?.map((el) => (
                <ProductCard key={el._id} {...el} />
              ))}
            </div>
            <Pagination
              handlePageChange={handlePageChange}
              page={page}
              totalPages={totalPages}
            />
          </div>
        ) : (
          isSuccess && (
            <p className="text-slate-300">
              محصولی برای این زیر مجموعه وجود ندارد.
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default ProductListByCategory;
