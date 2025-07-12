import { IoClose } from "react-icons/io5";
import React from "react";
import OrderForm from "@/components/form/order-form";

interface IAddCategoryModal {
  setShowOrderModal: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  userOrder?: boolean;
}

const OrdersModal: React.FC<IAddCategoryModal> = ({
  setShowOrderModal,
  id,
  userOrder,
}) => {
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-800 opacity-25"
        aria-hidden="true"
      ></div>

      <div
        className="fixed inset-0 z-10 w-screen overflow-y-auto"
        onClick={() => setShowOrderModal!(false)}
      >
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full relative transform overflow-hidden rounded-lg bg-slate-50 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
          >
            <div className="bg-slate-50 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div
                className={`flex gap-4 items-center justify-between ${
                  userOrder ? " mb-1" : " mb-5"
                }`}
              >
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <p className="font-medium text-gray-800">
                    {userOrder ? "سفارش ها" : "نمایش سفارش"}
                  </p>
                </div>
                <button onClick={() => setShowOrderModal!(false)}>
                  <IoClose className="w-5 h-5 cursor-pointer text-gray-600" />
                </button>
              </div>
              <OrderForm
                setShowOrderModal={setShowOrderModal}
                id={id}
                userOrder={userOrder ? true : false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersModal;
