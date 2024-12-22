import { productActions } from "@/redux/features/product.slice";
import { useAppDispatch } from "@/redux/hook";
import React from "react";
import { FiMinus } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";

const ProductShoppingCart: React.FC<IShoppingCartProductList> = ({
  thumbnail,
  name,
  selectedQuantity,
  price,
  _id,
  quantity,
}) => {
  const dispatch = useAppDispatch();

  const increaseProduct = () => {
    dispatch(productActions.increaseQuantity(_id!));
  };

  const decreaseProductById = () => {
    dispatch(productActions.decreaseProduct(_id!));
  };

  const removeProductById = () => {
    dispatch(productActions.removeProduct(_id!));
  };

  return (
    <div className="flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6 border-b border-slate-800 rounded-sm">
      <div className="w-full md:max-w-[126px]">
        <img
          src={`http://localhost:8000/images/products/thumbnails/${thumbnail}`}
          alt="product-image"
          className="mx-auto rounded-xl object-cover h-28"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 w-full">
        <div className="md:col-span-2">
          <div className="flex flex-col max-[500px]:items-center gap-3">
            <h6 className="font-semibold text-base leading-7 text-white">
              {name}
            </h6>
            <h6 className="hidden md:block text-sm leading-7 text-slate-500 transition-all duration-300">
              {price} تومان
            </h6>
          </div>
        </div>
        <div className="flex md:justify-center items-center max-[500px]:justify-center h-full max-md:mt-3">
          <button className="flex gap-4 items-center justify-center px-3 py-2 border border-gray-500 text-white text-xs outline-none bg-transparent rounded-md">
            <div onClick={increaseProduct}>
              <IoMdAdd className="text-white w-4 h-4" />
            </div>
            <span className="text-xs md:text-sm">{selectedQuantity}</span>
            <div onClick={decreaseProductById}>
              <FiMinus className="text-white w-4 h-4 " />
            </div>
          </button>
        </div>
        <div className="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full">
          <p className="md:font-bold text-sm leading-8 text-slate-400 text-center transition-all duration-300">
            {selectedQuantity! * price!} تومان
          </p>
        </div>
        <div className="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full">
          <button
            onClick={removeProductById}
            className="md:font-bold text-sm leading-8 cursor-pointer bg-red-600 rounded py-0.5 px-7 text-white text-center transition-all duration-300"
          >
            حذف
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductShoppingCart;
