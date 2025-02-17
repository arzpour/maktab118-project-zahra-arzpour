import { urls } from "@/utils/urls";
import { generateAxiosInstance } from "./instance";

type getAllCategoriesType = (_: IParams) => Promise<ICategoryResDto>;
export const getAllCategories: getAllCategoriesType = async ({
  page,
  limit,
}) => {
  const response = await generateAxiosInstance.get(urls.category.list, {
    params: { page, limit },
  });
  return response.data;
};

type addCategoryType = (_: ICategoryReqDto) => Promise<IPostCategoryResDto>;
export const addCategory: addCategoryType = async (body) => {
  const response = await generateAxiosInstance.post(urls.category.list, body);
  return response.data;
};

type deleteCategoryType = (id: string) => Promise<IDeleteCategory>;
export const deleteCategory: deleteCategoryType = async (id) => {
  const response = await generateAxiosInstance.delete(urls.category.delete(id));
  return response.data;
};
