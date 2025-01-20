import { urls } from "@/utils/urls";
import { editShoppingCartProductSchemaType } from "@/server/validations/shoppingCart.validation";
import axios from "axios";

type getShoppingCartType = () => Promise<IShoppingCart[]>;
export const getShoppingCart: getShoppingCartType = async () => {
  const response = await axios.get(urls.cart.list);
  return response.data.data;
};

type getShoppingCartByUserIdType = (userId: string) => Promise<IShoppingCart>;
export const getShoppingCartByUserId: getShoppingCartByUserIdType = async (
  userId
) => {
  const response = await axios.get(urls.cart.ById(userId));
  return response.data.data;
};

type addToShoppingCartType = (
  data: IAddToShoppingCartReqDto[]
) => Promise<IGetShoppingCart>;
export const addToShoppingCart: addToShoppingCartType = async (data) => {
  const response = await axios.post(urls.cart.list, data);
  return response.data;
};

type editShoppingCartType = (_: {
  userId: string;
  data: editShoppingCartProductSchemaType;
}) => Promise<string | undefined>;
export const editShoppingCart: editShoppingCartType = async ({
  userId,
  data,
}) => {
  const response = await axios.put(urls.cart.ById(userId), data);
  return response.data;
};

type deleteShoppingCartByUserIdType = (
  userId: string
) => Promise<string | undefined>;
export const deleteShoppingCartByUserId: deleteShoppingCartByUserIdType =
  async (userId) => {
    const response = await axios.delete(urls.cart.ById(userId));
    return response.data;
  };
