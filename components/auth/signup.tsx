"use client";

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signupUserSchema,
  signupUserSchemaType,
} from "@/server/validations/auth.validation";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import errorHandler from "@/utils/errorHandler";
import { AxiosError } from "axios";
import { FaEye } from "react-icons/fa6";
import { BsEyeSlashFill } from "react-icons/bs";
import { useSignup } from "@/apis/mutations/auth";
import {
  getAccessToken,
  getUserId,
  setAccessToken,
  setRefreshToken,
  setRole,
} from "@/utils/session";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useAddToShoppingCart } from "@/apis/mutations/shopping-cart";
import useGetShoppingCartByUserId from "@/hooks/useCartByUserId";
import { productActions } from "@/redux/features/product.slice";
import { getShoppingCartByUserId } from "@/apis/client/shopping-cart";
import { useQuery } from "@tanstack/react-query";

const SignupUserForm: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const searchParams = useSearchParams();
  const from = searchParams.get("from");

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<signupUserSchemaType>({
    mode: "all",
    resolver: zodResolver(signupUserSchema),
  });

  const signup = useSignup();
  const { push } = useRouter();

  const list = useAppSelector((state) => state.product.list);

  const add = useAddToShoppingCart();
  const dispatch = useAppDispatch();

  const showPasswordHandler = () => {
    setShowPassword((prev) => !prev);
  };

  const addToDataBaseHandler = async () => {
    if (!list.length) return;

    const getProductsList = (products: IShoppingCartProductList[]) => {
      return products.map(
        ({ _id, name, price, selectedQuantity, thumbnail }) => ({
          _id: _id || "",
          name: name || "",
          price: price || 0,
          selectedQuantity: selectedQuantity || 0,
          thumbnail: thumbnail || "",
        })
      );
    };
    const data = getProductsList(list);

    try {
      await add.mutateAsync(data);

      await getShoppingCart();
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitHandler: SubmitHandler<signupUserSchemaType> = async (data) => {
    try {
      const response = await signup.mutateAsync(data);
      console.log(response);
      setRole(response.data.user.role);

      if (response.token) {
        setAccessToken(response.token.accessToken);
        setRefreshToken(response.token.refreshToken);
      }
      if (response.status === "success") {
        toast.success("حساب کاربری ایجاد شد");

        if (from === "payment") {
          push("/payment");
        } else {
          push("/");
        }
        await addToDataBaseHandler();
      }
    } catch (error) {
      toast.error("اطلاعات اشتباه میباشند");
      errorHandler(signup.error as AxiosError<IError>);
      console.log(signup.error);
    }
  };

  const getShoppingCart = async () => {
    try {
      const token = getAccessToken();
      if (!token) {
        throw new Error("توکن یافت نشد");
      }

      const userId = getUserId();

      const shoppingCart = useQuery({
        queryKey: ["get-shopping-cart-by-user-id"],
        queryFn: () => getShoppingCartByUserId(userId || ""),
        refetchOnWindowFocus: false,
        retry: 1,
      });
      if (shoppingCart) {
        dispatch(productActions.updateCart(shoppingCart.data?.products || []));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
      <div className="flex w-full gap-4 mt-2">
        <div className="w-full">
          <div className="relative flex items-center">
            <input
              {...register("firstname")}
              type="text"
              required
              className="w-full bg-BackgroundColor rounded-md text-sm border-b border-gray-500 p-4 outline-none"
              placeholder="نام "
            />
          </div>
          {errors.firstname && (
            <p className="text-red-700 mt-4 text-sm font-medium">
              {errors.firstname?.message}
            </p>
          )}
        </div>
        <div className="w-full">
          <div className="relative flex items-center">
            <input
              {...register("lastname")}
              type="text"
              required
              className="w-full bg-BackgroundColor rounded-md text-sm border-b  border-gray-500 p-4 outline-none"
              placeholder="نام خانوادگی "
            />
          </div>
          {errors.lastname && (
            <p className="text-red-700 mt-4 text-sm font-medium">
              {errors.lastname?.message}
            </p>
          )}
        </div>
      </div>
      <div className="mt-2">
        <div className="relative flex items-center">
          <input
            {...register("username")}
            type="text"
            required
            className="w-full bg-BackgroundColor rounded-md text-sm border-b  border-gray-500 p-4 outline-none"
            placeholder="نام کاربری "
          />
        </div>
        {errors.username && (
          <p className="text-red-700 mt-4 text-sm font-medium">
            {errors.username.message}
          </p>
        )}
      </div>

      <div className="mt-10">
        <div className="relative flex items-center">
          <input
            {...register("password")}
            name="password"
            type={!showPassword ? "password" : "text"}
            required
            className="w-full bg-BackgroundColor rounded-md text-sm border-b border-gray-500 p-4 outline-none"
            placeholder="رمز عبور "
          />
          {showPassword ? (
            <FaEye
              onClick={showPasswordHandler}
              className="w-[18px] h-[18px] absolute left-2 text-gray-500 cursor-pointer"
            />
          ) : (
            <BsEyeSlashFill
              onClick={showPasswordHandler}
              className="w-[18px] h-[18px] absolute left-2 text-gray-500 cursor-pointer"
            />
          )}
        </div>
        {errors.password && (
          <p className="text-red-700 mt-4 text-sm font-medium">
            {errors.password.message}
          </p>
        )}
      </div>
      <div className="mt-2">
        <div className="relative flex items-center">
          <input
            {...register("phoneNumber")}
            type="text"
            required
            className="w-full bg-BackgroundColor rounded-md text-sm border-b  border-gray-500 p-4 outline-none"
            placeholder="شماره تماس "
          />
        </div>
        {errors.phoneNumber && (
          <p className="text-red-700 mt-4 text-sm font-medium">
            {errors.phoneNumber?.message}
          </p>
        )}
      </div>
      <div className="mt-2">
        <div className="relative flex items-center">
          <input
            {...register("address")}
            type="text"
            required
            className="w-full bg-BackgroundColor rounded-md text-sm border-b  border-gray-500 p-4 outline-none"
            placeholder="آدرس"
          />
        </div>
        {errors.address && (
          <p className="text-red-700 mt-4 text-sm font-medium">
            {errors.address?.message}
          </p>
        )}
      </div>
      <button
        className="bg-[#15273b] text-white !mt-10 font-medium outline-none w-full py-3 px-6 rounded-md"
        type="submit"
      >
        ثبت نام
      </button>

      <div className="text-gray-400 mt-4 flex gap-2 justify-between text-sm">
        <p className="flex gap-2">
          حساب کاربری دارید؟
          <Link
            href={`${from === "payment" ? "/login?from=payment" : "/login"}`}
            className="text-gray-300 underline text-center font-semibold hover:underline ml-1 whitespace-nowrap"
          >
            ورود
          </Link>
        </p>

        <Link
          href={`${from === "payment" ? "/payment-gateway" : "/"}`}
          className="text-gray-400 text-center font-semibold hover:underline ml-1 whitespace-nowrap text-sm"
        >
          بازگشت به سایت
        </Link>
      </div>
    </form>
  );
};

export default SignupUserForm;
