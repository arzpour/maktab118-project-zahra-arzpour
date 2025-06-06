"use client";

import Link from "next/link";
import React from "react";
import { FaBars, FaUserLarge } from "react-icons/fa6";
import { AiFillHome, AiFillProduct, AiFillPhone } from "react-icons/ai";
import {
  MdLogout,
  MdOutlineChatBubble,
  MdOutlineContactSupport,
} from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import ShoppingCartIcon from "@/components/shopping-cart/shopping-cart-icon";
import { getRole } from "@/utils/session";
import { CgProfile } from "react-icons/cg";

import Image from "next/image";
import SearchInput from "@/components/search/searchInput";
import AboutUsBtn from "./aboutUsBtn";
import ContactUsBtn from "./contactUsBtn";
import useLogout from "@/hooks/useLogout";

const HamburgerMenu = () => {
  const role = getRole();

  const { isOpen, setIsOpen, logoutHandler } = useLogout();

  return (
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
          <AboutUsBtn />
        </li>
        <li className="flex gap-2 items-center">
          <AiFillPhone className="w-5 h-5 cursor-pointer" />
          <ContactUsBtn />
        </li>
        <li className="flex gap-2 items-center">
          <MdOutlineChatBubble className="w-5 h-5 cursor-pointer" />
          <Link className="hover:text-orange" href={"/blogs"}>
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
              <Link
                href={"/profile"}
                className="cursor-pointer hover:text-orange"
              >
                پروفایل
              </Link>
            </li>
            <li className="flex gap-2 items-center">
              <MdLogout className="w-5 h-5" />
              <button
                className="cursor-pointer hover:text-orange"
                onClick={logoutHandler}
              >
                خروج
              </button>
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
      <SearchInput device="mobile" />
      <div className="flex gap-4 items-center">
        <Image
          src="/90223181741.png"
          alt="logo-image"
          className="h-14 w-14 relative bottom-2"
          width={400}
          height={400}
        />
      </div>
    </div>
  );
};

export default HamburgerMenu;
