import { editShoppingCartProductSchemaType } from "@/server/validations/shoppingCart.validation";
import { generateAxios } from "./axios-shopping-cart";
import { urls } from "@/utils/urls";

type getShoppingCartType = () => Promise<IShoppingCart[]>;
export const getShoppingCart: getShoppingCartType = async () => {
  const response = await generateAxios.get(urls.cart.list);

  return response.data.data;
};

type getShoppingCartByUserIdType = (userId: string) => Promise<IShoppingCart>;
export const getShoppingCartByUserId: getShoppingCartByUserIdType = async (
  userId
) => {
  const response = await generateAxios.get(urls.cart.ById(userId));

  return response.data.data;
};

type addToShoppingCartType = (
  data: IAddToShoppingCartReqDto[]
) => Promise<IGetShoppingCart>;
export const addToShoppingCart: addToShoppingCartType = async (data) => {
  const response = await generateAxios.post(urls.cart.list, data);
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
  const response = await generateAxios.put(urls.cart.ById(userId), data);
  return response.data;
};
