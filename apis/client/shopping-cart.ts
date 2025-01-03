import { editShoppingCartProductSchemaType } from "@/server/validations/shoppingCart.validation";
import axios from "axios";
const url = "http://localhost:3000/server/shopping-cart";

type getShoppingCartType = () => Promise<IShoppingCart[]>;
export const getShoppingCart: getShoppingCartType = async () => {
  const response = await axios.get(url);

  return response.data.data;
};

type getShoppingCartByUserIdType = (userId: string) => Promise<IShoppingCart>;
export const getShoppingCartByUserId: getShoppingCartByUserIdType = async (
  userId
) => {
  const url = `http://localhost:3000/server/shopping-cart/${userId}`;

  const response = await axios.get(url);

  return response.data.data;
};

type addToShoppingCartType = (
  data: IAddToShoppingCartReqDto[]
) => Promise<IGetShoppingCart>;
export const addToShoppingCart: addToShoppingCartType = async (data) => {
  const response = await axios.post(url, data);
  return response.data;
};

type editShoppingCartType = (_: {
  userId: string;
  data: editShoppingCartProductSchemaType;
}) => Promise<string | undefined>;

export const editShoppingCart: editShoppingCartType = async ({
  data,
  userId,
}) => {
  const url = `http://localhost:3000/server/shopping-cart/${userId}`;

  const response = await axios.put(url, data);
  return response.data;
};

type deleteShoppingCartByUserIdType = (
  userId: string
) => Promise<string | undefined>;

export const deleteShoppingCartByUserId: deleteShoppingCartByUserIdType =
  async (userId) => {
    const url = `http://localhost:3000/server/shopping-cart/${userId}`;

    const response = await axios.delete(url);
    return response.data;
  };
