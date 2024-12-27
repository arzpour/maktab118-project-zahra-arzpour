"use client";

import { productActions } from "@/redux/features/product.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getRole } from "@/utils/session";
import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { IoRemove } from "react-icons/io5";
import { toast } from "react-toastify";

interface IAddToCart {
  addToCart: (quantity: number) => void;
  productId?: string;
  quantity: number;
}
const AddToCartBtn: React.FC<IAddToCart> = ({
  addToCart,
  productId,
  quantity,
}) => {
  const list = useAppSelector((state) => state.product.list);
  const productItem = list.find((el) => el._id === productId);

  const [selectedQuantity, setSelectedQuantity] = React.useState<number>(
    productItem?.selectedQuantity || 1
  );

  const dispatch = useAppDispatch();

  const increaseQuantity = () => {
    if (productId && selectedQuantity < quantity) {
      setSelectedQuantity((prev) => prev + 1);
      dispatch(
        productActions.increase({
          _id: productId,
          quantity: 1,
        })
      );
    }
  };

  const decreaseQuantity = () => {
    if (productId && productItem?.selectedQuantity! > 1) {
      setSelectedQuantity((prev) => prev - 1);
      dispatch(
        productActions.decrease({
          _id: productId,
          quantity: 1,
        })
      );
    }
  };

  const addToCartHandler = () => {
    const role = getRole();

    if (role && role === "ADMIN") {
      toast.error("شما مجاز به انجام این عملیات نیستید.");
      return;
    }
    addToCart(selectedQuantity);

    if (productItem) {
      toast.error("محصول شما در سبد خرید موجود میباشد.");
    } else {
      toast.success("محصول شما به سبد خرید اضافه شد");
    }
  };

  React.useEffect(() => {
    if (productItem?.selectedQuantity === undefined) {
      setSelectedQuantity(1);
    }
  }, [productItem]);

  return (
    <div className="flex gap-6 items-center">
      <div className="flex gap-2 h-9 items-center px-3 border border-gray-400 bg-BlueDark text-gray-800 text-xs outline-none bg-transparent rounded-md">
        <button onClick={increaseQuantity}>
          <IoMdAdd className="text-slate-100 w-5 h-4" />
        </button>
        <span className="mx-2.5 text-slate-100">
          {productItem?.selectedQuantity
            ? productItem?.selectedQuantity
            : selectedQuantity}
        </span>
        <button onClick={decreaseQuantity}>
          <IoRemove className="text-slate-100 w-5 h-4" />
        </button>
      </div>
      <div
        onClick={addToCartHandler}
        className="inline-flex gap-3 cursor-pointer bg-BlueDark shadow items-start rounded-lg bg-primary-700 px-6 py-3 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        <FaShoppingCart className="text-slate-100 w-5 h-4" />
        اضافه کردن به سبد خرید
      </div>
    </div>
  );
};

export default AddToCartBtn;

export const AddToCartBtnSkeleton = () => {
  return (
    <div className="flex gap-6 items-center animate-pulse">
      <div className="flex gap-2 h-5 w-16 items-center px-3 bg-BlueDark text-xs outline-none bg-transparent rounded-md"></div>
      <div className="inline-flex gap-3 h-5 w-28 cursor-pointer bg-BlueDark shadow items-start rounded-lg bg-primary-700 px-6 py-3 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"></div>
    </div>
  );
};
