import { useEditOrder } from "@/apis/mutations/order";
import { queryClient } from "@/providers/tanstack.provider";
import errorHandler from "@/utils/errorHandler";
import { AxiosError } from "axios";
import moment from "moment-jalaali";
import React from "react";
import { toast } from "react-toastify";
import { FaCalendarCheck, FaLocationDot } from "react-icons/fa6";
import { FaUser, FaPhone } from "react-icons/fa";
import { IoTime } from "react-icons/io5";
import useGetOrderById from "@/hooks/useOrderById";

interface IOrderForm {
  setShowOrderModal: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  userOrder?: boolean;
}

const OrderForm: React.FC<IOrderForm> = ({
  setShowOrderModal,
  id,
  userOrder,
}) => {
  const { data: getOrder } = useGetOrderById(id);

  const user = getOrder?.user;

  const editOrder = useEditOrder();

  const editHandler = async () => {
    try {
      const res = await editOrder.mutateAsync(id);

      if (res.message === "Cannot read properties of null (reading 'price')") {
        toast.error(".محصول موجود نمی باشد", {
          className: "custom-toast",
        });
      } else if (res.data) {
        toast.success("سفارش به تحویل داده شده تغییر یافت", {
          className: "custom-toast",
        });
      }

      setShowOrderModal(false);

      queryClient.invalidateQueries({ queryKey: ["get-orders"] });
    } catch (error) {
      toast.error("اطلاعات اشتباه میباشد", {
        className: "custom-toast",
      });
      errorHandler(error as AxiosError<IError>);
      console.log(error);
    }
  };

  return (
    <>
      user && (
      {!userOrder && (
        <div className="text-BlueDark rtl:text-center space-y-4" dir="rtl">
          <div className="flex justify-center items-center gap-2">
            <FaUser className="w-4 h-4" />
            <p>
              نام مشتری:
              <span className="mr-2 text-slate-600 text-sm">
                {user?.firstname} {user?.lastname}
              </span>
            </p>
          </div>

          <div className="flex justify-center items-center gap-2">
            <FaLocationDot className="w-4 h-4" />
            <p>
              آدرس:
              <span className="mr-2 text-slate-600 text-sm">
                {user?.address}
              </span>
            </p>
          </div>

          <div className="flex justify-center items-center gap-2">
            <FaPhone className="w-4 h-4" />
            <p>
              تلفن:
              <span className="mr-2 text-slate-600 text-sm">
                {user?.phoneNumber}
              </span>
            </p>
          </div>
          <div className="flex justify-center items-center gap-2">
            <IoTime className="w-4 h-4" />
            <p>
              زمان سفارش:
              <span className="mr-2 text-slate-600 text-sm">
                {moment(getOrder?.createdAt)
                  .locale("fa")
                  .format("HH:mm:ss ___ jYYYY/jMM/jDD")}
              </span>
            </p>
          </div>
        </div>
      )}
      )
      <table
        className={`w-full text-center table-auto min-w-max text-BackgroundColor ${
          !userOrder ? "mt-9" : "mb-2"
        }`}
      >
        <thead>
          <tr>
            <th className="p-4 border-b border-gray-300">
              <p className="text-sm font-normal leading-none">کالا</p>
            </th>
            <th className="p-4 border-b border-gray-300">
              <p className="text-sm font-normal leading-none">قیمت</p>
            </th>
            <th className="p-4 border-b border-gray-300">
              <p className="text-sm font-normal leading-none">تعداد</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {getOrder?.products.map((el) => (
            <tr key={el._id} className="hover:bg-slate-100">
              <td className="p-4">
                <p className="text-sm">
                  {el.product?.name ?? "محصول موجود نیست"}
                </p>
              </td>
              <td className="p-4">
                <p className="text-sm">{el.product?.price ?? 0}</p>
              </td>
              <td className="p-4">
                <p className="text-sm">{el.count ?? 0}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {getOrder?.deliveryStatus === true && (
        <div className="flex justify-center items-center gap-2 text-BlueDark mt-7 mb-4">
          <FaCalendarCheck className="w-4 h-4" />
          <p onClick={() => console.log(getOrder?.deliveryDate)}>
            زمان تحویل:
            <span className="mr-2 text-slate-600 text-sm">
              {moment(getOrder?.deliveryDate)
                .locale("fa")
                .format("HH:mm:ss ___ jYYYY/jMM/jDD")}
            </span>
          </p>
        </div>
      )}
      {!userOrder && getOrder?.deliveryStatus !== true && (
        <div className="text-center mt-5 mb-3">
          <button
            onClick={editHandler}
            className="bg-green-600 text-white py-2 px-6 rounded text-sm"
          >
            تحویل داده شد
          </button>
        </div>
      )}
    </>
  );
};

export default OrderForm;
