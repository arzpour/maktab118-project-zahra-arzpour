import { editShoppingCartProductSchemaType } from "@/server/validations/shoppingCart.validation";
import { generateAxios } from "./axios-shopping-cart";
import { urls } from "@/utils/urls";

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
