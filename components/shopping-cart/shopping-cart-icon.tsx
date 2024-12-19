"use client";

import { useAppSelector } from "@/redux/hook";
import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import ShoppingCartDropDown from "./dropdown-shopping-cart";

const ShoppingCartIcon = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const cartShoppingNumber = useAppSelector(
    (state) => state.product.cartQuantity
  );
  console.log(cartShoppingNumber, "cart number");

  return (
    <div onClick={() => setIsOpen((prev) => !prev)} className="relative">
      <FaShoppingCart
        title="سبد خرید"
        className="text-gray-200 w-5 h-5 cursor-pointer"
      />
      <button className="bg-orange py-0.5 px-1.5 text-[10px] rounded-full text-white absolute -top-3 -left-2">
        {cartShoppingNumber}
      </button>
      {isOpen && <ShoppingCartDropDown />}
    </div>
  );
};

export default ShoppingCartIcon;
