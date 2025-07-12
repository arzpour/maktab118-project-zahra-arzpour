"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const MenuTitles = () => {
  const path = usePathname();
  return (
    <ul className="hidden md:flex gap-4 xl:text-base lg:gap-8 items-center relative top-2">
      <li
        className={`hover:text-orange ${
          path === "/admin/categories"
            ? "border-b-2 border-orange text-orange opacity-85"
            : ""
        }`}
      >
        <Link href={"/admin/categories"}>دسته بندی ها</Link>
      </li>
      <li
        className={`hover:text-orange ${
          path === "/admin/products"
            ? "border-b-2 border-orange text-orange opacity-85"
            : ""
        }`}
      >
        <Link href={"/admin/products"}>محصولات</Link>
      </li>
      <li
        className={`hover:text-orange ${
          path === "/admin/orders"
            ? "border-b-2 border-orange text-orange opacity-85"
            : ""
        }`}
      >
        <Link href={"/admin/orders"}>سفارش ها</Link>
      </li>
      <li
        className={`hover:text-orange ${
          path === "/admin/blogs"
            ? "border-b-2 border-orange text-orange opacity-85"
            : ""
        }`}
      >
        <Link href={"/admin/blogs"}>بلاگ ها</Link>
      </li>
      <li
        className={`hover:text-orange ${
          path === "/admin/InventoryAndPrice"
            ? "border-b-2 border-orange text-orange opacity-85"
            : ""
        }`}
      >
        <Link href={"/admin/InventoryAndPrice"}>موجودی و قیمت</Link>
      </li>
    </ul>
  );
};

export default MenuTitles;
