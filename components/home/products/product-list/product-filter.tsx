"use client";

import useSubCategoryList from "@/hooks/useSubcategory";
import { IoMdAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { filterActions } from "@/redux/features/filter.slice";
import { CategoryFilterItem } from "./filter-input";

enum FilterCategory {
  "دمنوش ها" = "6750689d58eeb5911f2fcce1",
  "گیاهان دارویی" = "6750684d58eeb5911f2fccd9",
  "روغن‌ها" = "675067e958eeb5911f2fccd5",
  "ادویه‌ها" = "675066f658eeb5911f2fcccc",
}


export const FilterProducts: React.FC = () => {
  const [isOpenHerbalTea, setIsOpenHerbalTea] = React.useState<boolean>(false);
  const [isOpenMedic, setIsOpenMedic] = React.useState<boolean>(false);
  const [isOpenOil, setIsOpenOil] = React.useState<boolean>(false);
  const [isOpenSpice, setIsOpenSpice] = React.useState<boolean>(false);



  const { data: subCategories } = useSubCategoryList(Infinity);


  const HerbalTea = subCategories?.data?.subcategories.filter((item) => {
    if (item.category === FilterCategory["دمنوش ها"]) return item;
  });

  const Medic = subCategories?.data?.subcategories.filter((item) => {
    if (item.category === FilterCategory["گیاهان دارویی"]) return item;
  });

  
  const Oil = subCategories?.data?.subcategories.filter((item) => {
    if (item.category === FilterCategory.روغن‌ها) return item;
  });


  const Spice = subCategories?.data?.subcategories.filter((item) => {
    if (item.category === FilterCategory.ادویه‌ها) return item;
  });

  const selectedFilters = useAppSelector(
    (state) => state.filter.selectedFilters
  );


  const dispatch = useAppDispatch();

  const handleFilterChange = (filterId: string) => {
    dispatch(filterActions.setFilters(filterId));
  };

  return (
    <div className="justify-center hidden lg:flex">
      <div className="rounded-lg sticky top-24 mt-10">
        <div className="flex flex-col justify-between">
          <div className="flex justify-between">
            <p className="text-lg font-medium text-slate-100">دمنوش ها</p>
            <button onClick={() => setIsOpenHerbalTea((prev) => !prev)}>
              {isOpenHerbalTea ? (
                <FiMinus className="w-4 h-4 text-slate-100" />
              ) : (
                <IoMdAdd className="w-4 h-4 text-slate-100" />
              )}
            </button>
          </div>

          <div className="w-80 overflow-y-auto scrollbar px-6 py-5">
            {HerbalTea?.map(
              (el) =>
                isOpenHerbalTea &&
                el && (
                  <CategoryFilterItem
                    key={el._id}
                    subCategory={el.name || ""}
                    checked={selectedFilters.includes(el._id!)}
                    onChange={() => handleFilterChange(el._id!)}
                  />
                )
            )}
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex justify-between">
            <p className="text-lg font-medium text-slate-100">گیاهان دارویی</p>
            <button onClick={() => setIsOpenMedic((prev) => !prev)}>
              {isOpenMedic ? (
                <FiMinus className="w-4 h-4 text-slate-100" />
              ) : (
                <IoMdAdd className="w-4 h-4 text-slate-100" />
              )}
            </button>
          </div>
          <div className="w-80 overflow-y-auto scrollbar px-6 py-5">
            {Medic?.map(
              (el) =>
                isOpenMedic &&
                el && (
                  <CategoryFilterItem
                    key={el._id}
                    subCategory={el.name || ""}
                    checked={selectedFilters.includes(el._id!)}
                    onChange={() => handleFilterChange(el._id!)}
                  />
                )
            )}
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex justify-between">
            <p className="text-lg font-medium text-slate-100">روغن‌ها و عصاره ها</p>
            <button onClick={() => setIsOpenOil((prev) => !prev)}>
              {isOpenOil ? (
                <FiMinus className="w-4 h-4 text-slate-100" />
              ) : (
                <IoMdAdd className="w-4 h-4 text-slate-100" />
              )}
            </button>
          </div>
          <div className="w-80 overflow-y-auto scrollbar px-6 py-5">
            {Oil?.map(
              (el) =>
                isOpenOil &&
                el && (
                  <CategoryFilterItem
                    key={el._id}
                    subCategory={el.name || ""}
                    checked={selectedFilters.includes(el._id!)}
                    onChange={() => handleFilterChange(el._id!)}
                  />
                )
            )}
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex justify-between">
            <p className="text-lg font-medium text-slate-100">ادویه‌ها</p>
            <button onClick={() => setIsOpenSpice((prev) => !prev)}>
              {isOpenSpice ? (
                <FiMinus className="w-4 h-4 text-slate-100" />
              ) : (
                <IoMdAdd className="w-4 h-4 text-slate-100" />
              )}
            </button>
          </div>
          <div className="w-80 overflow-y-auto scrollbar px-6 py-5">
            {Spice?.map(
              (el) =>
                isOpenSpice &&
                el && (
                  <CategoryFilterItem
                    key={el._id}
                    subCategory={el.name || ""}
                    checked={selectedFilters.includes(el._id!)}
                    onChange={() => handleFilterChange(el._id!)}
                  />
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterProducts;
