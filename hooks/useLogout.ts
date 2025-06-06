import {
  deleteAccessToken,
  deleteRefreshToken,
  deleteRole,
  deleteUserId,
} from "@/utils/session";
import React from "react";
import { logout } from "@/apis/client/auth";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/redux/hook";
import { productActions } from "@/redux/features/product.slice";
import { useRouter } from "next/navigation";

const useLogout = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const logoutHandler = async () => {
    await logout();
    deleteAccessToken();
    deleteRefreshToken();
    deleteRole();
    toast.success("خارج شدید", {
      className: "custom-toast",
    });
    setIsOpen(false);
    deleteUserId();
    dispatch(productActions.removeAll());
    router.push("/");
  };
  return { isOpen, logoutHandler, setIsOpen };
};

export default useLogout;
