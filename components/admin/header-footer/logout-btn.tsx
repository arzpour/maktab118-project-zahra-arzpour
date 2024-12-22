"use client";

import React from "react";
import { CiLogout } from "react-icons/ci";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";
import ConfirmLogoutModal from "../modals/confirm-logout-modal";
import { logout } from "@/apis/client/auth";
import {
  deleteAccsessToken,
  deleteRefreshToken,
  deleteRole,
} from "@/utils/session";

const AdminLogoutBtn = () => {
  const [showConfirmModal, setShowConfirmModal] =
    React.useState<boolean>(false);

  const logoutHandler = () => {
    toast.success("خارج شدید");
    setShowConfirmModal(false);
    logout();
    deleteAccsessToken();
    deleteRefreshToken();
    deleteRole();
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
        <ConfirmLogoutModal
          setShowConfirmModal={setShowConfirmModal}
          logoutHandler={logoutHandler}
        />
      )}
    </>
  );
};

export default AdminLogoutBtn;
