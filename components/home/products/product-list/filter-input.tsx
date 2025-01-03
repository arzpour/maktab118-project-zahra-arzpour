"use client";

import React from "react";

interface IProductFilterItem {
  subCategory: string;
  onChange?: (checked: boolean) => void;
  classNameP?: string;
  className?: string;
  checked: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export const CategoryFilterItem: React.FC<IProductFilterItem> = ({
  subCategory,
  onChange,
  classNameP,
  className,
  checked,
  setPage,
}) => {
  const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (onChange) {
      onChange(event.target.checked);
      setPage(1);
    }
    console.log(event.target.checked);
  };

  return (
    <div className={`flex gap-3 px-2 ${className}`}>
      <input
        onChange={onChangeHandler}
        type="checkbox"
        checked={checked}
        className="outline-none"
      />
      <p className={`my-3 text-slate-100 ${classNameP}`}>{subCategory}</p>
    </div>
  );
};
