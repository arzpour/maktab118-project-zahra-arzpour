"use client";

import Link from "next/link";
import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FaBars, FaUserLarge } from "react-icons/fa6";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  return (
    <>
      <div className="flex relative md:hidden justify-between my-5 pt-5 items-center mx-5">
        <button onClick={() => setIsOpen((prev) => !prev)} className="relative">
          <FaBars className="text-gray-200 w-5 h-5 cursor-pointer" />
        </button>
        <ul
          className={`${
            isOpen ? "flex" : "hidden"
          } flex-col gap-8 justify-center z-50 bg-slate-200 absolute top-11 left-0 rounded text-gray-800 w-full p-5`}
        >
          <li className="hover:text-orange">
            <Link href={"/"}>صفحه اصلی</Link>
          </li>
          <li className="hover:text-orange">
            <button>محصولات</button>
          </li>
          <li className="hover:text-orange">
            <button>درباره ما</button>
          </li>
          <li className="hover:text-orange">
            <button>تماس با ما</button>
          </li>
          <li className="hover:text-orange">
            <button>وبلاگ</button>
          </li>
          <li className="hover:text-orange">
            <Link href={"/login-admin"}>ادمین</Link>
          </li>
          <li className="hover:text-orange cursor-pointer">تخفیف های ویژه</li>
        </ul>
        <div className="flex gap-7 items-center">
          <FaShoppingCart className="text-gray-200 w-5 h-5 cursor-pointer" />
          <Link href={"/login-user"}>
            <FaUserLarge
              title="ثبت نام / ورود"
              className="text-gray-200 w-5 h-5 cursor-pointer"
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default HamburgerMenu;
