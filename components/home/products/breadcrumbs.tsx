import Link from "next/link";
import React from "react";
import { MdChevronLeft } from "react-icons/md";

interface IBreadCrumb {
  categoryName: string;
  productName: string;
}

const Breadcrumbs: React.FC<IBreadCrumb> = ({ categoryName, productName }) => {
  const categoryLink = () => {
    if (categoryName === "دمنوش ها") {
      return "/products/herbaltea";
    } else if (categoryName === "گیاهان دارویی") {
      return "/products/medicinal";
    } else if (categoryName === "روغن ها و عصاره ها") {
      return "/products/oil";
    } else if (categoryName === "ادویه ها") {
      return "/products/spice";
    }
  };
  return (
    <nav className="flex mx-10 my-2" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 rtl:space-x-reverse flex-wrap gap-y-5 sm:gap-0">
        <li className="inline-flex items-center">
          <Link
            href={"/"}
            className="inline-flex items-center text-sm font-medium text-slate-500 dark:text-gray-400 dark:hover:text-white"
          >
            صفحه اصلی
          </Link>
        </li>
        <li>
          <div className="flex items-center">
            <MdChevronLeft className="w-5 h-5 text-slate-500" />
            <Link
              href={"/products"}
              className="ms-1 text-sm font-medium text-slate-500 md:ms-2 dark:text-gray-400 dark:hover:text-white"
            >
              محصولات
            </Link>
          </div>
        </li>
        {categoryName && (
          <li>
            <div className="flex items-center">
              <MdChevronLeft className="w-5 h-5 text-slate-500" />
              <Link href={categoryLink() || ""}>
                <span className="ms-1 text-sm font-medium text-slate-500 md:ms-2 dark:text-gray-400">
                  {categoryName}
                </span>
              </Link>
            </div>
          </li>
        )}
        {productName && (
          <li>
            <div className="flex items-center">
              <MdChevronLeft className="w-5 h-5 text-slate-500" />
              <span className="ms-1 text-sm font-medium text-slate-200 md:ms-2 dark:text-gray-400">
                {productName}
              </span>
            </div>
          </li>
        )}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
