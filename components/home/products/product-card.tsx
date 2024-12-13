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
    <Link href={`/products/${_id}`}>
      <div className="max-w-sm border w-72 h-96 border-gray-700 cursor-pointer rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <Image
          width={500}
          height={500}
          className="rounded-t-lg h-12.5"
          src={`http://localhost:8000/images/products/thumbnails/${thumbnail}`}
          alt="product-image"
        />
        <div className="p-5">
          <div className="flex justify-between mb-2 items-baseline py-2">
            <h5 className="mb-2 font-bold tracking-tight text-slate-50">
              {name}
            </h5>
            <span className="mb-3 text-xs text-slate-300">{price} تومان</span>
          </div>
          <p className="text-sm font-bold tracking-tight text-slate-300 line-clamp-2 mb-1">
            {description}
          </p>
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
