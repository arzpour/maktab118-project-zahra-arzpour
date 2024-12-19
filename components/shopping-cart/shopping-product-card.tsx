import Link from "next/link";
import React from "react";

const ShoppingProductCard: React.FC<IShoppingCartProductList> = ({
  thumbnail,
  name,
  selectedQuantity,
  price,
  _id,
}) => {
  return (
    <Link href={`/products/${_id}`}>
      <li className="flex pt-6 pb-3 gap-5 flex-wrap">
        <div className="size-16 shrink-0 overflow-hidden rounded-md border border-gray-200">
          <img
            src={`http://localhost:8000/images/products/thumbnails/${thumbnail}`}
            alt="product-image"
            className="size-full object-cover"
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h4>{name}</h4>
          </div>
          <div className="flex flex-1 items-center justify-between text-sm">
            <p className="text-slate-500 text-sm">تعداد {selectedQuantity}</p>
            <p className="ml-4 text-slate-600 text-sm">
              {price! * selectedQuantity!} تومان
            </p>
          </div>
        </div>
      </li>
    </Link>
  );
};

export default ShoppingProductCard;
