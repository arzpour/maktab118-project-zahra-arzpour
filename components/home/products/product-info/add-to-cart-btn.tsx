"use client";

import {
  useAddToShoppingCart,
  useEditShoppingCart,
} from "@/apis/mutations/shopping-cart";
import { productActions } from "@/redux/features/product.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { editShoppingCartProductSchemaType } from "@/server/validations/shoppingCart.validation";
import errorHandler from "@/utils/errorHandler";
import { getUserId } from "@/utils/session";
import { AxiosError } from "axios";
import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { IoRemove } from "react-icons/io5";
import { toast } from "react-toastify";

interface IAddToCart {
  addToCart: (quantity: number) => void;
  productId?: string;
  quantity: number;
  price: string;
  name: string;
  thumbnail: string;
}
const AddToCartBtn: React.FC<IAddToCart> = ({
  addToCart,
  productId,
  quantity,
  name,
  price,
  thumbnail,
}) => {
  const list = useAppSelector((state) => state.product.list);

  const productItem = (list || []).find((el) => el._id === productId);

  const [getSelectedQuantity, setSelectedQuantity] = React.useState<number>(
    productItem?.selectedQuantity || 1
  );

  const user = getUserId();

  const dispatch = useAppDispatch();
  const add = useAddToShoppingCart();

  const editShoppingCart = useEditShoppingCart();

  const editShoppingCartHandler = async (
    data: editShoppingCartProductSchemaType
  ) => {
    try {
      await editShoppingCart.mutateAsync({
        userId: user || "",
        data,
      });
    } catch (error) {
      console.log(error);
      errorHandler(error as AxiosError<IError>);
    }
  };

  const increaseQuantity = async () => {
    if (productId && getSelectedQuantity < quantity) {
      setSelectedQuantity((prev) => prev + 1);
      dispatch(
        productActions.increase({
          _id: productId,
          quantity: 1,
        })
      );

      if (productItem?.selectedQuantity && productItem?.selectedQuantity >= 1) {
        if (user) {
          await editShoppingCartHandler({
            _id: productId,
            selectedQuantity: productItem.selectedQuantity + 1,
          });
        }
      }
    }
  };

  const decreaseQuantity = async () => {
    if (
      productId &&
      productItem?.selectedQuantity &&
      productItem?.selectedQuantity > 1
    ) {
      setSelectedQuantity((prev) => prev - 1);
      dispatch(
        productActions.decrease({
          _id: productId,
          quantity: 1,
        })
      );

      if (productItem?.selectedQuantity && productItem?.selectedQuantity >= 1) {
        if (user) {
          await editShoppingCartHandler({
            _id: productId,
            selectedQuantity: productItem.selectedQuantity - 1,
          });
        }
      }
    }
  };

  const addToDataBaseHandler = async () => {
    try {
      const data = [
        {
          _id: productId || "",
          name: productItem?.name || name,
          price: productItem?.price || Number(price),
          selectedQuantity: getSelectedQuantity,
          thumbnail: productItem?.thumbnail || thumbnail,
        },
      ];

      await add.mutateAsync(data);

      // toast.success("به دیتابیس اضافه شد");
    } catch (error) {
      console.log(error);
    }
  };

  const addToCartHandler = async () => {
    if (quantity > 0) {
      addToCart(getSelectedQuantity);

      if (productItem) {
        toast.error("محصول شما در سبد خرید موجود میباشد.");
      } else {
        toast.success("محصول شما به سبد خرید اضافه شد");

        if (user) {
          await addToDataBaseHandler();
        }
      }
    } else {
      toast.error("مجصول در انبار موجود نیست");
    }
  };

  return (
    <div className="flex gap-6 items-center">
      <div className="flex gap-2 h-9 items-center px-3 border border-gray-400 bg-BlueDark text-gray-800 text-xs outline-none bg-transparent rounded-md">
        <button onClick={increaseQuantity}>
          <IoMdAdd className="text-slate-100 w-5 h-4" />
        </button>
        <span className="mx-2.5 text-slate-100">
          {productItem?.selectedQuantity
            ? productItem?.selectedQuantity
            : getSelectedQuantity}
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
