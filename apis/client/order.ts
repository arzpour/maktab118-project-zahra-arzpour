import { urls } from "@/utils/urls";
import { generateAxiosInstance } from "./instance";

type getAllOrdersType = (_: IParams) => Promise<IOrderResDto>;
export const getAllOrders: getAllOrdersType = async (params) => {
  const response = await generateAxiosInstance.get(urls.orders.list, {
    params: { page: params.page, limit: params.limit },
  });
  return response.data;
};

type getOrderByIdType = (id: string) => Promise<IGetOrderOrderByIdResDto>;
export const getOrderById: getOrderByIdType = async (id) => {
  const response = await generateAxiosInstance.get(urls.orders.ById(id));
  return response.data.data;
};

type addOrderType = (_: IAddOrderReqDto) => Promise<IAddOrderResDto>;
export const addOrder: addOrderType = async (body) => {
  const response = await generateAxiosInstance.post(urls.orders.list, body);
  return response.data.data.order;
};

type editOrderType = (id: string) => Promise<IAddOrderResDto>;
export const editOrder: editOrderType = async (id) => {
  const response = await generateAxiosInstance.patch(urls.orders.edit(id), {
    deliveryStatus: true,
  });
  return response.data;
};
