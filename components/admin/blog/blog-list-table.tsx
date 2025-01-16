"use client";

import { perPageLimit } from "@/utils/config";
import React from "react";
import Pagination from "../pagination";
import TotalPageTable from "../total-page-table";
import Image from "next/image";
import useGetBlogs from "@/hooks/useGetBlogs";
import ActionCategoryBtn from "../category/action-category-btn";

const BlogListTable = () => {
  const [page, setPage] = React.useState<number>(1);

  const { data } = useGetBlogs();

  console.log(data, "dataaaa");

  const totalPages = Math.ceil(data?.length! / perPageLimit);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
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
            {data?.map((el) => (
              <tr
                key={el._id}
                className="bg-BlueD border-b border-CyanBlueDark odd:bg-BlueD even:bg-CyanBlueDark"
              >
                <td className="p-4 py-5 flex justify-center">
                  <Image
                    src={`http://localhost:8000/images/categories/icons/${el.thumbnail}`}
                    alt="عکس محصول"
                    width={500}
                    height={500}
                    className="w-12 h-12 rounded"
                  />
                </td>
                <td className="px-4">
                  <p className="text-sm text-slate-400">{el.title}</p>
                </td>
                <td className="px-4 justify-items-center">
                  <div className="flex gap-1 justify-center truncate w-48 lg:w-72 !overflow-x-auto scrollbar">
                    {/* {getSubCategories(el.name || "")} */}i dont know
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
        <TotalPageTable page={page} total={data?.length!} />
      </div>
    </>
  );
};

export default BlogListTable;
