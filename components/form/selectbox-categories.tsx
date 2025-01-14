import React from "react";

interface ISelect {
  _id?: string;
  name?: string;
}

interface ISelectBox {
  selectItem: ISelect[];
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  error?: string;
  label: string;
}

const SelectBox: React.FC<ISelectBox> = ({
  selectItem,
  selected,
  setSelected,
  error,
  label,
}) => {
  return (
    <div className="relative flex flex-col text-gray-900 mt-2 w-full">
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className={`w-full mt-4 text-xs rounded-md border-b  text-gray-800 focus:border-BlueDark outline-none p-2 ${
          !!error ? "border-red-400" : "border-slate-400"
        }`}
      >
        <option value="" disabled>
          انتخاب {label}
        </option>
        {selectItem?.map((category) => (
          <option
            key={category._id}
            value={category.name}
            className={`bg-white text-gray-800 focus:bg-BlueDark active:bg-BlueDark ${
              !!error ? "border-red-400" : "border-slate-400"
            }
              ${!!error ? "outline-red-400" : "outline-slate-200"}
              ${
                !!error
                  ? "placeholder:text-red-400"
                  : "placeholder:text-slate-400"
              }`}
          >
            {category.name}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-red-400 text-start mt-4 text-xs font-medium">
          {error}
        </p>
      )}
    </div>
  );
};

export default SelectBox;
