"use client";

import Link from "next/link";
import React from "react";
import { FaBars } from "react-icons/fa6";

const HamburgerMenuAdmin = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  return (
    <div className="flex w-full relative md:hidden justify-between my-5 pt-5 items-center mx-5">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative bottom-2"
      >
        <FaBars className="text-gray-200 w-5 h-5 cursor-pointer" />
      </button>
      <ul
        className={`${
          isOpen ? "flex" : "hidden"
        } flex-col gap-8 justify-center z-50 bg-slate-100 absolute top-11 left-0 rounded text-gray-800 w-full p-5`}
      >
        <li className="hover:text-orange">
          <Link href={"/admin/categories"}>دسته بندی ها</Link>
        </li>
        <li className="hover:text-orange">
          <Link href={"/admin/products"}>محصولات</Link>
        </li>
        <li className="hover:text-orange">
          <button>سفارش ها</button>
        </li>
        <li className="hover:text-orange">
          <Link href={"/admin/InventoryAndPrice"}>موجودی و قیمت</Link>
        </li>
      </ul>
    </div>
  );
};

export default HamburgerMenuAdmin;
