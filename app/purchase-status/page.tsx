"use client";

import { useAddOrder } from "@/apis/mutations/order";
import { useEditProducts } from "@/apis/mutations/product";
import { useDeleteShoppingCart } from "@/apis/mutations/shopping-cart";
import useGetShoppingCartByUserId from "@/hooks/useCartByUserId";
import useProductList from "@/hooks/useProduct";
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
  const [isProcessing, setIsProcessing] = React.useState(false);

  const searchParams = useSearchParams();
  const isSuccess = searchParams.get("success");

  const { data } = useGetShoppingCartByUserId();

  const deleteShoppingCart = useDeleteShoppingCart();

  const userId = getUserId();
  const addOrder = useAddOrder();

  const dispatch = useAppDispatch();

  const editProducts = useEditProducts();

  const { data: allProducts } = useProductList(Infinity);

  const addOrderForUser = async () => {
    const orderData = {
      user: userId || "",
      products:
        data?.products.map((el) => ({
          product: el._id,
          count: el.selectedQuantity,
        })) || [],
      deliveryStatus: false,
    };
    if (!orderData?.products || orderData.products.length === 0) return;

    try {
      await addOrder.mutateAsync(orderData);

      toast.success("سفارش ایجاد شد");
    } catch (error) {
      toast.error("اطلاعات اشتباه میباشد");
      errorHandler(error as AxiosError<IError>);
      console.log(error);
    }
  };

  const editProductsHandler = async () => {
    const newData =
      allProducts?.data?.products.filter((el) => {
        const productItem = data?.products.find(
          (product) => product._id === el._id
        );

        if (productItem) {
          const updateQty =
            Number(el.quantity!) - Number(productItem.selectedQuantity);

          if (updateQty >= 0) {
            el.quantity = updateQty;
          }

          return el;
        }

        return productItem;
      }) || [];

    try {
      const updateData = newData.map((product) => {
        const formData = new FormData();
        formData.append("quantity", product.quantity?.toString()!);
        return editProducts.mutateAsync({
          data: formData,
          id: product._id!,
        });
      });

      await Promise.all(updateData);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteShoppingCartHandler = async () => {
    try {
      await deleteShoppingCart.mutateAsync(userId || "");

      toast.success("از دیتا بیس حذف شد");

      dispatch(productActions.removeAll());
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (isSuccess !== "true" || !data || !userId || isProcessing) return;

    const reqProcess = async () => {
      setIsProcessing(true);
      try {
        await addOrderForUser();
        await editProductsHandler();
        await deleteShoppingCartHandler();
      } catch (error) {
        console.log(error);
      } finally {
        setIsProcessing(false);
      }
    };

    reqProcess();
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

// // // "use client";

// // // import { useAddOrder } from "@/apis/mutations/order";
// // // import { useEditProducts } from "@/apis/mutations/product";
// // // import { useDeleteShoppingCart } from "@/apis/mutations/shopping-cart";
// // // import useGetShoppingCartByUserId from "@/hooks/useCartByUserId";
// // // import useProductList from "@/hooks/useProduct";
// // // import useGetShoppingCart from "@/hooks/userShoppingCart";
// // // import { productActions } from "@/redux/features/product.slice";
// // // import { useAppDispatch } from "@/redux/hook";
// // // import errorHandler from "@/utils/errorHandler";
// // // import { getUserId } from "@/utils/session";
// // // import { AxiosError } from "axios";
// // // import Link from "next/link";
// // // import { useSearchParams } from "next/navigation";
// // // import React from "react";
// // // import { toast } from "react-toastify";

// // // const PurchaseStatusPage = () => {
// // //   const [createdOrder, setCreatedOrder] = React.useState(false);
// // //   const [editedProducts, setEditedProducts] = React.useState(false);

// // //   const searchParams = useSearchParams();
// // //   const isSuccess = searchParams.get("success");

// // //   const { data } = useGetShoppingCartByUserId();

// // //   const deleteShoppingCart = useDeleteShoppingCart();

// // //   const userId = getUserId();
// // //   const addOrder = useAddOrder();

// // //   const dispatch = useAppDispatch();

// // //   const editProducts = useEditProducts();

// // //   const { data: allProducts } = useProductList(Infinity);

// // //   React.useEffect(() => {
// // //     if (isSuccess !== "true" || !data || !userId || createdOrder) return;

// // //     // const findUserOrder = () => {
// // //     //   return data?.userId.filter((el) => el.userId === userId);
// // //     // };

// // //     // mongodb+srv://arzpour:6kIs7FgAvT9DXST4@testtt.9k491.mongodb.net/shopping-cart?retryWrites=true&w=majority
// // //     const orderData = {
// // //       user: userId || "",
// // //       products:
// // //         data.products.map((el) => ({
// // //           product: el._id,
// // //           count: el.selectedQuantity,
// // //         })) || [],
// // //       // data.products.map((el) =>
// // //       //     el.products.map((item) => ({
// // //       //       product: item._id,
// // //       //       count: item.selectedQuantity,
// // //       //     }))
// // //       //   ) || [],
// // //       deliveryStatus: false,
// // //     };

// // //     const addOrderForUser = async () => {
// // //       if (!orderData?.products || orderData.products.length === 0) return;

// // //       try {
// // //         await addOrder.mutateAsync(orderData);

// // //         toast.success("سفارش ایجاد شد");

// // //         await editProductsHandler();
// // //         setCreatedOrder(true);
// // //       } catch (error) {
// // //         toast.error("اطلاعات اشتباه میباشد");
// // //         errorHandler(error as AxiosError<IError>);
// // //         console.log(error);
// // //       }
// // //     };

// // //     addOrderForUser();

// // //     const editProductsHandler = async () => {
// // //       if (editedProducts) return;
// // //       // const productList = findUserOrder()?.flatMap((el) =>
// // //       //   el.products.map((el) => {
// // //       //     return { id: el._id, quantity: el.selectedQuantity };
// // //       //   })
// // //       // );
// // //       const productList = data.products.map((el) => ({
// // //         id: el._id,
// // //         quantity: el.selectedQuantity,
// // //       }));

// // //       const newData =
// // //         allProducts?.data?.products
// // //           .filter((el) => {
// // //             const productItem = productList?.find(
// // //               (product) => product.id === el._id
// // //             );

// // //             if (productItem && el.quantity) {
// // //               const initialQuantity = el.quantity;

// // //               const newQuantity = el.quantity - productItem.quantity;

// // //               if (newQuantity >= 0) {
// // //                 el.quantity = newQuantity;
// // //               }

// // //               if (el.quantity !== initialQuantity) {
// // //                 return el;
// // //               }
// // //             }
// // //             return null;
// // //           })
// // //           .filter((el) => el !== null) || [];

// // //       try {
// // //         for (const product of newData) {
// // //           const formData = new FormData();

// // //           formData.append("quantity", product.quantity?.toString()!);
// // //           await editProducts.mutateAsync({
// // //             data: formData,
// // //             id: product._id!,
// // //           });

// // //           toast.success("ادیت شد");

// // //           setEditedProducts(true);
// // //         }
// // //         await deleteShoppingCartHandler();
// // //       } catch (error) {
// // //         console.log(error);
// // //         toast.error("ادیت نشد");
// // //       }
// // //     };

// // //     const deleteShoppingCartHandler = async () => {
// // //       try {
// // //         console.log(createdOrder, "hasCreatedOrder");
// // //         console.log(editedProducts, "hasEditedProducts");

// // //         await deleteShoppingCart.mutateAsync(userId || "");

// // //         toast.success("از دیتا بیس حذف شد");

// // //         dispatch(productActions.removeAll());
// // //       } catch (error) {
// // //         console.log(error);
// // //       }
// // //     };
// // //   }, [isSuccess, data, userId, createdOrder, editedProducts, allProducts]);

// // //   return (
// // //     <div className="h-screen flex items-center justify-center bg-gray-100">
// // //       <div className="bg-white shadow-md rounded-lg p-6 text-center max-w-md w-full">
// // //         <h1
// // //           className={`text-2xl font-bold ${
// // //             isSuccess === "true" ? "text-green-600" : "text-red-600"
// // //           }`}
// // //         >
// // //           {isSuccess === "true"
// // //             ? "پرداخت با موفقیت انجام شد"
// // //             : "پرداخت انجام نشد"}
// // //         </h1>
// // //         <p className="text-gray-600 mt-3 text-sm font-semibold">
// // //           {isSuccess === "true"
// // //             ? "از خرید شما سپاسگزاریم."
// // //             : "شما عملیات پرداخت را لغو کردید."}
// // //         </p>
// // //         <button className="mt-5 text-sm bg-orange text-white px-4 py-2 rounded">
// // //           <Link href={"/"}>بازگشت به صفحه اصلی</Link>
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default PurchaseStatusPage;

// // "use client";

// // import { useAddOrder } from "@/apis/mutations/order";
// // import { useEditProducts } from "@/apis/mutations/product";
// // import { useDeleteShoppingCart } from "@/apis/mutations/shopping-cart";
// // import useGetShoppingCartByUserId from "@/hooks/useCartByUserId";
// // import useProductList from "@/hooks/useProduct";
// // import useGetShoppingCart from "@/hooks/userShoppingCart";
// // import { productActions } from "@/redux/features/product.slice";
// // import { useAppDispatch } from "@/redux/hook";
// // import errorHandler from "@/utils/errorHandler";
// // import { getUserId } from "@/utils/session";
// // import { AxiosError } from "axios";
// // import Link from "next/link";
// // import { useSearchParams } from "next/navigation";
// // import React from "react";
// // import { toast } from "react-toastify";

// // const PurchaseStatusPage = () => {
// //   const [isProcessing, setIsProcessing] = React.useState(false);

// //   const searchParams = useSearchParams();
// //   const isSuccess = searchParams.get("success");

// //   const { data } = useGetShoppingCartByUserId();

// //   const deleteShoppingCart = useDeleteShoppingCart();

// //   const userId = getUserId();
// //   const addOrder = useAddOrder();

// //   const dispatch = useAppDispatch();

// //   const editProducts = useEditProducts();

// //   const { data: allProducts } = useProductList(Infinity);

// //   const addOrderForUser = async () => {
// //     const orderData = {
// //       user: userId || "",
// //       products:
// //         data?.products.map((el) => ({
// //           product: el._id,
// //           count: el.selectedQuantity,
// //         })) || [],
// //       deliveryStatus: false,
// //     };

// //     if (!orderData?.products || orderData.products.length === 0) return;

// //     try {
// //       await addOrder.mutateAsync(orderData);

// //       toast.success("سفارش ایجاد شد");
// //     } catch (error) {
// //       toast.error("اطلاعات اشتباه میباشد");
// //       errorHandler(error as AxiosError<IError>);
// //     }
// //   };

// //   const editProductsHandler = async () => {
// //     const productList = data?.products.map((el) => ({
// //       id: el._id,
// //       quantity: el.selectedQuantity,
// //     }));

// //     const newData =
// //       allProducts?.data?.products.filter((el) => {
// //         const productItem = productList?.find(
// //           (product) => product.id === el._id
// //         );

// //         if (productItem && el.quantity) {
// //           const newQuantity = el.quantity - productItem.quantity;
// //           return newQuantity >= 0;
// //         }
// //         return false;
// //       }) || [];

// //     const updateData = newData.map((el) => {
// //       const formData = new FormData();
// //       formData.append("quantity", el.quantity?.toString()!);
// //       return editProducts.mutateAsync({
// //         data: formData,
// //         id: el._id!,
// //       });
// //     });

// //     try {
// //       await Promise.all(updateData);
// //       toast.success("ادیت شد");
// //     } catch (error) {
// //       toast.error("ادیت نشد");
// //       errorHandler(error as AxiosError<IError>);
// //     }
// //   };

// //   const deleteShoppingCartHandler = async () => {
// //     try {
// //       await deleteShoppingCart.mutateAsync(userId || "");

// //       toast.success("از دیتا بیس حذف شد");

// //       dispatch(productActions.removeAll());
// //     } catch (error) {
// //       toast.error("حذف نشد");
// //       errorHandler(error as AxiosError<IError>);
// //     }
// //   };
// //   React.useEffect(() => {
// //     if (isSuccess !== "true" || !data || !userId || isProcessing) return;

// //     const reqProcess = async () => {
// //       setIsProcessing(true);
// //       console.log(isProcessing, "1");

// //       try {
// //         await addOrderForUser();
// //         await editProductsHandler();
// //         await deleteShoppingCartHandler();
// //         console.log(isProcessing, "2");
// //       } catch (error) {
// //         console.log(error);
// //       } finally {
// //         setIsProcessing(false);
// //       }
// //     };
// //     reqProcess();

// //     console.log(isProcessing, "3");
// //   }, [isSuccess, data, userId]);

// //   return (
// //     <div className="h-screen flex items-center justify-center bg-gray-100">
// //       <div className="bg-white shadow-md rounded-lg p-6 text-center max-w-md w-full">
// //         <h1
// //           className={`text-2xl font-bold ${
// //             isSuccess === "true" ? "text-green-600" : "text-red-600"
// //           }`}
// //         >
// //           {isSuccess === "true"
// //             ? "پرداخت با موفقیت انجام شد"
// //             : "پرداخت انجام نشد"}
// //         </h1>
// //         <p className="text-gray-600 mt-3 text-sm font-semibold">
// //           {isSuccess === "true"
// //             ? "از خرید شما سپاسگزاریم."
// //             : "شما عملیات پرداخت را لغو کردید."}
// //         </p>
// //         <button className="mt-5 text-sm bg-orange text-white px-4 py-2 rounded">
// //           <Link href={"/"}>بازگشت به صفحه اصلی</Link>
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default PurchaseStatusPage;

// "use client";

// import { useAddOrder } from "@/apis/mutations/order";
// import { useEditProducts } from "@/apis/mutations/product";
// import { useDeleteShoppingCart } from "@/apis/mutations/shopping-cart";
// import useGetShoppingCartByUserId from "@/hooks/useCartByUserId";
// import useProductList from "@/hooks/useProduct";
// import { productActions } from "@/redux/features/product.slice";
// import { useAppDispatch } from "@/redux/hook";
// import errorHandler from "@/utils/errorHandler";
// import { getUserId } from "@/utils/session";
// import { AxiosError } from "axios";
// import Link from "next/link";
// import { useSearchParams } from "next/navigation";
// import React from "react";
// import { toast } from "react-toastify";

// const PurchaseStatusPage = () => {
//   const searchParams = useSearchParams();
//   const isSuccess = searchParams.get("success");

//   const { data, isSuccess: dataFetched } = useGetShoppingCartByUserId();

//   console.log(data, "data");

//   const deleteShoppingCart = useDeleteShoppingCart();

//   const userId = getUserId();
//   const addOrder = useAddOrder();

//   const dispatch = useAppDispatch();

//   const editProducts = useEditProducts();

//   const { data: allProducts } = useProductList(Infinity);

//   const addOrderForUser = async () => {
//     if (!data || !data.products) return;

//     const orderData = {
//       user: userId || "",
//       products:
//         data?.products.map((el) => ({
//           product: el._id,
//           count: el.selectedQuantity,
//         })) || [],
//       deliveryStatus: false,
//     };

//     if (!orderData?.products || orderData.products.length === 0) return;

//     try {
//       await addOrder.mutateAsync(orderData);

//       toast.success("سفارش ایجاد شد");
//     } catch (error) {
//       toast.error("اطلاعات اشتباه میباشد");
//       errorHandler(error as AxiosError<IError>);
//     }
//   };

//   const editProductsHandler = async () => {
//     if (!data || !data.products) return;

//     const newData = allProducts?.data?.products.map((el) => {
//       const productItems = data.products.find(
//         (product) => product._id === el._id
//       );
//       if (productItems) {
//         const updateQty = (el.quantity! -= productItems?.selectedQuantity!);
//         return { id: el._id, quantity: updateQty };
//       }
//       return { id: el._id, quantity: el.quantity! };
//     });

//     // const updateData =
//     //   newData?.map((el) => {
//     //     const formData = new FormData();
//     //     formData.append("quantity", el.quantity?.toString()!);
//     //     return editProducts.mutateAsync({
//     //       data: formData,
//     //       id: el.id!,
//     //     });
//     //   }) || [];

//     // console.log(updateData, "updatedata");

//     try {
//       // await Promise.all(updateData);
//       newData?.map(async (el) => {
//         const formData = new FormData();
//         formData.append("quantity", el.quantity?.toString()!);
//         await editProducts.mutateAsync({
//           data: formData,
//           id: el.id!,
//         });
//       });

//       // await editProducts.mutateAsync(updateData);
//       toast.success("ادیت شد");
//     } catch (error) {
//       toast.error("ادیت نشد");
//       errorHandler(error as AxiosError<IError>);
//     }
//   };

//   const deleteShoppingCartHandler = async () => {
//     try {
//       await deleteShoppingCart.mutateAsync(userId || "");

//       toast.success("از دیتا بیس حذف شد");

//       dispatch(productActions.removeAll());
//     } catch (error) {
//       toast.error("حذف نشد");
//       errorHandler(error as AxiosError<IError>);
//     }
//   };
//   React.useEffect(() => {
//     if (isSuccess !== "true" || !data || !userId) return;

//     const reqProcess = async () => {
//       try {
//         if (dataFetched) {
//           await addOrderForUser();
//           await editProductsHandler();
//           // await deleteShoppingCartHandler();
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     reqProcess();
//   }, [isSuccess, data, userId]);

//   return (
//     <div className="h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white shadow-md rounded-lg p-6 text-center max-w-md w-full">
//         <h1
//           className={`text-2xl font-bold ${
//             isSuccess === "true" ? "text-green-600" : "text-red-600"
//           }`}
//         >
//           {isSuccess === "true"
//             ? "پرداخت با موفقیت انجام شد"
//             : "پرداخت انجام نشد"}
//         </h1>
//         <p className="text-gray-600 mt-3 text-sm font-semibold">
//           {isSuccess === "true"
//             ? "از خرید شما سپاسگزاریم."
//             : "شما عملیات پرداخت را لغو کردید."}
//         </p>
//         <button className="mt-5 text-sm bg-orange text-white px-4 py-2 rounded">
//           <Link href={"/"}>بازگشت به صفحه اصلی</Link>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PurchaseStatusPage;
