"use client";
import { TbTruckLoading } from "react-icons/tb";
import { IoMdCheckboxOutline } from "react-icons/io";
import React from "react";
import { getUserId } from "@/utils/session";
import moment from "moment-jalaali";
import useOrderList from "@/hooks/useOrder";
import { perPageLimit } from "@/utils/config";
import Pagination from "../admin/pagination";
import OrdersModal from "../admin/modals/orders-modal";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { MdOutlineArrowBack } from "react-icons/md";
import { profileActions } from "@/redux/features/profile.slice";

type ordersStatusType = "active" | "done";

const UserOrders = () => {
  const [ordersStatus, setOrdersStatus] =
    React.useState<ordersStatusType>("active");
  const [page, setPage] = React.useState<number>(1);
  const [showOrderModal, setShowOrderModal] = React.useState<boolean>(false);
  const [orderId, setOrderId] = React.useState<string>("");

  const userId = getUserId();
  const { profileTab } = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();

  const { data: orderList, isSuccess } = useOrderList(Infinity);

  const orderListById = orderList?.data.orders.filter(
    (el) => el.user === userId
  );

  const filteredData = orderListById?.filter((item) => {
    return ordersStatus === "done" ? item.deliveryStatus : !item.deliveryStatus;
  });

  const totalPages = Math.ceil((filteredData?.length || 0) / perPageLimit);

  const filteredItems = filteredData?.slice(
    (page - 1) * perPageLimit,
    page * perPageLimit
  );

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    profileTab === "orders" && (
      <>
        {orderListById ? (
          <>
            <div className="flex justify-between items-center">
              <div className="flex">
                <button
                  onClick={() => {
                    setOrdersStatus("active");
                  }}
                  className={`inline-flex items-center justify-center text-sm p-4 pb-3 rounded-t-lg outline-none ${
                    ordersStatus === "active"
                      ? " border-b-2 border-orange text-orange"
                      : "text-gray-300 hover:text-gray-300"
                  }`}
                >
                  <IoMdCheckboxOutline
                    className={`w-5 h-5 me-2 ${
                      ordersStatus === "active"
                        ? "text-orange"
                        : "text-gray-300"
                    }`}
                  />
                  در انتظار ارسال
                </button>
                <button
                  onClick={() => {
                    setOrdersStatus("done");
                  }}
                  className={`inline-flex items-center justify-center text-sm p-4 pb-3 rounded-t-lg outline-none ${
                    ordersStatus === "done"
                      ? " border-b-2 border-orange text-orange"
                      : "text-gray-300 hover:text-gray-300"
                  }`}
                >
                  <TbTruckLoading
                    className={`w-5 h-5 me-2 ${
                      ordersStatus === "done" ? "text-orange" : "text-gray-300"
                    }`}
                  />
                  تحویل داده شده
                </button>
              </div>

              <button
                className="sm:hidden"
                onClick={() => dispatch(profileActions.setProfileTab(""))}
              >
                <MdOutlineArrowBack className="text-slate-200 w-6 h-6" />
              </button>
            </div>

            {filteredData && filteredData?.length > 0 ? (
              <>
                <div className="relative mt-10 mb-9 flex flex-col w-full text-slate-300 bg-CyanBlueDark shadow-md rounded-xl bg-clip-border overflow-auto scrollbar">
                  <table className="w-full text-center table-auto min-w-max">
                    <thead>
                      <tr>
                        <th className="p-4 py-6 border-b border-CyanBlueDark bg-CyanBlueDark">
                          <p className="text-sm font-normal leading-none text-slate-400">
                            کد سفارش
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
                        <th className="p-4 py-6 border-b border-CyanBlueDark bg-CyanBlueDark">
                          <p className="text-sm font-normal leading-none text-slate-400">
                            لیست محصولات
                          </p>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredItems?.map((el, index) => {
                        return (
                          <tr
                            key={el._id}
                            className="bg-BlueD border-b border-CyanBlueDark odd:bg-BlueD even:bg-CyanBlueDark"
                          >
                            <td className="px-4 py-5">
                              <p className="text-sm text-slate-400">
                                {(page - 1) * perPageLimit + index + 1}
                              </p>
                            </td>
                            <td className="px-4 py-5">
                              <p className="text-sm text-slate-400">
                                {el.totalPrice}
                              </p>
                            </td>
                            <td className="px-4 py-5 justify-items-center">
                              <p className="text-sm text-slate-400 text-right">
                                {moment(el.createdAt)
                                  .locale("fa")
                                  .format("jYYYY/jMM/jDD")}
                              </p>
                            </td>
                            <td className="px-4 py-5 flex justify-center">
                              <p
                                className={`text-xs px-3 py-1.5 text-BackgroundColor text-right rounded-xl ${
                                  el.deliveryStatus === false
                                    ? "bg-orange"
                                    : "bg-green-600"
                                }`}
                              >
                                {el.deliveryStatus === false
                                  ? "در حال ارسال"
                                  : "ارسال شده"}
                              </p>
                            </td>
                            <td className="px-4 py-5 justify-items-center">
                              <button
                                onClick={() => {
                                  setShowOrderModal(true);
                                  setOrderId(el._id);
                                }}
                                className="text-xs text-orange text-right"
                              >
                                جزيیات سفارش
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <Pagination
                  handlePageChange={handlePageChange}
                  page={page}
                  totalPages={totalPages}
                />
              </>
            ) : (
              <p className="mt-10">سفارشی وجود ندارد.</p>
            )}
            {showOrderModal && (
              <OrdersModal
                setShowOrderModal={setShowOrderModal}
                id={orderId}
                userOrder={true}
              />
            )}
          </>
        ) : (
          isSuccess && <p>سفارشی وجود ندارد.</p>
        )}
      </>
    )
  );
};

export default UserOrders;
