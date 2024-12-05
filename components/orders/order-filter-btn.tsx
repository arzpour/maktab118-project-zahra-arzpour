import React from "react";
import { IoMdCheckboxOutline } from "react-icons/io";
import { TbTruckLoading } from "react-icons/tb";
import { FaClipboardList } from "react-icons/fa";
import { Tab } from "./order-list-table";

interface IOrderBtn {
  setSelectedTab: React.Dispatch<React.SetStateAction<Tab>>;
  selectedTab: Tab;
}

const OrdersBtn: React.FC<IOrderBtn> = ({ setSelectedTab, selectedTab }) => {
  return (
    <div className="flex gap-2">
      <div className="sm:border-b border-gray-700 dark:border-gray-700">
        <ul className="flex flex-wrap sm:flex-nowrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          <li className="me-2">
            <button
              onClick={() => setSelectedTab(Tab.All)}
              className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg ${
                selectedTab === Tab.All
                  ? "border-white text-white"
                  : "border-transparent hover:text-gray-300 dark:hover:text-gray-300"
              }`}
            >
              <FaClipboardList
                className={`w-5 h-5 me-2 ${
                  selectedTab === Tab.All ? "text-gray-200" : "text-gray-500"
                }"`}
              />
              همه سفارش ها
            </button>
          </li>
          <li className="me-2">
            <button
              onClick={() => setSelectedTab(Tab.Loading)}
              className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg ${
                selectedTab === Tab.Loading
                  ? "border-white text-white"
                  : "border-transparent hover:text-gray-300 dark:hover:text-gray-300"
              }`}
            >
              <TbTruckLoading
                className={`${
                  selectedTab === Tab.Loading
                    ? "text-gray-200"
                    : "text-gray-500"
                } w-5 h-5 me-2`}
              />
              در انتظار ارسال
            </button>
          </li>
          <li className="me-2">
            <button
              onClick={() => setSelectedTab(Tab.Delivered)}
              className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg ${
                selectedTab === Tab.Delivered
                  ? "border-white text-white"
                  : "border-transparent hover:text-gray-300 dark:hover:text-gray-300"
              }`}
            >
              <IoMdCheckboxOutline
                className={`w-5 h-5 me-2 ${
                  selectedTab === Tab.Delivered
                    ? "text-gray-200"
                    : "text-gray-500"
                }`}
              />
              تحویل داده شده
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default OrdersBtn;
