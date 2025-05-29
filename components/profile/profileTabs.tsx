"use client";
import React from "react";
import Link from "next/link";
import { IoHomeSharp } from "react-icons/io5";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { FaHeart, FaUserAlt } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { profileActions } from "@/redux/features/profile.slice";

const ProfileTabs = () => {
  const dispatch = useAppDispatch();
  const { profileTab } = useAppSelector((state) => state.profile);

  return (
    <ul className="space-y-5 font-medium mt-9">
      <li className="flex items-end gap-3 p-2 pr-5 py-3">
        <IoHomeSharp className="w-6 h-6" />
        <Link href="/" className="hover:text-orange">
          صفحه اصلی
        </Link>
      </li>
      <button
        className={`flex items-end gap-3 p-2 pr-5 py-3 ${
          profileTab === "userInfo" ? "bg-BlueL w-full" : ""
        }`}
        onClick={() => dispatch(profileActions.setProfileTab("userInfo"))}
      >
        <FaUserAlt className="w-6 h-6" />
        <Link
          href="/profile"
          className={`hover:text-orange ${
            profileTab === "userInfo" ? "text-orange" : ""
          }`}
        >
          اطلاعات کاربری
        </Link>
      </button>
      <button
        className={`flex items-end gap-3 p-2 pr-5 py-3 ${
          profileTab === "orders" ? "bg-BlueL w-full" : ""
        }`}
        onClick={() => dispatch(profileActions.setProfileTab("orders"))}
      >
        <RiShoppingBag3Fill className="w-7 h-7" />
        <Link
          href="/profile"
          className={`hover:text-orange ${
            profileTab === "orders" ? "text-orange" : ""
          }`}
        >
          سفارش ها
        </Link>
      </button>
      <li className="flex items-end gap-3 p-2 pr-5 py-3">
        <FaHeart className="w-6 h-6" />
        <Link href="/profile" className="hover:text-orange">
          علاقه مندی ها
        </Link>
      </li>
      <li className="flex items-end gap-3 p-2 pr-5 py-3">
        <LuLogOut className="w-6 h-6" />
        <Link href="/profile" className="hover:text-orange">
          خروج
        </Link>
      </li>
    </ul>
  );
};

export default ProfileTabs;
