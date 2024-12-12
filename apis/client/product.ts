import { urls } from "@/utils/urls";
import { generateAxiosInstance } from "./instance";

type getAllProductsType = (_: IParams) => Promise<IProductsResDto>;
export const getAllProducts: getAllProductsType = async (params) => {
  const response = await generateAxiosInstance.get(urls.products.list, {
    params: { page: params.page, limit: params.limit },
  });
  return response.data;
};

type addProductType = (_: FormData) => Promise<IAddProductsResDto>;
export const addProduct: addProductType = async (body) => {
  const response = await generateAxiosInstance.post(urls.products.list, body, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data.data.products;
};

type deleteProductByIdType = (id: string) => Promise<IProducts>;
export const deleteProductById: deleteProductByIdType = async (id) => {
  const response = await generateAxiosInstance.delete(urls.products.delete(id));
  return response.data;
};

type patchProductByIdType = (_: {
  data: FormData;
  id: string;
}) => Promise<IEditProductsResDto>;
export const patchProductById: patchProductByIdType = async ({ data, id }) => {
  const response = await generateAxiosInstance.patch(
    urls.products.edit(id),
    data,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return response.data;
};
