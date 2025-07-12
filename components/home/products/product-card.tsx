import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa6";

const ProductCard: React.FC<IProducts> = ({
  thumbnail,
  name,
  price,
  description,
  _id,
}) => {
  return (
    <Link href={`/product/${_id}`}>
      <div className="max-w-sm border w-72 h-96 border-gray-700 cursor-pointer rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <Image
          width={500}
          height={500}
          className="rounded-t-lg h-12.5"
          src={`${process.env.NEXT_PUBLIC_THUMBNAIL_URL}/${thumbnail}`}
          alt="product-image"
        />
        <div className="p-5">
          <div className="flex justify-between mb-2 items-baseline py-2">
            <h5 className="mb-2 font-bold tracking-tight text-slate-50 truncate">
              {name}
            </h5>
            <span className="mb-3 text-xs text-slate-300 truncate">
              {price} تومان
            </span>
          </div>
          <div
            className="text-sm font-bold tracking-tight text-slate-300 line-clamp-2 mb-1"
            dangerouslySetInnerHTML={{
              __html: description as string | TrustedHTML,
            }}
          ></div>
          <p className="text-orange text-sm flex justify-end gap-2 items-center py-4 pb-5">
            مشاهده بیشتر
            <FaArrowLeft className="w-3 h-3" />
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

export const ProductCardSkeleton = () => {
  return (
    <div className="max-w-sm border animate-pulse w-72 h-96 border-gray-800 cursor-pointer rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="h-48 bg-BlueL"></div>
      <div className="p-5">
        <div className="flex justify-between mb-2 items-baseline py-2">
          <h5 className="mb-2 font-bold tracking-tight bg-BlueL h-5 w-28 rounded-lg"></h5>
          <span className="mb-3 text-xs bg-BlueL h-3 w-10 rounded-lg"></span>
        </div>
        <p className="text-sm font-bold tracking-tight bg-BlueL h-4 w-full mb-3 rounded-lg line-clamp-2"></p>
        <p className="text-sm font-bold tracking-tight bg-BlueL h-4 w-56 rounded-lg line-clamp-2 mb-1"></p>

        <div className="bg-BlueL h-4 w-24 rounded-lg text-sm mt-5 mr-auto"></div>
      </div>
    </div>
  );
};
