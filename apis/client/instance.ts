import axios from "axios";
import {
  deleteAccsessToken,
  getRefreshToken,
  getAccsessToken,
  setAccsessToken,
  deleteRefreshToken,
  getRole,
  deleteRole,
} from "@/utils/session";
import { getToken } from "./auth";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

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
    const req = error.config;

    if (error.response?.status === 401 || !req.sent) {
      req.sent = true;
      if (
        req.url !== "/auth/token" &&
        req.url !== "/auth/login" &&
        req.url !== "/auth/signup"
      ) {
        try {
          const refreshToken = getRefreshToken();

          const newAccessToken = await getToken(refreshToken!);

          setAccsessToken(newAccessToken);

          req.headers["Authorization"] = `Bearer ${newAccessToken}`;

          return generateAxiosInstance(req);
        } catch (err) {
          toast.error("دوباره وارد شوید");
          deleteAccsessToken();
          deleteRefreshToken();
          const role = getRole();
          if (role) {
            if (role === "ADMIN") {
              redirect("/admin-login");
            } else {
              redirect("/login");
            }
          }
        }
      }
    }
    return error.response;
  }
);
