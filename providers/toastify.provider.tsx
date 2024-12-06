import React from "react";
import "react-toastify/dist/ReactToastify.css";

const ToastifyProvider: React.FC<IChildren> = ({ children }) => {
  return (
    <>
      {children}
    </>
  );
};

export default ToastifyProvider;
