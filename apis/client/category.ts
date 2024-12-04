import { urls } from "@/utils/urls";
import { generateAxiosInstance } from "./instance";

type getAllCategoriesType = (_: IParams) => Promise<ICategoryResDto>;
export const getAllCategories: getAllCategoriesType = async ({
  page,
  limit,
}) => {
  const client = generateAxiosInstance;
  const response = await client.get(urls.category.list, {
    params: { page, limit },
  });
  return response.data;
};
