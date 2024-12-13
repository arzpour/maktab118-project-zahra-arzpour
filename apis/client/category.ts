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
  console.log(response.data);

  return response.data;
};
