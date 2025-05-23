import axios from "axios";
import {
  getRefreshToken,
  deleteRefreshToken,
  deleteRole,
  getAccessToken,
  setAccessToken,
  deleteAccessToken,
  deleteUserId,
} from "@/utils/session";
import { getToken } from "./auth";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
});

export const generateAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

generateAxiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => console.log(error)
);

generateAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const req = error.config;

    if (error.response?.status === 401 || !req.sent) {
      req.sent = true;
      if (
        req.url !== "/auth/token" &&
        req.url !== "/auth/login" &&
        req.url !== "/auth/signup" &&
        req.url !== "/auth/logout"
      ) {
        try {
          const refreshToken = getRefreshToken();

          const newAccessToken = await getToken(refreshToken!);

          setAccessToken(newAccessToken);

          req.headers["Authorization"] = `Bearer ${newAccessToken}`;

          return generateAxiosInstance(req);
        } catch (err) {
          console.log("🚀 ~ err:", err);
          toast.error("دوباره وارد شوید");
          deleteAccessToken();
          deleteRefreshToken();
          deleteUserId();
          deleteRole();
          redirect("/login");
        }
      }
    }
    return error.response;
  }
);
