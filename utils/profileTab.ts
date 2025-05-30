export const getInitialProfileTab = (): profileTabType => {
  if (typeof window !== "undefined") {
    return window.innerWidth <= 768 ? "" : "userInfo";
  }
  return "userInfo";
};
