import HomeLayout from "@/providers/homeLayout";
import React from "react";

const ProductsLayout: React.FC<IChildren> = ({ children }) => {
  return <HomeLayout>{children}</HomeLayout>;
};

export default ProductsLayout;
