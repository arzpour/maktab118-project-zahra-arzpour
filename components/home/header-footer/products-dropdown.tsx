"use client";

import useCategoryList from "@/hooks/useCategory";
import Link from "next/link";
import React from "react";

const ProductsDropdown = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const { data: categories } = useCategoryList(Infinity);

  return (
    <>
      <li
        onMouseOver={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="sm:text-base lg:text-lg hover:text-orange relative"
      >
        <Link href={"/products"}>محصولات</Link>

        {isOpen && (
          <ul className="absolute z-50 top-5 right-0 mt-2 bg-slate-50 shadow-lg py-2 rounded-lg w-72 text-BackgroundColor text-sm">
            {categories?.data?.categories.map((el) => (
              <li key={el._id} className="p-3 hover:bg-slate-100">
                <Link href={`/products/${el._id}`}>{el.name}</Link>
              </li>
            ))}
            <li className="p-3 hover:bg-slate-200">
              <Link href={"/products"}>همه محصولات</Link>
            </li>
          </ul>
        )}
      </li>
    </>
  );
};

export default ProductsDropdown;
