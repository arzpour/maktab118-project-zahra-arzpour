"use client";

import React from "react";
import useSubCategoryList from "@/hooks/useSubcategory";
import useProductList from "@/hooks/useProduct";
import Pagination from "@/components/admin/pagination";
import { perPageLimit } from "@/utils/config";
import ProductCard from "@/components/home/products/product-card";

interface ICategoryProducts {
  categoryId: string;
}

const ProductListByCategory: React.FC<ICategoryProducts> = ({ categoryId }) => {
  const [selectedSubcategory, setSelectedSubcategory] = React.useState<
    string | null
  >(null);
  const [page, setPage] = React.useState<number>(1);

  const { data: subCategories } = useSubCategoryList(Infinity);
  const { data: products } = useProductList(Infinity);

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

  console.log(filteredProducts, "fil");

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const totalPages = Math.ceil(filteredProducts?.length! / perPageLimit);

  const filteredItems = filteredProducts?.slice(
    (page - 1) * perPageLimit,
    page * perPageLimit
  );

  return (
    <div className="pt-20 px-5">
      <div className="flex gap-6 justify-center flex-wrap">
        <p
          onClick={() => setSelectedSubcategory("all")}
          className={`font-medium text-slate-100 px-4 py-2 rounded cursor-pointer ${
            selectedSubcategory === "all" ? "bg-orange" : "bg-BlueDark"
          }`}
        >
          همه
        </p>
        {getSubCategoryList?.map((subcategory) => (
          <p
            key={subcategory._id}
            onClick={() => setSelectedSubcategory(subcategory._id || null)}
            className={`font-medium text-slate-100 px-4 py-2 rounded cursor-pointer ${
              selectedSubcategory === subcategory._id
                ? "bg-orange"
                : "bg-BlueDark"
            }`}
          >
            {subcategory.name}
          </p>
        ))}
      </div>

      <div className="mt-5 lg:mt-10 xl:mt-14 flex justify-center items-center flex-wrap gap-6">
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
          <p className="text-slate-300">
            محصولی برای این زیر مجموعه وجود ندارد.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductListByCategory;
