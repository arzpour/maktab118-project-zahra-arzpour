import { urls } from "@/utils/urls";
import { generateAxiosInstance } from "./instance";

type getAllSubCategoriesType = (_: IParams) => Promise<ISubCategoryResDto>;
export const getAllSubCategories: getAllSubCategoriesType = async ({
  limit,
  page,
}) => {
  const client = generateAxiosInstance;
  const response = await client.get(urls.subcategories.list, {
    params: { limit, page },
  });
  return response.data;
};

type addSubCategoryType = (_: ISubCategoryReqDto) => Promise<ISubCategory>;
export const addSubCategory: addSubCategoryType = async (body) => {
  const client = generateAxiosInstance;
  const response = await client.post(urls.subcategories.list, body);
  return response.data.data.subcategories;
};
