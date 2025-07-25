import Payment from "@/components/payment/payment";
import React from "react";

const PaymentPage = () => {
  return (
    <div className="bg-BackgroundColor text-white max-w-1770 mx-auto pt-14 sm:pt-40">
      <div className="max-w-1400 mx-auto pt-10 sm:pt-16">
        <Payment />
      </div>
    </div>
  );
};

export default PaymentPage;
