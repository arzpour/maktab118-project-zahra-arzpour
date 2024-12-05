"use client";

import useProductList from "@/hooks/useProduct";
import { perPageLimit } from "@/utils/config";
import React from "react";
import Pagination from "../admin/pagination";
import TotalPageTable from "../admin/total-page-table";

const InventoryAndPriceListTable = () => {
  const { data, setPage, page } = useProductList();

  const totalPages = Math.ceil(data?.total! / perPageLimit);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <>
      <div className="relative flex flex-col w-full h-full text-slate-300 bg-[#0E1B2A] shadow-md rounded-xl bg-clip-border overflow-auto scrollbar">
        <table className="w-full text-center table-auto min-w-max">
          <thead>
            <tr>
              <th className="p-4 py-6 border-b border-[#0E1B2A] bg-[#0E1B2A] w-1/3">
                <p className="text-sm font-normal leading-none text-slate-400">
                  نام کالا
                </p>
              </th>
              <th className="p-4 py-6 border-b border-[#0E1B2A] bg-[#0E1B2A] w-1/4">
                <p className="text-sm font-normal leading-none text-slate-400">
                  قیمت کالا
                </p>
              </th>
              <th className="p-4 py-6 border-b border-[#0E1B2A] bg-[#0E1B2A] w-1/4">
                <p className="text-sm font-normal leading-none text-slate-400">
                  موجودی کالا
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.products.map((el) => (
              <tr
                key={el._id}
                className="bg-[#0c1724] border-b border-[#0E1B2A] odd:bg-[#0c1724] even:bg-[#0E1B2A]"
              >
                <td className="p-4">
                  <p className="text-sm text-slate-400">{el.name}</p>
                </td>
                <td className="p-4">
                  <p className="text-sm text-slate-400">{el.price}</p>
                </td>
                <td className="p-4">
                  <p className="text-sm text-slate-400">{el.quantity}</p>
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
        <TotalPageTable page={page} total={data?.total!} />
      </div>
    </>
  );
};

export default InventoryAndPriceListTable;
