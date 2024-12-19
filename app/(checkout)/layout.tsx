import HomeLayout from "@/providers/homeLayout";
import React from "react";

const CheckoutLayout: React.FC<IChildren> = ({ children }) => {
  return <HomeLayout> {children}</HomeLayout>;
};

export default CheckoutLayout;
