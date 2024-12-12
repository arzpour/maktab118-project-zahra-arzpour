"use client";

import React from "react";

interface IProductFilterItem {
  subCategory: string;
  onChange?: (checked: boolean) => void;
  classNameP?: string;
  className?: string;
  checked: boolean;
}

export const CategoryFilterItem: React.FC<IProductFilterItem> = ({
  subCategory,
  onChange,
  classNameP,
  className,
  checked,
}) => {
  const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (onChange) {
      onChange(event.target.checked);
    }
    console.log(event.target.checked);
  };

  return (
    <div className={`flex gap-3 px-2 ${className}`}>
      <input onChange={onChangeHandler} type="checkbox" checked={checked} />
      <p className={`my-3 text-slate-100 ${classNameP}`}>{subCategory}</p>
    </div>
  );
};
