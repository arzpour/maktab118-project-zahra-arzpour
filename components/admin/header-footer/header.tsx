import Link from "next/link";
import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import HamburgerMenuAdmin from "./hamburger-menu";
import AdminLogoutBtn from "./logout-btn";

const AdminPageHeader = () => {
  return (
    <div className="bg-BackgroundColor text-white py-5 px-5">
      <div className="max-w-1400 mx-auto">
        <div className="flex justify-between items-center">
          <div className="hidden md:flex gap-3 md:gap-4 xl:gap-8 items-center">
            <div className="hidden md:flex gap-2 items-center">
              <img
                src="/90223181741.png"
                alt="logo-image"
                className="h-14 w-14 lg:w-16 lg:h-16 xl:h-20 xl:w-20"
              />
              <h3 className="hidden lg:block lg:text-22 relative top-2 text-orange">
                پنل مدیریت
              </h3>
            </div>
            <ul className="hidden md:flex gap-4 xl:text-lg lg:gap-8 items-center relative top-2">
              <li className="hover:text-orange">
                <Link href={"/admin/categories"}>دسته بندی ها</Link>
              </li>
              <li className="hover:text-orange">
                <Link href={"/admin/products"}>محصولات</Link>
              </li>
              <li className="hover:text-orange">
                <Link href={"/admin/orders"}>سفارش ها</Link>
              </li>
              <li className="hover:text-orange">
                <Link href={"/admin/InventoryAndPrice"}>موجودی و قیمت</Link>
              </li>
            </ul>
          </div>

          <HamburgerMenuAdmin />

          <div className="flex gap-5 md:gap-3 lg:gap-5 items-center">
            <div className="relative w-44 lg:w-60">
              <div className="absolute inset-y-0 start-1 flex items-center ps-3 pointer-events-none">
                <IoSearchOutline className="w-5 h-5 relative bottom-0.5" />
              </div>
              <input
                type="search"
                className="block w-full outline-none py-2 placeholder:text-sm bg-BackgroundColor rounded-lg px-8 md:py-3 pr-12 ps-10 text-sm text-gray-900 border border-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="اینجا سرچ کنید..."
              />
            </div>
            <AdminLogoutBtn />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPageHeader;
