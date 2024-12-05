import React from "react";

interface ISelect {
  _id?: string;
  name?: string;
}

interface ISelectBox {
  selectItem: ISelect[];
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

const SelectBox: React.FC<ISelectBox> = ({
  selectItem,
  selected,
  setSelected,
}) => {
  return (
    <div className="relative flex items-center text-gray-900 mt-2">
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="w-full rounded-md text-sm border-b border-slate-600 placeholder:text-xs placeholder:text-slate-600 p-4 outline-none"
      >
        <option value="">انتخاب دسته‌ بندی</option>
        {selectItem?.map((category) => (
          <option key={category._id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectBox;
