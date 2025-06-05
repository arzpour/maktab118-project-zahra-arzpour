"use client";

import { perPageLimit } from "@/utils/config";
import React from "react";
import Pagination from "../pagination";
import TotalPageTable from "../total-page-table";
import Image from "next/image";
import useGetBlogs from "@/hooks/useGetBlogs";
import ActionBlogBtn from "./action-blog-btn";
import usePagination from "@/hooks/usePagination";

const BlogListTable = () => {
  const { data: blogs, page, setPage } = useGetBlogs(perPageLimit);

  const { handlePageChange, totalPages } = usePagination({
    setPage,
    totalItems: blogs?.totalPages || 0,
  });

  return (
    <>
      <div className="relative flex flex-col w-full h-full text-slate-300 bg-CyanBlueDark shadow-md rounded-xl bg-clip-border overflow-auto scrollbar">
        <table className="w-full text-center table-auto min-w-max">
          <thead>
            <tr className="col-span-12">
              <th className="p-4 py-6 border-b border-CyanBlueDark bg-CyanBlueDark w-1/3">
                <p className="text-sm font-normal leading-none text-slate-400">
                  تصویر بلاگ
                </p>
              </th>
              <th className="p-4 py-6 border-b border-CyanBlueDark bg-CyanBlueDark w-2/5">
                <p className="text-sm font-normal leading-none text-slate-400">
                  عنوان بلاگ
                </p>
              </th>
              <th className="p-4 py-6 border-b border-CyanBlueDark bg-CyanBlueDark w-1/3">
                <p className="text-sm font-normal leading-none text-slate-400">
                  تغییرات
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs?.data?.map((el) => (
              <tr
                key={el._id}
                className="bg-BlueD border-b border-CyanBlueDark odd:bg-BlueD even:bg-CyanBlueDark"
              >
                <td className="p-4 py-5 flex justify-center">
                  <Image
                    src={`http://localhost:8000/images/blogs/${el.thumbnail}`}
                    alt="عکس محصول"
                    width={500}
                    height={500}
                    className="w-12 h-12 rounded"
                  />
                </td>
                <td className="px-4">
                  <p className="text-sm text-slate-400">{el.title}</p>
                </td>
                <td className="px-4">
                  <ActionBlogBtn id={el._id || ""} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap justify-between items-center gap-y-6 sm:px-10 py-3 mt-5">
        <Pagination
          page={blogs?.page || 0}
          totalPages={totalPages || 0}
          handlePageChange={handlePageChange}
        />
        <TotalPageTable page={page} total={blogs?.total ?? 0} />
      </div>
    </>
  );
};

export default BlogListTable;
