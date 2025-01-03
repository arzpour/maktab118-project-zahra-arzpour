"use client";

import { useAddOrder } from "@/apis/mutations/order";
import { useEditProducts } from "@/apis/mutations/product";
import { useDeleteShoppingCart } from "@/apis/mutations/shopping-cart";
import useProductList from "@/hooks/useProduct";
import useGetShoppingCart from "@/hooks/userShoppingCart";
import { productActions } from "@/redux/features/product.slice";
import { useAppDispatch } from "@/redux/hook";
import errorHandler from "@/utils/errorHandler";
import { getUserId } from "@/utils/session";
import { AxiosError } from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const PurchaseStatusPage = () => {
  const [hasCreatedOrder, setHasCreatedOrder] = React.useState(false);
  const [hasEditedProducts, setHasEditedProducts] = React.useState(false);

  const searchParams = useSearchParams();
  const isSuccess = searchParams.get("success");

  const { data } = useGetShoppingCart();

  const deleteShoppingCart = useDeleteShoppingCart();

  const userId = getUserId();
  const addOrder = useAddOrder();

  const dispatch = useAppDispatch();

  const editProducts = useEditProducts();

  const { data: allProducts } = useProductList(Infinity);

  React.useEffect(() => {
    if (isSuccess !== "true" || !data || !userId || hasCreatedOrder) return;

    const findUserOrder = () => {
      return data?.filter((el) => el.userId === userId);
    };

    const orderData = {
      user: userId || "",
      products:
        findUserOrder()?.flatMap((el) =>
          el.products.map((item) => ({
            product: item._id,
            count: item.selectedQuantity,
          }))
        ) || [],
      deliveryStatus: false,
    };

    const addOrderForUser = async () => {
      if (!orderData?.products || orderData.products.length === 0) return;

      try {
        await addOrder.mutateAsync(orderData);

        toast.success("سفارش ایجاد شد");

        await editProductsHandler();
        setHasCreatedOrder(true);
      } catch (error) {
        toast.error("اطلاعات اشتباه میباشد");
        errorHandler(error as AxiosError<IError>);
        console.log(error);
      }
    };

    addOrderForUser();

    const editProductsHandler = async () => {
      if (hasEditedProducts) return;
      const productList = findUserOrder()?.flatMap((el) =>
        el.products.map((el) => {
          return { id: el._id, quantity: el.selectedQuantity };
        })
      );

      const newData =
        allProducts?.data?.products
          .filter((el) => {
            const productItem = productList?.find(
              (product) => product.id === el._id
            );

            if (productItem && el.quantity) {
              const initialQuantity = el.quantity;

              const newQuantity = el.quantity - productItem.quantity;

              if (newQuantity >= 0) {
                el.quantity = newQuantity;
              }

              if (el.quantity !== initialQuantity) {
                return el;
              }
            }
            return null;
          })
          .filter((el) => el !== null) || [];

      try {
        for (const product of newData) {
          const formData = new FormData();

          formData.append("quantity", product.quantity?.toString()!);
          await editProducts.mutateAsync({
            data: formData,
            id: product._id!,
          });

          toast.success("ادیت شد");

          setHasEditedProducts(true);
        }
        await deleteShoppingCartHandler();
      } catch (error) {
        console.log(error);
        toast.error("ادیت نشد");
      }
    };

    const deleteShoppingCartHandler = async () => {
      try {
        console.log(hasCreatedOrder, "hasCreatedOrder");
        console.log(hasEditedProducts, "hasEditedProducts");

        if (!hasCreatedOrder || !hasEditedProducts) return;
        await deleteShoppingCart.mutateAsync(userId || "");

        toast.success("از دیتا بیس حذف شد");

        dispatch(productActions.removeAll());
      } catch (error) {
        console.log(error);
      }
    };
  }, [isSuccess, data, userId]);

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

export default PurchaseStatusPage;
