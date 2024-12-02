import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FaUserLarge } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import HamburgerMenu from "./hamburger-menu";

const Header = () => {
  return (
    <div className="bg-BackgroundColor text-white py-5 px-5">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <img
              src="90223181741.png"
              alt="logo-image"
              className="h-14 w-14 md:w-20 md:h-20"
            />
            <h3 className="sm:text-lg relative top-2">عطاری بوته</h3>
          </div>
          <div>
            <div className="relative w-44 sm:w-72">
              <div className="absolute inset-y-0 start-1 flex items-center ps-3 pointer-events-none">
                <IoSearchOutline className="w-5 h-5 relative bottom-[2px]" />
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full placeholder:text-xs py-2 md:placeholder:text-base bg-BackgroundColor outline-none rounded-full px-8 md:py-3 pr-12 ps-10 text-sm text-gray-900 border border-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="اینجا سرچ کنید..."
                required
              />
            </div>
          </div>
          <div className="hidden md:flex gap-7 items-center">
            <FaShoppingCart className="text-gray-200 w-5 h-5 cursor-pointer" />
            <Link href={"/login-user"}>
              <FaUserLarge
                title="ثبت نام / ورود"
                className="text-gray-200 w-5 h-5 cursor-pointer"
              />
            </Link>
          </div>
        </div>
        <div className="hidden md:flex justify-between my-5 pt-5 items-center border-t border-gray-800">
          <ul className="flex gap-8 items-center">
            <li className="text-lg hover:text-orange">
              <Link href={"/"}>صفحه اصلی</Link>
            </li>
            <li className="sm:text-base lg:text-lg hover:text-orange">
              <button>محصولات</button>
            </li>
            <li className="sm:text-base lg:text-lg hover:text-orange">
              <button>درباره ما</button>
            </li>
            <li className="sm:text-base lg:text-lg hover:text-orange">
              <button>تماس با ما</button>
            </li>
            <li className="sm:text-base lg:text-lg hover:text-orange">
              <button>وبلاگ</button>
            </li>
            <li className="sm:text-base lg:text-lg hover:text-orange">
              <Link href={"/login-admin"}>ادمین</Link>
            </li>
          </ul>
          <p className="hover:bg-orange px-6 py-2.5 rounded-full cursor-pointer">
            تخفیف های ویژه
          </p>
        </div>

        <HamburgerMenu />
      </div>
    </div>
  );
};

export default Header;
