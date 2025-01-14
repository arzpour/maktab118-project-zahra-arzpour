"use client";

import useCategoryList from "@/hooks/useCategory";
import useProductList from "@/hooks/useProduct";
import useSubCategoryList from "@/hooks/useSubcategory";
import { perPageLimit } from "@/utils/config";
import React from "react";
import Pagination from "../pagination";
import TotalPageTable from "../total-page-table";
import ActionBtns from "./action-product-btns";
import Image from "next/image";

const ProductListTable = () => {
  const { data: products, setPage, page } = useProductList();
  const { data: categories } = useCategoryList(Infinity);

  const { data: subCategories } = useSubCategoryList(Infinity);

  const totalPages = Math.ceil(products?.total! / perPageLimit);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const getCategoryAndSubCategory = (
    categoryId: string,
    subcategoryId: string
  ) => {
    const cate = categories?.data?.categories.find(
      (category) => category._id === categoryId
    );
    const subCate = subCategories?.data?.subcategories.find(
      (subCategory) => subCategory._id === subcategoryId
    );

    return (
      <p className="text-sm text-slate-400">
        {cate?.name || "بدون دسته‌بندی"} /{subCate?.name || "بدون زیر مجموعه"}
      </p>
    );
  };

  return (
    <>
      <div className="relative flex flex-col w-full h-full text-slate-300 bg-CyanBlueDark shadow-md rounded-xl bg-clip-border overflow-auto scrollbar">
        <table className="w-full text-center table-auto min-w-max">
          <thead>
            <tr>
              <th className="p-4 py-6 border-b border-CyanBlueDark bg-CyanBlueDark w-1/5">
                <p className="text-sm font-normal leading-none text-slate-400">
                  تصویر
                </p>
              </th>
              <th className="p-4 py-6 border-b border-CyanBlueDark bg-CyanBlueDark w-1/4">
                <p className="text-sm font-normal leading-none text-slate-400">
                  نام کالا
                </p>
              </th>
              <th className="p-4 py-6 border-b border-CyanBlueDark bg-CyanBlueDark w-1/5">
                <p className="text-sm font-normal leading-none text-slate-400">
                  دسته بندی
                </p>
              </th>
              <th className="p-4 py-6 border-b border-CyanBlueDark bg-CyanBlueDark w-1/5">
                <p className="text-sm font-normal leading-none text-slate-400">
                  تغییرات
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {products?.data?.products.map((el) => (
              <tr
                key={el._id}
                className="bg-BlueD border-b border-CyanBlueDark odd:bg-BlueD even:bg-CyanBlueDark"
              >
                <td className="p-4 py-5 flex justify-center">
                  <Image
                    width={800}
                    height={500}
                    src={`http://localhost:8000/images/products/images/${el.images?.[0]}`}
                    alt="عکس محصول"
                    className="w-12 h-12 rounded"
                  />
                </td>
                <td className="px-4">
                  <p className="text-sm text-slate-400">{el.name}</p>
                </td>
                <td className="px-4">
                  {getCategoryAndSubCategory(el.category!, el.subcategory!)}
                </td>
                <td className="px-4">
                  <ActionBtns id={el._id!} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap justify-start sm:justify-between gap-6 items-center sm:px-10 py-3 mt-5">
        <Pagination
          page={page}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />

        <TotalPageTable page={page} total={products?.total!} />
      </div>
    </>
  );
};

export default ProductListTable;
