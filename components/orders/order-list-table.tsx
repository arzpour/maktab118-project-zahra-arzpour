"use client";

import { perPageLimit } from "@/utils/config";
import React from "react";
import moment from "moment";
import useOrderList from "@/hooks/useOrder";
import useUsersList from "@/hooks/useUsers";
import Pagination from "../admin/pagination";
import TotalPageTable from "../admin/total-page-table";
import OrdersBtn from "./order-filter-btn";

export enum Tab {
  All = "all",
  Loading = "loading",
  Delivered = "delivered",
}

const OrderListTable = () => {
  const [selectedTab, setSelectedTab] = React.useState<Tab>(Tab.All);
  const { page, setPage, data: orders } = useOrderList();
  const { data: allOrders } = useOrderList(Infinity);
  const { data: users } = useUsersList();

  console.log(users, "all");

  const totalPages = Math.ceil(orders?.total! / perPageLimit);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const loading = allOrders?.data.orders.filter(
    (ord) => ord.deliveryStatus === false
  );

  const delivered = allOrders?.data.orders.filter(
    (ord) => ord.deliveryStatus === true
  );

  const totalDeliveredPages = Math.ceil(delivered?.length! / perPageLimit);
  const totalLoadingPages = Math.ceil(loading?.length! / perPageLimit);

  const tableBody = (tableOrders: IOrder[]) => {
    return tableOrders.map((el) => {
      return (
        <tr
          key={el._id}
          className="bg-[#0c1724] border-b border-[#0E1B2A] odd:bg-[#0c1724] even:bg-[#0E1B2A]"
        >
          <td className="px-4 py-5">
            {users?.data.users.find((user) => user._id === el.user) ? (
              <p className="text-sm text-slate-400">
                {`${
                  users?.data.users.find((user) => user._id === el.user)
                    ?.firstname
                } ${
                  users?.data.users.find((user) => user._id === el.user)
                    ?.lastname
                }`}
                {/* {
                  users?.data.users.find((user) => user._id === el.user)
                    ?.firstname
                } */}
              </p>
            ) : null}
          </td>
          <td className="px-4 py-5">
            <p className="text-sm text-slate-400">{el.totalPrice}</p>
          </td>
          <td className="px-4 py-5 justify-items-center">
            <p className="text-sm text-slate-400 text-right">
              {moment(el.createdAt).format("YYYY/MM/DD")}
            </p>
          </td>
          <td className="px-4 py-5">
            <button className="text-orange text-sm">بررسی سفارش</button>
          </td>
        </tr>
      );
    });
  };

  const paginationRender = (total: number) => {
    return (
      <Pagination
        page={page}
        totalPages={total}
        handlePageChange={handlePageChange}
      />
    );
  };

  const getTotalPage = (total: number) => {
    return <TotalPageTable page={page} total={total} />;
  };

  return (
    <>
      <div className="w-full flex flex-wrap justify-between items-center mb-4 mt-1 pl-3">
        <p className="font-medium xl:text-lg hidden md:block">سفارش ها</p>
        <OrdersBtn selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      </div>

      <div className="relative flex flex-col w-full h-full text-slate-300 bg-[#0E1B2A] shadow-md rounded-xl bg-clip-border overflow-hidden">
        <table className="w-full text-center table-auto min-w-max">
          <thead>
            <tr>
              <th className="p-4 py-6 border-b border-[#0E1B2A] bg-[#0E1B2A]">
                <p className="text-sm font-normal leading-none text-slate-400">
                  نام کاربر
                </p>
              </th>
              <th className="p-4 py-6 border-b border-[#0E1B2A] bg-[#0E1B2A]">
                <p className="text-sm font-normal leading-none text-slate-400">
                  مجموع مبلغ
                </p>
              </th>
              <th className="p-4 py-6 border-b border-[#0E1B2A] bg-[#0E1B2A]">
                <p className="text-sm font-normal leading-none text-slate-400">
                  زمان سفارش
                </p>
              </th>
              <th className="p-4 py-6 border-b border-[#0E1B2A] bg-[#0E1B2A]">
                <p className="text-sm font-normal leading-none text-slate-400">
                  وضعیت
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {selectedTab === Tab.Delivered
              ? tableBody(delivered || [])
              : selectedTab === Tab.Loading
              ? tableBody(loading || [])
              : tableBody(orders?.data.orders || [])}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap justify-between items-center gap-y-6 sm:px-10 py-3 mt-5">
        {selectedTab === Tab.Loading
          ? paginationRender(totalLoadingPages)
          : selectedTab === Tab.Delivered
          ? paginationRender(totalDeliveredPages)
          : paginationRender(totalPages)}

        {selectedTab === Tab.Loading
          ? getTotalPage(loading?.length!)
          : selectedTab === Tab.Delivered
          ? getTotalPage(delivered?.length!)
          : getTotalPage(orders?.total!)}
      </div>
    </>
  );
};

export default OrderListTable;
