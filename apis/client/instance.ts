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

const token = getAccsessToken();

generateAxiosInstance.interceptors.request.use(
  (config) => {
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

let isRefreshing = false;
let reqList: IReqList[] = [];

const reqListWaiting = (error: AxiosError | null, token: string | null) => {
  reqList.forEach((req) => {
    if (token) {
      req.resolve(token);
    } else {
      req.reject(error as AxiosError);
    }
  });
  reqList = [];
};

generateAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const req = error.config;

    if (error.response?.status === 401 || error.response?.status === 500) {
      const refreshToken = getRefreshToken();

      if (refreshToken && !req._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            reqList.push({ resolve, reject });
          })
            .then((token) => {
              req.headers["Authorization"] = `Bearer ${token}`;
              return generateAxiosInstance(req);
            })
            .catch(Promise.reject);
        }

        req._retry = true;
        isRefreshing = true;

        try {
          const newAccessToken = await getToken(refreshToken);
          setAccsessToken(newAccessToken);
          reqListWaiting(null, newAccessToken);

          req.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return generateAxiosInstance(req);
        } catch (err) {
          reqListWaiting(err as AxiosError, null);
          logout();
          deleteAccsessToken();
          deleteRefreshToken();
          redirect("/login");
        } finally {
          isRefreshing = false;
        }
      } else {
        toast.error("توکن موجود نیست دوباره وارد شوید.");
        redirect("/login");
      }
    }
  }
);
