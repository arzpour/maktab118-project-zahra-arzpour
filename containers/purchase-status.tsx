"use client";

import { useAddOrder } from "@/apis/mutations/order";
import { useEditProducts } from "@/apis/mutations/product";
import { useDeleteShoppingCart } from "@/apis/mutations/shopping-cart";
import useGetShoppingCartByUserId from "@/hooks/useCartByUserId";
import useProductList from "@/hooks/useProduct";
import { productActions } from "@/redux/features/product.slice";
import { useAppDispatch } from "@/redux/hook";
import { getUserId } from "@/utils/session";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const PurchaseStatus = () => {
  const [isProcessing, setIsProcessing] = React.useState(false);

  const didProcess = React.useRef(false);

  const searchParams = useSearchParams();
  const isSuccess = searchParams.get("success");

  const { data } = useGetShoppingCartByUserId();
  const { data: allProducts } = useProductList(Infinity);

  const addOrder = useAddOrder();
  const editProducts = useEditProducts();
  const deleteShoppingCart = useDeleteShoppingCart();

  const dispatch = useAppDispatch();
  const userId = getUserId();

  const addOrderForUser = async () => {
    if (!data?.products.length) return;

    try {
      const orderData = {
        user: userId || "",
        products: data.products.map((el) => ({
          product: el._id,
          count: el.selectedQuantity,
        })),
        deliveryStatus: false,
        deliveryDate: new Date(),
      };
      await addOrder.mutateAsync(orderData);
      toast.success("سفارش ایجاد شد", {
        className: "custom-toast",
      });
    } catch (error) {
      console.log("🚀 ~ addOrderForUser ~ error:", error);
    }
  };

  const editProductsHandler = async () => {
    if (!data?.products.length || !allProducts?.data?.products.length) return;
    const newData = allProducts.data.products.filter((el) => {
      const productItem = data.products.find(
        (product) => product._id === el._id
      );
      if (productItem) {
        const updateQty =
          Number(el.quantity) - Number(productItem.selectedQuantity);
        if (updateQty >= 0) {
          el.quantity = updateQty;
        }
        return true;
      }
      return false;
    });

    const updatePromises = newData.map((product) => {
      const formData = new FormData();
      if (product?.quantity !== undefined) {
        formData.append("quantity", product.quantity.toString());
      }
      return editProducts.mutateAsync({
        data: formData,
        id: product._id ?? "",
      });
    });

    try {
      await Promise.all(updatePromises);
    } catch (error) {
      console.log("🚀 ~ editProductsHandler ~ error:", error);
    }
  };

  const deleteShoppingCartHandler = async () => {
    try {
      await deleteShoppingCart.mutateAsync(userId || "");
      toast.success("از دیتا بیس حذف شد", {
        className: "custom-toast",
      });
      dispatch(productActions.removeAll());
    } catch (error) {
      console.log("🚀 ~ deleteShoppingCartHandler ~ error:", error);
    }
  };

  React.useEffect(() => {
    if (
      isSuccess !== "true" ||
      !data?.products?.length ||
      !allProducts?.data?.products?.length ||
      !userId ||
      isProcessing ||
      didProcess.current
    )
      return;

    didProcess.current = true;

    const processOrder = async () => {
      setIsProcessing(true);
      try {
        await addOrderForUser();
        await editProductsHandler();
        await deleteShoppingCartHandler();
      } catch (error) {
        toast.error("خطا در انجام عملیات", {
          className: "custom-toast",
        });
        console.error(error);
      } finally {
        setIsProcessing(false);
      }
    };

    processOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, data, allProducts, userId]);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 text-center max-w-md w-full">
        <h1
          className={`text-2xl font-bold ${
            isSuccess === "true" ? "text-green-600" : "text-red-600"
          }`}
        >
          {isSuccess === "true"
            ? "پرداخت با موفقیت انجام شد"
            : "پرداخت انجام نشد"}
        </h1>
        <p className="text-gray-600 mt-3 text-sm font-semibold">
          {isSuccess === "true"
            ? "از خرید شما سپاسگزاریم."
            : "شما عملیات پرداخت را لغو کردید."}
        </p>
        <button className="mt-5 text-sm bg-orange text-white px-4 py-2 rounded">
          <Link href={"/"}>بازگشت به صفحه اصلی</Link>
        </button>
      </div>
    </div>
  );
};

export default PurchaseStatus;
