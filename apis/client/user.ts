import { urls } from "@/utils/urls";
import { generateAxiosInstance } from "./instance";

type getUsersType = () => Promise<IUserResDto>;
export const getUsers: getUsersType = async () => {
  const response = await generateAxiosInstance.get(urls.users.list);
  return response.data;
};
