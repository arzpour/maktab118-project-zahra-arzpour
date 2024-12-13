import InventoryAndPriceListTable from "@/components/admin/inventoryAndPrice/inventoryAndPrice-list-table";
import React from "react";

const InventoryAndPricePage = () => {
  return (
    <div className="bg-BackgroundColor text-white min-h-screen max-w-1800 mx-auto">
      <div className="max-w-1400 mx-auto pt-10">
        <InventoryAndPriceListTable />
      </div>
    </div>
  );
};

export default InventoryAndPricePage;
