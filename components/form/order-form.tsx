import { useEditOrder } from "@/apis/mutations/order";
import useOrderList from "@/hooks/useOrder";
import useProductList from "@/hooks/useProduct";
import useUsersList from "@/hooks/useUsers";
import { queryClient } from "@/providers/tanstack.provider";
import errorHandler from "@/utils/errorHandler";
import { AxiosError } from "axios";
import moment from "moment";
import React from "react";
import { toast } from "react-toastify";
import { FaLocationDot } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import { IoTime } from "react-icons/io5";
import { FaCalendarCheck } from "react-icons/fa";

interface IOrderForm {
  setShowOrderModal: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
}

const OrderForm: React.FC<IOrderForm> = ({ setShowOrderModal, id }) => {
  const { data: orders } = useOrderList(Infinity);

  const { data: users } = useUsersList();

  const { data: products } = useProductList(Infinity);

  const findOrder = orders?.data.orders.find((el) => el._id === id);

  const findUser = users?.data.users.find((el) => el._id === findOrder?.user);

  const productName = products?.data?.products.find(
    (el) => el._id === findOrder?.products[0].product
  )?.name;

  const editOrder = useEditOrder();

  const editHandler = async () => {
    try {
      await editOrder.mutateAsync(id);

      toast.success("سفارش به تحویل داده شده تغییر یافت", {
        style: { backgroundColor: "#6e6e6e", color: "#fff", fontSize: "15px" },
      });

      setShowOrderModal(false);

      queryClient.invalidateQueries({ queryKey: ["get-orders"] });
    } catch (error) {
      toast.error("اطلاعات اشتباه میباشد", {
        style: {
          backgroundColor: "#6e6e6e",
          color: "#fff",
          fontSize: "15px",
        },
      });
      errorHandler(error as AxiosError<IError>);
      console.log(error);
    }
  };

  return (
    <>
      <div className="text-BlueDark rtl:text-center space-y-4" dir="rtl">
        <div className="flex justify-center items-center gap-2">
          <FaUser className="w-4 h-4" />
          <p>
            نام مشتری:
            <span className="mr-2 text-slate-600 text-sm">
              {findUser?.firstname} {findUser?.lastname}
            </span>
          </p>
        </div>

        <div className="flex justify-center items-center gap-2">
          <FaLocationDot className="w-4 h-4" />
          <p>
            آدرس:
            <span className="mr-2 text-slate-600 text-sm">
              {findUser?.address}
            </span>
          </p>
        </div>

        <div className="flex justify-center items-center gap-2">
          <FaPhone className="w-4 h-4" />
          <p>
            تلفن:
            <span className="mr-2 text-slate-600 text-sm">
              {findUser?.phoneNumber}
            </span>
          </p>
        </div>

        <div className="flex justify-center items-center gap-2">
          <IoTime className="w-4 h-4" />
          <p>
            زمان سفارش:
            <span className="mr-2 text-slate-600 text-sm">
              {moment(findUser?.createdAt).format("hh:mm:ss ___ DD/MM/YYYY")}
            </span>
          </p>
        </div>
      </div>
      <table className="w-full text-center table-auto min-w-max text-BackgroundColor mt-9">
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
          <tr className="hover:bg-slate-100">
            {findOrder?.products.map((el) => (
              <>
                <td className="p-4">
                  <p className="text-sm">{productName}</p>
                </td>
                <td className="p-4">
                  <p className="text-sm">{findOrder.totalPrice}</p>
                </td>
                <td className="p-4">
                  <p className="text-sm">{el.count}</p>
                </td>
              </>
            ))}
          </tr>
        </tbody>
      </table>

      {findOrder?.deliveryStatus === true && (
        <div className="flex justify-center items-center gap-2 text-BlueDark mt-9 mb-3">
          <FaCalendarCheck className="w-4 h-4" />
          <p>
            زمان تحویل:
            <span className="mr-2 text-slate-600 text-sm">
              {moment(findUser?.updatedAt).format("hh:mm:ss ___ DD/MM/YYYY")}
            </span>
          </p>
        </div>
      )}

      {findOrder?.deliveryStatus === false && (
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
