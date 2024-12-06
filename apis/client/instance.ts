import axios, { AxiosError } from "axios";
import {
  deleteAccsessToken,
  getRefreshToken,
  getAccsessToken,
  setAccsessToken,
  deleteRefreshToken,
} from "@/utils/session";
import { getToken, logout } from "./auth";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";

export const generateAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

generateAxiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccsessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => console.log(error)
);

interface IReqList {
  resolve: (value: string) => void;
  reject: (reason: AxiosError) => void;
}

let isRefreshingToken = false;
let reqList: IReqList[] = [];

generateAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;

    if (error.response?.status === 401 || error.response?.status === 500) {
      const refreshToken = getRefreshToken();

      if (refreshToken && !config._retry) {
        if (isRefreshingToken) {
          return new Promise((resolve, reject) => {
            reqList.push({ resolve, reject });
          })
            .then((newToken) => {
              config.headers["Authorization"] = `Bearer ${newToken}`;
              return generateAxiosInstance(config);
            })
            .catch(Promise.reject);
        }

        config._retry = true;
        isRefreshingToken = true;

        try {
          const newAccessToken = await getToken(refreshToken);
          setAccsessToken(newAccessToken);

          reqList.forEach((req) => req.resolve(newAccessToken));
          reqList = [];

          config.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return generateAxiosInstance(config);
        } catch (err) {
          reqList.forEach((req) => req.reject(err as AxiosError));
          reqList = [];

          logout();
          deleteAccsessToken();
          deleteRefreshToken();
          toast("دوباره وارد شوید");
          redirect("/admin-login");
        } finally {
          isRefreshingToken = false;
        }
      }
    }
  }
);
