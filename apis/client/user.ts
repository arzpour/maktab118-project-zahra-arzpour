import { urls } from "@/utils/urls";
import { generateAxiosInstance } from "./instance";

type getUsersType = (_: IParams) => Promise<IUserResDto>;
export const getUsers: getUsersType = async ({ limit, page }) => {
  const response = await generateAxiosInstance.get(urls.users.list, {
    params: { limit, page },
  });
  return response.data;
};
