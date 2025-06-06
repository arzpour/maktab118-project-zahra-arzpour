"use client";

import React from "react";
import { CiLogout } from "react-icons/ci";
import ConfirmModal from "../modals/confirm-modal";
import useLogout from "@/hooks/useLogout";

const AdminLogoutBtn = () => {
  const { isOpen, setIsOpen, logoutHandler } = useLogout();

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        <CiLogout
          className="text-gray-200 w-7 h-7 cursor-pointer"
          title="خروج"
        />
      </button>
      {isOpen && (
        <ConfirmModal
          setShowConfirmModal={setIsOpen}
          onSubmitHandler={logoutHandler}
          status="logout"
        />
      )}
    </>
  );
};

export default AdminLogoutBtn;
