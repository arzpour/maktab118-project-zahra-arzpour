"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hook";
import Link from "next/link";
import React from "react";
import ProductShoppingCart from "./product-card";
import { productActions } from "@/redux/features/product.slice";
import { getUserId } from "@/utils/session";
import { useDeleteShoppingCart } from "@/apis/mutations/shopping-cart";

const ShoppingCart = () => {
  const list = useAppSelector((state) => state.product.list);

  const totalPrice = useAppSelector((state) => state.product.totalPrice);

  const dispatch = useAppDispatch();

  const deleteShoppingCart = useDeleteShoppingCart();

  const userId = getUserId();

  const deleteShoppingCartHandler = async () => {
    try {
      await deleteShoppingCart.mutateAsync(userId || "");

      dispatch(productActions.removeAll());
    } catch (error) {
      console.log(error);
    }
  };

  const remove = async () => {
    dispatch(productActions.removeAll());
    await deleteShoppingCartHandler();
  };

  return (
    <div className="max-w-[1200px] lg:mx-auto sm:p-4 pt-10 mb-8 sm:mx-5">
      {list.length === 0 ? (
        <p className="text-white font-medium">سبد خرید شما خالی است</p>
      ) : (
        <section className="w-full relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0">
          <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto relative z-10">
            <div className="grid grid-cols-14">
              <div className="col-span-12 lg:pr-8 pb-8 w-full max-xl:max-w-3xl max-xl:mx-auto">
                <div className="grid grid-cols-12 relative mt-8 max-md:hidden pb-6 border-b border-slate-800 rounded-sm">
                  <div className="col-span-12 md:col-span-5">
                    <p className="font-normal leading-8 text-slate-200">
                      محصول
                    </p>
                  </div>
                  <div className="col-span-12 md:col-span-5">
                    <div className="grid grid-cols-5">
                      <div className="col-span-3">
                        <p className="font-normal leading-8 text-slate-200 text-center">
                          تعداد
                        </p>
                      </div>
                      <div className="col-span-2">
                        <p className="font-normal leading-8 text-slate-200 text-center">
                          قیمت
                        </p>
                      </div>
                      <div
                        onClick={remove}
                        className="absolute top-0 left-1 font-normal text-sm leading-8 text-slate-200 underline cursor-pointer text-center"
                      >
                        حذف همه
                      </div>
                    </div>
                  </div>
                </div>

                {list.map((el) => (
                  <ProductShoppingCart key={el._id} {...el} />
                ))}
              </div>
              <div className="flex justify-between items-center sm:pr-10 col-span-12 lg:pr-8 pb-8 w-full max-xl:max-w-3xl max-xl:mx-auto">
                <p className="text-slate-300 text-sm sm:text-base">
                  قیمت کل: {totalPrice} تومان
                </p>
                <Link
                  href={"/payment"}
                  className="bg-green-600 rounded py-2 px-4 sm:px-7 text-center text-sm"
                >
                  نهایی کردن سبد خرید
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ShoppingCart;
