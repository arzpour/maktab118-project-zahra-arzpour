"use client";

import { useLogin } from "@/apis/mutations/auth";
import {
  authSchema,
  authSchemaType,
} from "@/server/validations/auth.validation";
import errorHandler from "@/utils/errorHandler";
import { setAccsessToken, setRefreshToken, setRole } from "@/utils/session";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsEyeSlashFill } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import { toast } from "react-toastify";
import { CgSpinner } from "react-icons/cg";

interface ILoginForm {
  user?: boolean;
}

const LoginForm: React.FC<ILoginForm> = ({ user }) => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<authSchemaType>({
    mode: "all",
    resolver: zodResolver(authSchema),
  });

  const showPasswordHandler = () => {
    setShowPassword((prev) => !prev);
  };

  const login = useLogin();

  const { push } = useRouter();

  const onSubmit: SubmitHandler<authSchemaType> = async (data) => {
    try {
      const response = await login.mutateAsync(data);

      const token = response.token;
      setRole(response.data.user.role);

      if (token) {
        setAccsessToken(token.accessToken);
        setRefreshToken(token.refreshToken);
      }

      if (response.data.user.role === "ADMIN") {
        push("/admin/products");
        toast.success("وارد شدید");
      } else if (response.data.user.role === "USER") {
        push("/");
        toast.success("وارد شدید");
      }
    } catch (error) {
      toast.success("اطلاعات وارد شده صحیح نیست");
      errorHandler(login.error as AxiosError<IError>);
      console.log(login.error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="md:max-w-md w-full mx-auto text-white"
    >
      <div>
        <div className="relative flex items-center">
          <input
            {...register("username")}
            type="text"
            required
            className="w-full bg-BackgroundColor sm:bg-CyanBlueDark rounded-md text-sm border-b border-gray-400 p-4 outline-none"
            placeholder="نام کاربری"
          />
        </div>
        {errors.username && (
          <p className="text-red-700 mt-4 text-sm font-medium">
            {errors.username.message}
          </p>
        )}
      </div>

      <div className="mt-8">
        <div className="relative flex items-center">
          <input
            {...register("password")}
            name="password"
            type={!showPassword ? "password" : "text"}
            required
            className="w-full bg-BackgroundColor sm:bg-CyanBlueDark rounded-md text-sm border-b border-gray-400 p-4 outline-none"
            placeholder="رمز عبور"
          />
          {showPassword ? (
            <FaEye
              onClick={showPasswordHandler}
              className="w-18 h-18 absolute left-2 text-gray-500 cursor-pointer"
            />
          ) : (
            <BsEyeSlashFill
              onClick={showPasswordHandler}
              className="w-18 h-18 absolute left-2 text-gray-500 cursor-pointer"
            />
          )}
        </div>
        {errors.password && (
          <p className="text-red-700 mt-4 text-sm font-medium">
            {errors.password.message}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
        <div className="hidden sm:flex gap-2 items-center">
          <input
            id="remember-me"
            type="checkbox"
            className="h-4 w-4 shrink-0 bg-gray-300 text-purple border-gray-300 rounded"
          />
          <label
            htmlFor="remember-me"
            className="text-gray-400 ml-3 block text-sm"
          >
            مرا به خاطر بسپار
          </label>
        </div>
        <a className="text-gray-400 font-semibold text-sm hover:underline">
          رمز عبور را فراموش کرده اید؟
        </a>
      </div>

      <div className="mt-6 sm:mt-9">
        {login.isPending ? (
          <button
            type="submit"
            className="w-full flex gap-2 justify-center items-center shadow-sm py-2.5 px-5 bg-BlueDark font-semibold rounded-md text-white bg-purple hover:bg-purpleHover focus:border-none focus:outline-none"
          >
            در حال ورود
            <CgSpinner className="w-5 h-5 animate-spin" />
          </button>
        ) : (
          <button
            type="submit"
            className="w-full shadow-sm text-lg py-2.5 px-5 bg-BlueDark font-semibold rounded-md text-white bg-purple hover:bg-purpleHover focus:outline-none"
          >
            ورود
          </button>
        )}
        {user ? (
          <div className="text-gray-400 mt-4 flex gap-2 justify-between">
            <p className="flex gap-2">
              حساب کاربری ندارید؟
              <Link
                href={"/signup"}
                className="text-gray-300 underline text-center font-semibold hover:underline ml-1 whitespace-nowrap"
              >
                ثبت نام
              </Link>
            </p>
            <Link
              href={"/"}
              className="text-gray-400 text-center font-semibold hover:underline ml-1 whitespace-nowrap"
            >
              بازگشت به سایت
            </Link>
          </div>
        ) : (
          <p className="text-gray-400 mt-4 flex gap-2 justify-center">
            <Link
              href={"/"}
              className="text-gray-300 underline text-center font-semibold hover:underline ml-1 whitespace-nowrap"
            >
              بازگشت به سایت
            </Link>
          </p>
        )}
      </div>
    </form>
  );
};

export default LoginForm;
