import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import Link from "next/link";
import HamburgerMenu from "./hamburger-menu";
import Image from "next/image";
import ShoppingCartIcon from "@/components/shopping-cart/shopping-cart-icon";
import ProductsDropdown from "./products-dropdown";
import UserIcon from "./user-icon";
import AdminBtn from "./adminBtn";

const Header = () => {
  return (
    <div className="bg-BackgroundColor text-white pb-2 pt-3 px-5 fixed w-full z-50">
      <div className="hidden sm:block max-w-1400 mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <Image
              src="/90223181741.png"
              alt="logo-image"
              width={500}
              height={500}
              className="h-14 w-14 md:w-20 md:h-20"
            />
            <h3 className="sm:text-lg relative top-2">عطاری بوته</h3>
          </div>
          <div>
            <div className="hidden sm:block relative w-44 sm:w-72">
              <div className="absolute inset-y-0 start-1 flex items-center ps-3 pointer-events-none">
                <IoSearchOutline className="w-5 h-5 relative bottom-0.5" />
              </div>
              <input
                type="search"
                className="block w-full placeholder:text-xs py-2 md:placeholder:text-base bg-BackgroundColor outline-none rounded-full px-8 md:py-2.5 pr-12 ps-10 text-sm text-gray-900 border border-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="اینجا سرچ کنید..."
              />
            </div>
          </div>
          <div className="flex gap-5 items-center">
            <ShoppingCartIcon />
            <UserIcon />
          </div>
        </div>
        <div className="hidden sm:flex justify-between pt-4 pb-0.5 items-center border-t border-gray-800">
          <ul className="flex gap-4 md:gap-8 items-center">
            <li className="sm:text-base lg:text-lg hover:text-orange">
              <Link href={"/"}>صفحه اصلی</Link>
            </li>
            <ProductsDropdown />
            <li className="sm:text-base lg:text-lg hover:text-orange">
              <button>درباره ما</button>
            </li>
            <li className="sm:text-base lg:text-lg hover:text-orange">
              <button>تماس با ما</button>
            </li>
            <li className="sm:text-base lg:text-lg hover:text-orange">
              <Link href={"/blogs"}>وبلاگ</Link>
            </li>
            <li className="sm:text-base lg:text-lg hover:text-orange">
              <AdminBtn />
            </li>
          </ul>
          <p className="text-orange hover:border-b hover:border-b-orange text-sm px-6 py-2.5 rounded-full cursor-pointer">
            تخفیف های ویژه
          </p>
        </div>
      </div>
      <HamburgerMenu />
    </div>
  );
};

export default Header;
