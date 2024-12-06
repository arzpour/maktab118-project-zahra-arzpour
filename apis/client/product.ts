import { urls } from "@/utils/urls";
import { generateAxiosInstance } from "./instance";

type getAllProductsType = (_: IParams) => Promise<IProductsResDto>;
export const getAllProducts: getAllProductsType = async (params) => {
  const response = await generateAxiosInstance.get(urls.products.list, {
    params: { page: params.page, limit: params.limit },
  });
  return response.data;
};

type addProductType = (_: IProduct) => Promise<IAddProductsRes>;
export const addProduct: addProductType = async (body) => {
  const response = await generateAxiosInstance.post(urls.products.list, body);
  return response.data.data.products;
};
