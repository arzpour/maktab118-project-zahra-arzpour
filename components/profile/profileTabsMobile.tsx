"use client";
import React from "react";
import Link from "next/link";
import { IoHomeSharp } from "react-icons/io5";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { FaHeart, FaUserAlt } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { profileActions } from "@/redux/features/profile.slice";
import useLogout from "@/hooks/useLogout";
import { useRouter } from "next/navigation";

const ProfileTabsMobile = () => {
  const dispatch = useAppDispatch();
  const { profileTab } = useAppSelector((state) => state.profile);

  const { logOutHandler } = useLogout();
  const router = useRouter();

  return (
    profileTab === "" && (
      <ul className="sm:hidden space-y-5 font-medium">
        <li className="flex items-end gap-3 p-2 pr-5 py-3">
          <IoHomeSharp className="w-6 h-6 text-slate-200" />
          <Link href="/" className="hover:text-orange text-slate-200">
            صفحه اصلی
          </Link>
        </li>
        <button
          className="flex items-end gap-3 p-2 pr-5 py-3"
          onClick={() => dispatch(profileActions.setProfileTab("userInfo"))}
        >
          <FaUserAlt className="w-6 h-6 text-slate-200" />
          <Link href="/profile" className="hover:text-orange text-slate-200">
            اطلاعات کاربری
          </Link>
        </button>
        <button
          className="flex items-end gap-3 p-2 pr-5 py-3"
          onClick={() => dispatch(profileActions.setProfileTab("orders"))}
        >
          <RiShoppingBag3Fill className="w-7 h-7 text-slate-200" />
          <Link href="/profile" className="hover:text-orange text-slate-200">
            سفارش ها
          </Link>
        </button>
        <li className="flex items-end gap-3 p-2 pr-5 py-3">
          <FaHeart className="w-6 h-6 text-slate-200" />
          <span className="hover:text-orange text-slate-200">
            علاقه مندی ها
          </span>
        </li>
        <button
          className="flex items-end gap-3 p-2 pr-5 py-3"
          onClick={() => {
            logOutHandler();
            router.push("/");
          }}
        >
          <LuLogOut className="w-6 h-6 text-slate-200" />
          <span className="hover:text-orange text-slate-200">خروج</span>
        </button>
      </ul>
    )
  );
};

export default ProfileTabsMobile;
