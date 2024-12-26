import { urls } from "@/utils/urls";
import { generateAxiosInstance } from "./instance";

type loginType = (_: ILoginReqDto) => Promise<ILoginResDto>;
export const login: loginType = async (body) => {
  const response = await generateAxiosInstance.post(urls.auth.login, body);
  return response.data;
};

type getTokenType = (refreshToken: string) => Promise<string>;
export const getToken: getTokenType = async (refreshToken) => {
  const response = await generateAxiosInstance.post(urls.auth.token, {
    refreshToken,
  });
  return response.data.token.accessToken;
};

type logoutType = () => Promise<void>;
export const logout: logoutType = async () => {
  const response = await generateAxiosInstance.get(urls.auth.logout);
  return response.data;
};
