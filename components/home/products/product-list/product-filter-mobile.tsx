"use client";

import React from "react";
import useSubCategoryList from "@/hooks/useSubcategory";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { filterActions } from "@/redux/features/filter.slice";
import { CategoryFilterItem } from "./filter-input";
import useCategoryList from "@/hooks/useCategory";

const ProductFilterMobile: React.FC = () => {
  const [openCategories, setOpenCategories] = React.useState<
    Record<string, boolean>
  >({});
  const { data: subCategories } = useSubCategoryList(Infinity);
  const { data: categories } = useCategoryList(Infinity);

  const selectedFilters = useAppSelector(
    (state) => state.filter.selectedFilters
  );
  const dispatch = useAppDispatch();

  const handleFilterChange = (filterId: string) => {
    dispatch(filterActions.setFilters(filterId));
  };

  const isOpenCategoryHandler = (id: string) => {
    setOpenCategories({ [id]: !openCategories[id] });
  };

  const findSubCategoryAndCategory = categories?.data?.categories.map(
    (category) => {
      const subcategories = subCategories?.data?.subcategories.filter(
        (subcategory) => subcategory.category === category._id
      );
      return { subcategories, category };
    }
  );

  return (
    <div className="mt-2 lg:hidden">
      <div className="flex justify-center flex-wrap gap-6 mx-10">
        {findSubCategoryAndCategory?.map(
          ({ category, subcategories }) =>
            subcategories?.length! >= 1 && (
              <div key={category._id} className="relative">
                <p
                  onClick={() => isOpenCategoryHandler(category._id!)}
                  className="md:text-lg font-medium text-slate-100 border-b border-slate-400"
                >
                  {category.name}
                </p>

                {openCategories[category._id!] && (
                  <div
                    className={`absolute z-50 w-56 top-8 -right-10 rounded overflow-y-auto scrollbar bg-slate-100 
                `}
                  >
                    {subcategories?.map((el) => (
                      <CategoryFilterItem
                        key={el._id}
                        subCategory={el.name || ""}
                        checked={selectedFilters.includes(el._id!)}
                        onChange={() => handleFilterChange(el._id!)}
                        classNameP="text-slate-700 text-sm"
                        className="px-5 py-1"
                      />
                    ))}
                  </div>
                )}
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default ProductFilterMobile;
