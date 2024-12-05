import React from "react";
import InventoryAndPriceListTable from "./inventoryAndPrice-list-table";

const InventoryAndPriceMain = () => {
  return (
    <div className="mx-10">
      <div className="w-full flex justify-between items-center mb-3 mt-1 pl-3">
        <div className="flex gap-4 items-center">
          <p className="font-medium">موجودی و قیمت</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-orange text-white py-1.5 px-5 rounded text-sm">
            ویرایش
          </button>
          <button className="bg-green-600 text-white py-1.5 px-6 rounded text-sm">
            ذخیره
          </button>
        </div>
      </div>

      <InventoryAndPriceListTable />
    </div>
  );
};

export default InventoryAndPriceMain;
