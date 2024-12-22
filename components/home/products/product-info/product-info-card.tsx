import Image from "next/image";
import React from "react";
import AddToCartBtn from "./add-to-cart-btn";

const ProductInfoCard: React.FC<IShoppingCartProductList> = ({
  name,
  price,
  description,
  quantity,
  images,
  thumbnail,
  addToCart,
  _id,
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
                className="w-11/12 h-72 rounded-lg shadow-md mb-4"
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
                <AddToCartBtn
                  key={_id}
                  addToCart={(quantity) => {
                    if (addToCart) {
                      addToCart(quantity);
                    }
                  }}
                  productId={_id}
                  quantity={quantity!}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductInfoCard;
