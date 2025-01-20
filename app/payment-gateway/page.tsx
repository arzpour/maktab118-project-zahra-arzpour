"use client";

import { useAppSelector } from "@/redux/hook";
import Link from "next/link";
import React from "react";

const PaymentGateway = () => {
  const totalPrice = useAppSelector((state) => state.product.totalPrice);

  const tax = totalPrice * 0.1;
  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-lg w-full text-right space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 border-b pb-4">
          درگاه پرداخت اینترنتی
        </h2>

        <div>
          <p className="text-gray-600 text-sm mb-2">اطلاعات پرداخت:</p>
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-700">مبلغ پرداخت:</span>
            <span className="text-lg font-bold text-green-600">
              {totalPrice + tax} تومان
            </span>
          </div>
        </div>

        <form className="space-y-4">
          <div>
            <label
              className="block text-sm text-gray-600 mb-1"
              htmlFor="card-number"
            >
              شماره کارت
            </label>
            <input
              type="text"
              id="card-number"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none"
              placeholder="**** **** **** ****"
              maxLength={19}
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label
                className="block text-sm text-gray-600 mb-1"
                htmlFor="expiry-date"
              >
                تاریخ انقضاء
              </label>
              <input
                type="text"
                id="expiry-date"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none"
                placeholder="MM/YY"
                maxLength={5}
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-1" htmlFor="cvv">
                کد CVV2
              </label>
              <input
                type="text"
                id="cvv"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none"
                placeholder="123"
                maxLength={4}
              />
            </div>
          </div>

          <div>
            <label
              className="block text-sm text-gray-600 mb-1"
              htmlFor="password"
            >
              رمز دوم
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none"
              placeholder="رمز دوم کارت خود را وارد کنید"
            />
          </div>

          <button
            type="button"
            className="w-full bg-BlueDark text-white font-medium px-4 py-2 rounded focus:outline-none"
          >
            <Link href={"/purchase-status?success=true"}>پرداخت</Link>
          </button>
          <p className="text-red-600 underline cursor-pointer font-bold text-sm text-center !mt-3">
            <Link href={"/purchase-status?success=false"}>کنسل</Link>
          </p>
        </form>
        <div className="text-sm text-gray-500 text-center border-t pt-4 !mt-3">
          <p>این درگاه صرفاً به‌عنوان نمونه طراحی شده است.</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;
