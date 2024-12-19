import { useAppSelector } from "@/redux/hook";
import React from "react";
import Link from "next/link";
import ShoppingProductCard from "./shopping-product-card";

const ShoppingCartDropDown = () => {
  return (
    <div className="absolute z-50">
      <div className="flex h-64 justify-center">
        <div className="relative ">
          <div className="w-full rounded-b border-t-0 z-10">
            <div className="shadow-xl w-96 absolute left-0 rounded bg-slate-200 p-4">
              <ul
                role="list"
                className="-my-6 p-2 border-b border-slate-300 last:border-none"
              >
                <ShoppingProductCard />
              </ul>

              <div className="pt-5 pb-1.5 px-4 justify-center flex divide-gray-200 gap-4">
                <Link
                  href={"/shopping-cart"}
                  className="text-sm hover:scale-105 transition-all text-center focus:outline-none px-6 py-2 rounded font-bold cursor-pointer bg-orange w-full text-white"
                >
                  سبد خرید
                </Link>
                <Link
                  href={"/payment"}
                  className="text-sm hover:scale-105 transition-all text-center focus:outline-none px-6 py-2 rounded font-bold cursor-pointer bg-green-600 w-full text-white"
                >
                  پرداخت
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartDropDown;
