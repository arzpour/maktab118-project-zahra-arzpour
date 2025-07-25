import LoginForm from "@/components/auth/login";
import React from "react";

const LoginUserPage = () => {
  return (
    <div className="bg-BackgroundColor w-full text-white pt-20 pb-32 max-w-1800 min-h-screen mx-auto flex items-center justify-center">
      <div className="bg-BackgroundColor sm:bg-CyanBlueDark sm:px-16 md:px-10 lg:px-10 py-16 rounded-xl w-full mx-8 md:mx-0 xl:w-1/3 md:w-3/5 lg:w-1/2">
        <p className="text-center pb-12 font-bold text-lg sm:text-3xl">
          ورود به حساب کاربری
        </p>
        <LoginForm user={true} />
      </div>
    </div>
  );
};

export default LoginUserPage;
