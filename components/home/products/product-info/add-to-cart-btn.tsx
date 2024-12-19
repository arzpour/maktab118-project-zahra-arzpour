"use client";

import { useAppSelector } from "@/redux/hook";
import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { IoRemove } from "react-icons/io5";
import { toast } from "react-toastify";

interface IAddToCart {
  addToCart: (quantity: number) => void;
  productId?: string;
}
const AddToCartBtn: React.FC<IAddToCart> = ({ addToCart, productId }) => {
  const [selectedQuantity, setSelectedQuantity] = React.useState<number>(1);
  const list = useAppSelector((state) => state.product.list);

  const decreaseProduct = () => {
    if (selectedQuantity > 1) {
      setSelectedQuantity((prev) => prev - 1);
    }
  };

  const addToCartHandler = () => {
    addToCart(selectedQuantity);

    const productItem = list.find((el) => el._id === productId);

    if (productItem) {
      toast.error(
        "محصول شما در سبد خرید موجود میباشد. برای تغییر تعداد محصول به صفجه سبد خرید بروید.",
        {
          style: {
            backgroundColor: "#6e6e6e",
            color: "#fff",
            fontSize: "15px",
          },
        }
      );
    } else {
      toast.success("محصول شما به سبد خرید اضافه شد", {
        style: {
          backgroundColor: "#6e6e6e",
          color: "#fff",
          fontSize: "15px",
        },
      });
    }
  };

  return (
    <div className="flex gap-6 items-center">
      <div className="flex gap-2 h-9 items-center px-3 border border-gray-400 bg-BlueDark text-gray-800 text-xs outline-none bg-transparent rounded-md">
        <button onClick={() => setSelectedQuantity((prev) => prev + 1)}>
          <IoMdAdd className="text-slate-100 w-5 h-4" />
        </button>
        <span className="mx-2.5 text-slate-100">{selectedQuantity}</span>
        <button onClick={decreaseProduct}>
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
