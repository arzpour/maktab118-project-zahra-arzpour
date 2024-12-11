import axios from "axios";
import {
  deleteAccsessToken,
  getRefreshToken,
  getAccsessToken,
  setAccsessToken,
  deleteRefreshToken,
} from "@/utils/session";
import { getToken } from "./auth";
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

generateAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;

    if (error.response?.status === 401 || !config.sent) {
      config.sent = true;
      if (
        config.url !== "/auth/token" &&
        config.url !== "/auth/login" &&
        config.url !== "/auth/logout"
      ) {
        try {
          const refreshToken = getRefreshToken();

          const newAccessToken = await getToken(refreshToken!);

          setAccsessToken(newAccessToken);
          toast.success("توکن جدید ست شد");

          config.headers["Authorization"] = `Bearer ${newAccessToken}`;

          return generateAxiosInstance(config);
        } catch (err) {
          toast.error("دوباره وارد شوید");
          deleteAccsessToken();
          deleteRefreshToken();
          redirect("/admin-login");
        }
      }
    }
    return error.response;
  }
);
