"use client";
import { getRole } from "@/utils/session";
import Link from "next/link";
import React from "react";

const AdminBtn = () => {
  const role = getRole();
  return (
    <Link href={`${role === "ADMIN" ? "/admin/products" : "/admin-login"}`}>
      ادمین
    </Link>
  );
};

export default AdminBtn;
