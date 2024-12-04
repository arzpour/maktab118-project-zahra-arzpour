import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { getRefreshToken } from "./session";
import { refreshAccessToken } from "@/apis/client/instance";

const errorHandler = (error: AxiosError<IError>) => {
  const e = error.response?.statusText;
  console.log(e, "er");

  console.log(error.response);

  if (typeof error.message === "string") {
    toast.error(error.message, {
      style: { backgroundColor: "#6e6e6e", color: "#fff", fontSize: "15px" },
    });
  }
  if (typeof e === "string") {
    toast.error(e, {
      style: { backgroundColor: "#6e6e6e", color: "#fff", fontSize: "15px" },
    });
  }

  console.log(error);
  console.log(error.message);

  if (error.status === 409) {
    toast.error("اطلاعات اشتباه میباشد", {
      style: { backgroundColor: "#6e6e6e", color: "#fff", fontSize: "15px" },
    });
  }
};

export default errorHandler;
