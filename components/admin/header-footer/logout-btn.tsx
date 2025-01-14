"use client";

import React from "react";
import { CiLogout } from "react-icons/ci";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";
import { logout } from "@/apis/client/auth";
import {
  deleteAccessToken,
  deleteRefreshToken,
  deleteRole,
  deleteUserId,
} from "@/utils/session";
import { useAppDispatch } from "@/redux/hook";
import { productActions } from "@/redux/features/product.slice";
import ConfirmModal from "../modals/confirm-modal";

const AdminLogoutBtn = () => {
  const [showConfirmModal, setShowConfirmModal] =
    React.useState<boolean>(false);

  const dispatch = useAppDispatch();

  const logoutHandler = async () => {
    await logout();
    toast.success("خارج شدید");
    setShowConfirmModal(false);
    deleteAccessToken();
    deleteRefreshToken();
    deleteRole();
    dispatch(productActions.removeAll());
    deleteUserId();
    redirect("/");
  };

  return (
    <>
      <button onClick={() => setShowConfirmModal(true)}>
        <CiLogout
          className="text-gray-200 w-7 h-7 cursor-pointer"
          title="خروج"
        />
      </button>
      {showConfirmModal && (
        <ConfirmModal
          setShowConfirmModal={setShowConfirmModal}
          onSubmitHandler={logoutHandler}
          status="logout"
        />
      )}
    </>
  );
};

export default AdminLogoutBtn;
