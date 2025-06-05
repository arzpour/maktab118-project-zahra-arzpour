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

const useLogout = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const dispatch = useAppDispatch();

  const logOutHandler = async () => {
    await logout();
    deleteAccessToken();
    deleteRefreshToken();
    deleteRole();
    toast.success("خارج شدید");
    setIsOpen(false);
    deleteUserId();
    dispatch(productActions.removeAll());
  };
  return { isOpen, logOutHandler, setIsOpen };
};

export default useLogout;
