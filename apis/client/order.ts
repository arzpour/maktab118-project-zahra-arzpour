import { urls } from "@/utils/urls";
import { generateAxiosInstance } from "./instance";

type getAllOrdersType = (_: IParams) => Promise<IOrderResDto>;
export const getAllOrders: getAllOrdersType = async (params) => {
  const response = await generateAxiosInstance.get(urls.orders.list, {
    params: { page: params.page, limit: params.limit },
  });
  return response.data;
};

type addOrderType = (_: IAddOrderReqDto) => Promise<IAddOrderResDto>;
export const addOrder: addOrderType = async (body) => {
  const response = await generateAxiosInstance.post(urls.orders.list, body);
  return response.data.data.order;
};
