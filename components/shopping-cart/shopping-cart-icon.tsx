"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hook";
import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import ShoppingCartDropDown from "./dropdown-shopping-cart";
import useGetShoppingCartByUserId from "@/hooks/useCartByUserId";
import { getUserId } from "@/utils/session";
import { productActions } from "@/redux/features/product.slice";

interface IShoppingCartIcon {
  hamburgerMenu?: boolean;
}

const ShoppingCartIcon: React.FC<IShoppingCartIcon> = ({ hamburgerMenu }) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const cartShoppingNumber = useAppSelector(
    (state) => state.product.cartQuantity
  );

  const user = getUserId();
  const dispatch = useAppDispatch();

  const { data: shoppingCart, isSuccess } = useGetShoppingCartByUserId();

  React.useEffect(() => {
    if (user && isSuccess && shoppingCart) {
      dispatch(productActions.updateCart(shoppingCart.products || []));
    }
  }, [user, shoppingCart, isSuccess, dispatch]);

  return (
    <div
      onClick={() => setIsOpen((prev) => !prev)}
      className={`relative ${hamburgerMenu ? "flex gap-2" : ""}`}
    >
      <FaShoppingCart
        title="سبد خرید"
        className={`w-5 h-5 cursor-pointer ${
          hamburgerMenu ? "text-BlueD" : "text-gray-200"
        }`}
      />
      <button
        className={`bg-orange py-0.5 px-1.5 text-[10px] rounded-full text-white absolute -top-3 ${
          hamburgerMenu ? "right-0" : "-left-2"
        }`}
      >
        {cartShoppingNumber}
      </button>
      {hamburgerMenu && <p>سبد خرید</p>}
      {isOpen && (
        <ShoppingCartDropDown hamburgerMenu={hamburgerMenu ? true : false} />
      )}
    </div>
  );
};

export default ShoppingCartIcon;
