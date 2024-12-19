import ShoppingCart from "@/components/shopping-cart/shopping-cart";
import React from "react";

const ShoppingCartPage = () => {
  return (
    <div className="bg-BackgroundColor pb-20 text-white max-w-1770 mx-auto">
      <div className="max-w-1400 mx-auto">
        <ShoppingCart />
      </div>
    </div>
  );
};

export default ShoppingCartPage;
