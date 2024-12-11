
"use client";

import Link from "next/link";
import React from "react";
import { FaBars } from "react-icons/fa6";
import { BiCategoryAlt } from "react-icons/bi";
import { FaClipboardList } from "react-icons/fa6";
import { AiFillProduct } from "react-icons/ai";
import { IoPricetag, IoSearchOutline } from "react-icons/io5";

const HamburgerMenuAdmin = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  return (
    <div className="contents sm:flex w-full relative md:hidden justify-between my-5 pt-5 items-center mx-5">
      <button onClick={() => setIsOpen((prev) => !prev)} className="">
        <FaBars className="text-gray-200 w-5 h-5 cursor-pointer" />
      </button>
      <ul
        className={`${
          isOpen ? "flex" : "hidden"
        } flex-col gap-8 justify-center z-50 bg-slate-200 absolute top-12 left-0 rounded text-gray-800 w-full p-5`}
      >
        <li className="hover:text-orange flex gap-2 items-center">
          <BiCategoryAlt className="w-5 h-5 cursor-pointer" />
          <Link href={"/admin/categories"}>دسته بندی ها</Link>
        </li>
        <li className="hover:text-orange flex gap-2 items-center">
          <AiFillProduct className="w-5 h-5 cursor-pointer" />
          <Link href={"/admin/products"}>محصولات</Link>
        </li>
        <li className="hover:text-orange flex gap-2 items-center">
          <FaClipboardList className="w-5 h-5 cursor-pointer" />
          <button>سفارش ها</button>
        </li>
        <li className="hover:text-orange flex gap-2 items-center">
          <IoPricetag className="w-5 h-5 cursor-pointer" />
          <Link href={"/admin/InventoryAndPrice"}>موجودی و قیمت</Link>
        </li>
        <div className="relative w-full sm:hidden">
          <div className="absolute inset-y-0 start-1 flex items-center ps-3 pointer-events-none">
            <IoSearchOutline className="w-5 h-5 relative bottom-0.5 text-gray-300" />
          </div>
          <input
            type="search"
            className="block w-full outline-none py-2.5 placeholder:text-sm bg-BackgroundColor rounded-full px-8 md:py-3 pr-12 ps-10 text-sm text-gray-900 border border-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="اینجا سرچ کنید..."
          />
        </div>
      </ul>
    </div>
  );
};

export default HamburgerMenuAdmin;