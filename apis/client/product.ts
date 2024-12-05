import { urls } from "@/utils/urls";
import { generateAxiosInstance } from "./instance";

type getAllProductsType = (_: IProductReqDto) => Promise<IProductsResDto>;
export const getAllProducts: getAllProductsType = async (params) => {
  const paramsReq: IProductReqDto = {
    page: params.page,
    limit: params.limit,
    "quantity[gte]": 8,
  };
  if (params.sort) {
    paramsReq.sort = params.sort;
  }

  const response = await generateAxiosInstance.get(urls.products.list, {
    params: paramsReq,
  });
  return response.data;
};

type addProductType = (_: IProduct) => Promise<IAddProductsRes>;
export const addProduct: addProductType = async (body) => {
  const response = await generateAxiosInstance.post(urls.products.list, body);
  return response.data.data.products;
};
