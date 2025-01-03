import Cookies from "js-cookie";

// Access Token
export const getAccessToken = () => {
  return Cookies.get(process.env.NEXT_PUBLIC_ACCSESS_TOKEN_NAME as string);
};

export const setAccessToken = (token: string) => {
  Cookies.set(process.env.NEXT_PUBLIC_ACCSESS_TOKEN_NAME as string, token);
};

export const deleteAccessToken = () => {
  Cookies.remove(process.env.NEXT_PUBLIC_ACCSESS_TOKEN_NAME as string);
};

// Refresh Token
export const getRefreshToken = () => {
  return Cookies.get(process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME as string);
};

export const setRefreshToken = (token: string) => {
  Cookies.set(process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME as string, token);
};

export const deleteRefreshToken = () => {
  Cookies.remove(process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME as string);
};

// User Role
export const setRole = (role: string) => {
  Cookies.set(process.env.NEXT_PUBLIC_LOGIN_ROLE as string, role);
};

export const getRole = () => {
  return Cookies.get(process.env.NEXT_PUBLIC_LOGIN_ROLE as string);
};

export const deleteRole = () => {
  Cookies.remove(process.env.NEXT_PUBLIC_LOGIN_ROLE as string);
};

// User ID
export const setUserId = (id: string) => {
  Cookies.set(process.env.NEXT_PUBLIC_USER_ID as string, id);
};

export const getUserId = () => {
  return Cookies.get(process.env.NEXT_PUBLIC_USER_ID as string);
};

export const deleteUserId = () => {
  Cookies.remove(process.env.NEXT_PUBLIC_USER_ID as string);
};
