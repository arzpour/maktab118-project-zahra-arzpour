import React from "react";

interface ICategorySelect {
  _id?: string;
  name?: string;
}

interface ISelectCategory {
  categories: ICategorySelect[];
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}

const SelectBoxCategory: React.FC<ISelectCategory> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div className="relative flex items-center text-gray-900 mt-5">
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="w-full bg-slate-200 rounded-md text-sm border-b border-slate-600 placeholder:text-xs placeholder:text-slate-600 p-4 outline-none"
      >
        <option value="">انتخاب دسته‌ بندی</option>
        {categories?.map((category) => (
          <option key={category._id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectBoxCategory;
