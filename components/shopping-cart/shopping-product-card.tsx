import { useEditShoppingCart } from "@/apis/mutations/shopping-cart";
import { productActions } from "@/redux/features/product.slice";
import { useAppDispatch } from "@/redux/hook";
import { editShoppingCartProductSchemaType } from "@/server/validations/shoppingCart.validation";
import { getUserId } from "@/utils/session";
import Link from "next/link";
import React from "react";
import { FiMinus } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";

const ShoppingProductCard: React.FC<IShoppingCartProductList> = ({
  thumbnail,
  name,
  selectedQuantity,
  price,
  _id,
  quantity,
}) => {
  const dispatch = useAppDispatch();

  const user = getUserId();

  const editShoppingCart = useEditShoppingCart();

  const editShoppingCartHandler = async (
    data: editShoppingCartProductSchemaType
  ) => {
    try {
      await editShoppingCart.mutateAsync({
        userId: user || "",
        data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const increaseProduct = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (
      quantity &&
      selectedQuantity &&
      quantity > selectedQuantity &&
      quantity > 0
    ) {
      dispatch(productActions.increase({ _id: _id || "", quantity: 1 }));
      if (user) {
        await editShoppingCartHandler({
          selectedQuantity: selectedQuantity! + 1,
          _id,
        });
      }
    }
  };

  const decreaseProductById = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();

    if (quantity && quantity > 0) {
      dispatch(productActions.decrease({ _id: _id || "", quantity: 1 }));
      if (user) {
        await editShoppingCartHandler({
          selectedQuantity: selectedQuantity! - 1,
          _id,
        });
      }
    }
  };

  return (
    <>
      <div className="size-16 shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={`http://localhost:8000/images/products/thumbnails/${thumbnail}`}
          alt="product-image"
          className="size-full object-cover"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <Link href={`/product/${_id}`}>
            <h4 className="text-sm">{name}</h4>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between">
          <p className="ml-4 text-slate-600 text-xs">
            {price! * selectedQuantity!} تومان
          </p>
          <div className="flex justify-center items-center max-[500px]:justify-center h-full max-md:mt-3">
            <button className="flex gap-2 items-center justify-center px-1.5 py-1.5 text-slate-600 border border-gray-500 text-xs outline-none bg-transparent rounded-md">
              <div onClick={(e) => increaseProduct(e)}>
                <IoMdAdd className="w-4 h-4" />
              </div>
              <span>{selectedQuantity}</span>

              <div onClick={(e) => decreaseProductById(e)}>
                <FiMinus className="w-4 h-4 " />
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingProductCard;
