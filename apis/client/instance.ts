import axios from "axios";
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
  (error) => Promise.reject(error)
);

export const getAccessTokenByRefreshToken = async (
  refreshToken: string
): Promise<string> => {
  try {
    const response = await getToken(refreshToken);
    setAccsessToken(response);

    toast.success("توکن با موفقیت تجدید شد", {
      style: { backgroundColor: "#6e6e6e", color: "#fff", fontSize: "15px" },
    });
    return response;
  } catch (error) {
    console.error(error);

    toast.error("توکن موجود نیست", {
      style: { backgroundColor: "#6e6e6e", color: "#fff", fontSize: "15px" },
    });

    logout();
    deleteAccsessToken();
    deleteRefreshToken();
    redirect("/login");
  }
};

generateAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 || !token) {
      const refreshToken = getRefreshToken();

      console.log(refreshToken, "ref");

      if (refreshToken) {
        try {
          const newAccessToken = await getAccessTokenByRefreshToken(
            refreshToken
          );

          setAccsessToken(newAccessToken);

          error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return generateAxiosInstance(error.config);
        } catch (err) {
          console.error(err);
          redirect("/admin-login");
        }
      } else {
        toast.error("رفرش توکن موجود نیست.");
        redirect("/login");
      }
    }

    return Promise.reject(error);
  }
);
