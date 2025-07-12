"use client";

import React from "react";
import useCategoryList from "@/hooks/useCategory";
import Pagination from "../pagination";
import useSubCategoryList from "@/hooks/useSubcategory";
import TotalPageTable from "../total-page-table";
import Image from "next/image";
import ActionCategoryBtn from "./action-category-btn";
import usePagination from "@/hooks/usePagination";

const CategoryListTable = () => {
  const { page, setPage, data: categories } = useCategoryList();

  const { data: subCategories } = useSubCategoryList(Infinity);

  const { handlePageChange, totalPages } = usePagination({
    setPage,
    totalItems: categories?.total || 0,
  });

  const getSubCategories = (categoryName: string) => {
    const categoryId = categories?.data?.categories.find(
      (category) => category.name === categoryName
    )?._id;

    const filteredSubCategories = subCategories?.data?.subcategories.filter(
      (subCategory) => subCategory.category === categoryId
    );

    if (filteredSubCategories?.length) {
      return filteredSubCategories.map((sub, index) => (
        <p key={sub._id} className="text-sm text-slate-400">
          {index < filteredSubCategories.length - 1
            ? `${sub.name}, `
            : `${sub.name}`}
        </p>
      ));
    }

    return <p className="text-sm text-slate-400">بدون زیر مجموعه</p>;
  };

  return (
    <>
      <div className="relative flex flex-col w-full h-full text-slate-300 bg-CyanBlueDark shadow-md rounded-xl bg-clip-border overflow-auto scrollbar">
        <table className="w-full text-center table-auto min-w-max">
          <thead>
            <tr>
              <th className="p-4 py-6 border-b border-CyanBlueDark bg-CyanBlueDark">
                <p className="text-sm font-normal leading-none text-slate-400">
                  آیکون دسته بندی
                </p>
              </th>
              <th className="p-4 py-6 border-b border-CyanBlueDark bg-CyanBlueDark">
                <p className="text-sm font-normal leading-none text-slate-400">
                  نام دسته بندی
                </p>
              </th>
              <th className="p-4 py-6 border-b border-CyanBlueDark bg-CyanBlueDark">
                <p className="text-sm font-normal leading-none text-slate-400">
                  زیر مجموعه ها
                </p>
              </th>
              <th className="p-4 py-6 border-b border-CyanBlueDark bg-CyanBlueDark">
                <p className="text-sm font-normal leading-none text-slate-400">
                  تغییرات
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {categories?.data?.categories.map((el) => (
              <tr
                key={el._id}
                className="bg-BlueD border-b border-CyanBlueDark odd:bg-BlueD even:bg-CyanBlueDark"
              >
                <td className="p-4 py-5 flex justify-center">
                  <Image
                    src={`http://localhost:8000/images/categories/icons/${el.icon}`}
                    alt="عکس محصول"
                    width={500}
                    height={500}
                    className="w-12 h-12 rounded"
                  />
                </td>
                <td className="px-4">
                  <p className="text-sm text-slate-400">{el.name}</p>
                </td>
                <td className="px-4 justify-items-center">
                  <div className="flex gap-1 justify-center truncate w-48 lg:w-72 !overflow-x-auto scrollbar">
                    {getSubCategories(el.name || "")}
                  </div>
                </td>

                <td className="px-4">
                  <ActionCategoryBtn id={el._id || ""} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap justify-between items-center gap-y-6 sm:px-10 py-3 mt-5">
        <Pagination
          page={page}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
        <TotalPageTable page={page} total={categories?.total || 0} />
      </div>
    </>
  );
};

export default CategoryListTable;
