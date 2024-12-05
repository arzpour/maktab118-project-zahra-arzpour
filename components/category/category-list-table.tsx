"use client";

import { perPageLimit } from "@/utils/config";
import React from "react";
import useCategoryList from "@/hooks/useCategory";
import Pagination from "../admin/pagination";
import useSubCategoryList from "@/hooks/useSubcategory";
import TotalPageTable from "../admin/total-page-table";

const CategoryListTable = () => {
  const { page, setPage, data: categories } = useCategoryList();

  const { data: subCategories } = useSubCategoryList(Infinity);

  const totalPages = Math.ceil(categories?.total! / perPageLimit);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

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
                  <img
                    src={`http://localhost:8000/images/categories/icons/${el.icon}`}
                    alt="عکس محصول"
                    className="w-12 h-12 rounded"
                  />
                </td>
                <td className="px-4">
                  <p className="text-sm text-slate-400">{el.name}</p>
                </td>
                <td className="px-4 justify-items-center">
                  <div className="flex gap-1 justify-center truncate w-48 lg:w-72 !overflow-x-auto scrollbar">
                    {getSubCategories(el.name!)}
                  </div>
                </td>

                <td className="px-4">
                  <button className="bg-red-600 text-white py-1.5 px-5 rounded text-sm ml-2">
                    حذف
                  </button>
                  <button className="bg-orange text-white py-1.5 px-5 rounded text-sm mr-2">
                    ویرایش
                  </button>
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
        <TotalPageTable page={page} total={categories?.total!} />
      </div>
    </>
  );
};

export default CategoryListTable;
