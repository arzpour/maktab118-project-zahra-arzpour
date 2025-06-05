import React from "react";
import HamburgerMenuAdmin from "./hamburger-menu";
import AdminLogoutBtn from "./logout-btn";
import Image from "next/image";
import MenuTitles from "./menu-titles";
import SearchInput from "@/components/search/searchInput";

const AdminPageHeader = () => {
  return (
    <div className="bg-BackgroundColor text-white py-5 px-5">
      <div className="max-w-1400 mx-auto">
        <div className="flex justify-between items-center">
          <div className="hidden sm:flex gap-3 md:gap-4 xl:gap-8 items-center">
            <div className="hidden md:flex gap-2 items-center">
              <Image
                src="/90223181741.png"
                alt="logo-image"
                width={500}
                height={500}
                className="h-14 w-14 lg:w-16 lg:h-16 xl:h-20 xl:w-20"
              />
              <h3 className="hidden lg:block lg:text-22 relative top-2 text-orange">
                پنل مدیریت
              </h3>
            </div>
            <MenuTitles />
          </div>

          <HamburgerMenuAdmin />

          <div className="flex gap-5 md:gap-3 lg:gap-5 items-center">
            <SearchInput className="!w-44" />
            <AdminLogoutBtn />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPageHeader;
