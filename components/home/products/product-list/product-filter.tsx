"use client";

import useSubCategoryList from "@/hooks/useSubcategory";
import { IoMdAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { filterActions } from "@/redux/features/filter.slice";
import { CategoryFilterItem } from "./filter-input";
import useCategoryList from "@/hooks/useCategory";

export const FilterProducts: React.FC = () => {
  const [openCategories, setOpenCategories] = React.useState<
    Record<string, boolean>
  >({});

  const { data: categories, isLoading } = useCategoryList(Infinity);
  const { data: subCategories } = useSubCategoryList(Infinity);

  const selectedFilters = useAppSelector(
    (state) => state.filter.selectedFilters
  );

  const dispatch = useAppDispatch();

  const handleFilterChange = (filterId: string) => {
    dispatch(filterActions.setFilters(filterId));
  };

  const openCategoryHandler = React.useCallback((id: string) => {
    setOpenCategories((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const findSubCategoryAndCategory = React.useMemo(() => {
    return categories?.data?.categories.map((category) => {
      const subcategories = subCategories?.data?.subcategories.filter(
        (subcategory) => subcategory.category === category._id
      );
      return { subcategories, category };
    });
  }, [subCategories, categories]);

  return (
    <div className="justify-center hidden lg:flex w-1/2 lg:w-9/12 xl:w-1/2">
      <div className="rounded-lg sticky top-24 mt-10 w-full">
        <div className="flex flex-col justify-between bg-BackgroundColor gap-y-4">
          {isLoading &&
            [1, 2, 3, 4, 5].map((el) => (
              <p
                key={el}
                className="text-lg font-medium bg-BlueL h-4 w-40 mb-5 animate-pulse rounded-lg"
              ></p>
            ))}
          {findSubCategoryAndCategory?.map(({ category, subcategories }) => (
            <div key={category._id}>
              <div className="flex justify-between">
                <p className="text-lg font-medium text-slate-100">
                  {category.name}
                </p>
                <button onClick={() => openCategoryHandler(category._id!)}>
                  {openCategories[category._id!] ? (
                    <FiMinus className="w-4 h-4 text-slate-100" />
                  ) : (
                    <IoMdAdd className="w-4 h-4 text-slate-100" />
                  )}
                </button>
              </div>
              {openCategories[category._id!] && (
                <div className="w-80 overflow-y-auto scrollbar px-6 py-3">
                  {subcategories?.map((el) => (
                    <CategoryFilterItem
                      key={el._id}
                      subCategory={el.name}
                      checked={selectedFilters.includes(el._id)}
                      onChange={() => handleFilterChange(el._id)}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterProducts;
