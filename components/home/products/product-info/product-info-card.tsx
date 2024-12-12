import Image from "next/image";
import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { IoRemove } from "react-icons/io5";

const ProductInfoCard: React.FC<IProducts> = ({
  name,
  price,
  description,
  quantity,
  images,
  thumbnail,
}) => {
  return (
    <>
      <div className="">
        <div className="container mx-auto px-4 py-8 xl:pb-0">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-8">
              <Image
                src={`http://localhost:8000/images/products/thumbnails/${thumbnail}`}
                alt="Thumbnail-image"
                width={500}
                height={500}
                className="w-11/12 h-auto rounded-lg shadow-md mb-4"
              />
              {images?.length! >= 1 && (
                <div className="flex gap-6 py-4 justify-center overflow-x-auto">
                  {images?.map((image, index) => (
                    <Image
                      key={index}
                      src={`http://localhost:8000/images/products/images/${image}`}
                      alt="Thumbnail-image"
                      width={500}
                      height={500}
                      className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="w-full md:w-1/2 px-4">
              <div className="flex justify-between items-start">
                <h2 className="text-xl text-slate-50 font-bold mb-2">{name}</h2>
                <span className="mr-2 text-sm font-bold text-slate-500">
                  {price} تومان
                </span>
              </div>
              <p className="text-gray-400 font-semibold py-4 mb-6 lg:pl-10">
                {description}
              </p>

              <div className="flex justify-between items-baseline flex-wrap space-y-3">
                <p className="flex items-center font-medium text-gray-400 mb-1">
                  موجودی:
                  <span className="mr-1 text-slate-500 text-sm">
                    {quantity}
                  </span>
                </p>
                <div className="flex gap-6 items-center">
                  <button
                    type="button"
                    className="flex gap-2 h-9 items-center px-3 border border-gray-400 bg-BlueDark text-gray-800 text-xs outline-none bg-transparent rounded-md"
                  >
                    <button>
                      <IoRemove className="text-slate-100 w-5 h-4" />
                    </button>
                    <span className="mx-2.5 text-slate-100">1</span>
                    <button>
                      <IoMdAdd className="text-slate-100 w-5 h-4" />
                    </button>
                  </button>
                  <button
                    type="button"
                    className="inline-flex gap-3 bg-BlueDark shadow items-start rounded-lg bg-primary-700 px-6 py-3 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    <FaShoppingCart className="text-slate-100 w-5 h-4" />
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductInfoCard;
