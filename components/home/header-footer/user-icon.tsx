"use client";

import {
  deleteAccsessToken,
  deleteRefreshToken,
  deleteRole,
  getAccsessToken,
  getRole,
} from "@/utils/session";
import Link from "next/link";
import React from "react";
import { FaUserLarge } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { MdLogout } from "react-icons/md";
import { logout } from "@/apis/client/auth";
import { toast } from "react-toastify";
import { FaLock } from "react-icons/fa6";
import { FaUserPlus } from "react-icons/fa";

const UserIcon = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const userExist = getAccsessToken();

  const role = getRole();

  const logOutHandler = async () => {
    await logout();
    deleteAccsessToken();
    deleteRefreshToken();
    deleteRole();
    toast.success("خارج شدید");
    setIsOpen(false);
  };

  return (
    <>
      {!userExist || role === "ADMIN" ? (
        <div className="relative">
          <FaUserLarge
            onClick={() => setIsOpen((prev) => !prev)}
            title="ثبت نام / ورود"
            className="text-gray-200 w-5 h-5 cursor-pointer"
          />
          {isOpen && (
            <div className="bg-slate-200 p-5 z-50 absolute left-0 top-6 rounded text-BackgroundColor w-48 space-y-5">
              <div className="flex gap-2 items-center cursor-pointer">
                <FaLock className="w-4 h-4" />
                <Link href={"login"} className="text-sm">
                  ورود به حساب کاربری
                </Link>
              </div>
              <div className="flex gap-2 items-center cursor-pointer">
                <FaUserPlus className="w-4 h-4" />
                <Link href={"/signup"} className="text-sm">
                  ایجاد حساب کاربری
                </Link>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="relative">
          <FaUserLarge
            onClick={() => setIsOpen((prev) => !prev)}
            title="ثبت نام / ورود"
            className="text-gray-200 w-5 h-5 cursor-pointer"
          />
          {isOpen && (
            <div className="bg-slate-200 p-4 z-50 absolute left-0 top-6 rounded text-BackgroundColor w-40 space-y-4">
              <div className="flex gap-2 items-center cursor-pointer">
                <CgProfile className="w-4 h-4" />
                <p className="text-sm">پروفایل</p>
              </div>
              <div className="flex gap-2 items-center cursor-pointer">
                <MdLogout className="w-4 h-4" />
                <p className="text-sm" onClick={logOutHandler}>
                  خروج
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default UserIcon;
