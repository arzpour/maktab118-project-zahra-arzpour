export const getAccsessToken = () => {
  return window.localStorage.getItem(
    process.env.NEXT_PUBLIC_ACCSESS_TOKEN_NAME as string
  );
};

export const setAccsessToken = (token: string) => {
  return window.localStorage.setItem(
    process.env.NEXT_PUBLIC_ACCSESS_TOKEN_NAME as string,
    token
  );
};

export const deleteAccsessToken = () => {
  return window.localStorage.removeItem(
    process.env.NEXT_PUBLIC_ACCSESS_TOKEN_NAME as string
  );
};

export const getRefreshToken = () => {
  return window.localStorage.getItem(
    process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME as string
  );
};

export const setRefreshToken = (token: string) => {
  return window.localStorage.setItem(
    process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME as string,
    token
  );
};

export const deleteRefreshToken = () => {
  return window.localStorage.removeItem(
    process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME as string
  );
};
