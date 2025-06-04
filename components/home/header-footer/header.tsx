import React from "react";
import Link from "next/link";
import HamburgerMenu from "./hamburger-menu";
import Image from "next/image";
import ShoppingCartIcon from "@/components/shopping-cart/shopping-cart-icon";
import ProductsDropdown from "./products-dropdown";
import UserIcon from "./user-icon";
import AdminBtn from "./adminBtn";
import SearchInput from "../../search/searchInput";
import AboutUsBtn from "./aboutUsBtn";
import ContactUsBtn from "./contactUsBtn";

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
            <SearchInput />
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
              <AboutUsBtn />
            </li>
            <li className="sm:text-base lg:text-lg hover:text-orange">
              <ContactUsBtn />
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
