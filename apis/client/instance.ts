// import axios from "axios";
// import {
//   deleteAccsessToken,
//   getRefreshToken,
//   getAccsessToken,
//   setAccsessToken,
//   deleteRefreshToken,
// } from "@/utils/session";
// import { getToken, logout } from "./auth";
// import { toast } from "react-toastify";
// import { redirect } from "next/navigation";

// const token = getAccsessToken();
// export const generateAxiosInstance = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
//   headers: { Authorization: `Bearer ${token}` },
// });

// // send refreshToken and getAccsessToken

// export const refreshAccessToken = async (
//   refreshToken: string
// ): Promise<string> => {
//   try {
//     const response = await getToken(refreshToken);
//     setAccsessToken(response.accessToken);
//     toast.success("توکن با موفقیت تجدید شد", {
//       style: { backgroundColor: "#6e6e6e", color: "#fff", fontSize: "15px" },
//     });
//     return response.accessToken;
//   } catch (error) {
//     console.error(error);
//     toast.error("توکن موجود نیست", {
//       style: { backgroundColor: "#6e6e6e", color: "#fff", fontSize: "15px" },
//     });
//     logout();
//     deleteAccsessToken();
//     deleteRefreshToken();
//     redirect("/login");
//   }
// };

// // add axios interceptors

// generateAxiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response?.status === 401) {
//       const refreshToken = getRefreshToken();

//       if (refreshToken) {
//         try {
//           const newAccessToken = await refreshAccessToken(refreshToken);

//           setAccsessToken(newAccessToken);

//           error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
//           return generateAxiosInstance(error.config);
//         } catch (refreshError) {
//           console.error(refreshError);
//           redirect("/login");
//         }
//       } else {
//         toast.error("رفرش توکن موجود نیست.");
//         redirect("/login");
//       }
//     }

//     return Promise.reject(error);
//   }
// );

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

const token = getAccsessToken();
export const generateAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  headers: { Authorization: `Bearer ${token}` },
});

export const refreshAccessToken = async (
  refreshToken: string
): Promise<string> => {
  try {
    const response = await getToken(refreshToken);
    setAccsessToken(response.accessToken);
    toast.success("توکن با موفقیت تجدید شد", {
      style: { backgroundColor: "#6e6e6e", color: "#fff", fontSize: "15px" },
    });
    return response.accessToken;
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
    if (error.response?.status === 401) {
      const refreshToken = getRefreshToken();

      if (refreshToken) {
        try {
          const newAccessToken = await refreshAccessToken(refreshToken);

          setAccsessToken(newAccessToken);

          error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return generateAxiosInstance(error.config);
        } catch (err) {
          console.error(err);
          redirect("/login");
        }
      } else {
        toast.error("رفرش توکن موجود نیست.");
        redirect("/login");
      }
    }

    return Promise.reject(error);
  }
);
