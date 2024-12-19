"use client";

import Link from "next/link";
import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FaBars, FaUserLarge } from "react-icons/fa6";
import { AiFillHome } from "react-icons/ai";
import { AiFillProduct } from "react-icons/ai";
import { MdOutlineChatBubble } from "react-icons/md";
import { AiFillPhone } from "react-icons/ai";
import { MdOutlineContactSupport } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import SearchInput from "@/components/form/search";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  return (
    <>
      <div className="flex sm:hidden justify-between items-center">
        <button onClick={() => setIsOpen((prev) => !prev)} className="">
          <FaBars className="text-gray-200 w-5 h-5 cursor-pointer" />
        </button>
        <ul
          className={`${
            isOpen ? "flex" : "hidden"
          } flex-col gap-8 justify-center z-50 py-6 bg-slate-200 absolute top-[4.2rem] left-0 rounded text-gray-800 w-full p-5`}
        >
          <li className="hover:text-orange flex gap-2 items-center">
            <AiFillHome className="w-5 h-5 cursor-pointer" />
            <Link href={"/"}>صفحه اصلی</Link>
          </li>
          <li className="hover:text-orange flex gap-2 items-center">
            <AiFillProduct className="w-5 h-5 cursor-pointer" />
            <Link href={"/products"}>محصولات</Link>
          </li>
          <li className="hover:text-orange flex gap-2 items-center">
            <MdOutlineContactSupport className="w-5 h-5 cursor-pointer" />
            <button>درباره ما</button>
          </li>
          <li className="hover:text-orange flex gap-2 items-center">
            <AiFillPhone className="w-5 h-5 cursor-pointer" />
            <button>تماس با ما</button>
          </li>
          <li className="hover:text-orange flex gap-2 items-center">
            <MdOutlineChatBubble className="w-5 h-5 cursor-pointer" />
            <button>وبلاگ</button>
          </li>
          <li className="hover:text-orange flex gap-2 items-center">
            <RiAdminFill className="w-5 h-5 cursor-pointer" />
            <Link href={"/admin-login"}>ادمین</Link>
          </li>
          <Link href={"/login"} className="flex gap-2">
            <FaUserLarge
              title="ثبت نام / ورود"
              className="text-gray-900 w-4 h-4 cursor-pointer"
            />
            ورود / ثبت نام
          </Link>
          <SearchInput />
        </ul>

        <div className="flex gap-4 items-center">
          <FaShoppingCart className="text-gray-300 w-5 h-5 cursor-pointer" />
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
