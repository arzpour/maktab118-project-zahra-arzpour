"use client";

import Link from "next/link";
import React from "react";
import { FaBars, FaUserLarge } from "react-icons/fa6";
import { AiFillHome } from "react-icons/ai";
import { AiFillProduct } from "react-icons/ai";
import { MdLogout, MdOutlineChatBubble } from "react-icons/md";
import { AiFillPhone } from "react-icons/ai";
import { MdOutlineContactSupport } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import SearchInput from "@/components/form/search";
import ShoppingCartIcon from "@/components/shopping-cart/shopping-cart-icon";
import {
  deleteAccessToken,
  deleteRefreshToken,
  deleteRole,
  deleteUserId,
  getRole,
} from "@/utils/session";

import { CgProfile } from "react-icons/cg";

import { logout } from "@/apis/client/auth";

import { toast } from "react-toastify";
import { useAppDispatch } from "@/redux/hook";
import { productActions } from "@/redux/features/product.slice";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const dispatch = useAppDispatch();

  const role = getRole();

  const logOutHandler = async () => {
    await logout();
    deleteAccessToken();
    deleteRefreshToken();
    deleteRole();
    toast.success("خارج شدید");
    setIsOpen(false);
    deleteUserId();
    dispatch(productActions.removeAll());
  };
  return (
    <>
      <div className="flex sm:hidden justify-between items-center">
        <button onClick={() => setIsOpen((prev) => !prev)} className="">
          <FaBars className="text-gray-200 w-5 h-5 cursor-pointer" />
        </button>
        <ul
          className={`
            ${isOpen ? "flex" : "hidden"}
           flex-col gap-8 justify-center z-50 py-6 bg-slate-200 absolute top-[4.2rem] left-0 rounded text-gray-800 w-full p-5`}
        >
          <li className="flex gap-2 items-center">
            <AiFillHome className="w-5 h-5 cursor-pointer" />
            <Link className="hover:text-orange" href={"/"}>
              صفحه اصلی
            </Link>
          </li>
          <li className="flex gap-2 items-center">
            <AiFillProduct className="w-5 h-5 cursor-pointer" />
            <Link className="hover:text-orange" href={"/products"}>
              محصولات
            </Link>
          </li>
          <li className="flex gap-2 items-center">
            <MdOutlineContactSupport className="w-5 h-5 cursor-pointer" />
            <button className="hover:text-orange">درباره ما</button>
          </li>
          <li className="flex gap-2 items-center">
            <AiFillPhone className="w-5 h-5 cursor-pointer" />
            <button className="hover:text-orange">تماس با ما</button>
          </li>
          <li className="flex gap-2 items-center">
            <MdOutlineChatBubble className="w-5 h-5 cursor-pointer" />
            <Link className="hover:text-orange" href={"/blog"}>
              وبلاگ
            </Link>
          </li>
          <li className="flex gap-2 items-center">
            <RiAdminFill className="w-5 h-5 cursor-pointer" />
            <Link className="hover:text-orange" href={"/admin-login"}>
              ادمین
            </Link>
          </li>

          <ShoppingCartIcon hamburgerMenu={true} />
          {role === "USER" ? (
            <>
              <li className="flex gap-2 items-center">
                <CgProfile className="w-5 h-5" />
                <p className="cursor-pointer hover:text-orange">پروفایل</p>
              </li>
              <li className="flex gap-2 items-center">
                <MdLogout className="w-5 h-5" />
                <p
                  className="cursor-pointer hover:text-orange"
                  onClick={logOutHandler}
                >
                  خروج
                </p>
              </li>
            </>
          ) : (
            <div className="flex gap-2">
              <FaUserLarge
                title="ثبت نام / ورود"
                className="text-gray-900 w-4 h-4 cursor-pointer"
              />
              <Link href={"/login"} className="hover:text-orange">
                ورود
              </Link>{" "}
              /
              <Link href={"/signup"} className="hover:text-orange">
                ثبت نام
              </Link>
            </div>
          )}
        </ul>
        <SearchInput />
        <div className="flex gap-4 items-center">
          <img
            src="/90223181741.png"
            alt="logo-image"
            className="h-14 w-14 relative bottom-2"
          />
        </div>
      </div>
    </>
  );
};

export default HamburgerMenu;
