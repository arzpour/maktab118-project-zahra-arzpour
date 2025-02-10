"use client";

import { useAppSelector } from "@/redux/hook";
import Link from "next/link";
import React from "react";
import { IoLocationSharp } from "react-icons/io5";
import useUserById from "@/hooks/useUserById";
import EditAddress from "./edit-address";
import DatePickerDelivery from "../form/datepicker";
import Image from "next/image";

const PaymentProducts = () => {
  const [showEditAddressModal, setShowEditAddressModal] =
    React.useState<boolean>(false);

  const list = useAppSelector((state) => state.product.list);

  const totalPrice = useAppSelector((state) => state.product.totalPrice);

  const tax = totalPrice * 0.1;

  const { data: user, isSuccess } = useUserById();

  return (
    <div className="mb-20 mx-10">
      <div className="grid lg:grid-cols-5 gap-7 xl:gap-10 max-lg:max-w-1500 lg:w-11/12 mx-auto">
        <div className="lg:col-span-3 bg-BackgroundColor px-4">
          {list.map((el) => (
            <div
              key={el._id}
              className="grid md:grid-cols-2 xl:grid-cols-3 items-center gap-4 mx-10 md:mx-0 border-b border-slate-700 pb-5 pt-7 rounded"
            >
              <div className="col-span-3 flex items-center gap-6">
                <Image
                  src={`http://localhost:8000/images/products/thumbnails/${el.thumbnail}`}
                  alt="product-image"
                  className="w-28 h-20 rounded"
                  width={400}
                  height={400}
                />

                <div className="flex flex-col gap-2 ml-auto">
                  <h3 className="text-base font-bold text-slate-200">
                    <Link href={`/product/${el._id}`}>{el.name}</Link>
                  </h3>
                  <h6 className="text-sm text-gray-500 mt-1">
                    تعداد:
                    <span className="mr-1 font-semibold">
                      {el.selectedQuantity}
                    </span>
                  </h6>
                </div>

                <div className="flex items-center ml-5">
                  <h4 className="text-sm text-slate-400">{el.price} تومان</h4>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-2 bg-BackgroundColor text-white rounded-md px-4 py-6 h-max mx-5">
          <ul className="text-slate-300 space-y-5">
            <li className="flex flex-wrap gap-4 text-sm">
              قیمت کالاها
              <span className="mr-auto font-bold">{totalPrice} تومان</span>
            </li>
            <li className="flex flex-wrap gap-4 text-sm">
              مالیات
              <span className="mr-auto font-bold">{tax} تومان</span>
            </li>
            <hr className="border-slate-600" />
            <li className="flex flex-wrap gap-4 text-sm font-bold">
              قیمت کل
              <span className="mr-auto">{totalPrice + tax} تومان</span>
            </li>
          </ul>

          <div className="mt-8 space-y-2">
            <button
              type="button"
              className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-BlueDark hover:bg-BlueL text-white rounded-md"
            >
              <Link href={"/payment-gateway"}>پرداخت</Link>
            </button>
          </div>

          {isSuccess && (
            <div className="flex justify-between gap-4 items-center flex-wrap mt-10">
              <div className="flex gap-3 flex-wrap">
                <IoLocationSharp className="w-5 h-5" />
                <p className="text-slate-300 text-sm">
                  آدرس تحویل سفارش:
                  <span title={user?.data?.user.address} className="mr-3">
                    {user?.data?.user.address}
                  </span>
                </p>
              </div>
              <button
                onClick={() => setShowEditAddressModal(true)}
                className="text-sm underline text-slate-500"
              >
                ویرایش آدرس
              </button>
            </div>
          )}

          <DatePickerDelivery />
        </div>
      </div>
      {showEditAddressModal && (
        <EditAddress setShowEditAddressModal={setShowEditAddressModal} />
      )}
    </div>
  );
};

export default PaymentProducts;
