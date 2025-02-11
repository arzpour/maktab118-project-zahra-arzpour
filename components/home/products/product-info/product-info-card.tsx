import Image from "next/image";
import React from "react";
import AddToCartBtn, { AddToCartBtnSkeleton } from "./add-to-cart-btn";

const ProductInfoCard: React.FC<IShoppingCartProductList> = ({
  name,
  price,
  description,
  images,
  thumbnail,
  addToCart,
  _id,
  quantity,
}) => {
  return (
    <div>
      <div className="container mx-auto px-4 py-8 xl:pb-0">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-8">
            <Image
              src={`http://localhost:8000/images/products/thumbnails/${thumbnail}`}
              alt="Thumbnail-image"
              width={500}
              height={500}
              className="w-11/12 h-72 rounded-lg shadow-md mb-4"
            />
            {(images?.length || 0) >= 1 && (
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
            <div
              className="text-gray-400 font-semibold py-4 mb-6 lg:pl-10 overflow-auto"
              dangerouslySetInnerHTML={{
                __html: description as string | TrustedHTML,
              }}
            ></div>

            <div className="flex justify-between items-baseline flex-wrap space-y-3">
              <p className="flex items-center font-medium text-gray-400 mb-1">
                موجودی:
                <span className="mr-1 text-slate-500 text-sm">{quantity}</span>
              </p>
              <AddToCartBtn
                key={_id}
                addToCart={(quantity) => {
                  if (addToCart) {
                    addToCart(quantity);
                  }
                }}
                productId={_id}
                quantity={quantity || 0}
                name={name || ""}
                price={price?.toString() || ""}
                thumbnail={thumbnail || ""}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfoCard;

export const ProductInfoCardSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="container mx-auto px-4 py-8 xl:pb-0">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-8">
            <div className="w-11/12 bg-BlueDark h-72 rounded-lg shadow-md mb-4"></div>
            <div className="flex gap-6 py-4 justify-center overflow-x-auto">
              {[1, 2, 3, 4].map((el) => (
                <div
                  key={el}
                  className="size-16 bg-BlueDark w-20 h-20 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                ></div>
              ))}
            </div>
          </div>

          <div className="w-full md:w-1/2 px-4">
            <div className="flex justify-between items-start mb-5">
              <h2 className="text-xl text-slate-50 font-bold bg-BlueDark w-32 h-5 rounded-lg mb-3"></h2>
              <span className="mr-2 text-sm font-bold bg-BlueDark w-20 h-5 rounded-lg"></span>
            </div>
            <p className="bg-BlueDark w-full h-6 font-semibold mb-2 lg:pl-10 rounded-lg"></p>
            <p className="bg-BlueDark w-full h-6 font-semibold mb-2 lg:pl-10 rounded-lg"></p>
            <p className="bg-BlueDark w-full h-6 font-semibold lg:pl-10 rounded-lg mb-2"></p>
            <p className="bg-BlueDark w-72 h-6 font-semibold lg:pl-10 rounded-lg mb-7"></p>

            <div className="flex justify-between items-baseline flex-wrap space-y-3">
              <p className="flex items-center font-medium bg-BlueDark w-20 h-5 mb-1 rounded-lg"></p>

              <AddToCartBtnSkeleton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
