"use client";

import { getRole } from "@/utils/session";
import React from "react";
import Link from "next/link";
import PaymentProducts from "./payment-products";

const Payment = () => {
  const role = getRole();

  return (
    <div className="flex flex-col justify-center gap-y-5">
      <h3 className="text-xl mb-2">صفحه پرداخت</h3>
      {!role && (
        <div className="flex gap-2">
          <h3>لطفا وارد حساب کاربری خود شوید</h3>
          <Link href={"/login?from=payment"} className="text-orange underline">
            حساب کاربری
          </Link>
        </div>
      )}
      {role && <PaymentProducts />}
    </div>
  );
};

export default Payment;
