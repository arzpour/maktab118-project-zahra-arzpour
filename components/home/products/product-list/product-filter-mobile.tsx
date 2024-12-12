import React from "react";
import useSubCategoryList from "@/hooks/useSubcategory";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { filterActions } from "@/redux/features/filter.slice";
import { CategoryFilterItem } from "./filter-input";

enum FilterCategory {
  "دمنوش ها" = "6750689d58eeb5911f2fcce1",
  "گیاهان دارویی" = "6750684d58eeb5911f2fccd9",
  "روغن‌ها" = "675067e958eeb5911f2fccd5",
  "ادویه‌ها" = "675066f658eeb5911f2fcccc",
}

const categories = [
  { key: "HerbalTea", title: "دمنوش ها", id: FilterCategory["دمنوش ها"] },
  { key: "Medic", title: "گیاهان دارویی", id: FilterCategory["گیاهان دارویی"] },
  { key: "Oil", title: "روغن‌ها و عصاره ها", id: FilterCategory.روغن‌ها },
  { key: "Spice", title: "ادویه‌ها", id: FilterCategory.ادویه‌ها },
];

const ProductFilterMobile: React.FC = () => {
  const [openCategory, setOpenCategory] = React.useState<string | null>(null);
  const { data: subCategories } = useSubCategoryList(Infinity);

  const selectedFilters = useAppSelector(
    (state) => state.filter.selectedFilters
  );
  const dispatch = useAppDispatch();

  const handleFilterChange = (filterId: string) => {
    dispatch(filterActions.setFilters(filterId));
  };

  const getSubCategoryList = (categoryId: string) => {
    return subCategories?.data?.subcategories.filter(
      (item) => item.category === categoryId
    );
  };

  return (
    <div className="mt-2 lg:hidden">
      <div className="flex justify-center flex-wrap gap-6">
        {categories.map(({ key, title, id }) => (
          <div key={title} className="relative">
            <p
              onClick={() =>
                setOpenCategory((prev) => (prev === key ? null : key))
              }
              className="md:text-lg font-medium text-slate-100 border-b border-slate-400"
            >
              {title}
            </p>

            {openCategory === key && (
              <div
                className={`absolute top-8 w-80 rounded overflow-y-auto scrollbar bg-slate-100 ${
                  key === "Spice" ? "left-0" : "right-0"
                }`}
              >
                {getSubCategoryList(id)?.map((el) => (
                  <CategoryFilterItem
                    key={el._id}
                    subCategory={el.name || ""}
                    checked={selectedFilters.includes(el._id!)}
                    onChange={() => handleFilterChange(el._id!)}
                    classNameP="text-slate-700"
                    className="px-5 py-1"
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductFilterMobile;