import { useAppSelector } from "@/redux/hook";
import React from "react";
import ShoppingProductCard from "./shopping-product-card";
import Link from "next/link";

interface IShoppingCartDropDown {
  hamburgerMenu?: boolean;
}

const ShoppingCartDropDown: React.FC<IShoppingCartDropDown> = ({
  hamburgerMenu,
}) => {
  const list = useAppSelector((state) => state.product.list);

  return (
    <div className="absolute z-50">
      <div className="flex h-64 justify-center">
        <div className="relative ">
          <div className="w-full rounded-b border-t-0 z-10">
            <div
              className={`shadow-xl absolute ${
                hamburgerMenu ? "right-0 w-[300px] top-7" : " left-0 w-96"
              } rounded bg-slate-200 p-4`}
            >
              {list.length > 0 ? (
                <ul role="list" className="-my-6 p-2">
                  {list.map((el) => (
                    <ShoppingProductCard key={el._id} {...el} />
                  ))}
                </ul>
              ) : (
                <p className="text-BlueDark text-sm">سبد خرید خالی میباشد.</p>
              )}

              {list.length > 0 && (
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartDropDown;
