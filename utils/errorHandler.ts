import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { getRefreshToken } from "./session";
import { redirect } from "next/navigation";

const errorHandler = (error: AxiosError<IError>) => {
  const e = error.response?.statusText;

  if (typeof error.message === "string") {
    toast.error(error.message);
  }
  if (typeof e === "string") {
    toast.error(e);
  }

  const token = getRefreshToken();
  if (!token) {
    toast.error("توکن موجود نیست دوباره وارد شوید.", {
      className: "custom-toast",
    });
    redirect("/login");
  }

  if (error.status === 409) {
    toast.error("اطلاعات اشتباه میباشد", {
      className: "custom-toast",
    });
  }
};

export default errorHandler;
