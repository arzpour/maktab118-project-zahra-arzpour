import { urls } from "@/utils/urls";
import { generateAxiosInstance } from "./instance";

type getUsersType = (_: IParams) => Promise<IUserResDto>;
export const getUsers: getUsersType = async ({ limit, page }) => {
  const response = await generateAxiosInstance.get(urls.users.list, {
    params: { limit, page },
  });
  return response.data;
};

type getUserByIdType = (userId: string) => Promise<IUser>;
export const getUserById: getUserByIdType = async (userId) => {
  const response = await generateAxiosInstance.get(urls.users.userById(userId));
  return response.data;
};

type editUserByIdType = (_: {
  userId: string;
  address: string;
}) => Promise<IUser>;
export const editUserById: editUserByIdType = async ({ address, userId }) => {
  const response = await generateAxiosInstance.patch(
    urls.users.userById(userId),
    address
  );
  return response.data;
};
