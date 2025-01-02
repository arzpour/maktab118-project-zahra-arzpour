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

export const generateAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SHOPPING_CART_URL,
});

generateAxios.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => console.log(error)
);

generateAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const req = error.config;

    if (error.response?.status === 401 || !req.sent) {
      req.sent = true;

      try {
        const refreshToken = getRefreshToken();

        const newAccessToken = await getToken(refreshToken!);

        setAccessToken(newAccessToken);

        req.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return generateAxios(req);
      } catch (err) {
        toast.error("دوباره وارد شوید");
        deleteAccessToken();
        deleteRefreshToken();
        deleteUserId();
        deleteRole();
        redirect("/login");
      }
    }
    return error.response;
  }
);
