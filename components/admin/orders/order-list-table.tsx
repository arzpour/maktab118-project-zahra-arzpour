"use client";

import { perPageLimit } from "@/utils/config";
import React from "react";
import moment from "moment-jalaali";
import useOrderList from "@/hooks/useOrder";
import useUsersList from "@/hooks/useUsers";
import Pagination from "../pagination";
import TotalPageTable from "../total-page-table";
import OrdersBtn from "./order-filter-btn";
import OrdersModal from "../modals/orders-modal";

export enum Tab {
  All = "all",
  Loading = "loading",
  Delivered = "delivered",
}

const OrderListTable = () => {
  const [selectedTab, setSelectedTab] = React.useState<Tab>(Tab.All);
  const [page, setPage] = React.useState<number>(1);
  const [showOrderModal, setShowOrderModal] = React.useState<boolean>(false);
  const [orderId, setOrderId] = React.useState<string>("");

  const { data: allOrders } = useOrderList(Infinity);
  const { data: users } = useUsersList();

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const filteredData = allOrders?.data.orders.filter((item) => {
    if (selectedTab === Tab.All) return true;
    return selectedTab === Tab.Delivered
      ? item.deliveryStatus
      : !item.deliveryStatus;
  });

  const totalPages = Math.ceil(filteredData?.length || 0 / perPageLimit);

  const filteredItems = filteredData?.slice(
    (page - 1) * perPageLimit,
    page * perPageLimit
  );

  return (
    <>
      <div className="w-full flex flex-wrap justify-between items-center mb-4 mt-1 pl-3">
        <p className="font-medium xl:text-lg hidden md:block">سفارش ها</p>
        <OrdersBtn
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          setPage={setPage}
        />
      </div>

      <div className="relative flex flex-col w-full h-full text-slate-300 bg-CyanBlueDark shadow-md rounded-xl bg-clip-border overflow-auto scrollbar">
        <table className="w-full text-center table-auto min-w-max">
          <thead>
            <tr>
              <th className="p-4 py-6 border-b border-CyanBlueDark bg-CyanBlueDark">
                <p className="text-sm font-normal leading-none text-slate-400">
                  نام کاربر
                </p>
              </th>
              <th className="p-4 py-6 border-b border-CyanBlueDark bg-CyanBlueDark">
                <p className="text-sm font-normal leading-none text-slate-400">
                  مجموع مبلغ
                </p>
              </th>
              <th className="p-4 py-6 border-b border-CyanBlueDark bg-CyanBlueDark">
                <p className="text-sm font-normal leading-none text-slate-400">
                  زمان سفارش
                </p>
              </th>
              <th className="p-4 py-6 border-b border-CyanBlueDark bg-CyanBlueDark">
                <p className="text-sm font-normal leading-none text-slate-400">
                  وضعیت
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredItems?.map((el) => {
              return (
                <tr
                  key={el._id}
                  className="bg-BlueD border-b border-CyanBlueDark odd:bg-BlueD even:bg-CyanBlueDark"
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
                      </p>
                    ) : null}
                  </td>
                  <td className="px-4 py-5">
                    <p className="text-sm text-slate-400">{el.totalPrice}</p>
                  </td>
                  <td className="px-4 py-5 justify-items-center">
                    <p className="text-sm text-slate-400 text-right">
                      {moment(el.createdAt)
                        .locale("fa")
                        .format("jYYYY/jMM/jDD")}
                    </p>
                  </td>
                  <td className="px-4 py-5">
                    <button
                      onClick={() => {
                        setShowOrderModal(true);
                        setOrderId(el._id);
                      }}
                      className="text-orange text-sm"
                    >
                      بررسی سفارش
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap justify-between items-center gap-y-6 sm:px-10 py-3 mt-5">
        <Pagination
          handlePageChange={handlePageChange}
          page={page}
          totalPages={totalPages}
        />
        <TotalPageTable page={page} total={filteredData?.length || 0} />
      </div>

      {showOrderModal && (
        <OrdersModal setShowOrderModal={setShowOrderModal} id={orderId} />
      )}
    </>
  );
};

export default OrderListTable;
