import OrderListTable from "@/components/orders/order-list-table";
import React from "react";

const AdminOrdersPage = () => {
  return (
    <div className="bg-BackgroundColor text-white min-h-screen max-w-1800 mx-auto">
      <div className="max-w-1500 mx-auto pt-10">
        <div className="mx-10">
          <OrderListTable />
        </div>
      </div>
    </div>
  );
};

export default AdminOrdersPage;
